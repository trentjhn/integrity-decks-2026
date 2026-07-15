# 003 — Kill remaining `transition-all`, add press feedback, gate hover for touch

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: MEDIUM
- **Category**: Performance / Physicality / Accessibility
- **Estimated scope**: 5 files, mechanical

## Problem

Three related mechanical gaps:

**(a) `transition-all` in 3 remaining spots** (after plan 002 handles Nav) — animates unintended properties off-GPU:

```jsx
/* src/components/Faq.jsx:24 — current; also animates the toggled pb-6 (layout) */
<div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>

/* src/pages/Home.jsx:59 — current (slideshow progress dots) */
<span className={`block h-1.5 rounded-full transition-all ${idx === i ? "w-7 bg-bronze" : "w-1.5 bg-bone/40"}`} />

/* src/pages/Home.jsx:269 and :281 — current (service cards); also 500ms is slow for hover feedback */
<article className="group ... shadow-card hover:shadow-card-hover hover:border-bronze/30 hover:-translate-y-1 transition-all duration-500" ...>
```

**(b) No press feedback anywhere.** `grep -rn "active:" src/` returns nothing — every button and CTA on a lead-gen site gives zero tactile confirmation on press.

**(c) Touch devices get sticky hover states.** Tailwind 3.4's `hoverOnlyWhenSupported` is off, so a tap on touch fires `hover:` styles that stick (image zooms that never un-zoom, lifted cards that stay lifted).

## Target

**(a)** Scoped transitions:

```jsx
/* Faq.jsx:24 — move pb-6 onto the <p> (Faq.jsx:26), NOT the overflow-hidden div: border-box
   padding on the clipping div floors the closed height at 24px instead of 0 (verified in Chromium) */
<div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
  <div className="overflow-hidden">
    <p className="pb-6 ...">

/* Home.jsx:59 */
<span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${ ... }`} />

/* Home.jsx:269, :281 */
... transition-[transform,box-shadow,border-color] duration-300 ease-out ...
```

**(b)** One shared utility in `src/index.css` (so per-element Tailwind `transition-*` utilities don't fight over the single `transition` property):

```css
/* Press feedback for buttons/CTAs. Transform+colors in one declaration so it
   composes with hover color changes without a second transition rule. */
.pressable {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
              color 200ms ease, background-color 200ms ease,
              border-color 200ms ease, opacity 200ms ease;
}
.pressable:active { transform: scale(0.97); }
```

Apply `pressable` (replacing `transition-colors`/`transition-opacity` on that element) to: hero CTAs (Home.jsx:176, :180), slideshow arrows (Home.jsx:49, :52), nav quote CTA (Nav.jsx:57), mobile menu CTA (Nav.jsx:82), CtaBand CTA (CtaBand.jsx:11), gallery filter pills (Gallery.jsx:30), contact form Back/Continue/Send (Contact.jsx:138, :143, :147), FAQ toggle rows get NOTHING (a full-width text row scaling would look wrong — leave them).

**(c)** `tailwind.config.js`:

```js
export default {
  future: { hoverOnlyWhenSupported: true },
  content: [...],
```

## Repo conventions to follow

- Custom utilities live in `src/index.css` outside `@layer base` (see `.line-mask`, `.no-scrollbar`) — put `.pressable` next to them with the same comment style.
- The strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` is the standard UI curve; do not substitute.

## Steps

1. `src/index.css`: add the `.pressable` block after `.line-mask`.
2. `Faq.jsx`: apply target (a) — move `pb-6` inside, scope the transition.
3. `Home.jsx:59, :269, :281`: scoped transitions per target (a).
4. Swap `transition-colors` → `pressable` at every location in target (b). Where an element has `transition-opacity` (ContactRow link, Contact.jsx:214), leave it — it's not a button.
5. `tailwind.config.js`: add the `future` key.

## Boundaries

- Do NOT add press feedback to plain text links (nav links, footer links, "All services" arrows) — only to button-shaped elements.
- Do NOT touch GSAP code.
- `hoverOnlyWhenSupported` wraps ALL `hover:` utilities in `@media (hover: hover)` at build time — after enabling it, spot-check that desktop hover still works (it will; the risk is only if something relied on tap-hover).

## Verification

- **Mechanical**: `npm run build` passes; `grep -rn "transition-all" src/` returns nothing.
- **Feel check**:
  - Click-and-hold any CTA: it dips to 97% in ~160ms; release: returns. Rapid taps never stick mid-scale.
  - FAQ open/close: identical to before (300ms, smooth), no jump from padding.
  - DevTools device emulation (touch): tapping a service card does NOT leave it lifted/zoomed.
- **Done when**: all three checks pass and the grep is empty.
