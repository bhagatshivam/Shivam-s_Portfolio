import { featuredProjects, otherProjects } from "../../data/projects";
import FeaturedProjectCard from "../ui/FeaturedProjectCard";
import CompactProjectCard from "../ui/CompactProjectCard";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function Projects() {
  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader
          id="projects-title"
          number="01"
          label="Selected work"
          title="Developer tooling, a shipped Android app, full-stack, and applied AI."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <h3 className="mb-4 mt-14 font-mono text-label text-text-secondary">More projects</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {otherProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
