import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data/projects";
import { getCaseStudy } from "../data/caseStudies";
import { useSkillFocus } from "../context/SkillFocusContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { caseStudyTitle } from "../data/seo";
import CaseStudyLayout from "../components/case-study/CaseStudyLayout";
import StatusChip from "../components/ui/StatusChip";
import NotFound from "./NotFound";

// Placeholder for a case-study route whose entry is not written yet (Vach, until its chunk).
function ComingSoon({ project }) {
  const { jumpToSkills } = useSkillFocus();
  usePageMeta({
    title: caseStudyTitle(project.title),
    description: project.summary,
    path: `/projects/${project.caseStudy}`,
  });

  return (
    <div className="page-container pb-24 pt-28 md:pt-36">
      <div className="max-w-3xl">
        <Link to={{ pathname: "/", hash: "#projects" }} className="inline-flex items-center gap-1.5 text-small text-text-secondary hover:text-text-primary">
          <ArrowLeft size={14} aria-hidden="true" /> Back to projects
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
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-small font-medium text-accent hover:underline">
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

export default function CaseStudyPage() {
  const { slug } = useParams();
  const entry = getCaseStudy(slug);
  if (entry) return <CaseStudyLayout entry={entry} />;

  const project = projects.find((p) => p.caseStudy === slug);
  return project ? <ComingSoon project={project} /> : <NotFound />;
}
