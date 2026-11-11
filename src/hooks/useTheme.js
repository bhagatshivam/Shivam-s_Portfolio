import { useCallback, useEffect, useSyncExternalStore } from "react";

// Day/night. The OS setting is the default; a click stores an explicit choice ("light" or
// "dark") in localStorage, which index.html applies before first paint on later visits.
const STORAGE_KEY = "theme";
const QUERY = "(prefers-color-scheme: dark)";

function readChoice() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

const listeners = new Set();
let choice = typeof window === "undefined" ? null : readChoice();

function subscribe(cb) {
  listeners.add(cb);
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}

const snapshot = () => `${choice ?? "system"}:${window.matchMedia(QUERY).matches ? "dark" : "light"}`;
const serverSnapshot = () => "system:light";

export function useTheme() {
  const state = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [chosen, system] = state.split(":");
  const theme = chosen === "system" ? system : chosen;

  useEffect(() => {
    if (chosen === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = chosen;
  }, [chosen]);

  const toggle = useCallback(() => {
    choice = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage can be blocked; the choice still holds for this visit.
    }
    listeners.forEach((cb) => cb());
  }, [theme]);

  return { theme, toggle };
}
