import { Link } from "react-router";
import { urllib3Output } from "../../data/ciPipelineOutput";
import { site } from "../../data/site";

// The hero's one piece of theatre, and it is real: the first lines the dissertation tool
// wrote for urllib3's CI workflow (deterministic layer, copied verbatim from the repository),
// printed in one after another as if the tool were running, then the evaluation result that
// the whole site rests on. Lite mode shows everything at once.
const SHOWN_LINES = urllib3Output.lines.slice(0, 17);
const STEP = 0.07;

function lineStyle(i) {
  return { "--t": `${0.4 + i * STEP}s` };
}

function Line({ text, index }) {
  if (text === "") return <div className="term-line h-[1.1em]" style={lineStyle(index)} aria-hidden="true" />;
  const heading = /^[A-Z][A-Z ]+$/.test(text);
  return (
    <div
      className={`term-line whitespace-pre-wrap ${heading ? "mt-1 text-night-amber" : text.startsWith("-") ? "text-night-text" : "text-night-text"}`}
      style={lineStyle(index)}
    >
      {heading ? text : text}
    </div>
  );
}

export default function HeroTerminal() {
  const resultDelay = 0.4 + SHOWN_LINES.length * STEP + 0.3;
  const facts = site.proofStrip;

  return (
    <figure className="night relative overflow-hidden rounded-lg border border-night-border shadow-[0_30px_60px_-30px_rgb(var(--color-night)/0.6)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-night-border bg-night-raised px-4 py-2.5 font-display text-label">
        <span className="min-w-0 truncate text-night-muted">
          <span className="text-night-text">what-is-my-pipeline-doing</span>
          <span className="mx-2 text-night-border">/</span>
          urllib3_ci.yml
        </span>
        <span className="shrink-0 text-night-muted">output, no LLM</span>
      </figcaption>

      <pre className="m-0 overflow-x-auto px-4 py-4 font-mono text-[0.78rem] leading-[1.45] sm:text-[0.82rem]">
        <code className="block">
          {SHOWN_LINES.map((text, i) => (
            <Line key={i} text={text} index={i} />
          ))}
        </code>
      </pre>

      <dl
        className="term-line grid grid-cols-3 divide-x divide-night-border border-t border-night-border bg-night-raised"
        style={{ "--t": `${resultDelay}s` }}
      >
        {facts.map((fact, i) => (
          <div key={fact.label} className="px-3 py-3 sm:px-4">
            <dd className={`font-display text-[1.35rem] font-semibold leading-none tracking-tight sm:text-[1.7rem] ${i === 0 ? "text-night-accent" : "text-night-text"}`}>
              {fact.value}
            </dd>
            <dt className="mt-1.5 text-[0.72rem] leading-snug text-night-muted sm:text-[0.78rem]">{fact.label}</dt>
          </div>
        ))}
      </dl>
      <p className="term-line border-t border-night-border px-4 py-2 text-[0.75rem] text-night-muted" style={{ "--t": `${resultDelay + 0.2}s` }}>
        Real output from my dissertation tool on a held-out workflow.{" "}
        <Link to="/projects/ci-pipeline-docs" className="text-night-accent underline-offset-2 hover:underline">
          How it was measured
        </Link>
      </p>
    </figure>
  );
}
