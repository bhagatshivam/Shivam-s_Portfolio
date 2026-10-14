import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformance } from "../../context/PerformanceContext";
import ParticleField from "../ui/ParticleField";
import { site } from "../../data/site";

const phrases = [...site.heroPhrases, site.availability];

export default function Hero() {
  const { isLiteMode } = usePerformance();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

      {!isLiteMode && <ParticleField />}

      {isLiteMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface" />
      )}

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 font-display text-xs text-accent-green tracking-widest flex items-center justify-center gap-2 text-center"
        >
          [ {site.availability} ]
          <span className="animate-pulse">|</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-text-primary mb-4 leading-tight"
          style={{ textShadow: "0 0 40px rgba(79,142,247,0.3)" }}
        >
          {site.fullName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="font-body text-text-secondary text-base md:text-lg mb-6"
        >
          {site.degreeLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="h-8 mb-10 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-display text-sm md:text-base text-accent-blue"
            >
              {phrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            onClick={handleScrollToProjects}
            className="px-6 py-3 rounded-md font-display text-sm text-background bg-accent-blue hover:bg-opacity-90 transition-all duration-200"
            style={{ boxShadow: "0 0 20px rgba(79,142,247,0.4)" }}
          >
            View My Work
          </button>
          <a
            href={site.contact.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md font-display text-sm text-accent-blue border border-accent-blue hover:bg-accent-blue hover:text-background transition-all duration-200"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-display text-xs text-text-secondary tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent-blue"
          />
        </div>
      </motion.div>

    </div>
  );
}
