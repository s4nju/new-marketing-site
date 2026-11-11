import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/biu-logo.png";
import { featureFlags } from "../feature-flags";
import styles from "./FinalCta.module.css";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  RedditLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@/app/ui/ph-icon";
import { siteConfig } from "../site-config";
import StoreButtons from "./StoreButtons";

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    Icon: InstagramLogoIcon,
  },
  {
    label: "Facebook",
    href: siteConfig.links.facebook,
    Icon: FacebookLogoIcon,
  },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: YoutubeLogoIcon },
  { label: "Reddit", href: siteConfig.links.reddit, Icon: RedditLogoIcon },
  { label: "X", href: siteConfig.links.x, Icon: XLogoIcon },
].filter((link): link is typeof link & { href: string } => Boolean(link.href));

const columns = [
  {
    title: "product",
    links: [
      { label: "features", href: "/#features" },
      { label: "how it works", href: "/#how-it-works" },
      { label: "pricing", href: "/#pricing" },
      { label: "faq", href: "/faq" },
    ],
  },
  {
    title: "guides",
    links: [
      { label: "study decks from anything", href: "/ai-flashcard-maker" },
      { label: "turn a PDF into a quiz", href: "/pdf-to-flashcards" },
      { label: "how spaced repetition works", href: "/spaced-repetition" },
      ...(featureFlags.blogEnabled ? [{ label: "blog", href: "/blog" }] : []),
    ],
  },
  {
    title: "legal",
    links: [
      { label: "privacy policy", href: "/privacy-policy" },
      { label: "terms of use", href: "/terms" },
      { label: "data deletion", href: "/data-deletion" },
    ],
  },
] as const;

export default function FinalCta() {
  return (
    <footer className={styles.footerBackground}>
      <div className={styles.cta} id="get-biu">
        <div className={styles.ctaInner}>
          <h2 className={styles.title}>
            start remembering
            <br />
            what you learn.
          </h2>
          <p className={styles.sub}>a few minutes a day is enough.</p>
          <StoreButtons className={styles.stores} />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.brand}>
            <Link href="/" aria-label="biu home">
              <Image src={logo} alt="biu logo" width={100} height={50} />
            </Link>
            <p className={styles.tagline}>remember what matters.</p>
          </div>

          {columns.map(({ title, links }) => (
            <nav key={title} className={styles.column} aria-label={title}>
              <h3>{title}</h3>
              {links.map(({ label, href }) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} biu</p>
          {socialLinks.length > 0 ? (
            <div className={styles.socials}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} aria-label={label}>
                  <Icon weight="regular" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
