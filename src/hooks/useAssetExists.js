import { useEffect, useState } from "react";

// True only if `url` exists AND is served with the expected content type. The content-type
// check matters: a host that rewrites unknown paths to index.html answers 200 for a missing
// file, which must not count as "exists".
export function useAssetExists(url, typePrefix) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!url) return undefined;
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        setExists(res.ok && (res.headers.get("content-type") || "").startsWith(typePrefix));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url, typePrefix]);

  return exists;
}
