import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, Mountain, Sparkles } from "lucide-react";

const iconMap = {
  BookOpen: BookOpen,
  Mountain: Mountain,
  Sparkles: Sparkles,
};

export default function InterestCard({ interest, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = iconMap[interest.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl border border-border bg-surface overflow-hidden p-6 flex flex-col"
      style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
    >
      {/* Gradient backdrop, brightens on hover */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${interest.color}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 border"
          style={{
            borderColor: `${interest.color}50`,
            backgroundColor: `${interest.color}15`,
            boxShadow: `0 0 16px ${interest.color}30`,
          }}
        >
          <Icon size={22} style={{ color: interest.color }} />
        </div>

        <h3 className="font-display text-lg text-text-primary mb-2">{interest.title}</h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
          {interest.blurb}
        </p>

        <p
          className="font-display text-xs tracking-wide pt-3 border-t border-border"
          style={{ color: interest.color }}
        >
          {interest.favorite}
        </p>
      </div>
    </motion.div>
  );
}
