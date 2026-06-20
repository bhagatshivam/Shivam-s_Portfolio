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

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const skills = [
  // AI/ML cluster — purple
  { id: "pytorch", label: "PyTorch", cluster: "ai", icon: `${DEVICON}/pytorch/pytorch-original.svg` },
  { id: "sklearn", label: "scikit-learn", cluster: "ai", icon: `${DEVICON}/scikitlearn/scikitlearn-original.svg` },
  { id: "pandas", label: "Pandas", cluster: "ai", icon: `${DEVICON}/pandas/pandas-original.svg` },
  { id: "opencv", label: "OpenCV", cluster: "ai", icon: `${DEVICON}/opencv/opencv-original.svg` },
  { id: "numpy", label: "NumPy", cluster: "ai", icon: `${DEVICON}/numpy/numpy-original.svg` },
  { id: "langgraph", label: "LangGraph", cluster: "ai", icon: null, emoji: "🦜" },
  { id: "faiss", label: "FAISS", cluster: "ai", icon: null, emoji: "🔎" },
  // Web cluster — blue
  { id: "react", label: "React", cluster: "web", icon: `${DEVICON}/react/react-original.svg` },
  { id: "typescript", label: "TypeScript", cluster: "web", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { id: "javascript", label: "JavaScript", cluster: "web", icon: `${DEVICON}/javascript/javascript-original.svg` },
  { id: "nextjs", label: "Next.js", cluster: "web", icon: `${DEVICON}/nextjs/nextjs-original.svg` },
  { id: "nodejs", label: "Node.js", cluster: "web", icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { id: "tailwind", label: "Tailwind CSS", cluster: "web", icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { id: "postgresql", label: "PostgreSQL", cluster: "web", icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  // Tools cluster — green
  { id: "python", label: "Python", cluster: "tools", icon: `${DEVICON}/python/python-original.svg` },
  { id: "git", label: "Git", cluster: "tools", icon: `${DEVICON}/git/git-original.svg` },
  { id: "github", label: "GitHub", cluster: "tools", icon: `${DEVICON}/github/github-original.svg` },
  { id: "docker", label: "Docker", cluster: "tools", icon: `${DEVICON}/docker/docker-original.svg` },
  { id: "linux", label: "Linux", cluster: "tools", icon: `${DEVICON}/linux/linux-original.svg` },
  { id: "vscode", label: "VS Code", cluster: "tools", icon: `${DEVICON}/vscode/vscode-original.svg` },
];
