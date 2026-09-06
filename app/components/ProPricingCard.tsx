"use client";

import { useState } from "react";
import { appAccessHref } from "../site-config";
import { productData } from "../product-data";
import { Check } from "./icons";
import LiquidGradient from "./LiquidGradient";
import styles from "./Pricing.module.css";

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
  cta: "request access",
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

export default function ProPricingCard() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const billing = billingOptions[billingCycle];

  const toggleBilling = () => {
    setBillingCycle((current) =>
      current === "monthly" ? "annual" : "monthly",
    );
  };

  return (
    <div className={`${styles.card} ${styles.cardDark}`}>
      <LiquidGradient activation="visible" className={styles.cardGradient} />
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
        {pro.items.map((item) => (
          <li key={item}>
            <span className={`${styles.check} ${styles.checkGreen}`}>
              <Check />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.price}>
          {billing.price}
          <span className={styles.unit}>{billing.unit}</span>
        </div>
        <a href={appAccessHref} className={`${styles.cta} ${styles.ctaBerry}`}>
          {pro.cta}
        </a>
      </div>
    </div>
  );
}
