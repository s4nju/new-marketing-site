import Image from "next/image";
import LiquidGradient from "./LiquidGradient";
import { MoonSparkle, Leaf, Lotus, Lightning } from "./icons";
import styles from "./Hero.module.css";
import {
  AppStoreLogoIcon,
  GooglePlayLogoIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";

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
        <div className={styles.socialProof}>
          <span className={styles.storeLogos}>
            <AppStoreLogoIcon width={15} height={15} />
            <GooglePlayLogoIcon width={14} height={14} />
          </span>
          loved by 3,433+ learners
          <span className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon />
            ))}
          </span>
        </div>
        <h1 className={styles.title}>
          learn smarter,
          <br />
          remember forever
        </h1>
        <p className={styles.sub}>
          biu is your smartest learning companion. it turns anything you study
          into something you remember - so reviewing never feels like a chore.
        </p>
        <a href="#pricing" className={styles.download}>
          download now
        </a>

        <div className={styles.phoneWrap}>
          <div className={styles.phone}>
            <Image
              src="/images/phone-mockup.jpg"
              alt="biu app dashboard showing today's quiz, weak cards, and recently added notes"
              width={470}
              height={1024}
              priority
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
