import Inline from "../Inline";

// Push -> tag -> release, as semantic HTML. Vertical on mobile, horizontal from md up.
export default function VachReleaseFigure({ data }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-3">
      {data.steps.map((step, i) => (
        <li key={step.title} className="contents">
          {i > 0 && (
            <span
              aria-hidden="true"
              className="py-0.5 text-center font-mono text-label text-text-secondary md:flex md:items-center md:py-0"
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
          <div className="flex-1 rounded-lg border border-border-strong bg-surface-raised px-4 py-3">
            <p className="font-mono text-label text-accent">
              {i + 1} · {step.label}
            </p>
            <p className="mt-1 text-small font-semibold text-text-primary">
              <Inline text={step.title} />
            </p>
            <p className="mt-1 text-small text-text-secondary">
              <Inline text={step.text} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
