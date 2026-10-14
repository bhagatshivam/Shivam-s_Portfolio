import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import { usePerformance } from "../../context/PerformanceContext";
import JourneyMap from "../ui/JourneyMap";
import { experience } from "../../data/experience";

// Lite mode renders the timeline as static markup: no fade, no scroll animation.
function LiteMilestone({ milestone }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-accent mt-1 flex-shrink-0" />
        <div className="w-px flex-1 bg-border mt-2" />
      </div>
      <div className="pb-8">
        <span className="font-mono text-label text-accent">{milestone.period}</span>
        <p className="text-small font-medium text-text-primary mt-1">{milestone.title}</p>
        <p className="font-sans text-xs text-text-secondary mt-1">{milestone.summary}</p>
      </div>
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const { isLiteMode } = usePerformance();

  return (
    <div
      ref={sectionRef}
      className={isLiteMode ? "section-y page-container" : "relative section-y page-container"}
      style={!isLiteMode ? { minHeight: "300vh" } : {}}
    >
      <div className={!isLiteMode ? "sticky top-0 pt-20 pb-10 min-h-screen" : ""}>

        <SectionHeader
          id="experience-title"
          number="03"
          label="Experience"
          title="Study and work."
        />

        {/* Full mode — SVG map + GSAP */}
        {!isLiteMode && <JourneyMap sectionRef={sectionRef} />}

        {/* Lite mode — vertical timeline */}
        {isLiteMode && (
          <div className="max-w-xl">
            {experience.map((milestone) => (
              <LiteMilestone key={milestone.id} milestone={milestone} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}