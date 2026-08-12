import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "out");
const requestedBase = process.env.BASE_PATH ?? "/";
const basePath = requestedBase === "/" ? "/" : `/${requestedBase.replace(/^\/+|\/+$/g, "")}/`;

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "dist/client"), output, { recursive: true });

const { default: worker } = await import(resolve(root, "dist/server/index.js"));
const response = await worker.fetch(
  new Request("https://static-export.local/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed with HTTP ${response.status}`);

let html = await response.text();
if (basePath !== "/") {
  html = html
    .replace(/(href|src|data-rsc-css-href)="\/(?!\/)/g, `$1="${basePath}`)
    .replace(/\\"\/_next\//g, `\\"${basePath}_next/`)
    .replace(/\\"\/ddb-vscode-raft\.png/g, `\\"${basePath}ddb-vscode-raft.png`)
    .replace(/\\"\/favicon\.png/g, `\\"${basePath}favicon.png`);
}

await Promise.all([
  writeFile(resolve(output, "index.html"), html),
  writeFile(resolve(output, "404.html"), html),
  writeFile(resolve(output, ".nojekyll"), ""),
]);

console.log(`Static GitHub Pages bundle written to ${output} (base path: ${basePath})`);
