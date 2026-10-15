import Inline from "./Inline";
import { figures } from "./figures";

// Prose is held to ~70 characters per line; tables, stats and figures may use more width.
const PROSE = "max-w-[70ch]";
const WIDE = "max-w-4xl";

function Paragraph({ block }) {
  return (
    <p className={`${PROSE} text-body text-text-secondary`}>
      <Inline text={block.text} />
    </p>
  );
}

function Subheading({ block }) {
  return <h3 className={`${PROSE} pt-2 text-h3 text-text-primary`}>{block.text}</h3>;
}

function List({ block }) {
  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag
      className={`${PROSE} space-y-2.5 pl-5 text-body text-text-secondary marker:font-mono marker:text-accent ${
        block.ordered ? "list-decimal" : "list-disc"
      }`}
    >
      {block.items.map((item) => (
        <li key={item} className="pl-1">
          <Inline text={item} />
        </li>
      ))}
    </Tag>
  );
}

function Panel({ block }) {
  // A bordered block of labelled lists (used for "Limits and what is not verified").
  return (
    <aside className={`${PROSE} rounded-xl border border-border-strong bg-surface p-5 md:p-6`}>
      <p className="font-mono text-label text-accent">{block.title}</p>
      <div className="mt-4 space-y-6">
        {block.groups.map((group) => (
          <div key={group.heading}>
            <h3 className="text-small font-semibold text-text-primary">{group.heading}</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-small text-text-secondary marker:text-accent">
              {group.items.map((item) => (
                <li key={item} className="pl-1">
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Table({ block }) {
  return (
    <figure className={WIDE}>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-left text-small">
          <caption className="sr-only">{block.caption}</caption>
          <thead>
            <tr className="border-b border-border bg-surface">
              {block.columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-2 py-2.5 font-mono text-label font-normal text-text-secondary sm:px-4 ${
                    i > 0 && !block.textual ? "text-right tabular-nums" : ""
                  }`}
                >
                  {col || <span className="sr-only">Condition</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, r) => (
              <tr key={r} className="border-b border-border last:border-0">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th
                      key={i}
                      scope="row"
                      className={`px-2 py-2.5 font-normal text-text-primary sm:px-4 [overflow-wrap:anywhere] ${block.textual ? "w-[34%] align-top" : ""}`}
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={i}
                      className={`px-2 py-2.5 text-text-primary sm:px-4 ${
                        block.textual ? "align-top text-text-secondary" : "text-right tabular-nums"
                      }`}
                    >
                      {block.textual ? <Inline text={cell} /> : cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 font-mono text-label text-text-secondary">{block.caption}</figcaption>
    </figure>
  );
}

function Stats({ block }) {
  // Cells reflow by available width, so large text sizes drop to fewer columns instead of
  // overlapping. The 1px grid gap over a border-coloured background draws the hairlines.
  return (
    <ul
      className={`${WIDE} grid grid-cols-[repeat(auto-fit,minmax(min(9rem,100%),1fr))] gap-px overflow-hidden rounded-lg border border-border bg-border`}
    >
      {block.items.map((item) => (
        <li key={item.label} className="min-w-0 bg-surface p-4">
          <p className="text-stat tabular-nums text-text-primary [overflow-wrap:anywhere]">{item.value}</p>
          <p className="mt-2 text-small text-text-secondary">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}

function Callout({ block }) {
  return (
    <aside className={`${PROSE} rounded-lg border border-border border-l-2 border-l-accent bg-surface px-5 py-4`}>
      <p className="font-mono text-label text-accent">{block.title}</p>
      <p className="mt-2 text-body text-text-primary">
        <Inline text={block.text} />
      </p>
    </aside>
  );
}

function Figure({ block, project }) {
  const Component = figures[block.figure];
  if (!Component) return null;
  if (Component.bare) return <Component data={block.data} project={project} caption={block.caption} />;

  return (
    <figure className={WIDE}>
      <div className="rounded-xl border border-border bg-surface p-4 md:p-6">
        <Component data={block.data} project={project} />
      </div>
      {/* "Figure N." comes from a CSS counter, so a figure that renders nothing is skipped. */}
      <figcaption className="figure-caption mt-3 font-mono text-label text-text-secondary">
        <Inline text={block.caption} />
      </figcaption>
    </figure>
  );
}

const renderers = {
  paragraph: Paragraph,
  subheading: Subheading,
  list: List,
  table: Table,
  stats: Stats,
  callout: Callout,
  panel: Panel,
  figure: Figure,
};

export default function Block({ block, project }) {
  const Renderer = renderers[block.type];
  return Renderer ? <Renderer block={block} project={project} /> : null;
}
