# SEO and performance audit — September 17, 2026

The supplied screenshots show SEO at 100; performance was the principal issue.
The changes preserve the page layout, imagery, palette, typography, floating
cards, and liquid gradient. Entrance animations use opacity and transforms;
the desktop heading's animated blur was removed to avoid repeated painting.

## Local production results

| Metric | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| Performance | 74 | 93 | 67 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| Accessibility | 100 | 100 | 100 | 100 |
| Best practices | 96 | 100 | 96 | 100 |
| FCP | 1.15 s | 1.08 s | 0.30 s | 0.27 s |
| LCP | 4.14 s | 3.04 s | 1.96 s | 0.74 s |
| Total blocking time | 479 ms | 134 ms | 508 ms | 2 ms |
| Speed index | 1.32 s | 1.08 s | 1.67 s | 0.38 s |
| CLS | 0 | 0 | 0 | 0 |

These are local Lighthouse lab measurements, not new PageSpeed Insights or
CrUX field results. Baseline: repository commit 1b8d81c, built separately with
the same installed dependencies and analytics configuration. Audits ran
sequentially with Lighthouse 13.4.1, Chrome 152,
Next.js 16.2.11, and the default mobile/desktop simulated throttling presets.
Scores vary by machine, network, CDN state, and analytics responses. The initial
PageSpeed report could not be retrieved, so the screenshots were used as audit
context. Mobile LCP is improved but still above the 2.5-second good threshold.
See Google's [LCP optimization guidance](https://web.dev/articles/optimize-lcp).

## Changes

- Analytics loads in an async chunk after the page load event and an idle
  opportunity, rather than blocking hydration. Unused surveys and heatmaps are
  disabled. PostHog field Core Web Vitals capture is enabled. Autocapture and
  page views continue after initialization; pre-initialization interactions and
  visits that end before initialization are not captured.
- The gradient uses the same GLSL shaders and render budget in an OffscreenCanvas
  worker. Main-thread rendering remains for browsers without OffscreenCanvas;
  reduced motion and WebGL failures retain the CSS background. Rendering pauses
  during scroll input, when offscreen, and when the document is hidden.
- The hero phone has prebuilt responsive AVIF/WebP variants, a responsive AVIF
  preload, and high fetch priority. This avoids conversion on the first LCP
  request. A generated manifest gives each file a content hash for immutable
  caching. Footer phone imagery reuses these variants without a preload.
- Feature and step images use accurate responsive sizes. Static imports provide
  hashed URLs and intrinsic aspect ratios. The step images use object-fit cover
  to avoid distortion. No image-delivery warnings remain in the final audits.
- Small page styles are inlined using Next.js's experimental inlineCss option,
  removing stylesheet request chains. Dead hero/step CSS and the unused pricing
  import were removed. Permanent reveal layer promotion was removed. Lenis
  loads at the first desktop wheel interaction.
- Canonicals, sitemap, robots, and structured data use www.getbiu.app, matching
  the hosting platform's existing 308 redirect. Metadata now describes the AI
  flashcards and spaced repetition study app. The organization schema's missing
  icon.svg was replaced with the real logo. Disabled blog articles are excluded
  from the sitemap.

## Validation

- Production build and TypeScript checks passed without build warnings.
- All four Lighthouse categories were audited on mobile and desktop; CLS was
  zero in both. Final audits had no run warnings.
- Browser checks cover hero image decoding, worker activation, responsive image
  selection, FAQ expansion/collapse, email validation, no horizontal overflow,
  reduced motion, the main-thread fallback, and server-rendered content with
  JavaScript disabled. No page exceptions were found.
- Worker and image asset cache headers, sitemap/robots canonical host, generated
  image hashes, JavaScript syntax, and git diff whitespace were checked.
- All nine public page routes were checked for a successful response, one H1,
  the correct canonical host, and valid structured data JSON. Client navigation
  from home to FAQ and back passed. Desktop audit screenshots and mobile browser
  screenshots were visually inspected for layout and design preservation.

## Maintenance and production verification

After changing public/images/phone-mockup.png, run npm run images:hero and commit
lib/phone-images.json plus the generated files before building. Keep old hashed
files while old cached pages can reference them. The gradient worker is a
versioned immutable asset: update its filename and component URL when editing it.
Validate inlineCss when upgrading Next.js, particularly client navigation.

The changes have not been deployed. Deploy the production build, then run
PageSpeed Insights against https://www.getbiu.app/ for mobile and desktop, and
inspect PostHog's field metrics. Check the generated sitemap in Search Console
and inspect representative page canonicals. Do not equate a Lighthouse SEO score
of 100 with search ranking or a field Core Web Vitals pass.

For repeatable local measurements:

```sh
npm run build
npm run start -- --port 3100
npx lighthouse@13 http://localhost:3100 --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=/tmp/biu-mobile.json
npx lighthouse@13 http://localhost:3100 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=/tmp/biu-desktop.json
```

Run these audits sequentially on a production server, without other browser
testing or builds running at the same time.
