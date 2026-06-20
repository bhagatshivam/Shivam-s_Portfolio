import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills, clusterColors, clusterLabels } from "../../data/skills";

function SkillIcon({ skill, index }) {
  const color = clusterColors[skill.cluster];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-surface transition-all duration-200"
      style={{ transition: "box-shadow 0.25s ease, border-color 0.25s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 24px ${color}40`;
        e.currentTarget.style.borderColor = `${color}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "";
      }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center border"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}40`,
        }}
      >
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.label}
            className="w-7 h-7"
            style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.3))" }}
            loading="lazy"
          />
        ) : (
          <span className="text-2xl">{skill.emoji}</span>
        )}
      </div>
      <span className="font-display text-xs text-text-secondary text-center leading-tight">
        {skill.label}
      </span>
    </motion.div>
  );
}

export default function SkillIconGrid() {
  const clusters = ["ai", "web", "tools"];

  return (
    <div className="space-y-12">
      {clusters.map((cluster) => {
        const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
        const clusterSkills = skills.filter((s) => s.cluster === cluster);

        return (
          <motion.div
            key={cluster}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: clusterColors[cluster] }}
              />
              <p
                className="font-display text-xs tracking-widest"
                style={{ color: clusterColors[cluster] }}
              >
                {clusterLabels[cluster].toUpperCase()}
              </p>
              <span className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {clusterSkills.map((skill, index) => (
                <SkillIcon key={skill.id} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
