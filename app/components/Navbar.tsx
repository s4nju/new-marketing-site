import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { appAccessHref } from "../site-config";

export default function Navbar() {
  return (
    <header className={styles.wrap}>
      <nav className={styles.pill} style={{ backdropFilter: "blur(6px)" }}>
        <Image
          src="/images/biu-logo.png"
          alt="biu logo"
          preload={true}
          loading="eager"
          width={60}
          height={30}
        />
        <div className={styles.links}>
          <a href="/#features">features</a>
          <a href="/#pricing">pricing</a>
          <Link href="/blog">blog</Link>
          <Link href="/faq">faq</Link>
        </div>
        <a href={appAccessHref} className={styles.cta}>
          get beta
        </a>
      </nav>
    </header>
  );
}
