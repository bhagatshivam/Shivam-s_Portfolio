import { useState } from "react";
import { Link } from "react-router";
import { skills, clusterOrder, clusterLabels } from "../../data/skills";
import { projects } from "../../data/projects";
import { useSkillFocus } from "../../context/SkillFocusContext";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import SkillIcon from "../ui/SkillIcon";

function projectHref(project) {
  return project.caseStudy
    ? `/projects/${project.caseStudy}`
    : { pathname: "/", hash: `#project-${project.id}` };
}

// Per group: the projects that used any of its skills, as one muted line.
function usedInLine(groupSkills) {
  const ids = new Set(groupSkills.flatMap((s) => s.projectIds));
  const names = projects.filter((p) => ids.has(p.id)).map((p) => p.shortTitle);
  return names.length ? `Used in ${names.join(", ")}` : "";
}

export default function Skills() {
  const { focusedSkillIds, focusedProjectIds, focusLabel, toggleSkill, clearFocus } = useSkillFocus();
  // Hovering or focusing a skill previews the projects that used it; clicking pins it.
  const [preview, setPreview] = useState(null);
  const litProjectIds = preview ? preview.projectIds : focusedProjectIds;
  const usedIn = projects.filter((p) => focusedProjectIds.includes(p.id));
  const hasLit = litProjectIds.length > 0;

  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader
          id="skills-title"
          number="02"
          label="Skills"
          title="Everything I've used, and where."
          intro="Hover or tap a skill to see which projects used it. Dashed skills are on my CV but not in a project listed here."
        />

        {/* Project legend: lights up for the skill under the pointer. */}
        <ul aria-label="Projects" className="mb-6 flex flex-wrap gap-2">
          {projects.map((p) => {
            const lit = litProjectIds.includes(p.id);
            return (
              <li
                key={p.id}
                className={`rounded-full border px-3 py-1 font-mono text-label transition-colors ${
                  lit
                    ? "border-accent bg-accent/15 text-text-primary"
                    : hasLit
                      ? "border-border text-text-secondary/70"
                      : "border-border text-text-secondary"
                }`}
              >
                {p.shortTitle}
              </li>
            );
          })}
        </ul>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clusterOrder.map((cluster, i) => {
            const groupSkills = skills.filter((s) => s.cluster === cluster);
            const usedLine = usedInLine(groupSkills);
            return (
              <Reveal key={cluster} delay={(i % 3) * 0.05}>
                <section
                  aria-labelledby={`skills-${cluster}`}
                  className="card flex h-full flex-col rounded-xl border border-border p-5"
                >
                  <h3 id={`skills-${cluster}`} className="text-h3 text-text-primary">
                    {clusterLabels[cluster]}
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    {groupSkills.map((skill) => {
                      const focused = focusedSkillIds.includes(skill.id);
                      const base =
                        "flex h-full min-h-[2.75rem] w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-small";
                      if (skill.cv) {
                        return (
                          <li key={skill.id}>
                            <span
                              title="On my CV; not tied to a project listed here"
                              className={`${base} border-dashed border-border-strong text-text-secondary`}
                            >
                              <SkillIcon id={skill.id} />
                              {skill.label}
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
                                ? "border-accent bg-accent/15 text-text-primary"
                                : "border-border-strong text-text-primary hover:border-accent hover:bg-accent/10"
                            }`}
                          >
                            <SkillIcon id={skill.id} />
                            {skill.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {usedLine && <p className="mt-auto pt-4 text-small text-text-secondary">{usedLine}</p>}
                </section>
              </Reveal>
            );
          })}
        </div>

        {/* Result line for a pinned skill, or the project that sent you here. */}
        <div aria-live="polite" className="mt-6 min-h-[3rem]">
          {focusLabel && (
            <div className="card flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-border px-4 py-3 text-small">
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
      </div>
    </div>
  );
}
