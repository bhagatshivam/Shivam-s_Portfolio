import { interests } from "../../data/interests";
import InterestCard from "../ui/InterestCard";
import SectionHeader from "../ui/SectionHeader";

export default function Interests() {
  return (
    <div className="section-y page-container">
      <SectionHeader id="interests-title" label="Interests" title="When I'm not coding." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {interests.map((interest, index) => (
          <InterestCard key={interest.id} interest={interest} index={index} />
        ))}
      </div>
    </div>
  );
}
