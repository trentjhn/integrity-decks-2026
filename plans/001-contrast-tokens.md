# 001 — Fix bronze-as-text contrast to WCAG AA

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 7 files, ~25 small class swaps + 1 token

## Problem

Bronze `#B26C3A` is used as *text* on light backgrounds (bone `#F4F1EA`, white) where it measures 3.6–4.1:1 — below the WCAG AA 4.5:1 threshold for small text. Measured on the running site: eyebrow labels ("What clients say" 3.65:1), service numbers ("01" 4.12:1 on white), category pills, "Founder & Lead Contractor". The primary CTA (navy `#102A47` text on bronze `#B26C3A`) measures exactly 3.53:1 — and no text color can pass 4.5:1 on that bronze, because it is a true mid-tone (best case is ink at 4.18:1). Inactive form step numbers (`text-ink/40` on `bg-ink/10`) measure ~1.9:1.

```jsx
/* src/pages/Home.jsx:356 — current (representative eyebrow) */
<div className="text-bronze text-sm uppercase tracking-[0.25em] mb-5" data-reveal>What clients say</div>
```

```jsx
/* src/pages/Home.jsx:176 — current (primary CTA, 3.53:1) */
<Link to="/contact" className="inline-flex items-center gap-2 bg-bronze text-navy rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-bone transition-colors">
```

```jsx
/* src/pages/Contact.jsx:61 — current (inactive step number, ~1.9:1) */
<span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i < step ? "bg-bronze text-navy" : i === step ? "bg-navy text-bone" : "bg-ink/10 text-ink/40"}`}>
```

## Target

Add one token — a deeper copper for *text-on-light and CTA-surface* use — and keep `#B26C3A` for hairlines, dots, icons, and text on navy (where it passes):

```js
/* tailwind.config.js — target: inside colors.bronze */
bronze: {
  DEFAULT: "#B26C3A",
  soft: "#C68A5A",
  text: "#8F5527", // AA-safe copper for text-on-light + CTA surfaces: 5.3:1 on bone, 6.0:1 on white, 4.65:1 on bone-dim/50 blends
},
```

Verified math (WCAG relative luminance): `#8F5527` L=0.125 → vs bone (L=0.880) = 5.3:1 ✓, vs white = 6.0:1 ✓, under bone text as a button surface = 5.3:1 ✓. (First candidate `#995A2E` passed bone/white but measured 4.21:1 on the `bg-bone-dim/50` sections — the runtime probe caught it; deepened one step.)

Three swap patterns:

1. **Eyebrows/labels/numbers on light bg**: `text-bronze` → `text-bronze-text` (only where the background is bone/bone-dim/white — NOT on navy sections, where `text-bronze`/`text-bronze-soft` on navy already passes).
2. **Primary CTA buttons**: `bg-bronze text-navy` → `bg-bronze-text text-bone`. CRITICAL: Home.jsx:176 and CtaBand.jsx:11 have `hover:bg-bone` with NO hover text color — after the swap, hover would be bone-on-bone (invisible). Add `hover:text-navy` to both. Same for the bronze category pills over images: `bg-bronze text-navy` → `bg-bronze-text text-bone`.
3. **Inactive step numbers** (Contact.jsx:61): `bg-ink/10 text-ink/40` → `bg-ink/10 text-ink/65` (5.10:1 composited over the white card); the inactive step *labels* (`text-ink/35` at Contact.jsx:60) → `text-ink/60` (4.67:1). (`/60` on the chip and `/55` on the label still fail AA at 4.36:1 and 3.97:1 — verified by composite math.)

## Repo conventions to follow

- Color tokens live in `tailwind.config.js` under `theme.extend.colors` with comment rationale — follow the existing comment style (see `bronze.DEFAULT`'s comment).
- Classes are inline Tailwind; there is no CSS-module layer.

## Steps

1. `tailwind.config.js`: add `text: "#995A2E"` to the `bronze` object with the comment above.
2. Sweep light-background bronze text (`grep -n "text-bronze" src/` and judge each): swap to `text-bronze-text` ONLY these locations —
   - `src/pages/Home.jsx`: statement stat numbers ("21+", "Family" at :216, :221), services eyebrow `{SERVICES[0].n}` (:274) and `{s.n}` (:286), "What clients say" (:356), the `hover:text-bronze` link states (:262, :343) stay as-is (hover states are transient; leave).
   - `src/pages/Services.jsx`: service numbers (:36), "Why homeowners choose us" (:81), "Good to know" (:102), why-us card numbers `text-bronze/90` (:89) → `text-bronze-text/90`.
   - `src/pages/About.jsx`: name-plate title (:29), "What we stand on" (:51).
   - `src/pages/Contact.jsx`: "Your free consultation includes" (:179).
   - Do NOT touch any `text-bronze`/`text-bronze-soft` inside `bg-navy`/`bg-navy-deep` sections (they pass on navy).
3. CTA/pill surfaces — swap `bg-bronze text-navy` → `bg-bronze-text text-bone` at:
   - `src/pages/Home.jsx:176` (hero CTA), `:37` (slideshow category pill), Contact submit `src/pages/Contact.jsx:147` (`bg-bronze text-navy` → `bg-bronze-text text-bone`, and its `hover:bg-navy hover:text-bone` stays), `src/components/CtaBand.jsx:11`, `src/components/Nav.jsx:82` (mobile menu CTA), `src/pages/Gallery.jsx:50` (category pill).
   - `src/pages/Contact.jsx:61`: the completed-step chip `bg-bronze text-navy` → `bg-bronze-text text-bone`.
4. `src/pages/Contact.jsx:60-61`: inactive step contrast bumps per Target #3.

## Boundaries

- Do NOT change bronze *hairlines, dots, icons, borders, or gradients* — decorative non-text elements are exempt from the 4.5:1 rule.
- Do NOT touch bronze usage on navy backgrounds.
- Do NOT rename existing tokens or alter `bronze.DEFAULT`/`bronze.soft`.
- This changes the CTA button surface visibly (slightly deeper copper). Flag it in the commit body for client review; if the client prefers the lighter bronze, the fallback is reverting step 3 only.

## Verification

- **Mechanical**: `npm run build` completes; `grep -rn "bg-bronze text-navy" src/` returns nothing.
- **Feel check**: hero CTA still reads unmistakably as the primary action; the deeper copper should read "richer", not "muddy".
- **Done when**: re-running a contrast probe reports no text nodes on light backgrounds below 4.5:1 except text over photos (checker false positives).
