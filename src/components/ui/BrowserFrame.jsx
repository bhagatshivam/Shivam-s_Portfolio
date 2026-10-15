// A browser-window frame for web screenshots. Fixed 16:10 content box, so nothing shifts while
// images load. The bar is decoration only.
export default function BrowserFrame({ src, alt, onError, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-border-strong bg-surface-raised ${className}`}>
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
      </div>
      <img
        src={src}
        alt={alt}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        onError={onError}
        className="aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}
