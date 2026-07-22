import Image from "next/image";
import { CloudSlash, ShieldCheck, SlidersHorizontal } from "../ui/ph-icon";
import styles from "./Referral.module.css";

const benefits = [
  { label: "14 days free", Icon: ShieldCheck },
  { label: "refer a friend, +7 days", Icon: SlidersHorizontal },
  { label: "they quiz, you gain", Icon: CloudSlash },
];

export default function Referral() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.lock} aria-hidden="true">
          <Image
            src="/images/icon-padlock.png"
            alt=""
            width={258}
            height={331}
            data-scroll-reveal
          />
        </div>

        <div className={styles.text}>
          <h2 className={styles.title}>
            start free. then
            <br />
            earn more.
          </h2>
          <p className={styles.sub}>
            your 14-day trial is just the beginning. refer a friend and every
            one keeps you going longer - you only pay when the trial ends.
          </p>
        </div>

        <ul className={styles.benefits} aria-label="Trial benefits">
          {benefits.map(({ label, Icon }) => (
            <li key={label} className={styles.benefit}>
              <Icon size={16} weight="regular" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
