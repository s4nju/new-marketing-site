import { productData } from "../product-data";
import { appAccessHref, siteConfig } from "../site-config";

export const dynamic = "force-static";

export function GET() {
  const appAccessUrl = new URL(appAccessHref, siteConfig.url).toString();
  const proFeatures = productData.pro.features
    .map((feature) => `- ${feature}`)
    .join("\n");

  const content = `# Pricing — biu

Last updated: ${productData.lastUpdated}

## ${productData.trial.name}

- Availability: ${productData.trial.availability}
- Price: ${productData.trial.price}
- Duration: ${productData.trial.duration}
- Payment card required: ${productData.trial.paymentCardRequired ? "Yes" : "No"}
- Includes: Everything in biu Pro during the trial

## ${productData.pro.name}

- Availability: ${productData.pro.availability}
- Monthly price: ${productData.pro.monthlyPrice}
- Yearly price: ${productData.pro.yearlyPrice}
- Cancellation: ${productData.pro.cancellation}

### Included features

${proFeatures}

## Product inputs

biu accepts ${productData.inputs.join(", ")}.

## Notes

- Prices are listed in US dollars.
- Privacy policy: ${siteConfig.url}/privacy
- Terms of service: ${siteConfig.url}/terms
`;

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, must-revalidate",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
