# Craft — Signal Analysis

> Source: DevTools inspection of craft.do
> Last updated: 2026-05

---

## Signal profile: Warm Organic

**One-line read:** Craft's tokens say *"thinking here feels natural, unhurried, and yours."*

---

## Raw token data

### Color

```css
/* Backgrounds — warm whites, not pure white */
--color-bg-primary:    #fafaf8; /* warm off-white */
--color-bg-secondary:  #f5f5f2;
--color-bg-elevated:   #ffffff;

/* Borders — warm gray, not cool gray */
--color-border:        #e8e8e4;
--color-border-subtle: rgba(0,0,0,0.06);

/* Brand — warm coral/salmon, not a standard blue */
--color-accent:        #e8643a;
--color-accent-light:  #fdf0eb;

/* Text — warm near-black */
--color-text-primary:   #1a1a18;
--color-text-secondary: #6b6b65;
--color-text-muted:     #9f9f98;
```

### Typography

```css
/* Mixed typefaces — the key signal difference */
--font-display: 'New York', 'Georgia', serif;     /* headlines */
--font-body:    'SF Pro Text', -apple-system, sans-serif; /* body */

/* Larger, more generous scale */
--text-sm:   13px;
--text-base: 16px;  /* larger than Linear/Raycast */
--text-lg:   20px;
--text-xl:   28px;
--text-2xl:  40px;

/* Weight — comfortable range */
--font-weight-normal:   400;
--font-weight-medium:   500;
--font-weight-semibold: 600;

/* Line height — generous */
--leading-base: 1.6;  /* roomier than default 1.5 */
--leading-lg:   1.4;
```

### Form (radius + spacing)

```css
/* Radius — noticeably rounder */
--radius-sm:  6px;
--radius-md:  10px;
--radius-lg:  14px;
--radius-xl:  20px; /* cards, modals */

/* Spacing — generous, document-like */
--space-2:   8px;
--space-3:  16px;
--space-4:  24px;
--space-6:  40px;
--space-8:  64px; /* section breathing room */

/* Shadows — present, warm */
--shadow-card: 0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06);
```

---

## Signal reading

### What the color says

`#fafaf8` is the most important token in Craft's palette — a white with a barely perceptible warmth. Pure white (`#ffffff`) reads as clinical and digital. `#fafaf8` reads as **paper**. This single token shifts the entire emotional register of the product from "software interface" to "writing space."

The warm gray text (`#6b6b65` has a slight yellow undertone) continues this logic. Cool gray reads as UI. Warm gray reads as **ink on page**.

The coral accent (`#e8643a`) is the bravest color choice in this set. It's not the safe SaaS blue — it's the color of enthusiasm, creativity, something handmade. Paired with the warm background, it reads as a **person's choice**, not a brand committee's decision.

### What the typography says

Using a serif (`New York` / `Georgia`) for display text is the highest-signal decision in Craft's token set. Every other major productivity tool uses sans-serif throughout. Craft's serif says: *this is a writing tool, and writing has a tradition.*

The body text returns to system sans-serif — this combination (serif headlines + sans body) is borrowed from editorial design. It signals: **content is what matters here, the interface is the page, not the product.**

`line-height: 1.6` is generous by software standards (most apps use 1.4–1.5). The extra space is a signal: *slow down, take your time, there's room to think.*

### What the form says

`border-radius: 14–20px` on cards is the roundest in our three-product set. Combined with warm backgrounds and generous spacing, the interface feels **cushioned** — nothing has a sharp edge, nothing feels urgent or demanding.

The shadow (`0 2px 12px rgba(0,0,0,0.08)`) is the warmest and most present of the three products. Where Linear implies depth through surface steps and Raycast draws explicit borders, Craft **lifts** its elements slightly off the page. This signals dimensionality and care — like a well-crafted physical object.

---

## Signal axis position

| Dimension | Craft's position |
|-----------|----------------|
| Color temperature | ◻◻◻◻◼ Warmest |
| Color saturation | ◼◼◼◻◻ Moderate (warm accent) |
| Formality | ◼◼◻◻◻ Approachable |
| Form softness | ◻◻◻◻◼ Softest |
| Density | ◻◻◻◼◼ Airy |

**Coherence check:** Warm whites + serif headlines + coral accent + round radius + generous spacing = a consistent "human, thoughtful, document-first" signal. Every token points toward the same feeling.

---

## The three-product contrast

| Token | Linear | Raycast | Craft |
|-------|--------|---------|-------|
| Background | Near-black | Deepest black | Warm off-white |
| Color temperature | Cool | Coldest | Warm |
| Accent | Violet | Red | Coral |
| Typography | Inter only | Inter + ss03 | Serif + sans |
| Radius max | 8px | 12px | 20px |
| Line height | 1.4 | 1.4 | 1.6 |
| Shadow | Minimal | Structural | Warm lift |
| **Signal** | Precision | Power | Humanity |

Three products, three completely different first impressions — built from token choices, not illustrations or marketing copy.

---

## What would break it

- Replace `#fafaf8` with `#ffffff` → loses the paper metaphor, becomes generic light SaaS
- Replace serif with Inter → the "writing tool" signal disappears entirely, becomes productivity software
- Reduce `line-height` to 1.4 → the spaciousness that signals "room to think" disappears
- Change coral accent to `#3B82F6` → the personal, handmade feeling replaced by generic SaaS blue
- Tighten border-radius to 6px → the cushioned, warm feeling becomes crisp and clinical — Craft becomes a different product
