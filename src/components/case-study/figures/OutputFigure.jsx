import { useId } from "react";

// Real deterministic-layer output (verbatim, from the dissertation repo) plus a small SVG of
// the job diagram the tool emits as Mermaid for the same workflow.
function JobDiagram() {
  const titleId = useId().replace(/:/g, "");
  const descId = useId().replace(/:/g, "");

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      viewBox="0 0 340 150"
      className="mx-auto block h-auto w-full max-w-[340px]"
    >
      <title id={titleId}>Job diagram for urllib3's CI workflow</title>
      <desc id={descId}>
        Three jobs. The package job and the test job have no dependencies, and test uses a build
        matrix. The coverage job runs after test and always runs.
      </desc>
      <defs>
        <marker id={`${titleId}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      <rect x="10" y="10" width="120" height="40" rx="6" className="fill-surface-raised stroke-border-strong" />
      <text x="70" y="35" textAnchor="middle" className="fill-text-primary font-mono" fontSize="13">package</text>

      <rect x="10" y="88" width="130" height="52" rx="6" className="fill-surface-raised stroke-border-strong" />
      <text x="75" y="110" textAnchor="middle" className="fill-text-primary font-mono" fontSize="13">test</text>
      <text x="75" y="128" textAnchor="middle" className="fill-text-secondary font-mono" fontSize="11">[matrix]</text>

      <line x1="142" y1="114" x2="196" y2="114" className="stroke-text-secondary" strokeWidth="1.5" markerEnd={`url(#${titleId}-arrow)`} />

      <rect x="200" y="88" width="130" height="52" rx="6" className="fill-surface-raised stroke-border-strong" />
      <text x="265" y="110" textAnchor="middle" className="fill-text-primary font-mono" fontSize="13">coverage</text>
      <text x="265" y="128" textAnchor="middle" className="fill-text-secondary font-mono" fontSize="11">[if: always()]</text>
    </svg>
  );
}

export default function OutputFigure({ data }) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-border-strong bg-surface-raised">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2 font-mono text-label text-text-secondary">
          <span>Deterministic layer · urllib3 CI workflow</span>
          <span>no LLM involved</span>
        </div>
        {/* Scrollable region: focusable so keyboard users can scroll it. */}
        <pre
          tabIndex={0}
          role="region"
          aria-label="Deterministic output for urllib3's CI workflow"
          className="max-h-[30rem] overflow-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-text-primary"
        >
          {data.lines.join("\n")}
        </pre>
      </div>

      <JobDiagram />

      <details className="rounded-lg border border-border bg-surface-raised px-4 py-3 text-small text-text-secondary">
        <summary className="cursor-pointer font-mono text-label text-text-primary">Mermaid source the tool emits</summary>
        <pre tabIndex={0} role="region" aria-label="Mermaid source" className="mt-3 overflow-x-auto font-mono text-[12px] leading-relaxed text-text-primary">
          {data.mermaid.join("\n")}
        </pre>
      </details>

      <p className="font-mono text-label text-text-secondary">
        Copied unedited from <span className="text-text-primary [overflow-wrap:anywhere]">{data.path}</span> in the repository
        (generated {data.generated}).
      </p>
    </div>
  );
}
