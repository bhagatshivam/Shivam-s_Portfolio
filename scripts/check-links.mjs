// Crawls the built site in a real browser and checks every link.
//   node scripts/check-links.mjs [baseUrl]        default http://localhost:4173 (vite preview)
// - internal links: the path must serve the app and, for #hash links, the target id must exist
// - external links: checked with curl (HEAD, then GET), following redirects, so the proxy and
//   TLS settings of the machine apply. Redirects are reported; failures exit non-zero.
// - the routes crawled are read from /sitemap.xml
// - mailto: links are listed, not fetched.
// Sites that block automated requests (LinkedIn answers 999) are reported as "blocked" so they
// can be checked by hand rather than counted as broken.
// Needs a local Playwright/Chromium and curl (see scripts/lib/browser.mjs).
import { execFileSync } from "node:child_process";
import { launchChromium } from "./lib/browser.mjs";

const base = (process.argv[2] || "http://localhost:4173").replace(/\/$/, "");
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const curl = (method, url) => {
  const args = ["-sS", "-L", "--max-time", "25", "-A", UA, "-o", "/dev/null", "-w", "%{http_code} %{url_effective} %{num_redirects}"];
  if (method === "HEAD") args.push("-I");
  args.push(url);
  try {
    const [code, finalUrl, redirects] = execFileSync("curl", args, { encoding: "utf8" }).trim().split(" ");
    return { code: Number(code), finalUrl, redirects: Number(redirects) };
  } catch (e) {
    return { code: 0, finalUrl: url, redirects: 0, error: String(e.message).split("\n")[0].slice(0, 80) };
  }
};

// The routes to crawl come from the site's own sitemap.xml (so it is checked as well).
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (routes.length === 0) throw new Error("no routes found in sitemap.xml");

const browser = await launchChromium();
const page = await browser.newPage();
const links = new Map(); // href -> Set(routes it appears on)

for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  // open collapsed content so its links are crawled too
  await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  const found = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
  for (const href of found) {
    if (!links.has(href)) links.set(href, new Set());
    links.get(href).add(route);
  }
  // hash targets that must exist on the page the link lives on
  for (const href of found.filter((h) => h.startsWith("#"))) {
    const ok = await page.evaluate((id) => !!document.getElementById(id), decodeURIComponent(href.slice(1)));
    if (!ok) links.get(href).add("MISSING-TARGET");
  }
}

const rows = [];
for (const [href, where] of links) {
  const pages = [...where].filter((w) => w !== "MISSING-TARGET").join(", ");
  if (href.startsWith("mailto:")) rows.push({ href, status: "mailto (not fetched)", ok: true, pages });
  else if (href.startsWith("#")) rows.push({ href, status: where.has("MISSING-TARGET") ? "target id missing" : "anchor ok", ok: !where.has("MISSING-TARGET"), pages });
  else if (href.startsWith("/")) {
    const r = curl("GET", base + href.split("#")[0]);
    rows.push({ href, status: `${r.code}${r.redirects ? ` (redirect to ${r.finalUrl})` : ""}`, ok: r.code === 200 && !r.redirects, pages });
  } else {
    let r = curl("HEAD", href);
    if (r.code === 0 || r.code >= 400) r = curl("GET", href);
    const blocked = r.code === 999 || r.code === 403 || r.code === 429 || r.code === 0;
    const note = r.redirects ? ` (redirects to ${r.finalUrl})` : "";
    rows.push({ href, status: `${r.code || "no response"}${r.error ? " " + r.error : ""}${note}`, ok: r.code >= 200 && r.code < 400 && !r.redirects, blocked, warn: r.redirects > 0, pages });
  }
}

// pages the site itself advertises
for (const route of routes) {
  const r = curl("GET", base + route);
  rows.push({ href: `${route} (route)`, status: String(r.code), ok: r.code === 200, pages: "-" });
}
await browser.close();

const w = Math.max(...rows.map((r) => r.href.length)) + 2;
for (const r of rows) console.log(`${r.ok ? "ok     " : r.blocked ? "BLOCKED" : r.warn ? "REDIR  " : "FAIL   "} ${r.href.padEnd(w)} ${r.status}`);
const failed = rows.filter((r) => !r.ok && !r.blocked && !r.warn);
const blocked = rows.filter((r) => r.blocked);
const redirected = rows.filter((r) => r.warn);
console.log(`\n${rows.length} links checked | ${failed.length} failed | ${redirected.length} redirected | ${blocked.length} could not be verified from here (check by hand)`);
if (blocked.length) console.log("Check by hand:\n  " + blocked.map((r) => r.href).join("\n  "));
process.exit(failed.length ? 1 : 0);
