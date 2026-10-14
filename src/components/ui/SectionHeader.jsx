// Mono eyebrow ("01 / Selected work"), heading and optional intro line.
export default function SectionHeader({ number, label, title, intro, id }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-mono text-label text-text-secondary">
        {number && <span className="text-accent">{number}</span>}
        {number && label && " / "}
        {label}
      </p>
      <h2 id={id} className="mt-3 text-h2 text-text-primary max-w-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-small text-text-secondary max-w-2xl">{intro}</p>}
    </div>
  );
}
