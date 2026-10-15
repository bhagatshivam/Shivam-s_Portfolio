import { site } from "../../data/site";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function About() {
  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader id="about-title" number="04" title="About" />
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <p className="max-w-[60ch] text-lead text-text-secondary">{site.about}</p>
          </Reveal>

          {/* The dissertation evaluation numbers (plan §9), the one piece of measured evidence. */}
          <Reveal delay={0.05}>
            <div className="card rounded-xl border border-border p-5 sm:p-6">
              <p className="font-mono text-label text-text-secondary">My dissertation in numbers</p>
              <ul className="mt-4 divide-y divide-border">
                {site.proofStrip.map((item, i) => (
                  <li key={item.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4 first:pt-0 last:pb-0">
                    <span className={`min-w-[5.5rem] text-stat tabular-nums ${i === 0 ? "text-accent" : "text-text-primary"}`}>
                      {item.value}
                    </span>
                    <span className="min-w-0 flex-1 basis-[10rem] text-small text-text-secondary">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
