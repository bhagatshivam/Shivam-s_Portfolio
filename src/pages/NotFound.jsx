import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="page-container pb-24 pt-28 md:pt-36">
      <h1 className="text-h2 text-text-primary">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-small font-medium text-accent hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
