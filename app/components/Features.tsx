import Image from "next/image";
import Link from "next/link";
import addAnything from "../../public/images/app-marketing/add-anything.png";
import library from "../../public/images/app-marketing/library.webp";
import dailyQuiz from "../../public/images/app-marketing/daily-quiz.png";
import assistant from "../../public/images/app-marketing/ai-assistant-image.webp";
import styles from "./Features.module.css";

const cards = [
  {
    title: "add anything",
    href: "/pdf-to-flashcards",
    image: addAnything,
    tone: "berry" as const,
    desc: "videos, links, PDFs, photos of your notes. drop them in and biu does the reading.",
  },
  {
    title: "your library",
    href: "/ai-flashcard-maker",
    image: library,
    tone: "green" as const,
    desc: "keep everything in one place, or pick up decks other learners made.",
  },
  {
    title: "daily quiz",
    href: "/spaced-repetition",
    image: dailyQuiz,
    tone: "blue" as const,
    desc: "a short quiz each day, timed to bring ideas back just before you forget them.",
  },
  {
    title: "AI tutor",
    image: assistant,
    href: "/ai-flashcard-maker",
    tone: "apricot" as const,
    desc: "stuck on something? ask. the tutor starts from your own notes, so answers fit what you're studying.",
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.head}>
        <h2 className={`h2 ${styles.title}`}>
          <span>save it.</span> <span>understand it.</span>{" "}
          <span className={styles.titleLast}>remember it.</span>
        </h2>
        <p className={styles.sub}>
          one app for the whole study loop, from the first read to the exam.
        </p>
      </div>

      <div className={styles.grid}>
        {cards.map(({ title, href, tone, desc, image }) => (
          <article key={title} className={`${styles.card} ${styles[tone]}`}>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>
                <Link href={href}>{title}</Link>
              </h3>
              <p className={styles.cardDesc}>{desc}</p>
            </div>
            <div className={styles.cardPhone}>
              <Image
                src={image}
                alt=""
                sizes="(max-width: 480px) calc(100vw - 96px), (max-width: 720px) calc((100vw - 112px) / 2), (max-width: 1200px) calc((100vw - 200px) / 4), 250px"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
