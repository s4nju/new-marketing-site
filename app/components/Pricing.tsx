import { Check } from "./icons";
import ProPricingCard from "./ProPricingCard";
import styles from "./Pricing.module.css";
import { appAccessHref } from "../site-config";

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

export default function Pricing() {
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

        <ProPricingCard />
      </div>
    </section>
  );
}
