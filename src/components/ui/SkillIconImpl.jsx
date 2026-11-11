import { FileCheck, Network, Search, Shield, Ruler, Layers, Theater } from "lucide-react";
import { skillIconPaths } from "../../data/skillIconPaths";

// Skills with no brand logo in simple-icons: a plain interface icon where one fits, otherwise
// a short monogram in the same 20px box.
const GLYPHS = {
  "golden-file-testing": FileCheck,
  "rest-apis": Network,
  fulltext: Search,
  rls: Shield,
  "llm-eval": Ruler,
  rag: Layers,
  playwright: Theater,
};

const MONOGRAMS = { langgraph: "LG", faiss: "FA", "bge-large": "BGE", qwen: "Q", pdfjs: "PDF", sql: "SQL" };

export default function SkillIconImpl({ id }) {
  const path = skillIconPaths[id];
  if (path) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d={path} />
      </svg>
    );
  }
  const Glyph = GLYPHS[id];
  if (Glyph) return <Glyph size={18} aria-hidden="true" className="shrink-0" />;
  const text = MONOGRAMS[id] ?? "";
  return (
    <span
      aria-hidden="true"
      className="flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-current px-0.5 font-mono text-[8px] font-bold leading-none"
    >
      {text}
    </span>
  );
}
