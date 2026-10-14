import { useState } from "react";

// 16:10 media slot. Uses the first real screenshot when one exists and loads; otherwise
// shows the architecture words from the project data so the card never looks broken.
export default function ProjectMedia({ project }) {
  const [failed, setFailed] = useState(false);
  const shot = project.screenshots?.[0];
  const { variant = "panel", architecture = [], alt = project.title } = project.media ?? {};
  const showImage = shot && !failed;

  return (
    <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface-raised">
      {showImage ? (
        variant === "phone" ? (
          <div className="flex h-full items-center justify-center py-4">
            <img
              src={shot.src}
              alt={shot.alt || alt}
              onError={() => setFailed(true)}
              loading="lazy"
              className="h-full w-auto rounded-2xl border border-border-strong object-cover"
            />
          </div>
        ) : (
          <img
            src={shot.src}
            alt={shot.alt || alt}
            onError={() => setFailed(true)}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )
      ) : variant === "phone" ? (
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
      ) : (
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
      )}
    </div>
  );
}
