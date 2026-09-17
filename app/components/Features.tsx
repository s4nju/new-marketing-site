import Image from "next/image";
import Link from "next/link";
import addAnything from "../../public/images/app-marketing/add-anything.png";
import library from "../../public/images/app-marketing/library.webp";
import dailyQuiz from "../../public/images/app-marketing/daily-quiz.png";
import assistant from "../../public/images/app-marketing/ai-assistant-image.webp";
import {
  FlowerLotusIcon,
  MoonStarsIcon,
  PlantIcon,
  RabbitIcon,
} from "@/app/ui/ph-icon";
import styles from "./Features.module.css";

const cards = [
  {
    icon: FlowerLotusIcon,
    title: "add anything",
    href: "/pdf-to-flashcards",
    image: addAnything,
    tone: "berry" as const,
    desc: "videos, links, pdfs, photos of notes. tap add and walk away.",
  },
  {
    icon: MoonStarsIcon,
    title: "library",
    href: "/ai-flashcard-maker",
    image: library,
    tone: "green" as const,
    desc: "every item you add is organised to enhnace your learning, automatically.",
  },
  {
    icon: PlantIcon,
    title: "daily quiz",
    href: "/spaced-repetition",
    image: dailyQuiz,
    tone: "blue" as const,
    desc: "biu schedules each card from your review history and increases the interval when you answer correctly.",
  },
  {
    icon: RabbitIcon,
    title: "assistant",
    image: assistant,
    href: "/ai-flashcard-maker",
    tone: "apricot" as const,
    desc: "ask anything from your assistant, it will organize all your random thoughts and give you the perfect answers.",
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.head}>
        <h2 className={`h2 ${styles.title}`}>
          everything you need
          <br />
          to remember forever
        </h2>
        <p className={styles.sub}>
          add a video, link, pdf, or photo of your notes. biu breaks it down at
          fundamental level, and runs super optimized daily quiz. you just
          remember.
        </p>
      </div>

      <div className={styles.grid}>
        {cards.map(({ icon: Icon, title, href, tone, desc, image }) => (
          <article key={title} className={`${styles.card} ${styles[tone]}`}>
            <div className={styles.cardText}>
              <span className={styles.cardIcon}>
                <Icon size={48} weight="light" />
              </span>
              <h3 className={styles.cardTitle}>
                <Link href={href}>{title}</Link>
              </h3>
              <p className={styles.cardDesc}>{desc}</p>
            </div>
            <div className={styles.cardPhone}>
              <Image
                src={image}
                alt=""
                sizes="(max-width: 720px) calc((100vw - 112px) / 2), (max-width: 1200px) calc((100vw - 200px) / 4), 250px"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
