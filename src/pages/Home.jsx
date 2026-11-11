import { usePageMeta } from "../hooks/usePageMeta";
import { homeMeta } from "../data/seo";
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
      <section id="projects" aria-labelledby="projects-title" className="border-t border-border"><Projects /></section>
      <section id="skills" aria-labelledby="skills-title" className="border-t border-border"><Skills /></section>
      <section id="experience" aria-labelledby="experience-title" className="border-t border-border"><Experience /></section>
      <section id="about" aria-labelledby="about-title" className="border-t border-border"><About /></section>
      <section id="contact" aria-labelledby="contact-title" className="border-t border-border"><Contact /></section>
      <Footer />
    </>
  );
}
