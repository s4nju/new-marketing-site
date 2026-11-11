import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId: "ccdbc43ddc79551b3e131df6482d72c6",
  worker: defineWorker({
    // Retain the original Worker and its existing encrypted form credentials.
    name: "biu-marketing-dev",
    entrypoint: "vinext/server/fetch-handler",
    // Cloudflare validates this date in UTC.
    compatibilityDate: "2026-11-10",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    previewUrls: false,
    domains: ["getbiu.app", "www.getbiu.app"],
    observability: {
      enabled: true,
      logs: { enabled: true, headSamplingRate: 1 },
      traces: { enabled: true, headSamplingRate: 0.1 },
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      GOOGLE_SHEET_ID: bindings.secret(),
      GOOGLE_SERVICE_ACCOUNT_EMAIL: bindings.secret(),
      GOOGLE_PRIVATE_KEY: bindings.secret(),
    },
  }),
});
