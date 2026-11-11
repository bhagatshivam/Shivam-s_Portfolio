import { usePerformance } from "../../context/PerformanceContext";

// The site has one page-load sequence (the hero) and no scroll-triggered animation: sections
// render in place, so a reader scrolling fast or a crawler never meets a blank section.
// `immediate` runs the short rise animation on mount for content already on screen at load.
// Lite mode (manual toggle or prefers-reduced-motion) renders plain markup.
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", immediate = false }) {
  const { isLiteMode } = usePerformance();
  if (isLiteMode || !immediate) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={`reveal-load ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  );
}
