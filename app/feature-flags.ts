/** Release switches. Changes require a new build and deployment. */
export const featureFlags = {
  // Publish reviewed articles; per-post draft flags keep unfinished work private.
  blogEnabled: true,
} as const;
