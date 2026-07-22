import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.wrap}>
      <nav className={styles.pill}>
        <Link href="/" className={styles.logo}>
          biu
        </Link>
        <div className={styles.links}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#download" className={styles.cta}>
          download now
        </a>
      </nav>
    </header>
  );
}
