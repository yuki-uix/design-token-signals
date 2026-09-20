# Conflict audit experiment

This directory investigates whether a small set of contextual rules can identify token choices that undermine a declared design goal. Contrasting colors, radii, or type styles are not automatically conflicts.

## Available now

- [Two candidate rules](rules.md): required inputs, checkable conditions, exceptions, possible changes, and tradeoffs.
- [Supporting specimens and counterexamples](examples/candidate-inputs.md): authored examples with explicit provenance and expected outcomes, including missing-information cases.

The rules are unvalidated hypotheses. There is no runnable audit or installable Skill yet. Token-only input is insufficient for these candidates because component use, intent, and rendering matter.

- [Reading-rhythm visual case](case-01-playful-meets-formal.md): runnable original, restored baseline, and compact-title counterexample; independent human review pending.

## Next experiments

- [#40: human review of the visual case](https://github.com/yuki-uix/design-token-signals/issues/40). Record whether the proposed change fits the reading goal, including disagreement.
- [#45: scoped audit prototype](https://github.com/yuki-uix/design-token-signals/issues/45).
- [#47: external-project validation](https://github.com/yuki-uix/design-token-signals/issues/47), including counterexamples and user feedback before deciding whether to productize.

Additional density and decorative-accent cases remain later candidates. They need usage/rendering evidence; token definitions alone cannot establish how much color is on screen.

## How to read a case

1. **The feeling** — state the desired experience and the observed or hypothesized mismatch. Do not present the author's impression as user research.
2. **The conflicting axes** — explain the relevant dimensions in this component's context.
3. **The specific tokens** — identify original values and where they are actually consumed.
4. **The resolution** — propose the smallest change, its cost, and a reasonable exception or alternative.

A case should include the design brief, comparable before/after renders, source evidence, and what remains uncertain. Rule revisions are tracked in [rules.md](rules.md#revision-log).
