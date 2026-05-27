# Linear — Signal Analysis

> Source: DevTools inspection + [getdesign.md/linear.app](https://getdesign.md/linear.app/design-md) + [fontofweb.com/tokens/linear.app](https://fontofweb.com/tokens/linear.app)
> Last updated: 2026-05

---

## Signal profile: Minimal Dark

**One-line read:** Linear's tokens say *"we are precise, serious, and here to get work done."*

---

## Raw token data

### Color

```css
/* Backgrounds — near-black surface ladder */
--color-bg-primary:   #0e0e0f;
--color-bg-secondary: #141415;
--color-bg-elevated:  #1a1a1b;

/* Borders — hairline, barely visible */
--color-border:       rgba(255,255,255,0.08);
--color-border-strong: rgba(255,255,255,0.14);

/* Brand accent — violet/purple, used sparingly */
--color-accent:       #5e6ad2;
--color-accent-hover: #6e79d6;

/* Text hierarchy */
--color-text-primary:   #e5e5e6;
--color-text-secondary: #8a8a8a;
--color-text-tertiary:  #5a5a5a;
```

### Typography

```css
/* Single typeface throughout */
--font-family: 'Inter', -apple-system, sans-serif;

/* Scale — restrained, 5 levels */
--text-xs:   11px;
--text-sm:   12px;
--text-base: 14px;
--text-lg:   16px;
--text-xl:   20px;

/* Weight — only two values used */
--font-weight-normal:  400;
--font-weight-medium:  500;
/* 600+ almost never appears */

/* Tracking — slightly tight */
--letter-spacing-tight: -0.01em;
--letter-spacing-base:   0em;
```

### Form (radius + spacing)

```css
/* Radius — small, consistent */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
/* No large radius values */

/* Spacing — 4px base grid */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;

/* Shadows — almost none */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
/* Depth is implied by surface color steps, not shadows */
```

---

## Signal reading

### What the color says

The near-black surface ladder (`#0e0e0f` → `#141415` → `#1a1a1b`) creates hierarchy through **almost imperceptible steps** — you feel the depth without seeing a clear border. This signals: *we trust your eye, we don't need to explain the hierarchy to you.*

The violet accent appears in roughly 5% of all UI elements. Restraint at this level signals confidence — the product doesn't need to wave for your attention.

Text at three opacity levels (`#e5e5e6` / `#8a8a8a` / `#5a5a5a`) creates a clean reading hierarchy without any color. This is a deliberate choice to say: *information is organized by weight, not by color distraction.*

### What the typography says

Inter at 14px with weight 400/500 only is a declaration: *we are neutral, we get out of the way.* The near-absence of `font-weight: 600+` means nothing shouts. Everything is a level conversation.

The tight letter-spacing (`-0.01em`) adds a fractional precision that sans-serif alone wouldn't have. It reads as engineered rather than designed.

### What the form says

`border-radius: 6px` is the critical middle ground — not sharp enough to feel hostile, not round enough to feel friendly. It signals: *professional tool, not a consumer app.*

No large shadows. Elevation is handled by the surface color ladder. This is an engineering choice translated into design: *the lightest possible solution to a hierarchy problem.*

---

## Signal axis position

| Dimension | Linear's position |
|-----------|------------------|
| Color temperature | ◼◼◼◼◻ Cool |
| Color saturation | ◼◻◻◻◻ Near-monochrome |
| Formality | ◼◼◼◼◻ Formal |
| Form softness | ◼◼◻◻◻ Slightly soft |
| Density | ◼◼◼◻◻ Medium-dense |

**Coherence check:** All axes point in the same direction — precise, cool, controlled, professional. No cross-axis conflict.

---

## What would break it

- Add `border-radius: 16px` to cards → suddenly feels like a consumer/mobile app, conflicts with the precision signal
- Use `font-weight: 700` for headings → introduces an aggression the rest of the system doesn't support
- Introduce a warm color (`#F59E0B`) as a secondary accent → warm vs. cool conflict, the product starts sending two personality signals simultaneously
- Increase surface contrast steps → the implied depth becomes explicit, loses the "trust your eye" subtlety
