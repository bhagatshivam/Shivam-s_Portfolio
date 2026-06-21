# Shivam Bhagat — Portfolio

A dark, animated single-page portfolio built to showcase projects, skills, and academic journey — designed around a connected, scroll-driven experience rather than a static template.

**Live site:** [shivam-s-portfolio-eight.vercel.app](https://shivam-s-portfolio-eight.vercel.app/)

---

## Overview

This portfolio represents MSc Advanced Computer Science work at the University of Manchester, alongside independent and academic projects spanning AI/ML, full-stack development, and data engineering. The site is built section-by-section around a consistent dark visual language — deep navy background, glowing accent colours, terminal-inspired typography — rather than a generic light-themed resume layout.

## Features

- **Animated hero** — particle constellation background (tsparticles) with a typewriter-style rotating subtitle
- **Scroll-driven journey map** — an SVG path animates its own drawing (GSAP + ScrollTrigger) tracing the route from Pune to Manchester, paired with academic milestone cards
- **Interactive project cards** — 3D tilt-on-hover effect, expandable detail panels with full descriptions, tech stacks, and GitHub links
- **Project → Skills linking** — clicking a project's tech chips jumps to the Skills section and highlights exactly which technologies that project used, connecting proof to claim
- **Icon-based skills grid** — real technology logos grouped by category (AI/ML, Web & Frontend, Languages & Tools)
- **Performance-aware rendering** — a lite-mode toggle disables particle and animation-heavy rendering for lower-powered devices, persisted via `localStorage`
- **Fully responsive** — tested down to 375px mobile viewport
- **Personal interests section** — beyond-the-resume content (reading, hiking, anime) styled to match the site's visual system rather than breaking from it

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion, GSAP (ScrollTrigger) |
| Particles | tsparticles |
| Scroll detection | react-intersection-observer |
| Icons | lucide-react, Devicon (CDN) |
| Deployment | Vercel |

## Running locally

```bash
git clone https://github.com/bhagatshivam/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

> Note: a CV file is expected at `public/Shivam_Bhagat_CV.pdf` for the Hero section's download link to resolve correctly.

## Project Structure

```
src/
├── components/
│   ├── layout/      # Navbar, performance toggle
│   ├── sections/    # One component per page section
│   └── ui/          # Reusable pieces (cards, particle field, icon grid, etc.)
├── context/         # App-wide state (performance mode, project↔skill linking)
├── data/            # Content as data — projects, skills, journey milestones, interests
├── hooks/           # Custom hooks (scroll progress, reduced motion, mouse position)
└── App.jsx
```

Content (projects, skills, copy) lives in `src/data/` as plain JS objects, kept separate from presentation components — updating a project's description or adding a new skill doesn't require touching any component logic.

## Featured Projects

- **South Asian Culinary RAG Assistant** — retrieval-augmented generation chatbot, Recall@3 of 0.924
- **CI Pipeline Documentation Tool** — MSc dissertation; LLM-powered YAML-to-documentation generator
- **StoryWanderer** — full-stack web novel publishing platform (React, Supabase)
- **Fashion-MNIST CNN Classifier** — sub-100K-parameter CNN, 92.35% validation accuracy
- **Real-Time Drowsiness Detection** — YOLOv5-based driver fatigue detection
- **Ask the Doc** — generative AI document summarisation and Q&A tool
- **Gantt Chart Task Manager** — interactive project scheduling app
- **Transaction Data Analysis** — e-commerce business intelligence dashboarding

Full details, tech stacks, and repo links for each are available on the live site.

## Contact

- **Email:** bhagatshivam082@gmail.com
- **LinkedIn:** [linkedin.com/in/shivam-bhagat](https://www.linkedin.com/in/shivam-bhagat)
- **GitHub:** [github.com/bhagatshivam](https://github.com/bhagatshivam)

---

*Open to Software Engineering, AI/ML, and Data Engineering graduate roles in the UK from October 2026.*
