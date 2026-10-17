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
  ["ai-processing", "Content processing and personalization"],
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
              <p className={styles.updated}>last updated October 17, 2026</p>
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
                      If you enable optional personalization, we also collect
                      learning preferences inferred from eligible conversations
                      and your choices about that processing.
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
                  <p>
                    Only provide material you have the right to share with us,
                    including any permissions required for recordings or
                    personal information relating to other people.
                  </p>
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
                      Adapt study recommendations and, when you enable optional
                      personalization, use saved learning preferences to tailor
                      later conversations.
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
                  <h3>Legal grounds for EEA and UK processing</h3>
                  <p>
                    FlipFlop Labs Private Limited is the controller of your
                    personal data under the GDPR and UK GDPR. We rely on the
                    following grounds, depending on the purpose of processing:
                  </p>
                  <ul>
                    <li>
                      <strong>Contract:</strong> processing needed to provide
                      the Service you request, including account access,
                      content processing, study tools, AI conversations, and
                      administering your purchases.
                    </li>
                    <li>
                      <strong>Consent:</strong> optional personalization you
                      choose to enable and other processing for which the law
                      requires your consent. You can withdraw consent through
                      the available feature controls or by contacting us.
                      Withdrawal does not affect processing that was lawful
                      before withdrawal.
                    </li>
                    <li>
                      <strong>Legitimate interests:</strong> protecting accounts,
                      preventing fraud, diagnosing failures, and improving the
                      reliability of the Service, where that processing is
                      necessary and your interests and fundamental rights do
                      not override ours. This ground does not replace consent
                      where consent is legally required.
                    </li>
                    <li>
                      <strong>Legal obligations:</strong> keeping records
                      required by tax or accounting law and responding to
                      legally binding requests.
                    </li>
                  </ul>
                  <p>
                    If information necessary to provide a feature is not
                    supplied, we may be unable to provide that feature.
                  </p>
                </section>

                <section id="ai-processing">
                  <SectionHeading number="03">
                    Content processing and personalization
                  </SectionHeading>
                  <p>
                    We use external AI, transcription, search, and data
                    processing services to turn Your Content into summaries,
                    flashcards, and quizzes, transcribe voice input, retrieve
                    relevant information, and answer tutor questions. These
                    providers receive the content, conversations, recordings,
                    and related instructions needed to perform the requested
                    task on our behalf.
                  </p>
                  <p>
                    Optional personalization uses learning preferences derived
                    from eligible conversations to improve later responses.
                    You control whether this feature is enabled and can clear
                    its saved preferences in the app. Turning it off stops its
                    use but does not itself erase previously saved preferences.
                  </p>
                  <p>
                    biu does not use Your Content to train its own
                    general-purpose AI models. External processing is subject
                    to the relevant service agreements and available privacy
                    and retention controls. Retention by a provider depends on
                    the service and its configuration; removal of a temporary
                    recording from your device does not by itself erase copies
                    held by a processing provider.
                  </p>
                  <p>
                    Content you add for AI features is processed by these
                    services. Avoid including sensitive personal information
                    about yourself or others unless it is necessary for your
                    requested use.
                  </p>
                </section>

                <section id="how-we-share-information">
                  <SectionHeading number="04">
                    How we share your information
                  </SectionHeading>
                  <p>
                    We disclose information to providers that support the
                    Service, limited to what they need for their work and
                    subject to applicable contractual and legal safeguards.
                    The categories of recipients and their roles are:
                  </p>
                  <ul>
                    <li>
                      <strong>Account, hosting, and storage providers:</strong>
                      {" "}authentication, databases, uploaded files,
                      conversations, preferences, learning activity, and
                      searchable indexes of your material.
                    </li>
                    <li>
                      <strong>AI, transcription, search, and personalization
                      providers:</strong> content and conversation processing,
                      voice transcription, relevant web searches, and storage
                      and retrieval of optional saved learning preferences.
                    </li>
                    <li>
                      <strong>Analytics, diagnostics, and link-attribution
                      providers:</strong> device and account identifiers, IP
                      addresses, app and event information, crash reports, and
                      link-resolution metadata used to understand service
                      performance and resolve referral or gift links. Analytics
                      may be associated with your account after sign-in;
                      session replay is disabled.
                    </li>
                    <li>
                      <strong>Payment and app-platform providers:</strong>
                      {" "}transaction, subscription, gift, entitlement,
                      renewal, and refund administration, as well as sign-in
                      and app distribution. Payment credentials are handled by
                      the relevant payment platform.
                    </li>
                    <li>
                      <strong>Notification and update providers:</strong>
                      {" "}push tokens and technical delivery information used
                      to send notifications and deliver app updates.
                    </li>
                    <li>
                      <strong>Communications and administrative providers:</strong>
                      {" "}service emails, support correspondence, beta and
                      waitlist sign-ups, and privacy-request records, including
                      the account email, sign-in method, and any optional
                      explanation you submit in a deletion request.
                    </li>
                  </ul>
                  <p>
                    We may also share information if required by law, to protect
                    the rights, safety, or property of biu or our users, or as
                    part of a merger, acquisition, or sale of assets, in which
                    case we will notify you before your information becomes
                    subject to a different privacy policy.
                  </p>
                  <h3>Information you choose to share publicly</h3>
                  <p>
                    Creating a chat-sharing link makes a read-only snapshot
                    available to anyone who has the link, including people to
                    whom a recipient forwards it. Review the snapshot before
                    sharing and avoid including information you want to keep
                    private. Revoking the link, deleting the thread, or deleting
                    your account removes access through biu, but cannot remove
                    copies, screenshots, or downloads already made by others.
                  </p>
                </section>

                <section id="data-retention">
                  <SectionHeading number="05">Data retention</SectionHeading>
                  <p>
                    We retain personal information while your account is
                    active and for the time needed to provide the relevant
                    feature or meet a lawful retention requirement. We
                    determine that time by considering the purpose of the
                    information, the duration of our relationship with you,
                    outstanding transactions or disputes, applicable legal
                    requirements, and proportionate security and fraud risks.
                    Information no longer needed for those purposes is deleted
                    or irreversibly anonymized.
                  </p>
                  <p>
                    Account information, Your Content, conversations, saved
                    learning preferences, and progress are retained to support
                    your use of the Service. Temporary voice recordings are
                    removed from the app after transcription or discard and
                    are not stored by biu as chat messages; text you choose to
                    use or send may remain. Shared snapshots remain accessible
                    until you revoke the link, delete the thread, or delete
                    your account. Analytics, security, support, waitlist, and
                    privacy-request records are kept only as needed for their
                    stated purposes, including responding to requests and
                    documenting their resolution.
                  </p>
                  <h3>Account deletion</h3>
                  <p>
                    Requests made in the app schedule permanent erasure after
                    a 30-day cancellation period. The scheduled date and request
                    status are shown in Profile → Your data, where you can
                    cancel before erasure begins. Continuing to use biu does
                    not cancel your request. For website or email requests, we
                    verify ownership and confirm the deletion arrangements and
                    expected timeframe. Requests are handled without undue
                    delay and within applicable legal deadlines.
                  </p>
                  <p>
                    Permanent deletion removes your account and associated
                    personal information, content, conversations, uploads, and
                    learning data from our active systems. We also request
                    deletion of associated data held on our behalf by service
                    providers. Limited records may remain where necessary for
                    legal or tax obligations, resolving disputes, security, or
                    fraud prevention, only for as long as that reason applies.
                    Required payment and gift records may be retained under a
                    pseudonymous reference; pseudonymization does not make
                    those records anonymous. Backup copies may persist until
                    they expire under the relevant backup retention schedule
                    and remain subject to applicable safeguards.
                  </p>
                  <p>
                    Deleting your biu account does not cancel an Apple or
                    Google subscription. Manage or cancel it separately through
                    the relevant store; cancellation is not a prerequisite for
                    requesting account deletion.
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
                    where required. Contact admin@getbiu.app for information
                    about the safeguards applicable to your information or to
                    request a copy where available.
                  </p>
                </section>

                <section id="your-rights">
                  <SectionHeading number="07">
                    Your rights and choices
                  </SectionHeading>
                  <p>
                    You can review and update your account information,
                    withdraw notification permission, manage or clear optional
                    personalization, and delete individual pieces of content
                    inside the biu app. To request permanent deletion of your
                    account and associated data, open Profile → Your data, use
                    our{" "}
                    <a href="/data-deletion">data deletion request page</a>,
                    or email admin@getbiu.app. The retention section explains
                    the cancellation period and any records retained after
                    deletion.
                  </p>
                  <p>
                    The current app does not provide a separate control to opt
                    out of product analytics or referral and gift-link
                    attribution. You may contact admin@getbiu.app with a privacy
                    request or objection. Reading this policy or continuing to
                    use biu does not itself constitute consent where separate
                    consent is required by law.
                  </p>
                  <h3>
                    If you are in the European Economic Area or United Kingdom
                  </h3>
                  <p>
                    Subject to the conditions and exceptions in applicable
                    law, you may access, correct, delete, or receive a portable
                    copy of your personal data, restrict processing, and
                    withdraw consent for processing based on consent. You may
                    lodge a complaint with your local data protection authority.
                  </p>
                  <p>
                    <strong>Right to object:</strong> you may object to
                    processing based on legitimate interests on grounds
                    relating to your particular situation by contacting
                    admin@getbiu.app.
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
                    As applicable provisions of the Digital Personal Data
                    Protection Act, 2023 take effect, rights under that law
                    include access to a summary of personal data and related
                    processing, correction or erasure, nomination of another
                    individual to exercise rights in the event of death or
                    incapacity, and grievance redressal. You may contact us
                    about your information or a grievance at any time.
                  </p>
                  <p>
                    Regardless of where you live, you can reach us at
                    admin@getbiu.app to exercise any of these rights, and we
                    will respond within the time required by applicable law.
                  </p>
                  <h3>Verifying a privacy request</h3>
                  <p>
                    To protect your account, we may ask you to confirm access
                    to its email address or provide other information
                    reasonably necessary to verify your identity and understand
                    the request. If someone acts for you, we may also verify
                    their authority. Please do not send passwords or payment
                    credentials. Verification information is used to handle
                    the request and retained only as needed for that purpose
                    or a legal recordkeeping requirement.
                  </p>
                </section>

                <section id="childrens-privacy">
                  <SectionHeading number="08">
                    Children&apos;s privacy
                  </SectionHeading>
                  <p>
                    biu is intended for users aged 13 and older and is not
                    directed at children under 13. Where local law requires
                    parental consent at a higher age, that requirement also
                    applies. Users aged 13 to 17 may use biu only with the
                    consent and supervision of a parent or legal guardian.
                    If we learn that we have collected a child’s personal
                    information without consent required by applicable law,
                    we will take steps to delete it promptly. Contact
                    admin@getbiu.app if you believe this has happened.
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
