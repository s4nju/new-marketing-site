import Link from "next/link";
import { featureFlags } from "../feature-flags";
import Image from "next/image";
import logo from "../../public/images/biu-logo.png";
import styles from "./Navbar.module.css";
import { appAccessHref } from "../site-config";

export default function Navbar() {
  return (
    <header className={styles.wrap}>
      <nav className={styles.pill} style={{ backdropFilter: "blur(6px)" }}>
        <Image
          src={logo}
          alt="biu logo"
          preload={true}
          loading="eager"
          width={60}
          height={30}
        />
        <div className={styles.links}>
          <a href="/#features">features</a>
          <a href="/#how-it-works">how it works</a>
          <a href="/#pricing">pricing</a>
          {featureFlags.blogEnabled && <Link href="/blog">blog</Link>}
          <a href="/#faq">faq</a>
        </div>
        <a href={appAccessHref} className={styles.cta}>
          get the app
        </a>
      </nav>
    </header>
  );
}
