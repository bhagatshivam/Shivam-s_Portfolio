export const skills = [
  // AI/ML cluster — purple
  { id: "pytorch", label: "PyTorch", cluster: "ai", size: 52 },
  { id: "langgraph", label: "LangGraph", cluster: "ai", size: 44 },
  { id: "sklearn", label: "scikit-learn", cluster: "ai", size: 40 },
  { id: "pandas", label: "Pandas", cluster: "ai", size: 38 },
  { id: "opencv", label: "OpenCV", cluster: "ai", size: 36 },
  { id: "faiss", label: "FAISS", cluster: "ai", size: 34 },
  // Web cluster — blue
  { id: "react", label: "React", cluster: "web", size: 52 },
  { id: "typescript", label: "TypeScript", cluster: "web", size: 46 },
  { id: "nextjs", label: "Next.js", cluster: "web", size: 44 },
  { id: "nodejs", label: "Node.js", cluster: "web", size: 40 },
  { id: "supabase", label: "Supabase", cluster: "web", size: 36 },
  // Tools cluster — green
  { id: "python", label: "Python", cluster: "tools", size: 54 },
  { id: "git", label: "Git", cluster: "tools", size: 42 },
  { id: "linux", label: "Linux", cluster: "tools", size: 38 },
  { id: "docker", label: "Docker", cluster: "tools", size: 36 },
  { id: "cicd", label: "CI/CD", cluster: "tools", size: 34 },
];

export const clusterColors = {
  ai: "#8B5CF6",
  web: "#4F8EF7",
  tools: "#10B981",
};

export const clusterLabels = {
  ai: "AI / ML",
  web: "Web & Frontend",
  tools: "Languages & Tools",
};
