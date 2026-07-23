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
          <Link href="/#pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <a href={appAccessHref} className={styles.cta}>
          get beta
        </a>
      </nav>
    </header>
  );
}
