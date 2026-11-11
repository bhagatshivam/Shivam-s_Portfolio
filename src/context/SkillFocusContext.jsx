import { createContext, useContext, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";

const SkillFocusContext = createContext();

const EMPTY = { skillIds: [], projectIds: [], label: null };

export function SkillFocusProvider({ children }) {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(EMPTY);
  const clearTimerRef = useRef(null);

  const cancelTimer = () => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = null;
  };

  const clearFocus = useCallback(() => {
    cancelTimer();
    setFocus(EMPTY);
  }, []);

  // Project -> skills: highlight that project's skills and go to the Skills section.
  // Works from any route: navigating to "/#skills" lets ScrollManager do the scroll once
  // the home page is mounted.
  const jumpToSkills = useCallback(
    (skillIds, projectTitle) => {
      cancelTimer();
      setFocus({ skillIds, projectIds: [], label: `Used in ${projectTitle}` });
      navigate({ pathname: "/", hash: "#skills" });

      // The highlight fades after a few seconds so it doesn't stay stuck.
      clearTimerRef.current = setTimeout(() => setFocus(EMPTY), 4000);
    },
    [navigate]
  );

  // Skill -> projects: select a chip to highlight the projects that used it. Selecting the
  // same chip again clears it. No timer: the reader is in control.
  const toggleSkill = useCallback((skill) => {
    cancelTimer();
    setFocus((prev) =>
      prev.skillIds.length === 1 && prev.skillIds[0] === skill.id && prev.projectIds.length
        ? EMPTY
        : { skillIds: [skill.id], projectIds: skill.projectIds, label: skill.label }
    );
  }, []);

  return (
    <SkillFocusContext.Provider
      value={{
        focusedSkillIds: focus.skillIds,
        focusedProjectIds: focus.projectIds,
        focusLabel: focus.label,
        jumpToSkills,
        toggleSkill,
        clearFocus,
      }}
    >
      {children}
    </SkillFocusContext.Provider>
  );
}

export function useSkillFocus() {
  return useContext(SkillFocusContext);
}
