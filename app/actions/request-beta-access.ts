"use server";

import "server-only";

import { randomUUID } from "node:crypto";
import { GoogleAuth } from "google-auth-library";
import { z } from "zod";

const SHEET_RANGE = "'Beta Requests'!A:D";

const betaAccessSchema = z.object({
  email: z.string().trim().email().max(254),
  company: z.string().max(200).optional(),
});

export type BetaAccessState = {
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

export async function requestBetaAccess(
  _previousState: BetaAccessState,
  formData: FormData,
): Promise<BetaAccessState> {
  const parsed = betaAccessSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "enter a valid email address.",
    };
  }

  // Bots commonly fill this visually hidden field. Return a normal-looking
  // response so the field does not become a signal they can adapt to.
  if (parsed.data.company) {
    return {
      status: "success",
      message: "thanks — your request has been recorded.",
    };
  }

  const email = parsed.data.email.normalize("NFKC").toLowerCase();

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
            "marketing-site",
            randomUUID(),
          ],
        ],
      },
    });

    return {
      status: "success",
      message: "thanks — your beta request has been recorded.",
    };
  } catch (error) {
    console.error(
      "Failed to record beta access request:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return {
      status: "error",
      message: "we couldn't save your request. please try again.",
    };
  }
}
