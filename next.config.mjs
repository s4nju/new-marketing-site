/**
 * Headers for public shared-chat pages. The URL path carries a bearer
 * capability, so the page must never be cached, indexed, framed, or leak its
 * URL through `Referer`. The CSP limits network access to the biu API, which
 * is the only origin the page reads from.
 *
 * Exported so the vinext build (vite.config.ts) can pass its own env and mode.
 *
 * @param {{ apiUrl: string | undefined; isDev: boolean }} options
 */
export function sharedChatHeaders({ apiUrl, isDev }) {
  let apiOrigin = "";
  try {
    apiOrigin = apiUrl ? new URL(apiUrl).origin : "";
  } catch {
    apiOrigin = "";
  }
  const csp = [
    "default-src 'self'",
    // Framework hydration needs inline scripts; dev servers also need eval.
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    // Transcript images are never loaded; only site assets and data URIs.
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${apiOrigin ? ` ${apiOrigin}` : ""}${isDev ? " ws: wss:" : ""}`,
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "object-src 'none'",
  ].join("; ");

  return {
    source: "/shared-chat/:path*",
    headers: [
      { key: "Cache-Control", value: "private, no-store, max-age=0" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
      { key: "Content-Security-Policy", value: csp },
    ],
  };
}

/** @satisfies {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // The site's small CSS payload can arrive with the statically rendered HTML.
    inlineCss: true,
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 160, 256, 320],
  },
  turbopack: {
    root: process.cwd(),
  },
  // vinext does not route dot-prefixed app folders, so the app-link
  // association files live in app/well-known and are rewritten into place.
  async rewrites() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/well-known/apple-app-site-association",
      },
      {
        source: "/.well-known/assetlinks.json",
        destination: "/well-known/assetlinks.json",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/effects/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/optimized/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Must follow the sitewide rule so its Referrer-Policy wins.
      sharedChatHeaders({
        apiUrl: process.env.NEXT_PUBLIC_BIU_API_URL,
        isDev: process.env.NODE_ENV === "development",
      }),
    ];
  },
};
export default nextConfig;
