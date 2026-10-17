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
  "Request deletion of your biu account data. Share the email linked to your account and how you signed in. You can optionally include a reason.";

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
              Request permanent deletion of your biu account and associated
              data without reinstalling the app. We will verify ownership,
              confirm the deletion arrangements and expected timeframe, and
              follow up by email within 30 days of receiving your request.
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
                <strong>2. We verify ownership.</strong> We may ask you to
                confirm access to your account email or provide other
                information reasonably necessary to verify the request. We do
                not ask for passwords or payment credentials.
              </li>
              <li>
                <strong>3. We delete and confirm.</strong> We confirm the
                expected erasure date and any cancellation period. Deletion
                covers your account, saved content, uploads, conversations,
                learning progress, preferences, and associated data held by
                our service providers, subject to limited retention for legal,
                tax, dispute-resolution, security, or fraud-prevention needs.
                We handle requests without undue delay and within applicable
                legal deadlines.
              </li>
            </ol>

            <p className={styles.note}>
              Prefer email? Write to{" "}
              <a href="mailto:admin@getbiu.app">admin@getbiu.app</a> from your
              account email with your sign-in method and an optional reason.
              You can also request deletion in the app under Profile → Your
              data. In-app requests have a 30-day cancellation period before
              permanent erasure begins; using biu does not cancel the request.
              See our{" "}
              <a href="/privacy">privacy policy</a> for details.
            </p>
            <p className={styles.note}>
              Deleting your account does not cancel an Apple or Google
              subscription. Manage it separately in your store’s subscription
              settings. You do not need to cancel a subscription before
              requesting account deletion.
            </p>
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  );
}
