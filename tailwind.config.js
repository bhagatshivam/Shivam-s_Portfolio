import plugin from "tailwindcss/plugin";
import { colors, fonts, fontSize, layout } from "./design-tokens.js";

const toChannels = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `${n >> 16} ${(n >> 8) & 255} ${n & 255}`;
};

// Tokens become CSS variables (as RGB channels) so Tailwind's opacity utilities keep working.
const colorVars = Object.fromEntries(
  Object.entries(colors).map(([name, hex]) => [`--color-${name}`, toChannels(hex)])
);
const themeColors = Object.fromEntries(
  Object.keys(colors).map((name) => [name, `rgb(var(--color-${name}) / <alpha-value>)`])
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: themeColors,
      fontFamily: {
        sans: fonts.sans,
        display: fonts.display,
        mono: fonts.mono,
      },
      fontSize,
      maxWidth: { page: layout.maxWidth },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, theme }) {
      addBase({
        ":root": colorVars,
        html: { backgroundColor: "rgb(var(--color-background))" },
        body: {
          backgroundColor: "rgb(var(--color-background))",
          color: "rgb(var(--color-text-primary))",
          fontFamily: fonts.sans.join(", "),
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        },
        // Visible keyboard focus on every link, button and control.
        ":focus-visible": {
          outline: "2px solid rgb(var(--color-accent))",
          outlineOffset: "3px",
        },
        "::selection": {
          backgroundColor: "rgb(var(--color-accent) / 0.2)",
        },
        "[id]": { scrollMarginTop: "4.5rem" },
        // Long tokens (identifiers, repo URLs) wrap instead of overflowing at large text sizes.
        "code, a": { overflowWrap: "anywhere" },
        "p, li, h1, h2, h3, h4": { overflowWrap: "break-word" },
        // Headings are Bricolage Grotesque with optical sizing on.
        ".font-display, h1, h2, h3, h4": {
          fontFamily: fonts.display.join(", "),
          fontOpticalSizing: "auto",
        },
      });

      const md = theme("screens.md");
      const lg = theme("screens.lg");
      addComponents({
        ".page-container": {
          width: "100%",
          maxWidth: layout.maxWidth,
          marginInline: "auto",
          paddingInline: layout.gutter.base,
          [`@media (min-width: ${md})`]: { paddingInline: layout.gutter.md },
          [`@media (min-width: ${lg})`]: { paddingInline: layout.gutter.lg },
        },
        // Cards: hover lift is the only card motion (CSS only). Lite mode removes the transform.
        ".hover-lift": {
          transitionProperty: "transform, border-color, box-shadow",
          transitionDuration: "260ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
        // Alternating section background. Cards sit on surface, or on surface-raised in a band.
        ".band": { backgroundColor: "rgb(var(--color-band))" },
        ".night": {
          backgroundColor: "rgb(var(--color-night))",
          color: "rgb(var(--color-night-text))",
        },
        ".card": {
          backgroundColor: "rgb(var(--color-surface))",
        },
        ".band .card": { backgroundColor: "rgb(var(--color-surface-raised))" },
        ".section-y": {
          paddingBlock: layout.sectionY.base,
          [`@media (min-width: ${md})`]: { paddingBlock: layout.sectionY.md },
        },
        // Buttons share one shape; variants only change colour.
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          borderRadius: "0.375rem",
          paddingInline: "1.15rem",
          paddingBlock: "0.7rem",
          fontFamily: fonts.display.join(", "),
          fontSize: "0.95rem",
          fontWeight: "600",
          lineHeight: "1",
          transitionProperty: "background-color, border-color, color, transform",
          transitionDuration: "180ms",
          "&:active": { transform: "translateY(1px)" },
        },
        ".btn-primary": {
          backgroundColor: "rgb(var(--color-accent))",
          color: "rgb(var(--color-accent-ink))",
          "&:hover": { backgroundColor: "rgb(var(--color-text-primary))" },
        },
        ".btn-outline": {
          border: "1px solid rgb(var(--color-border-strong))",
          color: "rgb(var(--color-text-primary))",
          "&:hover": { borderColor: "rgb(var(--color-text-primary))", backgroundColor: "rgb(var(--color-surface))" },
        },
        ".btn-night": {
          border: "1px solid rgb(var(--color-night-border))",
          color: "rgb(var(--color-night-text))",
          "&:hover": { borderColor: "rgb(var(--color-night-accent))", backgroundColor: "rgb(var(--color-night-raised))" },
        },
      });
    }),
  ],
};
