export default function Tag({ children }) {
  return (
    <li className="rounded border border-border px-2 py-1 font-mono text-[11px] leading-none text-text-secondary">
      {children}
    </li>
  );
}
