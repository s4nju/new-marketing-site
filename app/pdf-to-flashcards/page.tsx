import type { Metadata } from "next";
import ClusterStructuredData from "../components/ClusterStructuredData";
import EditorialPage, {
  CardGrid,
  ContentSection,
  EditorialNote,
  NumberedSteps,
  type EditorialFaq,
  type RelatedPage,
} from "../components/EditorialPage";

const path = "/pdf-to-flashcards";
const title = "Turn a PDF into Flashcards and Daily Reviews | biu";
const description =
  "Add a PDF to biu to generate a summary and flashcards, inspect the results, and review due cards through a spaced-repetition quiz.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title,
    description,
  },
};

const faqs = [
  {
    question: "Can biu create flashcards from a PDF?",
    answer:
      "Yes. Add a PDF and biu generates a summary and a deck of flashcards from its study material.",
  },
  {
    question: "Should I check AI-generated flashcards?",
    answer:
      "Yes. Compare important cards with the original PDF, especially definitions, formulas, dates, names, and context-dependent claims.",
  },
  {
    question: "What happens after the cards are generated?",
    answer:
      "The cards can become part of your daily quiz. biu schedules them using your review history and increases intervals after correct answers.",
  },
  {
    question: "Does biu publish a PDF size or page limit?",
    answer:
      "This page does not state a size or page limit because those limits have not been approved for publication. Beta participants should follow the limits shown in the app.",
  },
] as const satisfies readonly EditorialFaq[];

const relatedPages = [
  {
    href: "/ai-flashcard-maker",
    label: "product guide",
    title: "Explore the AI flashcard maker",
    description:
      "Compare PDFs with the other supported source types and review the full workflow.",
  },
  {
    href: "/spaced-repetition",
    label: "learning guide",
    title: "What happens after generation?",
    description:
      "Understand how spaced reviews and active recall relate to the daily quiz.",
  },
] as const satisfies readonly RelatedPage[];

export default function PdfToFlashcardsPage() {
  return (
    <>
      <ClusterStructuredData
        path={path}
        name={title}
        description={description}
        breadcrumbLabel="PDF to flashcards"
        faqs={faqs}
        kind="product"
      />
      <EditorialPage
        breadcrumbLabel="PDF to flashcards"
        eyebrow="One document, a reviewable deck"
        title="turn a PDF into flashcards, then keep reviewing."
        intro="A long reading is difficult to revisit as one block. biu turns a PDF into a summary and a flashcard deck, giving you smaller prompts to inspect and review over time."
        definitionLabel="How does PDF to flashcards work?"
        definition="A PDF-to-flashcards workflow identifies study material in a document and drafts question-and-answer cards from it. In biu, you add the PDF, inspect the generated summary and cards, and then review due cards through the same daily spaced-repetition quiz used for other sources."
        image={{
          src: "/images/editorial/pdf-to-flashcards.jpg",
          alt: "A paper document connected to three generated study cards",
          width: 880,
          height: 1000,
        }}
        imageCaption="The original PDF remains the reference; generated summaries and cards are a study layer on top."
        faqs={faqs}
        relatedPages={relatedPages}
      >
        <ContentSection
          eyebrow="best fit"
          title="use PDFs that contain material you need to recall"
          intro="The workflow is designed for study material, not for replacing careful reading or professional review."
        >
          <CardGrid
            items={[
              {
                title: "Course readings",
                description:
                  "Turn key concepts from assigned material into prompts you can revisit after the first read.",
              },
              {
                title: "Lecture handouts",
                description:
                  "Convert structured notes and explanations into a compact deck for later practice.",
              },
              {
                title: "Study guides",
                description:
                  "Use an existing revision document as the source for questions rather than rewriting every card.",
              },
              {
                title: "Reference material",
                description:
                  "Create recall prompts for terminology and facts while keeping the PDF available for context.",
              },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="four steps"
          title="a responsible PDF-to-review workflow"
          intro="A short inspection step between generation and review makes the deck more dependable."
        >
          <NumberedSteps
            items={[
              {
                title: "Add the PDF",
                description:
                  "Choose one document with a clear study purpose. If your material exists as separate photos of notes, biu accepts those as another supported input.",
              },
              {
                title: "Read the generated summary",
                description:
                  "Use the summary to see how biu interpreted the document and to notice missing context before reviewing individual cards.",
              },
              {
                title: "Inspect important flashcards",
                description:
                  "Compare precise facts, formulas, definitions, and claims with the original pages. Generated cards are drafts, not a replacement for the source.",
              },
              {
                title: "Review cards when they are due",
                description:
                  "Answer cards in the daily quiz. Correct answers increase the interval before the next scheduled review.",
              },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="quality check"
          title="what to inspect before studying"
          intro="The usefulness of a generated deck depends on both the source and the review you give the output."
        >
          <p>
            Start by checking whether each card asks one clear question. Split
            cards that bundle several ideas, and preserve enough context that
            the answer still means the same thing outside the paragraph it came
            from.
          </p>
          <p>
            Then verify details where accuracy matters: units, negatives,
            exceptions, names, dates, citations, and terminology. If a PDF is
            ambiguous or visually complex, return to the relevant page instead
            of assuming the generated card captured everything.
          </p>
          <EditorialNote title="What this page does not promise">
            biu does not claim that every PDF produces a complete or error-free
            deck. The workflow reduces setup work while leaving final judgment
            with the learner.
          </EditorialNote>
        </ContentSection>
      </EditorialPage>
    </>
  );
}
