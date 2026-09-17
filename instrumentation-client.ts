// This entry runs before hydration; keep the SDK in a separate async chunk.
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();

if (posthogKey) {
  const initialize = async () => {
    try {
      const { default: posthog } = await import("posthog-js");
      posthog.init(posthogKey, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com",
        defaults: "2026-05-30",
        capture_pageview: "history_change",
        capture_pageleave: true,
        autocapture: true,
        person_profiles: "identified_only",
        disable_session_recording: true,
        disable_surveys: true,
        enable_heatmaps: false,
        // Record field Core Web Vitals so improvements can be checked after deploy.
        capture_performance: { web_vitals: true },
      });
    } catch {
      // Analytics failure must never prevent the page from becoming interactive.
    }
  };

  const schedule = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => void initialize(), { timeout: 2000 });
    } else {
      setTimeout(() => void initialize(), 0);
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}
