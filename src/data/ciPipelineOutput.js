// Verbatim output of the deterministic layer (no LLM) for urllib3's CI workflow, copied by
// script from the dissertation repository so nothing here is retyped:
//   https://github.com/bhagatshivam/what-is-my-pipeline-doing
//   evaluation/tier4_scoring/urllib3_ci.scoring.md ("Condition A"; repo commit 977e5be)
// The input workflow is evaluation/held_out_workflows/urllib3_ci.yml in the same repo.
// Stored as an array of lines so `${{ ... }}` sequences are plain strings.

export const urllib3Output = {
  path: "evaluation/tier4_scoring/urllib3_ci.scoring.md",
  generated: "22 Aug 2026",
  lines: [
    "Pipeline: CI",
    "Source: /home/user/what-is-my-pipeline-doing/evaluation/held_out_workflows/urllib3_ci.yml (GitHub Actions)",
    "Permissions: contents: read",
    "",
    "AT A GLANCE",
    "This workflow runs on pushes, pull requests, and manual dispatch.",
    "It contains 3 jobs: 2 with no declared dependencies, 1 depending on other jobs.",
    "1 of 3 jobs use a build matrix.",
    "",
    "WHEN IT RUNS",
    "- Runs on every push",
    "- Runs on every pull request",
    "- Can be triggered manually",
    "",
    "EXECUTION SUMMARY",
    "Independent jobs (no dependencies): package, test",
    "coverage runs after test",
    "",
    "IMPLEMENTATION DETAILS",
    "1. package — runs on ubuntu-latest; 3 steps",
    "   - Checkout repository (https://github.com/actions/checkout)",
    "   - Setup Python (https://github.com/actions/setup-python)",
    "   - Check packages",
    "2. test — runs on ${{ matrix.os }}; 10 steps; matrix: 21 base combinations (python-version, os, nox-session, container) + 10 via include",
    "   - Checkout repository (https://github.com/actions/checkout)",
    "   - Setup Python ${{ matrix.python-version }} (https://github.com/actions/setup-python)",
    "   - Install uv (https://github.com/astral-sh/setup-uv)",
    "   - Install Chrome (https://github.com/browser-actions/setup-chrome)",
    "   - Force override system chrome",
    "   - Install Firefox (https://github.com/browser-actions/setup-firefox)",
    "   - Install node.js (https://github.com/actions/setup-node)",
    "   - Cache pyodide downloads in nox cache (https://github.com/actions/cache)",
    "   - Run tests",
    "   - Upload coverage data (https://github.com/actions/upload-artifact)",
    "3. coverage — runs on ubuntu-24.04; 7 steps; after test; condition: always()",
    "   - Checkout repository (https://github.com/actions/checkout)",
    "   - Setup Python (https://github.com/actions/setup-python)",
    "   - Install uv (https://github.com/astral-sh/setup-uv)",
    "   - Install coverage",
    "   - Download coverage data (https://github.com/actions/download-artifact)",
    "   - Combine & check coverage",
    "   - Upload report if check failed (https://github.com/actions/upload-artifact)",
    "",
    "ENVIRONMENT VARIABLES",
    "- FORCE_COLOR: 1",
    "- CHROME_PATH: ${{ steps.setup-chrome.outputs.chrome-path }} (used in job: test, step: Force override system chrome)",
    "- NOX_SESSION: ${{ matrix.nox-session != '' && matrix.nox-session || format('test-{0}', matrix.python-version) }} (used in job: test, step: Run tests)"
],
  mermaid: [
    "flowchart LR",
    "    package[\"package\"]",
    "    test[\"test [matrix: 21 base combinations (python-version, os, nox-session, container) + 10 via include]\"]",
    "    coverage[\"coverage [if: always()]\"]",
    "    test --> coverage"
],
};
