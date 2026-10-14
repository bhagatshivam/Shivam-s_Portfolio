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
                  className={`px-4 py-2.5 font-mono text-label font-normal text-text-secondary ${
                    i > 0 ? "text-right tabular-nums" : ""
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
                    <th key={i} scope="row" className="px-4 py-2.5 font-normal text-text-primary">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-4 py-2.5 text-right tabular-nums text-text-primary">
                      {cell}
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
  return (
    <ul className={`${WIDE} grid grid-cols-2 divide-border rounded-lg border border-border bg-surface md:grid-cols-4 md:divide-x`}>
      {block.items.map((item, i) => (
        <li
          key={item.label}
          className={`p-4 ${i < 2 ? "border-b border-border md:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-border md:border-r-0" : ""}`}
        >
          <p className="text-stat tabular-nums text-text-primary">{item.value}</p>
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

function Figure({ block, number }) {
  const Component = figures[block.figure];
  if (!Component) return null;

  return (
    <figure className={WIDE}>
      <div className="rounded-xl border border-border bg-surface p-4 md:p-6">
        <Component data={block.data} />
      </div>
      <figcaption className="mt-3 font-mono text-label text-text-secondary">
        <span className="text-text-primary">Figure {number}.</span> <Inline text={block.caption} />
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
  figure: Figure,
};

export default function Block({ block, number }) {
  const Renderer = renderers[block.type];
  return Renderer ? <Renderer block={block} number={number} /> : null;
}
