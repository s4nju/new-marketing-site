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
  ["credits", "Credits & quiz rewards"],
  ["your-content", "Your content & license"],
  ["community-decks", "Explore & community decks"],
  ["reporting", "Reports, moderation & copyright"],
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
              <p className={styles.updated}>last updated November 11, 2026</p>
              <p><strong>Update notice:</strong> These revised Terms take effect on November 25, 2026. They clarify Plus and Pro, credits, quiz rewards, and community-deck use. Until then, the <a href="/terms/2026-09-12">previous Terms</a> apply. The new publishing licence applies to decks published or republished under these revised Terms; it does not retroactively expand permissions for earlier submissions.</p>
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
                    can request account deletion under Profile → Your data.
                    Permanent erasure is scheduled after a 30-day cancellation
                    period; using biu does not cancel the request. The Privacy
                    Policy explains retained records and copies held by others. Deleting your biu account
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
                    snapshot of a chat, browse official and community decks,
                    clone them into your library, and publish eligible decks. We may add, change, or remove features,
                    or suspend the Service, and we will give reasonable notice
                    of material changes where we can.
                  </p>
                </section>

                <section id="billing">
                  <SectionHeading number="04">Free trial, subscriptions & billing</SectionHeading>
                  <h3>Plus, Pro, and free access</h3>
                  <p>Plus and Pro unlock the same paid features. Plus includes 2,000 credits per month and Pro includes 5,000, on monthly and annual subscriptions. Neither plan is unlimited AI usage. Current US prices are on our <a href="/#pricing">pricing page</a>; the localized price, taxes, billing period, allowance, and any offer shown before you confirm a store purchase govern that purchase.</p>
                  <p>Eligible new accounts currently receive a seven-day BIU Pro trial from first sign-in, with the trial credit allowance shown in the app. No payment card is required and this grant does not automatically create a subscription. Existing historical grants retain their recorded expiry. Do not create or misuse accounts to obtain repeated introductory benefits.</p>
                  <p>You can save supported original links and files without AI processing, within your storage quota. Saving alone uses no credits and does not automatically process those items when you subscribe or credits renew. Processing requires your explicit action and active Pro access. After Pro access expires, saved content and chats, existing summaries and cards, library organization, non-AI quizzes, streaks, progress, and community decks remain available. New AI work, manual-card creation, and Anki imports require active Pro access. Existing AI recall questions can be presented as multiple-choice questions instead. Storage and rate limits apply.</p>
                  <h3>Store billing, renewal, cancellation, and refunds</h3>
                  <ul>
                    <li>Apple or Google charges you when you confirm a purchase, subject to any store-eligible offer shown at checkout. Annual plans charge the displayed annual total upfront. Subscriptions renew automatically for the displayed period unless cancelled under the store&apos;s rules.</li>
                    <li>BIU-granted trial or promotional access and store billing run independently. Buying a subscription during granted access does not defer store charges, add those days to your store subscription, or promise another free trial.</li>
                    <li>Manage or cancel auto-renewal in the relevant store account. Cancellation normally preserves paid access until the store-confirmed expiry. Deleting BIU or requesting account deletion does not cancel the subscription.</li>
                    <li>Apple or Google handles purchase refunds under its policies and applicable law. Nothing here removes mandatory cancellation, refund, or other consumer rights.</li>
                    <li>We may change subscription prices for reasons including changes to service costs, features, taxes, or exchange rates. We will provide advance notice and obtain consent where required. A price change applies to a future renewal under store rules, not retroactively to a paid period; you can cancel before it applies.</li>
                  </ul>
                  <h3>Changing plans and verifying access</h3>
                  <p>Google Play upgrades to Pro are charged and take effect immediately; downgrades and monthly/yearly duration changes are deferred until renewal. Apple determines the effective date and any charge or adjustment and shows it before confirmation. A scheduled change is not yet an active plan. A verified tier upgrade adds the allowance difference once for the current credit cycle without resetting spend or holds. A downgrade does not remove credits already granted; the lower allowance starts with the next cycle after the downgrade takes effect.</p>
                  <p>Purchases and restores are associated with your signed-in BIU account and verified with the store. Access can remain verification pending until confirmation succeeds; contact support if a completed purchase has not appeared. Buying subscriptions on more than one platform can create separate store charges and does not stack monthly credit allowances. Manage each store subscription separately.</p>
                  <p>Storage quotas are shown in the app and may differ with access status. If your stored files exceed the applicable quota, further uploads can be blocked until space is available. A plan expiry does not by itself erase your saved library. Purchases of Plus or Pro do not transfer ownership of BIU or another publisher&apos;s content.</p>
                </section>

                <section id="credits">
                  <SectionHeading number="05">Credits & quiz rewards</SectionHeading>
                  <p>Credits are a fractional, account-bound allowance for supported work in BIU. They are not currency, a deposit, or a financial product, and cannot be transferred, sold, or redeemed for cash. Subscription refund rights remain governed by store rules and applicable law.</p>
                  <ul>
                    <li><strong>What is charged:</strong> library processing is priced by extracted source size, such as words, video duration, or images, with a minimum of one credit. Chat replies and chat-file processing depend on AI work, including context read and output generated. Estimates may differ from the final charge; check the available estimate, balance, and final usage in the app.</li>
                    <li><strong>Other features:</strong> voice transcription, AI Memory, recall grading, manual-card creation, Anki imports, and community-deck cloning or updates currently have no separate credit charge. Some still require active Pro access and are subject to technical and abuse limits.</li>
                    <li><strong>Monthly cycle:</strong> both monthly and annual subscriptions receive credits monthly on the account&apos;s cycle date. Short months use the applicable month-end date. Annual subscribers do not receive a year&apos;s allowance upfront. Upgrades and provider recovery do not provide repeated full refills.</li>
                    <li><strong>Expiry and carryover:</strong> unused ordinary credits expire with the cycle. Unused trial credits join the first paid cycle only if the purchase occurs before trial access expires; that one-time carryover expires with the paid cycle. Losing Pro access forfeits the remaining balance. Support grants expire with their assigned cycle unless expressly stated otherwise.</li>
                    <li><strong>Processing and failures:</strong> content credits can be held once its size is known, committed on success, and released on final failure. Retrying the same job does not charge twice. Content that needs more credits can wait for credits and be resumed through the app. A BIU-side failed chat is not charged; a chat you stop may charge for work already completed. Enabling quiz sync on content already charged does not charge for processing that same item again.</li>
                    <li><strong>Exhaustion:</strong> new charged work can pause until credits renew or a verified upgrade supplies more. A final chat charge may leave a small negative balance; that deficit is not billed as an extra purchase or carried into the next cycle. There are no automatic paid top-ups.</li>
                  </ul>
                  <h3>Daily quiz rewards during the base trial</h3>
                  <p>Each eligible completion of your own daily quiz during your base trial adds 100 credits, once per user-local day, up to seven rewards (700 credits). Content, collection, and weak-card practice do not earn this reward. Rewards add credits, not extra trial days. Subscribing during your base-trial window does not end reward eligibility. A reward expires with the credit cycle it is added to; unspent rewards in a trial balance follow the trial-to-paid carryover rule. Your trial and reward status are shown in the app. Referral rewards and gifting are no longer offered; ordinary app sharing is untracked and unrewarded.</p>
                  <p>We may correct erroneous grants or reverse benefits obtained through fraud or abuse. Changes to allowances, reward eligibility, or rates apply prospectively with notice where required; they do not justify duplicate charges or retroactively remove a valid historical access grant.</p>
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
                    For private content, this service license ends when the
                    content or account is permanently erased, subject to the
                    retention described in our Privacy Policy. Published-deck
                    permissions and existing copies are addressed separately below.
                    You confirm that you hold all necessary rights to Your
                    Content and that it does not infringe anyone else’s rights
                    or violate any law. If you intentionally create a public
                    chat-share link, you direct us to display the selected
                    snapshot to anyone with that link until you revoke it or
                    delete the underlying thread.
                  </p>
                </section>

                <section id="community-decks">
                  <SectionHeading number="07">Explore & community decks</SectionHeading>
                  <h3>Publishing is an explicit sharing action</h3>
                  <p>A library deck is private unless you publish it. Publishing makes a read-only snapshot of its card text and supported answer information, title, description, topic, tags, display details, and your publisher display name available to other BIU users in Explore. It does not publish your source files, private library, chats, or personal quiz performance. Check every card and the displayed publisher name before publishing, and do not include personal information you do not have the right to disclose.</p>
                  <h3>Ownership and permission to use a published deck</h3>
                  <p>You keep whatever intellectual-property rights you hold. By publishing or republishing under these Terms, you grant BIU a worldwide, non-exclusive, royalty-free licence to host, reproduce, display, distribute, and technically adapt that snapshot within the Service so others can find, clone, study, and update it. This is a service licence, not permission to use private source material in advertising or to train BIU general-purpose AI models.</p>
                  <p>You also permit other users to keep lawfully obtained copies for personal, non-commercial study; edit those copies for that purpose; export them; and share them for non-commercial study through supported features. Preserve available author attributions and legal notices, identify your own adaptations honestly, and do not claim another person&apos;s work as your own. Selling decks, granting broader commercial rights, bulk scraping, or building a competing content catalogue requires separate permission from the relevant rights holders. More permissive third-party licences continue to apply where validly provided.</p>
                  <p>BIU official decks carry the same personal, non-commercial study, editing, export, and permitted-sharing rights unless a deck states separate licence terms. An edited or republished copy must not be represented as an official BIU edition. Cloning transfers a copy into your library, not ownership of the original author&apos;s rights.</p>
                  <h3>Snapshots, updates, and removal</h3>
                  <p>Private edits do not automatically change a published snapshot or another user&apos;s clone. A publisher can republish; a learner chooses whether to use Update with Original. That update can add, update, or retire cards; locally edited cards are protected from automatic replacement. Your study history remains associated with your own cards.</p>
                  <p>Unpublishing stops new discovery and cloning but keeps the snapshot accessible to its owner and existing cloners. Deleting the source library deck unpublishes it. Permanent publisher-account erasure removes the original publication, but does not automatically erase card copies already cloned into other accounts, exports, or screenshots. The permission for lawfully obtained existing copies survives unpublishing, source deletion, and account closure to the extent necessary for the permitted uses above, subject to valid privacy or intellectual-property claims and applicable law.</p>
                  <p>Community content is supplied by its publisher. Votes, rankings, clone counts, or inclusion in recommendations are not an endorsement or guarantee of accuracy, safety, ownership, exam results, or professional suitability. Verify important material whether it is official, imported, human-authored, edited, or AI-assisted.</p>
                </section>

                <section id="reporting">
                  <SectionHeading number="08">Reports, moderation & copyright</SectionHeading>
                  <p>Use the in-app report action for a community deck or an AI output, or email <a href="mailto:admin@getbiu.app">admin@getbiu.app</a>. Deck reports can address spam, inaccuracy, offensive material, copyright, or low quality. AI-output reports can include a private snapshot or excerpt and your explanation. Do not submit false reports or include unnecessary sensitive information. A report does not establish that an allegation is true.</p>
                  <p>We may review reports, restrict visibility, place a deck under review, remove or disable content, stop distribution or updates, and restrict or suspend accounts where reasonably necessary for safety, rights protection, law, or enforcement of these Terms. Multiple reports can automatically remove a community deck from discovery pending review. A report does not guarantee immediate removal, and automatic review status is not a finding of wrongdoing. We do not promise that every publication is checked before it becomes available.</p>
                  <p>For copyright or privacy complaints, identify the affected work or information, the deck or content location, your contact details and authority to complain, and the action requested. We may request further verification and assess appropriate action, including effects on existing copies, under applicable law. This process does not create a licence to infringing or unlawfully disclosed material.</p>
                  <p>If you believe a moderation decision is mistaken, email the content reference, relevant context, and the decision you want reconsidered to admin@getbiu.app. We will consider the information provided. Reporter identities and private report evidence are not published on the deck; disclosures needed for legal claims or required by law are governed by the Privacy Policy.</p>
                </section>

                <section id="ai-disclaimer">
                  <SectionHeading number="09">
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
                    inappropriate, stop relying on it, use the in-app report action where available, or notify us at{" "}
                    <a href="mailto:admin@getbiu.app">admin@getbiu.app</a>.
                  </p>
                </section>

                <section id="acceptable-use">
                  <SectionHeading number="10">Acceptable use</SectionHeading>
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
                      votes, reports, recommendations, or quiz rewards.
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
                    Do not impersonate publishers, misrepresent authorship, publish
                    spam or plagiarized decks, expose personal information, or evade
                    moderation by republishing restricted material. Violations may
                    result in content restrictions, suspension, or termination.
                  </p>
                </section>

                <section id="our-ip">
                  <SectionHeading number="11">
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
                  <SectionHeading number="12">Third-party services</SectionHeading>
                  <p>We use account, hosting, storage, AI, transcription, search, personalization, analytics, notification, email, and billing providers. Current integrations include Supabase, Cloudflare, OpenRouter and configured upstreams such as OpenAI, Morph, and Groq, direct Google video processing, Parallel search through OpenRouter, Supermemory, PostHog, RevenueCat, Expo, Resend where enabled, and Apple and Google platform services. Models and processors may change; the Privacy Policy explains the categories of data and purposes.</p>
                  <p>Third-party terms may also apply. We do not control a provider&apos;s independent service, linked websites, or a recipient app you choose for exports. Nothing here limits our own responsibilities or your mandatory rights. Upload or link third-party material only when you have the rights and permissions required by the source service and applicable law.</p>
                </section>

                <section id="app-store-terms">
                  <SectionHeading number="13">
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
                  <SectionHeading number="14">Termination</SectionHeading>
                  <p>
                    You may request account deletion at any time under the cancellation and erasure process in the Privacy Policy. We may suspend or
                    terminate your access if you violate these Terms, where the
                    law requires it, or if we discontinue the Service, giving
                    reasonable notice when possible. Sections addressing
                    intellectual property, permitted existing deck copies, disclaimers,
                    limitations of liability, and governing law survive termination
                    to the extent needed to give them effect.
                  </p>
                </section>

                <section id="disclaimers">
                  <SectionHeading number="15">Disclaimers</SectionHeading>
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
                  <SectionHeading number="16">
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
                  <SectionHeading number="17">Indemnification</SectionHeading>
                  <p>
                    You agree to indemnify and hold harmless FlipFlop Labs
                    Private Limited from any claims, damages, liabilities, and
                    expenses (including reasonable legal fees) arising out of
                    your use of the Service, Your Content, or your violation of
                    these Terms or applicable law.
                  </p>
                </section>

                <section id="governing-law">
                  <SectionHeading number="18">
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
                  <SectionHeading number="19">
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
                  <SectionHeading number="20">Miscellaneous</SectionHeading>
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
                  <SectionHeading number="21">Contact us</SectionHeading>
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
