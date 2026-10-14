import { Step, Arrow } from "./parts";

// StoryWanderer's layers. An inline SVG from the sm breakpoint up; below that, the same
// content as stacked HTML so the text stays full size at 375px. Only elements named in the
// approved facts appear: client stack, Supabase (Postgres, auth, real-time sync), row-level
// security, the comment_authors security view, tsvector search columns, Vercel hosting.
// TODO(confirm): table names and the chapter-release scheduling piece (design or built).

const layers = [
  { label: "Browser", body: "React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · custom long-form reading UI" },
  { label: "Supabase", body: "Authentication · PostgreSQL · real-time data sync" },
  { label: "Inside PostgreSQL", body: "Row-level security policies · comment_authors security view · stored tsvector columns for full-text search" },
];

export default function StoryWandererArchitectureFigure() {
  return (
    <>
      {/* sm and up: SVG */}
      <svg
        role="img"
        aria-labelledby="sw-arch-title"
        viewBox="0 0 720 330"
        className="mx-auto hidden h-auto w-full max-w-3xl sm:block"
        fontFamily="Inter Variable, Inter Fallback, system-ui, sans-serif"
      >
        <title id="sw-arch-title">
          StoryWanderer architecture: a React and TypeScript browser app talks to Supabase (authentication, PostgreSQL, real-time
          sync). PostgreSQL holds row-level security policies, the comment_authors security view and tsvector search columns. The
          app is deployed on Vercel.
        </title>

        {/* Vercel hosting boundary around the browser app */}
        <rect x="8" y="8" width="704" height="84" rx="12" fill="none" stroke="rgb(var(--color-border-strong))" strokeDasharray="5 5" />
        <text x="24" y="30" fontSize="13" fill="rgb(var(--color-text-secondary))" fontFamily="IBM Plex Mono, monospace">Deployed on Vercel</text>
        <rect x="24" y="38" width="672" height="44" rx="8" fill="rgb(var(--color-surface-raised))" stroke="rgb(var(--color-accent))" />
        <text x="360" y="65" textAnchor="middle" fontSize="15" fill="rgb(var(--color-text-primary))">
          React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui
        </text>

        <path d="M360 82v36" stroke="rgb(var(--color-accent))" strokeWidth="2" />
        <path d="M353 110l7 9 7-9" fill="none" stroke="rgb(var(--color-accent))" strokeWidth="2" />

        {/* Supabase */}
        <rect x="8" y="124" width="704" height="198" rx="12" fill="none" stroke="rgb(var(--color-border-strong))" />
        <text x="24" y="146" fontSize="13" fill="rgb(var(--color-text-secondary))" fontFamily="IBM Plex Mono, monospace">Supabase</text>

        <rect x="24" y="156" width="206" height="54" rx="8" fill="rgb(var(--color-surface-raised))" stroke="rgb(var(--color-border-strong))" />
        <text x="127" y="188" textAnchor="middle" fontSize="15" fill="rgb(var(--color-text-primary))">Authentication</text>

        <rect x="244" y="156" width="214" height="54" rx="8" fill="rgb(var(--color-surface-raised))" stroke="rgb(var(--color-border-strong))" />
        <text x="351" y="188" textAnchor="middle" fontSize="15" fill="rgb(var(--color-text-primary))">Real-time data sync</text>

        <rect x="24" y="224" width="672" height="86" rx="8" fill="rgb(var(--color-surface-raised))" stroke="rgb(var(--color-accent))" />
        <text x="40" y="248" fontSize="13" fill="rgb(var(--color-accent))" fontFamily="IBM Plex Mono, monospace">PostgreSQL</text>
        <text x="40" y="272" fontSize="15" fill="rgb(var(--color-text-primary))">Row-level security policies</text>
        <text x="40" y="294" fontSize="15" fill="rgb(var(--color-text-primary))">comment_authors security view · stored tsvector columns (search)</text>
      </svg>

      {/* below sm: the same layers, stacked */}
      <ol className="sm:hidden">
        {layers.map((layer, i) => (
          <span key={layer.label}>
            {i > 0 && <Arrow />}
            <Step label={layer.label}>{layer.body}</Step>
          </span>
        ))}
        <Arrow />
        <Step label="Hosting" dashed>
          Deployed on Vercel.
        </Step>
      </ol>
    </>
  );
}
