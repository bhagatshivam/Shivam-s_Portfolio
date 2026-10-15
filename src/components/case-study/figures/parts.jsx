// Shared building blocks for the HTML-based figures.
export function Step({ label, children, dashed = false }) {
  return (
    <li className="list-none">
      <div
        className={`rounded-lg border bg-surface-raised px-3.5 py-2.5 ${
          dashed ? "border-dashed border-border-strong" : "border-border-strong"
        }`}
      >
        <p className="font-mono text-label text-accent [overflow-wrap:anywhere]">{label}</p>
        <div className="mt-1 text-small text-text-secondary [overflow-wrap:anywhere]">{children}</div>
      </div>
    </li>
  );
}

export const Arrow = () => (
  <li aria-hidden="true" className="list-none py-1 text-center font-mono text-label text-text-secondary">
    ↓
  </li>
);
