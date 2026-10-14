import { Link } from "react-router";
import { skills, parkedSkills, clusterOrder, clusterLabels } from "../../data/skills";
import { projects } from "../../data/projects";
import { useSkillFocus } from "../../context/SkillFocusContext";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

function projectHref(project) {
  return project.caseStudy
    ? `/projects/${project.caseStudy}`
    : { pathname: "/", hash: `#project-${project.id}` };
}

export default function Skills() {
  const { focusedSkillIds, focusedProjectIds, focusLabel, toggleSkill, clearFocus } = useSkillFocus();
  const usedIn = projects.filter((p) => focusedProjectIds.includes(p.id));

  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader
          id="skills-title"
          number="02"
          label="Skills"
          title="Technologies, linked to the projects that used them."
          intro="Select a technology to see where I used it."
        />

        <div className="space-y-8">
          {clusterOrder.map((cluster) => (
            <Reveal key={cluster}>
              <h3 className="mb-3 font-mono text-label text-text-secondary">{clusterLabels[cluster]}</h3>
              <ul className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.cluster === cluster)
                  .map((skill) => {
                    const focused = focusedSkillIds.includes(skill.id);
                    return (
                      <li key={skill.id}>
                        <button
                          type="button"
                          aria-pressed={focused && focusedProjectIds.length > 0}
                          onClick={() => toggleSkill(skill)}
                          className={`rounded-md border px-3 py-1.5 font-mono text-label transition-colors ${
                            focused
                              ? "border-accent bg-accent/10 text-text-primary"
                              : "border-border-strong text-text-secondary hover:border-accent hover:text-text-primary"
                          }`}
                        >
                          {skill.label}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Result line: which projects used the selected chip, or the project that sent you here. */}
        <div aria-live="polite" className="mt-6 min-h-[3rem]">
          {focusLabel && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-border bg-surface px-4 py-3 text-small">
              {usedIn.length > 0 ? (
                <>
                  <span className="text-text-secondary">{focusLabel} is used in:</span>
                  {usedIn.map((project) => (
                    <Link
                      key={project.id}
                      to={projectHref(project)}
                      className="font-medium text-accent hover:underline"
                    >
                      {project.title}
                    </Link>
                  ))}
                </>
              ) : (
                <span className="text-text-secondary">{focusLabel}</span>
              )}
              <button
                type="button"
                onClick={clearFocus}
                className="ml-auto font-mono text-label text-text-secondary hover:text-text-primary"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Not tied to a project on this site, so these are not links. */}
        <div className="mt-6 border-t border-border pt-6">
          <h3 className="mb-3 font-mono text-label text-text-secondary">Also worked with</h3>
          <ul className="flex flex-wrap gap-2">
            {parkedSkills.map((skill) => (
              <li
                key={skill.id}
                className="rounded-md border border-dashed border-border px-3 py-1.5 font-mono text-label text-text-secondary"
              >
                {skill.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
