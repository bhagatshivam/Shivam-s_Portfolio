import Inline from "../Inline";

// The five-step failure path from the error-injection test. Each step carries a text tag, so
// the story does not depend on colour.
export default function FailurePathFigure({ data }) {
  return (
    <ol className="space-y-0">
      {data.steps.map((step, i) => {
        const last = i === data.steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && <span aria-hidden="true" className="absolute left-[0.9rem] top-8 bottom-0 w-px bg-border-strong" />}
            <span
              aria-hidden="true"
              className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-raised font-mono text-label text-text-primary"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className="text-small font-semibold text-text-primary">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h4>
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[11px] tracking-wider ${
                    last ? "border-status/40 bg-status/10 text-status" : "border-border text-text-secondary"
                  }`}
                >
                  {step.tag}
                </span>
              </div>
              <p className="mt-1.5 text-small text-text-secondary">
                <Inline text={step.text} />
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
