import { SITE_URL } from "../../site.config.js";
import { site } from "./site";

// Page head data shared by the runtime (usePageMeta) and the build (vite.site-plugin.js).
export { SITE_URL };

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "/" : path}`;

export const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: `${site.name}: software engineer, MSc Advanced Computer Science, University of Manchester`,
};

// Case-study routes: "<Project title> | Shivam Bhagat".
export const caseStudyTitle = (title) => `${title} | ${site.name}`;

export const homeMeta = {
  path: "/",
  title: site.title,
  description: site.metaDescription,
  type: "website",
};

// The person block for search engines. Name, site and profiles only: no address, phone or email.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  sameAs: [site.contact.linkedin, site.contact.github],
};
