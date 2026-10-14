import { Link } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useSkillFocus } from "../../context/SkillFocusContext";
import { GithubGlyph } from "./icons";
import ProjectMedia from "./ProjectMedia";
import StatusChip from "./StatusChip";
import Tag from "./Tag";

const buttonBase =
  "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-small font-medium";
const primary = `${buttonBase} bg-accent text-accent-ink hover:bg-accent/90`;
const secondary = `${buttonBase} border border-border-strong text-text-primary hover:border-accent hover:bg-accent/10`;

// Home-page project card: media or branded visual, status, a two-line tagline, tech chips and
// actions (Case study, Repo, Live only where they exist). Detail lives in the case study.
export default function ProjectCard({ project }) {
  const { jumpToSkills, focusedProjectIds } = useSkillFocus();
  const highlighted = focusedProjectIds.includes(project.id);
  const { github, live } = project.links;

  return (
    <article
      id={`project-${project.id}`}
      className={`hover-lift card relative flex h-full flex-col overflow-hidden rounded-xl border hover:border-accent/50 has-[:focus-visible]:border-accent ${
        highlighted ? "border-accent" : "border-border"
      }`}
    >
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusChip project={project} />
          <span className="font-mono text-label text-text-secondary">
            {[project.context, project.year].filter(Boolean).join(" · ")}
          </span>
        </div>

        <h3 className="text-h3 text-text-primary">
          {project.caseStudy ? (
            <Link to={`/projects/${project.caseStudy}`} className="hover:underline">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="text-small text-text-secondary">{project.tagline}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
          {project.tech.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          {project.caseStudy && (
            <Link to={`/projects/${project.caseStudy}`} className={primary}>
              Case study
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} repository on GitHub`}
              className={secondary}
            >
              <GithubGlyph size={14} />
              Repo
            </a>
          ) : (
            project.repoNote && <span className="font-mono text-label text-text-secondary">{project.repoNote}</span>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className={secondary}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live
            </a>
          )}
          <button
            type="button"
            onClick={() => jumpToSkills(project.skillIds, project.title)}
            aria-label={`Skills used in ${project.title}`}
            className="ml-auto font-mono text-label text-text-secondary hover:text-text-primary"
          >
            Skills ↓
          </button>
        </div>
      </div>
    </article>
  );
}
