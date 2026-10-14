import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { site } from "../../data/site";
import { projects } from "../../data/projects";
import Reveal from "../ui/Reveal";
import CvLink from "../ui/CvLink";
import HeroVisual from "../ui/HeroVisual";

const outlineButton =
  "inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-body font-medium text-text-primary hover:border-accent hover:bg-accent/10";

function chipTarget(chip) {
  const project = projects.find((p) => p.id === chip.project);
  return project?.caseStudy ? `/projects/${project.caseStudy}` : { pathname: "/", hash: "#projects" };
}

export default function Hero() {
  return (
    <div className="hero-glow relative overflow-hidden pb-12 pt-28 md:pb-16 md:pt-36">
      <HeroVisual />
      <div className="page-container relative">
        <Reveal immediate>
          {/* Static dot: nothing on this page loops. */}
          <p className="inline-flex items-start gap-2.5 rounded-2xl border border-accent/40 bg-accent/10 px-3.5 py-2 text-small text-text-primary">
            <span aria-hidden="true" className="mt-[0.5em] h-2 w-2 shrink-0 rounded-full bg-accent" />
            {site.availability}
          </p>

          <h1 className="mt-7 text-display text-text-primary">{site.name}</h1>

          <p className="mt-5 max-w-4xl text-lead text-text-primary">
            <span className="text-gradient font-semibold">{site.identity}</span> {site.identityDetail}
          </p>
          <p className="mt-4 max-w-3xl text-body text-text-secondary">{site.heroProof}</p>

          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Featured work">
            {site.heroChips.map((chip) => (
              <li key={chip.project}>
                <Link
                  to={chipTarget(chip)}
                  className="inline-flex flex-wrap items-baseline gap-x-2 rounded-full border border-border-strong bg-surface/80 px-4 py-2 text-small hover:border-accent hover:bg-accent/10"
                >
                  <span className="font-semibold text-text-primary">{chip.label}</span>
                  <span className="text-text-secondary">{chip.detail}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to={{ pathname: "/", hash: "#projects" }}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-body font-semibold text-accent-ink hover:bg-accent/90"
            >
              View work
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <CvLink variant="hero" />
            <Link to={{ pathname: "/", hash: "#contact" }} className={outlineButton}>
              Contact
            </Link>
          </div>

          {/* Work-rights sentence (site.workRights) is deliberately not rendered until confirmed. */}
        </Reveal>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {site.heroFacts.map((fact) => (
            <div key={fact.label} className="bg-background/90 px-5 py-4">
              <dt className="font-mono text-label text-text-secondary">{fact.label}</dt>
              <dd className="mt-1 text-small font-medium text-text-primary">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
