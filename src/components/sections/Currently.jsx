import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import TerminalText from "../ui/TerminalText";
import { site } from "../../data/site";

const lines = site.currentlyLines;

const focusAreas = [
  { label: "Software Engineering" },
  { label: "AI / ML Engineering" },
  { label: "Data Engineering" },
];

export default function Currently() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div ref={ref} className="section-y page-container">
      <SectionHeader id="currently-title" label="Right now" title="Where things stand." />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Terminal block — left, wider */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 rounded-xl border border-border bg-surface p-6 md:p-8"
        >
          <p className="font-mono text-sm text-text-primary mb-6 flex items-center gap-2">
            <span className="text-accent">&gt;</span> currently
          </p>

          <div className="space-y-4 mb-8">
            {lines.map((line, index) => (
              <TerminalText
                key={line.command}
                command={line.command}
                value={line.value}
                delay={inView ? 0.2 + 0.12 * index : 0}
              />
            ))}
          </div>

          <p className="font-sans text-text-secondary text-sm leading-relaxed border-t border-border pt-6">
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
            <p className="font-mono text-label text-text-secondary mb-4">
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
                  <span className="w-2 h-2 rounded-full flex-shrink-0 bg-accent" />
                  <span className="font-sans text-sm text-text-primary">{area.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
