// Renders the 1200x630 Open Graph image from the design tokens: public/og.png
// Usage: node scripts/og.mjs   (needs a local Playwright/Chromium, see scripts/lib/browser.mjs)
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { colors } from "../design-tokens.js";
import { SITE_URL } from "../site.config.js";
import { site } from "../src/data/site.js";
import { launchChromium } from "./lib/browser.mjs";

const font = (pkgFile) => pathToFileURL(path.resolve("node_modules", pkgFile)).href;
const host = new URL(SITE_URL).host;

const html = `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: "Inter Variable"; font-weight: 100 900;
    src: url("${font("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")}") format("woff2-variations"); }
  @font-face { font-family: "IBM Plex Mono"; font-weight: 400;
    src: url("${font("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2")}") format("woff2"); }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: ${colors.background}; color: ${colors["text-primary"]};
    font-family: "Inter Variable", sans-serif; padding: 72px 80px; display: flex; flex-direction: column; }
  .top { display: flex; align-items: center; gap: 24px; font-family: "IBM Plex Mono", monospace;
    font-size: 24px; letter-spacing: 0.04em; color: ${colors.accent}; }
  .top .rule { flex: 1; height: 1px; background: ${colors.border}; }
  main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  h1 { font-size: 112px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; }
  p.line { margin-top: 28px; font-size: 36px; line-height: 1.35; color: ${colors["text-secondary"]}; max-width: 980px; }
  .bottom { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid ${colors.border};
    padding-top: 28px; font-family: "IBM Plex Mono", monospace; font-size: 22px; color: ${colors["text-secondary"]}; }
  .bar { width: 72px; height: 6px; border-radius: 3px; background: ${colors.accent}; }
</style>
<div class="top"><span>Portfolio</span><span class="rule"></span></div>
<main>
  <h1>${site.name}</h1>
  <p class="line">Software engineer · MSc Advanced Computer Science, University of Manchester</p>
</main>
<div class="bottom"><span>${host}</span><span class="bar"></span></div>`;

const dir = mkdtempSync(path.join(tmpdir(), "og-"));
const file = path.join(dir, "og.html");
writeFileSync(file, html);

const browser = await launchChromium();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(file).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("wrote public/og.png (1200x630)");
