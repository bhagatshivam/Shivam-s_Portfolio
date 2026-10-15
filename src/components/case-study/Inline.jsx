// Tiny inline-markup renderer for case-study copy: `code`, **bold**, [label](url).
// Produces React elements (no HTML injection). Only http(s) and mailto links are allowed.
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

const isSafeHref = (href) => /^(https?:|mailto:)/.test(href);

export default function Inline({ text }) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-surface-raised px-1 py-0.5 font-mono text-[0.85em] text-text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link && isSafeHref(link[2])) {
      const external = link[2].startsWith("http");
      return (
        <a
          key={i}
          href={link[2]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-accent underline underline-offset-2 hover:no-underline"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}
