import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import FinalCta from "@/app/components/FinalCta";
import MotionController from "@/app/components/MotionController";
import Navbar from "@/app/components/Navbar";
import { siteConfig } from "@/app/site-config";
import {
  formatBlogDate,
  getAdjacentBlogPosts,
  getBlogPost,
  getPublishedBlogPosts,
} from "@/lib/blog";
import styles from "./BlogPost.module.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.coverImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const adjacentPosts = getAdjacentBlogPosts(post.slug);
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    headline: post.title,
    description: post.description,
    image: new URL(post.coverImage, siteConfig.url).toString(),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <MotionController />
      <Navbar />
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{post.title}</span>
            </nav>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{post.title}</h1>
            <p className={styles.description}>{post.description}</p>
            <div className={styles.byline}>
              <span>By {post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              {post.updatedAt ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatBlogDate(post.updatedAt)}</span>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </header>

        <div className={styles.cover}>
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 1180px"
            priority
          />
        </div>

        <article className={styles.article}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeHighlight]}
            components={{
              a: ({ href, children, ...props }) => {
                const external = href?.startsWith("http");
                return (
                  <a
                    href={href}
                    rel={external ? "noreferrer" : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        <nav className={styles.postNavigation} aria-label="More blog posts">
          {adjacentPosts.newer ? (
            <Link
              href={`/blog/${adjacentPosts.newer.slug}`}
              className={styles.previous}
            >
              <span>newer note</span>
              <strong>← {adjacentPosts.newer.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {adjacentPosts.older ? (
            <Link
              href={`/blog/${adjacentPosts.older.slug}`}
              className={styles.next}
            >
              <span>older note</span>
              <strong>{adjacentPosts.older.title} →</strong>
            </Link>
          ) : (
            <Link href="/blog" className={styles.next}>
              <span>keep exploring</span>
              <strong>all learning notes →</strong>
            </Link>
          )}
        </nav>
      </main>
      <FinalCta />
    </>
  );
}
