import Hero from "../components/sections/Hero";
import Journey from "../components/sections/Journey";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Currently from "../components/sections/Currently";
import Interests from "../components/sections/Interests";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="journey"><Journey /></section>
      <section id="projects"><Projects /></section>
      <section id="skills"><Skills /></section>
      <section id="currently"><Currently /></section>
      <section id="interests"><Interests /></section>
      <section id="contact"><Contact /></section>
    </>
  );
}
