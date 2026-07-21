import {
  CardsIcon,
  PlusIcon,
  RabbitIcon,
  RepeatIcon,
  SparkleIcon,
} from "@/app/ui/ph-icon";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    num: "1.",
    title: "add it",
    desc: "paste any link or upload a pdf, video, or photo of your notes.",
    bg: "/images/img-cloak.jpg",
    overlays: [
      { src: "/images/ui-mood.jpg", w: 204, cls: "ov1" },
      { src: "/images/ui-energy-slider.jpg", w: 199, cls: "ov2" },
    ],
  },
  {
    num: "2.",
    title: "biu breaks it down",
    desc: "a clear summary and a deck of flashcards, generated automatically.",
    bg: "",
    overlays: [
      { src: "/images/ui-energy-trend.jpg", w: 212, cls: "ov3" },
      { src: "/images/ui-sleep.jpg", w: 237, cls: "ov4" },
    ],
  },
  {
    num: "3.",
    title: "remember it",
    desc: "a scientifically tuned daily quiz resurfaces each card right before you'd forget.",
    bg: "/images/img-blossoms.png",
    overlays: [{ src: "/images/ui-routine.jpg", w: 300, cls: "ov5" }],
  },
];

const tags = [
  { icon: <PlusIcon />, label: "add anything" },
  { icon: <SparkleIcon />, label: "auto summaries" },
  { icon: <CardsIcon />, label: "smart flashcards" },
  { icon: <RepeatIcon />, label: "spaced repetition" },
  { icon: <RabbitIcon />, label: "ai assistant" },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className="h2">three steps, then it sticks forever</h2>
        <p className={styles.sub}>
          biu keeps the loop simple: add your material, let biu break it down,
          and remember it with a daily quiz.
        </p>
      </div>

      <div className={styles.steps}>
        {steps.map((s) => (
          <div key={s.title} className={styles.step}>
            <div
              className={`${styles.visual} ${!s.bg ? styles.visualPlain : ""}`}
              style={s.bg ? { backgroundImage: `url(${s.bg})` } : undefined}
            >
              {s.overlays.map((o, i) => (
                <span
                  key={i}
                  className={`${styles.overlay} ${styles[o.cls]}`}
                  style={{ width: o.w }}
                >
                  <img src={o.src} alt="" />
                </span>
              ))}
            </div>
            <div className={styles.meta}>
              <h3 className={styles.stepTitle}>{s.title}</h3>
            </div>
            <p className={styles.desc}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.tagsWrap}>
        <p className={styles.caption}>small habits, lasting knowledge.</p>
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t.label} className={styles.tag}>
              <span className={styles.tagIcon}>{t.icon}</span>
              <span>{t.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
