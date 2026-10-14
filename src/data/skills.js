// Every chip lists the projects that really used it (see src/data/projects.js).
// projects.js derives each project's `skillIds` from the `projectIds` below, so this
// file is the single place to edit the project <-> skill mapping.

export const clusterOrder = ["languages", "ai", "web", "mobile", "devops"];

// Interim colours; the design-system chunk replaces the palette.
export const clusterColors = {
  languages: "#10B981",
  ai: "#8B5CF6",
  web: "#4F8EF7",
  mobile: "#06B6D4",
  devops: "#F59E0B",
};

export const clusterLabels = {
  languages: "Languages",
  ai: "AI / ML",
  web: "Web",
  mobile: "Mobile & tooling",
  devops: "DevOps / CI",
};

export const skills = [
  // Languages
  { id: "python", label: "Python", cluster: "languages", projectIds: ["ci-pipeline-docs", "culinary-rag", "ask-the-doc"] },
  { id: "typescript", label: "TypeScript", cluster: "languages", projectIds: ["vach", "storywanderer"] },

  // AI / ML
  { id: "langgraph", label: "LangGraph", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "faiss", label: "FAISS", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "bge-large", label: "BGE-Large embeddings", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "qwen", label: "Qwen2.5", cluster: "ai", projectIds: ["culinary-rag"] },
  { id: "transformers", label: "HuggingFace Transformers", cluster: "ai", projectIds: ["ask-the-doc"] },
  { id: "gemini", label: "Gemini 2.5 Flash", cluster: "ai", projectIds: ["ci-pipeline-docs"] },

  // Web
  { id: "react", label: "React", cluster: "web", projectIds: ["vach", "storywanderer"] },
  { id: "vite", label: "Vite", cluster: "web", projectIds: ["storywanderer"] },
  { id: "tailwind", label: "Tailwind CSS", cluster: "web", projectIds: ["storywanderer"] },
  { id: "shadcn", label: "shadcn/ui", cluster: "web", projectIds: ["storywanderer"] },
  { id: "supabase", label: "Supabase", cluster: "web", projectIds: ["storywanderer"] },
  { id: "postgresql", label: "PostgreSQL", cluster: "web", projectIds: ["storywanderer"] },
  { id: "streamlit", label: "Streamlit", cluster: "web", projectIds: ["culinary-rag", "ask-the-doc"] },

  // Mobile and tooling
  { id: "capacitor", label: "Capacitor", cluster: "mobile", projectIds: ["vach"] },
  { id: "android-saf", label: "Android SAF", cluster: "mobile", projectIds: ["vach"] },
  { id: "pdfjs", label: "pdf.js", cluster: "mobile", projectIds: ["vach"] },
  { id: "vitest", label: "Vitest", cluster: "mobile", projectIds: ["vach"] },
  { id: "mermaid", label: "Mermaid", cluster: "mobile", projectIds: ["ci-pipeline-docs"] },
  { id: "golden-file-testing", label: "Golden-file testing", cluster: "mobile", projectIds: ["ci-pipeline-docs"] },

  // DevOps / CI
  { id: "github-actions", label: "GitHub Actions", cluster: "devops", projectIds: ["ci-pipeline-docs", "vach"] },
  { id: "yaml", label: "YAML", cluster: "devops", projectIds: ["ci-pipeline-docs"] },
];

// Chips from the old site that no remaining project uses. They are not rendered: a chip
// with no project behind it breaks the "every chip links to a project" rule.
// TODO(confirm): if any of these are in the CV skills section, give them a real project
// (or decide to show an unlinked group) before the design chunk.
export const parkedSkills = [
  { id: "pytorch", label: "PyTorch", cluster: "ai" },
  { id: "sklearn", label: "scikit-learn", cluster: "ai" },
  { id: "pandas", label: "Pandas", cluster: "ai" },
  { id: "numpy", label: "NumPy", cluster: "ai" },
  { id: "opencv", label: "OpenCV", cluster: "ai" },
  { id: "javascript", label: "JavaScript", cluster: "languages" },
  { id: "nextjs", label: "Next.js", cluster: "web" },
  { id: "nodejs", label: "Node.js", cluster: "web" },
  { id: "git", label: "Git", cluster: "devops" },
  { id: "docker", label: "Docker", cluster: "devops" },
  { id: "linux", label: "Linux", cluster: "devops" },
];
