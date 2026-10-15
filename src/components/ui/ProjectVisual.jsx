// Branded card visual for projects without a (loadable) screenshot: kicker, product name and
// three key facts on the project's accent, beside a small SVG motif. Pure CSS/SVG. The accent
// is decoration only (glow, rule, motif); all text uses the page text colours.
const MOTIFS = {
  // Workflow YAML -> intermediate representation -> documents.
  pipeline: (
    <>
      <rect x="4" y="8" width="30" height="20" rx="4" />
      <rect x="45" y="8" width="30" height="20" rx="4" />
      <rect x="86" y="8" width="30" height="20" rx="4" />
      <rect x="45" y="48" width="30" height="20" rx="4" />
      <path d="M34 18h11M75 18h11M60 28v20M30 18v40h15" />
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
};

export default function ProjectVisual({ project }) {
  const { visual } = project;
  return (
    <div
      className="relative flex h-full min-h-[11rem] sm:min-h-[14rem] items-stretch gap-3 overflow-hidden p-5"
      style={{
        "--pv": visual.accent,
        backgroundImage:
          "radial-gradient(26rem 14rem at 100% 0%, color-mix(in srgb, var(--pv) 28%, transparent), transparent 70%), linear-gradient(to right, color-mix(in srgb, var(--pv) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--pv) 8%, transparent) 1px, transparent 1px)",
        backgroundSize: "auto, 24px 24px, 24px 24px",
      }}
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1" style={{ background: "var(--pv)" }} />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <p className="font-mono text-label text-text-secondary">{visual.kicker}</p>
          <p aria-hidden="true" className="mt-1.5 text-2xl font-semibold leading-tight tracking-tight text-text-primary [overflow-wrap:anywhere]">
            {project.shortTitle}
          </p>
        </div>
        <ul className="space-y-1 text-small text-text-primary">
          {visual.facts.map((fact) => (
            <li key={fact} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--pv)" }} />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 120 96"
        className="relative z-10 hidden w-24 shrink-0 self-center fill-none stroke-current sm:block"
        style={{ color: "var(--pv)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {MOTIFS[visual.motif]}
      </svg>
    </div>
  );
}
