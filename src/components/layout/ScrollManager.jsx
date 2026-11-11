import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { usePerformance } from "../../context/PerformanceContext";

// Scrolls to the #hash target (or the top) whenever the location changes. Keyed on
// location.key so re-clicking the same hash link scrolls again.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const { isLiteMode } = usePerformance();
  const liteRef = useRef(isLiteMode);

  useEffect(() => {
    liteRef.current = isLiteMode;
  }, [isLiteMode]);

  useEffect(() => {
    const behavior = liteRef.current ? "auto" : "smooth";
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash, key]);

  return null;
}
