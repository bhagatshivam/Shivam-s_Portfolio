// Study and work on one timeline, most recent first (order is the array order). The CV is the
// source of truth for dates, titles and wording.
//
//   kind     "education" | "work" | "milestone"
//   period   display text
//   details  bullets for education and work entries
//   to       milestones only: the page the one-liner links to

export const workFraming =
  "Worked alongside my MSc: reliability, accuracy under time pressure, and team coordination.";

export const experience = [
  {
    id: "tesco",
    kind: "work",
    period: "Sep 2026 – Present",
    title: "Online Order Picker (Dotcom)",
    org: "Tesco",
    location: "Altrincham",
    details: [
      "Pick items for customer online orders, moving around the whole store to find and collect each product accurately.",
      "Check the warehouse when an item isn't on the shop-floor aisle, and escalate to the floor manager when it still can't be found.",
      "Rearrange and restock products on the aisles before rush hour; guide customers to products or find items for them.",
    ],
  },
  {
    id: "vach-built",
    kind: "milestone",
    period: "Oct 2026",
    title: "Vach built, in daily use",
    to: "/projects/vach",
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
    period: "May 2026 – Oct 2026",
    title: "Sandwich Artist / Team Member",
    org: "Subway",
    location: "Manchester",
    details: [
      "Prepared the full menu to order during high-volume rush periods, working in a 3-person team to keep service fast and accurate.",
      "Operated the till (cash and card), and replenished and rotated stock to keep products fresh and well presented.",
      "Carried out store opening and closing procedures and kept the store to food safety and hygiene standards (Food Safety & Allergens certified).",
    ],
  },
  {
    id: "msc-advanced-computer-science",
    kind: "education",
    period: "Sep 2025 – Sep 2026",
    // TODO(confirm): check the exact programme title against degree paperwork. The CV says
    // "Advanced Computer Science"; the dissertation cover page says "Computer Science".
    title: "MSc Advanced Computer Science",
    org: "University of Manchester",
    location: "Manchester",
    details: [
      "Global Talent Scholarship recipient; Academic Representative facilitating student-faculty communication.",
      "Dissertation submitted; all coursework complete; results expected November 2026, degree conferral December 2026.",
      "Relevant modules: Transforming Text into Meaning (NLP/LLMs/RAG), Security & Privacy in Artificial Intelligence, Software Security, Topics in Machine Learning.",
    ],
  },
  {
    id: "be-computer-engineering",
    kind: "education",
    period: "Sep 2021 – Jun 2025",
    title: "B.E. Computer Engineering",
    org: "Savitribai Phule Pune University",
    location: "Pune, India",
    details: ["CGPA 8.35/10, First Class.", "Final-year project: Ask the Doc."],
  },
];
