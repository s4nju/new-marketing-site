# ADR 0001: Repository-backed blog

- Status: Accepted
- Date: 2026-07-26

## Context

biu needs a blog that can be published without a CMS. Article bodies should be
easy to review in pull requests, while listing and SEO metadata should remain
structured and centrally discoverable.

## Decision

Store article bodies as `content/blogs/<slug>.md` and metadata in
`content/blog.json`. The slug is the stable join key and canonical URL segment.
Next.js reads and validates both sources on the server, then statically generates
`/blog` and every published `/blog/<slug>` page at build time.

Draft entries are excluded from routes, the index, structured data, and the
sitemap. Raw HTML in Markdown is not rendered.

## Consequences

- Publishing requires a repository change and deployment.
- Content parsing and filesystem access remain server-only.
- Invalid published metadata, duplicate slugs, missing Markdown, orphaned
  Markdown, and missing local cover images fail the build.
- A future CMS would need an adapter that preserves this content model or a
  deliberate migration.
