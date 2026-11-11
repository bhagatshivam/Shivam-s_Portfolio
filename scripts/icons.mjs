// Generates the favicon set from the design tokens:
//   public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png
// Usage: node scripts/icons.mjs   (needs a local Playwright/Chromium, see scripts/lib/browser.mjs)
import { writeFileSync } from "node:fs";
import { colors } from "../design-tokens.js";
import { launchChromium } from "./lib/browser.mjs";

// An "S" monogram drawn as a stroked path, so it renders identically everywhere (no font).
const S_PATH =
  "M43 19 C41 13 36 11 31 11 C24 11 19 15 19 21 C19 28 25 30 32 32 C39 34 45 36 45 43 C45 50 40 54 33 54 C27 54 21 51 20 45";

const svg = ({ rounded }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" ${rounded ? 'rx="14"' : ""} fill="${colors.background}"/>
  <path d="${S_PATH}" fill="none" stroke="${colors.accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

writeFileSync("public/favicon.svg", svg({ rounded: true }));

const browser = await launchChromium();
const page = await browser.newPage();

async function png(file, size, rounded) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg({ rounded })}`
  );
  await page.screenshot({ path: file, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}

await png("public/favicon-32.png", 32, true);
// iOS rounds the corners itself and fills transparency with black, so this one is a full square.
await png("public/apple-touch-icon.png", 180, false);
await browser.close();
console.log("wrote public/favicon.svg, favicon-32.png, apple-touch-icon.png");
