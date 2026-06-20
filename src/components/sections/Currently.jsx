import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TerminalText from "../ui/TerminalText";

const lines = [
  { command: "status", value: "open to graduate roles" },
  { command: "location", value: "Manchester, UK (open to relocation)" },
  { command: "availability", value: "October 2026 onwards" },
  { command: "thesis", value: "CI Pipeline Documentation Tool [IN PROGRESS]", valueColor: "#4F8EF7" },
];

export default function Currently() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="py-24 px-6">
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="font-display text-2xl text-text-primary mb-8 flex items-center gap-2"
        >
          <span className="text-accent-green">&gt;</span> currently
          <span className="animate-pulse text-accent-green">|</span>
        </motion.h2>

        <div className="rounded-lg border border-border bg-surface p-6 space-y-4">
          {lines.map((line, index) => (
            <TerminalText
              key={line.command}
              command={line.command}
              value={line.value}
              valueColor={line.valueColor}
              delay={inView ? 0.15 * index : 0}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="font-body text-text-secondary text-sm mt-6 text-center"
        >
          I'm actively applying for Software Engineering, AI/ML, and Data Engineering roles across the UK.
        </motion.p>
      </div>
    </div>
  );
}
