import { useScreenshots } from "../../../hooks/useScreenshots";
import { useAssetExists, useExistingAssets } from "../../../hooks/useAssetExists";
import PhoneFrame from "../../ui/PhoneFrame";

// Data-driven from the project's `screenshots` array. Only screenshots whose file exists are
// shown. With none (and no recording) the whole figure is omitted: no frame, no caption, no
// fallback panel. The screen recording renders only if the file exists, never autoplays and
// loads on demand.
function ScreenshotsFigure({ project, caption }) {
  const { visible, markFailed } = useScreenshots(project.screenshots);
  const existing = useExistingAssets((project.screenshots || []).map((s) => s.src), "image/");
  const shots = visible.filter((shot) => existing.has(shot.src));
  const video = project.video;
  const hasVideo = useAssetExists(video?.src, "video/");
  const hasPoster = useAssetExists(video?.poster, "image/");

  if (shots.length === 0 && !hasVideo) return null;

  return (
    <figure className="max-w-4xl">
      <div className="space-y-6 rounded-xl border border-border bg-surface p-4 md:p-6">
        {shots.length > 0 && (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
            {shots.map((shot) => (
              <li key={shot.src} className="mx-auto w-full max-w-[13rem]">
                <PhoneFrame src={shot.src} alt={shot.alt} className="w-full" onError={() => markFailed(shot.src)} />
                {shot.caption && (
                  <p className="mt-2 text-center font-mono text-label text-text-secondary">{shot.caption}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        {hasVideo && (
          <video
            controls
            preload="none"
            playsInline
            poster={hasPoster ? video.poster : undefined}
            aria-label={video.alt}
            className="mx-auto block max-h-[34rem] w-full max-w-sm rounded-lg border border-border-strong bg-surface-raised"
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption className="figure-caption mt-3 font-mono text-label text-text-secondary">{caption}</figcaption>
    </figure>
  );
}

// Tells the Figure block this component draws its own chrome (and may render nothing).
ScreenshotsFigure.bare = true;

export default ScreenshotsFigure;
