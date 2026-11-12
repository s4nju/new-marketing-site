import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const origin = new URL(process.argv[2] || "https://www.getbiu.app");
const canonicalOrigin = new URL(process.argv[3] || "https://www.getbiu.app");
const posts = JSON.parse(readFileSync(new URL("../content/blog.json", import.meta.url), "utf8"));

async function get(path, status = 200) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, status, `${path}: expected ${status}, received ${response.status}`);
  const body = await response.text();
  if (status === 200 && !path.endsWith(".svg")) {
    assert(!response.headers.get("x-robots-tag")?.includes("noindex"), `${path}: noindex response`);
  }
  return body;
}

function checkPage(body, path) {
  assert.equal([...body.matchAll(/<h1\b/gi)].length, 1, `${path}: expected one H1`);
  const meta = [...body.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag);
  assert(!meta.some((tag) => /name=["']robots["']/i.test(tag) && /noindex/i.test(tag)), `${path}: noindex meta`);
  const canonical = [...body.matchAll(/<link\b[^>]*>/gi)]
    .map(([tag]) => tag)
    .find((tag) => /rel=["']canonical["']/i.test(tag));
  const href = canonical?.match(/href="([^"]+)"/i)?.[1];
  assert(href, `${path}: missing canonical`);
  assert.equal(new URL(href).href, new URL(path, canonicalOrigin).href, `${path}: wrong canonical`);
}

for (const post of posts) {
  const path = `/blog/${post.slug}`;
  if (post.draft) {
    await get(path, 404);
    console.log(`${path}: draft returns 404`);
    continue;
  }
  const body = await get(path);
  checkPage(body, path);
  const schemas = [...body.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, json]) => JSON.parse(json));
  const article = schemas.find((schema) => schema["@type"] === "BlogPosting");
  assert.equal(article?.editor?.name, post.editor, `${path}: missing editor schema`);
  assert.equal(article?.datePublished, post.publishedAt, `${path}: wrong publication date`);
  assert(body.replace(/<!--.*?-->/gs, "").includes(`Edited by ${post.editor}`), `${path}: missing visible editor`);
  console.log(`${path}: SEO and editor checks passed`);
}
for (const path of ["/", "/blog"]) checkPage(await get(path), path);
const sitemap = await get("/sitemap.xml");
assert(sitemap.includes(`${canonicalOrigin.origin}/blog</loc>`), "Blog index missing from sitemap");
for (const post of posts) {
  const listed = sitemap.includes(`${canonicalOrigin.origin}/blog/${post.slug}</loc>`);
  assert.equal(listed, !post.draft, `${post.slug}: incorrect sitemap inclusion`);
}
assert((await get("/images/blog/editor-placeholder.svg")).includes("<svg"));
await get("/blog/this-blog-post-does-not-exist", 404);
console.log("Blog release verified: public pages, draft/unknown 404s, sitemap and editor avatar.");
