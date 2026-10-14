import { Mail, FileText } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "../ui/icons";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import { site } from "../../data/site";
import { useAssetExists } from "../../hooks/useAssetExists";

const ROW = "flex items-center gap-4 card rounded-lg border p-4";
const ICON = "flex h-9 w-9 items-center justify-center rounded-full border border-border text-accent";

function ContactRow({ icon, label, value, href, external = true }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${ROW} border-border hover:border-accent/50`}
    >
      <span className={ICON}>{icon}</span>
      <span className="flex flex-col items-start">
        <span className="font-mono text-label text-text-secondary">{label}</span>
        <span className="text-small text-text-primary">{value}</span>
      </span>
    </a>
  );
}

// The CV row degrades to an inactive row if the PDF is not there yet.
function CvRow() {
  const exists = useAssetExists(site.contact.cv, "application/pdf", true);
  const icon = <FileText size={18} aria-hidden="true" />;

  if (!exists) {
    return (
      <div className={`${ROW} border-dashed border-border-strong`}>
        <span className={ICON}>{icon}</span>
        <span className="flex flex-col items-start">
          <span className="font-mono text-label text-text-secondary">CV</span>
          <span className="text-small text-text-secondary">Not available yet</span>
        </span>
      </div>
    );
  }
  return <ContactRow icon={icon} label="CV" value="Download (PDF)" href={site.contact.cv} />;
}

export default function Contact() {
  return (
    <div className="section-y page-container">
      <SectionHeader id="contact-title" number="05" title="Contact" />

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <p className="max-w-[28ch] text-lead text-text-primary">{site.contactIntro}</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-body font-semibold text-accent-ink hover:bg-accent/90"
          >
            <Mail size={16} aria-hidden="true" />
            Email me
          </a>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="flex flex-col gap-3">
            <li>
              <ContactRow
                icon={<Mail size={18} aria-hidden="true" />}
                label="Email"
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
                external={false}
              />
            </li>
            <li>
              <ContactRow
                icon={<LinkedinGlyph size={18} />}
                label="LinkedIn"
                value={site.contact.linkedinLabel}
                href={site.contact.linkedin}
              />
            </li>
            <li>
              <ContactRow
                icon={<GithubGlyph size={18} />}
                label="GitHub"
                value={site.contact.githubLabel}
                href={site.contact.github}
              />
            </li>
            <li>
              <CvRow />
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
