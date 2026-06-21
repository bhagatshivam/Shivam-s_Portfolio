import { createContext, useContext, useState, useRef } from "react";

const SkillFocusContext = createContext();

export function SkillFocusProvider({ children }) {
  const [focusedSkillIds, setFocusedSkillIds] = useState([]);
  const [sourceProject, setSourceProject] = useState(null);
  const clearTimerRef = useRef(null);

  const jumpToSkills = (skillIds, projectTitle) => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);

    setFocusedSkillIds(skillIds);
    setSourceProject(projectTitle);

    const skillsSection = document.querySelector("#skills");
    skillsSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Auto-clear the highlight after a few seconds so it doesn't stay stuck forever
    clearTimerRef.current = setTimeout(() => {
      setFocusedSkillIds([]);
      setSourceProject(null);
    }, 4000);
  };

  return (
    <SkillFocusContext.Provider value={{ focusedSkillIds, sourceProject, jumpToSkills }}>
      {children}
    </SkillFocusContext.Provider>
  );
}

export function useSkillFocus() {
  return useContext(SkillFocusContext);
}
