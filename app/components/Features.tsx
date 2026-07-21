import Image from "next/image";
import {
  FlowerLotus,
  MoonStars,
  Plant,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./Features.module.css";

const cards = [
  {
    icon: FlowerLotus,
    title: "add anything",
    tone: "berry" as const,
    desc: "videos, links, pdfs, photos of notes. tap add and walk away.",
  },
  {
    icon: MoonStars,
    title: "flashcards",
    tone: "green" as const,
    desc: "every item you add generates flashcards tailored to how you learn, automatically.",
  },
  {
    icon: Plant,
    title: "daily quiz",
    tone: "green" as const,
    desc: "spaced repetition shows each card right before you'd forget. pick your ambition: spark, learn, practice, mastery.",
  },
  {
    icon: Lightning,
    title: "streaks",
    tone: "berry" as const,
    desc: "track your progress day by day. each review adds momentum - the longer you go, the higher you climb.",
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.head}>
        <h2 className={`h2 ${styles.title}`}>
          everything you need
          <br />
          to make it stick forever
        </h2>
        <p className={styles.sub}>
          add a video, link, pdf, or photo of your notes. biu writes the
          summary, builds the flashcards, and runs your daily quiz. you just
          remember.
        </p>
      </div>

      <div className={styles.grid}>
        {cards.map(({ icon: Icon, title, tone, desc }) => (
          <article
            key={title}
            className={`${styles.card} ${styles[tone]}`}
          >
            <div className={styles.cardText}>
              <span className={styles.cardIcon}>
                <Icon size={40} weight="regular" />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </div>
            <div className={styles.cardPhone}>
              <Image
                src="/images/phone-mockup.jpg"
                alt=""
                width={470}
                height={1024}
                priority={false}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
