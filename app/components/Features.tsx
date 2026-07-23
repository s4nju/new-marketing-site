import Image from "next/image";
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
    tone: "berry" as const,
    desc: "videos, links, pdfs, photos of notes. tap add and walk away.",
  },
  {
    icon: MoonStarsIcon,
    title: "flashcards",
    tone: "green" as const,
    desc: "every item you add generates flashcards tailored to how you learn, automatically.",
  },
  {
    icon: PlantIcon,
    title: "daily quiz",
    tone: "blue" as const,
    desc: "biu schedules each card from your review history and increases the interval when you answer correctly.",
  },
  {
    icon: RabbitIcon,
    title: "assistant",
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
        {cards.map(({ icon: Icon, title, tone, desc }) => (
          <article key={title} className={`${styles.card} ${styles[tone]}`}>
            <div className={styles.cardText}>
              <span className={styles.cardIcon}>
                <Icon size={48} weight="light" />
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
