const paidFeatures = [
  "AI summaries and flashcards from supported study material",
  "AI tutor, chat attachments, voice input, and recall feedback",
  "Optional AI Memory with separate consent",
  "Manual flashcards and Anki imports",
] as const;

export const productData = {
  availability: { status: "Available on iOS and Android", action: "Get the app" },
  inputs: ["videos", "links", "PDFs", "photos of notes"],
  capabilities: [
    "Generate summaries and flashcards from added study material",
    "Schedule flashcards in a daily spaced-repetition quiz",
    "Answer questions with an AI tutor grounded in notes or a collection",
    "Organize content, collections, and decks in a personal library",
    "Explore, clone, and publish official or community study decks",
    "Sync saved material, review history, and progress across devices",
    "Track streaks and use skip passes",
  ],
  trial: {
    name: "7-day free Pro trial", price: "$0", duration: "7 days",
    paymentCardRequired: false, availability: "Eligible new accounts",
    rewardCredits: 100, rewardCap: 7,
  },
  plus: {
    name: "biu Plus", monthlyPrice: "$6.90/month", yearlyPrice: "$69/year",
    monthlyAmount: "6.90", yearlyAmount: "69", creditsPerMonth: 2000,
    availability: "In-app subscription", cancellation: "Cancel store auto-renewal anytime",
    features: paidFeatures,
  },
  pro: {
    name: "biu Pro", monthlyPrice: "$15/month", yearlyPrice: "$149/year",
    monthlyAmount: "15", yearlyAmount: "149", creditsPerMonth: 5000,
    availability: "In-app subscription", cancellation: "Cancel store auto-renewal anytime",
    features: paidFeatures,
  },
  platforms: ["iOS", "Android"],
  lastUpdated: "2026-11-11",
} as const;
