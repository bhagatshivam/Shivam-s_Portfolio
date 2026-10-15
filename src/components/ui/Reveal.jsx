import { useEffect, useRef, useState } from "react";
import { usePerformance } from "../../context/PerformanceContext";

// The one scroll animation on the site: a single 8px fade/slide, once, as content enters the
// viewport (see .reveal in src/index.css). CSS transition plus one IntersectionObserver per
// element, so there is no animation library. In lite mode (manual toggle or
// prefers-reduced-motion) it renders plain markup.
//
// `immediate` is for content that is already on screen at load (the hero): the same
// fade/slide runs as a CSS animation on mount, without waiting for the observer.
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", immediate = false }) {
  const { isLiteMode } = usePerformance();
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (isLiteMode || immediate || shown) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isLiteMode, immediate, shown]);

  if (isLiteMode) return <Tag className={className}>{children}</Tag>;

  const state = immediate ? "reveal-load" : `reveal${shown ? " reveal-in" : ""}`;
  return (
    <Tag
      ref={ref}
      className={`${state} ${className}`}
      style={delay ? { transitionDelay: `${delay}s`, animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
