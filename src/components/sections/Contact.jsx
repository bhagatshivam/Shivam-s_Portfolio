import { Mail, FileText } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "../ui/icons";
import SectionHeader, { SectionShell } from "../ui/SectionHeader";
import { site } from "../../data/site";
import { useAssetExists } from "../../hooks/useAssetExists";

function Row({ icon, label, value, href, external = true }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-between gap-4 py-4 hover:text-accent"
    >
      <span className="flex items-center gap-3">
        <span className="text-text-secondary group-hover:text-accent">{icon}</span>
        <span className="font-display text-small font-semibold text-text-primary group-hover:text-accent">{label}</span>
      </span>
      <span className="min-w-0 truncate text-small text-text-secondary">{value}</span>
    </a>
  );
}

function CvRow() {
  const exists = useAssetExists(site.contact.cv, "application/pdf", true);
  if (!exists) {
    return (
      <div className="flex items-center justify-between gap-4 py-4 text-text-secondary">
        <span className="flex items-center gap-3">
          <FileText size={18} aria-hidden="true" />
          <span className="font-display text-small font-semibold">CV</span>
        </span>
        <span className="text-small">Not available yet</span>
      </div>
    );
  }
  return <Row icon={<FileText size={18} aria-hidden="true" />} label="CV" value="PDF, two pages" href={site.contact.cv} />;
}

export default function Contact() {
  return (
    <SectionShell header={<SectionHeader id="contact-title" title="Contact" />}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        <div>
          <p className="text-h3 text-text-primary">{site.contactHeadline}</p>
          <p className="mt-4 max-w-[52ch] text-body text-text-secondary">{site.contactIntro}</p>
          <a href={`mailto:${site.contact.email}`} className="btn btn-primary mt-7">
            <Mail size={16} aria-hidden="true" />
            Email {site.contact.email}
          </a>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          <li>
            <Row icon={<Mail size={18} aria-hidden="true" />} label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} external={false} />
          </li>
          <li>
            <Row icon={<LinkedinGlyph size={18} />} label="LinkedIn" value={site.contact.linkedinLabel} href={site.contact.linkedin} />
          </li>
          <li>
            <Row icon={<GithubGlyph size={18} />} label="GitHub" value={site.contact.githubLabel} href={site.contact.github} />
          </li>
          <li>
            <CvRow />
          </li>
        </ul>
      </div>
    </SectionShell>
  );
}
