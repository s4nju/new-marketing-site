# biu SEO strategy

Written: 11 November 2026.
Site: https://www.getbiu.app.
Starting point: zero organic traffic.

This document is the operating plan for getting biu from zero to steady organic traffic without risking a Google penalty.
It builds on earlier work in `docs/seo-opportunities-2026-10-06.md`, `docs/content-marketing-strategy.md`, `docs/seo-blog-ideas.md`, the claims register, and ADRs 0001, 0006 and 0007.
Where this document and an earlier one disagree, this one is newer.

**Status update — 12 November 2026:** The two immediate foundation tasks have
been checked against production. Search Console already has the domain property;
its three-month report shows 800 impressions and 1 click, with 7 indexed pages.
The existing sitemap showed a fetch error; resubmitting it changed the report to
Success with 10 discovered URLs. Cloudflare Always Use HTTPS is now enabled and
HTTP-to-HTTPS redirects have been verified, including paths and query strings.
See [the dated baseline](seo-baselines/2026-11-12.md). Statements below about no
Search Console baseline and T1 being open describe the original audit, not the
current state. Bing setup and the remaining roadmap items are still separate tasks.

## Contents

1. Executive summary
2. Why traffic is zero today
3. Audit of the current site
4. Goals, KPIs and realistic timeline
5. Guardrails against penalties (read before shipping anything)
6. Phase 0: measurement foundation
7. Phase 1: technical fixes
8. Phase 2: on-page improvements
9. Phase 3: content strategy and keyword map
10. Phase 4: public study-deck pages (programmatic, gated)
11. Phase 5: authority and links
12. AI search visibility
13. App store and brand search
14. Measurement cadence and decision rules
15. 90-day roadmap
16. What we will deliberately not do
17. Open questions for the product owner

---

## 1. Executive summary

The technical base is already good: one H1 per page, unique titles, self-referencing canonicals, JSON-LD, a sitemap, server-rendered HTML, noindex on staging and shared chats, and strong lab performance.
Technical SEO is not why traffic is zero.

Traffic is zero because the site has almost nothing for Google to rank and no external signals telling Google it matters:

- Only 5 indexable pages target search demand (home, FAQ, and three cluster pages).
- Eleven written blog articles (about 15,500 words) sit behind `blogEnabled: false` and return 404.
- No Search Console baseline exists, so we do not know what is indexed or what queries already show impressions.
- The domain is new, with no known backlinks, no social profiles linked in schema, and no app-store listing links yet.
- The app is still marketed as private beta on the live site, which limits conversion and brand searches.

The plan, in order of leverage:

1. Measure: verify Search Console and Bing Webmaster Tools, submit the sitemap, record a baseline (week 1).
2. Fix a short list of real technical issues, the biggest being that `http://www.getbiu.app` serves a 200 page instead of redirecting to HTTPS (week 1).
3. Ship the launch homepage safely, with real store links and claims that match reality (launch week).
4. Publish the reviewed blog in batches, add a `/pricing` page, an About page, and three to four input-specific landing pages with real examples (weeks 2-8).
5. Earn links through launch channels, original data, and genuinely useful free tools, never through bought or exchanged links (ongoing).
6. Later, consider indexable public community-deck pages, gated by strict quality thresholds so they never become thin, scaled content (month 3+).

Everything is constrained by the guardrails in section 5.

---

## 2. Why traffic is zero today

| Cause | Evidence | Fix in this plan |
| --- | --- | --- |
| Very few indexable, search-targeted pages | 5 search-targeted URLs live | Sections 9 and 10 |
| Blog is written but disabled | `/blog` returns 404; `app/feature-flags.ts` has `blogEnabled: false` | Section 9, batch release |
| No measurement | No Search Console verification tag or record found; no baseline | Section 6 |
| New domain, no authority | No known backlinks; `sameAs` empty because social URLs are unset in `.env` | Section 11 |
| Homepage H1 has no topical words | Live H1 is "remember what matters" | Section 8 |
| Commercial pages missing | `/pricing` returns 404; pricing lives on a homepage anchor and `/pricing.md` | Sections 7 and 9 |
| Product still shown as private beta | Live meta description says "Request access to the private beta" | Section 7, launch deploy |

A new domain typically needs 3 to 6 months of consistent publishing and some external links before non-branded traffic becomes meaningful.
Branded traffic ("biu app", "biu flashcards") should appear within weeks of launch if the store listings link to the site.

---

## 3. Audit of the current site

Audited live on 11 November 2026 with HTTP checks and a parse of every public page's server-rendered HTML.
No Search Console, backlink, or keyword-volume data was available.

### 3.1 What is already healthy

- All public pages return 200 and the apex `getbiu.app` 308-redirects to `www` (HTTPS).
- Unique titles (20-51 characters) and meta descriptions (108-153 characters) on every page.
- Exactly one H1 per page.
- Self-referencing canonical URLs on `www`; `/privacy-policy` canonicalizes to `/privacy`.
- `robots.txt` allows everything and lists the sitemap.
- Staging host `biu-marketing-dev.sanjib-code.workers.dev` sends `X-Robots-Tag: noindex, nofollow`.
- `/shared-chat/*` sends `noindex, nofollow, noarchive, nosnippet` and `no-store`.
- `/terms/2026-09-12` (superseded terms) is `noindex, follow`.
- JSON-LD on all marketing pages: Organization, WebSite, SoftwareApplication, WebPage, BreadcrumbList, Article, FAQPage.
- Security headers: HSTS, nosniff, X-Frame-Options, Referrer-Policy.
- Open Graph image renders at `/opengraph-image`.
- Lighthouse SEO 100 and strong lab performance (see `docs/performance-audit-2026-09-17.md`).
- A claims-evidence policy already exists, which is the single best defence against trust-related quality problems.

