import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data/projects";
import { useSkillFocus } from "../context/SkillFocusContext";
import StatusChip from "../components/ui/StatusChip";
import NotFound from "./NotFound";

// Placeholder: the long-form case studies arrive in their own chunks. Until then the page
// shows the project's card copy so the routes exist and can be linked to.
export default function CaseStudyPage() {
  const { slug } = useParams();
  const { jumpToSkills } = useSkillFocus();
  const project = projects.find((p) => p.caseStudy === slug);

  if (!project) return <NotFound />;

  return (
    <div className="page-container pb-24 pt-28 md:pt-36">
      <div className="max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-small text-text-secondary hover:text-text-primary">
          <ArrowLeft size={14} aria-hidden="true" /> Back to home
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusChip project={project} />
          <span className="font-mono text-label text-text-secondary">
            {[project.context, project.year].filter(Boolean).join(" · ")}
          </span>
        </div>
        <h1 className="mt-4 text-h2 text-text-primary">{project.title}</h1>
        <p className="mt-5 text-body text-text-secondary">{project.description}</p>
        <p className="mt-8 font-mono text-label text-text-secondary">Full case study coming soon.</p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small font-medium text-accent hover:underline"
            >
              View on GitHub
            </a>
          )}
          <button
            type="button"
            onClick={() => jumpToSkills(project.skillIds, project.title)}
            className="font-mono text-label text-text-secondary hover:text-text-primary"
          >
            Skills used ↓
          </button>
        </div>
      </div>
    </div>
  );
}
