/**
 * Native app identity used by Universal Links (iOS) and App Links (Android).
 *
 * The bundle id and package name are fixed in biu-so `app.json`. The Apple
 * Team ID, App Store id, and Android signing-certificate fingerprints are
 * public values, but they come from env so each deployment can be configured
 * without a code change. When a value is missing, the matching association
 * file returns 404 instead of publishing an association that cannot verify.
 */
export const appIdentity = {
  iosBundleId: "com.flipflop.biu",
  androidPackage: "com.flipflop.biu",
  appleTeamId: process.env.NEXT_PUBLIC_APPLE_TEAM_ID?.trim() || "",
  iosAppStoreId: process.env.NEXT_PUBLIC_IOS_APP_STORE_ID?.trim() || "",
  /** Comma-separated SHA-256 fingerprints (Play App Signing key, upload key). */
  androidCertSha256: (process.env.NEXT_PUBLIC_ANDROID_CERT_SHA256 ?? "")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter((value) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(value)),
} as const;

/** Path prefix the native apps claim. Must match biu-so `app.config.ts`. */
export const sharedChatPathPrefix = "/shared-chat";
