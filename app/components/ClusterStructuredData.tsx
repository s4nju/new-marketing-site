import type { EditorialFaq } from "./EditorialPage";
import { productData } from "../product-data";
import { siteConfig } from "../site-config";

type ClusterStructuredDataProps = {
  path: string;
  name: string;
  description: string;
  breadcrumbLabel: string;
  faqs: readonly EditorialFaq[];
  kind: "product" | "article" | "pricing";
  datePublished?: string;
  dateModified?: string;
};

export default function ClusterStructuredData({
  path,
  name,
  description,
  breadcrumbLabel,
  faqs,
  kind,
  datePublished,
  dateModified,
}: ClusterStructuredDataProps) {
  const pageUrl = `${siteConfig.url}${path}`;
  const pageId = `${pageUrl}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": pageId,
      url: pageUrl,
      name,
      description,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about:
        kind === "article"
          ? { "@id": `${pageUrl}#article` }
          : { "@id": `${siteConfig.url}/#app` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: breadcrumbLabel,
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  if (kind === "article") {
    graph.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: name,
      description,
      mainEntityOfPage: { "@id": pageId },
      author: { "@id": `${siteConfig.url}/#organization` },
      publisher: { "@id": `${siteConfig.url}/#organization` },
      datePublished,
      dateModified,
      inLanguage: "en",
    });
  } else {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#app`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: productData.platforms.join(", "),
      featureList: productData.capabilities,
    });
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