### 3.2 Issues found

| # | Severity | Issue | Detail |
| --- | --- | --- | --- |
| T1 | High | `http://www.getbiu.app/*` returns 200 over plain HTTP | Creates a duplicate host. HSTS only protects returning browsers, not crawlers on first visit. `http://getbiu.app` correctly redirects. |
| T2 | High | Blog disabled | 11 articles 404; no informational coverage. |
| T3 | High | Repo is ahead of production and contains a placeholder store link | `app/site-config.ts` falls back to `https://apps.apple.com/app/id0000000000` when `NEXT_PUBLIC_IOS_APP_URL` is empty, and `.env` has it empty. Deploying the new homepage as-is would ship broken App Store buttons on every page. |
| T4 | Medium | No `/pricing` page | Pricing queries have no dedicated landing page; `llms.txt` links to `/#pricing`. |
| T5 | Medium | Footer links to `/privacy-policy`, a non-canonical URL | Internal links should point to the canonical `/privacy`. |
| T6 | Medium | Homepage feature screenshots have empty `alt` | 5 images with `alt=""`; at least the 4 product screenshots carry meaning. |
| T7 | Medium | Sitemap includes `/pricing.md` and `/llms.txt` | Non-HTML support files. Harmless but dilutes the sitemap; keep them reachable, drop them from the sitemap. |
| T8 | Medium | Sitemap `lastModified` dates are hardcoded and stale | e.g. homepage `2026-09-17`, privacy `2026-07-01` despite later edits. |
| T9 | Medium | No About page, no named people | Weak trust signals; blog posts are authored by "biu team" with `Organization` as author. |
| T10 | Low | Homepage TTFB about 1.1 s in one sample | Check that prerendered HTML is edge-cached; one sample is not conclusive. |
| T11 | Low | Five Poppins weight files preloaded | Preload only the weights used above the fold. |
| T12 | Low | `SoftwareApplication` lacks `offers` and store URLs | Add once the apps are public and prices are purchasable. |
| T13 | Low | `manifest.ts` icon declares `sizes: "32x16"` | Cosmetic; use real PNG icons (192, 512). |
| T14 | Info | No Search Console or Bing verification | Section 6. |

### 3.3 Page inventory (live)

| URL | Words | Title | H1 |
| --- | --- | --- | --- |
| `/` | 889 | biu - AI Flashcards & Spaced Repetition Study App (live title uses an em dash) | remember what matters |
| `/faq` | 1158 | Frequently asked questions \| biu | everything you want to know. |
| `/ai-flashcard-maker` | 715 | AI Flashcard Maker for PDFs, Videos and Notes \| biu | turn study material into flashcards you can review. |
| `/pdf-to-flashcards` | 681 | Turn a PDF into Flashcards and Daily Reviews \| biu | turn a PDF into flashcards, then keep reviewing. |
| `/spaced-repetition` | 851 | What Is Spaced Repetition? A Practical Guide \| biu | space reviews out. practice bringing answers back. |
| `/privacy`, `/terms`, `/data-deletion` | n/a | Policy pages | Policy titles |

---

## 4. Goals, KPIs and realistic timeline

### 4.1 North-star metric

Organic app installs attributed to the website (store clicks from organic sessions, then store-console conversions).
Raw sessions are a secondary metric; we optimize for visitors who install.

### 4.2 KPIs

| KPI | Source | Month 1 target | Month 3 target | Month 6 target |
| --- | --- | --- | --- | --- |
| Indexed canonical pages | Search Console, Pages report | 100% of sitemap | 100% of sitemap | 100% of sitemap |
| Search impressions per week | Search Console | First non-zero | 1,000+ | 10,000+ |
| Organic clicks per week | Search Console | First non-zero | 50+ | 500+ |
| Non-branded share of clicks | Search Console, regex filter on brand | Baseline | 30%+ | 50%+ |
| Referring domains (real, editorial) | Search Console Links report, Ahrefs/Bing | 5 | 20 | 50 |
| Organic store-button click rate | PostHog | Baseline | 4%+ | 6%+ |
| Core Web Vitals (field, p75) | Search Console CWV / CrUX | Pass | Pass | Pass |
| Manual actions / security issues | Search Console | 0 | 0 | 0 |

Targets are directional, not forecasts.
They are based on typical new-domain curves, not on measured keyword volumes.
Re-set them after the first 8 weeks of Search Console data.

---

## 5. Guardrails against penalties

This section is binding.
Every page, deploy, link and campaign must pass it.
If a tactic is not clearly allowed here, ask before doing it.

Google has two kinds of downside.
**Manual actions** are human penalties shown in Search Console under Security & Manual Actions.
**Algorithmic demotions** come from core updates and spam systems (SpamBrain); they are not reported and usually affect a whole site.
Google ran several spam updates in 2026 (including March, June, August and September, with scaled content abuse in scope), and in 2026 its spam policies were extended to cover AI Overviews and AI Mode.
A new, low-authority domain is especially exposed: one bad pattern can define how Google classifies the whole site.

### 5.1 Content guardrails

