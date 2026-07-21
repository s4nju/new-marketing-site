import Image from "next/image";
import styles from "./Referral.module.css";

const badges = ["14 days free", "refer a friend, +7 days", "they quiz, you gain"];

export default function Referral() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h2 className={styles.title}>start free. then earn more.</h2>
          <p className={styles.sub}>
            your 14-day trial is just the beginning. refer a friend and every
            one keeps you going longer - you only pay when the trial ends.
          </p>
          <div className={styles.badges}>
            {badges.map((b, i) => (
              <span key={b} className={styles.badge}>
                {i > 0 && <span className={styles.plus}>+</span>}
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.lock}>
          <Image
            src="/images/icon-padlock.png"
            alt="grainy gradient padlock"
            width={258}
            height={331}
          />
        </div>
      </div>
    </section>
  );
}
