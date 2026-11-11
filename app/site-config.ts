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
  title: "biu - AI study app: summaries, tutor, and a daily quiz",
  description:
    "biu turns your videos, PDFs, links, and notes into clear summaries, an AI tutor that knows your material, and a daily quiz that makes it stick. Free on iOS and Android.",
  url: configuredUrl.toString().replace(/\/$/, ""),
  links: {
    // TODO(launch): placeholder store listings. Set NEXT_PUBLIC_IOS_APP_URL and
    // NEXT_PUBLIC_ANDROID_APP_URL (or replace these) once the listings are live.
    ios:
      process.env.NEXT_PUBLIC_IOS_APP_URL?.trim() ||
      "https://apps.apple.com/app/id0000000000",
    android:
      process.env.NEXT_PUBLIC_ANDROID_APP_URL?.trim() ||
      "https://play.google.com/store/apps/details?id=com.flipflop.biu",
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

/** Where "get the app" buttons point: the download section with both stores. */
export const appAccessHref = "/#get-biu";
