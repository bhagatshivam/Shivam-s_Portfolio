import { BrowserRouter, Routes, Route } from "react-router";
import { PerformanceProvider } from "./context/PerformanceContext";
import { SkillFocusProvider } from "./context/SkillFocusContext";
import Navbar from "./components/layout/Navbar";
import PerformanceToggle from "./components/layout/PerformanceToggle";
import ScrollManager from "./components/layout/ScrollManager";
import Home from "./pages/Home";
import CaseStudyPage from "./pages/CaseStudyPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <PerformanceProvider>
        <SkillFocusProvider>
          <div className="bg-background text-text-primary font-sans">
            <ScrollManager />
            <Navbar />
            <PerformanceToggle />
            <main id="main" tabIndex={-1} className="outline-none">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<CaseStudyPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SkillFocusProvider>
      </PerformanceProvider>
    </BrowserRouter>
  );
}

export default App;
