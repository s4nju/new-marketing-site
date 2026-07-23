export const siteConfig = {
  name: "biu",
  title: "biu - learn anything and remember forever",
  description:
    "biu is your smartest companion. Add anything and it breaks it into flashcards and sets you up for spaced repetition, so reviewing never feels like a chore.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://getbiu.app",
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
