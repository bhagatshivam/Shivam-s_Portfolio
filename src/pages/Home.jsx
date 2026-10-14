import { usePageMeta } from "../hooks/usePageMeta";
import { homeMeta } from "../data/seo";
import { site } from "../data/site";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  usePageMeta(homeMeta);

  return (
    <>
      <section id="hero" aria-label="Introduction"><Hero /></section>
      <section aria-label="Short introduction" className="border-t border-border bg-background">
        <div className="page-container py-10 md:py-14">
          <p className="max-w-[62ch] text-lead text-text-secondary">{site.aboutShort}</p>
        </div>
      </section>
      <section id="projects" aria-labelledby="projects-title" className="band border-t border-border"><Projects /></section>
      <section id="skills" aria-labelledby="skills-title" className="border-t border-border"><Skills /></section>
      <section id="experience" aria-labelledby="experience-title" className="band border-t border-border"><Experience /></section>
      <section id="about" aria-labelledby="about-title" className="border-t border-border"><About /></section>
      <section id="contact" aria-labelledby="contact-title" className="band border-t border-border"><Contact /></section>
      <Footer />
    </>
  );
}
