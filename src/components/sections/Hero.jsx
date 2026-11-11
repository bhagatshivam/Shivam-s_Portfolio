import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { site } from "../../data/site";
import { projects } from "../../data/projects";
import Reveal from "../ui/Reveal";
import CvLink from "../ui/CvLink";
import HeroTerminal from "../ui/HeroTerminal";

function chipTarget(chip) {
  const project = projects.find((p) => p.id === chip.project);
  return project?.caseStudy ? `/projects/${project.caseStudy}` : { pathname: "/", hash: "#projects" };
}

export default function Hero() {
  return (
    <div className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
      <div aria-hidden="true" className="graph-paper absolute inset-0" />

      <div className="page-container relative grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <Reveal immediate>
          <p className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-3 py-1.5 font-display text-label font-semibold text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.availability}
          </p>

          <h1 className="mt-8 text-display text-text-primary">{site.heroHeadline[0]}</h1>
          <p className="mt-3 font-display text-h3 font-medium text-text-secondary">{site.heroRole}</p>

          <p className="mt-6 max-w-[56ch] text-lead text-text-secondary">{site.heroLead}</p>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Three things to check">
            {site.heroChips.map((chip) => (
              <li key={chip.project}>
                <Link
                  to={chipTarget(chip)}
                  className="group inline-flex items-baseline gap-x-2 rounded-md border border-border bg-surface px-3 py-1.5 text-small hover:border-accent"
                >
                  <span className="tick whitespace-nowrap font-display font-semibold text-accent">{chip.label}</span>
                  <span className="text-text-secondary group-hover:text-text-primary">{chip.detail}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={{ pathname: "/", hash: "#projects" }} className="btn btn-primary">
              See the projects
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <CvLink variant="hero" />
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 text-small sm:grid-cols-4">
            {site.heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-label text-text-secondary">{fact.label}</dt>
                <dd className="mt-0.5 font-medium text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal immediate delay={0.15} className="lg:pt-6">
          <HeroTerminal />
        </Reveal>
      </div>
    </div>
  );
}
