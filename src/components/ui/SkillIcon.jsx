import { lazy, Suspense } from "react";

// The logo paths are ~36 kB, so they load in their own chunk after the page is interactive.
// The 20px placeholder keeps the layout from shifting when they arrive.
const Impl = lazy(() => import("./SkillIconImpl"));

export default function SkillIcon({ id }) {
  return (
    <Suspense fallback={<span aria-hidden="true" className="h-5 w-5 shrink-0" />}>
      <Impl id={id} />
    </Suspense>
  );
}
