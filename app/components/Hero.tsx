import Image from "next/image";
import LiquidGradient from "./LiquidGradient";
import { MoonSparkle, Leaf, Lotus, Lightning } from "./icons";
import styles from "./Hero.module.css";
import { appAccessHref } from "../site-config";

function FloatCard({
  className,
  icon,
  tint,
  title,
  sub,
}: {
  className: string;
  icon: React.ReactNode;
  tint: string;
  title: string;
  sub: string;
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      <span className={styles.cardIcon} style={{ color: tint }}>
        {icon}
      </span>
      <div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardSub}>{sub}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero} id="download">
      <LiquidGradient className={styles.gradient} />
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>learn smarter,</span>
          <span className={styles.titleLine}>remember forever</span>
        </h1>
        <p className={styles.sub}>
          Add anything to biu. It turns your study material into flashcards and
          sets up spaced repetition, so reviewing feels simple and fun—not
          repetitive.
        </p>
        <a href={appAccessHref} className={styles.download}>
          request access
        </a>

        <div className={styles.phoneWrap}>
          <div className={styles.phone}>
            <Image
              src="/images/phone-mockup.png"
              alt="biu app dashboard showing today's quiz, weak cards, and recently added notes"
              decoding="sync"
              loading="eager"
              fetchPriority="high"
              width={470}
              height={1024}
              sizes="(max-width: 820px) calc(100vw - 48px), 360px"
            />
          </div>

          <FloatCard
            className={styles.fSummaries}
            icon={<MoonSparkle />}
            tint="var(--ink)"
            title="summaries"
            sub="auto-generated"
          />
          <FloatCard
            className={styles.fFlash}
            icon={<Leaf />}
            tint="var(--green)"
            title="flashcards"
            sub="made for you"
          />
          <FloatCard
            className={styles.fStreaks}
            icon={<Lightning />}
            tint="var(--berry)"
            title="streaks"
            sub="28 day streak"
          />
          <FloatCard
            className={styles.fQuiz}
            icon={<Lotus />}
            tint="var(--berry)"
            title="daily quiz"
            sub="2 min a day"
          />
        </div>
      </div>
    </section>
  );
}