1. **People-first test.** Every page must answer yes to: "Would we publish this if search engines did not exist?" and "Does it contain something a reader cannot get from the top three results?"
2. **No scaled content.** Never generate many pages from a template or an AI model where the only difference is a keyword (for example `/pdf-to-flashcards-for-nurses`, `/pdf-to-flashcards-for-lawyers`). Google's scaled content abuse policy targets the purpose (mass pages to manipulate rankings), whatever tool created them.
3. **AI-assisted writing is allowed; unreviewed AI content is not.** Every article needs a named human editor who checked facts, added first-hand material (screenshots, real examples, real tests), and removed filler. Record the reviewer in `content/blog.json`.
4. **Publishing velocity cap.** No more than 2-3 new indexable pages per week in the first 3 months. Sudden bulk publishing on a new domain looks like scaled content, even when the pages are good. The blog backlog of 11 articles ships in batches (section 9.4), not all at once.
5. **One intent, one URL.** Before creating a page, search the site for an existing page with the same intent. If one exists, improve it instead. Keyword cannibalization and near-duplicates waste crawl and trust.
6. **Claims register applies everywhere.** No unsupported user counts, ratings, testimonials, outcome guarantees, or "scientifically proven" wording, per ADR 0001 and `docs/claims-evidence-register.md`. This includes titles, meta descriptions, schema, alt text, and `llms.txt`.
7. **Comparison and "alternatives" pages must be fair and first-hand.** Test competitor products before writing about them, date the comparison, cite their current pricing pages, and state where competitors are better. No fabricated weaknesses.
8. **Health and learning science.** Cite primary research (ADR 0007), distinguish general method evidence from biu outcomes, and never imply medical or academic guarantees.
9. **No doorway pages.** Location or audience pages must contain genuinely distinct help (different workflow, different examples, different constraints). If two pages could swap their H1 and still make sense, merge them.
10. **No hidden content.** No text hidden by CSS, no keyword lists in footers, no content shown to Googlebot that users cannot see (cloaking). FAQ accordions are fine because users can open them.
11. **Dates must be honest.** `publishedAt` is the real first public date. `updatedAt` and sitemap `lastModified` change only after a substantive edit, never to look fresh.
12. **Thin or outdated pages get improved, merged, or noindexed.** Run the content decision rules in section 14 every quarter.

### 5.2 Link guardrails

1. **Never buy links, sell links, or trade links for money, free subscriptions, or products.** This includes "guest post" marketplaces, PBNs, link inserts on old articles, and paid "best apps" listicle placements that are not marked sponsored.
2. **No link exchanges or link schemes** ("link to me and I will link to you" at scale, widget links, footer credits on templates).
3. **Sponsored and affiliate links must carry** `rel="sponsored"`**.** Links in user-generated content must carry `rel="ugc"`.
4. **If you give free Pro access to a creator or reviewer, ask them to disclose it and to mark any link** `rel="sponsored"`**.** Disclosure also matters for FTC rules.
5. **No automated directory blasting, comment spam, forum signature links, or Reddit astroturfing.** Community participation must be by real people, transparent about working on biu, and follow each community's self-promotion rules.
6. **Do not buy expired domains to redirect into getbiu.app.** Expired domain abuse is an explicit spam policy.
7. **Do not host third-party content to exploit our domain** (site reputation abuse): no coupon sections, no sponsored posts unrelated to studying, no "partner" pages written by others.
8. **Monitor new backlinks monthly.** If a burst of spammy links appears (negative SEO), document it. Use the disavow tool only if a manual action for unnatural links is received or a clear paid-link footprint exists; Google ignores most spam links on its own.

### 5.3 Technical guardrails

1. **Staging must never be indexable.** Keep the `X-Robots-Tag: noindex, nofollow` on `workers.dev` and on any preview host. Never deploy a staging build to the production Worker (README rule).
2. **Production must never ship** `noindex` **accidentally.** Add a post-deploy check (section 5.6) that fails if the homepage or any sitemap URL returns `noindex`.
3. **One canonical host:** `https://www.getbiu.app`. Every other variant (`http://`, apex, trailing slash variants, query strings) must redirect with 301/308 or canonicalize to it.
4. **Redirect, do not delete.** When a URL changes or a page is merged, add a permanent redirect to the closest equivalent. Never mass-redirect unrelated pages to the homepage (treated as soft 404).
5. **Real 404s for missing pages.** Unknown URLs, unpublished posts and private shared chats must return 404/410, not a 200 "not found" page.
6. **Private and capability URLs stay noindexed** (shared chats, any future signed links, account pages).
7. **No placeholder links in production.** The build must fail if a store URL contains `id0000000000` or any env-required link is missing (section 7, T3).
8. **Structured data must match visible content.** No `AggregateRating`, `Review` or purchasable `Offer` unless the same information is visible and real (ADR 0007). Misleading structured data can trigger a manual action that removes rich results site-wide.
9. **Do not block CSS, JS or images in** `robots.txt`**.** Google renders pages.
10. **Keep Core Web Vitals passing** (LCP at most 2.5 s, INP at most 200 ms, CLS at most 0.1 at p75) and re-run Lighthouse after framework upgrades.

### 5.4 User-generated content guardrails (community decks, shared content)

1. Public deck pages are `noindex` by default and become indexable only after passing quality thresholds (section 10).
2. Copyrighted material (textbook pages, paid course content) must not be indexed. Provide a DMCA/report path and honour takedowns quickly.
3. Moderate for spam, adult content and malicious links before a page can become indexable.
4. All outbound links in UGC get `rel="ugc nofollow"`.
5. Never index user-uploaded source documents or chats.

### 5.5 AI-crawler and AI-search guardrails

1. Allow `Googlebot`, `Bingbot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`/`Claude-SearchBot` and similar search crawlers. Blocking them removes biu from AI answers.
2. `Google-Extended` and `GPTBot` control model training, not search. Decide this as a business choice; it does not affect Google ranking.
3. Never serve AI crawlers different content from users.

### 5.6 Pre-deploy checklist (every release)

Run before and after each production deploy.
Automate as a script in `scripts/seo-check.mjs` (Phase 1 task).

