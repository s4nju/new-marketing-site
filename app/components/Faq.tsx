import Link from "next/link";
import { homepageFaqItems } from "../content";
import FaqAccordion from "./FaqAccordion";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>questions, answered</h2>
          <p className={styles.sub}>
            the essentials about what biu does, what you can add, daily review,
            app access, and pricing.
          </p>
          <Link href="/faq" className={styles.allQuestions}>
            view all questions
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <FaqAccordion items={homepageFaqItems} />
      </div>
    </section>
  );
}
