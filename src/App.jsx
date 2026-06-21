import { PerformanceProvider } from "./context/PerformanceContext";
import { SkillFocusProvider } from "./context/SkillFocusContext";
import Hero from "./components/sections/Hero";
import Journey from "./components/sections/Journey";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Currently from "./components/sections/Currently";
import Interests from "./components/sections/Interests";
import Contact from "./components/sections/Contact";
import Navbar from "./components/layout/Navbar";
import PerformanceToggle from "./components/layout/PerformanceToggle";

function App() {
  return (
    <PerformanceProvider>
      <SkillFocusProvider>
        <div className="bg-background text-text-primary font-body">
          <Navbar />
          <PerformanceToggle />
          <main>
            <section id="hero"><Hero /></section>
            <section id="journey"><Journey /></section>
            <section id="projects"><Projects /></section>
            <section id="skills"><Skills /></section>
            <section id="currently"><Currently /></section>
            <section id="interests"><Interests /></section>
            <section id="contact"><Contact /></section>
          </main>
        </div>
      </SkillFocusProvider>
    </PerformanceProvider>
  );
}

export default App;
