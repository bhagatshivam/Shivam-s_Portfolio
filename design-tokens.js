// Single source of truth for the design system. Read by tailwind.config.js (utilities and
// CSS variables) and by scripts/check-contrast.mjs, so the contrast report can't drift from
// what the site actually uses.
//
// Direction: "Quiet Slate". Near-black, one cool accent. The warm "status" colour is for
// status chips only.

export const colors = {
  background: "#0B0D12",
  surface: "#11141B",
  "surface-raised": "#161A23",
  // Decorative hairlines and card borders.
  border: "#232834",
  // Borders that identify an interactive control (outline buttons, skill chips): >= 3:1.
  "border-strong": "#657089",
  "text-primary": "#E8ECF3",
  "text-secondary": "#9AA3B5",
  accent: "#6EA8FF",
  // Text on a filled accent surface (the CV button).
  "accent-ink": "#0B0D12",
  status: "#E5A44C",
};

export const fonts = {
  sans: [
    '"Inter Variable"',
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    '"Segoe UI"',
    "Roboto",
    '"Noto Sans Devanagari"',
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
  display: ["clamp(2.5rem, 1.5rem + 4.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
  h2: ["clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
  h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
  lead: ["clamp(1.125rem, 1rem + 0.7vw, 1.5rem)", { lineHeight: "1.45" }],
  body: ["1rem", { lineHeight: "1.65" }],
  small: ["0.875rem", { lineHeight: "1.55" }],
  // Mono labels, chips and dates.
  label: ["0.75rem", { lineHeight: "1.1rem", letterSpacing: "0.04em" }],
  stat: ["clamp(2.25rem, 1.6rem + 2.4vw, 3rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "600" }],
};

// Page rhythm. Gutter is 16px at 375px, widening with the viewport.
export const layout = {
  maxWidth: "72rem",
  gutter: { base: "1rem", md: "1.5rem", lg: "2rem" },
  sectionY: { base: "4rem", md: "6rem" },
};
