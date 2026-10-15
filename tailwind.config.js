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
        mono: fonts.mono,
      },
      fontSize,
      maxWidth: { page: layout.maxWidth },
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
        },
        // Visible keyboard focus on every link, button and control.
        ":focus-visible": {
          outline: "2px solid rgb(var(--color-accent))",
          outlineOffset: "3px",
        },
        "::selection": {
          backgroundColor: "rgb(var(--color-accent) / 0.3)",
        },
        "[id]": { scrollMarginTop: "4.5rem" },
        // Long tokens (identifiers, repo URLs) wrap instead of overflowing at large text sizes.
        "code, a": { overflowWrap: "anywhere" },
        "p, li, h1, h2, h3, h4": { overflowWrap: "break-word" },
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
          transitionDuration: "200ms",
          transitionTimingFunction: "ease-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px -12px rgb(var(--color-accent) / 0.35)",
          },
        },
        // Alternating section background. Cards sit on surface, or on surface-raised in a band.
        ".band": { backgroundColor: "rgb(var(--color-band))" },
        ".card": { backgroundColor: "rgb(var(--color-surface))" },
        ".band .card": { backgroundColor: "rgb(var(--color-surface-raised))" },
        ".section-y": {
          paddingBlock: layout.sectionY.base,
          [`@media (min-width: ${md})`]: { paddingBlock: layout.sectionY.md },
        },
      });
    }),
  ],
};
