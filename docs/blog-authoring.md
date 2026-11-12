# Blog authoring

## Release flag

`app/feature-flags.ts` contains `blogEnabled`, now `true` for the reviewed release.
While disabled, `/blog` and `/blog/<slug>` return 404, no article pages are
prerendered, and blog links are omitted from navigation and the sitemap.
Content can remain on main without being published. This applies to all
environments; set the flag to `true` locally to review, and only commit that
change once the listing and articles are approved for release. Rebuild and
deploy for flag changes to take effect.

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
  "editor": "Sanjib Sah",
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

Markdown is bundled by `scripts/generate-blog-content.mjs` before development,
type-checking, builds, and deployment. The generated JSON is ignored by Git;
edit the Markdown sources, not the generated file. This avoids repository
filesystem reads at request time on Cloudflare Workers. Posts are rendered
during the production build. Drafts never appear on `/blog`,
do not get article routes, and are not added to structured data or the sitemap.
Publishing or editing a post therefore requires a new deployment.

## Editor credit

Every post records `"editor": "Sanjib Sah"` in `content/blog.json`.
The shared profile in `lib/blog-editor.ts` supplies the placeholder avatar.
Articles show an editor credit separately from the author and include the editor
as a `Person` in `BlogPosting` data. The avatar is decorative and is not presented
as a real portrait or included as a person photograph in structured data.
An editor credit does not imply subject expertise or completed human fact-checking.

## Editorial SEO pass — 12 November 2026

All 11 Markdown files were reviewed. The ten substantive articles received
content edits; the example stays a draft template with no duplicate page H1.

| Post | Changes |
| --- | --- |
| How to make good flashcards | Reusable question/answer/source template and audit link |
| Active recall vs spaced repetition | Same-topic comparison of rereading, retrieval and spaced retrieval; corrected research attribution |
| Lecture slides | Worked slide-to-card, explanation and application example |
| Long PDF | Source-to-study worksheet; corrected eight-step title |
| AI vs manual flashcards | Total-effort comparison worksheet; qualified speed and learning claims |
| AI accuracy | Worked missing-qualifier audit; relevant NIST source instead of unrelated generation-effect citation |
| Daily flashcard count | Replaced unsupported daily quotas with explicit arithmetic; workload log; corrected citation |
| Exam flashcards | Worked practice-error-to-card example; corrected citation |
| Review backlog | Net-clearance calculation accounting for returning reviews; clearer search title |
| Anki alternatives | Publisher disclosure, migration and test worksheets, removed stale prices and untested superiority claims |
| Example note | Template checklist, canonical homepage link and H2 body heading |

The health-professions review is by **Trumble et al.**, not Versteeg et al.
Its journal issue is 2024; online publication was 2023.
Sources were checked against PubMed and official product/documentation pages.
Worked examples are explicitly illustrative, not fabricated product benchmarks.
No keyword-volume or ranking improvement claim has been validated in this pass.

### Release gates still apply

- The content-review pass kept `blogEnabled` false. The subsequent release enables
  the nine reviewed articles; per-post draft exclusions remain in place.
- `anki-alternatives-for-students` is now `draft: true`: competitor hands-on
  testing is still needed. Quizlet blocked automated access during this pass;
  verify its current details directly. Current regional competitor pricing has
  intentionally not been reproduced.
- `example-study-note` stays `draft: true` and must not be published as an article.
- The nine release articles use 12 November 2026 as their first-publication date.
  July catalog placeholders remain only on unpublished drafts. Future
  `updatedAt` dates must describe substantive edits, not human review sign-off.
- Confirm product availability/claims and human editorial approval before release.
  Only select the approved batch for publication.

## Release smoke check

Run `npm run check:blog` after deployment. To test a locally built Worker,
run `vite preview --mode production --port 3018`, then
`npm run check:blog -- http://localhost:3018`. The check validates public
article responses, canonicals, indexability, editor credits, dates, draft and
unknown 404s, sitemap inclusion, and the editor avatar.
