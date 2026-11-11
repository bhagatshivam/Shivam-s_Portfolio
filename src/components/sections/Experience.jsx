import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { experience, workFraming } from "../../data/experience";
import { leadership, certifications } from "../../data/extras";
import SectionHeader, { SectionShell } from "../ui/SectionHeader";

const KIND_LABEL = { education: "Education", work: "Work", milestone: "Milestone" };

function Bullets({ items, muted }) {
  return (
    <ul className={`mt-3 space-y-1.5 text-small ${muted ? "text-text-secondary" : "text-text-primary"}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className={`mt-[0.6em] h-px w-3 shrink-0 ${muted ? "bg-border-strong" : "bg-accent"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Education({ entry }) {
  return (
    <div className="[overflow-wrap:anywhere]">
      <h3 className="text-h4 text-text-primary">
        <span className="sr-only">{KIND_LABEL.education}: </span>
        {entry.title}
      </h3>
      <p className="mt-0.5 text-small text-text-secondary">
        {entry.org}, {entry.location}
        {entry.note && <span className="text-accent"> {"—"} {entry.note}</span>}
      </p>
      <Bullets items={entry.details} />
    </div>
  );
}

// Work is deliberately lighter than education: it is not software work.
function Work({ entry }) {
  return (
    <div className="[overflow-wrap:anywhere]">
      <h3 className="font-display text-body font-semibold text-text-secondary">
        <span className="sr-only">{KIND_LABEL.work}: </span>
        {entry.title}, {entry.org}
      </h3>
      <p className="text-small text-text-secondary">{entry.location}</p>
      <Bullets items={entry.details} muted />
    </div>
  );
}

function Milestone({ entry }) {
  return (
    <p className="text-small text-text-primary">
      <span className="sr-only">{KIND_LABEL.milestone}: </span>
      {entry.to ? (
        <Link to={entry.to} className="group inline-flex items-center gap-1.5 font-display font-semibold text-accent hover:underline">
          {entry.title}
          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        entry.title
      )}
    </p>
  );
}

const ENTRY = { education: Education, work: Work, milestone: Milestone };
const DOT = {
  education: "bg-accent",
  work: "border border-border-strong bg-background",
  milestone: "bg-border-strong",
};

export default function Experience() {
  return (
    <SectionShell
      header={<SectionHeader id="experience-title" title="Experience" intro="Study, shipped work and part-time jobs on one timeline, most recent first." />}
    >
      <ol aria-label="Study and work, most recent first" className="max-w-3xl">
        {experience.map((entry) => {
          const Entry = ENTRY[entry.kind];
          return (
            <li key={entry.id} className="group md:grid md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-8">
              <p className="pb-2 font-display text-label font-medium text-text-secondary md:pb-0 md:pt-0.5 md:text-right">{entry.period}</p>
              <div
                className={`relative border-l border-border pl-6 group-last:pb-0 md:pl-8 ${
                  entry.kind === "milestone" ? "pb-6" : "pb-10"
                }`}
              >
                <span aria-hidden="true" className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${DOT[entry.kind]}`} />
                <Entry entry={entry} />
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 max-w-[64ch] text-small text-text-secondary">{workFraming}</p>

      <div className="mt-12 grid gap-10 border-t border-border pt-8 md:grid-cols-2">
        <div>
          <h3 className="text-h4 text-text-primary">Leadership and volunteering</h3>
          <ul className="mt-4 space-y-4">
            {leadership.map((v) => (
              <li key={v.id}>
                <p className="font-display text-small font-semibold text-text-primary">
                  {v.role}
                  <span className="font-normal text-text-secondary">, {v.org}</span>
                </p>
                <p className="font-display text-label text-text-secondary">{v.period}</p>
                <p className="mt-1 text-small text-text-secondary">{v.summary}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-h4 text-text-primary">Certifications</h3>
          <ul className="mt-4 space-y-2">
            {certifications.map((c) => (
              <li key={c.id} className="text-small text-text-secondary">
                <span className="font-display font-semibold text-text-primary">{c.name}</span>, {c.issuer}, {c.year}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
