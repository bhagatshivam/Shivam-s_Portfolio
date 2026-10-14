import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useSkillFocus } from "../../context/SkillFocusContext";
import { GithubGlyph } from "./icons";
import ProjectMedia from "./ProjectMedia";
import StatusChip from "./StatusChip";
import Tag from "./Tag";

// Large, media-led card. The title link is stretched over the whole card; the GitHub and
// "Skills used" controls sit above it.
export default function FeaturedProjectCard({ project }) {
  const { jumpToSkills, focusedProjectIds } = useSkillFocus();
  const highlighted = focusedProjectIds.includes(project.id);

  return (
    <article
      id={`project-${project.id}`}
      className={`hover-lift group relative flex h-full flex-col overflow-hidden rounded-xl border card hover:border-accent/50 has-[:focus-visible]:border-accent ${
        highlighted ? "border-accent" : "border-border"
      }`}
    >
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusChip project={project} />
          <span className="font-mono text-label text-text-secondary">
            {[project.context, project.year].filter(Boolean).join(" · ")}
          </span>
        </div>

        <h3 className="text-h3 text-text-primary">
          <Link
            to={`/projects/${project.caseStudy}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-small text-text-secondary">{project.summary}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-2">
          <span className="inline-flex items-center gap-1.5 text-small font-medium text-accent">
            Read case study
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </span>

          <div className="relative z-10 flex items-center gap-4">
            {project.releaseNote && (
              <span className="font-mono text-label text-text-secondary">{project.releaseNote}</span>
            )}
            <button
              type="button"
              onClick={() => jumpToSkills(project.skillIds, project.title)}
              aria-label={`Skills used in ${project.title}`}
              className="font-mono text-label text-text-secondary hover:text-text-primary"
            >
              Skills used ↓
            </button>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-text-secondary hover:text-text-primary"
              >
                <GithubGlyph size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
