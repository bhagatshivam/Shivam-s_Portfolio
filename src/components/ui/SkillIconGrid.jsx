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
        {skill.isGithub ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#F0F6FF">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.804 5.624-5.476 5.92.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.696.825.577C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        ) : skill.icon ? (
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
