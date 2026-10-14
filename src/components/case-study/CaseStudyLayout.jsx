import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "../../data/projects";
import { useSkillFocus } from "../../context/SkillFocusContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import { GithubGlyph } from "../ui/icons";
import StatusChip from "../ui/StatusChip";
import Tag from "../ui/Tag";
import SectionHeader from "../ui/SectionHeader";
import { getCaseStudy } from "../../data/caseStudies";
import Block from "./Blocks";

const OTHER_LINK = "text-small font-medium text-accent hover:underline";

// Renders any entry from src/data/caseStudies.js. Chunk 4 (Vach) reuses it unchanged.
export default function CaseStudyLayout({ entry }) {
  const { jumpToSkills } = useSkillFocus();
  const project = projects.find((p) => p.id === entry.projectId);

  usePageMeta({
    title: `${entry.title} | Case study | Shivam Bhagat`,
    description: entry.description,
  });

  // Prev / next among the projects that have a case study.
  const withStudies = projects.filter((p) => p.caseStudy);
  const index = withStudies.findIndex((p) => p.id === entry.projectId);
  const prev = withStudies[index - 1];
  const next = withStudies[index + 1];

  return (
    <article className="case-study pt-14">
      {/* Sticky back link, tucked under the fixed navbar. */}
      <div className="sticky top-14 z-40 border-b border-border bg-background/95">
        <div className="page-container flex h-11 items-center">
          <Link to={{ pathname: "/", hash: "#projects" }} className="inline-flex items-center gap-1.5 text-small text-text-secondary hover:text-text-primary">
            <ArrowLeft size={14} aria-hidden="true" />
            Back to projects
          </Link>
        </div>
      </div>

      <div className="page-container">
        <header className="pb-10 pt-10 md:pb-14 md:pt-16">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <StatusChip project={project} />
            <span className="font-mono text-label text-text-secondary">
              Case study · {[project.context, project.year].filter(Boolean).join(" · ")}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-display text-text-primary [overflow-wrap:anywhere] md:[overflow-wrap:normal]">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lead text-text-secondary">{entry.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={`${OTHER_LINK} inline-flex items-center gap-2`}>
                <GithubGlyph size={16} />
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

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </ul>

          <nav aria-label="On this page" className="mt-10 max-w-[70ch] border-t border-border pt-4">
            <p className="font-mono text-label text-text-secondary">On this page</p>
            <ol className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {entry.sections.map((section, i) => (
                <li key={section.id}>
                  <Link
                    to={{ pathname: `/projects/${entry.slug}`, hash: `#${section.id}` }}
                    className="text-small text-text-secondary hover:text-text-primary"
                  >
                    <span className="font-mono text-label text-accent">{String(i + 1).padStart(2, "0")}</span>{" "}
                    {section.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        {entry.sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="border-t border-border py-12 md:py-16"
          >
            <SectionHeader
              id={`${section.id}-title`}
              number={String(i + 1).padStart(2, "0")}
              label={section.label}
              title={section.title}
            />
            <div className="space-y-6">
              {section.blocks.map((block, b) => (
                <Block key={b} block={block} project={project} />
              ))}
            </div>
          </section>
        ))}

        <nav aria-label="More case studies" className="grid gap-4 border-t border-border py-12 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/projects/${prev.caseStudy}`}
              className="hover-lift rounded-xl border border-border bg-surface p-5 hover:border-accent/50"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-label text-text-secondary">
                <ArrowLeft size={14} aria-hidden="true" /> Previous
              </span>
              <span className="mt-2 block text-h3 text-text-primary">{getCaseStudy(prev.caseStudy)?.title ?? prev.title}</span>
            </Link>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}
          {next && (
            <Link
              to={`/projects/${next.caseStudy}`}
              className="hover-lift rounded-xl border border-border bg-surface p-5 text-left hover:border-accent/50 sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-label text-text-secondary">
                Next <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="mt-2 block text-h3 text-text-primary">{getCaseStudy(next.caseStudy)?.title ?? next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
