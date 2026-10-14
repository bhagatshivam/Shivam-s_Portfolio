import { useEffect } from "react";

// Per-route document title and meta description. Each route sets its own on mount, so there
// is nothing to restore when navigating away.
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
