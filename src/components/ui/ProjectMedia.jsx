import { useScreenshots } from "../../hooks/useScreenshots";
import { useExistingAssets } from "../../hooks/useAssetExists";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";
import ProjectVisual from "./ProjectVisual";

// Media slot on the project rows. Real screenshots when their files exist (up to two phone
// screens, or the first browser screen); otherwise the spec card, so the slot is never empty
// and a missing file never renders as a broken image.
export default function ProjectMedia({ project }) {
  const { visible, markFailed } = useScreenshots(project.screenshots);
  const existing = useExistingAssets((project.screenshots || []).map((s) => s.src), "image/");
  const shots = visible.filter((shot) => existing.has(shot.src));
  const variant = project.media?.variant;

  if (shots.length === 0 || !variant) {
    return <ProjectVisual project={project} />;
  }

  if (variant === "phone") {
    return (
      <div
        className="flex h-full min-h-[18rem] items-end justify-center gap-4 overflow-hidden rounded-lg border border-border px-6 pt-6"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${project.visual.accent} 10%, rgb(var(--color-surface))), rgb(var(--color-band)))`,
        }}
      >
        {shots.slice(0, 2).map((shot, i) => (
          <PhoneFrame
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            className={`w-[42%] max-w-[11rem] ${i === 1 ? "translate-y-6" : ""}`}
            onError={() => markFailed(shot.src)}
          />
        ))}
      </div>
    );
  }

  const shot = shots[0];
  return (
    <div
      className="flex h-full items-start justify-center overflow-hidden rounded-lg border border-border p-4 sm:p-5"
      style={{
        background: `linear-gradient(to bottom, color-mix(in srgb, ${project.visual.accent} 10%, rgb(var(--color-surface))), rgb(var(--color-band)))`,
      }}
    >
      <BrowserFrame src={shot.src} alt={shot.alt} className="w-full" aspect="aspect-square" onError={() => markFailed(shot.src)} />
    </div>
  );
}