- [ ] Production build, not staging (`npm run build:cloudflare`).
- [ ] Homepage and every sitemap URL: status 200, no `noindex` meta or header, canonical equals its own `https://www.getbiu.app` URL.
- [ ] Exactly one H1 per page; title 30-60 characters; meta description 110-160 characters; all unique.
- [ ] JSON-LD parses; every claim in schema is visible on the page.
- [ ] No link contains `id0000000000`, `example.com`, `localhost`, or `workers.dev`.
- [ ] `http://www.getbiu.app/` and `https://getbiu.app/` redirect permanently to `https://www.getbiu.app/`.
- [ ] Staging host still returns `X-Robots-Tag: noindex`.
- [ ] Unknown URL returns 404.
- [ ] Sitemap lists only canonical, indexable HTML URLs; no 404s, redirects, or noindexed pages.
- [ ] New copy checked against the claims register.

### 5.7 Penalty early-warning and response

Check weekly in Search Console:

- Security & Manual Actions: must be empty.
- Pages report: sudden rise in "Crawled, currently not indexed" or "Duplicate, Google chose different canonical".
- Performance: impressions drop more than 40% week over week, outside a known core update.

If a manual action appears:

1. Stop publishing and stop any link campaigns.
2. Read the exact reason and affected URLs.
3. Fix every instance (remove links, rewrite or remove pages, fix schema).
4. Document what changed and file a reconsideration request with evidence.

If an algorithmic drop coincides with a core or spam update:

1. Do not make panicked mass changes during the rollout (about 2 weeks).
2. Compare pages that lost against pages that held, using Search Console.
3. Apply the content decision rules (section 14): improve, merge or noindex weak pages.
4. Recovery usually shows at the next core update, not immediately.

---

## 6. Phase 0: measurement foundation (week 1)

1. **Google Search Console, Domain property** for `getbiu.app` via a DNS TXT record in Cloudflare. This covers `www`, apex, `http` and `https`.
2. **Submit** `https://www.getbiu.app/sitemap.xml`.
3. **URL Inspection** for the homepage and the three cluster pages; request indexing once each.
4. **Bing Webmaster Tools**: import from Search Console. Bing powers ChatGPT search and DuckDuckGo results, so it matters more than its market share suggests.
5. **IndexNow**: enable Cloudflare Crawler Hints (Cloudflare dashboard, Caching > Configuration), which pings IndexNow (Bing, Yandex, Seznam) when content changes.
6. **Analytics events in PostHog**: `store_click` with `store` (ios/android) and `page`, organic-session segmentation by referrer, and UTM conventions for all non-organic links so they are not misread as organic.
7. **Store attribution**: App Store Connect campaign links (`pt` and `ct` parameters) and Google Play referrer (`utm_source=website&utm_medium=organic&utm_campaign=<page>`) on store buttons, so installs can be traced to landing pages.
8. **Baseline export**: impressions, clicks, queries, pages, countries, devices. Save a dated snapshot in `docs/seo-baselines/` (or a sheet).
9. **Brand regex** in Search Console for branded vs non-branded split: `biu|getbiu`.
10. **Rank tracking** (optional): a small set of 30-50 target keywords in a tracker, checked weekly. Search Console average position is enough initially.

---

## 7. Phase 1: technical fixes (weeks 1-2)

Ordered by impact.
Each item references the audit ID from section 3.2.

### 7.1 Force HTTPS on www (T1)

In Cloudflare: SSL/TLS > Edge Certificates > enable **Always Use HTTPS**.
Alternatively add a redirect rule: if scheme is `http`, 301 to `https://www.getbiu.app${path}` preserving the query string.
Verify:

```bash
curl -sI http://www.getbiu.app/faq
```

Expected: a 301/308 with `location: https://www.getbiu.app/faq`.
Later, once stable for a few months, consider HSTS `preload` (add `preload` to the header and submit to hstspreload.org); this is hard to undo, so decide deliberately.

### 7.2 Ship the launch homepage safely (T3)

Before deploying the current `main`:

1. Set real `NEXT_PUBLIC_IOS_APP_URL`, `NEXT_PUBLIC_ANDROID_APP_URL` and `NEXT_PUBLIC_IOS_APP_STORE_ID` for the production build.
2. Remove the `id0000000000` fallback from `app/site-config.ts` and make the production build fail if a required store URL is missing (mirror how `app-links.ts` returns 404 when values are missing).
3. Re-check every "Available on iOS and Android" claim against reality on launch day. If one store is not live, show only the live one.
4. Update the meta description, `llms.txt`, FAQ and schema together so they all say the same thing.

### 7.3 Clean up the sitemap (T7, T8)

- Remove `/pricing.md` and `/llms.txt` from `app/sitemap.ts`; they stay reachable and linked from `<head>`.
- Derive `lastModified` from a single source of truth per page (for example an `updatedAt` constant exported by each page or a map in `app/content.ts`), changed only on substantive edits.
- Add `/pricing`, `/about`, the blog index and published posts as they launch.
- Drop `changeFrequency` and `priority`; Google ignores them. Keep accurate `lastmod`.

### 7.4 Canonical internal links (T5)

- Change footer link in `app/components/FinalCta.tsx` from `/privacy-policy` to `/privacy`.
- Keep `/privacy-policy` live with its canonical, or make it a 301 to `/privacy` after confirming the App Store and Play Console listings use a URL that will still work (a redirect keeps them working).

### 7.5 Image alt text (T6)

Give the product screenshots in `Features.tsx` / `HowItWorks.tsx` descriptive alt text (for example "biu library screen listing PDFs, videos and notes grouped into collections").
Keep `alt=""` only for decorative images like the padlock icon.
Rename new image files descriptively (`pdf-to-flashcards-review-screen.webp`, not `img-3.png`).

### 7.6 Pricing page (T4)

