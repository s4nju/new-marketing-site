"use client";

import { useState } from "react";
import { Check } from "./icons";
import LiquidGradient from "./LiquidGradient";
import styles from "./Pricing.module.css";
import { appAccessHref } from "../site-config";
import { productData } from "../product-data";

const free = {
  title: "14-day free trial",
  desc: "everything in biu pro, free for 14 days. no card required.",
  label: "Includes:",
  items: [
    "add videos, links, pdfs, notes",
    "ai summaries + flashcards",
    "daily spaced-repetition quiz",
    "ai tutor on your notes",
    "streaks + progress tracking",
  ],
  price: "Free",
  cta: "request beta access",
};

const pro = {
  title: "biu pro",
  desc: "keep everything after your trial. cancel anytime.",
  label: "everything in the trial, plus:",
  items: [
    "unlimited notes + flashcards",
    "unlimited ai tutor",
    "advanced quiz modes",
    "long-term progress + insights",
    "priority support",
  ],
  cta: "request beta",
};

const billingOptions = {
  monthly: {
    label: "MONTHLY",
    price: productData.pro.monthlyPrice.replace("/month", ""),
    unit: "/month",
  },
  annual: {
    label: "YEARLY",
    price: productData.pro.yearlyPrice.replace("/year", ""),
    unit: "/year",
  },
} as const;

type BillingCycle = keyof typeof billingOptions;

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const billing = billingOptions[billingCycle];

  const toggleBilling = () => {
    setBillingCycle((current) =>
      current === "monthly" ? "annual" : "monthly",
    );
  };

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.head}>
        <h2 className="h2">simple pricing, planned for launch</h2>
        <p className={styles.sub}>
          biu is currently in private beta. request access now and review the
          planned public pricing before launch.
        </p>
      </div>

      <div className={styles.grid}>
        {/* free */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{free.title}</h3>
          <p className={styles.cardDesc}>{free.desc}</p>
          <div className={styles.divider} />
          <p className={styles.label}>{free.label}</p>
          <ul className={styles.list}>
            {free.items.map((i) => (
              <li key={i}>
                <span className={styles.check}>
                  <Check />
                </span>
                {i}
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <div className={styles.price}>{free.price}</div>
            <a
              href={appAccessHref}
              className={`${styles.cta} ${styles.ctaLight}`}
            >
              {free.cta}
            </a>
          </div>
        </div>

        {/* pro */}
        <div className={`${styles.card} ${styles.cardDark}`}>
          <LiquidGradient className={styles.cardGradient} />
          <div className={styles.proHead}>
            <h3 className={styles.cardTitle}>{pro.title}</h3>
            <button
              aria-checked={billingCycle === "annual"}
              aria-label={`Switch to ${
                billingCycle === "monthly" ? "annual" : "monthly"
              } billing`}
              className={styles.billingSwitch}
              onClick={toggleBilling}
              role="switch"
              type="button"
            >
              <span className={styles.billingLabel}>{billing.label}</span>
              <span className={styles.switchTrack} aria-hidden="true">
                <span className={styles.switchThumb} />
              </span>
            </button>
          </div>
          <p className={styles.cardDesc}>{pro.desc}</p>
          <div className={styles.divider} />
          <p className={styles.label}>{pro.label}</p>
          <ul className={styles.list}>
            {pro.items.map((i) => (
              <li key={i}>
                <span className={`${styles.check} ${styles.checkGreen}`}>
                  <Check />
                </span>
                {i}
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <div className={styles.price}>
              {billing.price}
              <span className={styles.unit}>{billing.unit}</span>
            </div>
            <a
              href={appAccessHref}
              className={`${styles.cta} ${styles.ctaBerry}`}
            >
              {pro.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
