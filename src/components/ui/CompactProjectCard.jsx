import { useSkillFocus } from "../../context/SkillFocusContext";
import { GithubGlyph } from "./icons";
import StatusChip from "./StatusChip";
import Tag from "./Tag";

// Text-only card for projects without a case-study page.
export default function CompactProjectCard({ project }) {
  const { jumpToSkills, focusedProjectIds } = useSkillFocus();
  const highlighted = focusedProjectIds.includes(project.id);

  return (
    <article
      id={`project-${project.id}`}
      className={`hover-lift flex h-full flex-col gap-3 rounded-xl border card p-5 hover:border-accent/50 has-[:focus-visible]:border-accent ${
        highlighted ? "border-accent" : "border-border"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <StatusChip project={project} />
        <span className="font-mono text-label text-text-secondary">
          {[project.context, project.year].filter(Boolean).join(" · ")}
        </span>
      </div>

      <h3 className="text-h3 text-text-primary">{project.title}</h3>
      <p className="text-small text-text-secondary">{project.summary}</p>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        {project.links.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} repository on GitHub`}
            className="inline-flex items-center gap-2 text-small font-medium text-accent hover:underline"
          >
            <GithubGlyph size={16} />
            Repository
          </a>
        ) : (
          <span className="font-mono text-label text-text-secondary">No public repo yet</span>
        )}
        <button
          type="button"
          onClick={() => jumpToSkills(project.skillIds, project.title)}
          aria-label={`Skills used in ${project.title}`}
          className="font-mono text-label text-text-secondary hover:text-text-primary"
        >
          Skills used ↓
        </button>
      </div>
    </article>
  );
}
