import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { PerformanceProvider } from "./context/PerformanceContext";
import { SkillFocusProvider } from "./context/SkillFocusContext";
import Navbar from "./components/layout/Navbar";
import PerformanceToggle from "./components/layout/PerformanceToggle";
import ScrollManager from "./components/layout/ScrollManager";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// The case studies (long-form data, figures, layout) load only when one is opened.
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));

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
              <Suspense fallback={<div aria-busy="true" className="min-h-screen" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects/:slug" element={<CaseStudyPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </SkillFocusProvider>
      </PerformanceProvider>
    </BrowserRouter>
  );
}

export default App;
