"use client";

import { useState } from "react";
import type { FaqItem } from "../content";
import styles from "./Faq.module.css";

type FaqAccordionProps = {
  items: readonly FaqItem[];
  idPrefix?: string;
  className?: string;
};

export default function FaqAccordion({
  items,
  idPrefix = "faq-answer",
  className = "",
}: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={`${styles.list} ${className}`} data-scroll-reveal>
      {items.map((item, index) => {
        const isOpen = open === index;
        const answerId = `${idPrefix}-${index}`;

        return (
          <article
            key={item.q}
            className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
          >
            <button
              className={styles.question}
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              type="button"
            >
              <span>{item.q}</span>
              <span className={styles.plus} aria-hidden="true" />
            </button>
            <div
              id={answerId}
              className={styles.answer}
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className={styles.answerInner}>
                <p>{item.a}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