Create `/pricing` as a real HTML page built from `app/product-data.ts`, so pricing has one source of truth across the homepage, `/pricing`, `/pricing.md`, FAQ and `llms.txt`.
Point navigation "pricing" and `llms.txt` to `/pricing`.
Keep the homepage section, linking to `/pricing` for details.
Use `Offer` schema only once prices are purchasable in the stores, and only with values visible on the page.

### 7.7 Automated SEO check script

Add `scripts/seo-check.mjs` that, given a base URL, fetches the sitemap and every URL and asserts the checklist in section 5.6.
Run it in CI before deploy against the preview build, and after deploy against production.
This is the main guardrail against accidental `noindex`, placeholder links, or broken canonicals.

### 7.8 Performance hygiene (T10, T11)

- Measure TTFB from several regions (PageSpeed Insights, WebPageTest). If HTML is not edge-cached, add `Cache-Control: public, s-maxage=...` for prerendered pages or use Cloudflare cache rules.
- Preload only the 1-2 Poppins weights used above the fold.
- Check Search Console Core Web Vitals once field data exists (needs traffic).

### 7.9 Manifest and icons (T13)

Add 192 px and 512 px PNG icons and an `apple-touch-icon`; fix the `sizes` value.

### 7.10 Structured data upgrades (T12)

After launch:

- `SoftwareApplication` (or `MobileApplication`): add `installUrl`/`downloadUrl` pointing to both stores, `operatingSystem`, `applicationCategory: "EducationalApplication"`, and `offers` with `price: "0"` for the free tier if the free tier is real and visible.
- Add `AggregateRating` only when the page visibly shows a rating sourced from real store reviews, with the source stated. Never self-assign ratings.
- `Organization`: add `sameAs` with the App Store, Play Store and real social profiles once they exist; add `logo`, `founder` or `contactPoint` if visible on the About page.
- Blog posts: `BlogPosting` with a `Person` author linked to an author page (section 8.4).

---

## 8. Phase 2: on-page improvements (weeks 2-4)

### 8.1 Title and H1 rules

- Title: primary query first, then a differentiator, then `| biu`; 50-60 characters; never stuffed.
- H1: plain description of the page's topic, can keep the brand voice but must contain the topic words.
- Meta description: 140-160 characters, states what the page gives and one honest reason to choose biu.

### 8.2 Proposed changes for existing pages

| Page | Current H1 | Proposed H1 | Proposed title |
| --- | --- | --- | --- |
| `/` | remember what matters | remember what matters with AI flashcards and a daily quiz | biu: AI Flashcards, Summaries & Daily Quiz Study App |
| `/ai-flashcard-maker` | turn study material into flashcards you can review. | AI flashcard maker for PDFs, videos, links and notes | AI Flashcard Maker for PDFs, Videos and Notes \| biu (keep) |
| `/pdf-to-flashcards` | turn a PDF into flashcards, then keep reviewing. | turn a PDF into flashcards and daily reviews | PDF to Flashcards: Turn a PDF into a Study Deck \| biu |
| `/spaced-repetition` | space reviews out. practice bringing answers back. | what is spaced repetition? a practical guide | keep |
| `/faq` | everything you want to know. | biu FAQ: flashcards, quizzes, AI tutor and pricing | biu FAQ: AI Flashcards, Quizzes, Tutor & Pricing |

The repo's new homepage title "biu - AI study app: summaries, tutor, and a daily quiz" drops the word "flashcards", which is the term with the clearest search demand and the term the cluster pages target.
Recommendation: keep "AI flashcards" in the homepage title.
"AI study app" can go in the description and H2s.

### 8.3 Landing page depth

The two product pages (about 700 words each) explain the workflow but do not show the output.
Competitors in "PDF to flashcards" results show an upload box or real sample cards.
Add to each:

1. A real source excerpt (permission-cleared or self-written) beside the actual summary and 4-6 generated cards, as HTML text, not only images.
2. Screenshots of the review step with descriptive alt text.
3. Limits stated honestly (file size, page count, languages, what fails: scanned handwriting quality, formulas, tables).
4. "How to check AI cards" section linking to the accuracy article.
5. A short comparison: biu vs doing it by hand vs pasting into a chatbot, written fairly.
6. Store buttons with attribution parameters.

### 8.4 Trust and E-E-A-T

1. **About page** (`/about`): who builds biu, why, where the company is based, contact email, company/legal name. Real people with real names and photos where comfortable.
2. **Author pages** (`/authors/<name>`) for each person who writes or reviews articles, with a short truthful bio and links to their real profiles.
3. **Article bylines** with author, reviewer and "last reviewed" date. Change `author` in `content/blog.json` from "biu team" to people, keep "biu team" only where truly collaborative.
4. **Editorial policy page** explaining how articles are researched, how AI is used in writing, how product claims are verified, and how corrections are made. Link it from every article footer.
5. **Contact page or contact section** with a working email.

### 8.5 Internal linking

- Footer "Learn" group already renders the three cluster pages; rename anchors to descriptive text that matches the page topic ("AI flashcard maker", "PDF to flashcards", "spaced repetition guide").
- Homepage feature cards link to the matching cluster page.
- Every blog post links to at least one product page and one related post with descriptive anchors; every product page links to 2-3 relevant posts.
- Add breadcrumbs (visible, not only schema) on blog posts and cluster pages.
- Keep the homepage within one click of every money page and within two clicks of every article.

---

## 9. Phase 3: content strategy and keyword map

### 9.1 Positioning for search

biu sits where three search spaces meet:

1. **Tool intent** (high commercial value, very competitive): "AI flashcard maker", "PDF to flashcards", "YouTube to flashcards", "AI quiz generator", "notes to flashcards".
2. **Study-method intent** (informational, high volume, easier for a new site with good content): "active recall", "spaced repetition", "how to make flashcards", "how to study a PDF", "how to study lecture slides".
3. **Comparison intent** (high conversion): "Anki alternative", "Quizlet alternative", "best flashcard app", "best AI study app".

