"use client";

import { useState } from "react";
import { appAccessHref } from "../site-config";
import { productData } from "../product-data";
import { Check } from "./icons";
import { BookOpenIcon, PlantIcon, LightningIcon } from "@/app/ui/ph-icon";
import styles from "./Pricing.module.css";

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
      ...productData.plus.features,
    ],
  },
  {
    id: "pro",
    name: "pro",
    tagline: "for a little more room to explore",
    listLabel: "everything in free, and:",
    features: [
      `${credits(productData.pro.creditsPerMonth)} AI credits every month`,
      ...productData.pro.features,
    ],
  },
] as const;

export default function PricingPlans({
  accessHref = appAccessHref,
}: {
  accessHref?: string;
}) {
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
          <span className={styles.billingSave}>(savings plan)</span>
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
              ? `$${(Number(paid.yearlyAmount) / 12).toFixed(2)}/mo, billed yearly. cancel auto-renewal anytime.`
              : "billed monthly. cancel auto-renewal anytime."
            : "no subscription needed.";

          const PlanIcon =
            plan.id === "free"
              ? BookOpenIcon
              : plan.id === "plus"
                ? PlantIcon
                : LightningIcon;
          return (
            <div key={plan.id} className={`${styles.card} ${tone}`}>
              <span className={styles.planIcon}>
                <PlanIcon size={25} weight="duotone" aria-hidden="true" />
              </span>
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
                href={accessHref}
                className={`${styles.cta} ${plan.id === "pro" ? styles.ctaBerry : plan.id === "plus" ? styles.ctaDark : styles.ctaOutline}`}
              >
                {paid ? `get ${plan.name} in the app` : "get the app"}
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
