import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <h1 className="font-display text-3xl text-text-primary mb-4">Page not found</h1>
      <Link to="/" className="font-display text-sm text-accent-blue hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
