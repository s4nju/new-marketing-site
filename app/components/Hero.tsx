import PhoneImage from "./PhoneImage";
import LiquidGradient from "./LiquidGradient";
import styles from "./Hero.module.css";
import StoreButtons from "./StoreButtons";

function FloatCard({
  className,
  title,
  sub,
}: {
  className: string;
  title: string;
  sub: string;
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardSub}>{sub}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero} id="download">
      <LiquidGradient className={styles.gradient} />
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>remember</span>
          <span className={styles.titleLine}>
            <span className={styles.anything}>what</span> matters
          </span>
        </h1>
        <p className={styles.sub}>
          turn your study material into AI summaries and flashcards, explore
          ready-made decks, and build a daily review habit with spaced
          repetition.
        </p>

        <StoreButtons className={styles.actions} />

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
            title="summaries"
            sub="the key ideas, fast"
          />
          <FloatCard
            className={styles.fFlash}
            title="shared decks"
            sub="made by learners"
          />
          <FloatCard
            className={styles.fStreaks}
            title="streaks"
            sub="keep showing up"
          />
          <FloatCard
            className={styles.fQuiz}
            title="daily quiz"
            sub="spaced, not crammed"
          />
        </div>
      </div>
    </section>
  );
}
