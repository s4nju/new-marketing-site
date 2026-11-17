"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { appIdentity, sharedChatPathPrefix } from "../app-links";
import { appAccessHref, siteConfig } from "../site-config";
import { parseSharedChat, type SharedChat } from "./share-token";
import logo from "../../public/images/biu-logo.png";
import styles from "./SharedChat.module.css";

const apiBaseUrl = (process.env.NEXT_PUBLIC_BIU_API_URL ?? "").trim().replace(/\/$/, "");

type LoadState =
  | { status: "loading" }
  | { status: "ready"; chat: SharedChat }
  | { status: "unavailable" }
  | { status: "rate-limited" }
  | { status: "error" };

type Platform = "ios" | "android" | "other";

const SAFE_LINK_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/** Only plain web and mail links survive; everything else renders as text. */
function safeHref(href: string | undefined): string | null {
  if (!href) return null;
  try {
    const url = new URL(href);
    return SAFE_LINK_PROTOCOLS.has(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Shared transcripts are untrusted user and model output. Raw HTML is never
 * rendered (no rehype-raw), links are scheme-allowlisted and carry no referrer,
 * and images are never fetched, so a transcript cannot run script, track
 * viewers with remote images, or leak the capability URL to another site.
 */
const markdownComponents: Components = {
  a({ href, children }) {
    const safe = safeHref(href);
    if (!safe) return <span>{children}</span>;
    return (
      <a href={safe} target="_blank" rel="nofollow noopener noreferrer ugc">
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    const safe = typeof src === "string" ? safeHref(src) : null;
    const label = alt?.trim() || "image";
    if (!safe) return <span>[{label}]</span>;
    return (
      <a href={safe} target="_blank" rel="nofollow noopener noreferrer ugc">
        [{label}]
      </a>
    );
  },
};

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  // iPadOS reports a desktop Safari UA; touch support tells them apart.
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "other";
}

/**
 * Android `intent:` URL pinned to the biu package, so no other app can claim
 * the capability URL. Chrome opens the store fallback when biu is missing.
 */
function androidIntentHref(token: string): string {
  const host = new URL(siteConfig.url).host;
  const fallback = siteConfig.links.android || new URL(appAccessHref, siteConfig.url).toString();
  return (
    `intent://${host}${sharedChatPathPrefix}/${token}` +
    `#Intent;scheme=https;package=${appIdentity.androidPackage};` +
    `S.browser_fallback_url=${encodeURIComponent(fallback)};end`
  );
}

function getAppHref(platform: Platform): string {
  if (platform === "ios" && siteConfig.links.ios) return siteConfig.links.ios;
  if (platform === "android" && siteConfig.links.android) return siteConfig.links.android;
  return appAccessHref;
}

function reportHref(): string {
  const subject = "Report a shared chat";
  const body = `I want to report this shared chat:\n${window.location.href}\n\nReason:\n`;
  return `mailto:admin@getbiu.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function SharedChatView({ token }: { token: string | null }) {
  // A missing API URL is a deployment error, not a revoked link.
  const [state, setState] = useState<LoadState>(
    !token ? { status: "unavailable" } : apiBaseUrl ? { status: "loading" } : { status: "error" },
  );
  const [attempt, setAttempt] = useState(0);
  // Unknown until mount, so server HTML never shows the wrong store button.
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    if (!token || !apiBaseUrl) return;
    const controller = new AbortController();
    setState({ status: "loading" });

    (async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/chat/shares/public/${encodeURIComponent(token)}`,
          {
            signal: controller.signal,
            credentials: "omit",
            cache: "no-store",
            referrerPolicy: "no-referrer",
            headers: { Accept: "application/json" },
          },
        );
        if (response.status === 404) return setState({ status: "unavailable" });
        if (response.status === 429) return setState({ status: "rate-limited" });
        if (!response.ok) return setState({ status: "error" });

        const chat = parseSharedChat(await response.json());
        setState(chat ? { status: "ready", chat } : { status: "unavailable" });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Shared chat request failed", error instanceof Error ? error.name : "unknown");
        setState({ status: "error" });
      }
    })();

    return () => controller.abort();
  }, [token, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        {state.status === "loading" && <LoadingState />}
        {state.status === "unavailable" && (
          <Notice
            title="This shared chat is unavailable."
            body="The link may be incomplete, or the owner turned sharing off."
          />
        )}
        {state.status === "rate-limited" && (
          <Notice
            title="Too many requests."
            body="Please wait a minute, then try again."
            action={{ label: "try again", onClick: retry }}
          />
        )}
        {state.status === "error" && (
          <Notice
            title="We couldn't load this chat."
            body="Check your connection and try again."
            action={{ label: "try again", onClick: retry }}
          />
        )}
        {state.status === "ready" && (
          <Conversation chat={state.chat} token={token} platform={platform} />
        )}

        <AppCta token={token} platform={platform} />
      </div>
    </main>
  );
}

