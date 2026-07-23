import Link from "next/link";
import styles from "./Navbar.module.css";
import { appAccessHref } from "../site-config";

export default function Navbar() {
  return (
    <header className={styles.wrap}>
      <nav className={styles.pill}>
        <Link href="/" className={styles.logo}>
          biu
        </Link>
        <div className={styles.links}>
          <a href="/#features">Features</a>
          <a href="/#pricing">Pricing</a>
          <Link href="/faq">FAQ</Link>
        </div>
        <a href={appAccessHref} className={styles.cta}>
          get biu
        </a>
      </nav>
    </header>
  );
}
