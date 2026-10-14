import ArchitectureFigure from "./ArchitectureFigure";
import ResultsFigure from "./ResultsFigure";
import FailurePathFigure from "./FailurePathFigure";
import OutputFigure from "./OutputFigure";
import VachArchitectureFigure from "./VachArchitectureFigure";
import VachReleaseFigure from "./VachReleaseFigure";
import ScreenshotsFigure from "./ScreenshotsFigure";

// Figure ids usable in a caseStudies.js `figure` block. Add new ones here.
export const figures = {
  architecture: ArchitectureFigure,
  results: ResultsFigure,
  "failure-path": FailurePathFigure,
  output: OutputFigure,
  "vach-architecture": VachArchitectureFigure,
  "vach-release": VachReleaseFigure,
  screenshots: ScreenshotsFigure,
};
