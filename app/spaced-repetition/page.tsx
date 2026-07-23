import type { Metadata } from "next";
import ClusterStructuredData from "../components/ClusterStructuredData";
import EditorialPage, {
  CardGrid,
  ContentSection,
  EditorialNote,
  NumberedSteps,
  SourceList,
  type EditorialFaq,
  type RelatedPage,
} from "../components/EditorialPage";

const path = "/spaced-repetition";
const title = "What Is Spaced Repetition? A Practical Guide | biu";
const description =
  "Learn how spaced repetition and retrieval practice work, what research says about review intervals, and how biu schedules flashcards from review history.";
const published = "2026-07-23";
const modified = "2026-07-23";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    url: path,
    title,
    description,
    publishedTime: published,
    modifiedTime: modified,
  },
};

const faqs = [
  {
    question: "What is spaced repetition?",
    answer:
      "Spaced repetition is a study method that revisits material across separate sessions instead of concentrating every exposure in one sitting. The interval between reviews may stay equal or change over time.",
  },
  {
    question: "Is spaced repetition the same as retrieval practice?",
    answer:
      "No. Spacing describes when study happens. Retrieval practice describes trying to recall an answer from memory. Flashcard systems often combine both methods.",
  },
  {
    question: "Is there one perfect review interval?",
    answer:
      "No universal interval fits every learner, item, and retention goal. Research indicates that useful spacing depends partly on how long the information needs to be retained.",
  },
  {
    question: "Has biu been independently validated by these studies?",
    answer:
      "No. The cited research examines general spacing and retrieval-practice methods. It does not independently test or validate biu.",
  },
] as const satisfies readonly EditorialFaq[];

const relatedPages = [
  {
    href: "/ai-flashcard-maker",
    label: "product guide",
    title: "Generate cards for later review",
    description:
      "See how supported source material becomes a summary, flashcards, and a review history.",
  },
  {
    href: "/pdf-to-flashcards",
    label: "use case",
    title: "Start with a PDF",
    description:
      "Follow a responsible workflow from one document to an inspected flashcard deck.",
  },
] as const satisfies readonly RelatedPage[];

const sources = [
  {
    title:
      "Distributed practice in verbal recall tasks: a review and quantitative synthesis",
    detail:
      "Cepeda et al., Psychological Bulletin, 2006. A meta-analysis of 839 assessments across 317 experiments examining spacing and retention intervals.",
    href: "https://pubmed.ncbi.nlm.nih.gov/16719566/",
  },
  {
    title:
      "Optimizing schedules of retrieval practice for durable and efficient learning",
    detail:
      "Rawson and Dunlosky, Journal of Experimental Psychology: General, 2011. Three experiments examining initial retrieval and later relearning sessions.",
    href: "https://pubmed.ncbi.nlm.nih.gov/21707204/",
  },
  {
    title:
      "Retrieval practice over the long term: should spacing be expanding or equal-interval?",
    detail:
      "Kang et al., Psychonomic Bulletin & Review, 2014. A study comparing expanding and equal-interval retrieval schedules for foreign vocabulary.",
    href: "https://pubmed.ncbi.nlm.nih.gov/24744260/",
  },
] as const;

export default function SpacedRepetitionPage() {
  return (
    <>
      <ClusterStructuredData
        path={path}
        name={title}
        description={description}
        breadcrumbLabel="Spaced repetition"
        faqs={faqs}
        kind="article"
        datePublished={published}
        dateModified={modified}
      />
      <EditorialPage
        breadcrumbLabel="Spaced repetition"
        eyebrow="A source-led learning guide"
        title="space reviews out. practice bringing answers back."
        intro="Spaced repetition and retrieval practice are related but distinct learning methods. Understanding the difference makes it easier to judge what a flashcard schedule is actually doing."
        definitionLabel="What is spaced repetition?"
        definition="Spaced repetition is a study method that revisits material across separate sessions rather than grouping every exposure together. Many flashcard systems combine spacing with retrieval practice: the learner tries to recall an answer, records the result, and reviews the material again after an interval."
        image={{
          src: "/images/editorial/spaced-repetition.jpg",
          alt: "Flashcards arranged along a path with widening review intervals",
          width: 880,
          height: 1000,
        }}
        imageCaption="Spacing describes when reviews occur; retrieval practice describes the act of recalling an answer."
        faqs={faqs}
        relatedPages={relatedPages}
      >
        <ContentSection
          eyebrow="two mechanisms"
          title="spacing and retrieval practice are not the same thing"
          intro="They are often used together, but separating them leads to clearer claims and better study decisions."
        >
          <CardGrid
            items={[
              {
                title: "Spacing",
                description:
                  "Study or review episodes are distributed over time instead of being concentrated in one session.",
              },
              {
                title: "Retrieval practice",
                description:
                  "The learner attempts to bring an answer to mind rather than only rereading the material.",
              },
              {
                title: "Feedback",
                description:
                  "After an attempt, seeing the correct answer helps identify errors and supplies material for another retrieval attempt.",
              },
              {
                title: "Scheduling",
                description:
                  "A system decides when an item returns. The schedule may be fixed, expanding, or adaptive to recorded performance.",
              },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="what research supports"
          title="distributed reviews can outperform massed study"
          intro="The research supports careful conclusions, not a single universal timetable."
        >
          <p>
            Cepeda and colleagues synthesized hundreds of distributed-practice
            assessments and found that the relationship between the spacing
            interval and later retention depends partly on the intended
            retention interval. Put simply, the best gap is not fixed
            independently of how long the learner wants the material to last.
          </p>
          <p>
            Rawson and Dunlosky examined repeated retrieval and relearning of
            conceptual material. Their experiments found substantial value from
            relearning at widely spaced intervals, while also showing that more
            initial practice and more later relearning do not contribute in a
            simple additive way.
          </p>
          <p>
            Kang and colleagues compared expanding and equal-interval retrieval
            schedules for foreign vocabulary. The schedules produced equivalent
            final-test recall in that study, while the expanding schedule
            produced higher average recall during training. This is a useful
            reminder that the best schedule can depend on the outcome being
            optimized.
          </p>
          <EditorialNote title="Evidence boundary">
            These studies examine general learning methods. They did not test
            biu and should not be read as independent validation of biu’s
            implementation or as a guarantee of individual results.
          </EditorialNote>
        </ContentSection>

        <ContentSection
          eyebrow="in biu"
          title="how biu uses review history"
          intro="The approved product claim describes observable scheduling behavior without predicting the exact moment someone will forget."
        >
          <NumberedSteps
            items={[
              {
                title: "A flashcard enters the review workflow",
                description:
                  "The card may be generated from supported study material and becomes available for practice.",
              },
              {
                title: "The learner attempts an answer",
                description:
                  "That attempt creates review history for the card instead of treating every review as identical.",
              },
              {
                title: "A correct answer increases the interval",
                description:
                  "biu schedules each card from your review history and increases the interval when you answer correctly.",
              },
              {
                title: "Due cards return in a later quiz",
                description:
                  "The daily quiz brings scheduled material back without requiring the learner to plan every review date manually.",
              },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="primary sources"
          title="research cited in this guide"
          intro="These records provide abstracts, authorship, publication details, and DOI identifiers for the studies summarized above."
        >
          <SourceList sources={sources} />
        </ContentSection>
      </EditorialPage>
    </>
  );
}
