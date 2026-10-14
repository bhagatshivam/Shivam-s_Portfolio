import { Link, useLocation } from "react-router";
import { usePageMeta } from "../hooks/usePageMeta";

// Inside the SPA, so it keeps the navbar. Unknown paths are rewritten to index.html by
// vercel.json (the host answers 200), so the page is marked noindex.
export default function NotFound() {
  const { pathname } = useLocation();
  usePageMeta({
    title: "Page not found | Shivam Bhagat",
    description: "This page does not exist.",
    path: pathname,
    noindex: true,
  });

  return (
    <div className="page-container pb-24 pt-28 md:pt-40">
      <p className="font-mono text-label text-text-secondary">
        <span className="text-accent">404</span> / Not found
      </p>
      <h1 className="mt-3 max-w-3xl text-h2 text-text-primary">This page does not exist.</h1>
      <p className="mt-4 max-w-[60ch] text-body text-text-secondary">
        The address may be mistyped, or the page may have moved.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-small font-medium text-accent-ink hover:bg-accent/90"
        >
          Back to home
        </Link>
        <Link
          to={{ pathname: "/", hash: "#projects" }}
          className="inline-flex items-center rounded-md border border-border-strong px-4 py-2.5 text-small font-medium text-text-primary hover:border-accent"
        >
          Selected work
        </Link>
      </div>
    </div>
  );
}
