import { caseStudies } from "./src/data/caseStudies.js";
import { homeMeta, caseStudyTitle, absoluteUrl, OG_IMAGE, personJsonLd, SITE_URL } from "./src/data/seo.js";

// Build-time SEO:
//  - fills the %PLACEHOLDERS% in index.html (title, description, canonical, Open Graph, JSON-LD)
//  - writes a static copy of index.html for each case-study route with that route's own head,
//    (projects/vach.html, ...) so crawlers and link previews that do not run JavaScript still
//    see the right title, description and og:url. With cleanUrls on, Vercel serves
//    projects/vach.html at /projects/vach; the SPA rewrite in vercel.json is the fallback.
//  - preloads the one critical font (Inter, Latin) and inlines the stylesheet into the HTML,
//    which removes the render-blocking CSS request and the HTML -> CSS -> font chain
//  - emits robots.txt and sitemap.xml
// Everything comes from src/data (site.js, caseStudies.js, seo.js) and site.config.js.

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const routes = [
  homeMeta,
  ...caseStudies.map((c) => ({
    path: `/projects/${c.slug}`,
    title: caseStudyTitle(c.title),
    description: c.description,
    type: "article",
  })),
];

function fill(html, meta) {
  const values = {
    "%SEO_TITLE%": esc(meta.title),
    "%SEO_DESCRIPTION%": esc(meta.description),
    "%SEO_URL%": esc(absoluteUrl(meta.path)),
    "%SEO_TYPE%": meta.type,
    "%OG_IMAGE%": esc(OG_IMAGE.url),
    "%OG_IMAGE_ALT%": esc(OG_IMAGE.alt),
    "%JSON_LD%": JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
  };
  return Object.entries(values).reduce((out, [key, value]) => out.split(key).join(value), html);
}

export default function sitePlugin() {
  return {
    name: "site-seo",
    enforce: "post",

    // Dev server: fill the home head. (For the build, filling happens in generateBundle.)
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        return ctx.server ? fill(html, homeMeta) : html;
      },
    },

    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index) return;
      let template = index.source.toString();

      // Preload the critical font.
      const font = Object.keys(bundle).find((f) => /inter-latin-wght-normal.*\.woff2$/.test(f));
      if (font) {
        template = template.replace(
          "</head>",
          `    <link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />\n  </head>`
        );
      }

      // Inline the stylesheet.
      template = template.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/, (tag, file) => {
        const css = bundle[file];
        if (!css) return tag;
        delete bundle[file];
        return `<style>${css.source.toString()}</style>`;
      });

      index.source = fill(template, homeMeta);
      for (const route of routes.slice(1)) {
        this.emitFile({
          type: "asset",
          fileName: `${route.path.slice(1)}.html`,
          source: fill(template, route),
        });
      }

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          routes.map((r) => `  <url><loc>${esc(absoluteUrl(r.path))}</loc></url>`).join("\n") +
          "\n</urlset>\n",
      });
    },
  };
}
