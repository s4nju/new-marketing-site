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
placeholders. `NEXT_PUBLIC_SITE_URL` defaults to `https://getbiu.app`.

SEO metadata is defined once in `app/site-config.ts` and reused by the page
metadata, canonical URL, Open Graph/Twitter cards, robots.txt, sitemap, and
structured data.

## Website analytics

PostHog is initialized site-wide in `instrumentation-client.ts`, following the
[PostHog Next.js integration](https://posthog.com/docs/libraries/next-js).
It captures initial page views, client-side navigation, page leaves, and
automatic click/form interactions. Session recording is disabled, and no
user identity or form values are explicitly sent by this integration.

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
- **Gradients** - the animated liquid gradient in the hero and final CTA is a custom WebGL/GLSL shader (`app/components/LiquidGradient.tsx`) tuned to biu's warm mauve → peach → cream palette, matching Framer's "Liquid Gradient" look (domain-warped fbm noise + grain, slow drift).
- **Styling** - CSS Modules per component with a shared token set in `app/globals.css`.

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
