import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "../components/FinalCta";
import MotionController from "../components/MotionController";
import Navbar from "../components/Navbar";
import styles from "./SupportPage.module.css";

const title = "biu support";
const description =
  "Contact biu for help with your account, subscriptions, flashcards, and daily quizzes.";
const supportEmail = "admin@getbiu.app";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/support" },
  openGraph: { type: "website", url: "/support", title, description },
};

export default function SupportPage() {
  return (
    <>
      <MotionController />
      <Navbar />
      <main className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.intro}>
            <h1>{title}</h1>
            <p>Get help with your account, subscription, or study library.</p>
          </header>

          <section className={styles.contact} aria-labelledby="contact-title">
            <h2 id="contact-title">Email support</h2>
            <p>
              Tell us what happened and include your device model and app version
              if you know them. Leave out passwords, verification codes, and
              payment details.
            </p>
            <a className={styles.email} href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            <p className={styles.company}>FlipFlop Labs Private Limited</p>
          </section>

          <section className={styles.topics} aria-labelledby="topics-title">
            <h2 id="topics-title">Common questions</h2>
            <dl>
              <dt>I can’t find my library</dt>
              <dd>
                Sign in with the same Google or Apple account you used when you
                first set up biu.
              </dd>

              <dt>My App Store purchase isn’t showing up</dt>
              <dd>
                Sign in to your original biu account and tap Restore purchase in
                Profile. Make sure the App Store is signed into the Apple Account
                you used to buy the subscription.
              </dd>

              <dt>How do I manage or cancel my subscription?</dt>
              <dd>
                For an App Store purchase, open Settings on your iPhone, tap your
                name, then tap Subscriptions.{" "}
                <a href="https://support.apple.com/en-us/118428">
                  Apple’s subscription instructions
                </a>
              </dd>

              <dt>How do I delete my account?</dt>
              <dd>
                In biu, open Profile, then Your data. You can also{" "}
                <Link href="/data-deletion">request deletion on the web</Link>.
                Cancel any active store subscription separately.
              </dd>
            </dl>
            <Link href="/faq">Read the biu FAQ</Link>
          </section>
        </div>
      </main>
      <FinalCta />
    </>
  );
}
