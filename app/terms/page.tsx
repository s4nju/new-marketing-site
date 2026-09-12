import type { Metadata } from "next";
import styles from "./terms.module.css";
import Navbar from "../components/Navbar";
import FinalCta from "../components/FinalCta";

export const metadata: Metadata = {
  title: "Terms of Service | biu",
  description:
    "The terms that govern your use of the biu app and website, including your account, subscriptions, content, and your rights and responsibilities.",
  alternates: { canonical: "/terms" },
};

const contents = [
  ["eligibility", "Eligibility"],
  ["your-account", "Your account"],
  ["the-service", "The Service"],
  ["billing", "Free trial, subscriptions & billing"],
  ["referral-program", "Referral program"],
  ["your-content", "Your content & license"],
  ["ai-disclaimer", "AI-generated content disclaimer"],
  ["acceptable-use", "Acceptable use"],
  ["our-ip", "Our intellectual property"],
  ["third-party-services", "Third-party services"],
  ["app-store-terms", "Additional terms for App Store users"],
  ["termination", "Termination"],
  ["disclaimers", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["indemnification", "Indemnification"],
  ["governing-law", "Governing law & disputes"],
  ["changes", "Changes to these terms"],
  ["miscellaneous", "Miscellaneous"],
  ["contact", "Contact us"],
] as const;

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className={styles.sectionHeading}>
      <span>{number}</span>
      {children}
    </h2>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <article className={styles.article}>
          <div className={styles.container}>
            <div className={styles.intro}>
              <span className={styles.kicker}>legal</span>
              <h1>Terms of Service</h1>
              <p className={styles.updated}>last updated September 12, 2026</p>
              <p className={styles.lede}>
                These Terms of Service (“<strong>Terms</strong>”) are a legal
                agreement between you and FlipFlop Labs Private Limited (“
                <strong>biu</strong>”, “we”, “us”, or “our”) governing your use
                of the biu mobile app and the website at getbiu.app (together,
                the “Service”). By creating an account, downloading the app, or
                using the Service, you acknowledge that you have read and
                agree to these Terms and our Privacy Policy. If you do not
                agree, please do not create an account, upload content, or use
                the Service.
              </p>
            </div>

            <div className={styles.legalGrid}>
              <nav className={styles.toc} aria-label="table of contents">
                <div className={styles.tocCard}>
                  <p>on this page</p>
                  <ul>
                    {contents.map(([id, label]) => (
                      <li key={id}>
                        <a href={`#${id}`}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className={styles.sections}>
                <section id="eligibility">
                  <SectionHeading number="01">Eligibility</SectionHeading>
                  <p>
                    You must be at least 13 years old to use biu. If you are
                    under the age of majority in your country, you may only use
                    the Service with the consent and supervision of a parent or
                    legal guardian who agrees to these Terms on your behalf. By
                    using the Service, you represent that you meet this age
                    requirement and have the legal capacity to enter into this
                    agreement. biu is not directed to children under 13.
                  </p>
                </section>

                <section id="your-account">
                  <SectionHeading number="02">Your account</SectionHeading>
                  <p>
                    You are responsible for keeping your login credentials
                    confidential and for all activity that happens under your
                    account. If you become aware of any unauthorized access,
                    let us know right away at{" "}
                    <a href="mailto:admin@getbiu.app">admin@getbiu.app</a>. You
                    can delete your account at any time from within the app,
                    which permanently removes the data associated with it as
                    described in our Privacy Policy. Deleting your biu account
                    does not cancel a subscription billed by Apple or Google;
                    you must manage that subscription through the applicable
                    store.
                  </p>
                </section>

                <section id="the-service">
                  <SectionHeading number="03">The Service</SectionHeading>
                  <p>
                    biu lets you upload or link videos, documents, images,
                    notes, and other study material; create and import
                    flashcards; record short voice clips for transcription;
                    and use artificial intelligence to generate summaries,
                    flashcards, quizzes, recall feedback, and AI tutor answers.
                    The AI tutor may use your material, optional web search, and
                    optional Personal Memory features that you control. You may
                    also choose to create a revocable link to a read-only
                    snapshot of a chat. We may add, change, or remove features,
                    or suspend the Service, and we will give reasonable notice
                    of material changes where we can.
                  </p>
                </section>

                <section id="billing">
                  <SectionHeading number="04">
                    Free trial, subscriptions & billing
                  </SectionHeading>
                  <p>
                    Eligible new accounts may receive a free period of biu Pro
                    without an upfront payment, and referral or promotional
                    rewards may extend access. The duration and eligibility
                    shown in the app at the time of an offer control. After free
                    access ends, Pro features require an in-app subscription
                    managed through the Apple App Store or Google Play.
                  </p>
                  <ul>
                    <li>
                      Pricing varies by region and promotion and is shown to you
                      before you subscribe.
                    </li>
                    <li>
                      Before purchase, the app shows the subscription name,
                      benefits, localized price, billing period, and any trial
                      or introductory terms that apply to that store product.
                    </li>
                    <li>
                      Payment is charged to your Apple App Store or Google Play
                      account when you confirm the purchase. Subscriptions renew
                      automatically for the displayed period and price unless
                      cancelled before renewal under the applicable store&apos;s
                      rules.
                    </li>
                    <li>
                      You manage and cancel subscriptions through your device’s
                      account settings.
                    </li>
                    <li>
                      Cancelling stops future renewals but does not refund the
                      current billing period.
                    </li>
                    <li>
                      Refunds are handled by Apple or Google under their
                      respective policies and applicable law.
                    </li>
                    <li>
                      We will communicate any price changes before they take
                      effect.
                    </li>
                  </ul>
                  <p>
                    biu may also offer prepaid gift products as one-time in-app
                    purchases. A gift provides the displayed period of Pro
                    access after it is successfully funded and claimed. Gift
                    purchases do not create an auto-renewing subscription and
                    do not by themselves grant Pro access to the purchaser.
                    Store billing, refunds, transaction recovery, and purchase
                    eligibility remain subject to Apple&apos;s or Google&apos;s rules.
                    We may cancel, refuse, or reverse a gift affected by fraud,
                    abuse, chargeback, or an invalid transaction.
                  </p>
                </section>

                <section id="referral-program">
                  <SectionHeading number="05">Referral program</SectionHeading>
                  <p>
                    When a friend signs up through your link, your trial
                    immediately extends by 7 days. You can earn additional
                    extensions as your friend completes daily quizzes during
                    their first 14 days, up to 7 more days per referral.
                  </p>
                  <p>
                    We reserve the right to modify bonus amounts, impose limits,
                    end the program, or reverse bonuses earned through
                    fraudulent or abusive activity, including fake accounts or
                    self-referrals.
                  </p>
                </section>

                <section id="your-content">
                  <SectionHeading number="06">
                    Your content & license
                  </SectionHeading>
                  <p>
                    You retain ownership of the material you submit, including
                    videos, links, documents, images, notes, chat messages,
                    voice input, and attachments, along with your rights, if
                    any, in summaries, flashcards, quizzes, and other output
                    generated for you (“
                    <strong>Your Content</strong>”). By uploading Your Content,
                    you grant biu a worldwide, non-exclusive, royalty-free
                    license to host, store, process, reproduce, transform, and
                    display it solely as needed to provide, secure, maintain,
                    and improve the Service for you. This includes sending the
                    portions needed for a requested feature to our service
                    providers and AI processors as described in our Privacy
                    Policy. biu does not use Your Content to train its own
                    general-purpose AI models.
                  </p>
                  <p>
                    This license ends when you delete the content or your
                    account, except for brief residual copies kept in backups.
                    You confirm that you hold all necessary rights to Your
                    Content and that it does not infringe anyone else’s rights
                    or violate any law. If you intentionally create a public
                    chat-share link, you direct us to display the selected
                    snapshot to anyone with that link until you revoke it or
                    delete the underlying thread.
                  </p>
                </section>

                <section id="ai-disclaimer">
                  <SectionHeading number="07">
                    AI-generated content disclaimer
                  </SectionHeading>
                  <p>
                    Summaries, flashcards, quiz questions, recall feedback,
                    transcriptions, Personal Memory facts, and AI tutor answers
                    may be generated automatically using third-party AI systems
                    based on Your Content and instructions. AI output is
                    probabilistic and may be incomplete, inaccurate, biased, or
                    unsuitable. It is not a substitute for your source material,
                    your own judgment, or medical, legal, financial, academic,
                    or other professional advice. You are responsible for
                    checking important output before relying on or sharing it.
                    If generated content appears harmful, unlawful, or
                    inappropriate, stop using it and notify us at{" "}
                    <a href="mailto:admin@getbiu.app">admin@getbiu.app</a>.
                  </p>
                </section>

                <section id="acceptable-use">
                  <SectionHeading number="08">Acceptable use</SectionHeading>
                  <p>You agree not to:</p>
                  <ul>
                    <li>
                      Upload content you do not have the legal right to use or
                      that infringes intellectual property or privacy rights.
                    </li>
                    <li>
                      Upload unlawful, defamatory, hateful, sexually explicit,
                      or otherwise harmful content.
                    </li>
                    <li>
                      Upload images, recordings, documents, or personal
                      information about another person without the rights,
                      notices, and consents required by law.
                    </li>
                    <li>
                      Use automated means such as bots or scrapers to access the
                      Service or create accounts, including to manipulate
                      referrals.
                    </li>
                    <li>
                      Attempt to reverse-engineer, decompile, or otherwise
                      interfere with the Service or the AI models behind it.
                    </li>
                    <li>
                      Circumvent security, rate limits, access controls, safety
                      filters, subscription checks, or other protective
                      measures, or probe the Service for vulnerabilities without
                      written authorization.
                    </li>
                    <li>
                      Use the Service or generated output to facilitate fraud,
                      impersonation, harassment, child exploitation, self-harm,
                      violence, malware, academic dishonesty, or other unlawful
                      or dangerous conduct.
                    </li>
                    <li>
                      Resell, sublicense, or provide third-party access to the
                      Service without our written permission.
                    </li>
                    <li>
                      Violate any applicable law or the terms of the Apple App
                      Store or Google Play.
                    </li>
                  </ul>
                  <p>
                    Violations may result in suspension or termination of your
                    account.
                  </p>
                </section>

                <section id="our-ip">
                  <SectionHeading number="09">
                    Our intellectual property
                  </SectionHeading>
                  <p>
                    The biu name, logo, app, website, and underlying software
                    and design are owned by FlipFlop Labs Private Limited and
                    protected by intellectual property laws. These Terms grant
                    you no rights to our trademarks, branding, or source code
                    beyond normal use of the Service.
                  </p>
                </section>

                <section id="third-party-services">
                  <SectionHeading number="10">
                    Third-party services
                  </SectionHeading>
                  <p>
                    biu relies on third-party infrastructure and processors,
                    including Supabase; Cloudflare; OpenRouter and downstream
                    model providers such as Google, OpenAI, DeepSeek, and
                    Anthropic where configured; Supermemory; PostHog;
                    RevenueCat; Expo; ChottuLink; Exa where web search is used;
                    and Apple and Google for distribution, sign-in, billing, and
                    device services. Providers and models may change as the
                    Service evolves. Our Privacy Policy explains what data is
                    sent and why. Third-party services may also be governed by
                    their own terms, and we are not responsible for their
                    availability or independent conduct.
                  </p>
                </section>

                <section id="app-store-terms">
                  <SectionHeading number="11">
                    Additional terms for App Store users
                  </SectionHeading>
                  <p>
                    If you download biu from the Apple App Store, the following
                    terms also apply and take precedence over any conflicting
                    provisions:
                  </p>
                  <ul>
                    <li>
                      This agreement is between you and biu only; Apple is not
                      responsible for the Service or its content.
                    </li>
                    <li>
                      biu grants you a personal, limited, non-exclusive,
                      non-transferable license to use the app on Apple-branded
                      products you own or control, as permitted by Apple&apos;s Usage
                      Rules, including applicable Family Sharing rules.
                    </li>
                    <li>
                      Apple has no obligation to provide maintenance or support
                      for the Service.
                    </li>
                    <li>
                      If the Service fails to conform to any applicable
                      warranty, Apple may refund the purchase price to you;
                      Apple has no other warranty obligations.
                    </li>
                    <li>
                      Apple is not responsible for any claims relating to the
                      Service, including product liability or regulatory
                      compliance.
                    </li>
                    <li>
                      Apple is not responsible for investigating third-party
                      intellectual property infringement claims.
                    </li>
                    <li>
                      You represent that you are not located in a
                      US-embargoed country or on any prohibited party list.
                    </li>
                    <li>
                      Apple and Apple’s subsidiaries are third-party
                      beneficiaries of these Terms, and upon your acceptance,
                      Apple has the right to enforce these Terms against you.
                    </li>
                  </ul>
                  <p>
                    If you obtain biu through Google Play, Google is not a party
                    to these Terms and is not responsible for the Service.
                    Google Play&apos;s terms govern downloads, billing, renewals,
                    cancellations, and refunds processed by Google. You agree to
                    comply with the usage rules and other third-party terms that
                    apply to your device and store account.
                  </p>
                </section>

                <section id="termination">
                  <SectionHeading number="12">Termination</SectionHeading>
                  <p>
                    You may delete your account at any time. We may suspend or
                    terminate your access if you violate these Terms, where the
                    law requires it, or if we discontinue the Service, giving
                    reasonable notice when possible. Sections addressing
                    intellectual property, disclaimers, limitations of
                    liability, and governing law survive termination.
                  </p>
                </section>

                <section id="disclaimers">
                  <SectionHeading number="13">Disclaimers</SectionHeading>
                  <p>
                    The Service is provided “as is” and “as available,” without
                    warranties of any kind, whether express, implied, or
                    statutory, including implied warranties of merchantability,
                    fitness for a particular purpose, non-infringement, and
                    accuracy of content, to the fullest extent permitted by law.
                    We do not guarantee uninterrupted or error-free service, or
                    any specific learning outcomes or exam results.
                  </p>
                </section>

                <section id="liability">
                  <SectionHeading number="14">
                    Limitation of liability
                  </SectionHeading>
                  <p>
                    To the fullest extent permitted by law, FlipFlop Labs
                    Private Limited and its officers, employees, and service
                    providers will not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, or any loss of
                    data, revenue, or profits, arising out of or related to your
                    use of the Service. Our total liability is limited to the
                    amounts you paid us in the preceding 12 months or 5,000
                    Indian Rupees, whichever is greater. Some jurisdictions do
                    not permit these limitations, so they may not apply to you.
                  </p>
                </section>

                <section id="indemnification">
                  <SectionHeading number="15">Indemnification</SectionHeading>
                  <p>
                    You agree to indemnify and hold harmless FlipFlop Labs
                    Private Limited from any claims, damages, liabilities, and
                    expenses (including reasonable legal fees) arising out of
                    your use of the Service, Your Content, or your violation of
                    these Terms or applicable law.
                  </p>
                </section>

                <section id="governing-law">
                  <SectionHeading number="16">
                    Governing law & disputes
                  </SectionHeading>
                  <p>
                    These Terms are governed by the laws of India, without
                    regard to conflict-of-law principles. Subject to any
                    mandatory consumer protections that apply to you, you agree
                    that any disputes fall under the exclusive jurisdiction of
                    the courts of Kolkata, West Bengal, India.
                  </p>
                </section>

                <section id="changes">
                  <SectionHeading number="17">
                    Changes to these terms
                  </SectionHeading>
                  <p>
                    We may update these Terms from time to time. If we make
                    material changes, we will notify you through the app, by
                    email, or by posting a notice on getbiu.app before the
                    change takes effect. Continued use of the Service after the
                    changes take effect means you accept the updated Terms.
                  </p>
                </section>

                <section id="miscellaneous">
                  <SectionHeading number="18">Miscellaneous</SectionHeading>
                  <p>
                    If any provision of these Terms is found unenforceable, the
                    rest remains in effect. Our failure to enforce a provision
                    is not a waiver of it. You may not assign these Terms
                    without our consent; we may assign them in connection with a
                    merger or sale of assets. These Terms and our Privacy Policy
                    make up the entire agreement between you and biu.
                  </p>
                </section>

                <section id="contact">
                  <SectionHeading number="19">Contact us</SectionHeading>
                  <p>
                    If you have questions about these Terms, contact us at:
                  </p>
                  <address>
                    <span>FlipFlop Labs Private Limited</span>
                    <span>Dakshineswar, Kolkata, West Bengal, India</span>
                    <a href="mailto:admin@getbiu.app">admin@getbiu.app</a>
                  </address>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
      <FinalCta />
    </>
  );
}
