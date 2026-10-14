import { Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { usePerformance } from "../../context/PerformanceContext";

export default function PerformanceToggle() {
  const { isLiteMode, toggleLiteMode, isSystemDefault } = usePerformance();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
      onClick={toggleLiteMode}
      aria-label={isLiteMode ? "Switch to full experience" : "Switch to lite mode"}
      title={
        isLiteMode
          ? isSystemDefault
            ? "Lite mode (your system prefers reduced motion). Click for full experience"
            : "Full experience"
          : "Lite mode"
      }
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center border border-border bg-surface hover:border-accent-blue transition-all duration-300 group"
      style={{
        boxShadow: isLiteMode ? "none" : "0 0 12px rgba(79,142,247,0.3)",
      }}
    >
      {isLiteMode ? (
        <Eye size={16} className="text-text-secondary group-hover:text-accent-blue transition-colors duration-200" />
      ) : (
        <Zap size={16} className="text-accent-blue" />
      )}
    </motion.button>
  );
}