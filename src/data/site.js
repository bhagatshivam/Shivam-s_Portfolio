// Site-wide copy. Wording matches the November 2026 CVs: never "graduated", never "available
// now", visa kept to one small line.

export const site = {
  // Used in the navbar, the hero heading and the page titles.
  name: "Shivam Bhagat",
  title: "Shivam Bhagat | Software Engineer",
  // Under 160 characters.
  metaDescription:
    "Software engineer, MSc Advanced Computer Science at the University of Manchester. Builds developer tools, reading apps and LLM systems, and proves they work.",

  // Hero. The headline is the one thing on the page allowed to be loud.
  heroHeadline: ["Working software,", "with the numbers to show it."],
  heroLead:
    "Developer tools, reading apps and LLM systems, each shipped with tests, CI and a measured result. MSc Advanced Computer Science at the University of Manchester, graduating December 2026.",
  // Proof chips under the lead; `project` links to that project's page when it has one.
  heroChips: [
    { project: "ci-pipeline-docs", label: "95.5% fact recall", detail: "dissertation tool, pre-registered evaluation" },
    { project: "vach", label: "Shipped", detail: "Vach, an offline Android reader, built solo" },
    { project: "storywanderer", label: "Live", detail: "StoryWanderer, a full-stack publishing platform" },
  ],
  // Facts strip under the hero.
  heroFacts: [
    { label: "Study", value: "MSc Advanced Computer Science, University of Manchester" },
    { label: "Before that", value: "B.E. Computer Engineering (Honours in AI & ML), Pune" },
    { label: "Looking for", value: "Graduate or junior software engineering roles in the UK" },
    { label: "Right to work", value: "UK Graduate visa (2 years)" },
  ],

  // Exact wording; keep identical on the site, CV and LinkedIn.
  availability: "Open to graduate and junior software engineering roles in the UK",

  contact: {
    email: "bhagatshivam082@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivam-bhagat/",
    linkedinLabel: "linkedin.com/in/shivam-bhagat",
    github: "https://github.com/bhagatshivam",
    githubLabel: "github.com/bhagatshivam",
    cv: "/Shivam_Bhagat_CV.pdf",
  },

  contactHeadline: "Let's build something that works.",
  contactIntro:
    "I'm looking for a graduate or junior software engineering role in the UK, in a team that cares about reliable products. If that's you, I'd like to hear from you.",

  // About: what the projects have in common, and the person behind them.
  aboutLead:
    "I came to Manchester from Pune, India, for the MSc. The three things I've shipped since all started as something I wanted to exist: a tool that documents CI pipelines so the docs stop going stale, a reading app without ads, and a place to publish serialised fiction.",
  aboutBody: [
    "The habit that runs through all of them is checking. My dissertation spent as much effort on evaluation as on the tool itself: 201 facts written down before any output existed, a baseline to beat, and a public file listing what the tool still gets wrong. I'd rather say less and have every claim hold up.",
    "I work in small, reviewable pull requests, write the tests first when I can, and use AI coding tools the way I'd use a very fast junior colleague: with a plan, a review, and credit in the commit message.",
  ],
  // Beyond the code. Each one is true, specific and short.
  beyond: [
    {
      id: "writing",
      title: "I write fantasy",
      text: "Under the pen name BookWanderer. Vach and StoryWanderer both exist because I read and write a lot of long-form fiction.",
    },
    {
      id: "karate",
      title: "Karate black belt",
      text: "Earned early, and the reason I'm comfortable with slow, repetitive practice until something is right.",
    },
    {
      id: "reading",
      title: "Anime and novels",
      text: "Mostly fantasy with a proper magic system. Ask me about hard versus soft magic and I'll talk for a while.",
    },
    {
      id: "languages",
      title: "Three languages",
      text: "English (C1), Hindi and Marathi. Currently also learning guitar, badly, and cooking my way round Manchester.",
    },
  ],

  // The three numbers that summarise the dissertation evaluation (Table 3.2, §3.2).
  proofStrip: [
    { value: "95.5%", label: "of 201 pre-registered facts captured, with zero false statements" },
    { value: "53.2%", label: "for the same LLM handed the raw YAML instead" },
    { value: "439", label: "automated tests across 38 modules, run in CI on every push" },
  ],
};
