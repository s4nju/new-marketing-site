"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import LiquidGradient from "./LiquidGradient";
import { MoonSparkle, Leaf, Lotus, Lightning } from "./icons";
import styles from "./Hero.module.css";
import {
  AppStoreLogoIcon,
  GooglePlayLogoIcon,
  StarIcon,
} from "@/app/ui/ph-icon";

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
  const heroRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isHeroVisibleRef = useRef(true);
  const lastRevealRef = useRef(-1);

  // Map the phone's viewport position to the fan-out progress and write it
  // straight to the DOM (no React re-render). Driven by Lenis every frame,
  // so the value stays continuous and the motion tracks the smooth scroll.
  const update = useCallback(() => {
    // Lenis continues notifying subscribers as the rest of the page scrolls.
    // Avoid forcing layout once the hero is safely outside the viewport.
    if (!isHeroVisibleRef.current) return;

    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // Tucked (0) when the phone first sits in view, fully fanned (1)
    // once it has scrolled up toward the top of the viewport. The wide
    // start/end gap spreads the fan-out over a long scroll for a smooth,
    // gradual reveal rather than a quick snap.
    const start = vh * 0.72;
    const end = vh * 0.15;
    const p = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

    // Skip redundant DOM writes on Lenis frames where the clamped value has
    // already settled at either end of the animation.
    if (Math.abs(p - lastRevealRef.current) < 0.001) return;
    lastRevealRef.current = p;
    el.style.setProperty("--reveal", String(p));
  }, []);

  // Lenis fires this on every interpolated scroll frame.
  useLenis(update);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      isHeroVisibleRef.current = false;
      el.style.setProperty("--reveal", "1");
      return;
    }

    const hero = heroRef.current;
    const observer = hero
      ? new IntersectionObserver(
          ([entry]) => {
            isHeroVisibleRef.current = entry.isIntersecting;
            hero.toggleAttribute("data-active", entry.isIntersecting);
            if (entry.isIntersecting) update();
          },
          // Keep the effect ready just before the hero enters the viewport,
          // but suspend it for the long scroll through the rest of the page.
          { rootMargin: "160px 0px" },
        )
      : null;

    if (hero) observer?.observe(hero);
    update();
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      hero?.removeAttribute("data-active");
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <section ref={heroRef} className={styles.hero} id="download">
      <LiquidGradient className={styles.gradient} />
      <div className={styles.inner}>
        <div className={styles.socialProof}>
          <span className={styles.storeLogos}>
            <AppStoreLogoIcon width={14} height={14} />
            <GooglePlayLogoIcon width={14} height={14} />
          </span>
          loved by 3,433+ learners
          <span className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} fill="black" />
            ))}
          </span>
        </div>
        <h1 className={styles.title}>
          learn smarter,
          <br />
          remember forever
        </h1>
        <p className={styles.sub}>
          Learn once. Remember it longer. biu transforms your study material
          into lasting knowledge, so revision feels simple & fun — not
          repetitive.
        </p>
        <a href="#pricing" className={styles.download}>
          start for free
        </a>

        <div
          ref={wrapRef}
          className={styles.phoneWrap}
          style={{ "--reveal": 0 } as React.CSSProperties}
        >
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
