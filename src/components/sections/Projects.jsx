import { featuredProjects, moreProjects } from "../../data/projects";
import ProjectFeature, { ProjectRow } from "../ui/ProjectCard";
import SectionHeader, { SectionShell } from "../ui/SectionHeader";

export default function Projects() {
  return (
    <SectionShell
      header={
        <SectionHeader
          id="projects-title"
          title="Projects"
          intro="Four things I built and measured. Each one has a page with the architecture, the numbers and what still goes wrong."
        />
      }
    >
      <ol className="divide-y divide-border border-y border-border">
        {featuredProjects.map((project, i) => (
          <li key={project.id} className="py-10 first:pt-0 md:py-14 md:first:pt-0">
            <ProjectFeature project={project} flip={i % 2 === 1} />
          </li>
        ))}
      </ol>

      <h3 className="mt-14 text-h4 text-text-primary">Also built</h3>
      <p className="mt-1 text-small text-text-secondary">Earlier and smaller work, still with the numbers that go with it.</p>
      <ul className="mt-5 divide-y divide-border border-y border-border">
        {moreProjects.map((project) => (
          <li key={project.id}>
            <ProjectRow project={project} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
