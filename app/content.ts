export type FaqItem = {
  q: string;
  a: string;
};

export const homepageFaqItems = [
  {
    q: "what is biu?",
    a: "biu is a study app that turns videos, links, PDFs, and photos of notes into summaries and flashcards. It then schedules those cards in a short daily spaced-repetition quiz, helping you review material over time without planning every study session yourself.",
  },
  {
    q: "what study material can i add?",
    a: "you can add videos, links, PDFs, and photos of handwritten or printed notes. biu processes the material and organizes it into a clear summary and a deck of flashcards for review.",
  },
  {
    q: "how does biu create flashcards?",
    a: "after you add study material, biu breaks the content into a summary and generates a deck of flashcards automatically. Those cards become part of your review history and daily quiz.",
  },
  {
    q: "how does the daily quiz work?",
    a: "biu uses your review history to schedule each flashcard. When you answer a card correctly, the interval before its next review increases, so the daily quiz focuses on material that is due for practice.",
  },
  {
    q: "is biu free?",
    a: "biu is currently in private beta. The planned public launch includes a 14-day free trial with no card required, followed by biu Pro at a planned price of $14.99 per month or $99 per year. Pricing may change before launch.",
  },
  {
    q: "does biu include an ai tutor?",
    a: "yes. You can ask the AI tutor questions and ground its answers in your own notes or an entire collection, so the conversation stays connected to the study material you added.",
  },
] as const satisfies readonly FaqItem[];

export const additionalFaqItems = [
  {
    q: "what if i miss a day?",
    a: "a skip pass protects your streak. passes refill monthly, and missed days are auto-protected while you have them.",
  },
  {
    q: "how do referrals extend my access?",
    a: "each successful friend referral adds seven days to your access. The referral program also rewards ongoing quiz activity, helping active learners keep biu Pro for longer before paying.",
  },
  {
    q: "what is included in biu pro?",
    a: "biu Pro includes unlimited notes and flashcards, unlimited use of the AI tutor, advanced quiz modes, long-term progress insights, and priority support.",
  },
  {
    q: "where is biu available?",
    a: "biu is being prepared for iOS and Android and is currently in private beta. You can request beta access now; public app downloads and the self-serve trial are planned for launch.",
  },
  {
    q: "does my progress sync across devices?",
    a: "yes. biu syncs your learning progress across devices, so your review history and the information used to schedule future quizzes stay up to date.",
  },
  {
    q: "can i cancel biu pro?",
    a: "yes. biu Pro subscription can be cancelled at any time. Your 14-day trial comes first, before a paid monthly or yearly plan begins.",
  },
] as const satisfies readonly FaqItem[];

export const allFaqItems = [
  ...homepageFaqItems,
  ...additionalFaqItems,
] as const satisfies readonly FaqItem[];

// Kept as an alias for existing imports while the homepage uses the concise set.
export const faqItems = homepageFaqItems;
