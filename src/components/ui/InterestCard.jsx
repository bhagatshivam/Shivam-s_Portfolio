import { BookOpen, Mountain, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const iconMap = {
  BookOpen: BookOpen,
  Mountain: Mountain,
  Sparkles: Sparkles,
};

export default function InterestCard({ interest, index }) {
  const Icon = iconMap[interest.icon];

  return (
    <Reveal delay={index * 0.05}>
      <article className="hover-lift h-full rounded-xl border border-border bg-surface p-6 hover:border-accent/50">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-raised">
          <Icon size={20} aria-hidden="true" className="text-accent" />
        </div>

        <h3 className="mb-2 text-h3 text-text-primary">{interest.title}</h3>
        <p className="mb-4 text-small text-text-secondary">{interest.blurb}</p>

        <p className="border-t border-border pt-3 font-mono text-label text-text-secondary">
          {interest.favorite}
        </p>
      </article>
    </Reveal>
  );
}
