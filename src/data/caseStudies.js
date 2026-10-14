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
            text: "This is the deterministic layer's real output for urllib3's CI workflow, copied from the evaluation files in the repository, with one file path shortened. Underneath is the Mermaid diagram the tool emits for the same workflow, redrawn here as a simple diagram.",
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
            text: "The deterministic and LLM-polished outputs scored identically: 192 of 201 facts each, with none false. The baseline captured 107.",
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
              "Add a second platform parser (e.g. GitLab CI, not implemented) to test the platform-agnostic claim.",
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
  {
    slug: "vach",
    projectId: "vach",
    title: "Vach: offline PDF & EPUB reader for Android",
    summary:
      "Vach (वाच) is Marathi for “read”. It is an Android app (React/TypeScript in a Capacitor native shell) for reading a personal library of PDF and EPUB novels offline, with continuous scroll like a webnovel app.",
    description:
      "Vach: an offline PDF and EPUB reader for Android, built with React and TypeScript in a Capacitor shell. Persistent folder access, continuous scroll, no ads.",
    sections: [
      {
        id: "problem",
        label: "Problem",
        title: "I wanted a reader that felt like a webnovel app.",
        blocks: [
          {
            type: "paragraph",
            text: "I read a large personal library of downloaded PDF and EPUB novels offline on my phone. None of the options fitted. Adobe is paid, and free readers are full of ads. KOReader is open source and works, but I found its scrolling, its orientation and settings friction, and its lack of a clean day/night toggle rough on my phone.",
          },
          { type: "paragraph", text: "What I wanted:" },
          {
            type: "list",
            items: [
              "Continuous, smooth scroll like a webnovel app, not page-flip.",
              "Simple font and background customisation.",
              "Offline access to a folder of books already on the phone, without re-picking files each session.",
            ],
          },
        ],
      },
      {
        id: "why-an-app",
        label: "Why an app",
        title: "Why not a PWA.",
        blocks: [
          {
            type: "paragraph",
            text: "Vach is not a PWA. Browsers cannot hold persistent access to a whole folder on Android, so I would have had to re-approve file access constantly. Only an app that uses Android's Storage Access Framework (SAF, `takePersistableUriPermission`) gets durable folder permission. That was the core requirement, so Vach has been a Capacitor app from day one.",
          },
        ],
      },
      {
        id: "how-it-works",
        label: "How it works",
        title: "Persistent folder access, three rendering paths, one stream.",
        blocks: [
          {
            type: "figure",
            figure: "vach-architecture",
            caption: "Vach's runtime flow.",
          },
          {
            type: "list",
            // TODO(confirm): "designed to persist" is deliberately not stated as verified. Upgrade
            // it to a plain statement once the reboot check below has been run on the device.
            items: [
              "**File access.** First launch opens a SAF folder picker, and the permission is designed to persist across restarts and reboots (`takePersistableUriPermission`). The app scans the folder and its subfolders for `.pdf` and `.epub` files and detects new ones on each open. Files are read in place; nothing is copied into app storage. If access is revoked, it falls back to a “no folder selected” state instead of crashing.",
              "**Reading interface.** Continuous vertical scroll, tuned for smoothness because that was the top UX priority. Curated fonts, size, line height and themes (sepia, night, beige, plus a custom slot). Reading position is saved per book and restored on reopen.",
              "**Offline.** No network calls anywhere in the reading flow. No ads, accounts or telemetry.",
            ],
          },
          {
            type: "table",
            textual: true,
            caption: "Rendering pipeline: how each kind of source is handled.",
            columns: ["Source", "How Vach handles it"],
            rows: [
              [
                "EPUB",
                "Unzipped and parsed directly (OPF plus XHTML/CSS) with my own stylesheet, so font, size, spacing and colour are fully controllable. No external EPUB library.",
              ],
              [
                "Text-based PDF",
                "Embedded text is extracted page by page with pdf.js and reflowed into the same continuous stream as EPUB.",
              ],
              [
                "Image-only PDF pages (covers, illustrations)",
                "Rendered as an image with a colour overlay, so they stay consistent with the active theme.",
              ],
              [
                "Fully scanned PDF",
                "The same image fallback for the whole book. No OCR; that is out of scope.",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "During planning I validated text extraction against a real 246-page light-novel PDF. About 90% of its pages had clean, well-ordered text, at roughly 2,600 characters per page in a single column.",
          },
          {
            type: "figure",
            figure: "screenshots",
            caption: "Library and reading screens.",
          },
        ],
      },
      {
        id: "build",
        label: "Build and release",
        title: "Debug builds on every push, signed releases on tags.",
        blocks: [
          {
            type: "paragraph",
            text: "The stack is Capacitor, React, TypeScript, Vite, Vitest, oxlint, pdf.js and a custom EPUB parser.",
          },
          {
            type: "figure",
            figure: "vach-release",
            caption: "The GitHub Actions build and release flow.",
            data: {
              steps: [
                {
                  label: "Push",
                  title: "Push to any branch",
                  text: "GitHub Actions builds a debug APK. Its package is `com.vach.reader.debug`, so it installs side by side with the release build.",
                },
                {
                  label: "Tag",
                  title: "Push a `v*` tag",
                  text: "GitHub Actions builds a release-signed APK.",
                },
                {
                  label: "Release",
                  title: "GitHub Release",
                  text: "The signed APK is published as a GitHub Release.",
                },
              ],
            },
          },
          {
            type: "paragraph",
            text: "I have not linked a release from this page. For now, build it from source: [github.com/bhagatshivam/Vach](https://github.com/bhagatshivam/Vach).",
          },
        ],
      },
      {
        id: "process",
        label: "Process",
        title: "How I worked on it.",
        blocks: [
          {
            type: "list",
            items: [
              "I wrote a project brief before any code: motivation, requirements, constraints, a phased roadmap and success criteria.",
              "Work went phase by phase, with explicit success criteria for each phase.",
              "Implementation was AI-assisted: I used Claude Code against the repository, with planning and architecture done separately. All commits are authored under my name, with Claude credited as co-author.",
              "The release process is documented in `docs/RELEASING.md`, and the README has a manual device-verification checklist.",
            ],
          },
        ],
      },
      {
        id: "limits",
        label: "Verification",
        title: "What is verified, and what is not.",
        blocks: [
          {
            type: "panel",
            title: "Limits and what is not verified",
            groups: [
              {
                heading: "Verified on a real device",
                // TODO(confirm): folder-permission persistence is deliberately not listed as
                // verified. It appears only as "designed to persist" under How it works. Add it
                // back here once you have run the force-stop / reboot / revoked checks.
                items: [
                  "EPUB and text-PDF continuous scroll with font, size, spacing and theme controls.",
                  "Image-page fallback for textless and scanned pages.",
                  "Reading position across sessions.",
                  "Fully offline operation.",
                ],
              },
              {
                heading: "Manual checks",
                // TODO(confirm): the README checklist items are held back until you say which
                // you have run yourself. Candidates: force-stop and reopen with no prompt;
                // full device reboot with no prompt; revoked permission falls back to
                // "no folder selected". Add only the ones you ran.
                items: [
                  "CI cannot drive the system folder picker or reboot a device, so the README has a manual device-verification checklist.",
                ],
              },
              {
                heading: "Not verified, and limits",
                // TODO(confirm): add the device model and Android version to the first item
                // if you want them shown.
                items: [
                  "Tested on one device, and only on my own library of clean single-column novels and light novels. Not tested on other devices or Android versions.",
                  "No external users yet.",
                  "No automated end-to-end or UI tests.",
                  "Complex PDFs (multi-column, heavy footnotes or tables) reflow worse. That is a deliberate low-priority edge case.",
                  "Text customisation is impossible on scanned or image-only pages. That is a hard limit of the source material.",
                  "Sideloaded APK only, no Play Store.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "status",
        label: "Status",
        title: "Status and what is next.",
        blocks: [
          {
            type: "paragraph",
            text: "Vach is about 95% complete, in daily use, and still being refined.",
          },
          {
            type: "list",
            items: [
              "**Phase 1, complete:** SAF folder access and the CI pipeline.",
              "**Phase 2, complete:** EPUB and PDF reflow with controls and continuous scroll.",
              "**Phase 3, complete:** image-page fallback, progress persistence and real-world fixes.",
            ],
          },
          {
            type: "subheading",
            text: "Not started",
          },
          {
            type: "paragraph",
            text: "Extracting embedded images from PDF pages that also contain text. Mixed pages currently reflow the text without the embedded image.",
          },
          {
            type: "subheading",
            text: "Optional phase 4",
          },
          {
            type: "list",
            items: [
              "Per-book settings override.",
              "In-book search.",
              "Custom font uploads.",
              "Cloud sync.",
            ],
          },
          {
            type: "paragraph",
            text: "The code is public: [github.com/bhagatshivam/Vach](https://github.com/bhagatshivam/Vach).",
          },
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
