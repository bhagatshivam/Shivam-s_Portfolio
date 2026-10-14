// Study and work on one timeline, oldest first. The CV is the source of truth for dates,
// titles and wording (SITE_REBUILD_PLAN.md §4).
//
//   kind  "education" | "work" | "milestone"
//   tone  "default" | "light"; work entries render visually lighter than projects
//   period is display text; start is "YYYY-MM" and is only used for ordering

export const workFraming =
  "Worked alongside my MSc. Reliability, accuracy under time pressure, and team coordination.";

export const experience = [
  {
    id: "be-computer-engineering",
    kind: "education",
    tone: "default",
    start: "2021-09",
    period: "Sep 2021 – Jun 2025",
    title: "B.E. Computer Engineering",
    org: "Savitribai Phule Pune University",
    location: "Pune, India",
    summary: "Savitribai Phule Pune University, Pune. CGPA 8.35/10, First Class. Final-year project: Ask the Doc.",
    details: ["CGPA 8.35/10, First Class", "Final-year project: Ask the Doc"],
  },
  {
    id: "msc-advanced-computer-science",
    kind: "education",
    tone: "default",
    start: "2025-09",
    period: "Sep 2025 – Sep 2026",
    // TODO(confirm): check the exact programme title against degree paperwork. The CV says
    // "Advanced Computer Science"; the dissertation cover page says "Computer Science".
    title: "MSc Advanced Computer Science",
    org: "University of Manchester",
    location: "Manchester, UK",
    summary:
      "University of Manchester. Global Talent Scholarship recipient; Academic Representative. Dissertation submitted; results expected Nov 2026, conferral Dec 2026.",
    details: [
      "Global Talent Scholarship recipient",
      "Academic Representative",
      "Dissertation submitted; results expected November 2026, degree conferral December 2026",
    ],
  },
  {
    id: "subway",
    kind: "work",
    tone: "light",
    start: "2026-05",
    period: "May 2026 – Oct 2026",
    title: "Sandwich Artist / Team Member",
    org: "Subway",
    location: "Manchester, UK",
    summary:
      "Subway, Manchester. Fast, accurate service through rush periods in a 3-person team; till handling; full open/close procedures.",
    details: [
      "Fast, accurate service through rush periods in a 3-person team",
      "Till handling and full open/close procedures",
      "Completed Food Safety & Allergens (EMEA) and Sandwich Artist training",
    ],
  },
  {
    id: "tesco",
    kind: "work",
    tone: "light",
    start: "2026-09",
    period: "Sep 2026 – present",
    title: "Online Order Picker (Dotcom)",
    org: "Tesco",
    location: "Altrincham, UK",
    summary:
      "Tesco, Altrincham. Accurate order picking across the whole store, warehouse checks and escalation when items are missing, restocking aisles before rush hour, helping customers on the floor.",
    details: [
      "Accurate order picking across the whole store",
      "Warehouse checks and escalation when items are missing",
      "Restocking aisles before rush hour and helping customers on the floor",
    ],
  },
  {
    id: "dissertation-submitted",
    kind: "milestone",
    tone: "default",
    start: "2026-09",
    period: "Sep 2026",
    title: "Dissertation submitted",
    org: "University of Manchester",
    location: null,
    summary: "MSc dissertation submitted: What Is My CI Pipeline Doing?",
    details: [],
  },
  {
    id: "vach-built",
    kind: "milestone",
    tone: "default",
    start: "2026-10",
    period: "Oct 2026",
    // Source: Shivam, not the CV or the plan.
    title: "Vach built, in daily use",
    org: null,
    location: null,
    summary: "Offline EPUB/PDF reader for Android, in daily use.",
    details: [],
  },
];
