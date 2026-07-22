import Image from "next/image";
import { Android } from "./icons";
import styles from "./FinalCta.module.css";
import {
  AppStoreLogoIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  RedditLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@/app/ui/ph-icon";

const socialLinks = [
  { label: "Instagram", href: "#", Icon: InstagramLogoIcon },
  { label: "Facebook", href: "#", Icon: FacebookLogoIcon },
  { label: "YouTube", href: "#", Icon: YoutubeLogoIcon },
  { label: "Reddit", href: "#", Icon: RedditLogoIcon },
  { label: "X", href: "#", Icon: XLogoIcon },
];

export default function FinalCta() {
  return (
    <section className={styles.section}>
      <footer className={styles.footer}>
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <div className={styles.copyText}>
              <h2 className={styles.title}>start remembering what you learn.</h2>
              <p className={styles.sub}>
                free early access, no card needed. add your first note and let
                biu handle the rest.
              </p>
            </div>
            <div className={styles.buttons}>
              <a href="#" className={styles.iosButton}>
                <AppStoreLogoIcon weight="fill" />
                download on ios
              </a>
              <a href="#" className={styles.androidButton}>
                <Android />
                download on android
              </a>
            </div>
          </div>

          <div className={styles.phoneFrame}>
            <Image
              src="/images/phone-mockup.jpg"
              alt="iPhone mockup displaying the biu learning dashboard."
              width={470}
              height={1024}
              sizes="(max-width: 900px) 86vw, 355px"
            />
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={styles.brandColumn}>
            <a href="#" className={styles.logo} aria-label="biu home">
              biu
            </a>
            <div className={styles.socials}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} aria-label={label}>
                  <Icon weight="regular" />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.linkColumn} aria-label="Footer navigation">
            <h3>navigation</h3>
            <a href="#features">features</a>
            <a href="#how-it-works">how it works</a>
            <a href="#testimonials">testimonials</a>
            <a href="#pricing">pricing</a>
            <a href="#faq">faq</a>
          </nav>

          <nav className={styles.linkColumn} aria-label="Pages">
            <h3>pages</h3>
            <a href="#">get the app</a>
            <a href="#">waitlist</a>
            <a href="#">legal &amp; privacy</a>
          </nav>

          <div className={styles.newsletter}>
            <h3>subscribe to the newsletter</h3>
            <p>stay informed about biu.</p>
            <form className={styles.form} action="#">
              <label className={styles.srOnly} htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="email"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </footer>
    </section>
  );
}
