import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FinalCta from "../components/FinalCta";
import MotionController from "../components/MotionController";
import Navbar from "../components/Navbar";
import { formatBlogDate, getPublishedBlogPosts } from "@/lib/blog";
import { siteConfig } from "../site-config";
import styles from "./BlogPage.module.css";

export const metadata: Metadata = {
  title: `Learning notes | ${siteConfig.name}`,
  description:
    "Practical notes from biu about learning, memory, flashcards, and building a study practice that lasts.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Learning notes | ${siteConfig.name}`,
    description:
      "Practical notes about learning, memory, flashcards, and building a study practice that lasts.",
  },
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/blog#collection`,
    url: `${siteConfig.url}/blog`,
    name: `Learning notes | ${siteConfig.name}`,
    description:
      "Practical notes from biu about learning, memory, flashcards, and study practice.",
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <MotionController />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>biu learning notes</p>
              <h1>Ideas worth remembering.</h1>
            </div>
            <p className={styles.intro}>
              Clear, practical notes about learning, memory, and turning what
              you read into knowledge you can actually use.
            </p>
          </div>
        </section>

        <section className={styles.feed} aria-labelledby="latest-posts">
          <div className={styles.feedHeading}>
            <h2 id="latest-posts">latest notes</h2>
            <span>
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {featuredPost ? (
            <>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className={styles.featured}
              >
                <div className={styles.featuredImage}>
                  <Image
                    src={featuredPost.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 800px) 100vw, 54vw"
                    priority
                  />
                </div>
                <div className={styles.featuredCopy}>
                  <span className={styles.featuredLabel}>newest note</span>
                  <div className={styles.tags}>
                    {featuredPost.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.description}</p>
                  <div className={styles.meta}>
                    <time dateTime={featuredPost.publishedAt}>
                      {formatBlogDate(featuredPost.publishedAt)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{featuredPost.readingMinutes} min read</span>
                  </div>
                  <strong>read the note <span aria-hidden="true">→</span></strong>
                </div>
              </Link>

              {remainingPosts.length > 0 ? (
                <div className={styles.grid}>
                  {remainingPosts.map((post) => (
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.card}
                      key={post.slug}
                    >
                      <div className={styles.cardImage}>
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          sizes="(max-width: 700px) 100vw, 33vw"
                        />
                      </div>
                      <div className={styles.cardCopy}>
                        <div className={styles.tags}>
                          {post.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <div className={styles.meta}>
                          <time dateTime={post.publishedAt}>
                            {formatBlogDate(post.publishedAt)}
                          </time>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingMinutes} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className={styles.emptyState}>
              <span aria-hidden="true">✦</span>
              <h2>The first note is taking shape.</h2>
              <p>
                We’re preparing practical guides about memory, learning, and
                building a study practice that lasts. Check back soon.
              </p>
              <Link href="/">explore biu in the meantime</Link>
            </div>
          )}
        </section>
      </main>
      <FinalCta />
    </>
  );
}