A new domain will not rank for head terms like "flashcard app" for a long time.
The path is: long-tail informational content plus specific tool pages with real examples first, earn links, then move up to head terms.

### 9.2 Keyword research method

Keyword volumes in earlier documents were explicitly unvalidated.
Before writing each new page:

1. Pull volume, difficulty and current SERP for the primary query and 5-10 variants (Ahrefs, Semrush, or free: Google Keyword Planner, Google Trends, Search Console once data exists, "People also ask", autocomplete).
2. Look at the current top 10: what format wins (tool, list, guide, video)? If the top results are all tools and we cannot offer a tool or real examples, do not target that query with a blog post.
3. Pick one primary query per URL and record it in the content tracker.
4. After 8 weeks of Search Console data, prefer queries where biu already has impressions at positions 8-30.

### 9.3 Target page map

Status: L = live, B = written blog draft, N = new.
Priority 1 is next, 3 is later.

**Product and tool pages (root level)**

| URL | Primary query (to validate) | Status | Priority | Notes |
| --- | --- | --- | --- | --- |
| `/ai-flashcard-maker` | ai flashcard maker | L | 1 | Add real examples (8.3) |
| `/pdf-to-flashcards` | pdf to flashcards | L | 1 | Add real examples |
| `/pricing` | biu pricing | N | 1 | Section 7.6 |
| `/image-to-flashcards` | photo/handwritten notes to flashcards | N | 2 | Only with a real photographed-notes example and honest OCR limits |
| `/youtube-to-flashcards` | youtube to flashcards | N | 2 | Only if YouTube links are supported; show limits (no captions, long videos) |
| `/ai-quiz-generator` | ai quiz generator from notes | N | 2 | Distinct intent: quizzes, not cards; show the daily quiz |
| `/ai-tutor` or `/ai-study-assistant` | ai tutor for your notes | N | 3 | Show grounding behaviour and limits |
| `/anki-import` | import anki deck / anki alternative | N | 2 | biu supports Anki imports; real how-to with screenshots |
| `/lecture-video-to-notes` | lecture video summarizer | N | 3 | Validate demand first |

**Comparison pages (**`/compare/...` **or** `/alternatives/...`**)**

| URL | Query | Priority | Conditions |
| --- | --- | --- | --- |
| `/blog/anki-alternatives-for-students` (B) | anki alternatives | 2 | Re-test competitors, date it, fair verdicts |
| `/compare/biu-vs-quizlet` | quizlet alternative / biu vs quizlet | 3 | First-hand testing, cite current pricing |
| `/compare/biu-vs-anki` | anki vs ... | 3 | Same |

Limit comparison pages to 3-4 strong ones.
A large set of thin "X vs Y" pages is a classic scaled-content pattern.

**Blog (informational, existing drafts)**

| Slug | Primary query | Words | Release batch |
| --- | --- | --- | --- |
| how-to-make-good-flashcards | how to make good flashcards | 2419 | 1 |
| active-recall-vs-spaced-repetition | active recall vs spaced repetition | 1372 | 1 |
| how-to-study-a-long-pdf | how to study a long pdf | 1318 | 1 |
| spaced-repetition-backlog | anki reviews piling up / too many reviews | 1432 | 2 |
| how-to-study-lecture-slides | how to study lecture slides | 1353 | 2 |
| are-ai-flashcards-accurate | are ai flashcards accurate | 1612 | 2 |
| how-many-flashcards-per-day | how many flashcards per day | 1458 | 3 |
| how-to-use-flashcards-for-exams | how to use flashcards for exams | 1462 | 3 |
| ai-vs-manual-flashcards | ai vs manual flashcards | 1551 | 3 |
| anki-alternatives-for-students | anki alternatives | 1546 | 4 (after re-test) |
| example-study-note | n/a | 159 | Never publish (keep draft) |

**New blog topics (after the backlog, validate each first)**

Pillar: study methods and exam prep.

- How to study for finals in a week (with a spaced plan).
- Feynman technique with flashcards.
- How to memorize definitions for exams.
- Interleaving vs blocking: what it means for flashcards.
- How to study from YouTube lectures without passive watching.
- How to turn textbook chapters into questions.
- Cloze deletion: when to use it and when not to.
- Leitner system explained (and how modern schedulers differ).
- How to study for MCAT/NCLEX/USMLE/bar with flashcards: only with a qualified reviewer for each exam, otherwise skip.

Pillar: AI and studying (trust-led).

- How to check AI-generated study notes for errors (with a real audit).
- Is using AI to study cheating? (honest, school-policy aware).
- ChatGPT vs a dedicated flashcard app for studying (fair comparison).

Pillar: original data (link magnets, see 11.3).

- What we learned from N reviews in biu (anonymized, aggregate, consented).
- We tested 6 AI flashcard makers on the same PDF (method and raw results published).

### 9.4 Blog release plan (respects the velocity guardrail)

1. Review every article against the claims register and the people-first test; add at least one first-hand element (screenshot, worked example, real card before/after) to each.
2. Assign a named author and reviewer.
3. Set `publishedAt` to the actual release date.
4. Enable `blogEnabled` with only batch 1 set to `draft: false`; everything else `draft: true`.
5. Release one batch every 1-2 weeks (2-3 posts per batch).
6. After each batch, request indexing for new URLs and confirm sitemap inclusion.

### 9.5 Publishing cadence after the backlog

- 1-2 high-quality articles per week, plus one landing page or major page improvement per fortnight.
- Quality beats count: one 2,000-word article with original examples outperforms five generic 800-word ones.
- Every quarter, at least 30% of content effort goes to updating and improving existing pages.

