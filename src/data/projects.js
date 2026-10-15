import { skills } from "./skills";

// Five projects, one story: developer tooling, a shipped Android app, full-stack, applied AI.
// Source of truth for wording: SITE_REBUILD_PLAN.md §3 and the CV. Numbers trace to §9.
//
// Shape:
//   id / slug     stable string id, used by skills.js `projectIds`
//   shortTitle    short name for tight spots (skills section, chips)
//   caseStudy     slug for /projects/:slug, or null when there is no case-study page
//   featured      true = large card on the home page, false = compact card
//   status        "complete" | "in-progress" (drives the status chip colour)
//   statusLabel   optional text that replaces the default chip text
//   tagline       one short line for the home page cards (two lines at most)
//   summary       longer card copy (meta descriptions, fallbacks)
//   visual        branded card visual when there is no screenshot: kicker, facts, motif, accent
//   description   full blurb (case-study pages)
//   media         card image fallback: variant "phone" | "panel" + architecture words;
//                 real images go in `screenshots` as { src, alt, caption } under public/projects/<id>/
//   year          only where the plan gives one; do not add years that do not trace to it
//   highlights    longer bullets (CV wording) for compact cards and case studies
//   tech          chips shown on the card, exactly as in the source
//   skillIds      DERIVED from skills.js `projectIds`, do not edit here
//   links         github / live / apk (live and apk stay null until real; apk until a signed release is confirmed)
//   github        kept for the existing ProjectCard; same value as links.github

