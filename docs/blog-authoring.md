# Blog authoring

## Add a post

1. Copy `content/blogs/example-study-note.md` to
   `content/blogs/<your-slug>.md`.
2. Add one object with the same slug to `content/blog.json`.
3. Put local article images in `public/images/blog/` and reference them as
   `/images/blog/<filename>`.
4. Keep `"draft": true` while writing.
5. Run `npm run build`.
6. Set `"draft": false`, commit both content files and assets, then deploy.

Published posts require these fields:

```json
{
  "slug": "lowercase-kebab-case",
  "title": "Post title",
  "description": "A concise search and social description.",
  "publishedAt": "2026-07-26",
  "updatedAt": "2026-08-02",
  "author": "biu team",
  "coverImage": "/images/blog/cover.jpg",
  "tags": ["learning", "memory"],
  "draft": false
}
```

`updatedAt` is optional. Dates use `YYYY-MM-DD`.

## Markdown support

Posts support headings with anchor IDs, links, images, lists, task lists, tables,
blockquotes, inline code, and fenced code blocks with syntax highlighting. Raw
HTML is intentionally disabled.

## Publishing behavior

Posts are rendered during the production build. Drafts never appear on `/blog`,
do not get article routes, and are not added to structured data or the sitemap.
Publishing or editing a post therefore requires a new deployment.
