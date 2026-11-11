// Study and work on one timeline, most recent first (order is the array order). The November
// 2026 CVs are the source of truth for dates, titles and wording.
//
//   kind     "education" | "work" | "milestone"
//   period   display text
//   details  bullets for education and work entries
//   to       milestones only: the page the one-liner links to

export const workFraming =
  "Part-time work alongside the MSc. Not software, but it is where I learned to be reliable under time pressure and to ask when I don't know.";

export const experience = [
  {
    id: "msc-advanced-computer-science",
    kind: "education",
    period: "Sep 2025 – Sep 2026",
    title: "MSc Advanced Computer Science",
    org: "University of Manchester",
    location: "Manchester",
    note: "Graduating December 2026",
    details: [
      "Global Talent Scholarship recipient; elected Academic Representative for the MSc cohort, the student voice to faculty.",
      "Dissertation: What Is My CI Pipeline Doing?, a CI documentation tool with a pre-registered evaluation. Submitted September 2026.",
      "Modules: Software Security, Security & Privacy in AI, NLP & Large Language Models, Topics in Machine Learning.",
    ],
  },
  {
    id: "vach-built",
    kind: "milestone",
    period: "Oct 2026",
    title: "Vach built, installed, in daily use",
    to: "/projects/vach",
  },
  {
    id: "tesco",
    kind: "work",
    period: "Sep 2026 – present",
    title: "Online Order Picker, part-time",
    org: "Tesco",
    location: "Altrincham",
    details: [
      "Pick and check online grocery orders accurately at pace; trace missing stock and escalate correctly; help customers on the shop floor.",
    ],
  },
  {
    id: "dissertation-submitted",
    kind: "milestone",
    period: "Sep 2026",
    title: "MSc dissertation submitted",
    to: "/projects/ci-pipeline-docs",
  },
  {
    id: "subway",
    kind: "work",
    period: "May – Oct 2026",
    title: "Team Member, part-time",
    org: "Subway",
    location: "Manchester",
    details: [
      "Prepared made-to-order food and ran the till in a three-person team during rush periods; stock rotation and opening/closing to food-safety standards.",
    ],
  },
  {
    id: "storywanderer-live",
    kind: "milestone",
    period: "2025",
    title: "StoryWanderer deployed in beta",
    to: "/projects/storywanderer",
  },
  {
    id: "be-computer-engineering",
    kind: "education",
    period: "2021 – 2025",
    title: "B.E. Computer Engineering, Honours in AI & Machine Learning",
    org: "Savitribai Phule Pune University",
    location: "Pune, India",
    details: [
      "CGPA 8.35/10 (75.2%), First Class with Distinction, equivalent to a UK First.",
      "Final-year project: Ask the Doc, a document summarisation and question-answering assistant.",
    ],
  },
];
