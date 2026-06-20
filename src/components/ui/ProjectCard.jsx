import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { usePerformance } from "../../context/PerformanceContext";

export default function ProjectCard({ project }) {
  const { isLiteMode } = usePerformance();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e) => {
    if (isLiteMode || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      x: offsetY * -8,
      y: offsetX * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(true)}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          transformPerspective: 800,
        }}
        whileHover={
          !isLiteMode
            ? { boxShadow: `0 0 30px ${project.color}40` }
            : { borderColor: project.color }
        }
        className="relative w-full max-w-[400px] h-[280px] rounded-xl bg-surface border border-border p-6 cursor-pointer flex flex-col justify-between overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: project.color }}
        />

        <div className="flex items-center justify-between">
          <span
            className="font-display text-[10px] tracking-widest px-2 py-1 rounded"
            style={{
              color: project.status === "complete" ? "#10B981" : "#F59E0B",
              backgroundColor:
                project.status === "complete" ? "#10B98120" : "#F59E0B20",
            }}
          >
            {project.status === "complete" ? "COMPLETE" : "IN PROGRESS"}
          </span>
          <span className="font-display text-xs text-text-secondary">{project.year}</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-display text-lg text-text-primary mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="font-body text-sm text-text-secondary line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-display text-[10px] text-text-secondary border border-border px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="font-display text-[10px] text-text-secondary px-2 py-1">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-50 bg-background bg-opacity-90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-xl bg-surface border border-border p-8"
              style={{ boxShadow: `0 0 60px ${project.color}30` }}
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div
                className="w-10 h-1 rounded-full mb-6"
                style={{ backgroundColor: project.color }}
              />

              <span
                className="font-display text-[10px] tracking-widest px-2 py-1 rounded inline-block mb-3"
                style={{
                  color: project.status === "complete" ? "#10B981" : "#F59E0B",
                  backgroundColor:
                    project.status === "complete" ? "#10B98120" : "#F59E0B20",
                }}
              >
                {project.status === "complete" ? "COMPLETE" : "IN PROGRESS"} · {project.year}
              </span>

              <h3 className="font-display text-2xl text-text-primary mb-4">
                {project.title}
              </h3>

              <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-display text-xs text-text-secondary border border-border px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 font-display text-sm text-accent-blue hover:underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.804 5.624-5.476 5.92.43.37.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.216.696.825.577C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 font-display text-sm text-text-secondary">
                  <Lock size={16} />
                  {project.isDissertation ? "Private — Dissertation" : "No public repo yet"}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
