# Glossary

## Article body

The Markdown content stored in `content/blogs/<slug>.md`.

## Blog catalog

The metadata array stored in `content/blog.json`.

## Draft

A catalog entry with `"draft": true`. It has no public route and is excluded
from the blog index, structured data, and sitemap.

## Published post

A validated catalog entry with `"draft": false` and a matching, non-empty
Markdown file.

## Slug

A unique lowercase kebab-case identifier that joins metadata to Markdown and
forms the canonical `/blog/<slug>` URL.

## Static generation

Server-side rendering performed during deployment. The resulting pages are
served as prebuilt HTML without reading Markdown on each request.
