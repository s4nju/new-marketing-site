import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { appAccessHref } from "../site-config";
import FinalCta from "./FinalCta";
import MotionController from "./MotionController";
import Navbar from "./Navbar";
import styles from "./EditorialPage.module.css";

export type EditorialFaq = {
  question: string;
  answer: string;
};

export type RelatedPage = {
  href: string;
  label: string;
  title: string;
  description: string;
};

type EditorialPageProps = {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  definitionLabel: string;
  definition: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  imageCaption: string;
  children: ReactNode;
  faqs: readonly EditorialFaq[];
  relatedPages: readonly RelatedPage[];
};

export default function EditorialPage({
  breadcrumbLabel,
  eyebrow,
  title,
  intro,
  definitionLabel,
  definition,
  image,
  imageCaption,
  children,
  faqs,
  relatedPages,
}: EditorialPageProps) {
  return (
    <>
      <MotionController />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{breadcrumbLabel}</span>
              </nav>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.intro}>{intro}</p>
              <div className={styles.actions}>
                <a href={appAccessHref} className={styles.primaryAction}>
                  request beta access
                </a>
                <Link href="/#pricing" className={styles.secondaryAction}>
                  view planned pricing
                </Link>
              </div>
            </div>

            <figure className={styles.heroVisual}>
              <div className={styles.imageFrame}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 900px) 86vw, 440px"
                  priority
                />
              </div>
              <figcaption>{imageCaption}</figcaption>
            </figure>
          </div>

          <div className={styles.definition}>
            <p>{definitionLabel}</p>
            <strong>{definition}</strong>
          </div>
        </section>

        <article className={styles.article}>{children}</article>

        <section className={styles.faqSection} aria-labelledby="page-faq-title">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>quick answers</p>
            <h2 id="page-faq-title">frequently asked questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className={styles.relatedSection}
          aria-labelledby="related-pages-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>keep exploring</p>
            <h2 id="related-pages-title">related biu guides</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedPages.map((page) => (
              <Link
                href={page.href}
                className={styles.relatedCard}
                key={page.href}
              >
                <span>{page.label}</span>
                <h3>{page.title}</h3>
                <p>{page.description}</p>
                <strong aria-hidden="true">read more →</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  );
}

export function ContentSection({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.contentSection}>
      <div className={styles.sectionHeading}>
        {eyebrow ? <p className={styles.kicker}>{eyebrow}</p> : null}
        <h2>{title}</h2>
        {intro ? <p className={styles.sectionIntro}>{intro}</p> : null}
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function CardGrid({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <div className={styles.infoCard} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function NumberedSteps({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <ol className={styles.steps}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function EditorialNote({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.note}>
      <p>{title}</p>
      <div>{children}</div>
    </aside>
  );
}

export function SourceList({
  sources,
}: {
  sources: readonly {
    title: string;
    detail: string;
    href: string;
  }[];
}) {
  return (
    <ol className={styles.sourceList}>
      {sources.map((source) => (
        <li key={source.href}>
          <a href={source.href} rel="noreferrer">
            {source.title}
          </a>
          <p>{source.detail}</p>
        </li>
      ))}
    </ol>
  );
}
