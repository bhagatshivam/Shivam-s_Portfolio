import { useState } from "react";

// Tracks which screenshots failed to load (file missing). `visible` is what is still worth
// rendering, so a missing file never shows as a broken image.
export function useScreenshots(shots = []) {
  const [failed, setFailed] = useState(() => new Set());
  const visible = shots.filter((shot) => !failed.has(shot.src));
  const markFailed = (src) => setFailed((prev) => new Set(prev).add(src));
  return { visible, markFailed };
}
