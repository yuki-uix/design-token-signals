# Candidate conflict rules

Version: **0.1 — unvalidated hypotheses**, 2026-09-20. This is the small experiment in [#39](https://github.com/yuki-uix/design-token-signals/issues/39), not an audit implementation or a design standard.

The first two candidates look for a mismatch between a **declared design goal** and **observed component styling**. They do not infer intent from an industry, a theme name, a brand, or a color. The measurable conditions below identify something worth reviewing; they do not prove that an interface feels wrong.

## Decision contract

Evaluate a rule within one component/task, active theme, viewport, and interaction state. Never combine values from unrelated selectors or light/dark themes.

| Result | Meaning |
| --- | --- |
| `potential-conflict` | All required evidence is available and all trigger conditions hold. Explain the observed mismatch and a possible change; request human judgment. |
| `no-conflict-found` | Required evidence is available, but a trigger condition is false or a documented exception applies. This conclusion covers only this rule and scope. |
| `insufficient-information` | Required intent, resolved values, usage, or rendering evidence is missing or ambiguous. Name what is missing; do not count this as a clean bill of health. |

A token file can establish that a variable is declared and what its literal value is. It cannot establish where it is used, which declaration wins, how often it appears on screen, or what a user perceives. If aliases, cascade, inheritance, states, or responsive overrides cannot be resolved, stop at `insufficient-information`.

Report evidence separately from interpretation:

- **Evidence:** input file/selector, original variable name and value, resolved value where available, active scope, and the user's stated goal or approved reference.
- **Interpretation:** why that observation might undermine the goal; label it a hypothesis.
- **Suggestion:** the smallest local change, proposed value, and tradeoff. A proposed value is not an observed input value.
- **Limits:** unchecked states, missing coverage, and any competing explanation.

No numerical “professionalism,” “trust,” or “conflict severity” score is assigned. Neither rule is an accessibility-conformance check.

## SIG-001 · Reading rhythm departs from an explicit baseline

**Status:** candidate; perceptual effect and usefulness have not been field-validated.

**Dimensions:** typography and spacing, interpreted in the context of the desired reading pace. Background warmth and rounded corners may be part of the brief, but are not trigger conditions or remedies by themselves.

### Goal and applicability

The component is a multi-line body-text reading surface. The project explicitly asks for relaxed reading and supplies an approved minimum line-height ratio and paragraph gap for this component and viewport. The baseline must come from the project/user or an explicitly accepted reference, not be invented by the auditor.

“Make it warm” alone is insufficient. Headings, captions, buttons, tables, and compact status displays are outside this rule unless the brief explicitly gives them the same reading baseline.

### Required inputs

1. The design goal and accepted body-text baseline, including its scope.
2. CSS/token declarations and the actual body-text selectors that consume them.
3. Resolved font size, line height, and paragraph gap at the checked viewport/state.
4. A rendering with representative multi-line content, confirming the component role and that another layout mechanism does not supply the missing paragraph separation.

### Checkable trigger

All of these must hold:

1. The goal, component role, and baseline are confirmed for the same scope.
2. Actual line-height / font-size is **below the accepted baseline ratio**.
3. Actual paragraph separation is **below the accepted minimum gap**.
4. Both values apply to the rendered body text, with no approved compact-mode exception.

This conjunction is deliberately narrow: a single difference is not a finding under this rule. “Below” is a numeric comparison of resolved values in compatible units. Unresolved `normal`, missing fonts, or uncertain margin collapsing require additional evidence rather than guessing.

### Interpretation and change

Hypothesis: the intended relaxed reading pace is weakened by simultaneous compression within and between paragraphs. Warm colors or large corners do not establish that the reading pace matches the brief.

Restore the two local text tokens to the accepted baseline and compare the result using the same content. Do not globally loosen headings or tables. **Tradeoff:** longer pages, less content visible at once, and potentially more scrolling. If density is an intentional product requirement, revisit the brief instead of forcing the original baseline.

### Evidence and counterexamples

- **Supporting specimen:** [S1 in candidate examples](examples/candidate-inputs.md#s1--reading-surface-below-its-stated-baseline), a constructed mutation of this repository's Warm Organic values, with an explicit reading brief. Expected result: `potential-conflict`.
- **Counterexample:** [N1](examples/candidate-inputs.md#n1--compact-title-relaxed-body), where tight leading belongs to a title and the body retains its baseline. Expected result: `no-conflict-found` for the body scope. Mixed typography roles are intentional here.
- **Missing evidence:** [U1](examples/candidate-inputs.md#u1--only-a-palette-and-radius). Expected result: `insufficient-information`.

Source of the hypothesis: Warm Organic's rationale and “Room to think” copy in [js/demo.js](../js/demo.js), and its `--leading-base: 1.65` in [tokens.css](../tokens.css). These describe this project's intent, not empirical proof. The actual demo also uses `line-height: 1.1` for `.hero-h1` alongside theme-dependent body leading in [demo.html](../demo.html), illustrating why role matters.

**Threshold boundary:** 1.65 and 16px in S1 are specimen-specific agreed values, not universal cutoffs. The proposition that this mismatch harms the experience is an unvalidated design hypothesis, not a measured outcome.

## SIG-002 · Primary and secondary actions share the same emphasis treatment

**Status:** candidate; perceptual effect and usefulness have not been field-validated.

**Dimensions:** accent color, typography, and form, relative to an explicitly intended action hierarchy. Accent saturation alone is not a trigger.

### Goal and applicability

One action is explicitly primary and another secondary in the same decision group and default state. The brief says the primary should be visually distinguished through its treatment. Both are visible and enabled. Do not assume “secondary” from DOM order or a CSS class name alone; confirm the task roles.

### Required inputs

1. The intended primary/secondary roles and desired hierarchy, including any approved equal-emphasis exception.
2. Both actions' markup, CSS/token usage, and resolved styling in the same active state.
3. A rendering confirming they share the same decision group and that icon, size, placement, or another explicit treatment does not already provide the intended distinction.

### Checkable trigger

All of these must hold:

1. The brief calls for unequal visual emphasis in this action group.
2. Both actions use the same resolved accent fill and foreground color.
3. They also share the same font size/weight, padding, border, radius, and shadow treatment.
4. The rendering confirms no separate differentiation implements the intended hierarchy, and no approved equal-emphasis exception applies.

Conditions 2–3 are style observations. Condition 4 requires visual/contextual review; equality of a few CSS values cannot prove equal perceived salience. Token-only input therefore cannot produce a finding.

### Interpretation and change

Hypothesis: equivalent accent treatment may make the secondary action compete with the intended primary. The issue is the declared hierarchy in this group, not the presence of several accent-colored elements across a page.

Try changing only the secondary action to the project's existing neutral/outline treatment, retaining its text label and behavior. Check the resulting legibility, keyboard focus, and other states separately. **Tradeoff:** the secondary action becomes less prominent and may be harder to discover. An alternative is to retain equal emphasis and explicitly revise the intended hierarchy if both choices are equally valid.

### Evidence and counterexamples

- **Supporting specimen:** [S2](examples/candidate-inputs.md#s2--a-primarysecondary-group-with-identical-treatment), a constructed use of Clean Light variables with an explicit primary/secondary brief. Expected result: `potential-conflict`.
- **Counterexample:** [N2](examples/candidate-inputs.md#n2--equal-status-choices), using the same styling for two deliberately equal choices. Expected result: `no-conflict-found` because the unequal-emphasis premise is false.
- **Missing evidence:** [U2](examples/candidate-inputs.md#u2--accent-variable-with-no-usage). Expected result: `insufficient-information`.

Source of the hypothesis: the primary filled and secondary outlined button treatments in [demo.html](../demo.html), with accent, background, and border variables from [tokens.css](../tokens.css). This existing implementation supplies a local reference, not evidence that all products should follow it. `antiCases` entries do not prove an action hierarchy.

**Threshold boundary:** there is no maximum accent count, saturation cutoff, or primary-button quota. Style equality is a candidate-screening condition, not a perceptual theorem. A selected tab, destructive action, focus state, or different component group must be evaluated in its own context and may invalidate applicability.

## Evidence status and next decision

The supporting specimens are authored examples with expected outcomes, not external validation. They make the hypotheses reviewable and expose counterexamples; they do not measure precision, recall, or user benefit.

Next: build the visual before/after case in [#40](https://github.com/yuki-uix/design-token-signals/issues/40), implement the scoped prototype in [#45](https://github.com/yuki-uix/design-token-signals/issues/45), then collect external-project evidence and a continue/narrow/stop decision in [#47](https://github.com/yuki-uix/design-token-signals/issues/47). A token-only prototype may legitimately return `insufficient-information` for both rules.

## Revision log

| Version | Change | Evidence boundary |
| --- | --- | --- |
| 0.1 · 2026-09-20 | Two goal-dependent candidates, each with a supporting specimen, counterexample, and missing-input case | Author-constructed specimens and local source inspection only; no field validation |

Keep IDs stable. Record changed conditions, reasons, and effects on prior examples when revising a rule. Do not silently redefine a failing example to make a rule pass.
