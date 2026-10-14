import { urllib3Output } from "./ciPipelineOutput";
import { site } from "./site";

// Case studies as structured data, rendered by CaseStudyLayout. Chunk 4 adds Vach here.
//
// Entry:   slug, projectId, title, summary (lede), description (meta description), sections
// Section: id (anchor), label (mono eyebrow), title (h2), blocks
// Blocks:
//   { type: "paragraph", text }                     text supports `code`, **bold**, [label](url)
//   { type: "subheading", text }
//   { type: "list", items: [text], ordered? }
//   { type: "table", caption, columns: [], rows: [[]] }
//   { type: "stats", items: [{ value, label }] }    "stat row"
//   { type: "callout", title, text }
//   { type: "figure", figure: <id in figures/index.js>, caption, data? }
//
// Every number below traces to SITE_REBUILD_PLAN.md §9 or to the dissertation numbers
// supplied for this chunk, and was cross-checked against the public repo where it is
// reproducible (evaluation/tier4_scoring/compute_totals.py, the answerability and
// documentation-survey reports).

export const caseStudies = [
  {
    slug: "ci-pipeline-docs",
    projectId: "ci-pipeline-docs",
    title: "What Is My CI Pipeline Doing?",
    summary:
      "My MSc dissertation: a tool that documents GitHub Actions pipelines from their workflow files, and an evaluation of how complete and accurate that documentation is.",
    description:
      "MSc dissertation case study: documentation generated from GitHub Actions workflows captured 95.5% of 201 pre-registered facts across 10 held-out pipelines.",
    sections: [
      {
        id: "problem",
        label: "Problem",
        title: "Pipeline behaviour is hard to read from YAML.",
        blocks: [
          {
            type: "paragraph",
            text: "A GitHub Actions workflow tells you what to run. It does not tell you what the pipeline does as a whole: when it fires, which jobs run in parallel, what has to pass before a deploy, or which secrets it needs. To find out, you read the YAML top to bottom and build the picture yourself.",
          },
          {
            type: "paragraph",
            text: "I started with a desk review of 11 active open-source repositories to see how this is handled in practice. It is an illustrative sample, not a rigorous survey.",
          },
          {
            type: "table",
            caption: "Desk review of 11 repositories (dissertation §1.2, Table 1.1).",
            columns: ["What the CI documentation looks like", "Repositories"],
            rows: [
              ["Detailed and still accurate", "3"],
              ["Detailed, but wrong or outdated", "3"],
              ["One vague sentence", "4"],
              ["None", "1"],
            ],
          },
          {
            type: "paragraph",
            text: "Of the 9 repositories whose workflow had changed more recently than its documentation, the gap ran from **17 to 326 days**.",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        title: "Four layers, with a firewall in the middle.",
        blocks: [
          {
            type: "paragraph",
            text: "The tool reads a workflow file through four layers:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Parser.** Specific to GitHub Actions. Turns the workflow YAML into the layer below.",
              "**Intermediate representation (IR).** A platform-agnostic model of the pipeline.",
              "**Deterministic generators.** Render a Markdown fact sheet and a Mermaid diagram from the IR. They never guess.",
              "**Optional LLM layer.** Gemini 2.5 Flash at temperature 0.2 rewrites the fact sheet for readability. It adds no fact and omits none. If it fails, the tool falls back to the deterministic document.",
            ],
          },
          {
            type: "paragraph",
            text: "A validation gate of 12 checks sits between the IR and generation. Any error-severity finding halts the run.",
          },
          {
            type: "paragraph",
            text: "The design decision I care most about is the **IR firewall**: everything on the generation side works from the IR alone. The LLM never sees the YAML, so it can only rephrase facts the parser has already extracted and the gate has checked. That narrows what the model can get wrong. It does not make the output reliable, as the failure section below shows.",
          },
          {
            type: "figure",
            figure: "architecture",
            caption: "The four layers and the IR firewall.",
          },
          {
            type: "paragraph",
            text: "There are two command-line tools behind one `cli.py`: one for a single workflow, and one for a whole `.github/workflows/` directory with cross-workflow relationship analysis. The deterministic output is complete on its own; the LLM layer is optional polish. The code is about 14,700 lines of Python with 34 test modules and a golden-file regression test on every CI run.",
          },
        ],
      },
      {
        id: "output",
        label: "Output",
        title: "What it actually produces.",
        blocks: [
          {
            type: "paragraph",
            text: "This is the deterministic layer's real output for urllib3's CI workflow, copied unedited from the evaluation files in the repository. Underneath is the Mermaid diagram the tool emits for the same workflow, redrawn here as a simple diagram.",
          },
          {
            type: "figure",
            figure: "output",
            caption: "Deterministic-layer output for urllib3's CI workflow, and the job diagram.",
            data: urllib3Output,
          },
        ],
      },
      {
        id: "evaluation",
        label: "Evaluation",
        title: "Evaluated without participants.",
        blocks: [
          {
            type: "paragraph",
            text: "There was no user study, so I measured against facts that can be checked objectively. For each of 10 held-out workflows, none of them used while developing the tool, I wrote a checklist of the facts the documentation should contain: **201 in total**. I committed the checklists before any output was generated. Each fact is then scored present, missing or false.",
          },
          {
            type: "figure",
            figure: "results",
            caption: "Fact-checklist results for 201 pre-registered facts (dissertation Table 3.2).",
            data: {
              total: 201,
              rows: [
                { label: "Deterministic output", present: 192, missing: 9, false: 0 },
                { label: "LLM-polished output", present: 192, missing: 9, false: 0 },
                { label: "Naive baseline: raw YAML sent to the same model", present: 107, missing: 93, false: 1 },
              ],
            },
          },
          {
            type: "paragraph",
            text: "The deterministic and LLM-polished outputs both captured 192 of 201 facts, with none false. Polishing with the LLM neither added nor lost a fact. The baseline captured 107.",
          },
          {
            type: "callout",
            title: "My expectation was wrong.",
            text: "I expected the baseline's weakness to be hallucination. It was not. It left out 46.3% of the facts (93 of 201) and stated one false fact (0.5%). The raw-YAML approach fails on completeness, not fabrication.",
          },
          {
            type: "paragraph",
            text: "I also asked five practical questions of each pipeline: when does it run, which jobs run in parallel, what must finish before the deployment gate, which workflows are explicitly connected, and which secrets or external actions are required.",
          },
          {
            type: "table",
            caption: "Answerability audit: 34 applicable questions across the 10 pipelines (dissertation Table 3.3).",
            columns: ["", "Yes", "Partial", "No"],
            rows: [
              ["Tool output", "32", "2", "0"],
              ["Naive baseline", "21", "10", "3"],
            ],
          },
          {
            type: "stats",
            items: [
              { value: "76/76", label: "IR facts reach the output" },
              { value: "10/10", label: "Mermaid diagram structures match" },
              { value: "6/7", label: "against 145 real workflow runs; the 7th is an explicitly marked truncation" },
              { value: "0", label: "contradictions against maintainer-written docs from scipy, tox and black" },
            ],
          },
          {
            type: "subheading",
            text: "How I kept the evaluation honest",
          },
          {
            type: "list",
            items: [
              "Fact checklists were committed before any output existed.",
              "Implementation froze on 10 Aug 2026, before evaluation, with four documented exceptions after the freeze.",
              "A fuller rewrite prompt scored 134/139 (96.4%) on four pipelines. I did not ship it, because it would have broken the match between the shipped tool and the evaluated one.",
            ],
          },
        ],
      },
      {
        id: "failures",
        label: "Where it fails",
        title: "Where it fails.",
        blocks: [
          {
            type: "paragraph",
            text: "The evaluation also found problems. Two of them matter more to me than the headline number.",
          },
          {
            type: "subheading",
            text: "A one-character typo became a confident false statement",
          },
          {
            type: "figure",
            figure: "failure-path",
            caption: "Error injection: how a `secret.` typo reached the final text.",
            data: {
              steps: [
                {
                  title: "Injected fault",
                  tag: "Input",
                  text: "One character changed: `${{ secret.DEPLOY_TOKEN }}` instead of `secrets.`",
                },
                {
                  title: "Parser",
                  tag: "Misclassified",
                  text: "The secret-detection regex requires the plural, so no Secret object is created. The value is captured as an ordinary environment variable.",
                },
                {
                  title: "Validation gate",
                  tag: "Not flagged",
                  text: "Zero issues reported.",
                },
                {
                  title: "Deterministic layer",
                  tag: "Correct",
                  text: "Behaves correctly. It prints the raw expression under ENVIRONMENT VARIABLES and has no SECRETS REQUIRED section. The evidence is there.",
                },
                {
                  title: "LLM layer",
                  tag: "False statement",
                  text: "Discards the raw expression and states: “The check-dist job requires and uses the DEPLOY_TOKEN secret.” That is false against the tool's own extraction, and against reality.",
                },
              ],
            },
          },
          {
            type: "callout",
            title: "Takeaway",
            text: "The IR firewall stops the model inventing facts from raw configuration. It cannot stop the model restating an upstream extraction error with confidence. The guarantee is narrower than I first claimed. This is one documented instance on one fixture, not a general reliability claim.",
          },
          {
            type: "subheading",
            text: "Step-level conditions are not rendered",
          },
          {
            type: "paragraph",
            text: "The same gap turned up three independent ways: in the fact-checklist scoring (4 of the tool's 9 missing facts), in error injection, and when comparing against black's documentation. A step that can never run is documented the same way as a step that always runs.",
          },
          {
            type: "paragraph",
            text: "So the tool's output is shown to be sufficient for pipeline-level and job-level questions. I have not shown it is sufficient for step-level gating.",
          },
        ],
      },
      {
        id: "limits",
        label: "Limits",
        title: "What this does not show.",
        blocks: [
          {
            type: "list",
            items: [
              "GitHub Actions only. The IR is designed to be platform-agnostic, but that is an architectural claim, not a demonstrated one.",
              "10 held-out pipelines, one model at one temperature.",
              "Self-scored. Pre-registration and objectively checkable facts reduce the bias; they do not remove it.",
              "The repository-wide tool was evaluated by regression and unit tests only, not by the fact-checklist evaluation.",
              "Real pull requests to maintainers and cost and latency metrics were not attempted, so I make no claim about real-world use or outcomes.",
            ],
          },
        ],
      },
      {
        id: "next",
        label: "Next",
        title: "What I would do next.",
        blocks: [
          {
            type: "list",
            items: [
              "Render step-level conditions.",
              "Warn when a secret-like expression fails classification.",
              "Add a parser for a second platform, to test the platform-agnostic claim.",
            ],
          },
          {
            type: "paragraph",
            text: "**What I would do differently:** build the fact checklists earlier, so the step-level gap surfaced while there was time to fix it.",
          },
          {
            type: "paragraph",
            text: "**A note on AI use:** Claude was used for code generation, review and editing. The design decisions, evaluation protocol, scoring and conclusions are mine.",
          },
          {
            type: "paragraph",
            text: `The code and evaluation files are public: [github.com/bhagatshivam/what-is-my-pipeline-doing](https://github.com/bhagatshivam/what-is-my-pipeline-doing). Full report available on request. Email: [${site.contact.email}](mailto:${site.contact.email}).`,
          },
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
