import { createContext, useContext, useState } from "react";

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
  const [isLiteMode, setIsLiteMode] = useState(() => {
    const saved = localStorage.getItem("liteMode");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleLiteMode = () => {
    setIsLiteMode((prev) => {
      const next = !prev;
      localStorage.setItem("liteMode", JSON.stringify(next));
      return next;
    });
  };

  return (
    <PerformanceContext.Provider value={{ isLiteMode, toggleLiteMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}