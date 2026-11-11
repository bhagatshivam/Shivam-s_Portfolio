import { useEffect } from "react";
import { OG_IMAGE, absoluteUrl } from "../data/seo";

// Sets (or creates) one <meta>/<link> tag in <head>.
function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
    const [key, val] = selector.match(/\[([^=\]]+)="([^"]+)"\]/).slice(1);
    el.setAttribute(key, val);
  }
  el.setAttribute(attr, value);
}

// Per-route document head: title, description, canonical, Open Graph and Twitter tags.
// The built site also ships a static copy of this head per route (see vite.site-plugin.js)
// for crawlers and link previews that do not run JavaScript; this keeps client-side
// navigation in step.
export function usePageMeta({ title, description, path = "/", type = "website", noindex = false }) {
  useEffect(() => {
    const url = absoluteUrl(path);
    document.title = title;

    setTag('meta[name="description"]', "meta", "content", description);
    setTag('link[rel="canonical"]', "link", "href", url);
    setTag('meta[property="og:title"]', "meta", "content", title);
    setTag('meta[property="og:description"]', "meta", "content", description);
    setTag('meta[property="og:url"]', "meta", "content", url);
    setTag('meta[property="og:type"]', "meta", "content", type);
    setTag('meta[name="twitter:title"]', "meta", "content", title);
    setTag('meta[name="twitter:description"]', "meta", "content", description);
    setTag('meta[property="og:image"]', "meta", "content", OG_IMAGE.url);
    setTag('meta[name="twitter:image"]', "meta", "content", OG_IMAGE.url);

    // 404 pages answer 200 under the SPA rewrite, so tell crawlers not to index them.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setTag('meta[name="robots"]', "meta", "content", "noindex");
    else if (robots) robots.remove();
  }, [title, description, path, type, noindex]);
}
