import { Link } from "react-router";
import { ArrowUp } from "lucide-react";
import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-container flex flex-wrap items-center justify-between gap-4 py-6 font-mono text-label text-text-secondary">
        <p>© 2026 {site.name}</p>
        <Link
          to={{ pathname: "/", hash: "#hero" }}
          className="inline-flex items-center gap-1.5 hover:text-text-primary"
        >
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
