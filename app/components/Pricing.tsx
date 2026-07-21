import { Check } from "./icons";
import styles from "./Pricing.module.css";

const free = {
  title: "free trial",
  desc: "everything in biu pro, free for 14 days.",
  label: "Includes:",
  items: [
    "add videos, links, pdfs, notes",
    "ai summaries + flashcards",
    "daily spaced-repetition quiz",
    "ai tutor on your notes",
    "streaks + progress tracking",
  ],
  price: "Free",
  cta: "start free trial",
};

const pro = {
  title: "biu pro",
  badge: "MONTHLY",
  desc: "keep everything after your trial. cancel anytime.",
  label: "everything in the trial, plus:",
  items: [
    "unlimited notes + flashcards",
    "unlimited ai tutor",
    "advanced quiz modes",
    "long-term progress + insights",
    "priority support",
  ],
  price: "$5",
  unit: "/month",
  cta: "get biu pro",
};

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.head}>
        <h2 className="h2">start free, upgrade when you&rsquo;re ready</h2>
        <p className={styles.sub}>
          start with a 14-day free trial, no card. keep biu pro going by
          quizzing daily and referring friends, or subscribe when you&rsquo;re
          ready.
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
            <button className={`${styles.cta} ${styles.ctaLight}`}>
              {free.cta}
            </button>
          </div>
        </div>

        {/* pro */}
        <div className={`${styles.card} ${styles.cardDark}`}>
          <div className={styles.proHead}>
            <h3 className={styles.cardTitle}>{pro.title}</h3>
            <span className={styles.badge}>{pro.badge}</span>
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
              {pro.price}
              <span className={styles.unit}>{pro.unit}</span>
            </div>
            <button className={`${styles.cta} ${styles.ctaBerry}`}>
              {pro.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
