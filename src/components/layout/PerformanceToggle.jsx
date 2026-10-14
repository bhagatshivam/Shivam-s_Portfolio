import { Zap, Eye } from "lucide-react";
import { usePerformance } from "../../context/PerformanceContext";

export default function PerformanceToggle() {
  const { isLiteMode, toggleLiteMode, isSystemDefault } = usePerformance();

  const title = isLiteMode
    ? isSystemDefault
      ? "Lite mode is on because your system prefers reduced motion. Click to switch to the full experience."
      : "Lite mode is on. Click to switch to the full experience."
    : "Switch to lite mode (no animation).";

  return (
    <button
      type="button"
      onClick={toggleLiteMode}
      aria-pressed={isLiteMode}
      aria-label="Lite mode"
      title={title}
      className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-text-secondary hover:border-accent hover:text-text-primary"
    >
      {isLiteMode ? <Eye size={16} aria-hidden="true" /> : <Zap size={16} aria-hidden="true" />}
    </button>
  );
}
