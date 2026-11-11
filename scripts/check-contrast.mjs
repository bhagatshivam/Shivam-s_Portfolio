// WCAG 2.1 contrast check for every text/background and accent/background pair the site
// uses. Exits non-zero if any pair is below its threshold.
//   normal text >= 4.5:1, large text and UI components/focus rings >= 3:1
import { colors, darkColors } from "../design-tokens.js";

const channel = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel(n >> 16) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const surfaces = ["background", "band", "surface", "surface-raised"];
const pairs = [];
for (const fg of ["text-primary", "text-secondary", "accent", "status"]) {
  for (const bg of surfaces) pairs.push({ fg, bg, min: 4.5, use: "text" });
}
pairs.push({ fg: "accent-ink", bg: "accent", min: 4.5, use: "text on filled accent button" });
pairs.push({ fg: "accent", bg: "accent-soft", min: 4.5, use: "accent text on soft accent chip" });
pairs.push({ fg: "status", bg: "status-soft", min: 4.5, use: "status text on soft status chip" });
for (const fg of ["night-text", "night-muted", "night-accent", "night-amber"]) {
  pairs.push({ fg, bg: "night", min: 4.5, use: "text on the night surface" });
  pairs.push({ fg, bg: "night-raised", min: 4.5, use: "text on the raised night surface" });
}
for (const bg of surfaces) {
  pairs.push({ fg: "accent", bg, min: 3, use: "focus ring" });
  pairs.push({ fg: "border-strong", bg, min: 3, use: "interactive control border" });
}

let failed = 0;
for (const [label, palette] of [["day", colors], ["night", darkColors]]) {
  console.log(`\n${label}`);
  console.log("foreground".padEnd(16), "background".padEnd(16), "ratio".padStart(6), " need  use");
  for (const { fg, bg, min, use } of pairs) {
    const r = ratio(palette[fg], palette[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(
      fg.padEnd(16), bg.padEnd(16), r.toFixed(2).padStart(6), `${min}:1`.padStart(5), ok ? "PASS" : "FAIL", use
    );
  }
}
if (failed) {
  console.error(`\n${failed} pair(s) below WCAG AA.`);
  process.exit(1);
}
console.log("\nAll pairs meet WCAG AA.");
