import { productData } from "../product-data";
import { appAccessHref, siteConfig } from "../site-config";

export const dynamic = "force-static";

export function GET() {
  const appAccessUrl = new URL(appAccessHref, siteConfig.url).toString();
  const plans = [productData.plus, productData.pro].map((plan) => `## ${plan.name}

- US monthly price: ${plan.monthlyPrice} (USD)
- US annual price: ${plan.yearlyPrice} (USD; one annual payment)
- Monthly credit allowance: ${plan.creditsPerMonth.toLocaleString("en-US")}, including annual subscriptions
- ${plan.cancellation}
- Features: ${plan.features.join("; ")}
`).join("\n");
  const content = `# Pricing — biu

Last updated: ${productData.lastUpdated}
Availability: ${productData.availability.status}. [Get the app](${appAccessUrl}).

## ${productData.trial.name}

- Price: ${productData.trial.price}; no payment card required and no automatic subscription.
- Eligible new accounts receive ${productData.trial.duration} from first sign-in, with the trial credit allowance shown in the app.
- Daily quiz rewards during the base trial: 100 credits per eligible daily completion, at most seven rewards (700 credits). These do not extend access days.
- Existing historical access grants retain their recorded expiry.

${plans}
## Credit rules

- Both plans unlock the same features; neither offers unlimited AI usage.
- New library content is charged by source size. Chat replies and chat-file processing are charged by AI work. Check available estimates before processing and your final usage, balance, and history in the app. Library processing has a minimum charge of one credit.
- Voice transcription, AI Memory, recall grading, manual cards, Anki imports, and community-deck cloning or updates currently carry no separate credit charge. Some still require active Pro access.
- Credits refresh monthly on the account's cycle date, not each calendar month. Annual payments do not provide the full year's credits upfront.
- Unused monthly credits expire. Unused trial credits join the first paid cycle only when the purchase occurs before trial access expires; they expire with that cycle.
- A verified tier upgrade adds the allowance difference once in the current cycle, without resetting spend. A downgrade does not remove credits already granted; its lower allowance applies from the next cycle after it takes effect.
- BIU-side failures are not charged; held content credits are released after final failure. Retrying the same processing job does not charge twice. A user-stopped chat can charge for completed work.
- Items awaiting credits can be resumed from the app. There are no automatic top-up purchases. Credits have no cash value and cannot be transferred or redeemed; mandatory consumer rights remain unaffected.

## Billing and access

- The localized store checkout price, taxes, period, offer, and renewal terms control each purchase.
- Subscriptions renew automatically unless cancelled through Apple or Google. Annual plans charge the displayed annual total once per year.
- BIU trial or granted access does not postpone charges for a subscription you choose to buy. The signup trial does not automatically convert to a paid plan.
- Google Play upgrades are charged and immediate; downgrades and duration changes are deferred. Apple determines its effective dates and charges. A scheduled change is not yet an active plan.
- Saved material, non-AI quizzes, streaks, progress, organization, and community decks remain available without a paid plan. New AI work, manual-card creation, and Anki imports require active Pro access. Storage and rate limits apply.
- Privacy policy: ${siteConfig.url}/privacy-policy
- Terms: ${siteConfig.url}/terms
`;
  return new Response(content, { headers: {
    "Cache-Control": "public, max-age=300, s-maxage=3600, must-revalidate",
    "Content-Type": "text/markdown; charset=utf-8",
  } });
}
