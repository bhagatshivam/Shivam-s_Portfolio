import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 5);
  const firstRow = visibleProjects.slice(0, 3);
  const secondRow = visibleProjects.slice(3, 5);
  const extraRow = visibleProjects.slice(5, 8);

  return (
    <div className="py-24 px-6">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="font-display text-xs text-accent-purple tracking-widest mb-3">[ SECTION 03 ]</p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary">Projects</h2>
        <p className="font-body text-text-secondary mt-3 text-sm">
          Developer tooling, a shipped Android app, full-stack, and applied AI.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {firstRow.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mt-8 md:max-w-[700px]">
        {secondRow.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <AnimatePresence>
        {showAll && extraRow.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-8 overflow-hidden"
          >
            {extraRow.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length > 5 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-2 font-display text-sm text-accent-blue border border-accent-blue rounded-full px-5 py-2 hover:bg-accent-blue hover:text-background transition-all duration-200"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                View More Projects <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
