import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenIcon,
  SparkleIcon,
  ChatCircleTextIcon,
  CardsIcon,
  CoinsIcon,
  ArrowRightIcon,
  GiftIcon,
  CalendarBlankIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowClockwiseIcon,
} from "@/app/ui/ph-icon";
import Navbar from "../components/Navbar";
import FinalCta from "../components/FinalCta";
import PricingPlans from "../components/ProPricingCard";
import Faq from "../components/Faq";
import { productData } from "../product-data";
import { siteConfig } from "../site-config";
import StudyIllustration from "./StudyIllustration";
import styles from "./PricingPage.module.css";

const description = `Compare biu Free, Plus and Pro. Start with a ${productData.trial.duration} Pro trial, then choose your monthly AI credits. See annual prices, credit rules and billing details.`;
export const metadata: Metadata = {
  title: "biu Pricing: Free, Plus & Pro Plans",
  description,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "a little more room to learn. | biu pricing",
    description,
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "biu Pricing: Free, Plus & Pro Plans",
    description,
  },
};
const formatCredits = (n: number) => n.toLocaleString("en-US");
const sharedFeatures = [
  {
    Icon: CardsIcon,
    title: "make sense of your material",
    text: "Turn supported notes, PDFs, links, and videos into study material.",
  },
  {
    Icon: ChatCircleTextIcon,
    title: "ask your own AI tutor",
    text: "Ask from your notes. Practice your recall.",
  },
  {
    Icon: BookOpenIcon,
    title: "bring your own knowledge",
    text: "Make your own cards or bring your Anki decks along.",
  },
  {
    Icon: SparkleIcon,
    title: "make it feel like you",
    text: "Let your tutor remember, the path you learn.",
  },
];
const pricingQuestions = [
  {
    q: "how do billing and renewals work?",
    a: "Subscribe and manage renewals through Apple or Google. Checkout sets your price, taxes, offers, and billing dates. Purchasing during your trial may start charges immediately. Store refund policies and consumer rights apply.",
  },
  {
    q: "do unused credits carry over?",
    a: "Monthly credits expire each cycle. Subscribe before your trial ends to carry unused trial credits into your first paid cycle; they expire with that cycle.",
  },
  {
    q: "what if an AI task fails?",
    a: "Our side failures aren’t charged, and retries don’t charge twice. A stopped chat may still use credits for work already completed.",
  },
  {
    q: "can I cancel anytime?",
    a: "Yes. Cancel auto-renewal through Apple or Google to stop future renewals. Your signup trial never becomes a paid subscription automatically. Store refund policies apply.",
  },
  {
    q: "what happens when I change plans?",
    a: "Upgrade for more monthly credits, with the allowance difference added once your upgrade is verified. Downgrades keep credits already granted. Your store confirms charges and when changes take effect.",
  },
  {
    q: "what happens to trial credits and access?",
    a: "Your trial starts at first sign-in; its allowance is shown in the app. Subscribe before it ends to carry unused trial credits into your first paid cycle. They expire with that cycle. Losing paid-feature access forfeits your balance.",
  },
];

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/pricing#webpage`,
        url: `${siteConfig.url}/pricing`,
        name: "biu pricing",
        description,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Pricing",
            item: `${siteConfig.url}/pricing`,
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              a little more
              <br />
              room to <em>learn.</em>
            </h1>
            <p>
              make room for your next chapter. <br /> Start free, then grow at
              your own pace.
            </p>
            <a href="#plans" className={styles.heroLink}>
              find your plan <ArrowRightIcon size={19} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.illustration}>
            <StudyIllustration />
          </div>
        </section>

        <section
          id="plans"
          className={styles.plans}
          aria-labelledby="plans-title"
        >
          <div className={styles.sectionHead}>
            <h2 id="plans-title">your pace. your plan.</h2>
          </div>
          <PricingPlans accessHref="#get-biu" />
        </section>

        <section className={styles.trial} aria-labelledby="trial-title">
          <div className={styles.trialArt} aria-hidden="true">
            <GiftIcon size={64} weight="duotone" />
            <span>+{productData.trial.rewardCredits}</span>
          </div>
          <div>
            <span className={styles.eyebrow}>a little head start</span>
            <h2 id="trial-title">
              your first {productData.trial.duration}? on us.
            </h2>
            <p>
              a {productData.trial.name} for all eligible new accounts. No card.
              No cost.
            </p>
            <p>
              Show up for your daily quiz. Earn{" "}
              {productData.trial.rewardCredits} bonus credits a day during your
              trial, up to{" "}
              {productData.trial.rewardCredits * productData.trial.rewardCap}.
              Credits.
            </p>
            <a href="#get-biu" className={styles.textLink}>
              start in the app <ArrowRightIcon size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.included} aria-labelledby="included-title">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>included in Plus & Pro</span>
            <h2 id="included-title">
              all the tools.
              <br />
              no choosing favorites.
            </h2>
          </div>
          <div className={styles.featureGrid}>
            {sharedFeatures.map(({ Icon, title, text }) => (
              <article key={title}>
                <span className={styles.featureIcon}>
                  <Icon size={30} weight="duotone" aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.credits} aria-labelledby="credits-title">
          <div className={styles.creditIntro}>
            <span className={styles.eyebrow}>a small guide to credits</span>
            <h2 id="credits-title">
              a little fuel.
              <br />a lot to discover.
            </h2>
            <p>decide according to your learning load.</p>
            <div className={styles.creditMeter}>
              <div>
                <CoinsIcon size={26} weight="duotone" aria-hidden="true" />
                <span>enough to discover a lot every month</span>
              </div>
              <p>
                Plus{" "}
                <strong>
                  {formatCredits(productData.plus.creditsPerMonth)}
                </strong>
              </p>
              <div className={styles.meterTrack}>
                <span
                  style={{
                    width: `${(productData.plus.creditsPerMonth / productData.pro.creditsPerMonth) * 100}%`,
                  }}
                />
              </div>
              <p>
                Pro{" "}
                <strong>
                  {formatCredits(productData.pro.creditsPerMonth)}
                </strong>
              </p>
              <div className={styles.meterTrack}>
                <span style={{ width: "100%" }} />
              </div>
              <small>
                Same features.{" "}
                {productData.pro.creditsPerMonth /
                  productData.plus.creditsPerMonth}
                × the monthly credits with Pro.
              </small>
            </div>
          </div>
          <div className={styles.creditRules}>
            <article>
              <SparkleIcon size={25} aria-hidden="true" />
              <div>
                <h3>use credit to supercharge your learning</h3>
                <p>AI workload require credits, everything else does not.</p>
              </div>
            </article>
            <article>
              <CheckCircleIcon size={25} aria-hidden="true" />
              <div>
                <h3>keep the everyday habit free</h3>
                <p>
                  your daily learning activity does not require any credits.
                  <br />
                  that's on us.
                </p>
              </div>
            </article>
            <article>
              <CalendarBlankIcon size={25} aria-hidden="true" />
              <div>
                <h3>a fresh allowance each month</h3>
                <p>
                  Credits refresh monthly,
                  <br /> for you to keep going at full speed.
                </p>
              </div>
            </article>
            <article>
              <ShieldCheckIcon size={25} aria-hidden="true" />
              <div>
                <h3>know what you’re using</h3>
                <p>
                  We keep everything transparent, track expense in Profile →
                  Credits.
                  <br />
                  No automatic top-ups.
                </p>
              </div>
            </article>
          </div>
        </section>

        <Faq items={pricingQuestions} idPrefix="pricing-faq" />
      </main>
      <FinalCta />
    </>
  );
}
