import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePerformance } from "../../context/PerformanceContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import { skills, clusterColors, clusterLabels } from "../../data/skills";
import SkillGraph from "../ui/SkillGraph";

function LitePillGrid() {
  const clusters = ["ai", "web", "tools"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {clusters.map((cluster) => (
        <div key={cluster}>
          <p
            className="font-display text-xs tracking-widest mb-4 text-center"
            style={{ color: clusterColors[cluster] }}
          >
            {clusterLabels[cluster].toUpperCase()}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills
              .filter((s) => s.cluster === cluster)
              .map((s) => (
                <span
                  key={s.id}
                  className="font-display text-xs text-text-secondary border rounded-full px-3 py-1.5"
                  style={{ borderColor: `${clusterColors[cluster]}50` }}
                >
                  {s.label}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const { isLiteMode } = usePerformance();
  const isMobile = useIsMobile();
  const showStaticGrid = isLiteMode || isMobile;
  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="py-24 px-6">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p className="font-display text-xs text-accent-blue tracking-widest mb-3">[ SECTION 04 ]</p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary">Skills</h2>
        <p className="font-body text-text-secondary mt-3 text-sm">
          {showStaticGrid ? "Grouped by category." : "Drag the bubbles around."}
        </p>
      </motion.div>

      {/* Cluster legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {Object.entries(clusterLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: clusterColors[key] }}
            />
            <span className="font-display text-xs text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {showStaticGrid ? <LitePillGrid /> : <SkillGraph />}
      </div>
    </div>
  );
}
