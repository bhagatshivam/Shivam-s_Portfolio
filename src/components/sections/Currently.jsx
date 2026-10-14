import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TerminalText from "../ui/TerminalText";
import { site } from "../../data/site";

const lines = site.currentlyLines;

const focusAreas = [
  { label: "Software Engineering", color: "#4F8EF7" },
  { label: "AI / ML Engineering", color: "#8B5CF6" },
  { label: "Data Engineering", color: "#10B981" },
];

export default function Currently() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div ref={ref} className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="font-display text-xs text-accent-green tracking-widest mb-3">[ SECTION 05 ]</p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary">Right Now</h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Terminal block — left, wider */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 rounded-xl border border-border bg-surface p-6 md:p-8"
          style={{ boxShadow: "0 0 30px rgba(16,185,129,0.06)" }}
        >
          <p className="font-display text-sm text-text-primary mb-6 flex items-center gap-2">
            <span className="text-accent-green">&gt;</span> currently
            <span className="animate-pulse text-accent-green">|</span>
          </p>

          <div className="space-y-4 mb-8">
            {lines.map((line, index) => (
              <TerminalText
                key={line.command}
                command={line.command}
                value={line.value}
                valueColor={line.valueColor}
                delay={inView ? 0.2 + 0.12 * index : 0}
              />
            ))}
          </div>

          <p className="font-body text-text-secondary text-sm leading-relaxed border-t border-border pt-6">
            {site.availability}.
          </p>
        </motion.div>

        {/* Right column — focus areas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          {/* Focus areas */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="font-display text-xs text-text-secondary tracking-widest mb-4">
              FOCUS AREAS
            </p>
            <div className="flex flex-col gap-3">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: area.color, boxShadow: `0 0 8px ${area.color}` }}
                  />
                  <span className="font-body text-sm text-text-primary">{area.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
