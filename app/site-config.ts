const configuredUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.getbiu.app",
);
// The hosting platform permanently redirects the bare production domain to www.
if (configuredUrl.hostname === "getbiu.app") {
  configuredUrl.hostname = "www.getbiu.app";
  configuredUrl.protocol = "https:";
}

export const siteConfig = {
  name: "biu",
  title: "biu — AI Flashcards & Spaced Repetition Study App",
  description:
    "Turn PDFs, videos, links, and notes into AI flashcards and summaries. Review with biu's daily spaced repetition quiz. Request access to the private beta.",
  url: configuredUrl.toString().replace(/\/$/, ""),
  links: {
    ios: process.env.NEXT_PUBLIC_IOS_APP_URL,
    android: process.env.NEXT_PUBLIC_ANDROID_APP_URL,
    waitlist: process.env.NEXT_PUBLIC_WAITLIST_URL,
    privacy: process.env.NEXT_PUBLIC_PRIVACY_URL,
    newsletter: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
    reddit: process.env.NEXT_PUBLIC_REDDIT_URL,
    x: process.env.NEXT_PUBLIC_X_URL,
  },
} as const;

export const appAccessHref =
  siteConfig.links.waitlist || "/#get-biu";
