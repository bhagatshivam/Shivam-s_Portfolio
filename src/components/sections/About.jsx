import { site } from "../../data/site";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function About() {
  return (
    <div className="section-y">
      <div className="page-container">
        <SectionHeader id="about-title" number="04" label="About" title="About me." />
        <Reveal>
          <p className="max-w-[70ch] text-body text-text-secondary">{site.about}</p>
        </Reveal>
      </div>
    </div>
  );
}
