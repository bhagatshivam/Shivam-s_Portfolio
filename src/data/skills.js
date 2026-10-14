// Every skill lists the projects that really used it (see src/data/projects.js), or none when
// it comes from the CV only. projects.js derives each project's `skillIds` from the
// `projectIds` below, so this file is the single place to edit the project <-> skill mapping.
// Rule: a skill appears only if a listed project used it or the CV names it. No levels.
//
// cv: true  = on the CV but not tied to a project listed here (shown with a dashed outline).
// Logos live in skillIconPaths.js (generated); a skill without one gets a monogram.

export const clusterOrder = ["languages", "frontend", "backend", "ai", "devops", "mobile"];

export const clusterLabels = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend and data",
  ai: "AI / LLM",
  devops: "DevOps and tooling",
  mobile: "Mobile",
};

export const skills = [
  // Languages
  { id: "python", label: "Python", cluster: "languages", projectIds: ["ci-pipeline-docs", "culinary-rag", "ask-the-doc"] },
  { id: "typescript", label: "TypeScript", cluster: "languages", projectIds: ["vach", "storywanderer"] },
  { id: "javascript", label: "JavaScript", cluster: "languages", projectIds: [], cv: true },

  // Frontend
  { id: "react", label: "React", cluster: "frontend", projectIds: ["vach", "storywanderer"] },
  { id: "vite", label: "Vite", cluster: "frontend", projectIds: ["vach", "storywanderer"] },
  { id: "tailwind", label: "Tailwind CSS", cluster: "frontend", projectIds: ["storywanderer"] },
  { id: "shadcn", label: "shadcn/ui", cluster: "frontend", projectIds: ["storywanderer"] },
  { id: "streamlit", label: "Streamlit", cluster: "frontend", projectIds: ["culinary-rag", "ask-the-doc"] },
  { id: "nextjs", label: "Next.js", cluster: "frontend", projectIds: [], cv: true },

  // Backend and data
  { id: "supabase", label: "Supabase", cluster: "backend", projectIds: ["storywanderer"] },
  { id: "postgresql", label: "PostgreSQL", cluster: "backend", projectIds: ["storywanderer"] },
  { id: "nodejs", label: "Node.js", cluster: "backend", projectIds: [], cv: true },
  { id: "pandas", label: "Pandas", cluster: "backend", projectIds: [], cv: true },
  { id: "numpy", label: "NumPy", cluster: "backend", projectIds: [], cv: true },

  // AI / LLM
  { id: "langgraph", label: "LangGraph", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "faiss", label: "FAISS", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "bge-large", label: "BGE-Large embeddings", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "qwen", label: "Qwen2.5", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "transformers", label: "Hugging Face Transformers", cluster: "ai", projectIds: ["ask-the-doc"] },
  { id: "gemini", label: "Gemini 2.5 Flash", cluster: "ai", projectIds: ["ci-pipeline-docs"] },
  { id: "pytorch", label: "PyTorch", cluster: "ai", projectIds: [], cv: true },
  { id: "sklearn", label: "scikit-learn", cluster: "ai", projectIds: [], cv: true },
  { id: "opencv", label: "OpenCV", cluster: "ai", projectIds: [], cv: true },

  // DevOps and tooling
  { id: "github-actions", label: "GitHub Actions", cluster: "devops", projectIds: ["ci-pipeline-docs", "vach"] },
  { id: "yaml", label: "YAML", cluster: "devops", projectIds: ["ci-pipeline-docs"] },
  { id: "mermaid", label: "Mermaid", cluster: "devops", projectIds: ["ci-pipeline-docs"] },
  { id: "golden-file-testing", label: "Golden-file testing", cluster: "devops", projectIds: ["ci-pipeline-docs"] },
  { id: "vitest", label: "Vitest", cluster: "devops", projectIds: ["vach"] },
  { id: "git", label: "Git", cluster: "devops", projectIds: [], cv: true },
  { id: "docker", label: "Docker", cluster: "devops", projectIds: [], cv: true },
  { id: "linux", label: "Linux", cluster: "devops", projectIds: [], cv: true },

  // Mobile
  { id: "capacitor", label: "Capacitor", cluster: "mobile", projectIds: ["vach"] },
  { id: "android-saf", label: "Android SAF", cluster: "mobile", projectIds: ["vach"] },
  { id: "pdfjs", label: "pdf.js", cluster: "mobile", projectIds: ["vach"] },
];
