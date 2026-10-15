// Neutral for finished work. The warm colour is reserved for status chips like this one.
export default function StatusChip({ project }) {
  const inProgress = project.status !== "complete";
  const text = project.statusLabel || (inProgress ? "IN PROGRESS" : "COMPLETE");

  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-[11px] tracking-wider ${
        inProgress
          ? "border-status/40 bg-status/10 text-status"
          : "border-border text-text-secondary"
      }`}
    >
      {text}
    </span>
  );
}
