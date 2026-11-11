import { appIdentity, sharedChatPathPrefix } from "../../app-links";

export const dynamic = "force-static";

/**
 * Apple fetches this through its CDN when the app is installed. It must be
 * served as JSON with a 200 and no redirect, on every host the app lists in
 * its Associated Domains entitlement (www and apex).
 */
export function GET() {
  if (!appIdentity.appleTeamId) {
    return new Response("Not Found", { status: 404 });
  }

  const body = {
    applinks: {
      details: [
        {
          appIDs: [`${appIdentity.appleTeamId}.${appIdentity.iosBundleId}`],
          components: [
            {
              "/": `${sharedChatPathPrefix}/*`,
              comment: "Public shared chat threads open in the biu app.",
            },
          ],
        },
      ],
    },
  };

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
