import { useEffect, useState } from "react";

// Which of the page sections is under the reading line (a band across the upper-middle of
// the viewport). Returns the section id, or null above the first section. Pass enabled=false
// off the home page.
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) return undefined;
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const inView = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        // Several sections can touch the band at once: the lowest one in the page wins.
        const current = elements.filter((el) => inView.has(el.id)).pop();
        setActive(current ? current.id : null);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}
