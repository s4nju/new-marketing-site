import { productData } from "../product-data";
import { siteConfig } from "../site-config";

export const dynamic = "force-static";

export function GET() {
  const content = `# biu

> biu is a study app that turns videos, links, PDFs, and photos of notes into summaries and flashcards, then schedules those cards in a daily spaced-repetition quiz.

Supported platforms: ${productData.platforms.join(", ")}.
Last updated: ${productData.lastUpdated}.

## Product

- [Homepage](${siteConfig.url}): Product overview, workflow, features, pricing, and frequently asked questions.
- [AI flashcard maker](${siteConfig.url}/ai-flashcard-maker): Supported study inputs, generated summaries and flashcards, review workflow, and AI limitations.
- [PDF to flashcards](${siteConfig.url}/pdf-to-flashcards): Workflow for converting a PDF into an inspected flashcard deck and scheduled reviews.
- [Spaced repetition guide](${siteConfig.url}/spaced-repetition): Source-led explanation of spacing, retrieval practice, research limitations, and biu's scheduling behavior.
- [Planned launch pricing](${siteConfig.url}/#pricing): Human-readable private-beta status, planned trial, monthly and yearly pricing, and included features.
- [Frequently asked questions](${siteConfig.url}/faq): Detailed answers about supported inputs, flashcard generation, daily quizzes, the AI tutor, access, and pricing.
- [Machine-readable pricing](${siteConfig.url}/pricing.md): Planned launch pricing, trial terms, private-beta availability, and included features.

## Policies

- [Privacy policy](${siteConfig.url}/privacy): How biu handles personal information and user content.
- [Terms of service](${siteConfig.url}/terms): Terms governing access to and use of biu.

## Discovery

- [Sitemap](${siteConfig.url}/sitemap.xml): Index of public resources.
- [Robots policy](${siteConfig.url}/robots.txt): Crawler access rules.
`;

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, must-revalidate",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
