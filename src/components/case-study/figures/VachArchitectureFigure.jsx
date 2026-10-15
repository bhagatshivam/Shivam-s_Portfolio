import { Step, Arrow } from "./parts";

const Branch = ({ label, children }) => (
  <li className="list-none">
    <div className="h-full rounded-lg border border-border-strong bg-surface-raised px-3.5 py-2.5">
      <p className="font-mono text-label text-accent [overflow-wrap:anywhere]">{label}</p>
      <p className="mt-1 text-small text-text-secondary [overflow-wrap:anywhere]">{children}</p>
    </div>
  </li>
);

// Vach's runtime flow, as semantic HTML so the text stays full size at 375px.
export default function VachArchitectureFigure() {
  return (
    <div className="rounded-lg border border-dashed border-border-strong p-4 md:p-5">
      <p className="font-mono text-label text-text-secondary">
        Capacitor native shell · <span className="text-text-primary">React/TypeScript UI</span>
      </p>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div>
          <ol>
            <Step label="SAF folder picker">Persistent permission via takePersistableUriPermission.</Step>
            <Arrow />
            <Step label="Folder scan">
              Finds .pdf and .epub files in the folder and its subfolders. Files are read in place.
            </Step>
            <Arrow />
          </ol>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(10.5rem,100%),1fr))] gap-2" aria-label="Three rendering paths">
            <Branch label="EPUB parser">OPF and XHTML/CSS, with my own stylesheet.</Branch>
            <Branch label="pdf.js text extraction">Embedded text, page by page.</Branch>
            <Branch label="Image fallback">Page rendered as an image, with a theme colour overlay.</Branch>
          </ul>

          <ol>
            <Arrow />
            <Step label="One continuous reflow stream">What the reader scrolls through.</Step>
          </ol>
        </div>

        <aside aria-label="Alongside the reading stream" className="space-y-2">
          <p className="font-mono text-label text-text-secondary">Alongside</p>
          <ul className="space-y-2">
            <Branch label="Settings">Font, size, line height, theme.</Branch>
            <Branch label="Reading position">Saved per book.</Branch>
          </ul>
        </aside>
      </div>
    </div>
  );
}
