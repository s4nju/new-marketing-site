import { appIdentity } from "../../app-links";

export const dynamic = "force-static";

/**
 * Android verifies `autoVerify` intent filters against this file. It must be
 * served as JSON with a 200 and no redirect on every claimed host.
 */
export function GET() {
  if (appIdentity.androidCertSha256.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: appIdentity.androidPackage,
        sha256_cert_fingerprints: appIdentity.androidCertSha256,
      },
    },
  ];

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
