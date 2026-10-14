import { motion } from "framer-motion";
import { usePerformance } from "../../context/PerformanceContext";

// The one scroll animation on the site: a single 8px fade/slide as content enters the
// viewport. In lite mode (manual toggle or prefers-reduced-motion) it renders plain markup.
export default function Reveal({ children, delay = 0, className, as = "div" }) {
  const { isLiteMode } = usePerformance();
  const Tag = as;

  if (isLiteMode) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
