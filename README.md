# Shivam Bhagat — Portfolio

My personal portfolio: a single-page React site with a home page (hero, projects, skills, experience, about, contact) and a case-study page for each of the larger projects.

**Live site:** https://shivam-s-portfolio-eight.vercel.app (the address is set in [`site.config.js`](site.config.js))

## Stack

| Area | What is used |
|---|---|
| UI | React 19, react-router 7 (client-side routing; the case-study pages load as a separate chunk) |
| Build | Vite 8 with a small build plugin, [`vite.site-plugin.js`](vite.site-plugin.js) |
| Styling | Tailwind CSS 3, with the design tokens in [`design-tokens.js`](design-tokens.js) |
| Icons | lucide-react for interface icons; skill logos are SVG paths copied from `simple-icons` at development time ([`scripts/skill-icons.mjs`](scripts/skill-icons.mjs)), so nothing is loaded from a CDN |
| Fonts | Inter and IBM Plex Mono, Latin subset, from `@fontsource` packages (self-hosted) |
| Hosting | Vercel (`vercel.json`: clean URLs plus a single-page-app rewrite) |

There are no animation libraries. Motion is CSS only, plus one small canvas on the hero. A "lite mode" toggle (bottom right) switches all of it off, and it is on by default when the visitor's system asks for reduced motion.

The build plugin writes, from the data files: a static HTML page for each case study (so link previews and crawlers see the right title and description without running JavaScript), `sitemap.xml`, `robots.txt`, the canonical and Open Graph tags, and the JSON-LD block.

## Running it

Needs Node 22.

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build (also generates the per-route HTML, sitemap and robots.txt) |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | ESLint |
| `npm run check:contrast` | WCAG AA contrast check of every colour pair in `design-tokens.js`; fails if one is below its threshold |
| `npm run check:links` | Crawls a running build (default `http://localhost:4173`, so run `npm run preview` first) and checks every internal and external link |
| `npm run og` | Regenerates `public/og.png` (the Open Graph image) from the tokens and `src/data/site.js` |
| `npm run icons` | Regenerates the favicon set in `public/` |
| `npm run skill-icons` | Regenerates `src/data/skillIconPaths.js` from `simple-icons` after a skill is added |

`check:links`, `og` and `icons` need a Chromium through Playwright. Playwright is deliberately not a dependency of the project: install it globally (`npm i -g playwright`) or set `CHROMIUM_PATH`. See [`scripts/lib/browser.mjs`](scripts/lib/browser.mjs).

## Where the content lives

All wording is data, in `src/data/`. Components only render it.

| File | Holds |
|---|---|
| `site.js` | Name, hero copy, availability line, contact details, About text |
| `projects.js` | The five projects: cards, status, tech chips, links, screenshots |
| `skills.js` | Every skill, its group and the projects that used it (project cards and the Skills section both read this) |
| `experience.js`, `extras.js` | The experience timeline; volunteering and certifications |
| `caseStudies.js` | The case-study pages, as structured sections and blocks |
| `seo.js` | Page titles, descriptions and structured data helpers |
| `skillIconPaths.js` | Generated logo paths; do not edit by hand |

Wherever a statement still needs the owner's confirmation, the code carries a `TODO(confirm)` comment and the page does not state it as fact. Search for `TODO(confirm)` to see them all.

## Setting the production URL

Set `SITE_URL` in [`site.config.js`](site.config.js) (no trailing slash) and rebuild. It feeds the canonical link, the Open Graph tags, `sitemap.xml`, `robots.txt`, the JSON-LD block and `npm run og`.

## The CV

The Download CV buttons point at `public/Shivam_Bhagat_CV.pdf`. If the file is missing, the buttons turn into an inactive "not available" label instead of a dead link. To update the CV, replace that file.

## Adding a case study

1. In `src/data/projects.js`, set `caseStudy: "<slug>"` on the project (and `featured: true` for a home-page card).
2. In `src/data/caseStudies.js`, add an entry with the same `slug` and `projectId`, a `title`, a `summary` (the lede), a `description` (the meta description) and `sections`. The block types are listed at the top of that file: `paragraph`, `subheading`, `list`, `table`, `stats`, `callout` and `figure`.
3. For a diagram, add a component in `src/components/case-study/figures/`, register it in `figures/index.js` and use it with `{ type: "figure", figure: "<id>", caption }`. A figure marked `bare` draws its own frame (the screenshot gallery does this) and may render nothing.
4. Rebuild. The route, the static HTML page, the sitemap entry, the page title and the previous/next links all follow from the data.

## Adding screenshots

Images are optional. A file that is missing is skipped: the project card falls back to a generated visual, and the gallery in the case study is hidden until at least one file exists. Put the files in `public/projects/<project>/` (create the folder) and keep the exact names below.

**Vach** (`public/projects/vach/`, phone screenshots)

- `library.png`
- `reading-sepia.png`
- `reading-night.png`
- `reading-beige.png`
- Optional screen recording: `demo.mp4` with a poster frame `poster.jpg`. It never autoplays.

**StoryWanderer** (`public/projects/storywanderer/`, browser screenshots, 16:10 works best)

- `home.png`
- `reader.png`
- `editor.png`

The names and captions are listed in the `screenshots` arrays in `src/data/projects.js`.

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request and on pushes to `main`: `npm ci`, `npm run lint`, `npm run check:contrast` and `npm run build` on Node 22. Vercel builds a preview for each pull request; production deployment is configured in Vercel, not in this repo.

## Licence

MIT, see [`LICENSE`](LICENSE).
