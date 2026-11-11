// Stacked horizontal bars from Table 3.2. Counts and percentages are always printed as text,
// and each segment is distinguishable without colour: present is solid, missing is striped,
// false is a solid warm block with its own label.
const pct = (n, total) => ((n / total) * 100).toFixed(1);

const striped = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgb(var(--color-border-strong)) 0 2px, transparent 2px 7px)",
};

function Swatch({ kind }) {
  const base = "inline-block h-3 w-5 shrink-0 rounded-sm border border-border-strong align-middle";
  if (kind === "present") return <span aria-hidden="true" className={`${base} bg-accent`} />;
  if (kind === "missing") return <span aria-hidden="true" className={base} style={striped} />;
  return <span aria-hidden="true" className={`${base} bg-status`} />;
}

export default function ResultsFigure({ data }) {
  const { total, rows } = data;

  return (
    <div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-label text-text-secondary">
        <li className="flex items-center gap-2"><Swatch kind="present" /> Present</li>
        <li className="flex items-center gap-2"><Swatch kind="missing" /> Missing</li>
        <li className="flex items-center gap-2"><Swatch kind="false" /> False</li>
      </ul>

      <ul className="mt-5 space-y-6">
        {rows.map((row) => (
          <li key={row.label}>
            <p className="text-small font-medium text-text-primary">{row.label}</p>
            <div
              aria-hidden="true"
              className="mt-2 flex h-7 overflow-hidden rounded border border-border-strong bg-surface"
            >
              <div className="bg-accent" style={{ width: `${(row.present / total) * 100}%` }} />
              <div style={{ width: `${(row.missing / total) * 100}%`, ...striped }} />
              {row.false > 0 && (
                <div className="bg-status" style={{ width: `${(row.false / total) * 100}%`, minWidth: "3px" }} />
              )}
            </div>
            <p className="mt-2 font-mono text-label text-text-secondary">
              <span className="text-text-primary">{row.present}</span> present ({pct(row.present, total)}%)
              {" · "}
              {row.missing} missing ({pct(row.missing, total)}%)
              {" · "}
              {row.false} false ({pct(row.false, total)}%)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
