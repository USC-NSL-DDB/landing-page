import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "out");
const requestedBase = process.env.BASE_PATH ?? "/";
const basePath = requestedBase === "/" ? "/" : `/${requestedBase.replace(/^\/+|\/+$/g, "")}/`;

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "dist/client"), output, { recursive: true });

const { default: worker } = await import(resolve(root, "dist/server/index.js"));
const workerEnv = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const workerContext = { waitUntil() {}, passThroughOnException() {} };

async function renderRoute(pathname) {
  const response = await worker.fetch(
    new Request(`https://static-export.local${pathname}`, { headers: { accept: "text/html" } }),
    workerEnv,
    workerContext,
  );

  if (!response.ok) throw new Error(`Static render for ${pathname} failed with HTTP ${response.status}`);

  let html = await response.text();
  if (basePath !== "/") {
    const escapedBaseSegment = basePath.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const unprefixedHtmlPath = new RegExp(`(href|src|data-rsc-css-href)="/(?!/|${escapedBaseSegment})`, "g");
    html = html
      .replace(unprefixedHtmlPath, `$1="${basePath}`)
      .replace(/\\"\/_next\//g, `\\"${basePath}_next/`)
      .replace(/\\"\/ddb-vscode-raft\.png/g, `\\"${basePath}ddb-vscode-raft.png`)
      .replace(/\\"\/ddb-logo\.png/g, `\\"${basePath}ddb-logo.png`)
      .replace(/\\"\/favicon\.png/g, `\\"${basePath}favicon.png`);
  }
  return html;
}

const [homeHtml, frameworksHtml] = await Promise.all([
  renderRoute("/"),
  renderRoute("/frameworks"),
]);

await mkdir(resolve(output, "frameworks"), { recursive: true });

if (basePath !== "/") {
  const cssDirectory = resolve(output, "_next/static/css");
  const cssFiles = (await readdir(cssDirectory)).filter((file) => file.endsWith(".css"));
  await Promise.all(cssFiles.map(async (file) => {
    const cssPath = resolve(cssDirectory, file);
    const css = await readFile(cssPath, "utf8");
    const rewrittenCss = css.replace(/url\((["']?)(\/(?!\/)[^"')\s]*)/g, (match, quote, path) =>
      path.startsWith(basePath) ? match : `url(${quote}${basePath}${path.slice(1)}`,
    );
    await writeFile(cssPath, rewrittenCss);
  }));
}

await Promise.all([
  writeFile(resolve(output, "index.html"), homeHtml),
  writeFile(resolve(output, "404.html"), homeHtml),
  writeFile(resolve(output, "frameworks/index.html"), frameworksHtml),
  writeFile(resolve(output, ".nojekyll"), ""),
]);

console.log(`Static GitHub Pages bundle written to ${output} (base path: ${basePath})`);
