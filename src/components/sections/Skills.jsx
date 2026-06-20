import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillIconGrid from "../ui/SkillIconGrid";

export default function Skills() {
  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="py-24 px-6">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="font-display text-xs text-accent-blue tracking-widest mb-3">[ SECTION 04 ]</p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary">Skills</h2>
        <p className="font-body text-text-secondary mt-3 text-sm">
          Technologies and tools across the stack.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <SkillIconGrid />
      </div>
    </div>
  );
}
