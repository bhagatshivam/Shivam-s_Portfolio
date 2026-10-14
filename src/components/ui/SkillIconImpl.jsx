import { FileCheck } from "lucide-react";
import { skillIconPaths } from "../../data/skillIconPaths";

// Skills with no logo in simple-icons get a short monogram in the same 20px box.
const MONOGRAMS = { langgraph: "LG", faiss: "FA", "bge-large": "BGE", qwen: "Q", pdfjs: "PDF" };

export default function SkillIconImpl({ id }) {
  const path = skillIconPaths[id];
  if (path) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d={path} />
      </svg>
    );
  }
  if (id === "golden-file-testing") return <FileCheck size={20} aria-hidden="true" className="shrink-0" />;
  const text = MONOGRAMS[id] ?? "";
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-current font-mono text-[8px] font-bold leading-none"
    >
      {text}
    </span>
  );
}
