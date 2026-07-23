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
import { siteConfig } from "../site-config";

const path = "/ai-flashcard-maker";
const title = "AI Flashcard Maker for PDFs, Videos and Notes | biu";
const description =
  "Use biu to turn PDFs, videos, links, and photos of notes into summaries and flashcards, then review due cards in a spaced-repetition quiz.";

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
    question: "What can biu turn into flashcards?",
    answer:
      "biu accepts videos, links, PDFs, and photos of notes. It generates a summary and a deck of flashcards from the material you add.",
  },
  {
    question: "Does biu schedule the generated flashcards?",
    answer:
      "Yes. Generated cards can enter the daily quiz. biu uses your review history to schedule each card and increases the interval when you answer correctly.",
  },
  {
    question: "Can I ask questions about my study material?",
    answer:
      "Yes. The AI tutor can use one of your notes or a whole collection as context. You should still check important answers against the original material.",
  },
  {
    question: "Can I use the AI flashcard maker now?",
    answer:
      "biu is currently in private beta. You can request beta access; public iOS and Android availability is planned for launch.",
  },
] as const satisfies readonly EditorialFaq[];

const relatedPages = [
  {
    href: "/pdf-to-flashcards",
    label: "use case",
    title: "Turn a PDF into flashcards",
    description:
      "See the focused workflow for converting a document into cards and a review queue.",
  },
  {
    href: "/spaced-repetition",
    label: "learning guide",
    title: "Understand spaced repetition",
    description:
      "Learn why reviews are spread over time and how retrieval practice fits in.",
  },
  {
    href: "/#pricing",
    label: "plans",
    title: "Review planned launch pricing",
    description:
      "Compare the planned free trial, monthly plan, and yearly plan.",
  },
] as const satisfies readonly RelatedPage[];

export default function AiFlashcardMakerPage() {
  return (
    <>
      <ClusterStructuredData
        path={path}
        name={title}
        description={description}
        breadcrumbLabel="AI flashcard maker"
        faqs={faqs}
        kind="product"
      />
      <EditorialPage
        breadcrumbLabel="AI flashcard maker"
        eyebrow="AI flashcards, grounded in your material"
        title="turn study material into flashcards you can review."
        intro="Add the material you are already studying. biu creates a summary and flashcards, then places those cards into a review workflow so you do not have to build and schedule every deck by hand."
        definitionLabel="What is an AI flashcard maker?"
        definition="An AI flashcard maker converts source material into question-and-answer study cards. biu accepts videos, links, PDFs, and photos of notes, generates a summary and flashcards, and can schedule those cards in a daily spaced-repetition quiz based on your review history."
        image={{
          src: "/images/editorial/ai-flashcard-maker.jpg",
          alt: "biu dashboard with a daily quiz and recently added study notes",
          width: 880,
          height: 1000,
        }}
        imageCaption="The biu dashboard keeps generated material, due reviews, and recent notes in one place."
        faqs={faqs}
        relatedPages={relatedPages}
      >
        <ContentSection
          eyebrow="supported inputs"
          title="start with the material you already have"
          intro="Different sources need different study workflows. biu keeps the input step consistent while preserving the original material as the reference point."
        >
          <CardGrid
            items={[
              {
                title: "PDFs",
                description:
                  "Add course readings, handouts, and other PDF study material to generate a summary and flashcard deck.",
              },
              {
                title: "Videos",
                description:
                  "Add a study video when the important ideas are easier to understand than to turn into cards manually.",
              },
              {
                title: "Links",
                description:
                  "Use a link as the starting point for a summary and a set of reviewable questions.",
              },
              {
                title: "Photos of notes",
                description:
                  "Bring handwritten or printed notes into the same flashcard and review workflow.",
              },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="workflow"
          title="from source to scheduled review"
          intro="Generation is only the first step. The useful unit is a card that remains connected to an ongoing review process."
        >
          <NumberedSteps
            items={[
              {
                title: "Add one source",
                description:
                  "Upload a supported file or add a video or link. Keeping the source focused makes the resulting deck easier to inspect.",
              },
              {
                title: "Review the summary and cards",
                description:
                  "Read the generated material and compare important details with the source. Edit or omit anything that does not represent what you need to learn.",
              },
              {
                title: "Answer cards in the daily quiz",
                description:
                  "Generated cards become part of your review history rather than a deck you need to schedule manually.",
              },
              {
                title: "Let intervals respond to review history",
                description:
                  "biu schedules each card from your review history and increases the interval when you answer correctly.",
              },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="AI boundaries"
          title="generation helps with setup, not judgment"
          intro="AI can reduce the work of drafting summaries and flashcards, but the original source remains the authority."
        >
          <p>
            Generated cards are most useful when you inspect them before relying
            on them. Check names, formulas, definitions, dates, and any claim
            where a subtle wording change would alter the meaning.
          </p>
          <p>
            The AI tutor can answer questions using your own note or collection
            as context. Grounding narrows the conversation to material you
            selected, but it does not guarantee that every answer is complete or
            correct.
          </p>
          <EditorialNote title="A practical review rule">
            Treat generated material as a first draft. Verify high-stakes facts
            against the source before you study or share them.
          </EditorialNote>
        </ContentSection>
      </EditorialPage>
    </>
  );
}
