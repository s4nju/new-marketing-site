import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import { appIdentity } from "../../app-links";
import { siteConfig } from "../../site-config";
import { normalizeChatShareToken } from "../share-token";
import SharedChatView from "../SharedChatView";

// Every token is a different capability; never prerender or share HTML.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

/**
 * Metadata stays generic on purpose. Link unfurlers (iMessage, Slack,
 * WhatsApp) cache titles and descriptions, and would keep showing a chat's
 * contents after the owner revokes the link.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token: rawToken } = await params;
  const token = normalizeChatShareToken(rawToken);
  const title = `A chat shared on ${siteConfig.name}`;
  const description = "Read a conversation someone shared from the biu study app.";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    alternates: { canonical: null },
    openGraph: { type: "website", title, description, url: null },
    twitter: { card: "summary_large_image", title, description },
    // The Smart App Banner hands this URL only to the verified biu app.
    ...(appIdentity.iosAppStoreId && token
      ? {
          itunes: {
            appId: appIdentity.iosAppStoreId,
            appArgument: `${siteConfig.url}/shared-chat/${token}`,
          },
        }
      : {}),
  };
}

export default async function SharedChatPage({ params }: Props) {
  const { token: rawToken } = await params;
  const token = normalizeChatShareToken(rawToken);

  return (
    <>
      <Navbar />
      <SharedChatView token={token} />
    </>
  );
}
