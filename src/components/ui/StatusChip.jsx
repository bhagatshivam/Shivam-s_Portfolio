// Finished work gets a tick; work in progress gets amber. Wording comes from the project.
export default function StatusChip({ project }) {
  const inProgress = project.status !== "complete";
  const text = project.statusLabel || (inProgress ? "In progress" : "Complete");

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-display text-label font-semibold ${
        inProgress ? "bg-status-soft text-status" : "tick bg-accent-soft text-accent"
      }`}
    >
      {text}
    </span>
  );
}
