# design-token-signals

> Design tokens are not just variables — they are signals.
> Every token choice communicates something to the user before they read a single word.

---

## What this repo is

Most design token resources focus on **how to organize tokens** — naming conventions, layer hierarchy, tooling.

This repo focuses on a different question: **what do token choices communicate?**

A `border-radius: 2px` signals precision and seriousness.
A `border-radius: 16px` signals approachability and softness.
Neither is wrong. But mixing both in the same interface sends two conflicting signals — and users feel it, even if they can't name it.

This is a reference library for:
- Reading the signals behind token choices in well-designed products
- Understanding why certain token combinations feel coherent
- Identifying the token-level source of visual dissonance

---

## Structure

```
/analysis          ← Reverse-engineering real products' token decisions
/profiles          ← Curated token sets organized by signal profile
  /minimal-dark    ← Precision · Focus · Professional (Linear-influenced)
  /bold-dark       ← Power · Developer-native · Premium (Raycast-influenced)
  /warm-organic    ← Warmth · Approachability · Creative (Craft-influenced)
/conflicts         ← Case studies of token-level signal conflicts
```

---

## Signal dimensions

Each token set can be mapped across three axes:

| Dimension | Signal axis |
|-----------|-------------|
| **Color** | Cool ←→ Warm · Muted ←→ Saturated · Light ←→ Dark |
| **Typography** | Formal ←→ Friendly · Traditional ←→ Modern |
| **Form** (radius + spacing) | Serious ←→ Playful · Dense ←→ Airy |

Conflict occurs when token choices pull in opposite directions across these axes — for example, a warm saturated color palette combined with sharp 0px radius and condensed tight typography.

---

## Analysis sources

Product token data sourced from DevTools inspection and [getdesign.md](https://getdesign.md).
Signal interpretation is the original layer this repo adds.

---

## Status

| Product | Analysis | Profile |
|---------|----------|---------|
| Linear | 🔄 In progress | `minimal-dark` |
| Raycast | 🔄 In progress | `bold-dark` |
| Craft | 🔄 In progress | `warm-organic` |

---

*Part of an ongoing exploration into design engineering practice.*
