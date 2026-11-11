import { skills } from "./skills";

// Source of truth for wording: the November 2026 CVs. Numbers trace to the repositories and
// the dissertation evaluation tables.
//
// Shape:
//   id / slug     stable string id, used by skills.js `projectIds`
//   shortTitle    short name for tight spots (skills section, chips)
//   caseStudy     slug for /projects/:slug, or null when there is no case-study page
//   featured      true = full feature row on the home page; false = compact "also built" card
//   status        "complete" | "in-progress" (drives the status chip colour)
//   statusLabel   optional text that replaces the default chip text
//   tagline       one short line for the home page
//   plain         one sentence a non-technical reader gets (the CV's "summary" line)
//   points        two or three short proof bullets for the feature row
//   visual        branded visual when there is no screenshot: kicker, facts, motif, accent
//   description   full blurb (case-study pages, meta descriptions)
//   media         screenshot frame variant; real images go in `screenshots` under public/projects/<id>/
//   tech          chips shown on the card
//   skillIds      DERIVED from skills.js `projectIds`, do not edit here
//   links         github / live / apk (null until real)

const projectData = [
  {
    id: "ci-pipeline-docs",
    shortTitle: "CI Pipeline Docs",
    caseStudy: "ci-pipeline-docs",
    featured: true,
    title: "What Is My CI Pipeline Doing?",
    context: "MSc dissertation, solo build",
    status: "complete",
    year: "2026",
    plain:
      "A command-line tool that reads a project's GitHub Actions workflows and writes accurate, readable documentation, so pipeline docs stop going stale.",
    description:
      "Reads GitHub Actions workflow files and generates documentation automatically: a parser turns the YAML into a typed intermediate representation, twelve validation checks halt on bad input, deterministic generators render Markdown and a Mermaid job diagram, and an optional LLM layer only rewrites already-extracted, validated facts and never sees the YAML. In a pre-registered evaluation it captured 95.5% of 201 facts across 10 held-out real workflows with zero false statements, against 53.2% for the same LLM handed the raw YAML.",
    tagline: "Documents GitHub Actions pipelines. 95.5% of 201 facts captured, zero false statements.",
    points: [
      "Parser, typed model, 12-check validation gate, deterministic generators, optional LLM rewrite that can only rephrase verified facts.",
      "439 automated tests across 38 modules, golden-file regression on every CI run, and a public LIMITATIONS file.",
      "Pre-registered evaluation: 201 facts written down before any output existed, scored against a naive-LLM baseline.",
    ],
    visual: {
      accent: "#1F3FD6",
      motif: "pipeline",
      kicker: "MSc dissertation",
      facts: ["95.5% of 201 facts captured", "0 false statements", "439 tests in CI"],
    },
    summary:
      "Generates documentation for GitHub Actions pipelines automatically. Captured 95.5% of 201 pre-registered facts across 10 held-out pipelines with zero false statements, against 53.2% for a naive raw-YAML-to-LLM baseline.",
    media: {
      variant: "panel",
      architecture: ["Workflow YAML", "Intermediate representation", "Markdown + Mermaid"],
      alt: "What Is My CI Pipeline Doing? example output",
    },
    highlights: [],
    tech: ["Python", "GitHub Actions", "YAML", "Mermaid", "Gemini 2.5 Flash", "pytest"],
    links: {
      github: "https://github.com/bhagatshivam/what-is-my-pipeline-doing",
      live: null,
      apk: null,
    },
    github: "https://github.com/bhagatshivam/what-is-my-pipeline-doing",
    screenshots: [],
    color: "#1F3FD6",
  },
  {
    id: "vach",
    shortTitle: "Vach",
    caseStudy: "vach",
    featured: true,
    title: "Vach: offline PDF & EPUB reader for Android",
    context: "Personal product, solo build",
    status: "complete",
    year: "2026",
    plain:
      "An Android reading app for people with a folder of ebooks on their phone. Pick the folder once and every PDF and EPUB inside opens in one smooth continuous scroll, with adjustable fonts and day/night themes. Fully offline, no ads, no accounts, no tracking.",
    description:
      "Android reader (React/TypeScript in a Capacitor native shell) for a personal offline library of EPUB and PDF novels. A custom Kotlin plugin uses Android's Storage Access Framework so folder permission persists across restarts and reboots instead of asking every time. Webnovel-style continuous scroll, font/size/theme controls, per-book reading position, image-page fallback for scanned PDFs, password-protected PDFs. GitHub Actions builds a debug APK on every push and a signed release on version tags.",
    tagline: "Offline PDF and EPUB reader for Android. No ads, no accounts, no telemetry.",
    points: [
      "Hybrid architecture: React/TypeScript UI in a Capacitor shell plus a Kotlin plugin I wrote for persistent folder access.",
      "Document pipeline: EPUB parsing with HTML sanitisation, PDF text reflow with pdf.js, scanned-page fallback, per-book reading position.",
      "CI builds a debug APK on every push and a signed release on tags; 10 Vitest suites; verified on a physical device.",
    ],
    visual: {
      accent: "#0E7C86",
      motif: "phone",
      kicker: "Android app",
      facts: ["EPUB and PDF", "Fully offline", "No ads, no telemetry"],
    },
    summary:
      "Android reader (React/TypeScript in a Capacitor native shell, with a custom Kotlin plugin) for a personal offline library of EPUB and PDF novels. Fully offline, no ads, no telemetry.",
    media: {
      variant: "phone",
      architecture: ["React/TypeScript", "Capacitor native shell", "Kotlin plugin"],
      alt: "Vach reading screen",
    },
    highlights: [],
    roadmap: "Next: embedded images in text PDFs, per-book settings, in-book search.",
    tech: ["React", "TypeScript", "Capacitor", "Kotlin", "pdf.js", "GitHub Actions", "Vitest"],
    links: {
      github: "https://github.com/bhagatshivam/Vach",
      live: null,
      apk: null,
    },
    github: "https://github.com/bhagatshivam/Vach",
    releaseNote: "Build from source",
    // Real screenshots and an optional screen recording. Files go in public/projects/vach/.
    // Missing files never render as broken images: they are skipped, and if none load the
    // card and the case study fall back to the generated visual.
    screenshots: [
      { src: "/projects/vach/library.png", alt: "Vach library screen", caption: "Library" },
      { src: "/projects/vach/reading-sepia.png", alt: "Vach reading screen in the sepia theme", caption: "Reading: sepia" },
      { src: "/projects/vach/reading-night.png", alt: "Vach reading screen in the night theme", caption: "Reading: night" },
      { src: "/projects/vach/reading-beige.png", alt: "Vach reading screen in the beige theme", caption: "Reading: beige" },
    ],
    video: {
      src: "/projects/vach/demo.mp4",
      poster: "/projects/vach/poster.jpg",
      alt: "Screen recording of Vach on an Android phone",
    },
    color: "#0E7C86",
  },
  {
    id: "storywanderer",
    shortTitle: "StoryWanderer",
    caseStudy: "storywanderer",
    featured: true,
    title: "StoryWanderer",
    context: "Solo full-stack project, deployed beta",
    status: "in-progress",
    statusLabel: "Live, in development",
    year: "2025–2026",
    plain:
      "A website where authors publish serialised novels chapter by chapter and readers follow them, with a distraction-free long-form reading view. Think a small Royal Road. Designed, built and deployed end to end.",
    description:
      "Full-stack novel reading and publishing platform built with React, TypeScript and Supabase/PostgreSQL, deployed on Vercel. Authentication, an author dashboard, a chapter editor, scheduled chapter publishing and a custom reading interface on the front end; row-level security policies, a privacy view for comment authors and database full-text search on the back end. Live in beta and in active development.",
    tagline: "Serialised-fiction publishing platform on React, TypeScript and PostgreSQL. Live in beta.",
    points: [
      "Front end: authentication, author dashboard, chapter editor, scheduled publishing and a reader with font, width and theme controls.",
      "Back end: PostgreSQL schema on Supabase, row-level security deciding who can read and edit what, and a view that hides comment authors' private data.",
      "Search: full-text search over stories and chapters with stored tsvector columns and indexes, so discovery stays fast as content grows.",
    ],
    visual: {
      accent: "#2E7D4F",
      motif: "pages",
      kicker: "Live in beta",
      facts: ["Supabase / PostgreSQL", "Row-level security", "Full-text search"],
    },
    summary: "Serialised-fiction publishing platform on React, TypeScript and Supabase/PostgreSQL. Live in beta, in active development.",
    highlights: [
      "A full-stack novel-publishing platform designed and built end to end, from schema design to a Vercel deployment, with authentication, chapter-level content management and scheduled publishing on Supabase/PostgreSQL.",
      "A component-driven front end in React 18, TypeScript and shadcn/ui, including a custom long-form reading UI for serialised fiction.",
    ],
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL", "Vercel"],
    media: {
      variant: "browser",
      alt: "StoryWanderer screens",
    },
    // The repository is private; the site is public.
    links: { github: null, live: "https://www.storywanderer.com", apk: null },
    repoNote: "Private repo",
    github: null,
    screenshots: [
      { src: "/projects/storywanderer/novel.png", alt: "StoryWanderer novel page: cover, tags, chapter list and reading progress", caption: "Novel page" },
      { src: "/projects/storywanderer/reader.png", alt: "StoryWanderer chapter reader with author's note and reading controls", caption: "Reader" },
      { src: "/projects/storywanderer/characters.png", alt: "StoryWanderer characters page with voting", caption: "Characters" },
    ],
    color: "#2E7D4F",
  },
  {
    id: "culinary-rag",
    shortTitle: "Culinary RAG",
    caseStudy: "culinary-rag",
    featured: true,
    title: "South Asian Culinary RAG Assistant",
    context: "MSc team project (4), owned retrieval",
    status: "complete",
    year: "2025–2026",
    plain:
      "A fully local question-answering assistant for South Asian recipes. It finds the right recipe passages first, then has an open-source LLM answer from them, so answers are grounded instead of made up.",
    description:
      "Group project (4 members): a fully local RAG chatbot for South Asian recipes. I owned the retrieval core: document chunking, BGE-Large embeddings (1024-d), a FAISS vector index with distance thresholding, and the 100-query evaluation set, plus the LangGraph state-machine router that classifies each query into one of seven intents. The team wired in Qwen2.5 generation and a Streamlit UI showing retrieved chunks and scores. On the 100-query benchmark: 92.4% Recall@3, 93% intent-classification accuracy and 88.6% generation faithfulness.",
    tagline: "Fully local RAG chatbot. 92.4% Recall@3 on a 100-query benchmark. I owned retrieval.",
    points: [
      "Owned the retrieval core: chunking, BGE-Large embeddings, a FAISS index with distance thresholding, and the 100-query evaluation set.",
      "Built the LangGraph router that classifies each query into one of seven intents and sends it down the right path.",
      "Results: 92.4% Recall@3, 93% intent accuracy, 88.6% generation faithfulness.",
    ],
    visual: {
      accent: "#6D3FC6",
      motif: "vectors",
      kicker: "Team project, 4 members",
      facts: ["92.4% Recall@3", "93% intent accuracy", "100-query benchmark"],
    },
    summary: "Team project (4 members): fully local RAG chatbot with FAISS, BGE-Large and a LangGraph intent router. I owned retrieval. 92.4% Recall@3 on a 100-query benchmark.",
    highlights: [
      "A fully local RAG chatbot: FAISS vector store, BGE-Large embeddings and a LangGraph intent-routing state machine spanning seven intent categories.",
      "The project's 100-query benchmark reported 92.4% Recall@3, 93% intent-classification accuracy and 88.6% generation faithfulness.",
    ],
    tech: ["LangGraph", "FAISS", "BGE-Large embeddings", "Qwen2.5", "Streamlit", "Python"],
    repoLabel: "Group repo",
    links: {
      github: "https://github.com/bhagatshivam/South-Asian-Culinary-RAG-Assistant",
      live: null,
      apk: null,
    },
    github: "https://github.com/bhagatshivam/South-Asian-Culinary-RAG-Assistant",
    screenshots: [],
    color: "#6D3FC6",
  },
  {
    id: "ask-the-doc",
    shortTitle: "Ask the Doc",
    caseStudy: null,
    featured: false,
    title: "Ask the Doc",
    context: "B.E. final-year project",
    status: "complete",
    year: "2024–2025",
    plain: "Upload a PDF or paste text, get a summary, ask questions about it, and hear the answers read aloud.",
    description:
      "Bachelor's final-year project. A Streamlit app: upload a PDF or enter text, get a summary (google/pegasus-xsum), ask questions about it (deepset/roberta-base-squad2), and hear the summary and answers read aloud with gTTS. Ingestion, inference and UI are separate modules.",
    tagline: "Summarise a document, ask it questions, hear the answers.",
    points: [],
    visual: {
      accent: "#B8641B",
      motif: "document",
      kicker: "Final-year project",
      facts: ["Pegasus summaries", "RoBERTa-SQuAD2 QA", "gTTS audio"],
    },
    summary: "Bachelor's final-year project. A Streamlit app that summarises a PDF or pasted text (Pegasus), answers questions about it (RoBERTa-SQuAD2) and reads the results aloud (gTTS).",
    highlights: [],
    tech: ["Python", "Hugging Face Transformers", "Pegasus", "RoBERTa", "gTTS", "Streamlit"],
    links: {
      github: "https://github.com/bhagatshivam/Ask-the-Doc",
      live: null,
      apk: null,
    },
    github: "https://github.com/bhagatshivam/Ask-the-Doc",
    screenshots: [],
    color: "#B8641B",
  },
  {
    id: "cnn-classifier",
    shortTitle: "Constrained CNN",
    caseStudy: null,
    featured: false,
    title: "Constrained CNN image classifier",
    context: "MSc coursework",
    status: "complete",
    year: "2025",
    plain: "A two-block CNN designed under a 100K-parameter budget, with an ablation across four configurations to justify every choice.",
    description:
      "Designed a two-block CNN under a 100K-parameter budget: 91.72% test accuracy on Fashion-MNIST with 50,378 parameters, trained inside a network-isolated Docker container, with an ablation across four configurations.",
    tagline: "91.72% on Fashion-MNIST with 50,378 parameters.",
    points: [],
    visual: {
      accent: "#B03A5B",
      motif: "grid",
      kicker: "MSc coursework",
      facts: ["91.72% test accuracy", "50,378 parameters", "Docker, network-isolated"],
    },
    summary: "Two-block CNN under a 100K-parameter budget: 91.72% on Fashion-MNIST with 50,378 parameters, trained in a network-isolated Docker container.",
    highlights: [],
    tech: ["PyTorch", "Docker", "NumPy"],
    links: { github: null, live: null, apk: null },
    github: null,
    screenshots: [],
    color: "#B03A5B",
  },
  {
    id: "drowsiness-detection",
    shortTitle: "Drowsiness detection",
    caseStudy: null,
    featured: false,
    title: "Real-time driver drowsiness detection",
    context: "B.E. project",
    status: "complete",
    year: "2024",
    plain: "A custom YOLOv5 model that watches a webcam feed and flags drowsy eye states, with debounce logic to suppress false alarms.",
    description:
      "Trained a custom YOLOv5 model to classify awake/drowsy eye states from a live webcam feed, with debounce logic to suppress false alarms.",
    tagline: "YOLOv5 on a live webcam feed, with debounced alerts.",
    points: [],
    visual: {
      accent: "#B8641B",
      motif: "eye",
      kicker: "B.E. project",
      facts: ["Custom YOLOv5 model", "Live webcam feed", "Debounced alerts"],
    },
    summary: "Custom YOLOv5 model classifying awake/drowsy eye states from a live webcam feed.",
    highlights: [],
    tech: ["PyTorch", "YOLOv5", "OpenCV"],
    links: {
      github: "https://github.com/bhagatshivam/Drowsiness-Detection",
      live: null,
      apk: null,
    },
    github: "https://github.com/bhagatshivam/Drowsiness-Detection",
    screenshots: [],
    color: "#B8641B",
  },
];

export const projects = projectData.map((project) => ({
  ...project,
  skillIds: skills.filter((s) => s.projectIds.includes(project.id)).map((s) => s.id),
}));

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
