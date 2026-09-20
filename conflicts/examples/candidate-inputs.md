# Candidate rule examples

These are **authored, illustrative input specimens**, not observations from external products. Snapshot sources are this repository at `82f82a1`: [tokens.css](../../tokens.css), [js/demo.js](../../js/demo.js), and [demo.html](../../demo.html). The CSS below shows the original values for each specimen; proposed fixes are stated separately.

Expected judgments are design hypotheses supplied by the author, not measured ground truth. A future audit should cite the specific supplied files, selectors, brief, and rendering; it must not invent that missing evidence from these descriptions. Browser before/after evidence remains the next task (#40).

## S1 · Reading surface below its stated baseline

**Source:** constructed mutation of Warm Organic. The warm background, body size, and radius are taken from the snapshot theme. The tighter line height and 4px gap are introduced for this specimen, not claimed to exist in the original product.

**Supplied brief:** a long-form reading card should feel unhurried. For `.reading-copy` at desktop width, the project owner has accepted 16px body text, a minimum 1.65 line-height ratio, and at least 16px between paragraphs. No compact mode is requested.

**Specimen input — `reading.css`:**

```css
:root {
  --color-bg: #fafaf8;
  --radius-lg: 16px;
  --text-base: 16px;
  --reading-leading: 1.1;
  --reading-paragraph-gap: 4px;
}
.reading-card { background: var(--color-bg); border-radius: var(--radius-lg); }
.reading-copy { font-size: var(--text-base); line-height: var(--reading-leading); }
.reading-copy p { margin: 0; }
.reading-copy p + p { margin-top: var(--reading-paragraph-gap); }
```

**Usage/evidence to supply:** representative paragraphs inside `.reading-copy` and a rendering at the specified viewport. Verify 17.6px line height at 16px font size, 4px visible paragraph separation, and no alternative gap mechanism. These are expected values from the constructed CSS; they have not been captured from an external site.

**Expected judgment, once that usage/render evidence is supplied:** `SIG-001 / potential-conflict`. Both dimensions are below the supplied baseline. The proposed change is `--reading-leading: 1.65` and `--reading-paragraph-gap: 16px` scoped to this reading surface. It increases vertical space and scrolling. No claim is made that warm color plus tight typography is inherently wrong.

**Without the rendering or accepted brief:** `insufficient-information`, not a confirmed finding. This written specimen by itself is not complete runtime evidence.

## N1 · Compact title, relaxed body

**Source:** role distinction already present in the local demo: `.hero-h1` has `line-height: 1.1`, while body copy uses theme-dependent leading. This specimen simplifies that pattern; it is not an exact copy of all demo CSS.

Use S1's accepted brief for the **body only**, with:

```css
:root {
  --title-leading: 1.1;
  --reading-leading: 1.65;
  --reading-paragraph-gap: 16px;
}
.reading-title { line-height: var(--title-leading); }
.reading-copy { font-size: 16px; line-height: var(--reading-leading); }
.reading-copy p { margin: 0; }
.reading-copy p + p { margin-top: var(--reading-paragraph-gap); }
```

**Expected judgment with confirmed usage/rendering:** `SIG-001 / no-conflict-found` for the body scope. Its values meet the brief. The title's compact leading is not body evidence and does not invalidate that result. A tight title with relaxed paragraphs is the intentional counterexample to “mixed leading is a conflict.”

## U1 · Only a palette and radius

**Source:** partial Warm Organic token snapshot.

```css
:root {
  --color-bg: #fafaf8;
  --radius-lg: 16px;
  --leading-base: 1.65;
}
```

No brief, consuming selector, viewport, or rendering is supplied. **Expected judgment:** `SIG-001 / insufficient-information`. Ask which reading component is under review and what baseline it should meet. Do not infer a relaxed reading task from the warm background or the profile name.

## S2 · A primary/secondary group with identical treatment

**Source:** constructed use of Clean Light's accent `#635bff` and radius `6px`. Equal treatment is introduced for this specimen; the repository demo normally distinguishes primary and secondary actions.

**Supplied brief:** in a single project-creation group, “Create project” is primary and “Browse examples” is secondary. The owner wants the primary visually distinguished by its button treatment. No approved equal-emphasis exception applies.

**Specimen input — `actions.css`:**

```css
:root {
  --color-accent: #635bff;
  --action-foreground: #ffffff;
  --action-weight: 600;
  --radius-md: 6px;
}
.project-actions button {
  appearance: none;
  background: var(--color-accent);
  color: var(--action-foreground);
  font-size: 14px;
  font-weight: var(--action-weight);
  padding: 10px 16px;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  box-shadow: none;
}
```

**Markup:**

```html
<div class="project-actions">
  <button type="button">Create project</button>
  <button type="button">Browse examples</button>
</div>
```

**Usage/evidence to supply:** both buttons enabled in the same default-state group, resolved styles matching the declarations, and a rendering showing no other treatment establishes the requested distinction. Different label widths, position, icons, focus, or responsive layout may change the interpretation; inspect rather than assume.

**Expected judgment if that evidence confirms all conditions:** `SIG-002 / potential-conflict`. Try the project's neutral/outline style for “Browse examples” only. Proposed properties are recommendations, not observed source values. **Tradeoff:** examples become less prominent; verify their discoverability and the revised contrast/focus behavior separately.

**Without the context/rendering:** `insufficient-information`. Identical declarations alone do not prove equal perceived emphasis or a user problem.

## N2 · Equal-status choices

**Source:** an intentional counterexample constructed with S2's exact styling, changing only labels and brief.

The buttons read “Personal project” and “Team project.” The owner explicitly wants two equal entry choices, with neither promoted over the other. Confirm that both are visible and enabled in the same group.

**Expected judgment with complete context:** `SIG-002 / no-conflict-found`. The unequal-emphasis prerequisite is false; two accent-filled controls are not intrinsically a conflict. An auditor must not invent a primary choice to justify a recommendation.

## U2 · Accent variable with no usage

**Source:** partial Clean Light token snapshot.

```css
:root { --color-accent: #635bff; }
```

No action roles, selectors, active state, or rendering are supplied. **Expected judgment:** `SIG-002 / insufficient-information`. The existence of one accent variable says nothing about the number or prominence of on-screen actions. Ask for the decision group and its intended hierarchy.

## Review matrix

| Rule | Supporting specimen with all requested evidence | Counterexample with complete context | Missing-input specimen |
| --- | --- | --- | --- |
| SIG-001 | S1 → potential-conflict | N1 → no-conflict-found | U1 → insufficient-information |
| SIG-002 | S2 → potential-conflict | N2 → no-conflict-found | U2 → insufficient-information |

These are expected branches for subsequent implementation, not automated test results. Independent review may reject the proposed interpretations; preserve that disagreement in the field notes rather than treating the rule text as proof.
