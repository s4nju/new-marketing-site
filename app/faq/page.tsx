import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "../components/FaqAccordion";
import FinalCta from "../components/FinalCta";
import MotionController from "../components/MotionController";
import Navbar from "../components/Navbar";
import { allFaqItems } from "../content";
import { appAccessHref, siteConfig } from "../site-config";
import styles from "./FaqPage.module.css";

export const metadata: Metadata = {
  title: `Frequently asked questions | ${siteConfig.name}`,
  description:
    "Answers about biu's AI flashcards, supported study material, spaced-repetition quizzes, pricing, referrals, and AI tutor.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    type: "website",
    url: "/faq",
    title: `Frequently asked questions | ${siteConfig.name}`,
    description:
      "Learn how biu turns study material into flashcards and how its daily quizzes, AI tutor, free trial, and pricing work.",
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/faq#faq`,
    url: `${siteConfig.url}/faq`,
    name: `Frequently asked questions | ${siteConfig.name}`,
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <MotionController />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>biu help center</span>
            <h1 className={styles.title}>everything you want to know.</h1>
            <p className={styles.intro}>
              Straight answers about turning study material into flashcards,
              building a daily review habit, starting your free trial, and
              choosing the right plan.
            </p>
            <div className={styles.actions}>
              <a href={appAccessHref} className={styles.primaryAction}>
                request beta access
              </a>
              <Link href="/" className={styles.secondaryAction}>
                back to home
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.questions} aria-labelledby="faq-title">
          <div className={styles.questionsInner}>
            <div className={styles.questionsHead}>
              <span className={styles.count}>{allFaqItems.length} answers</span>
              <h2 id="faq-title">questions, answered</h2>
              <p>
                Open any question for a concise answer. The most important six
                also appear on the homepage.
              </p>
            </div>
            <FaqAccordion
              items={allFaqItems}
              idPrefix="all-faq-answer"
              className={styles.fullList}
            />
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  );
}
