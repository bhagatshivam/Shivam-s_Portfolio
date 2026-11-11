// Visual for projects without a (loadable) screenshot: a spec card on the project's colour.
// The name, what kind of thing it is, and three facts as a checklist, with a line drawing of
// the project's shape beside them. Pure CSS/SVG. The colour is decoration only; all text uses
// the page text colours.
const MOTIFS = {
  // Workflow YAML -> intermediate representation -> documents.
  pipeline: (
    <>
      <rect x="4" y="8" width="30" height="20" rx="3" />
      <rect x="45" y="8" width="30" height="20" rx="3" />
      <rect x="86" y="8" width="30" height="20" rx="3" />
      <rect x="45" y="48" width="30" height="20" rx="3" />
      <path d="M34 18h11M75 18h11M60 28v20M30 18v40h15" />
      <path d="M92 60l5 5 10-10" />
    </>
  ),
  // A phone with lines of text.
  phone: (
    <>
      <rect x="34" y="2" width="52" height="92" rx="9" />
      <path d="M44 22h32M44 34h32M44 46h24M44 58h32M44 70h20" />
    </>
  ),
  // Embedding space: scattered points around a query.
  vectors: (
    <>
      <circle cx="60" cy="48" r="6" className="fill-current" />
      <circle cx="60" cy="48" r="26" />
      <circle cx="60" cy="48" r="44" strokeDasharray="3 5" />
      <circle cx="40" cy="30" r="2.5" className="fill-current" />
      <circle cx="82" cy="36" r="2.5" className="fill-current" />
      <circle cx="74" cy="72" r="2.5" className="fill-current" />
      <circle cx="30" cy="64" r="2.5" className="fill-current" />
      <circle cx="100" cy="70" r="2.5" className="fill-current" />
    </>
  ),
  // An open book.
  pages: (
    <>
      <path d="M60 18C48 10 30 10 14 14v62c16-4 34-4 46 4 12-8 30-8 46-4V14c-16-4-34-4-46 4z" />
      <path d="M60 18v62M26 30h22M26 42h22M72 30h22M72 42h22" />
    </>
  ),
  // A document with a highlighted answer.
  document: (
    <>
      <path d="M32 4h40l18 18v70H32z" />
      <path d="M72 4v18h18M42 38h38M42 50h38M42 74h26" />
      <rect x="40" y="58" width="42" height="9" rx="2" className="fill-current opacity-40" />
    </>
  ),
  grid: (
    <>
      <rect x="20" y="8" width="80" height="80" rx="3" />
      <path d="M20 35h80M20 61h80M47 8v80M73 8v80" />
      <rect x="47" y="35" width="26" height="26" className="fill-current opacity-40" />
    </>
  ),
  eye: (
    <>
      <path d="M8 48c14-22 30-32 52-32s38 10 52 32c-14 22-30 32-52 32S22 70 8 48z" />
      <circle cx="60" cy="48" r="14" />
      <circle cx="60" cy="48" r="5" className="fill-current" />
    </>
  ),
};

export default function ProjectVisual({ project }) {
  const { visual } = project;
  return (
    <div
      className="relative flex h-full min-h-[13rem] flex-col justify-between gap-6 overflow-hidden rounded-lg border border-border bg-surface p-5 sm:min-h-[16rem]"
      style={{ "--pv": visual.accent }}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--pv)" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(22rem 12rem at 100% 100%, color-mix(in srgb, var(--pv) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-label text-text-secondary">{visual.kicker}</p>
          <p aria-hidden="true" className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary [overflow-wrap:anywhere]">
            {project.shortTitle}
          </p>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 120 96"
          className="w-20 shrink-0 fill-none stroke-current sm:w-24"
          style={{ color: "var(--pv)" }}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MOTIFS[visual.motif]}
        </svg>
      </div>

      <ul className="relative space-y-1.5 text-small text-text-primary">
        {visual.facts.map((fact) => (
          <li key={fact} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="tick mt-[0.2em] shrink-0" style={{ color: "var(--pv)" }} />
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}
