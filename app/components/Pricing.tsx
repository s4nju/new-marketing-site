import PricingPlans from "./ProPricingCard";
import TrialBanner from "./Referral";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section
      className={styles.section}
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className={styles.head}>
        <h2 className="h2" id="pricing-title">
          start free. upgrade when you need more.
        </h2>
      </div>
      <PricingPlans />
      <TrialBanner />
    </section>
  );
}
