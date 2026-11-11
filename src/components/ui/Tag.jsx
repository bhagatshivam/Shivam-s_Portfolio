export default function Tag({ children }) {
  return (
    <li className="rounded-md border border-border bg-surface px-2 py-1 font-display text-label leading-none text-text-secondary">
      {children}
    </li>
  );
}
