"use client";

import { useState } from "react";
import { Chevron } from "./icons";
import styles from "./Faq.module.css";

const items = [
  {
    q: "is biu free?",
    a: "yes to start. 14 days of full access, no card. after that, biu pro - and you can earn free pro time by quizzing daily and referring friends.",
  },
  {
    q: "what can i add?",
    a: "videos, web links, pdfs, and images, including photos of handwritten notes.",
  },
  {
    q: "how does the daily quiz work?",
    a: "biu uses tuned spaced-repetition to surface each card right before you'd forget, then spaces it further apart as you get it right.",
  },
  {
    q: "what if i miss a day?",
    a: "a skip pass protects your streak. passes refill monthly, and missed days are auto-protected while you have them.",
  },
  {
    q: "is there an ai tutor?",
    a: "yes. ask it anything and ground it on your own notes or a whole collection. your progress also syncs across devices.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={styles.section} id="faq">
      <div className={styles.head}>
        <h2 className="h2">questions, answered</h2>
        <p className={styles.sub}>
          everything people want to know before starting: pricing, what you can
          add, the daily quiz, and streaks.
        </p>
      </div>

      <div className={styles.list}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div
              key={it.q}
              className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
            >
              <button
                className={styles.q}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {it.q}
                <span
                  className={`${styles.chev} ${isOpen ? styles.chevOpen : ""}`}
                >
                  <Chevron />
                </span>
              </button>
              <div
                className={styles.answer}
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className={styles.answerInner}>
                  <p>{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
