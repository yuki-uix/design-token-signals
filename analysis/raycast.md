# Raycast — Signal Analysis

> Source: DevTools inspection + [getdesign.md/raycast](https://getdesign.md/raycast/design-md) + [github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/raycast/DESIGN.md)
> Last updated: 2026-05

---

## Signal profile: Bold Dark

**One-line read:** Raycast's tokens say *"this is powerful software, built for people who know what they're doing."*

---

## Raw token data

### Color

```css
/* Backgrounds — deeper black than Linear */
--color-bg-primary:   #070809;
--color-bg-secondary: #0d0d0d;
--color-bg-elevated:  #101111;

/* Borders — hairline, sharp definition */
--color-border:        #242728;
--color-border-subtle: rgba(255,255,255,0.06);

/* Accent — signature red gradient (hero only) */
--color-accent-red-start: #ff6363;
--color-accent-red-end:   #ff2c2c;

/* Category accents — saturated, varied */
/* Used only in product tile illustrations */
--color-category-blue:   #4f8ef7;
--color-category-green:  #34d399;
--color-category-orange: #fb923c;

/* Text */
--color-text-primary:   #f5f5f5;
--color-text-secondary: #888;
--color-text-muted:     #555;
```

### Typography

```css
/* Inter with ss03 stylistic set — subtle but deliberate */
--font-family: 'Inter', -apple-system, sans-serif;
--font-feature-settings: 'ss03' on; /* straighter 'a' — more technical feeling */

/* Slightly larger than Linear's scale */
--text-sm:   13px;
--text-base: 15px;
--text-lg:   18px;
--text-xl:   24px;
--text-2xl:  32px;

/* Weight — bolder range used */
--font-weight-normal:    400;
--font-weight-medium:    500;
--font-weight-semibold:  600; /* appears in nav, labels */
--font-weight-bold:      700; /* hero headlines */
```

### Form (radius + spacing)

```css
/* Radius — slightly more expressive than Linear */
--radius-sm:  4px;
--radius-md:  8px;
--radius-lg:  10px;
--radius-xl:  12px; /* used on product tiles */

/* Borders — explicit 1px, not just color steps */
border: 1px solid #242728; /* structural, defines edges clearly */

/* Spacing — 4px grid, similar to Linear */
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;

/* Shadows — slightly more present */
--shadow-card: 0 2px 8px rgba(0,0,0,0.6);
```

---

## Signal reading

### What the color says

Raycast goes **deeper black** than Linear (`#070809` vs `#0e0e0f`). The extra darkness signals: *this is a tool that disappears so your work can appear.* The interface recedes even further.

The explicit `1px solid #242728` border is the key difference from Linear. Where Linear implies structure through surface steps, Raycast **draws the line**. This signals a more assertive personality — the product has edges, it knows its boundaries.

The red gradient hero wordmark is a controlled explosion: saturated, bold, one moment of intensity in an otherwise monochrome canvas. The signal is: *we are capable of drama, we just choose when to deploy it.* This is confidence, not restraint.

Category accents (blue, green, orange) are completely isolated to product illustration tiles — they never bleed into the functional UI. This separation signals: *decoration and function are different things, and we don't confuse them.*

### What the typography says

`font-feature-settings: 'ss03'` is a detail most users will never notice consciously — but it changes the lowercase `a` to a single-story form that reads as more **technical and precise**. This is a signal aimed at developers, who notice such things. It says: *we share your attention to detail.*

Using `font-weight: 700` in headlines is a departure from Linear's restraint. Raycast is willing to **raise its voice** — but only in the right context. This signals power without aggression.

### What the form says

`border-radius: 10–12px` on tiles is noticeably rounder than Linear's 6px. This creates a slight softness in the product presentation layer — the features feel **approachable**, even as the overall canvas is severe. It's a tension that works because the roles are clear: canvas is serious, content is inviting.

---

## Signal axis position

| Dimension | Raycast's position |
|-----------|-------------------|
| Color temperature | ◼◼◼◼◼ Coldest |
| Color saturation | ◼◼◻◻◻ Mostly monochrome, accent moments |
| Formality | ◼◼◼◼◻ Formal |
| Form softness | ◼◼◼◻◻ Medium |
| Density | ◼◼◻◻◻ Airy |

**Coherence check:** Deep black canvas + assertive borders + bold type in headlines + saturated accent moments = a consistent "powerful, developer-native" signal. The slight roundness on product tiles is intentional softening in the right layer.

---

## Linear vs. Raycast: same family, different personality

Both are dark, minimal, Inter-based. But the signals diverge:

| Token | Linear | Raycast | Signal difference |
|-------|--------|---------|------------------|
| Background | `#0e0e0f` | `#070809` | Raycast recedes further |
| Border style | Color steps only | Explicit `1px solid` | Raycast has harder edges |
| Accent color | Violet, 5% presence | Red gradient, hero only | Raycast more dramatic |
| Font weight max | 500 | 700 | Raycast willing to shout |
| Radius | 6px | 8–12px | Raycast slightly warmer |

Same genre. Different character.

---

## What would break it

- Make borders `rgba` instead of `#242728` → edges soften, the assertive personality becomes ambiguous
- Replace the red gradient with a muted accent → the product loses its one moment of personality, becomes generic dark SaaS
- Apply `font-weight: 700` throughout, not just headlines → the drama becomes noise, the signal of "controlled power" disappears
- Use `border-radius: 20px+` on cards → the serious canvas and the round cards create a playful/serious conflict
