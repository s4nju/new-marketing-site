import { defineConfig, loadEnv } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import { createHash } from "node:crypto";
import { patchCssModules } from "vite-css-modules";
import path from "node:path";
import nextConfig, { sharedChatHeaders } from "./next.config.mjs";

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";
  const publicEnv = loadEnv(mode, process.cwd(), "NEXT_PUBLIC_");
  return {
    plugins: [
      patchCssModules({ exportMode: "default" }),
      vinext({
        // Keep preview settings separate from the public production site.
        nextConfig: {
          ...nextConfig,
          env: {
            ...publicEnv,
            NEXT_PUBLIC_SITE_URL: isProduction
              ? "https://www.getbiu.app"
              : "https://biu-marketing-dev.sanjib-code.workers.dev",
            NEXT_PUBLIC_POSTHOG_KEY: isProduction
              ? publicEnv.NEXT_PUBLIC_POSTHOG_KEY ?? ""
              : "",
          },
          async headers() {
            return [
              // next.config reads process.env, which vite does not populate
              // from .env files; rebuild the shared-chat rule from loadEnv.
              ...(await nextConfig.headers?.() ?? []).filter(
                (rule) => rule.source !== "/shared-chat/:path*",
              ),
              sharedChatHeaders({
                apiUrl: publicEnv.NEXT_PUBLIC_BIU_API_URL,
                isDev: command === "serve",
              }),
              {
                source: "/:path*",
                ...(isProduction ? {
                  has: [{ type: "host" as const, key: "host", value: ".*\\.workers\\.dev" }],
                } : {}),
                headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
              },
            ];
          },
          async redirects() {
            return isProduction ? [{
              // App-link association files must answer 200 on the apex host
              // too; Apple and Google reject them behind a redirect.
              source: "/:path((?!\\.well-known/).*)",
              has: [{ type: "host", key: "host", value: "getbiu.app" }],
              destination: "https://www.getbiu.app/:path",
              permanent: true,
            }] : [];
          },
        },
        cache: { cdn: staticAssetsAdapter() },
        prerender: { routes: "*" },
        images: { optimizer: imagesOptimizer() },
      }),
      cloudflare({
        viteEnvironment: {
          name: "rsc",
          childEnvironments: ["ssr"],
        },
      }),
    ],
    css: {
      modules: {
        generateScopedName(name: string, filename: string) {
          const relativePath = path.relative(import.meta.dirname, filename.replace(/\?.*$/, "")).replaceAll("\\", "/");
          return `_${name}_${createHash("sha256").update(relativePath).digest("hex").slice(0, 7)}`;
        },
      },
    },
  };
});
