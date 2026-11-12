import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Workers cannot read the repository filesystem. Embed Markdown at build time
// so uncached requests (including draft/unknown URLs and sitemap.xml) work too.
const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.join(root, "content/blogs");
const posts = JSON.parse(readFileSync(path.join(root, "content/blog.json"), "utf8"));
const content = Object.fromEntries(
  readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => [file.slice(0, -3), readFileSync(path.join(directory, file), "utf8").trim()]),
);

const publicDirectory = path.join(root, "public");
for (const post of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    throw new Error(`[blog] Invalid slug: ${post.slug}`);
  }
  if (!(post.slug in content)) throw new Error(`[blog] Missing Markdown: ${post.slug}`);
  if (typeof post.coverImage === "string" && post.coverImage.startsWith("/")) {
    const image = path.resolve(publicDirectory, `.${post.coverImage}`);
    if (!image.startsWith(`${publicDirectory}${path.sep}`) || !statSync(image).isFile()) {
      throw new Error(`[blog] Invalid cover image: ${post.coverImage}`);
    }
  }
}

writeFileSync(
  path.join(root, "content/blog-content.generated.json"),
  `${JSON.stringify(content, null, 2)}\n`,
);
console.log(`[blog] Bundled ${Object.keys(content).length} Markdown articles.`);
