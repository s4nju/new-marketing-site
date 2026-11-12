import Link from "next/link";
import { homepageFaqItems, type FaqItem } from "../content";
import FaqAccordion from "./FaqAccordion";
import styles from "./Faq.module.css";

export default function Faq({
  items = homepageFaqItems,
  idPrefix = "faq-answer",
}: {
  items?: readonly FaqItem[];
  idPrefix?: string;
}) {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>questions, answered</h2>
        </div>

        <FaqAccordion items={items} idPrefix={idPrefix} className={styles.homeList} />

        <Link href="/faq" className={styles.allQuestions}>
          view all questions
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