const projectData = [
  {
    id: "ci-pipeline-docs",
    shortTitle: "CI Pipeline Docs",
    caseStudy: "ci-pipeline-docs",
    featured: true,
    title: "What Is My CI Pipeline Doing?",
    context: "MSc dissertation",
    status: "complete",
    year: "2026",
    description:
      "Generates documentation for GitHub Actions pipelines automatically. A parser turns workflow YAML into a platform-agnostic intermediate representation; deterministic generators render Markdown and Mermaid; an optional LLM layer only rewrites already-extracted, validated facts and never sees the YAML. Captured 95.5% of 201 pre-registered facts across 10 held-out pipelines, against 53.2% for a naive raw-YAML-to-LLM baseline.",
    tagline: "Documents GitHub Actions pipelines. 95.5% of 201 facts captured.",
    visual: {
      accent: "#4F8EF7",
      motif: "pipeline",
      kicker: "MSc dissertation",
      facts: ["95.5% of 201 facts captured", "53.2% for a naive LLM baseline", "10 held-out pipelines"],
    },
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
    shortTitle: "Vach",
    caseStudy: "vach",
    featured: true,
    title: "Vach: offline PDF & EPUB reader for Android",
    status: "complete",
    statusLabel: "IN DAILY USE · V1 · REFINING",
    year: "2026",
    description:
      "Android reader (React/TypeScript in a Capacitor native shell) for a personal offline library of EPUB and PDF novels. Pick a folder once; the app is designed to keep access across restarts and reboots through Android's Storage Access Framework. Webnovel-style continuous scroll, font/size/theme controls, per-book reading position, image-page fallback for scanned PDFs. Fully offline, no ads, no telemetry. GitHub Actions builds a debug APK on every push and a signed release APK on version tags.",
    tagline: "Offline PDF and EPUB reader for Android. No ads, no telemetry.",
    visual: {
      accent: "#06B6D4",
      motif: "phone",
      kicker: "Android app",
      facts: ["EPUB and PDF", "Fully offline", "No ads, no telemetry"],
    },
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
    // Real screenshots and an optional screen recording. Files go in public/projects/vach/.
    // Missing files never render as broken images: they are skipped, and if none load the
    // card and the case study fall back to the architecture words in `media`.
    screenshots: [
      { src: "/projects/vach/library.png", alt: "Vach library screen", caption: "Library" },
      { src: "/projects/vach/reading-sepia.png", alt: "Vach reading screen in the sepia theme", caption: "Reading: sepia" },
      { src: "/projects/vach/reading-night.png", alt: "Vach reading screen in the night theme", caption: "Reading: night" },
      { src: "/projects/vach/reading-beige.png", alt: "Vach reading screen in the beige theme", caption: "Reading: beige" },
    ],
    // Optional. Rendered only if the file exists; never autoplays.
    video: {
      src: "/projects/vach/demo.mp4",
      poster: "/projects/vach/poster.jpg",
      alt: "Screen recording of Vach on an Android phone",
    },
    color: "#06B6D4",
  },
  {
    id: "storywanderer",
    shortTitle: "StoryWanderer",
    caseStudy: "storywanderer",
    featured: true,
    title: "StoryWanderer",
    context: "No public users yet",
    status: "in-progress",
    statusLabel: "IN DEVELOPMENT",
    description: "Full-stack novel reading and writing platform built with React, TypeScript and Supabase/PostgreSQL, deployed on Vercel. In development, no public users yet.",
    tagline: "Reading and writing platform on Supabase and PostgreSQL.",
    visual: {
      accent: "#10B981",
      motif: "pages",
      kicker: "In development",
      facts: ["Supabase / PostgreSQL", "Chapter-level publishing", "Custom long-form reader"],
    },
    summary: "Reading and writing platform on Supabase and PostgreSQL. In development, no public users yet.",
    highlights: [
      "A full-stack novel-publishing platform designed and built end to end, from schema design to a Vercel deployment, with authentication, chapter-level content management and real-time data sync via Supabase/PostgreSQL.",
      "A component-driven frontend in React 18, TypeScript and shadcn/ui, including a custom long-form reading UI for serialised fiction.",
    ],
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase"],
    media: {
      variant: "browser",
      alt: "StoryWanderer screens",
    },
    // Repo stays private; only link it if it can be made public.
    // TODO(confirm): repo public or private, and the live URL (links.live) once it exists.
    links: { github: null, live: null, apk: null },
    // TODO(confirm): public or private? Until answered nothing is said about the repo (repoNote: "Private repo").
    repoNote: null,
    github: null,
    // Files go in public/projects/storywanderer/. Missing files are skipped (same pattern as Vach).
    screenshots: [
      { src: "/projects/storywanderer/home.png", alt: "StoryWanderer home page", caption: "Home" },
      { src: "/projects/storywanderer/reader.png", alt: "StoryWanderer chapter reader", caption: "Reader" },
      { src: "/projects/storywanderer/editor.png", alt: "StoryWanderer chapter editor", caption: "Editor" },
    ],
    color: "#10B981",
  },
  {
    id: "culinary-rag",
    shortTitle: "Culinary RAG",
    caseStudy: "culinary-rag",
    featured: true,
    title: "South Asian Culinary RAG Assistant",
    context: "Group project, 4 members",
    status: "complete",
    // TODO(confirm): the CV says "Owned the retrieval core". The group repo history does not show
    // that (see the authorship table in the PR), so no personal-role claim is rendered here.
    description: "Group project (4 members): a fully local RAG chatbot for South Asian recipes, using a FAISS vector store, BGE-Large embeddings and a LangGraph intent router across seven intent categories. The project's 100-query benchmark reported 92.4% Recall@3, 93% intent-classification accuracy and 88.6% generation faithfulness.",
    tagline: "Fully local RAG chatbot. 92.4% Recall@3 on a 100-query benchmark.",
    visual: {
      accent: "#8B5CF6",
      motif: "vectors",
      kicker: "Group project, 4 members",
      facts: ["92.4% Recall@3", "93% intent accuracy", "100-query benchmark"],
    },
    summary: "Group project (4 members): fully local RAG chatbot with FAISS, BGE-Large and a LangGraph intent router. 92.4% Recall@3 on a 100-query benchmark.",
    highlights: [
      "A fully local RAG chatbot: FAISS vector store, BGE-Large embeddings and a LangGraph intent-routing state machine spanning seven intent categories.",
      "The project's 100-query benchmark reported 92.4% Recall@3, 93% intent-classification accuracy and 88.6% generation faithfulness.",
      "Semantic retrieval (1024-dim embeddings, L2 thresholding) feeds LLM-powered generation, shown in a Streamlit dark-mode UI with live pipeline inspection (intent, entities, raw FAISS scores).",
    ],
    tech: ["LangGraph", "FAISS", "BGE-Large Embeddings", "Qwen2.5", "Streamlit", "Python"],
    // The code lives in a group project repository.
    repoLabel: "Group repo",
    links: {
      github: "https://github.com/bhagatshivam/South-Asian-Culinary-RAG-Assistant",
      apk: null,
    },
    github: "https://github.com/bhagatshivam/South-Asian-Culinary-RAG-Assistant",
    screenshots: [],
    color: "#8B5CF6",
  },
  {
    id: "ask-the-doc",
    shortTitle: "Ask the Doc",
    caseStudy: null,
    featured: true,
    title: "Ask the Doc",
    context: "Bachelor's final-year project",
    status: "complete",
    description: "Bachelor's final-year project. A Streamlit app: upload a PDF or enter text, get a summary (google/pegasus-xsum), ask questions about it (deepset/roberta-base-squad2), and hear the summary and answers read aloud with gTTS.",
    tagline: "Upload a PDF or enter text to get a summary, answers to your questions and audio.",
    visual: {
      accent: "#F59E0B",
      motif: "document",
      kicker: "Final-year project",
      facts: ["Pegasus summaries", "RoBERTa-SQuAD2 QA", "gTTS audio"],
    },
    summary: "Bachelor's final-year project. A Streamlit app that summarises a PDF or pasted text (Pegasus), answers questions about it (RoBERTa-SQuAD2) and reads the results aloud (gTTS).",
    highlights: [
      "Bachelor's final-year project.",
      "A Streamlit app: upload a PDF or enter text, get a Pegasus summary, ask questions answered by RoBERTa-SQuAD2, and hear both read aloud with gTTS.",
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