function continueHref(token: string | null, platform: Platform | null): string {
  if (platform === "android" && token) return androidIntentHref(token);
  return platform ? getAppHref(platform) : appAccessHref;
}

function Conversation({
  chat,
  token,
  platform,
}: {
  chat: SharedChat;
  token: string | null;
  platform: Platform | null;
}) {
  const [reportLink, setReportLink] = useState("mailto:admin@getbiu.app");
  useEffect(() => setReportLink(reportHref()), []);
  const count = chat.messages.length;

  return (
    <article className={styles.conversation}>
      <div className={styles.thread}>
        <header className={styles.threadHeader}>
          <BiuAvatar />
          <div className={styles.threadHeading}>
            <h1 className={styles.title}>{chat.title}</h1>
            <p className={styles.threadMeta}>
              chat with biu · {count} {count === 1 ? "message" : "messages"}
            </p>
          </div>
          <span className={styles.readOnly}>
            <LockIcon />
            read only
          </span>
        </header>

        <div className={styles.threadBody}>
          <p className={styles.divider}>
            <span>shared from the biu app</span>
          </p>

          {count === 0 ? (
            <p className={styles.empty}>This shared chat has no messages.</p>
          ) : (
            <ol className={styles.messages}>
              {chat.messages.map((message, index) => {
                const isUser = message.role === "user";
                return (
                  <li
                    key={`${message.role}-${index}`}
                    className={isUser ? styles.userRow : styles.assistantRow}
                  >
                    {isUser ? <UserAvatar /> : <BiuAvatar />}
                    <div className={styles.messageStack}>
                      <span className={styles.role}>{isUser ? "user" : "biu"}</span>
                      {isUser ? (
                        <p className={styles.userBubble}>{message.content}</p>
                      ) : (
                        <div className={`${styles.assistantBubble} ${styles.markdown}`}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <footer className={styles.composer}>
          <span className={styles.composerField}>Replies are off in shared chats</span>
          <a href={continueHref(token, platform)} className={styles.composerButton} rel="noreferrer">
            continue in biu
            <SendIcon />
          </a>
        </footer>
      </div>

      <p className={styles.disclaimer}>
        Shared by a biu user. biu has not reviewed this conversation, and AI replies
        can be wrong.{" "}
        <a href={reportLink} className={styles.reportLink}>
          Report this chat
        </a>
      </p>
    </article>
  );
}

function BiuAvatar() {
  return (
    <span className={styles.biuAvatar} aria-hidden="true">
      <Image src={logo} alt="" width={26} height={13} />
    </span>
  );
}

function UserAvatar() {
  return (
    <span className={styles.userAvatar} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20.5c0-4.2 3.6-7 8-7s8 2.8 8 7" />
      </svg>
    </span>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function AppCta({ token, platform }: { token: string | null; platform: Platform | null }) {
  const showOpenInApp = platform === "android" && token !== null;

  return (
    <aside className={styles.cta} aria-label="get the biu app">
      <div>
        <h2 className={styles.ctaTitle}>study it with biu.</h2>
        <p className={styles.ctaBody}>
          Turn notes, PDFs, and videos into flashcards, then remember them with a
          daily spaced repetition quiz.
        </p>
      </div>
      <div className={styles.ctaActions}>
        {showOpenInApp && (
          <a href={androidIntentHref(token)} className={styles.primaryButton}>
            open in biu
          </a>
        )}
        {platform !== null && (
          <a
            href={getAppHref(platform)}
            className={showOpenInApp ? styles.secondaryButton : styles.primaryButton}
            rel="noreferrer"
          >
            get biu
          </a>
        )}
      </div>
    </aside>
  );
}

function LoadingState() {
  return (
    <div className={`${styles.thread} ${styles.loading}`} role="status" aria-live="polite">
      <span className={styles.skeletonEyebrow} />
      <span className={styles.skeletonTitle} />
      <span className={styles.skeletonLine} />
      <span className={styles.skeletonBubble} />
      <span className={styles.skeletonLine} />
      <span className={styles.skeletonLineShort} />
      <span className={styles.srOnly}>Loading shared chat</span>
    </div>
  );
}

function Notice({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <section className={styles.notice}>
      <h1 className={styles.noticeTitle}>{title}</h1>
      <p className={styles.noticeBody}>{body}</p>
      {action && (
        <button type="button" onClick={action.onClick} className={styles.secondaryButton}>
          {action.label}
        </button>
      )}
    </section>
  );
}
