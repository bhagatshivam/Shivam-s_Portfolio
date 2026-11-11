import { useState } from "react";
import { Link } from "react-router";
import { skills, clusterOrder, clusterLabels } from "../../data/skills";
import { projects } from "../../data/projects";
import { useSkillFocus } from "../../context/SkillFocusContext";
import SectionHeader, { SectionShell } from "../ui/SectionHeader";
import SkillIcon from "../ui/SkillIcon";

function projectHref(project) {
  return project.caseStudy ? `/projects/${project.caseStudy}` : { pathname: "/", hash: `#project-${project.id}` };
}

// Skills as a ledger: one row per group, the skills across, and the projects that used them
// on the right. Hover or focus a skill and the projects that used it light up; click to pin.
// A skill with a dashed outline is on the CV but not in a project listed on this page.
export default function Skills() {
  const { focusedSkillIds, focusedProjectIds, focusLabel, toggleSkill, clearFocus } = useSkillFocus();
  const [preview, setPreview] = useState(null);
  const litProjectIds = preview ? preview.projectIds : focusedProjectIds;
  const usedIn = projects.filter((p) => focusedProjectIds.includes(p.id));
  const hasLit = litProjectIds.length > 0;

  return (
    <SectionShell
      className="band"
      header={
        <SectionHeader
          id="skills-title"
          title="Skills"
          intro="Everything I have used, and where. Hover or tap a skill to see which projects used it; a dashed outline means it is on my CV but not in a project shown here."
        >
          <ul aria-label="Projects" className="mt-6 flex flex-wrap gap-1.5">
            {projects.map((p) => {
              const lit = litProjectIds.includes(p.id);
              return (
                <li
                  key={p.id}
                  className={`rounded-md border px-2 py-1 font-display text-label transition-colors ${
                    lit
                      ? "border-accent bg-accent-soft text-accent"
                      : hasLit
                        ? "border-transparent text-text-secondary/60"
                        : "border-border bg-surface text-text-secondary"
                  }`}
                >
                  {p.shortTitle}
                </li>
              );
            })}
          </ul>
        </SectionHeader>
      }
    >
      <div className="divide-y divide-border border-y border-border">
        {clusterOrder.map((cluster) => {
          const groupSkills = skills.filter((s) => s.cluster === cluster);
          return (
            <section
              key={cluster}
              aria-labelledby={`skills-${cluster}`}
              className="grid gap-x-8 gap-y-3 py-5 md:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <h3 id={`skills-${cluster}`} className="text-h4 text-text-primary md:pt-1.5">
                {clusterLabels[cluster]}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {groupSkills.map((skill) => {
                  const focused = focusedSkillIds.includes(skill.id);
                  const base =
                    "flex min-h-[2.4rem] items-center gap-2 rounded-md border px-2.5 py-1.5 text-left font-display text-small";
                  if (skill.cv) {
                    return (
                      <li key={skill.id}>
                        <span
                          title="On my CV; not tied to a project listed here"
                          className={`${base} border-dashed border-border-strong bg-transparent text-text-secondary`}
                        >
                          <SkillIcon id={skill.id} />
                          <span className="min-w-0 [overflow-wrap:anywhere]">{skill.label}</span>
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={skill.id}>
                      <button
                        type="button"
                        aria-pressed={focused && focusedProjectIds.length > 0}
                        onClick={() => toggleSkill(skill)}
                        onMouseEnter={() => setPreview(skill)}
                        onMouseLeave={() => setPreview(null)}
                        onFocus={() => setPreview(skill)}
                        onBlur={() => setPreview(null)}
                        className={`${base} transition-colors ${
                          focused
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border bg-surface text-text-primary hover:border-accent"
                        }`}
                      >
                        <SkillIcon id={skill.id} />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{skill.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Result line for a pinned skill, or the project that sent you here. */}
      <div aria-live="polite" className={focusLabel ? "mt-6" : ""}>
        {focusLabel && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-accent bg-surface px-4 py-3 text-small">
            {usedIn.length > 0 ? (
              <>
                <span className="text-text-secondary">{focusLabel} is used in</span>
                {usedIn.map((project) => (
                  <Link key={project.id} to={projectHref(project)} className="font-display font-semibold text-accent hover:underline">
                    {project.title}
                  </Link>
                ))}
              </>
            ) : (
              <span className="text-text-secondary">{focusLabel}</span>
            )}
            <button type="button" onClick={clearFocus} className="ml-auto font-display text-label text-text-secondary hover:text-text-primary">
              Clear
            </button>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
