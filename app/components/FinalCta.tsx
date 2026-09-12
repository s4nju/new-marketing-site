import Image from "next/image";
import styles from "./FinalCta.module.css";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  RedditLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@/app/ui/ph-icon";
import { siteConfig } from "../site-config";
import BetaAccessForm from "./BetaAccessForm";

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

const pageLinks = [
  // { label: "get the app", href: "/#download" },
  { label: "blog", href: "/blog" },
  { label: "all FAQs", href: "/faq" },
  { label: "privacy policy", href: siteConfig.links.privacy },
  { label: "terms", href: "/terms" },
  { label: "data deletion", href: "/data-deletion" },
].filter((link): link is typeof link & { href: string } => Boolean(link.href));

const learnLinks = [
  { label: "AI flashcard maker", href: "/ai-flashcard-maker" },
  { label: "PDF to flashcards", href: "/pdf-to-flashcards" },
  { label: "spaced repetition", href: "/spaced-repetition" },
] as const;

export default function FinalCta() {
  return (
    <section className={styles.section} id="get-biu">
      <footer className={styles.footer}>
        <div
          style={{ maxWidth: "85%", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className={styles.cta}>
            <div className={styles.ctaCopy}>
              <div className={styles.copyText}>
                <h2 className={styles.title}>
                  start remembering what you learn.
                </h2>
                <p className={styles.sub}>
                  biu is in private beta. request access to add your first note
                  and try the learning workflow before public launch.
                </p>
              </div>
              <div className={styles.buttons}>
                <BetaAccessForm />
              </div>
            </div>

            <div
              className={styles.phoneFrame}
              data-scroll-reveal
              style={{ "--reveal-y": "80px" } as React.CSSProperties}
            >
              <Image
                src="/images/phone-mockup.png"
                alt="iPhone mockup displaying the biu learning dashboard."
                width={470}
                height={1024}
                sizes="(max-width: 900px) 86vw, 355px"
              />
            </div>
          </div>

          <div className={styles.footerGrid}>
            <div className={styles.brandColumn}>
              <Image
                src="/images/biu-logo.png"
                alt="biu logo"
                preload={true}
                loading="eager"
                width={100}
                height={50}
              />

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

            <nav className={styles.linkColumn} aria-label="Footer navigation">
              <h3>navigation</h3>
              <a href="/#features">features</a>
              <a href="/#how-it-works">how it works</a>
              {/* <a href="#testimonials">testimonials</a> */}
              {/* <a href="/pricing">pricing</a> */}
              <a href="/#faq">faq</a>
            </nav>

            <nav className={styles.linkColumn} aria-label="Pages">
              <h3>pages</h3>
              {pageLinks.map(({ label, href }) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </nav>

            {/* new pages links. will be polished and added later. */}
            {/* <nav className={styles.linkColumn} aria-label="Learn">
              <h3>learn</h3>
              {learnLinks.map(({ label, href }) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </nav> */}

            {siteConfig.links.newsletter ? (
              <div className={styles.newsletter}>
                <h3>subscribe to the newsletter</h3>
                <p>stay informed about biu.</p>
                <form
                  className={styles.form}
                  action={siteConfig.links.newsletter}
                  method="post"
                >
                  <label className={styles.srOnly} htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    placeholder="email"
                    required
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </footer>
    </section>
  );
}
