import { useEffect, useState } from "react";

// A file "exists" only if the request succeeds AND the content type matches. The content-type
// check matters: a host that rewrites unknown paths to index.html answers 200 for a missing
// file, which must not count as present. Results are cached per page load.
const cache = new Map();

function check(url, typePrefix) {
  const key = `${typePrefix}|${url}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(url, { method: "HEAD" })
        .then((res) => res.ok && (res.headers.get("content-type") || "").startsWith(typePrefix))
        .catch(() => false)
    );
  }
  return cache.get(key);
}

// `initial` is what to assume until the check finishes.
export function useAssetExists(url, typePrefix, initial = false) {
  const [exists, setExists] = useState(initial);

  useEffect(() => {
    if (!url) return undefined;
    let cancelled = false;
    check(url, typePrefix).then((ok) => {
      if (!cancelled) setExists(ok);
    });
    return () => {
      cancelled = true;
    };
  }, [url, typePrefix]);

  return exists;
}

// Which of `urls` exist. Empty until the checks finish.
export function useExistingAssets(urls, typePrefix) {
  const key = urls.join("|");
  const [existing, setExisting] = useState(() => new Set());

  useEffect(() => {
    const list = key ? key.split("|") : [];
    let cancelled = false;
    Promise.all(list.map((url) => check(url, typePrefix).then((ok) => (ok ? url : null)))).then((found) => {
      if (!cancelled) setExisting(new Set(found.filter(Boolean)));
    });
    return () => {
      cancelled = true;
    };
  }, [key, typePrefix]);

  return existing;
}
