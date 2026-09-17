import type { MetadataRoute } from "next";
import { featureFlags } from "./feature-flags";
import { getPublishedBlogPosts } from "@/lib/blog";
import { siteConfig } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts: MetadataRoute.Sitemap = (featureFlags.blogEnabled ? getPublishedBlogPosts() : []).map(
    (post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-09-17"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/faq`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...(featureFlags.blogEnabled
      ? [{
          url: `${siteConfig.url}/blog`,
          lastModified: new Date("2026-07-26"),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }]
      : []),
    {
      url: `${siteConfig.url}/ai-flashcard-maker`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/pdf-to-flashcards`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/spaced-repetition`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/data-deletion`,
      lastModified: new Date("2026-09-06"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/pricing.md`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/llms.txt`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...blogPosts,
  ];
}
