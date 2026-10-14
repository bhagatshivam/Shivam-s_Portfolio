import { featuredProjects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

// Six-column grid on large screens: three cards on the first row, two wider ones below.
export default function Projects() {
  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader
          id="projects-title"
          number="01"
          label="Selected work"
          title="Selected work."
          intro="Developer tooling, a shipped Android app, full-stack, and applied AI."
        />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 lg:grid-cols-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.05} className={i < 3 ? "lg:col-span-2" : i === 4 ? "md:col-span-2 lg:col-span-3" : "lg:col-span-3"}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
