import PhoneImage from "./PhoneImage";
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
          <span className={styles.titleLine}>never forget</span>
          <span className={styles.titleLine}>
            <span className={styles.anything}>anything</span> important
          </span>
        </h1>
        <p className={styles.sub}>
          bring biu anything you want to remember, it will power-up your memory
          with AI flashcards and spaced-repetition - remembering will never be
          hard again.
        </p>

        <a href={appAccessHref} className={styles.download}>
          request beta access
        </a>

        <div className={styles.phoneWrap}>
          <div className={styles.phone}>
            <PhoneImage
              alt="biu app dashboard showing today's quiz, weak cards, and recently added notes"
              eager
              sizes="(max-width: 407px) calc(100vw - 60px), 348px"
            />
          </div>

          <FloatCard
            className={styles.fSummaries}
            icon={<MoonSparkle />}
            tint="var(--ink)"
            title="summaries"
            sub="the key ideas"
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
            sub="keep showing up"
          />
          <FloatCard
            className={styles.fQuiz}
            icon={<Lotus />}
            tint="var(--berry)"
            title="daily quiz"
            sub="your next review"
          />
        </div>
      </div>
    </section>
  );
}
