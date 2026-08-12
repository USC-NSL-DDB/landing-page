import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished DDB research landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DDB — Source-Level Interactive Debugging for Distributed Applications<\/title>/i);
  assert.match(html, /Debug beyond the/);
  assert.match(html, /Distributed Backtrace/);
  assert.match(html, /Intent-Preserving Control/);
  assert.match(html, /Pause-Erased Time/);
  assert.match(html, /30<[^>]*> ms/);
  assert.match(html, /1–5<[^>]*>%/);
  assert.match(html, /122/);
  assert.match(html, /research prototype/i);
  assert.match(html, /development and test environments/i);
  assert.match(html, /ddb-vscode-raft\.png/);
  assert.match(html, /ddb-logo\.png/);
  assert.match(html, /arxiv\.org\/abs\/2607\.06107/);
  assert.match(html, /usc-nsl\.gitbook\.io\/ddb/);
  assert.match(html, /github\.com\/USC-NSL-DDB\/DDB/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the product and social-preview image assets", async () => {
  await Promise.all([
    access(new URL("../public/ddb-vscode-raft.png", import.meta.url)),
    access(new URL("../public/ddb-logo.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
