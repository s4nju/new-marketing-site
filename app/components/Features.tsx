import Image from "next/image";
import { Plus, Cards, Quiz, Flame } from "./icons";
import styles from "./Features.module.css";

const cards = [
  {
    icon: <Plus />,
    title: "add anything",
    tint: "var(--berry)",
    desc: "videos, links, pdfs, photos of notes. tap add and walk away.",
  },
  {
    icon: <Cards />,
    title: "flashcards",
    tint: "var(--green)",
    desc: "every item you add generates flashcards tailored to how you learn, automatically.",
  },
  {
    icon: <Quiz />,
    title: "daily quiz",
    tint: "var(--green)",
    desc: "spaced repetition shows each card right before you'd forget. pick your ambition: spark, learn, practice, mastery.",
  },
  {
    icon: <Flame />,
    title: "streaks",
    tint: "var(--berry)",
    desc: "track your progress day by day. each review adds momentum - the longer you go, the higher you climb.",
  },
];

const appIcons = [
  "icon-summaries.png",
  "icon-b.png",
  "icon-c.png",
  "icon-d.png",
  "icon-e.png",
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
        {cards.map((c) => (
          <article key={c.title} className={styles.card}>
            <div className={styles.cardText}>
              <span className={styles.cardIcon} style={{ color: c.tint }}>
                {c.icon}
              </span>
              <h3 className={styles.cardTitle} style={{ color: c.tint }}>
                {c.title}
              </h3>
              <p className={styles.cardDesc}>{c.desc}</p>
            </div>
            <div className={styles.cardPhone}>
              <Image
                src="/images/phone-mockup.jpg"
                alt=""
                width={470}
                height={1024}
              />
            </div>
          </article>
        ))}
      </div>

      <div className={styles.additional}>
        <article className={`${styles.card} ${styles.wide}`}>
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle} style={{ color: "var(--berry)" }}>
              add from anywhere
            </h3>
            <p className={styles.cardDesc}>
              youtube, the web, pdfs, slides, or your camera roll - if you can
              open it, biu can learn from it.
            </p>
          </div>
          <div className={styles.appRow}>
            {appIcons.map((s) => (
              <span key={s} className={styles.appIcon}>
                <Image src={`/images/${s}`} alt="" width={64} height={64} />
              </span>
            ))}
          </div>
        </article>

        <article className={`${styles.card} ${styles.narrow}`}>
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle} style={{ color: "var(--green)" }}>
              organise, then explore
            </h3>
            <p className={styles.cardDesc}>
              library, favourites, and collections. explore surfaces new
              material too.
            </p>
          </div>
          <div className={styles.orgIcon}>
            <Image
              src="/images/icon-f.png"
              alt=""
              width={130}
              height={130}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
