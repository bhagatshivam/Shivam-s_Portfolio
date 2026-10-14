import { usePageMeta } from "../hooks/usePageMeta";
import { site } from "../data/site";
import Hero from "../components/sections/Hero";
import Journey from "../components/sections/Journey";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Currently from "../components/sections/Currently";
import Interests from "../components/sections/Interests";
import Contact from "../components/sections/Contact";

export default function Home() {
  usePageMeta({ title: site.title, description: site.metaDescription });

  return (
    <>
      <section id="hero" aria-label="Introduction"><Hero /></section>
      <section id="projects" aria-labelledby="projects-title" className="border-t border-border"><Projects /></section>
      <section id="skills" aria-labelledby="skills-title" className="border-t border-border"><Skills /></section>
      <section id="experience" aria-labelledby="experience-title" className="border-t border-border"><Journey /></section>
      <section id="currently" aria-labelledby="currently-title" className="border-t border-border"><Currently /></section>
      <section id="interests" aria-labelledby="interests-title" className="border-t border-border"><Interests /></section>
      <section id="contact" aria-labelledby="contact-title" className="border-t border-border"><Contact /></section>
    </>
  );
}