### 9.6 Content brief template

Each new page gets a brief in the tracker with:

- Primary query, secondary queries, search intent, current top-3 URLs and what they lack.
- The unique asset this page will contain (data, example, screenshots, tool, expert input).
- Product tie-in: which biu feature genuinely helps, and which page it links to.
- Claims list checked against the register.
- Author, reviewer, publish date, update date.

---

## 10. Phase 4: public study-deck pages (month 3+, gated)

biu has official and community decks ("Explore, clone, and publish official or community study decks").
Quizlet and Knowt get most of their organic traffic from public study sets.
This is the largest long-term opportunity and also the largest penalty risk.

### 10.1 Design

- URL: `/decks/<topic-slug>-<short-id>` with topic hub pages at `/decks/<subject>`.
- Page content: deck title, description, subject, card count, the first 10-20 cards as HTML text, creator name, last updated, "study this deck in biu" deep link.
- Schema: `Quiz` or `LearningResource` with `educationalLevel` and `about`, only for visible content.

### 10.2 Indexing gate (all must pass, otherwise `noindex, follow`)

- Official decks: indexable after editorial review.
- Community decks: published by the creator as public, at least 20 cards, passed moderation, no near-duplicate of an existing indexable deck (similarity check on card text), not copied from copyrighted sources, and has at least some real engagement (for example 3+ distinct learners studied it).
- Hub pages are indexable only when they list at least 5 indexable decks.
- Sitemap includes only decks that pass the gate, in a separate `sitemap-decks.xml`.

### 10.3 Rollout

1. Start with 20-50 official, high-quality decks in 3-5 subjects.
2. Watch indexing rate and engagement for 6-8 weeks.
3. Open the gate to community decks gradually (for example 100 per week), never a bulk release.
4. If more than 30% of deck pages end up "Crawled, currently not indexed", pause and tighten the gate.

---

## 11. Phase 5: authority and links

Links remain one of the strongest signals for a new domain.
All tactics below comply with section 5.2.

### 11.1 Launch foundations (launch week)

