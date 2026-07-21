# biu marketing site

A pixel-faithful rebuild of the biu Framer marketing site (`https://biu.framer.website`) in **Next.js** (App Router + TypeScript), with clean, editable React components.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## What's inside

- **App Router** page composed from one component per section: `Navbar`, `Hero`, `Features`, `HowItWorks`, `Testimonials`, `Referral`, `Pricing`, `Faq`, `FinalCta` (under `app/components/`).
- **Fonts** - Poppins, self-hosted at build time via `next/font/google` (no runtime Google calls).
- **Assets** - every image is local in `public/images/` (phone mockups, app icons, step visuals, padlock).
- **Gradients** - the animated liquid gradient in the hero and final CTA is a custom WebGL/GLSL shader (`app/components/LiquidGradient.tsx`) tuned to biu's warm mauve → peach → cream palette, matching Framer's "Liquid Gradient" look (domain-warped fbm noise + grain, slow drift).
- **Styling** - CSS Modules per component with a shared token set in `app/globals.css`.

## Palette

| token | value | use |
| --- | --- | --- |
| `--cream` | `#faf2df` | light section bg |
| `--cream-card` | `#f3ecdf` | card surfaces |
| `--ink` | `#2c2722` | primary text |
| `--features-bg` | `#2a2622` | dark features section |
| `--muted` | `#7a6f5e` | secondary text |
| `--berry` | `#8a3b43` | primary accent |
| `--green` | `#5e8c5a` | secondary accent |
