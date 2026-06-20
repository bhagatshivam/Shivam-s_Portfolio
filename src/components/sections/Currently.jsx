import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TerminalText from "../ui/TerminalText";

const lines = [
  { command: "status", value: "open to graduate roles" },
  { command: "location", value: "Manchester, UK (open to relocation)" },
  { command: "availability", value: "October 2026 onwards" },
  { command: "thesis", value: "CI Pipeline Documentation Tool [IN PROGRESS]", valueColor: "#4F8EF7" },
];

const focusAreas = [
  { label: "Software Engineering", color: "#4F8EF7" },
  { label: "AI / ML Engineering", color: "#8B5CF6" },
  { label: "Data Engineering", color: "#10B981" },
];

const stats = [
  { value: "8", label: "Projects shipped" },
  { value: "3", label: "Years of CS study" },
  { value: "5+", label: "ML/AI frameworks" },
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
            I'm actively applying for Software Engineering, AI/ML, and Data Engineering roles across the UK.
          </p>
        </motion.div>

        {/* Right column — focus areas + stats */}
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

          {/* Quick stats */}
          <div className="rounded-xl border border-border bg-surface p-6 flex-1">
            <p className="font-display text-xs text-text-secondary tracking-widest mb-4">
              AT A GLANCE
            </p>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-display text-2xl text-accent-blue mb-1">{stat.value}</p>
                  <p className="font-body text-[11px] text-text-secondary leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
