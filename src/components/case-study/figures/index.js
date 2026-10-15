import ArchitectureFigure from "./ArchitectureFigure";
import ResultsFigure from "./ResultsFigure";
import FailurePathFigure from "./FailurePathFigure";
import OutputFigure from "./OutputFigure";
import VachArchitectureFigure from "./VachArchitectureFigure";
import VachReleaseFigure from "./VachReleaseFigure";
import RagPipelineFigure from "./RagPipelineFigure";
import ScreenshotsFigure from "./ScreenshotsFigure";
import StoryWandererArchitectureFigure from "./StoryWandererArchitectureFigure";

// Figure ids usable in a caseStudies.js `figure` block. Add new ones here.
export const figures = {
  architecture: ArchitectureFigure,
  results: ResultsFigure,
  "failure-path": FailurePathFigure,
  output: OutputFigure,
  "vach-architecture": VachArchitectureFigure,
  "vach-release": VachReleaseFigure,
  screenshots: ScreenshotsFigure,
  "rag-pipeline": RagPipelineFigure,
  "storywanderer-architecture": StoryWandererArchitectureFigure,
};
