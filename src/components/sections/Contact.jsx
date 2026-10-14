import Reveal from "../ui/Reveal";
import { Mail } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "../ui/icons";
import SectionHeader from "../ui/SectionHeader";
import { site } from "../../data/site";

const contactLinks = [
  {
    icon: "mail",
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: site.contact.linkedinLabel,
    href: site.contact.linkedin,
  },
  {
    icon: "github",
    label: "GitHub",
    value: site.contact.githubLabel,
    href: site.contact.github,
  },
];

function ContactIcon({ type }) {
  if (type === "mail") return <Mail size={18} />;
  if (type === "linkedin") return <LinkedinGlyph size={18} />;
  if (type === "github") return <GithubGlyph size={18} />;
  return null;
}

export default function Contact() {
  return (
    <div className="section-y page-container">
      <SectionHeader id="contact-title" number="04" label="Contact" title="Get in touch." />

      <Reveal className="max-w-xl">
        <p className="mb-8 text-body text-text-secondary">{site.contactIntro}</p>

        <ul className="mb-12 flex flex-col gap-3">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.icon !== "mail" ? "_blank" : undefined}
                rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-4 hover:border-accent/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-accent">
                  <ContactIcon type={link.icon} />
                </span>
                <span className="flex flex-col items-start">
                  <span className="font-mono text-label text-text-secondary">{link.label}</span>
                  <span className="text-small text-text-primary">{link.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="space-y-2 border-t border-border pt-6">
          <p className="font-mono text-label text-text-secondary">
            [ Global Talent Scholar — University of Manchester ]
          </p>
          <p className="font-mono text-label text-text-secondary">
            [ Karate Black Belt — because discipline ships features ]
          </p>
        </div>

        <p className="mt-10 font-mono text-label text-text-secondary">
          © 2026 Shivam Bhagat — Built with React, Vite &amp; too much coffee
        </p>
      </Reveal>
    </div>
  );
}
