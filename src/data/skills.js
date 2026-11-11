// Every skill lists the projects that really used it (see src/data/projects.js), or none when
// it comes from the CV only. projects.js derives each project's `skillIds` from the
// `projectIds` below, so this file is the single place to edit the project <-> skill mapping.
// Rule: a skill appears only if a listed project used it or the November 2026 CVs name it.
//
// cv: true  = on the CV but not tied to a project listed here (shown with a dashed outline).
// Logos live in skillIconPaths.js (generated); a skill without one gets a monogram.

export const clusterOrder = ["languages", "frontend", "backend", "ai", "testing", "mobile"];

export const clusterLabels = {
  languages: "Languages",
  frontend: "Front end",
  backend: "Back end and data",
  ai: "AI and machine learning",
  testing: "Testing and delivery",
  mobile: "Mobile",
};

export const skills = [
  // Languages
  { id: "python", label: "Python", cluster: "languages", projectIds: ["ci-pipeline-docs", "culinary-rag", "ask-the-doc", "cnn-classifier", "drowsiness-detection"] },
  { id: "typescript", label: "TypeScript", cluster: "languages", projectIds: ["vach", "storywanderer"] },
  { id: "javascript", label: "JavaScript", cluster: "languages", projectIds: ["vach", "storywanderer"] },
  { id: "sql", label: "SQL", cluster: "languages", projectIds: ["storywanderer"] },
  { id: "kotlin", label: "Kotlin", cluster: "languages", projectIds: ["vach"] },
  { id: "cpp", label: "C++", cluster: "languages", projectIds: [], cv: true },

  // Front end
  { id: "react", label: "React", cluster: "frontend", projectIds: ["vach", "storywanderer"] },
  { id: "vite", label: "Vite", cluster: "frontend", projectIds: ["vach", "storywanderer"] },
  { id: "tailwind", label: "Tailwind CSS", cluster: "frontend", projectIds: ["storywanderer"] },
  { id: "shadcn", label: "shadcn/ui", cluster: "frontend", projectIds: ["storywanderer"] },
  { id: "streamlit", label: "Streamlit", cluster: "frontend", projectIds: ["culinary-rag", "ask-the-doc"] },
  { id: "html5", label: "HTML and CSS", cluster: "frontend", projectIds: ["storywanderer"] },

  // Back end and data
  { id: "supabase", label: "Supabase", cluster: "backend", projectIds: ["storywanderer"] },
  { id: "postgresql", label: "PostgreSQL", cluster: "backend", projectIds: ["storywanderer"] },
  { id: "rls", label: "Row-level security", cluster: "backend", projectIds: ["storywanderer"] },
  { id: "fulltext", label: "Full-text search", cluster: "backend", projectIds: ["storywanderer"] },
  { id: "rest-apis", label: "REST APIs", cluster: "backend", projectIds: [], cv: true },
  { id: "nodejs", label: "Node.js", cluster: "backend", projectIds: [], cv: true },
  { id: "pandas", label: "Pandas", cluster: "backend", projectIds: [], cv: true },
  { id: "numpy", label: "NumPy", cluster: "backend", projectIds: ["cnn-classifier"] },

  // AI and machine learning
  { id: "rag", label: "Retrieval-augmented generation", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "langgraph", label: "LangGraph", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "faiss", label: "FAISS", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "bge-large", label: "BGE-Large embeddings", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "qwen", label: "Qwen2.5", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "transformers", label: "Hugging Face Transformers", cluster: "ai", projectIds: ["ask-the-doc"] },
  { id: "gemini", label: "Gemini API", cluster: "ai", projectIds: ["ci-pipeline-docs"] },
  { id: "llm-eval", label: "LLM evaluation design", cluster: "ai", projectIds: ["ci-pipeline-docs", "culinary-rag"] },
  { id: "pytorch", label: "PyTorch", cluster: "ai", projectIds: ["cnn-classifier", "drowsiness-detection"] },
  { id: "yolo", label: "YOLOv5", cluster: "ai", projectIds: ["drowsiness-detection"] },
  { id: "opencv", label: "OpenCV", cluster: "ai", projectIds: ["drowsiness-detection"] },
  { id: "sklearn", label: "scikit-learn", cluster: "ai", projectIds: [], cv: true },

  // Testing and delivery
  { id: "pytest", label: "pytest", cluster: "testing", projectIds: ["ci-pipeline-docs"] },
  { id: "vitest", label: "Vitest", cluster: "testing", projectIds: ["vach"] },
  { id: "golden-file-testing", label: "Golden-file regression", cluster: "testing", projectIds: ["ci-pipeline-docs"] },
  { id: "github-actions", label: "GitHub Actions", cluster: "testing", projectIds: ["ci-pipeline-docs", "vach", "storywanderer"] },
  { id: "docker", label: "Docker", cluster: "testing", projectIds: ["cnn-classifier"] },
  { id: "git", label: "Git and GitHub", cluster: "testing", projectIds: ["ci-pipeline-docs", "vach", "storywanderer", "culinary-rag"] },
  { id: "vercel", label: "Vercel", cluster: "testing", projectIds: ["storywanderer"] },
  { id: "yaml", label: "YAML", cluster: "testing", projectIds: ["ci-pipeline-docs"] },
  { id: "mermaid", label: "Mermaid", cluster: "testing", projectIds: ["ci-pipeline-docs"] },
  { id: "linux", label: "Linux", cluster: "testing", projectIds: [], cv: true },
  { id: "playwright", label: "Playwright", cluster: "testing", projectIds: [], cv: true },
  { id: "claude-code", label: "AI-assisted development", cluster: "testing", projectIds: ["vach", "ci-pipeline-docs"] },

  // Mobile
  { id: "capacitor", label: "Capacitor", cluster: "mobile", projectIds: ["vach"] },
  { id: "android-saf", label: "Android Storage Access Framework", cluster: "mobile", projectIds: ["vach"] },
  { id: "pdfjs", label: "pdf.js", cluster: "mobile", projectIds: ["vach"] },
];
