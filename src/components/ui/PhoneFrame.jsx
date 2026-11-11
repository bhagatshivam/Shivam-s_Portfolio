// A phone-shaped frame for screenshots. The frame has a fixed aspect ratio and the image
// fills it, so nothing shifts while images load (or if a screenshot's own size differs).
export default function PhoneFrame({ src, alt, onError, className = "" }) {
  return (
    <div
      className={`aspect-[9/19.5] shrink-0 rounded-[1.5rem] border border-border-strong bg-surface-raised p-1 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={360}
        height={780}
        loading="lazy"
        decoding="async"
        onError={onError}
        className="h-full w-full rounded-[1.15rem] object-cover object-top"
      />
    </div>
  );
}
