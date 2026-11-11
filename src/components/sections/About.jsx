import { site } from "../../data/site";
import SectionHeader, { SectionShell } from "../ui/SectionHeader";

export default function About() {
  return (
    <SectionShell className="band" header={<SectionHeader id="about-title" title="About" />}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        <div>
          <p className="max-w-[58ch] text-lead text-text-primary">{site.aboutLead}</p>
          {site.aboutBody.map((para) => (
            <p key={para} className="mt-5 max-w-[62ch] text-body text-text-secondary">
              {para}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-h4 text-text-primary">Beyond the code</h3>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {site.beyond.map((item) => (
              <li key={item.id} className="py-4">
                <p className="font-display text-body font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 text-small text-text-secondary">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
