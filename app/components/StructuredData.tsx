import { homepageFaqItems } from "../content";
import { productData } from "../product-data";
import { siteConfig } from "../site-config";

export default function StructuredData() {
  const sameAs = [
    siteConfig.links.instagram,
    siteConfig.links.facebook,
    siteConfig.links.youtube,
    siteConfig.links.reddit,
    siteConfig.links.x,
  ].filter((url): url is string => Boolean(url));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#app`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        applicationCategory: "EducationalApplication",
        operatingSystem: "iOS, Android",
        offers: [
          {
            "@type": "Offer",
            name: productData.trial.name,
            price: productData.trial.price.replace("$", ""),
            priceCurrency: "USD",
            description: `${productData.trial.duration}, no payment card required`,
            url: `${siteConfig.url}/#pricing`,
          },
          {
            "@type": "Offer",
            name: `${productData.pro.name} monthly`,
            price: productData.pro.monthlyPrice.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
            description: "Monthly subscription",
            url: `${siteConfig.url}/#pricing`,
          },
          {
            "@type": "Offer",
            name: `${productData.pro.name} yearly`,
            price: productData.pro.yearlyPrice.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
            description: "Yearly subscription",
            url: `${siteConfig.url}/#pricing`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: homepageFaqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
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
