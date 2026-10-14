// Four-layer pipeline with the IR firewall. Built as semantic HTML (not an SVG) so the text
// stays at full size at 375px: source side on top, generation side below; side by side from
// the md breakpoint up.
function Step({ label, children, dashed = false }) {
  return (
    <li className="list-none">
      <div
        className={`rounded-lg border bg-surface-raised px-3.5 py-2.5 ${
          dashed ? "border-dashed border-border-strong" : "border-border-strong"
        }`}
      >
        <p className="font-mono text-label text-accent">{label}</p>
        <div className="mt-1 text-small text-text-secondary">{children}</div>
      </div>
    </li>
  );
}

const Arrow = () => (
  <li aria-hidden="true" className="list-none py-1 text-center font-mono text-label text-text-secondary">
    ↓
  </li>
);

export default function ArchitectureFigure() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-0">
      <div>
        <h3 className="font-mono text-label text-text-secondary">Source side</h3>
        <ol className="mt-3">
          <Step label="Input">
            <code className="font-mono text-text-primary">workflow.yml</code>
          </Step>
          <Arrow />
          <Step label="Layer 1 · Parser">GitHub-Actions-specific.</Step>
          <Arrow />
          <Step label="Layer 2 · Intermediate representation">Platform-agnostic.</Step>
          <Arrow />
          <Step label="Validation gate">12 checks. An error halts the run.</Step>
        </ol>
      </div>

      {/* The firewall: a dashed rule, horizontal when stacked, vertical when side by side. */}
      <div className="relative flex items-center justify-center py-5 md:px-8 md:py-0">
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-dashed border-accent md:inset-x-auto md:inset-y-0 md:left-1/2 md:top-0 md:border-l md:border-t-0" />
        <p className="relative max-w-[12rem] bg-surface px-3 py-1 text-center font-mono text-label text-accent">
          IR firewall: raw YAML never crosses this boundary
        </p>
      </div>

      <div>
        <h3 className="font-mono text-label text-text-secondary">Generation side · no access to source</h3>
        <ol className="mt-3">
          <Step label="Layer 3 · Deterministic generators">
            Markdown fact sheet and Mermaid diagram. Never guesses.
          </Step>
          <Arrow />
          <Step label="Output">
            <span className="text-text-primary">Deterministic document.</span> Complete on its own.
          </Step>
          <Arrow />
          <Step label="Layer 4 · Constrained LLM (optional)" dashed>
            Gemini 2.5 Flash, t=0.2. Rewrites for readability; adds no fact, omits none.
          </Step>
          <Arrow />
          <Step label="Output (optional)" dashed>
            <span className="text-text-primary">Polished document.</span> On failure, falls back to the
            deterministic document.
          </Step>
        </ol>
      </div>
    </div>
  );
}
