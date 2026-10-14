import { Step, Arrow } from "./parts";

const Branch = ({ label, children }) => (
  <li className="list-none">
    <div className="h-full rounded-lg border border-border-strong bg-surface-raised px-3.5 py-2.5">
      <p className="font-mono text-label text-accent [overflow-wrap:anywhere]">{label}</p>
      <p className="mt-1 text-small text-text-secondary [overflow-wrap:anywhere]">{children}</p>
    </div>
  </li>
);

// The LangGraph flow of the culinary assistant, as semantic HTML (full-size text at 375px).
// Source: the project README and assistant_core.py.
export default function RagPipelineFigure() {
  return (
    <div className="rounded-lg border border-dashed border-border-strong p-4 md:p-5">
      <p className="font-mono text-label text-text-secondary">
        Streamlit UI · <span className="text-text-primary">LangGraph state: question, chat history, intent, extracted slots, retrieved chunks</span>
      </p>
      <ol className="mt-4">
        <Step label="Classify intent">Rule-based, seven intents. Extracts ingredients and preferences from the chat.</Step>
        <Arrow />
        <Step label="Route">A conditional edge decides whether retrieval is needed.</Step>
        <Arrow />
      </ol>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(14rem,100%),1fr))] gap-2" aria-label="Two routes">
        <Branch label="Recipe request → retrieve">
          FAISS search, up to 15 chunks. L2 distance cut-off. Group by dish, then hybrid scoring picks the winning recipe.
        </Branch>
        <Branch label="Anything else → fallback node">
          Ask which ingredients, ask for detail on a vague request, or say the request is outside South Asian cuisine.
        </Branch>
      </ul>

      <ol>
        <Arrow />
        <Step label="Generate">A local Qwen2.5 model rewrites the retrieved recipe as Markdown under a strict system prompt.</Step>
        <Arrow />
        <Step label="Stream the answer">The UI also shows the intent, extracted ingredients, raw chunks and FAISS scores.</Step>
      </ol>
    </div>
  );
}
