import Link from "next/link";
import { ArrowUpRightIcon } from "@/app/ui/ph-icon";
import { productData } from "../product-data";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <div className={styles.head}>
        <span className="eyebrow">a little more room to learn</span>
        <h2 className="h2" id="pricing-title">start free. grow from there.</h2>
        <p className={styles.sub}>{productData.trial.duration} of Pro, no card needed. Keep your daily quiz and saved library free afterward.</p>
      </div>
      <div className={styles.summaryGrid}>
        <div className={styles.summaryPlan}><h3>free</h3><p className={styles.summaryPrice}>$0</p><p>your saved library & daily quiz</p></div>
        {(["plus", "pro"] as const).map((id) => (
          <div className={styles.summaryPlan} key={id}><h3>{id}</h3><p className={styles.summaryPrice}>${productData[id].monthlyAmount}<span>/month</span></p><p>{productData[id].creditsPerMonth.toLocaleString("en-US")} AI credits each month</p></div>
        ))}
      </div>
      <div className={styles.summaryFooter}><Link className="btn btn-dark" href="/pricing">compare plans & pricing <ArrowUpRightIcon size={19} aria-hidden="true" /></Link><p>US prices in USD. Local store prices and taxes apply.</p></div>
    </section>
  );
}
