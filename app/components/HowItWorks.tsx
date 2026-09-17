import {
  CardsIcon,
  PlusIcon,
  RabbitIcon,
  RepeatIcon,
  SparkleIcon,
} from "@/app/ui/ph-icon";
import Image from "next/image";
import add from "../../public/images/marketing/how-it-works-add.png";
import breakDown from "../../public/images/marketing/how-it-works-break-down.png";
import remember from "../../public/images/marketing/how-it-works-remember.png";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    num: "1.",
    title: "add it",
    desc: "paste any link or upload a pdf, video, or photo of your notes.",
    image: add,
    alt: "Links, PDFs, videos, and handwritten notes flowing into biu",
  },
  {
    num: "2.",
    title: "biu breaks it down",
    desc: "a clear summary and a deck of flashcards, generated automatically.",
    image: breakDown,
    alt: "A study document becoming a summary and an organized flashcard deck",
  },
  {
    num: "3.",
    title: "remember it",
    desc: "biu schedules each card from your review history and increases the interval when you answer correctly.",
    image: remember,
    alt: "Flashcards scheduled across widening review intervals to build lasting memory",
  },
];

const tags = [
  { icon: <PlusIcon />, label: "add anything" },
  { icon: <SparkleIcon />, label: "auto summaries" },
  { icon: <CardsIcon />, label: "smart flashcards" },
  { icon: <RepeatIcon />, label: "spaced repetition" },
  { icon: <RabbitIcon />, label: "ai assistant" },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.head}>
        <h2 className="h2">three steps, then it sticks forever</h2>
        <p className={styles.sub}>
          biu keeps the loop simple: add your material, let biu break it down,
          and remember it with a daily quiz.
        </p>
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
              <h3 className={styles.stepTitle}>{s.title}</h3>
            </div>
            <p className={styles.desc}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.tagsWrap}>
        <p className={styles.caption}>small habits, lasting knowledge.</p>
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t.label} className={styles.tag}>
              <span className={styles.tagIcon}>{t.icon}</span>
              <span>{t.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
