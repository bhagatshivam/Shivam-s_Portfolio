// Section heading. Sections on the home page use a two-column layout on large screens: the
// heading and intro sit in a left rail that stays put while the content column scrolls, so
// a reader always knows which section they are in. Below lg it stacks.
export default function SectionHeader({ title, intro, id, children }) {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <h2 id={id} className="text-h2 text-text-primary">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-[38ch] text-small text-text-secondary">{intro}</p>}
      {children}
    </div>
  );
}

// Two-column shell: rail (heading) + content. Used by every home-page section.
export function SectionShell({ header, children, className = "" }) {
  return (
    <div className={`section-y ${className}`}>
      <div className="page-container grid grid-cols-[minmax(0,1fr)] gap-y-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-16">
        {header}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
