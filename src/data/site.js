// Site-wide copy that used to be hardcoded in components. Wording rules: SITE_REBUILD_PLAN.md §1.
// Never "graduated", never "Available now", no graduate-role wording.

export const site = {
  // Used in the navbar, the hero heading and the page titles. The full legal name stays on the CV.
  name: "Shivam Bhagat",
  title: "Shivam Bhagat — Software Engineer",
  metaDescription:
    "Shivam Bhagat, software engineer. MSc Advanced Computer Science, University of Manchester. I build developer tools and AI-backed systems, and I test them properly.",

  // TODO(confirm): exact programme title vs degree paperwork (CV: "Advanced Computer Science").
  degreeLine: "MSc Advanced Computer Science, University of Manchester",
  positioning: "I build developer tools and AI-backed systems, and I test them properly.",

  // Exact wording; keep identical on the site, CV and LinkedIn.
  availability: "Available for full-time software engineering roles in the UK from November 2026",

  // TODO(confirm): check against gov.uk and the real visa timeline (the Graduate Route starts
  // after the Home Office grants it, which follows the university confirming completion).
  // The wording must be true on the day the site goes live. NOT rendered anywhere yet.
  workRights: "Graduate Route right to work, no sponsorship required",

  // Proof strip (not rendered yet). Sources are the dissertation tables in the plan's §9.
  // TODO(confirm): which three numbers lead the strip.
  proofStrip: [
    { value: "95.5%", label: "of 201 pre-registered facts captured (192/201)", source: "Table 3.2" },
    { value: "53.2%", label: "for a naive raw-YAML-to-LLM baseline (107/201)", source: "Table 3.2" },
    { value: "10", label: "held-out pipelines", source: "§3.2" },
  ],

  contact: {
    email: "bhagatshivam082@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivam-bhagat",
    linkedinLabel: "linkedin.com/in/shivam-bhagat",
    github: "https://github.com/bhagatshivam",
    githubLabel: "github.com/bhagatshivam",
    cv: "/Shivam_Bhagat_CV.pdf",
  },

  contactIntro: "I'm looking for full-time software engineering roles in the UK from November 2026.",

  // TODO(confirm): add "Karate black belt" to the last sentence if you want it public.
  about:
    "I'm an MSc Advanced Computer Science student at the University of Manchester. I studied in Pune, India before moving here for the degree. I like building developer tools and small, practical software, and I care about being able to show that it works: my dissertation spent as much effort on evaluation as on the tool. Outside of code I read, hike and watch anime.",
};
