import { Component } from "react";

// Last-resort fallback: if rendering throws (or a route chunk fails to load), show a plain
// message instead of a blank page. It sits outside the router, so the way out is a normal
// link to "/", which reloads the app from scratch.
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(error);
    document.title = "Something went wrong | Shivam Bhagat";
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main role="alert" className="page-container pb-24 pt-28 text-text-primary md:pt-40">
        <h1 className="text-h2">Something went wrong.</h1>
        <p className="mt-4 max-w-[60ch] text-body text-text-secondary">
          The page could not be displayed. Reloading usually fixes it.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-small font-medium text-accent-ink hover:bg-accent/90"
        >
          Back to home
        </a>
      </main>
    );
  }
}
