import type { Metadata } from "next";
import styles from "./privacy.module.css";
import Navbar from "../components/Navbar";
import FinalCta from "../components/FinalCta";

export const metadata: Metadata = {
  title: "Privacy Policy | biu",
  description:
    "Learn what information biu collects, how it is used and shared, and the rights and choices available to you.",
  alternates: { canonical: "/privacy" },
};

const contents = [
  ["information-we-collect", "Information we collect"],
  ["how-we-use-information", "How we use your information"],
  ["ai-processing", "How AI processes your content"],
  ["how-we-share-information", "How we share your information"],
  ["data-retention", "Data retention"],
  ["international-transfers", "International data transfers"],
  ["your-rights", "Your rights and choices"],
  ["childrens-privacy", "Children's privacy"],
  ["push-notifications", "Push notifications"],
  ["security", "Security"],
  ["third-party-services", "Third-party services"],
  ["changes", "Changes to this policy"],
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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <article className={styles.article}>
          <div className={styles.container}>
            <div className={styles.intro}>
              <span className={styles.kicker}>legal</span>
              <h1>Privacy Policy</h1>
              <p className={styles.updated}>last updated July 1, 2026</p>
              <p className={styles.lede}>
                FlipFlop Labs Private Limited (“<strong>biu</strong>”, “we”,
                “us”, or “our”) builds the biu mobile app and the website at
                getbiu.app (together, the “Service”). This Privacy Policy
                explains what information we collect, how we use it, who we
                share it with, and the choices and rights you have, wherever in
                the world you use biu.
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
                <section id="information-we-collect">
                  <SectionHeading number="01">
                    Information we collect
                  </SectionHeading>
                  <p>
                    We collect information in three ways: what you give us
                    directly, what we collect automatically as you use the
                    Service, and what we receive from third parties you choose
                    to connect.
                  </p>
                  <h3>Information you provide</h3>
                  <ul>
                    <li>
                      <strong>Account information:</strong> your name and email
                      address when you create a biu account, and your password
                      (stored securely, hashed, and never visible to us) if you
                      sign up directly rather than through Apple or Google.
                    </li>
                    <li>
                      <strong>Your content:</strong> the videos, links, PDFs,
                      photos, and notes you upload or paste into biu so we can
                      generate summaries, flashcards, and quizzes for you (
                      “Your Content”).
                    </li>
                    <li>
                      <strong>Learning activity:</strong> your quiz answers,
                      flashcard performance, streaks, skip passes, and spaced
                      repetition scheduling data.
                    </li>
                    <li>
                      <strong>AI tutor conversations:</strong> questions you ask
                      biu’s AI tutor and the material you ground those questions
                      on.
                    </li>
                    <li>
                      <strong>Waitlist sign-ups:</strong> if you joined our
                      pre-launch waitlist on getbiu.app, we collected the email
                      address you submitted.
                    </li>
                    <li>
                      <strong>Communications:</strong> anything you send us
                      directly, such as support requests to admin@getbiu.app.
                    </li>
                  </ul>
                  <h3>Information collected automatically</h3>
                  <ul>
                    <li>
                      Device and log data, such as device model, operating
                      system and version, app version, unique device
                      identifiers, IP address, and crash or performance logs.
                    </li>
                    <li>
                      Usage data, such as which features you open, session
                      length, and general in-app behavior, collected through
                      product analytics tools.
                    </li>
                    <li>
                      A push notification token, if you enable notifications, so
                      we can send you reminders (for example, to protect a quiz
                      streak).
                    </li>
                  </ul>
                  <h3>Information from third parties</h3>
                  <ul>
                    <li>
                      If you sign up or sign in using Apple or Google, we
                      receive basic profile information (such as your name and
                      email address) that those providers share with us, subject
                      to your settings on that platform.
                    </li>
                    <li>
                      If you purchase a biu Pro subscription, Apple or Google
                      sends us confirmation of your purchase, subscription
                      status, and renewal dates. We never receive or store your
                      card, bank, or full payment details — those are handled
                      entirely by Apple or Google.
                    </li>
                    <li>
                      If a friend refers you using their referral link, we
                      associate your sign-up with that referral code so we can
                      credit their account, but we do not receive your contact
                      details from them just because you followed their link.
                    </li>
                  </ul>
                </section>

                <section id="how-we-use-information">
                  <SectionHeading number="02">
                    How we use your information
                  </SectionHeading>
                  <p>We use the information above to:</p>
                  <ul>
                    <li>
                      Provide the Service — create your account, process Your
                      Content into summaries, flashcards, and quizzes, run the
                      daily spaced-repetition schedule, and power the AI tutor.
                    </li>
                    <li>
                      Maintain your streaks, skip passes, and referral bonus
                      days, and credit the correct account when a referral is
                      completed.
                    </li>
                    <li>
                      Process and manage your free trial and Pro subscription,
                      including communicating with Apple or Google about your
                      purchase status.
                    </li>
                    <li>
                      Send you service-related communications, such as streak
                      reminders, quiz notifications, receipts, and important
                      account or policy updates.
                    </li>
                    <li>
                      Monitor, debug, and improve the Service, including
                      diagnosing crashes and understanding which features are
                      used and how.
                    </li>
                    <li>
                      Detect, investigate, and prevent fraud, abuse of the
                      referral program, security incidents, and violations of
                      our Terms of Service.
                    </li>
                    <li>
                      Comply with legal obligations and respond to lawful
                      requests from public authorities.
                    </li>
                  </ul>
                  <p>
                    We do not use Your Content or learning activity to show you
                    third-party advertising, and we do not sell your personal
                    information.
                  </p>
                </section>

                <section id="ai-processing">
                  <SectionHeading number="03">
                    How AI processes your content
                  </SectionHeading>
                  <p>
                    To turn what you upload into summaries, flashcards, quizzes,
                    and AI tutor answers, biu sends the relevant parts of Your
                    Content to third-party AI model providers, currently OpenAI,
                    Anthropic, and Google. These providers process Your Content
                    on our behalf, under contractual terms that prohibit them
                    from using it to train their own models or share it with
                    anyone else, and they do not retain it beyond what is needed
                    to return a response to biu.
                  </p>
                  <p>
                    Because this processing happens for every piece of content
                    you add, please avoid uploading anything you would not want
                    processed by an AI system — for example, sensitive personal
                    information about yourself or others that isn’t necessary
                    for your studies.
                  </p>
                </section>

                <section id="how-we-share-information">
                  <SectionHeading number="04">
                    How we share your information
                  </SectionHeading>
                  <p>
                    We share information only with the service providers who
                    help us run biu, and only to the extent needed for them to
                    perform their role:
                  </p>
                  <ul>
                    <li>
                      <strong>Supabase</strong> — our database, authentication,
                      and backend infrastructure provider, which stores your
                      account data, Your Content, and learning activity.
                    </li>
                    <li>
                      <strong>OpenAI, Anthropic, and Google</strong> — AI model
                      providers used to generate summaries, flashcards, quizzes,
                      and AI tutor responses, as described above.
                    </li>
                    <li>
                      <strong>Firebase (Google) and PostHog</strong> — product
                      analytics and crash-reporting tools that help us
                      understand app usage and fix bugs. PostHog processes data
                      on servers located in the United States.
                    </li>
                    <li>
                      <strong>Meta and similar attribution partners</strong> —
                      used solely to measure install attribution and marketing
                      campaign performance. biu does not run in-app advertising
                      and these partners do not serve ads inside biu.
                    </li>
                    <li>
                      <strong>Apple and Google</strong> — to process your
                      subscription purchase, deliver push notifications, and
                      distribute the app through the App Store and Google Play.
                    </li>
                    <li>
                      <strong>Google Sheets / Google Workspace</strong> — used
                      to temporarily store email addresses collected through our
                      pre-launch waitlist. Once the app launches, new accounts
                      are created and stored directly in Supabase instead.
                    </li>
                  </ul>
                  <p>
                    We may also share information if required by law, to protect
                    the rights, safety, or property of biu or our users, or as
                    part of a merger, acquisition, or sale of assets, in which
                    case we will notify you before your information becomes
                    subject to a different privacy policy.
                  </p>
                </section>

                <section id="data-retention">
                  <SectionHeading number="05">Data retention</SectionHeading>
                  <p>
                    We keep your account information, Your Content, and learning
                    activity for as long as your account is active, so the app
                    can keep working the way you expect. Waitlist email
                    addresses are kept until launch or until you ask us to
                    delete them, whichever comes first.
                  </p>
                  <p>
                    When you delete your account, we delete or anonymize your
                    personal information and Your Content within 30 days, except
                    where we are required to retain certain records for longer
                    to comply with legal, tax, security, or fraud-prevention
                    obligations, or where data persists briefly in encrypted
                    backups until they are rotated out.
                  </p>
                </section>

                <section id="international-transfers">
                  <SectionHeading number="06">
                    International data transfers
                  </SectionHeading>
                  <p>
                    biu is operated from India, and our service providers host
                    infrastructure in India, the United States, and other
                    countries. Wherever your information is processed, we
                    require our service providers to protect it consistent with
                    this Privacy Policy and applicable law, including through
                    contractual safeguards such as standard contractual clauses
                    where required.
                  </p>
                </section>

                <section id="your-rights">
                  <SectionHeading number="07">
                    Your rights and choices
                  </SectionHeading>
                  <p>
                    You can review and update your account information, and
                    delete individual pieces of content, directly inside the biu
                    app at any time. You can also permanently delete your
                    account and associated data from within the app’s settings,
                    or by emailing admin@getbiu.app.
                  </p>
                  <h3>
                    If you are in the European Economic Area or United Kingdom
                  </h3>
                  <p>
                    You have the right to access, correct, delete, or export
                    your personal data, to restrict or object to certain
                    processing, and to withdraw consent at any time where
                    processing is based on consent. You may lodge a complaint
                    with your local data protection authority.
                  </p>
                  <h3>If you are in California</h3>
                  <p>
                    You have the right to know what personal information we
                    collect, to request deletion or correction of it, and to opt
                    out of the “sale” or “sharing” of personal information. biu
                    does not sell your personal information, and the only
                    sharing we do for advertising purposes is limited to
                    install-attribution data, as described above.
                  </p>
                  <h3>If you are in India</h3>
                  <p>
                    Under the Digital Personal Data Protection Act, 2023, you
                    have the right to access a summary of your personal data and
                    the processing activities involved, request correction or
                    erasure, nominate another individual to exercise your rights
                    in the event of death or incapacity, and file a grievance
                    with us before approaching the relevant Data Protection
                    Board.
                  </p>
                  <p>
                    Regardless of where you live, you can reach us at
                    admin@getbiu.app to exercise any of these rights, and we
                    will respond within the time required by applicable law.
                  </p>
                </section>

                <section id="childrens-privacy">
                  <SectionHeading number="08">
                    Children&apos;s privacy
                  </SectionHeading>
                  <p>
                    biu is not directed at children under 13, and we do not
                    knowingly collect personal information from anyone under 13.
                    If you believe a child under 13 has created an account or
                    provided us with personal information, please contact us at
                    admin@getbiu.app and we will delete it promptly.
                  </p>
                </section>

                <section id="push-notifications">
                  <SectionHeading number="09">
                    Push notifications
                  </SectionHeading>
                  <p>
                    With your permission, biu sends push notifications to help
                    you keep your streak and stay on top of your daily quiz. You
                    can disable notifications at any time in your device
                    settings or inside the app; this won’t affect any other part
                    of the Service.
                  </p>
                </section>

                <section id="security">
                  <SectionHeading number="10">Security</SectionHeading>
                  <p>
                    We use industry-standard safeguards to protect your
                    information, including encryption in transit, access
                    controls on our backend, and vetted third-party
                    infrastructure providers. No method of transmission or
                    storage is completely secure, so while we work hard to
                    protect your information, we cannot guarantee its absolute
                    security.
                  </p>
                </section>

                <section id="third-party-services">
                  <SectionHeading number="11">
                    Third-party services
                  </SectionHeading>
                  <p>
                    The Service is distributed through, and billed via, the
                    Apple App Store and Google Play, and links to those
                    platforms are governed by Apple’s and Google’s own privacy
                    policies. If you sign in with Apple or Google, their privacy
                    policies also govern the information they collect during
                    that process.
                  </p>
                </section>

                <section id="changes">
                  <SectionHeading number="12">
                    Changes to this policy
                  </SectionHeading>
                  <p>
                    We may update this Privacy Policy from time to time. If we
                    make material changes, we will notify you through the app,
                    by email, or by posting a notice on getbiu.app before the
                    change takes effect. The “last updated” date at the top of
                    this page always reflects the current version.
                  </p>
                </section>

                <section id="contact">
                  <SectionHeading number="13">Contact us</SectionHeading>
                  <p>
                    If you have questions about this Privacy Policy or how we
                    handle your information, contact us at:
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
