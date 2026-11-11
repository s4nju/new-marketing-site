import { AppleLogoIcon, GooglePlayLogoIcon } from "@/app/ui/ph-icon";
import { siteConfig } from "../site-config";
import styles from "./StoreButtons.module.css";

const stores = [
  {
    id: "ios",
    href: siteConfig.links.ios,
    eyebrow: "download on the",
    name: "App Store",
    Icon: AppleLogoIcon,
  },
  {
    id: "android",
    href: siteConfig.links.android,
    eyebrow: "get it on",
    name: "Google Play",
    Icon: GooglePlayLogoIcon,
  },
] as const;

export default function StoreButtons({
  tone = "dark",
  className = "",
}: {
  /** "dark" for light backgrounds, "light" for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`${styles.row} ${className}`}>
      {stores.map(({ id, href, eyebrow, name, Icon }) => (
        <a
          key={id}
          href={href}
          className={`${styles.button} ${styles[tone]}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${eyebrow} ${name}`}
        >
          <Icon size={26} weight="fill" aria-hidden="true" />

          <span className={styles.text}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <span className={styles.name}>{name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
