import { Mail } from "lucide-react";
import { site } from "../../data/site";
import { GithubGlyph, LinkedinGlyph } from "../ui/icons";
import Reveal from "../ui/Reveal";
import CvLink from "../ui/CvLink";

const outlineButton =
  "inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-small font-medium text-text-primary hover:border-accent";

export default function Hero() {
  return (
    <div className="pb-16 pt-28 md:pb-24 md:pt-40">
      <div className="page-container">
        <Reveal immediate>
          {/* Static dot: nothing on this page loops. */}
          <p className="inline-flex items-start gap-2.5 rounded-2xl border border-border bg-surface px-3.5 py-2 text-small text-text-secondary">
            <span aria-hidden="true" className="mt-[0.5em] h-2 w-2 shrink-0 rounded-full bg-accent" />
            {site.availability}
          </p>

          <h1 className="mt-6 text-display text-text-primary">{site.name}</h1>

          <p className="mt-5 max-w-3xl text-lead text-text-secondary">{site.degreeLine}</p>
          <p className="mt-2 max-w-3xl text-lead text-text-primary">{site.positioning}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CvLink variant="hero" />
            <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className={outlineButton}>
              <GithubGlyph size={16} />
              GitHub
            </a>
            <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" className={outlineButton}>
              <LinkedinGlyph size={16} />
              LinkedIn
            </a>
            <a href={`mailto:${site.contact.email}`} className={outlineButton}>
              <Mail size={16} aria-hidden="true" />
              Email
            </a>
          </div>

          {/* Work-rights sentence (site.workRights) is deliberately not rendered until confirmed. */}

          <ul
            aria-label="Dissertation results"
            className="mt-14 grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {site.proofStrip.map((item, i) => (
              <li
                key={item.label}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4 sm:flex-col sm:items-start sm:gap-2 sm:px-6 sm:py-6 sm:first:pl-0"
              >
                <span
                  className={`min-w-[6rem] shrink-0 text-stat tabular-nums sm:min-w-0 ${
                    i === 0 ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {item.value}
                </span>
                <span className="min-w-[10rem] flex-1 font-mono text-label text-text-secondary sm:min-w-0">{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-label text-text-secondary">From my MSc dissertation evaluation.</p>
        </Reveal>
      </div>
    </div>
  );
}
