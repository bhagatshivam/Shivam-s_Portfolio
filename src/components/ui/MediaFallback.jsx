// The architecture-words panel shown when a project has no (loadable) screenshots.
// Fills its parent, which supplies the frame and aspect ratio.
export default function MediaFallback({ project }) {
  const { variant = "panel", architecture = [] } = project.media ?? {};

  if (variant === "phone") {
    return (
      <div className="flex h-full items-center justify-center gap-6 px-6">
        <div
          aria-hidden="true"
          className="flex h-[78%] aspect-[9/17] shrink-0 items-center justify-center rounded-2xl border border-border-strong bg-surface"
        >
          <span className="font-mono text-label text-text-secondary">Vach</span>
        </div>
        <ul className="space-y-2 font-mono text-label text-text-secondary">
          {architecture.map((word, i) => (
            <li key={word}>
              {i > 0 && (
                <span aria-hidden="true" className="mb-2 block text-accent">
                  +
                </span>
              )}
              {word}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ol className="flex h-full flex-col items-center justify-center gap-1.5 px-6 font-mono text-label text-text-secondary">
      {architecture.map((word, i) => (
        <li key={word} className="flex w-full max-w-[16rem] flex-col items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="text-accent">
              ↓
            </span>
          )}
          <span className="w-full rounded border border-border-strong bg-surface px-3 py-1.5 text-center">
            {word}
          </span>
        </li>
      ))}
    </ol>
  );
}
