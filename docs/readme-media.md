# README media

These assets show the existing static tool, not the experimental audit. Captured on 2026-09-20 from the demo at `b578aa9` with Playwright Chromium.

## Assets and provenance

- `images/theme-comparison.png`: actual Clean Light, Minimal Dark, and Warm Organic demo screenshots. Each capture uses a 1440×900 viewport and the same 1172×470 hero crop at (0, 80). Only the surrounding labels and comparison layout are added. Both tokens and profile copy change in the underlying demo; this is not a controlled tokens-only experiment.
- `images/choose-and-export.gif`: actual browser video, encoded at 8 fps and 1000px wide. It shows keyword entry, selection of Minimal Dark, a real `.signal.md` download, and the post-export instructions. It does not simulate a download by inserting UI.
- `images/minimal-dark-demo.png`: static export-control reference from #48.
- `images/minimal-dark-example.png`: rendered result of applying the exported reference in the [standalone example](../examples/minimal-dark/). Its conditions and limitations are in the [quickstart verification record](quickstart-verification.md); this remains one implementation, not a model reliability benchmark.

The README provides descriptive alternative text and a static walkthrough alongside the GIF.

## Regenerate the comparison and GIF

Prerequisites: Node.js, Playwright with Chromium installed, and `ffmpeg` on PATH. These are authoring tools only; the site has no new runtime dependency. Make Playwright resolvable by Node (a local install or `NODE_PATH` pointing to your existing package directory).

From the repository root, start the static server:

```sh
python3 -m http.server 4200
```

In another terminal:

```sh
node scripts/capture-readme-media.cjs http://127.0.0.1:4200
```

The script writes the two assets, confirms that the browser download matches the checked-in example byte for byte, rejects JavaScript page errors, and fails if the GIF exceeds 5,000,000 bytes. It prints the temporary source-video path for inspection. If the theme changes, review and refresh the example deliberately before regenerating.

Review the three theme panels and the GIF's search, filtered result, theme page, and final guidance frames before committing. Font availability, browser version, and network font loading can affect rendering. The script waits for fonts and theme transitions; exact pixel reproducibility across systems is not guaranteed.

## Validation

The capture completed without JavaScript errors and its download matched `examples/minimal-dark/minimal-dark.signal.md`. The generated GIF is below the 5 MB limit. The theme comparison and representative GIF frames were visually inspected; local Markdown links and JavaScript syntax were also checked. No product code changed for this recording.
