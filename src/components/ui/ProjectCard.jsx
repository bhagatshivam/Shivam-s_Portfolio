import { Link } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useSkillFocus } from "../../context/SkillFocusContext";
import { GithubGlyph } from "./icons";
import ProjectMedia from "./ProjectMedia";
import StatusChip from "./StatusChip";
import Tag from "./Tag";

const linkClass =
  "inline-flex items-center gap-1.5 rounded-md border border-border-strong px-3 py-1.5 font-display text-small font-semibold text-text-primary hover:border-accent hover:text-accent";

function Links({ project, primary = true }) {
  const { github, live } = project.links;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {primary && project.caseStudy && (
        <Link to={`/projects/${project.caseStudy}`} className="btn btn-primary !py-2 !text-small">
          Read the case study
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} ${project.repoLabel ? "group " : ""}repository on GitHub`}
          className={linkClass}
        >
          <GithubGlyph size={14} />
          {project.repoLabel ?? "Code"}
        </a>
      ) : (
        project.repoNote && <span className="text-small text-text-secondary">{project.repoNote}</span>
      )}
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className={linkClass}>
          <ExternalLink size={14} aria-hidden="true" />
          Live site
        </a>
      )}
    </div>
  );
}

// Home-page feature row: media on one side, the case on the other. The media side alternates
// so the page reads as a sequence of distinct projects rather than a grid of equal tiles.
export default function ProjectFeature({ project, flip = false }) {
  const { jumpToSkills, focusedProjectIds } = useSkillFocus();
  const highlighted = focusedProjectIds.includes(project.id);

  return (
    <article
      id={`project-${project.id}`}
      className={`grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-12 md:gap-10 ${highlighted ? "outline outline-2 outline-offset-8 outline-accent" : ""}`}
    >
      <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
        <ProjectMedia project={project} />
      </div>

      <div className={`min-w-0 md:col-span-7 ${flip ? "md:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-small text-text-secondary">
          <StatusChip project={project} />
          <span>{project.context}</span>
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span>{project.year}</span>
        </div>

        <h3 className="mt-3 text-h3 text-text-primary">
          {project.caseStudy ? (
            <Link to={`/projects/${project.caseStudy}`} className="hover:text-accent">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-3 max-w-[62ch] text-body text-text-secondary">{project.plain}</p>

        {project.points?.length > 0 && (
          <ul className="mt-4 max-w-[62ch] space-y-2 text-small text-text-primary">
            {project.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="tick mt-[0.15em] shrink-0 text-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          <li>
            <button
              type="button"
              onClick={() => jumpToSkills(project.skillIds, project.title)}
              aria-label={`See every skill used in ${project.title}`}
              className="rounded-md px-2 py-1 font-display text-label leading-none text-accent hover:underline"
            >
              All skills used
            </button>
          </li>
        </ul>

        <div className="mt-6">
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

// Compact row for the "also built" list.
export function ProjectRow({ project }) {
  return (
    <article id={`project-${project.id}`} className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="text-h4 text-text-primary">{project.title}</h4>
          <span className="text-small text-text-secondary">
            {project.context}, {project.year}
          </span>
        </div>
        <p className="mt-1.5 max-w-[70ch] text-small text-text-secondary">{project.plain}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      </div>
      <div className="md:pt-1">
        <Links project={project} primary={false} />
      </div>
    </article>
  );
}
