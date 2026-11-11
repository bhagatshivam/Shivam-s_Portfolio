// Leadership, volunteering and certifications, from the November 2026 CVs. Rendered under the
// Experience timeline.

export const leadership = [
  {
    id: "academic-rep",
    org: "University of Manchester",
    role: "Academic Representative, MSc cohort",
    period: "2025 – 2026",
    summary: "Elected voice of the cohort to faculty; raised and followed up on course issues.",
  },
  {
    id: "ieee",
    org: "IEEE Student Club, SPPU",
    role: "Event Organiser",
    period: "2022 – 2024",
    summary: "Co-organised AI/ML workshops and hackathons for 200+ attendees; scheduling, venues and team logistics.",
  },
  {
    id: "volunteering",
    org: "Saday Sadev NGO and National Service Scheme",
    role: "Volunteer",
    period: "2022 – 2025",
    summary: "Outreach content, fundraising support, community and blood-donation drives, time at elderly care homes.",
  },
];

export const certifications = [
  { id: "isc2-cc", name: "Certified in Cybersecurity (CC)", issuer: "ISC2", year: "2024" },
  { id: "python-nptel", name: "Python", issuer: "NPTEL", year: "2024" },
  { id: "version-control-coursera", name: "Version Control", issuer: "Coursera", year: "2023" },
  { id: "web-development-udemy", name: "Web Development", issuer: "Udemy", year: "2025" },
];

// Kept for any component still importing the old name.
export const volunteering = leadership;
