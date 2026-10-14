import { skills } from "./skills";

// Five projects, one story: developer tooling, a shipped Android app, full-stack, applied AI.
// Source of truth for wording: SITE_REBUILD_PLAN.md §3 and the CV. Numbers trace to §9.
//
// Shape:
//   id / slug     stable string id, used by skills.js `projectIds`
//   caseStudy     slug for /projects/:slug, or null when there is no case-study page
//   featured      true = large card on the home page, false = compact card
//   status        "complete" | "in-progress" (drives the status chip colour)
//   statusLabel   optional text that replaces the default chip text
//   summary       short card copy (home page cards)
//   description   full blurb (case-study pages)
//   media         card image fallback: variant "phone" | "panel" + architecture words;
//                 real images go in `screenshots` as { src, alt } under public/projects/<id>/
//   year          only where the plan gives one; do not add years that do not trace to it
//   highlights    longer bullets (CV wording) for compact cards and case studies
//   tech          chips shown on the card, exactly as in the source
//   skillIds      DERIVED from skills.js `projectIds`, do not edit here
//   links         github / apk (apk stays null until a signed release is confirmed)
//   github        kept for the existing ProjectCard; same value as links.github

const projectData = [
  {
    id: "ci-pipeline-docs",
    caseStudy: "ci-pipeline-docs",
    featured: true,
    title: "What Is My CI Pipeline Doing?",
    context: "MSc dissertation",
    status: "complete",
    year: "2026",
    description:
      "Generates documentation for GitHub Actions pipelines automatically. A parser turns workflow YAML into a platform-agnostic intermediate representation; deterministic generators render Markdown and Mermaid; an optional LLM layer only rewrites already-extracted, validated facts and never sees the YAML. Captured 95.5% of 201 pre-registered facts across 10 held-out pipelines, against 53.2% for a naive raw-YAML-to-LLM baseline.",
    summary:
      "Generates documentation for GitHub Actions pipelines automatically. Captured 95.5% of 201 pre-registered facts across 10 held-out pipelines, against 53.2% for a naive raw-YAML-to-LLM baseline.",
    media: {
      variant: "panel",
      architecture: ["Workflow YAML", "Intermediate representation", "Markdown + Mermaid"],
      alt: "What Is My CI Pipeline Doing? example output",
    },
    highlights: [],
    tech: [
      "Python",
      "GitHub Actions",
      "YAML",
      "Mermaid",
      "Gemini 2.5 Flash (optional layer)",
      "Golden-file testing",
    ],
    links: {
      github: "https://github.com/bhagatshivam/what-is-my-pipeline-doing",
      apk: null,
    },
    github: "https://github.com/bhagatshivam/what-is-my-pipeline-doing",
    screenshots: [],
    color: "#4F8EF7",
  },
  {
    id: "vach",
    caseStudy: "vach",
    featured: true,
    title: "Vach (वाच): Offline EPUB/PDF Reader",
    status: "complete",
    statusLabel: "IN DAILY USE · V1 · REFINING",
    year: "2026",
    description:
      "Android reader (React/TypeScript in a Capacitor native shell) for a personal offline library of EPUB and PDF novels. Pick a folder once and Android's Storage Access Framework keeps access across restarts and reboots. Webnovel-style continuous scroll, font/size/theme controls, per-book reading position, image-page fallback for scanned PDFs. Fully offline, no ads, no telemetry. GitHub Actions builds a debug APK on every push and a signed release APK on version tags.",
    summary:
      "Android reader (React/TypeScript in a Capacitor native shell) for a personal offline library of EPUB and PDF novels. Fully offline, no ads, no telemetry.",
    media: {
      variant: "phone",
      architecture: ["React/TypeScript", "Capacitor native shell"],
      alt: "Vach reading screen",
    },
    highlights: [],
    roadmap: "Next: embedded images in text PDFs, per-book settings, in-book search.",
    tech: ["React", "TypeScript", "Capacitor", "pdf.js", "Android SAF", "GitHub Actions", "Vitest"],
    links: {
      github: "https://github.com/bhagatshivam/Vach",
      // TODO(confirm): link the latest signed APK release once a published release exists.
      apk: null,
    },
    github: "https://github.com/bhagatshivam/Vach",
    releaseNote: "Build from source",
    screenshots: [],
    color: "#06B6D4",
  },
  {
    id: "culinary-rag",
    caseStudy: null,
    featured: false,
    title: "South Asian Culinary RAG Assistant",
    context: "Group project, 4 members",
    status: "complete",
    description:
      "Owned the retrieval core of a fully local RAG chatbot: built the FAISS vector store, BGE-Large embedding pipeline, and a LangGraph intent-routing state machine spanning seven intent categories. Delivered 92.4% Recall@3, 93% intent-classification accuracy, and 88.6% generation faithfulness across a 100-query evaluation benchmark.",
    summary:
      "Owned the retrieval core of a fully local RAG chatbot: FAISS, BGE-Large and a LangGraph intent router. 92.4% Recall@3 and 93% intent accuracy on a 100-query benchmark.",
    highlights: [
      "Owned the retrieval core of a fully local RAG chatbot: built the FAISS vector store, BGE-Large embedding pipeline, and a LangGraph intent-routing state machine spanning seven intent categories.",
      "Delivered 92.4% Recall@3, 93% intent-classification accuracy, and 88.6% generation faithfulness across a 100-query evaluation benchmark.",
      "Combined semantic retrieval (1024-dim embeddings, L2 thresholding) with LLM-powered generation, exposed through a Streamlit dark-mode UI with live pipeline inspection (intent, entities, raw FAISS scores).",
    ],
    tech: ["LangGraph", "FAISS", "BGE-Large Embeddings", "Qwen2.5", "Streamlit", "Python"],
    links: {
      github: "https://github.com/bhagatshivam/South-Asian-Culinary-RAG-Assistant",
      apk: null,
    },
    github: "https://github.com/bhagatshivam/South-Asian-Culinary-RAG-Assistant",
    screenshots: [],
    color: "#8B5CF6",
  },
  {
    id: "storywanderer",
    caseStudy: null,
    featured: false,
    title: "StoryWanderer",
    context: "No public users yet",
    status: "in-progress",
    statusLabel: "IN DEVELOPMENT",
    description:
      "Full-stack novel-publishing platform designed and built end-to-end, from schema design to a Vercel deployment: authentication, chapter-level content management, and real-time data sync via Supabase/PostgreSQL. In development, no public users yet.",
    summary:
      "Full-stack novel-publishing platform on Supabase/PostgreSQL with row-level security and full-text search. In development, no public users yet.",
    highlights: [
      "Designed and built a full-stack novel-publishing platform end-to-end, from schema design to a Vercel deployment, handling authentication, chapter-level content management, and real-time data sync via Supabase/PostgreSQL.",
      "Secured the data layer with Postgres row-level security and a dedicated security view for comment authorship, and added stored tsvector columns for full-text search.",
      "Built a component-driven frontend in React 18, TypeScript, and shadcn/ui, including a custom long-form reading UI optimised for serialised fiction.",
    ],
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase"],
    // Repo stays private; only link it if it can be made public.
    links: { github: null, apk: null },
    github: null,
    screenshots: [],
    color: "#10B981",
  },
  {
    id: "ask-the-doc",
    caseStudy: null,
    featured: false,
    title: "Ask the Doc",
    context: "Bachelor's final-year project",
    status: "complete",
    description:
      "Final-year undergraduate project. An end-to-end document-intelligence app combining abstractive summarisation (Pegasus) with extractive QA (RoBERTa-SQuAD2), plus text-to-speech output via gTTS.",
    summary:
      "Final-year undergraduate project: abstractive summarisation (Pegasus) plus extractive QA (RoBERTa-SQuAD2), with text-to-speech output via gTTS.",
    highlights: [
      "Built an end-to-end document-intelligence app combining abstractive summarisation (Pegasus) with extractive QA (RoBERTa-SQuAD2), plus text-to-speech output via gTTS.",
      "Architected with a modular pipeline separating ingestion, inference, and rendering layers for maintainability.",
    ],
    tech: ["Streamlit", "HuggingFace Transformers", "Pegasus", "RoBERTa", "gTTS", "Python"],
    links: {
      github: "https://github.com/bhagatshivam/Ask-the-Doc",
      apk: null,
    },
    github: "https://github.com/bhagatshivam/Ask-the-Doc",
    screenshots: [],
    color: "#8B5CF6",
  },
];

export const projects = projectData.map((project) => ({
  ...project,
  skillIds: skills.filter((s) => s.projectIds.includes(project.id)).map((s) => s.id),
}));

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
