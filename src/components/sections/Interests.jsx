import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { interests } from "../../data/interests";
import InterestCard from "../ui/InterestCard";

export default function Interests() {
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
        <p className="font-display text-xs text-accent-purple tracking-widest mb-3">[ BEYOND THE CODE ]</p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary">When I'm Not Coding</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {interests.map((interest, index) => (
          <InterestCard key={interest.id} interest={interest} index={index} />
        ))}
      </div>
    </div>
  );
}
