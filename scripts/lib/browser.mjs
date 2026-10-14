// Shared helper for the scripts that need a browser (og.mjs, icons.mjs, check-links.mjs).
// Playwright is deliberately NOT a dependency of this project. These scripts use whatever
// Playwright/Chromium is installed on the machine:
//   - `playwright` resolvable from the project, or installed globally (npm i -g playwright)
//   - set CHROMIUM_PATH to use a specific Chromium binary
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function launchChromium() {
  let mod;
  try {
    mod = await import("playwright");
  } catch {
    const globalRoot = execSync("npm root -g").toString().trim();
    mod = await import(pathToFileURL(path.join(globalRoot, "playwright", "index.mjs")).href);
  }
  const { chromium } = mod.default ?? mod;

  const fallback = "/opt/pw-browsers/chromium";
  const executablePath = process.env.CHROMIUM_PATH || (existsSync(fallback) ? fallback : undefined);
  return chromium.launch({ executablePath, args: ["--no-sandbox", "--disable-background-networking"] });
}
