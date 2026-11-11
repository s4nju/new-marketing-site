"use client";

import { useState } from "react";
import { appAccessHref } from "../site-config";
import { productData } from "../product-data";
import { Check } from "./icons";
import styles from "./Pricing.module.css";

const aiFeatures = [
  "AI summaries and study decks from videos, PDFs, links, and notes",
  "AI assistant with all your learning knowledge",
  "Quick feedback on your active-recall quiz answer",
  "bring your own cards or look into community decks",
  "a tutor that adapts your learning preferences",
] as const;

const credits = (n: number) => n.toLocaleString("en-US");

const plans = [
  {
    id: "free",
    name: "free",
    tagline: "the daily habit, on the house",
    listLabel: "included",
    features: [
      "your library, synced across devices",
      "daily spaced-repetition quiz",
      "streaks and skip passes",
      "decks made by other learners",
    ],
  },
  {
    id: "plus",
    name: "plus",
    tagline: "for steady, everyday study",
    listLabel: "everything in free, and:",
    features: [
      `${credits(productData.plus.creditsPerMonth)} AI credits every month`,
      ...aiFeatures,
    ],
  },
  {
    id: "pro",
    name: "pro",
    tagline: "to push the boundaries.",
    listLabel: "everything in free, and:",
    features: [
      `${credits(productData.pro.creditsPerMonth)} AI credits every month`,
      ...aiFeatures,
    ],
  },
] as const;

export default function PricingPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <div className={styles.billing} role="group" aria-label="Billing period">
        <button
          aria-pressed={!annual}
          className={styles.billingOption}
          onClick={() => setAnnual(false)}
          type="button"
        >
          monthly
        </button>
        <button
          aria-pressed={annual}
          className={styles.billingOption}
          onClick={() => setAnnual(true)}
          type="button"
        >
          yearly
          <span className={styles.billingSave}>2 months free</span>
        </button>
      </div>

      <div className={styles.grid}>
        {plans.map((plan) => {
          const paid = plan.id === "free" ? null : productData[plan.id];
          const tone =
            plan.id === "pro"
              ? styles.cardDark
              : plan.id === "free"
                ? styles.cardFree
                : "";
          const price = paid
            ? annual
              ? paid.yearlyAmount
              : paid.monthlyAmount
            : "0";
          const note = paid
            ? annual
              ? `$${(Number(paid.yearlyAmount) / 12).toFixed(2)}/mo, billed yearly. cancel anytime.`
              : "billed monthly. cancel anytime."
            : "no card needed.";

          return (
            <div key={plan.id} className={`${styles.card} ${tone}`}>
              <h3 className={styles.cardTitle}>{plan.name}</h3>
              <p className={styles.cardDesc}>{plan.tagline}</p>
              <div className={styles.price}>
                ${price}
                {paid ? (
                  <span className={styles.unit}>
                    {annual ? "/year" : "/month"}
                  </span>
                ) : null}
              </div>
              <p className={styles.billingNote}>{note}</p>
              <a
                href={appAccessHref}
                className={`${styles.cta} ${plan.id === "pro" ? styles.ctaBerry : plan.id === "plus" ? styles.ctaDark : styles.ctaOutline}`}
              >
                {paid ? `choose ${plan.name}` : "get the app"}
              </a>
              <div className={styles.divider} />
              <p className={styles.label}>{plan.listLabel}</p>
              <ul className={styles.list}>
                {plan.features.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
