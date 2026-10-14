import { FileText } from "lucide-react";
import { site } from "../../data/site";
import { useAssetExists } from "../../hooks/useAssetExists";

const STYLES = {
  hero: {
    link: "inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-body font-medium text-text-primary hover:border-accent hover:bg-accent/10",
    missing:
      "inline-flex items-center gap-2 rounded-md border border-dashed border-border-strong px-5 py-3 text-body font-medium text-text-secondary",
  },
  nav: {
    link: "rounded-md border border-accent px-3 py-1.5 text-small font-medium text-accent hover:bg-accent hover:text-accent-ink",
    missing:
      "rounded-md border border-dashed border-border-strong px-3 py-1.5 text-small font-medium text-text-secondary",
  },
};

// CV download that degrades gracefully: if the PDF is not there (or the host answers with
// index.html instead of a PDF) it becomes a clearly inactive label instead of a dead link.
export default function CvLink({ variant = "hero" }) {
  const exists = useAssetExists(site.contact.cv, "application/pdf", true);
  const styles = STYLES[variant];

  if (!exists) {
    return (
      <span className={styles.missing} title="The CV PDF is not available yet">
        {variant === "hero" && <FileText size={16} aria-hidden="true" />}
        {variant === "hero" ? "Download CV" : "CV"}
        <span className="sr-only"> (not available yet)</span>
      </span>
    );
  }

  return (
    <a href={site.contact.cv} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {variant === "hero" && <FileText size={16} aria-hidden="true" />}
      {variant === "hero" ? "Download CV" : "CV"}
    </a>
  );
}
