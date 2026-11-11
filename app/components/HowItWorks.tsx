import Image from "next/image";
import add from "../../public/images/marketing/how-it-works-add.png";
import breakDown from "../../public/images/marketing/how-it-works-break-down.png";
import remember from "../../public/images/marketing/how-it-works-remember.png";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    num: "1",
    title: "add it",
    desc: "one paste or one photo. that's your whole job.",
    image: add,
    alt: "Links, PDFs, videos, and handwritten notes flowing into biu",
  },
  {
    num: "2",
    title: "biu breaks it down",
    desc: "a summary and a deck, ready while you wait.",
    image: breakDown,
    alt: "A study document becoming a summary and an organized flashcard deck",
  },
  {
    num: "3",
    title: "keep it",
    desc: "a few minutes a day. your streak keeps you honest.",
    image: remember,
    alt: "Flashcards scheduled across widening review intervals to build lasting memory",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.head}>
        <h2 className="h2">three steps to a study habit</h2>
        <p className={styles.sub}>add it once. biu handles the rest.</p>
      </div>

      <div className={styles.steps}>
        {steps.map((s, index) => (
          <div
            key={s.title}
            className={styles.step}
            data-scroll-reveal
            style={
              {
                "--reveal-delay": `${index * 0.2}s`,
              } as React.CSSProperties
            }
          >
            <div className={styles.visual}>
              <Image
                alt={s.alt}
                className={styles.visualImage}
                fill
                quality={85}
                sizes="(max-width: 440px) calc(100vw - 48px), (max-width: 860px) 392px, (max-width: 1200px) calc((100vw - 96px) / 3), 368px"
                src={s.image}
              />
            </div>
            <div className={styles.meta}>
              <span className={styles.num} aria-hidden="true">
                {s.num}
              </span>
              <div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
