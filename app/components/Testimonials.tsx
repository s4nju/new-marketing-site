import { AppStoreLogoIcon, GooglePlayLogoIcon, StarIcon } from "../ui/ph-icon";
import styles from "./Testimonials.module.css";
import heroStyle from "./Hero.module.css";

const rowA = [
  {
    quote:
      "i used to forget most of what i read within a week. biu's daily reviews finally made it stick - i remember things months later now.",
    name: "Maya O.",
  },
  {
    quote:
      "i barely have ten minutes a day. biu fits into those tiny gaps and it adds up to real progress.",
    name: "Daniel R.",
  },
  {
    quote:
      "i always fizzled out. the streaks keep me coming back - first study habit i've ever kept.",
    name: "Priya N.",
  },
];

const rowB = [
  {
    quote:
      "i drop in a lecture video and get flashcards back in seconds. it feels like magic.",
    name: "Sam K.",
  },
  {
    quote:
      "the quiz lands the exact card i was about to forget. my recall has never been this good.",
    name: "Alex M.",
  },
  {
    quote:
      "i paste a pdf, biu summarises it and quizzes me. studying finally feels effortless.",
    name: "Ines B.",
  },
];

function Card({ quote, name }: { quote: string; name: string }) {
  return (
    <div className={styles.card}>
      <p className={styles.quote}>{quote}</p>
      <div className={styles.name}>{name}</div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.head}>
        <div className={heroStyle.socialProof} style={{ marginBottom: "20px" }}>
          <span className={heroStyle.storeLogos}>
            <AppStoreLogoIcon width={14} height={14} />
            <GooglePlayLogoIcon width={14} height={14} />
          </span>
          loved by 3,433+ learners
          <span className={heroStyle.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} fill="black" />
            ))}
          </span>
        </div>

        <h2 className="h2">learners who finally reached new heights</h2>
      </div>

      <div className={styles.row}>
        <div className={styles.trackLeft}>
          {[...rowA, ...rowA].map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.trackRight}>
          {[...rowB, ...rowB].map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
