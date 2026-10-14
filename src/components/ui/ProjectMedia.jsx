import { useScreenshots } from "../../hooks/useScreenshots";
import MediaFallback from "./MediaFallback";
import PhoneFrame from "./PhoneFrame";

// 16:10 media slot on the project cards. Shows up to three real screenshots (phone projects)
// or the first one (panel projects); a screenshot that fails to load is dropped, and with none
// left the architecture words are shown instead.
export default function ProjectMedia({ project }) {
  const { visible, markFailed } = useScreenshots(project.screenshots);
  const { variant = "panel", alt = project.title } = project.media ?? {};

  let content;
  if (visible.length === 0) {
    content = <MediaFallback project={project} />;
  } else if (variant === "phone") {
    content = (
      <div className="flex h-full items-center justify-center gap-3 px-4 py-4">
        {visible.slice(0, 3).map((shot) => (
          <PhoneFrame
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            className="h-full"
            onError={() => markFailed(shot.src)}
          />
        ))}
      </div>
    );
  } else {
    const shot = visible[0];
    content = (
      <img
        src={shot.src}
        alt={shot.alt || alt}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        onError={() => markFailed(shot.src)}
        className="h-full w-full object-cover object-top"
      />
    );
  }

  return <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface-raised">{content}</div>;
}
