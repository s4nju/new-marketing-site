import styles from "./Referral.module.css";

/** Trial offer strip shown under the pricing plans. */
export default function TrialBanner() {
  return (
    <div className={styles.banner}>
      <h3 className={styles.title}>every account starts with 7 days of pro.</h3>
      <p className={styles.sub}>
        no card, no auto-renew. finish your daily quiz during the trial and earn
        100 bonus credits a day.
      </p>
    </div>
  );
}
