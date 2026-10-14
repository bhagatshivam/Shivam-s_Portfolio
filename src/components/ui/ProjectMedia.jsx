import { useScreenshots } from "../../hooks/useScreenshots";
import { useExistingAssets } from "../../hooks/useAssetExists";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";
import ProjectVisual from "./ProjectVisual";

// Media slot on the project cards. Real screenshots when their files exist (up to three phone
// screens, or the first browser screen); otherwise the generated branded visual, so the slot
// is never empty and a missing file never renders as a broken image.
export default function ProjectMedia({ project }) {
  const { visible, markFailed } = useScreenshots(project.screenshots);
  const existing = useExistingAssets((project.screenshots || []).map((s) => s.src), "image/");
  const shots = visible.filter((shot) => existing.has(shot.src));
  const variant = project.media?.variant;

  let content;
  if (shots.length === 0 || !variant) {
    content = <ProjectVisual project={project} />;
  } else if (variant === "phone") {
    content = (
      <div
        className="flex h-72 items-center justify-center gap-3 px-4 py-4"
        style={{
          backgroundImage: `radial-gradient(26rem 14rem at 50% 0%, color-mix(in srgb, ${project.visual.accent} 25%, transparent), transparent 70%)`,
        }}
      >
        {shots.slice(0, 3).map((shot) => (
          <PhoneFrame key={shot.src} src={shot.src} alt={shot.alt} className="h-full" onError={() => markFailed(shot.src)} />
        ))}
      </div>
    );
  } else {
    const shot = shots[0];
    content = (
      <div
        className="flex h-full items-center justify-center px-5 py-5"
        style={{
          backgroundImage: `radial-gradient(26rem 14rem at 50% 0%, color-mix(in srgb, ${project.visual.accent} 25%, transparent), transparent 70%)`,
        }}
      >
        <BrowserFrame src={shot.src} alt={shot.alt} className="w-full" onError={() => markFailed(shot.src)} />
      </div>
    );
  }

  return <div className="min-h-[11rem] sm:min-h-[14rem] border-b border-border bg-surface-raised">{content}</div>;
}
