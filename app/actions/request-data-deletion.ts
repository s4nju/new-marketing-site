"use server";

import "server-only";

import { randomUUID } from "node:crypto";
import { GoogleAuth } from "google-auth-library";
import { z } from "zod";

const SHEET_RANGE = "'Data Deletion Requests'!A:E";

const dataDeletionSchema = z.object({
  email: z.string().trim().email().max(254),
  authProvider: z.enum(["google", "apple"], {
    message: "select how you signed in.",
  }),
  reason: z.string().trim().min(1, "tell us why you want your data deleted.").max(2000),
  company: z.string().max(200).optional(),
});

export type DataDeletionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function getGoogleSheetsConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ?.replace(/\\n/g, "\n")
    .trim();

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error("GOOGLE_PRIVATE_KEY must contain a PEM private key.");
  }

  return { spreadsheetId, clientEmail, privateKey };
}

export async function requestDataDeletion(
  _previousState: DataDeletionState,
  formData: FormData,
): Promise<DataDeletionState> {
  const parsed = dataDeletionSchema.safeParse({
    email: formData.get("email"),
    authProvider: formData.get("authProvider"),
    reason: formData.get("reason"),
    company: formData.get("company") || undefined,
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      status: "error",
      message: firstIssue?.message ?? "check your entries and try again.",
    };
  }

  // Bots commonly fill this visually hidden field. Return a normal-looking
  // response so the field does not become a signal they can adapt to.
  if (parsed.data.company) {
    return {
      status: "success",
      message: "thanks — your deletion request has been recorded.",
    };
  }

  const email = parsed.data.email.normalize("NFKC").toLowerCase();
  const authProvider = parsed.data.authProvider;
  const reason = parsed.data.reason.normalize("NFKC").trim();

  try {
    const { spreadsheetId, clientEmail, privateKey } = getGoogleSheetsConfig();
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();

    await client.request({
      url: `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
        spreadsheetId,
      )}/values/${encodeURIComponent(SHEET_RANGE)}:append`,
      method: "POST",
      params: {
        insertDataOption: "INSERT_ROWS",
        valueInputOption: "RAW",
      },
      data: {
        values: [
          [
            new Date().toISOString(),
            email,
            authProvider,
            reason,
            randomUUID(),
          ],
        ],
      },
    });

    // TODO: also send a Slack message (e.g. via incoming webhook) when a data
    // deletion request is recorded, once the channel + webhook are set up.

    return {
      status: "success",
      message:
        "thanks — your deletion request has been recorded. we will follow up by email within 30 days.",
    };
  } catch (error) {
    console.error(
      "Failed to record data deletion request:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return {
      status: "error",
      message: "we couldn't save your request. please try again.",
    };
  }
}
