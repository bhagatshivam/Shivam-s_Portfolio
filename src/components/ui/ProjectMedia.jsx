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
        className="relative h-full min-h-[22rem] overflow-hidden rounded-lg border border-border"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${project.visual.accent} 10%, rgb(var(--color-surface))), rgb(var(--color-band)))`,
        }}
      >
        <div className="absolute inset-x-0 top-6 flex justify-center px-5">
          {shots.slice(0, 2).map((shot, i) => (
            <PhoneFrame
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              className={`w-[58%] shadow-[0_24px_50px_-24px_rgb(var(--color-night)/0.5)] ${i === 1 ? "-ml-[20%] translate-y-12" : "relative z-10"}`}
              onError={() => markFailed(shot.src)}
            />
          ))}
        </div>
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
