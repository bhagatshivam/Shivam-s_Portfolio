import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { site } from "../../data/site";
import CvLink from "../ui/CvLink";

const navLinks = [
  { label: "Work", hash: "#projects" },
  { label: "Skills", hash: "#skills" },
  { label: "Experience", hash: "#experience" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

const linkClass = "text-small text-text-secondary hover:text-text-primary";

export default function Navbar() {
  // The menu is open only for the location it was opened at, so any navigation closes it.
  const [openedAt, setOpenedAt] = useState(null);
  const { key } = useLocation();
  const menuOpen = openedAt === key;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setOpenedAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-accent focus:px-3 focus:py-1.5 focus:text-small focus:text-accent-ink"
      >
        Skip to content
      </a>

      <div className="page-container flex h-14 items-center justify-between gap-4">
        <Link to="/" className="text-small font-semibold text-text-primary">
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.hash} to={{ pathname: "/", hash: link.hash }} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CvLink variant="nav" />
          <button
            type="button"
            className="rounded-md p-2 text-text-primary md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setOpenedAt(menuOpen ? null : key)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border bg-background md:hidden">
          <ul className="page-container py-2">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <Link
                  to={{ pathname: "/", hash: link.hash }}
                  className="block py-3 text-body text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
