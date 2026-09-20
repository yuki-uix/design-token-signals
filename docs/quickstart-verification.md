# Quickstart verification

## Scope and conditions

Checked on 2026-09-20 against the demo implementation at `25d8849`, with this README and example added. Local HTTP server, Playwright Chromium, desktop viewports of 1440×1000 (gallery demo) and 1440×900 (example), and a 390×844 mobile example viewport.

The implementation assistant (Codex) read the downloaded reference and used the prompt in [prompt.md](../examples/minimal-dark/prompt.md) to produce the standalone HTML/CSS example. No separate blind generation trial or external-user session was performed. The screenshots are actual browser renders. This record covers local behavior; it does not certify the deployed site or general model compliance.

## Reproduce the flow

1. From the repository root, run `python3 -m http.server 4200`.
2. Open `http://localhost:4200/`, search for `minimal`, and select Minimal Dark.
3. Click **导出 .signal.md**. Compare the download with [the checked-in reference](../examples/minimal-dark/minimal-dark.signal.md): they should match byte for byte for this source version.
4. Read the example prompt, then inspect `examples/minimal-dark/index.html` and `styles.css`. The exported declarations are wrapped in `:root`; layout decisions are documented in the [example README](../examples/minimal-dark/README.md).
5. Open `http://localhost:4200/examples/minimal-dark/`. Check the primary link, then resize to 390px wide.
6. To independently try generation, use the same reference and prompt in a separate project. Record the assistant/model and changes you needed; do not assume this example predicts the result.

## Results

| Check | Result |
| --- | --- |
| Gallery keyword search → Minimal Dark demo | Passed through actual browser controls |
| Export → post-download guidance | Download completed; guidance appeared |
| All nine profiles → full JSON token panel | Each parsed as JSON with 29 theme variables |
| Checked-in `.signal.md` versus fresh download | Exact match |
| Example's 29 computed custom properties versus downloaded declarations | All matched |
| Example's primary action | Navigated to `#activity` |
| Mobile example | No horizontal overflow; stacked cards and activity rows visually inspected |
| Desktop example and demo screenshot | Visually inspected |
| Browser JavaScript errors during these flows | None |

The sample styles use only defined custom properties. The example has no runtime dependency on the gallery, no build step, and no downloaded font requirement.

## Friction found and documented

- `.signal.md` does not auto-register itself as an agent instruction. The quickstart explicitly references its path.
- Exported CSS declarations inside the Markdown need a selector such as `:root` before use in a stylesheet.
- The export omits the shared spacing scale and font files. The example supplies layout spacing and uses the declared font fallback.
- The UI/export rationale currently mixes English and Chinese. The sample preserves the real download rather than silently translating it.
- Opening the demo with `file://` is insufficient for the export's `fetch`; the local instructions use an HTTP server.

## External acceptance still pending

Issue #48 also requires someone unfamiliar with the project to explain its purpose and complete the flow. That has **not** been verified by this implementation session. Keep the issue open until a real trial is recorded.

Suggested trial: send only the README to a new user, ask what they expect the tool to do, then observe them choose, export, and explicitly reference a profile in their own project. Record completion, confusion, needed help, and whether the result was useful. Do not count the author's or implementation assistant's self-check as that trial.
