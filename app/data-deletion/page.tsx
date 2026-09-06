import type { Metadata } from "next";
import DataDeletionForm from "../components/DataDeletionForm";
import FinalCta from "../components/FinalCta";
import MotionController from "../components/MotionController";
import Navbar from "../components/Navbar";
import { siteConfig } from "../site-config";
import styles from "./DataDeletionPage.module.css";

const path = "/data-deletion";
const title = `Request data deletion | ${siteConfig.name}`;
const description =
  "Request deletion of your biu account data. Share the email linked to your account, how you signed in, and why you want your data deleted.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title,
    description,
  },
};

export default function DataDeletionPage() {
  return (
    <>
      <MotionController />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>privacy request</span>
            <h1 className={styles.title}>request data deletion.</h1>
            <p className={styles.intro}>
              Tell us which account to delete. We will verify the email,
              delete or anonymize your personal information and content
              within 30 days, and confirm by email.
            </p>
          </div>
        </section>

        <section className={styles.body} aria-label="data deletion request form">
          <div className={styles.bodyInner}>
            <div className={styles.card}>
              <DataDeletionForm />
            </div>

            <ol className={styles.steps}>
              <li>
                <strong>1. Submit the form.</strong> Use the email linked to
                your biu account and select whether you signed in with Google
                or Apple.
              </li>
              <li>
                <strong>2. We verify ownership.</strong> We match the email and
                sign-in method before deleting anything.
              </li>
              <li>
                <strong>3. We delete and confirm.</strong> Personal information
                and content are deleted or anonymized within 30 days, except
                where we must retain records for legal, tax, security, or
                fraud-prevention reasons.
              </li>
            </ol>

            <p className={styles.note}>
              Prefer email? Write to{" "}
              <a href="mailto:admin@getbiu.app">admin@getbiu.app</a> from your
              account email with your sign-in method and reason. You can also
              delete your account directly inside the app’s settings. See our{" "}
              <a href="/privacy">privacy policy</a> for details.
            </p>
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  );
}
