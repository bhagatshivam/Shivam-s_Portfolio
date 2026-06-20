import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePerformance } from "../../context/PerformanceContext";
import JourneyMap from "../ui/JourneyMap";
import { milestones } from "../../data/journey";

function LiteMilestone({ milestone }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="flex gap-6 items-start"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-accent-blue mt-1 flex-shrink-0" />
        <div className="w-px flex-1 bg-border mt-2" />
      </div>
      <div className="pb-8">
        <span className="font-display text-xs text-accent-blue">{milestone.year}</span>
        <p className="font-display text-sm text-text-primary mt-1">{milestone.label}</p>
        <p className="font-body text-xs text-text-secondary mt-1">{milestone.detail}</p>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const { isLiteMode } = usePerformance();
  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div
      ref={sectionRef}
      className={isLiteMode ? "py-24 px-6" : "relative py-24 px-6"}
      style={!isLiteMode ? { minHeight: "300vh" } : {}}
    >
      <div className={!isLiteMode ? "sticky top-0 pt-20 pb-10 min-h-screen" : ""}>

        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs text-accent-green tracking-widest mb-3">[ SECTION 02 ]</p>
          <h2 className="font-display text-3xl md:text-4xl text-text-primary">
            The Journey
          </h2>
          <p className="font-body text-text-secondary mt-3 text-sm">
            From Pune to Manchester — the path that got here.
          </p>
        </motion.div>

        {/* Full mode — SVG map + GSAP */}
        {!isLiteMode && <JourneyMap sectionRef={sectionRef} />}

        {/* Lite mode — vertical timeline */}
        {isLiteMode && (
          <div className="max-w-lg mx-auto">
            {milestones.map((milestone) => (
              <LiteMilestone key={milestone.id} milestone={milestone} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}