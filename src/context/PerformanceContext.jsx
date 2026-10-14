import { createContext, useContext, useState, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const PerformanceContext = createContext();

const STORAGE_KEY = "liteMode";

// null = the reader has never used the toggle, so the OS setting decides.
function readStoredChoice() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? null : JSON.parse(saved) === true;
  } catch {
    return null;
  }
}

export function PerformanceProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const [manualChoice, setManualChoice] = useState(readStoredChoice);

  // Lite mode is on when prefers-reduced-motion is set, unless the reader has used the
  // toggle: an explicit choice always wins over the system setting.
  const isLiteMode = manualChoice ?? prefersReducedMotion;

  const toggleLiteMode = () => {
    const next = !isLiteMode;
    setManualChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked (private windows); the choice still holds for this visit.
    }
  };

  // Lets CSS switch off transitions and animations in one place.
  useEffect(() => {
    document.documentElement.dataset.lite = String(isLiteMode);
  }, [isLiteMode]);

  return (
    <PerformanceContext.Provider
      value={{
        isLiteMode,
        toggleLiteMode,
        prefersReducedMotion,
        isSystemDefault: manualChoice === null,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
