import { useScreenshots } from "../../../hooks/useScreenshots";
import { useAssetExists } from "../../../hooks/useAssetExists";
import MediaFallback from "../../ui/MediaFallback";
import PhoneFrame from "../../ui/PhoneFrame";

// Data-driven from the project's `screenshots` array. Screenshots whose file is missing are
// skipped (never a broken image); with none left, the architecture-words fallback is shown.
// The screen recording renders only if the file exists, never autoplays and loads on demand.
export default function ScreenshotsFigure({ project }) {
  const { visible, markFailed } = useScreenshots(project.screenshots);
  const video = project.video;
  const hasVideo = useAssetExists(video?.src, "video/");
  const hasPoster = useAssetExists(video?.poster, "image/");

  return (
    <div className="space-y-6">
      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
          {visible.map((shot) => (
            <li key={shot.src} className="mx-auto w-full max-w-[13rem]">
              <PhoneFrame
                src={shot.src}
                alt={shot.alt}
                className="w-full"
                onError={() => markFailed(shot.src)}
              />
              {shot.caption && (
                <p className="mt-2 text-center font-mono text-label text-text-secondary">{shot.caption}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface-raised">
          <MediaFallback project={project} />
        </div>
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
  );
}
