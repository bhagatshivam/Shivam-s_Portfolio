// Single source of truth for the design system. Read by tailwind.config.js (utilities and
// CSS variables) and by scripts/check-contrast.mjs, so the contrast report can't drift from
// what the site actually uses.
//
// Direction: "Graph paper and ink". The subject is proof: tests that pass, evaluations that
// were written down before the output existed, numbers that hold up. So the page looks like a
// clean engineering notebook: a cool grey-white paper with a faint grid in the hero, deep ink
// text, hairline rules instead of cards, and one green that means "verified" (it is the colour
// of a passing test and of every primary action). Amber is kept for work still in progress.
// One dark surface, "night", is reserved for real program output: the hero's live run of the
// dissertation tool, and the output figures in the case studies.
//
// Type: Bricolage Grotesque for headings and interface text (a grotesk with real character at
// display sizes), Inter for running text, IBM Plex Mono only where the content is code.

export const colors = {
  background: "#F4F6F9",
  // Alternate section background ("band"); cards inside a band use surface-raised.
  band: "#EBEFF4",
  surface: "#FFFFFF",
  "surface-raised": "#FFFFFF",
  // Decorative hairlines and borders.
  border: "#D3D9E3",
  // Borders that identify an interactive control (outline buttons, skill chips): >= 3:1.
  "border-strong": "#737D91",
  "text-primary": "#101828",
  "text-secondary": "#4A5469",
  // "Verified" green: primary actions, links, pass marks.
  accent: "#0B6B4F",
  // Lighter companion for fills behind the accent (chips, highlights).
  "accent-soft": "#D7EFE4",
  // Text on a filled accent surface (buttons).
  "accent-ink": "#FFFFFF",
  // In-progress status.
  status: "#9A5B0B",
  "status-soft": "#FBECD3",

  // The dark surface for real program output.
  night: "#0F172A",
  "night-raised": "#172036",
  "night-border": "#2A3650",
  "night-text": "#E6EBF4",
  "night-muted": "#98A3B8",
  "night-accent": "#5EDBA6",
  "night-amber": "#F3B64B",
};

export const fonts = {
  sans: [
    '"Inter Variable"',
    '"Inter Fallback"',
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    '"Segoe UI"',
    "Roboto",
    '"Noto Sans Devanagari"',
    "sans-serif",
  ],
  display: [
    '"Bricolage Grotesque Variable"',
    '"Bricolage Fallback"',
    '"Bricolage Grotesque"',
    "ui-sans-serif",
    "system-ui",
    "sans-serif",
  ],
  mono: [
    '"IBM Plex Mono"',
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
};

// [font-size, { lineHeight, letterSpacing, fontWeight }]
export const fontSize = {
  display: ["clamp(2.6rem, 1.2rem + 5.2vw, 5.4rem)", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "600" }],
  h2: ["clamp(1.9rem, 1.4rem + 2vw, 2.9rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
  h3: ["clamp(1.35rem, 1.2rem + 0.6vw, 1.7rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
  h4: ["1.125rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
  lead: ["clamp(1.125rem, 1rem + 0.5vw, 1.3rem)", { lineHeight: "1.5" }],
  body: ["1rem", { lineHeight: "1.65" }],
  small: ["0.9rem", { lineHeight: "1.55" }],
  // Dates, chips and other short interface text.
  label: ["0.8rem", { lineHeight: "1.2rem", letterSpacing: "0" }],
  stat: ["clamp(2.4rem, 1.6rem + 2.6vw, 3.6rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "600" }],
};

// Page rhythm. Gutter is 16px at 375px, widening with the viewport.
export const layout = {
  maxWidth: "78rem",
  gutter: { base: "1rem", md: "2rem", lg: "3rem" },
  sectionY: { base: "4.5rem", md: "7rem" },
};
