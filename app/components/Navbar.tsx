import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.wrap}>
      <nav className={styles.pill}>
        <a href="#download" className={styles.logo} aria-label="biu home">
          biu
        </a>
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
