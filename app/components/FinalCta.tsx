import Image from "next/image";
import LiquidGradient from "./LiquidGradient";
import { Android } from "./icons";
import styles from "./FinalCta.module.css";
import { AppStoreLogoIcon } from "@/app/ui/ph-icon";

export default function FinalCta() {
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <LiquidGradient className={styles.gradient} />
        <div className={styles.inner}>
          <h2 className={styles.title}>start remembering what you learn.</h2>
          <p className={styles.sub}>
            free early access, no card needed. add your first note and let biu
            handle the rest.
          </p>
          <div className={styles.buttons}>
            <a href="#" className={styles.btn}>
              <AppStoreLogoIcon />
              download on ios
            </a>
            <a href="#" className={`${styles.btn} ${styles.btnLight}`}>
              <Android />
              download on android
            </a>
          </div>
          <div className={styles.phone}>
            <Image
              src="/images/phone-mockup.jpg"
              alt=""
              width={470}
              height={1024}
            />
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footInner}>
          <span className={styles.logo}>biu</span>
          <nav className={styles.footLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#">Legal &amp; Privacy</a>
          </nav>
          <span className={styles.copy}>© 2026 biu. all rights reserved.</span>
        </div>
      </footer>
    </section>
  );
}
