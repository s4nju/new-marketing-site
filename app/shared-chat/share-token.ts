/**
 * Shape of a chat-share capability token: `<uuid>.<base64url HMAC-SHA256>`.
 * Mirrors biu-core `chat-share-domain.ts` and biu-so `chatShareToken.ts`.
 * Checked locally so a malformed URL never becomes an API request.
 */
const CHAT_SHARE_TOKEN_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[A-Za-z0-9_-]{43}$/i;

export function normalizeChatShareToken(value: string | undefined): string | null {
  if (!value || value.length > 200) return null;
  try {
    const decoded = decodeURIComponent(value);
    return CHAT_SHARE_TOKEN_PATTERN.test(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

export type SharedChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type SharedChat = {
  title: string;
  messages: SharedChatMessage[];
};

/** Accept only the documented public projection; anything else is unavailable. */
export function parseSharedChat(value: unknown): SharedChat | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { title?: unknown; messages?: unknown };
  if (typeof candidate.title !== "string" || !Array.isArray(candidate.messages)) {
    return null;
  }

  const messages: SharedChatMessage[] = [];
  for (const message of candidate.messages) {
    if (!message || typeof message !== "object") return null;
    const { role, content } = message as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return null;
    }
    messages.push({ role, content });
  }

  return { title: candidate.title.trim() || "Untitled chat", messages };
}
