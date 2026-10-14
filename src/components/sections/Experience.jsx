import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { experience, workFraming } from "../../data/experience";
import { volunteering, certifications } from "../../data/extras";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

const KIND_LABEL = { education: "Education", work: "Work", milestone: "Milestone" };

const DOT = {
  education: "bg-accent",
  work: "border border-border-strong bg-background",
  milestone: "bg-border-strong",
};

function Bullets({ items, muted }) {
  return (
    <ul
      className={`mt-3 list-disc space-y-1.5 pl-5 text-small text-text-secondary ${
        muted ? "marker:text-border-strong" : "marker:text-accent"
      }`}
    >
      {items.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

const meta = (entry) => [entry.org, entry.location].filter(Boolean).join(" · ");

// Education: a bordered card with a prominent heading.
function Education({ entry }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <h3 className="text-h3 text-text-primary">
        <span className="sr-only">{KIND_LABEL.education}: </span>
        {entry.title}
      </h3>
      <p className="mt-1 text-small text-text-secondary">{meta(entry)}</p>
      <Bullets items={entry.details} />
    </div>
  );
}

// Work: deliberately lighter than education. No card, smaller muted heading.
function Work({ entry }) {
  return (
    <div>
      <h3 className="text-body font-medium text-text-secondary">
        <span className="sr-only">{KIND_LABEL.work}: </span>
        {entry.title}
      </h3>
      <p className="text-small text-text-secondary">{meta(entry)}</p>
      <Bullets items={entry.details} muted />
    </div>
  );
}

// Milestone: a one-liner, linking to the project page where there is one.
function Milestone({ entry }) {
  return (
    <p className="text-small text-text-primary">
      <span className="sr-only">{KIND_LABEL.milestone}: </span>
      {entry.to ? (
        <Link to={entry.to} className="group inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
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

export default function Experience() {
  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader id="experience-title" number="03" label="Experience" title="Study and work." />

        <ol aria-label="Study and work, most recent first" className="max-w-4xl">
          {experience.map((entry, i) => {
            const Entry = ENTRY[entry.kind];
            return (
              <Reveal as="li" key={entry.id} delay={i * 0.03} className="group md:grid md:grid-cols-[10rem_minmax(0,1fr)] md:gap-x-8">
                <p className="pb-2 font-mono text-label text-text-secondary md:pb-0 md:pt-1 md:text-right">
                  {entry.period}
                </p>
                <div
                  className={`relative border-l border-border pl-6 group-last:pb-0 md:pl-8 ${
                    entry.kind === "milestone" ? "pb-6" : "pb-10"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${DOT[entry.kind]}`}
                  />
                  <Entry entry={entry} />
                </div>
              </Reveal>
            );
          })}
        </ol>

        <p className="mt-8 max-w-[70ch] text-small text-text-secondary">{workFraming}</p>

        <details className="group/details mt-10 max-w-4xl rounded-lg border border-border bg-surface">
          <summary className="cursor-pointer px-5 py-3 font-mono text-label text-text-primary">
            Volunteering and certifications
          </summary>
          <div className="grid gap-8 border-t border-border px-5 py-5 md:grid-cols-2">
            <div>
              <h3 className="text-small font-semibold text-text-primary">Volunteering</h3>
              <ul className="mt-3 space-y-4">
                {volunteering.map((v) => (
                  <li key={v.id}>
                    <p className="text-small text-text-primary">
                      {v.role}, {v.org}
                    </p>
                    <p className="font-mono text-label text-text-secondary">{v.period}</p>
                    <p className="mt-1 text-small text-text-secondary">{v.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-small font-semibold text-text-primary">Certifications</h3>
              <ul className="mt-3 space-y-2">
                {certifications.map((c) => (
                  <li key={c.id} className="text-small text-text-secondary">
                    <span className="text-text-primary">{c.name}</span>, {c.issuer}, {c.year}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
