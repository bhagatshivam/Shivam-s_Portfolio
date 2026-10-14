import { Link, useParams } from "react-router";
import { projects } from "../data/projects";
import { useSkillFocus } from "../context/SkillFocusContext";
import NotFound from "./NotFound";

// Placeholder: the long-form case studies arrive in their own chunks. Until then the page
// shows the project's card copy so the routes exist and can be linked to.
export default function CaseStudyPage() {
  const { slug } = useParams();
  const { jumpToSkills } = useSkillFocus();
  const project = projects.find((p) => p.caseStudy === slug);

  if (!project) return <NotFound />;

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <Link to="/" className="font-display text-xs text-text-secondary hover:text-text-primary">
        ← Back to home
      </Link>
      <h1 className="font-display text-3xl md:text-4xl text-text-primary mt-6 mb-4">{project.title}</h1>
      <p className="font-body text-text-secondary leading-relaxed mb-6">{project.description}</p>
      <p className="font-display text-xs text-text-secondary mb-8">Full case study coming soon.</p>
      <div className="flex flex-wrap gap-4">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm text-accent-blue hover:underline"
          >
            View on GitHub
          </a>
        )}
        <button
          type="button"
          onClick={() => jumpToSkills(project.skillIds, project.title)}
          className="font-display text-sm text-text-secondary hover:text-text-primary"
        >
          See skills used ↓
        </button>
      </div>
    </div>
  );
}