- App Store and Google Play listings link to `https://www.getbiu.app` (developer website field, privacy policy URL).
- Create and link real profiles: X, Instagram, TikTok, YouTube, LinkedIn company page, Reddit (company account). Put them in `.env` so `sameAs` and the footer populate.
- Product Hunt launch with a real maker account and a working demo.
- Listings on reputable, relevant product directories (for example AlternativeTo, G2/Capterra education categories, There's An AI For That, Futurepedia). Submit manually, accurately, a handful, not hundreds.
- Founder posts on LinkedIn / X / Indie Hackers about the build story, linking to the site.

### 11.2 Ongoing earned links

- **Education creators**: offer free Pro access to study YouTubers and TikTokers for honest reviews; require disclosure and `rel="sponsored"` on any link.
- **Student communities**: genuine help in r/GetStudying, r/Anki, r/medicalschool, Discord study servers, following each community's rules, disclosing affiliation.
- **University resources**: learning-centre and library "study tools" pages often link to useful free tools and guides. Pitch the best guides (spaced repetition, how to make good flashcards), not the app.
- **Podcasts and newsletters** on studying, edtech, productivity: founder interviews.
- **Unlinked mentions**: monthly search for "biu app" mentions and ask for a link.

### 11.3 Link-worthy assets (best long-term lever)

1. **Original benchmark**: "We tested N AI flashcard makers on the same textbook chapter", with method, raw cards and error counts published. Re-run every 6 months.
2. **Anonymized learning data report** from biu reviews (aggregate only, consented under the privacy policy), for example best time of day for reviews, how retention changes with interval. Pitch to edtech journalists.
3. **Free utilities** with no signup, each on its own useful page: a spaced-repetition interval calculator, a "how many reviews will I have" estimator, a flashcard quality checker. Tools earn links naturally and match tool intent.
4. **Printable/embeddable study templates** (Cornell notes, exam countdown plan) with a credit line that is a plain mention, not a required link.

### 11.4 Digital PR cadence

One pitched asset per month to a list of 30-50 relevant journalists and bloggers.
Track replies and links in a sheet.

---

## 12. AI search visibility

AI Overviews, AI Mode, ChatGPT search, Perplexity and Claude cite pages that give clear, self-contained answers and that the search index already trusts.
There is no separate ranking system to game; good SEO is the base.

- Start each guide with a 2-3 sentence direct answer to the main question.
- Use descriptive H2s phrased as the questions people ask.
- Keep facts consistent across the site, `llms.txt`, schema, and store listings (pricing, platforms, features).
- Keep `llms.txt` and `pricing.md` (cheap, harmless) but do not treat them as ranking factors.
- Allow AI search crawlers (section 5.5).
- Bing indexing matters for ChatGPT search; keep Bing Webmaster Tools healthy.
- Track AI referrals in PostHog (referrers `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`).
- Monthly, ask the major assistants "best app to turn PDFs into flashcards" and similar prompts; record whether biu appears and which pages are cited.

---

## 13. App store and brand search

The website and the store listings reinforce each other.

- Use the same name, short description, and core keywords on the site, App Store and Google Play (consistent entity signals).
- The App Store name field ("biu: AI Flashcards & Quiz" or similar) affects both store search and how Google understands the brand. Run the `aso` skill for the listing itself.
- "biu" alone is an ambiguous brand. Always pair it with the category ("biu AI flashcards", "biu study app") in social bios, press, and directories, so Google associates the entity with studying.
- Encourage real store reviews in-app with the native review prompt after a positive moment (for example a 7-day streak). Never incentivize reviews.
- Google Play pages can rank in Google web search; keep the Play listing description rich and accurate.

---

## 14. Measurement cadence and decision rules

### 14.1 Cadence

| When | What |
| --- | --- |
| Every deploy | Section 5.6 checklist and `scripts/seo-check.mjs` |
| Weekly (15 min) | Search Console: manual actions, indexing errors, impressions/clicks trend, new queries |
| Monthly (1 h) | Page-level report: impressions, CTR, position, store clicks per page; backlinks review; AI-assistant spot check; content plan update |
| Quarterly (half day) | Full audit: crawl with Screaming Frog, content decision rules, Core Web Vitals, competitor SERP review, update this document |
| After each Google core or spam update | Compare before/after 2 weeks after rollout ends; no changes during rollout |

### 14.2 Content decision rules (quarterly)

For every indexable page older than 4 months:

| Signal | Action |
| --- | --- |
| Impressions but CTR below 1% at positions 1-10 | Rewrite title and meta description |
| Positions 8-20 for its main query | Improve depth, add examples, add internal links from strong pages |
| Zero impressions after 4 months and indexed | Rewrite with a different angle, or merge into a related page with a 301 |
| "Crawled, currently not indexed" after 3 months | Treat as a quality signal: substantially improve or merge |
| Outdated facts (pricing, features, competitor info) | Update now and change `updatedAt` |
| Thin page (under about 300 words of unique help) with no plan to improve | `noindex` or merge |

### 14.3 Reporting template

Keep a monthly snapshot with: total impressions, clicks, CTR, average position; branded vs non-branded clicks; top 10 pages; top 20 queries; new referring domains; organic store clicks; installs attributed; actions taken and next month's plan.

---

## 15. 90-day roadmap

### Weeks 1-2: foundation and fixes

- [ ] Verify Search Console (domain property) and Bing Webmaster Tools; submit sitemap; record baseline.
- [ ] Enable Cloudflare Always Use HTTPS (T1); verify `http://www` redirects.
- [ ] Enable Crawler Hints / IndexNow.
- [ ] Remove the placeholder App Store fallback and fail builds on missing store URLs (T3).
- [ ] Add `scripts/seo-check.mjs` and run it on every deploy.
- [ ] Fix footer privacy link (T5), image alt text (T6), sitemap contents and dates (T7, T8).
- [ ] Add PostHog `store_click` event and store attribution parameters.

### Weeks 2-4: launch and trust

- [ ] Deploy the launch homepage with real store links and consistent claims.
- [ ] Ship `/pricing` from `product-data.ts`; update nav and `llms.txt`.
- [ ] Ship `/about`, author pages, editorial policy, contact.
- [ ] Apply H1/title changes from section 8.2.
- [ ] Add real source-to-cards examples to `/ai-flashcard-maker` and `/pdf-to-flashcards`.
- [ ] Link store listings to the site; create and link social profiles; populate `sameAs`.
- [ ] Enable blog with batch 1 (3 posts).
- [ ] Product Hunt and a handful of directory listings.

### Weeks 5-8: coverage

- [ ] Blog batches 2 and 3.
- [ ] One new input page (`/image-to-flashcards` or `/youtube-to-flashcards`, whichever is supported and validated).
- [ ] `/anki-import` how-to page.
- [ ] First free utility (spaced-repetition interval calculator).
- [ ] Start creator outreach (5-10 creators).
- [ ] First monthly report; adjust targets with real data.

### Weeks 9-12: authority and iteration

- [ ] Publish the AI flashcard maker benchmark; pitch it.
- [ ] Blog batch 4 (re-tested Anki alternatives) and one comparison page.
- [ ] `/ai-quiz-generator` page if validated.
- [ ] First quarterly content decision pass.
- [ ] Decide on the public-deck pilot (section 10) based on product readiness.

---

## 16. What we will deliberately not do

- Buy, sell or swap links, or pay for unmarked placements.
- Mass-generate pages (by AI or templates) for keyword variations, cities, professions, or "X vs Y" combinations.
- Publish AI-written articles without a named human reviewer and first-hand additions.
- Add fake reviews, ratings, user counts, or testimonials in copy or schema.
- Change dates to look fresh.
- Hide text, cloak, or show crawlers different content.
- Redirect expired domains or unrelated sites into getbiu.app.
- Index user chats, uploaded documents, or low-quality community content.
- Chase every SEO tool score; Lighthouse SEO is already 100 and further gains come from content and links.
- Add FAQ schema purely for rich results (Google stopped showing FAQ rich results in 2026); keep FAQs because they help readers.

---

## 17. Open questions for the product owner

1. What is the launch date, and will both stores be live on the same day?
2. Which input types are supported at launch (YouTube links specifically, handwriting OCR, scanned PDFs, languages)? This decides which landing pages are allowed.
3. Who are the named people for the About page, bylines, and reviewers?
4. Which markets matter most (US, India, UK, global)? This affects keyword research, pricing display, and whether localized pages are ever worth it.
5. Are community decks public by URL today, and is there moderation and a copyright report flow?
6. Can we use aggregate, anonymized review data for a public report under the current privacy policy?
7. Is there budget for a keyword tool (Ahrefs or Semrush) and for creator partnerships?
8. Should `GPTBot` and `Google-Extended` (AI training crawlers) be allowed? Search crawlers stay allowed either way.

---

## References

- Google Search Essentials and spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google guidance on AI-generated content: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- Qualify outbound links (`sponsored`, `ugc`): https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- Structured data general guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Software app structured data: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- Google Search Status Dashboard (updates): https://status.search.google.com/
- Industry coverage of 2026 spam updates (secondary sources): https://ppc.land/googles-third-spam-update-of-2026-hits-every-language-and-region/ and https://ppc.land/google-spam-policies-now-officially-cover-ai-overviews-and-ai-mode-in-search
