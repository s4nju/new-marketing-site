# biu marketing site

A pixel-faithful rebuild of the biu Framer marketing site (`https://getbiu.app`) in **Next.js** (App Router + TypeScript), with clean, editable React components.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Production URLs

Copy `.env.example` to `.env.local` and configure the canonical site URL plus
the real app-store, social, privacy, waitlist, and newsletter destinations.
Links without a configured destination are omitted instead of rendering dead
placeholders. `NEXT_PUBLIC_SITE_URL` defaults to `https://www.getbiu.app`.
The bare production domain is normalized to www to match the hosting redirect;
custom preview domains retain their configured URL.

SEO metadata is defined once in `app/site-config.ts` and reused by the page
metadata, canonical URL, Open Graph/Twitter cards, robots.txt, sitemap, and
structured data.

## Website analytics

PostHog is initialized site-wide in `instrumentation-client.ts`, following the
[PostHog Next.js integration](https://posthog.com/docs/libraries/next-js).
The SDK loads asynchronously after the page load event, when the main thread is
idle. It captures page views, client-side navigation, page leaves, and
automatic click/form interactions after initialization. Visits that end and
interactions that occur before initialization are not captured. Session recording,
surveys, and heatmaps are disabled, and no
user identity or form values are explicitly sent by this integration.
Core Web Vitals capture is enabled for post-deployment field measurement.

Add these values to `.env` or `.env.local` and your hosting environment:

```dotenv
NEXT_PUBLIC_POSTHOG_KEY=phc_your_public_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Get the public project key from PostHog project settings. For an EU project,
use `https://eu.i.posthog.com` as the host. Do not use a personal API key.
Leaving the key empty disables analytics. A configured key also enables
tracking locally; leave it empty locally or use a separate test project.

Restart the development server after setting these values. For production,
set them **before building**, then rebuild and deploy: Next.js embeds
`NEXT_PUBLIC_*` values in the browser bundle at build time.
To verify, open the site, navigate to another page, and check PostHog's
activity feed for `$pageview` and `$autocapture` events.

Keep the entry point named `instrumentation-client.ts`: `instrumentation.ts`
is the server hook and will not load the browser SDK. The npm package is
bundled into Next.js's `/_next/static/` JavaScript chunks, so there may be no
separate `posthog.js` request. In DevTools, use the **All** or **Fetch/XHR**
Network filter and look for requests to your PostHog host, including `/e/`
event requests. If they are missing, check that the public key was set at
build time; if they are blocked, test in a browser without a tracking blocker.

## Blog

The repository-backed blog lives at `/blog`. Article Markdown is stored in
`content/blogs/`, while titles, dates, images, tags, authors, and draft status
live in `content/blog.json`. Published articles are validated and statically
rendered at `/blog/<slug>` during the production build.

See [docs/blog-authoring.md](docs/blog-authoring.md) before publishing a post.

## What's inside

- **App Router** page composed from one component per section: `Navbar`, `Hero`, `Features`, `HowItWorks`, `Testimonials`, `Referral`, `Pricing`, `Faq`, `FinalCta` (under `app/components/`).
- **Fonts** - Poppins, self-hosted at build time via `next/font/google` (no runtime Google calls).
- **Assets** - every image is local in `public/images/` (phone mockups, app icons, step visuals, padlock).
- **Gradients** - the hero's animated liquid gradient is a custom WebGL/GLSL shader (`app/components/LiquidGradient.tsx`) tuned to biu's warm mauve → peach → cream palette, matching Framer's "Liquid Gradient" look (domain-warped fbm noise + grain, slow drift). The final CTA uses CSS gradients.
- **Styling** - CSS Modules per component with a shared token set in `app/globals.css`.

## Performance

The hero gradient renders in an OffscreenCanvas worker where supported, with a
main-thread renderer for older browsers and a CSS fallback when WebGL is
unavailable or reduced motion is requested. The worker receives the shared shader
source from the component and pauses when hidden, offscreen, or during scrolling.
`public/effects/liquid-gradient.v1.js` is cached as immutable: bump its filename
and the URL in `LiquidGradient.tsx` whenever its contents change.

Homepage image imports use content-hashed asset URLs, responsive sizes, and
AVIF/WebP negotiation. The hero phone uses prebuilt variants to avoid conversion
on the critical request. After changing `public/images/phone-mockup.png`, run
`npm run images:hero` and commit the generated variants before building.
Only critical imagery is preloaded. Page CSS is inlined
in production using Next.js's experimental `inlineCss` option; validate it after
framework upgrades. Lenis loads on the first desktop wheel interaction.

See [the performance audit](docs/performance-audit-2026-09-17.md) for validation
results and production verification steps.

## Palette

| token           | value     | use                   |
| --------------- | --------- | --------------------- |
| `--cream`       | `#faf2df` | light section bg      |
| `--cream-card`  | `#f3ecdf` | card surfaces         |
| `--ink`         | `#2c2722` | primary text          |
| `--features-bg` | `#2a2622` | dark features section |
| `--muted`       | `#7a6f5e` | secondary text        |
| `--berry`       | `#8a3b43` | primary accent        |
| `--green`       | `#5e8c5a` | secondary accent      |
