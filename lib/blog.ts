import "server-only";

import { featureFlags } from "@/app/feature-flags";

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export type BlogPostMetadata = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  coverImage: string;
  tags: string[];
  draft: boolean;
};

export type BlogPost = BlogPostMetadata & {
  content: string;
  readingMinutes: number;
};

const contentDirectory = path.join(process.cwd(), "content");
const postsDirectory = path.join(contentDirectory, "blogs");
const metadataPath = path.join(contentDirectory, "blog.json");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

let catalogCache: BlogPost[] | undefined;

function fail(message: string): never {
  throw new Error(`[blog] ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  entry: Record<string, unknown>,
  field: string,
  slug: string,
): string {
  const value = entry[field];
  if (typeof value !== "string" || value.trim() === "") {
    fail(`"${slug}" is missing the required "${field}" field.`);
  }
  return value.trim();
}

function validateDate(value: string, field: string, slug: string) {
  if (!datePattern.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    fail(`"${slug}" has an invalid "${field}" date. Use YYYY-MM-DD.`);
  }
}

function validateLocalImage(imagePath: string, slug: string) {
  if (!imagePath.startsWith("/")) return;

  const publicDirectory = path.join(process.cwd(), "public");
  const absolutePath = path.resolve(publicDirectory, `.${imagePath}`);
  if (
    !absolutePath.startsWith(`${publicDirectory}${path.sep}`) ||
    !statExists(absolutePath)
  ) {
    fail(`"${slug}" references a missing cover image: ${imagePath}`);
  }
}

function statExists(filePath: string) {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function parsePublishedEntry(
  entry: Record<string, unknown>,
  index: number,
): BlogPostMetadata {
  const fallbackSlug =
    typeof entry.slug === "string" ? entry.slug : `entry ${index + 1}`;
  const slug = requiredString(entry, "slug", fallbackSlug);

  if (!slugPattern.test(slug)) {
    fail(`"${slug}" must use lowercase kebab-case.`);
  }

  const title = requiredString(entry, "title", slug);
  const description = requiredString(entry, "description", slug);
  const publishedAt = requiredString(entry, "publishedAt", slug);
  const author = requiredString(entry, "author", slug);
  const coverImage = requiredString(entry, "coverImage", slug);

  if (!Array.isArray(entry.tags) || entry.tags.length === 0) {
    fail(`"${slug}" must include at least one tag.`);
  }

  const tags = entry.tags.map((tag) => {
    if (typeof tag !== "string" || tag.trim() === "") {
      fail(`"${slug}" contains an invalid tag.`);
    }
    return tag.trim();
  });

  if (typeof entry.draft !== "boolean") {
    fail(`"${slug}" must set "draft" to true or false.`);
  }

  validateDate(publishedAt, "publishedAt", slug);
  validateLocalImage(coverImage, slug);

  let updatedAt: string | undefined;
  if (entry.updatedAt !== undefined) {
    updatedAt = requiredString(entry, "updatedAt", slug);
    validateDate(updatedAt, "updatedAt", slug);
    if (updatedAt < publishedAt) {
      fail(`"${slug}" has an "updatedAt" date before "publishedAt".`);
    }
  }

  return {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    author,
    coverImage,
    tags,
    draft: entry.draft,
  };
}

function parseDraftEntry(
  entry: Record<string, unknown>,
  index: number,
): BlogPostMetadata {
  const fallbackSlug =
    typeof entry.slug === "string" ? entry.slug : `draft entry ${index + 1}`;
  const slug = requiredString(entry, "slug", fallbackSlug);
  if (!slugPattern.test(slug)) {
    fail(`"${slug}" must use lowercase kebab-case.`);
  }

  return {
    slug,
    title:
      typeof entry.title === "string" && entry.title.trim()
        ? entry.title.trim()
        : "Untitled draft",
    description:
      typeof entry.description === "string" ? entry.description.trim() : "",
    publishedAt:
      typeof entry.publishedAt === "string" &&
      datePattern.test(entry.publishedAt)
        ? entry.publishedAt
        : "1970-01-01",
    updatedAt:
      typeof entry.updatedAt === "string" &&
      datePattern.test(entry.updatedAt)
        ? entry.updatedAt
        : undefined,
    author:
      typeof entry.author === "string" && entry.author.trim()
        ? entry.author.trim()
        : "biu team",
    coverImage:
      typeof entry.coverImage === "string" ? entry.coverImage.trim() : "",
    tags: Array.isArray(entry.tags)
      ? entry.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    draft: true,
  };
}

function estimateReadingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_~|[\]-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function loadCatalog(): BlogPost[] {
  if (catalogCache) return catalogCache;

  let rawMetadata: unknown;
  try {
    rawMetadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  } catch (error) {
    fail(
      `Could not read content/blog.json: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  if (!Array.isArray(rawMetadata)) {
    fail("content/blog.json must contain a JSON array.");
  }

  const seenSlugs = new Set<string>();
  const posts = rawMetadata.map((value, index) => {
    if (!isRecord(value)) {
      fail(`Entry ${index + 1} in content/blog.json must be an object.`);
    }

    const isDraft = value.draft === true;
    const metadata = isDraft
      ? parseDraftEntry(value, index)
      : parsePublishedEntry(value, index);

    if (seenSlugs.has(metadata.slug)) {
      fail(`Duplicate slug "${metadata.slug}" in content/blog.json.`);
    }
    seenSlugs.add(metadata.slug);

    const markdownPath = path.join(postsDirectory, `${metadata.slug}.md`);
    if (!statExists(markdownPath)) {
      fail(`"${metadata.slug}" is missing content/blogs/${metadata.slug}.md.`);
    }

    const content = readFileSync(markdownPath, "utf8").trim();
    if (!isDraft && content === "") {
      fail(`Published post "${metadata.slug}" has an empty Markdown file.`);
    }

    return {
      ...metadata,
      content,
      readingMinutes: estimateReadingMinutes(content),
    };
  });

  const markdownSlugs = readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.slice(0, -3));
  const orphanedMarkdown = markdownSlugs.filter((slug) => !seenSlugs.has(slug));
  if (orphanedMarkdown.length > 0) {
    fail(
      `Markdown files missing from content/blog.json: ${orphanedMarkdown.join(
        ", ",
      )}.`,
    );
  }

  catalogCache = posts.sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return catalogCache;
}

export function getPublishedBlogPosts() {
  if (!featureFlags.blogEnabled) return [];
  return loadCatalog().filter((post) => !post.draft);
}

export function getBlogPost(slug: string) {
  return getPublishedBlogPosts().find((post) => post.slug === slug);
}

export function getAdjacentBlogPosts(slug: string) {
  const posts = getPublishedBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
