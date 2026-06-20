import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "../../data/journey";

gsap.registerPlugin(ScrollTrigger);

// Pune and Manchester approximate SVG coordinates on a 1000x500 viewBox world map
const PUNE = { x: 650, y: 245 };
const MANCHESTER = { x: 455, y: 135 };

// Control point for the curved arc
const CONTROL = { x: 520, y: 80 };

function MilestoneCard({ milestone, index }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex items-start gap-4 p-4 rounded-lg border border-border bg-surface"
      style={{ boxShadow: "0 0 20px rgba(79,142,247,0.08)" }}
    >
      <div className="flex-shrink-0">
        <span className="font-display text-xs text-accent-blue bg-background px-2 py-1 rounded border border-accent-blue border-opacity-30">
          {milestone.year}
        </span>
      </div>
      <div>
        <p className="font-display text-sm text-text-primary mb-1">{milestone.label}</p>
        <p className="font-body text-xs text-text-secondary">{milestone.detail}</p>
      </div>
    </motion.div>
  );
}

export default function JourneyMap({ sectionRef }) {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  const pathD = `M ${PUNE.x} ${PUNE.y} Q ${CONTROL.x} ${CONTROL.y} ${MANCHESTER.x} ${MANCHESTER.y}`;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const offset = length * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: offset });
      },
    });

    return () => trigger.kill();
  }, [sectionRef]);

  return (
    <div className="w-full">
      {/* SVG Map */}
      <div className="relative w-full mb-12">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="w-full h-auto opacity-90"
          style={{ maxHeight: "340px" }}
        >
          {/* Simple world landmass shapes — stylised, not detailed */}
          {/* North America */}
          <path d="M 120 80 L 180 70 L 230 90 L 250 130 L 240 170 L 210 200 L 180 220 L 150 210 L 120 180 L 100 140 Z" fill="#1C2333" />
          {/* South America */}
          <path d="M 180 240 L 220 230 L 240 260 L 235 320 L 210 360 L 185 350 L 170 310 L 165 270 Z" fill="#1C2333" />
          {/* Europe */}
          <path d="M 420 80 L 480 75 L 510 95 L 500 125 L 470 135 L 440 130 L 415 110 Z" fill="#1C2333" />
          {/* Africa */}
          <path d="M 440 150 L 490 145 L 520 170 L 530 230 L 510 290 L 480 310 L 450 290 L 430 240 L 425 190 Z" fill="#1C2333" />
          {/* Asia */}
          <path d="M 520 70 L 680 60 L 780 80 L 800 130 L 760 170 L 700 180 L 640 170 L 580 155 L 530 130 L 515 100 Z" fill="#1C2333" />
          {/* India subcontinent */}
          <path d="M 620 170 L 660 165 L 675 190 L 670 230 L 650 255 L 630 240 L 615 210 L 612 185 Z" fill="#1C2333" />
          {/* Australia */}
          <path d="M 730 270 L 800 260 L 840 290 L 835 340 L 800 360 L 755 350 L 725 320 L 720 290 Z" fill="#1C2333" />

          {/* Arc path from Pune to Manchester */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#4F8EF7"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(79,142,247,0.8))" }}
          />

          {/* Pune dot */}
          <circle cx={PUNE.x} cy={PUNE.y} r="5" fill="#4F8EF7" style={{ filter: "drop-shadow(0 0 8px #4F8EF7)" }}>
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={PUNE.x + 10} y={PUNE.y + 4} fill="#8B9EC7" fontSize="12" fontFamily="Space Mono">Pune</text>

          {/* Manchester dot */}
          <circle cx={MANCHESTER.x} cy={MANCHESTER.y} r="5" fill="#10B981" style={{ filter: "drop-shadow(0 0 8px #10B981)" }}>
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={MANCHESTER.x + 10} y={MANCHESTER.y + 4} fill="#8B9EC7" fontSize="12" fontFamily="Space Mono">Manchester</text>
        </svg>
      </div>

      {/* Milestone cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-6">
        {milestones.map((milestone, index) => (
          <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </div>
  );
}