"use client";

import { useState } from "react";
import { faqItems } from "../content";
import styles from "./Faq.module.css";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>questions, answered</h2>
          <p className={styles.sub}>
            everything people want to know before starting: pricing, what you
            can add, the daily quiz, and streaks.
          </p>
        </div>

        <div className={styles.list} data-scroll-reveal>
          {faqItems.map((it, i) => {
            const isOpen = open === i;
            const answerId = `faq-answer-${i}`;

            return (
              <article
                key={it.q}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span>{it.q}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
                <div
                  id={answerId}
                  className={styles.answer}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className={styles.answerInner}>
                    <p>{it.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
