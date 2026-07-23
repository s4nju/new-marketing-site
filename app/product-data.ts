export const productData = {
  availability: {
    status: "Available",
    action: "Get biu",
  },
  inputs: ["videos", "links", "PDFs", "photos of notes"],
  capabilities: [
    "Generate summaries and flashcards from added study material",
    "Schedule flashcards in a daily spaced-repetition quiz",
    "Answer questions with an AI tutor grounded in the user's notes or collection",
    "Sync notes, review history, and learning progress across devices",
    "Track streaks and apply skip passes",
  ],
  trial: {
    name: "14-day free trial",
    price: "$0",
    duration: "14 days",
    paymentCardRequired: false,
    availability: "Available",
  },
  pro: {
    name: "biu Pro",
    monthlyPrice: "$14.99/month",
    yearlyPrice: "$99/year",
    availability: "Available",
    cancellation: "Cancel anytime",
    features: [
      "Unlimited notes and flashcards",
      "Unlimited AI tutor use",
      "Advanced quiz modes",
      "Long-term progress and insights",
      "Priority support",
    ],
  },
  platforms: ["iOS", "Android"],
  lastUpdated: "2026-07-23",
} as const;
