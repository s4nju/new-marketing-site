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
              <p className={styles.updated}>last updated September 12, 2026</p>
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
                      address, account identifier, profile image, and basic
                      profile information received when you create or access a
                      biu account using Apple or Google.
                    </li>
                    <li>
                      <strong>Profile and onboarding information:</strong> your
                      age range, optional birthday, persona, subjects, learning
                      goals and difficulties, revision preferences, timezone,
                      notification choices, attribution response, and other
                      preferences you choose to provide.
                    </li>
                    <li>
                      <strong>Your content:</strong> the videos, links, PDFs,
                      images, notes, imported decks, manual flashcards, chat
                      attachments, and other study material you upload, import,
                      link, or paste into biu so we can provide the features you
                      request (“Your Content”).
                    </li>
                    <li>
                      <strong>Learning activity:</strong> your quiz answers,
                      flashcard performance, streaks, skip passes, and spaced
                      repetition scheduling data.
                    </li>
                    <li>
                      <strong>AI tutor conversations:</strong> questions you ask
                      biu’s AI tutor and the material you ground those questions
                      on, the responses returned to you, optional web-search
                      queries and results used by the tutor, and any read-only
                      chat snapshot you deliberately publish through a
                      revocable sharing link.
                    </li>
                    <li>
                      <strong>Voice and AI input:</strong> short audio recordings
                      you choose to record for transcription, free-text recall
                      answers sent for AI-assisted grading, and related prompts.
                      Audio is sent for transcription and the temporary recording
                      is removed from the app after transcription or discard; the
                      resulting text may be retained when you use or send it.
                    </li>
                    <li>
                      <strong>Personal Memory:</strong> if you separately enable
                      this Pro feature, selected facts inferred from eligible
                      tutor conversations, the categories they belong to, and
                      your consent and deletion settings.
                    </li>
                    <li>
                      <strong>Purchase, gift, and referral information:</strong>
                      product and transaction identifiers, subscription status,
                      renewal or expiration dates, gift funding and claim
                      status, and referral codes and rewards. We do not receive
                      your full card or bank details.
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
                      identifiers, IP address and approximate region inferred
                      from it, network information, and crash or performance
                      logs.
                    </li>
                    <li>
                      Usage data, such as which features you open, session
                      length, and general in-app behavior, collected through
                      product analytics tools. When analytics is enabled, this
                      includes selected product events and app lifecycle events;
                      session replay is disabled. In the current app, configured
                      product analytics and enabled referral or gift-link
                      attribution can begin as part of normal app operation;
                      there is not yet a separate in-app switch for these
                      activities.
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
                    To provide AI features, biu sends the parts of Your Content
                    and instructions needed for the requested feature to AI
                    processors. Current processing routes include OpenRouter,
                    which routes requests to configured model providers such as
                    Google, OpenAI, DeepSeek, or Anthropic, and direct Google
                    Gemini processing for certain document, image, video, and
                    embedding tasks. Short voice clips are sent through
                    OpenRouter for transcription. The precise provider may vary
                    by feature and may change as models are updated.
                  </p>
                  <p>
                    If you enable Personal Memory, biu uses an AI model to
                    extract a limited set of allowed facts from eligible tutor
                    conversations and stores those facts with Supermemory so
                    they can personalize later conversations. This is separate
                    from ordinary chat history and can be disabled or
                    permanently deleted from the app. Disabling Personal Memory
                    stops new use but does not delete saved facts unless you
                    choose delete-all.
                  </p>
                  <p>
                    biu does not use Your Content to train its own
                    general-purpose AI models. AI processors handle information
                    under their commercial terms and the privacy and retention
                    controls available to biu. Provider retention can vary by
                    service and configuration, so do not upload sensitive
                    personal information that is not necessary for your use of
                    the Service.
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
                      <strong>Supabase</strong> — authentication and managed
                      database services used for account data, Your Content,
                      chats, preferences, and learning activity.
                    </li>
                    <li>
                      <strong>Cloudflare R2</strong> — object storage for uploads
                      and attachments while they are processed or retained for
                      your account.
                    </li>
                    <li>
                      <strong>OpenRouter and model providers</strong> — AI
                      generation and transcription routing. Depending on the
                      feature, a request may be processed by Google, OpenAI,
                      DeepSeek, Anthropic, or another model provider that we
                      configure and vet.
                    </li>
                    <li>
                      <strong>Google</strong> — direct Gemini processing for
                      document, image, video, and embedding features, as well as
                      Google sign-in and Android platform services.
                    </li>
                    <li>
                      <strong>Supermemory</strong> — storage and retrieval of the
                      limited Personal Memory facts you ask biu to remember.
                    </li>
                    <li>
                      <strong>PostHog</strong> — selected product analytics,
                      app-lifecycle events, and crash reporting. Analytics may
                      be linked to your biu account identifier after sign-in;
                      session replay is disabled. PostHog may process IP,
                      device, app-version, event, and diagnostic information on
                      servers in the United States.
                    </li>
                    <li>
                      <strong>RevenueCat, Apple, and Google</strong> — offering,
                      purchase, gift, subscription, entitlement, renewal, and
                      refund administration. Apple and Google also provide
                      sign-in, distribution, and device platform services.
                    </li>
                    <li>
                      <strong>Expo</strong> — app updates and push-notification
                      delivery infrastructure. Expo receives the device push
                      token and technical delivery information needed to send a
                      notification or deliver an update.
                    </li>
                    <li>
                      <strong>ChottuLink</strong> — deep-link and deferred-link
                      resolution for referrals and prepaid gifts. It may process
                      link, device, IP, install, and resolution metadata needed
                      to attribute and deliver the link when the integration is
                      enabled.
                    </li>
                    <li>
                      <strong>Exa</strong> — web-search processing when the AI
                      tutor determines that a user request needs current public
                      web information.
                    </li>
                    <li>
                      <strong>Qdrant-compatible vector infrastructure</strong> —
                      semantic indexes used to retrieve relevant portions of
                      your material and delete them with your account.
                    </li>
                    <li>
                      <strong>Resend</strong> — delivery of transactional and
                      service-related email where enabled.
                    </li>
                    <li>
                      <strong>Google Sheets / Google Workspace</strong> — used
                      to temporarily store email addresses collected through
                      our pre-launch waitlist. New accounts are created and
                      stored directly in Supabase.
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
                    We keep your account information, Your Content, chats,
                    Personal Memory facts, purchase and gift state, and learning
                    activity for as long as your account is active or as needed
                    to provide the feature. A voice recording is used for the
                    requested transcription and is not stored as a chat message
                    by biu. Public chat snapshots remain available until you
                    revoke the link, delete the thread, or delete your account.
                    Analytics and security records are kept only for the period
                    reasonably needed for product analysis, debugging, fraud
                    prevention, and security. Historical waitlist email
                    addresses are deleted when they are no longer needed or
                    when you ask us to delete them, whichever comes first.
                  </p>
                  <p>
                    When you delete your account, we delete or anonymize your
                    personal information and Your Content within 30 days of a
                    verified request, except
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
                    You can review and update your account information,
                    withdraw notification permission, enable or disable
                    Personal Memory, permanently delete Personal Memory, and
                    delete individual pieces of content, directly inside the biu
                    app at any time. You can also permanently delete your
                    account and associated data from within the app’s settings,
                    via our{" "}
                    <a href="/data-deletion">data deletion request page</a>,
                    or by emailing admin@getbiu.app.
                  </p>
                  <p>
                    The current app does not provide a separate control to opt
                    out of product analytics or referral and gift-link
                    attribution. You may contact admin@getbiu.app with a privacy
                    request. We plan to add an in-app privacy choice before
                    relying on consent for processing that requires it.
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
                    does not sell your personal information or share it for
                    cross-context behavioral advertising. Referral and gift-link
                    attribution is used to resolve biu links and credit the
                    correct accounts, not to serve third-party advertising.
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
                    biu is intended for users aged 13 and older, and we do not
                    knowingly allow anyone under 13 to create an account or use
                    the Service. Users aged 13 to 17 may use biu only with the
                    consent and supervision of a parent or legal guardian.
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
