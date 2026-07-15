# 006 — Contact form: step transitions + success moment

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: MEDIUM
- **Category**: Missed opportunities (the conversion path)
- **Estimated scope**: 2 files (src/pages/Contact.jsx, src/index.css)

## Problem

The quote form is the site's conversion path and its state changes all teleport:

- Step panels (`{step === 0 && ...}` blocks at Contact.jsx:71, :96, :116) swap instantly — a jarring full-panel content change.
- The success card (Contact.jsx:39-52) replaces the whole form instantly — the highest-emotion moment on the site (a homeowner just asked for an estimate) gets zero delight budget.
- The progress indicator chips/connectors (Contact.jsx:57-69) flip color with no transition.

## Target

**Step entrance** — a keyed entrance animation. Keyframes are acceptable here (entrance-only; a step change is never reversed mid-flight):

```css
/* src/index.css — add after .pressable */
/* Form step / success entrances (Contact). Entrance-only, so keyframes are fine. */
@keyframes step-in {
  from { opacity: 0; transform: translateY(8px); }
}
.step-in { animation: step-in 240ms cubic-bezier(0.23, 1, 0.32, 1) both; }
@keyframes success-in {
  from { opacity: 0; transform: scale(0.97); }
}
.success-in { animation: success-in 320ms cubic-bezier(0.23, 1, 0.32, 1) both; }
/* Delay must live in a rule AFTER .success-in: the animation shorthand resets
   animation-delay, and a Tailwind arbitrary utility like [animation-delay:120ms]
   is emitted BEFORE this block, so the shorthand would zero it out. */
.success-in-delayed { animation-delay: 120ms; }
@media (prefers-reduced-motion: reduce) {
  .step-in, .success-in { animation-duration: 1ms; }
}
```

```jsx
/* Contact.jsx — each step panel gets key + class so React remounts and replays */
{step === 0 && (
  <div key="step-0" className="step-in space-y-6">
...
{step === 1 && (
  <div key="step-1" className="step-in space-y-6">
...
{step === 2 && (
  <div key="step-2" className="step-in space-y-6">
```

**Success card** — wrap: `<div className="success-in bg-white rounded-[1.75rem] ...">` (existing classes stay). The check icon inside gets its own beat:

```jsx
<div className="success-in ..." >
  <div className="w-14 h-14 rounded-full bg-bronze/15 text-bronze flex items-center justify-center mx-auto mb-6 success-in success-in-delayed">
```

**Progress indicator** — add `transition-colors duration-300` to the numbered chip span (Contact.jsx:61) and the connector div (Contact.jsx:66).

## Repo conventions to follow

- Custom CSS lives in `src/index.css` beside `.line-mask`/`.no-scrollbar` with a one-line comment explaining intent.
- `cubic-bezier(0.23, 1, 0.32, 1)` is the standard strong ease-out used by plan 003 — same curve, no new ones.

## Steps

1. `src/index.css`: add the keyframes/classes block.
2. `Contact.jsx`: add `key` + `step-in` to the three step panels.
3. `Contact.jsx`: add `success-in` to the done-card and delayed `success-in` to the icon circle.
4. `Contact.jsx:61, :66`: add `transition-colors duration-300` to chip and connector.

## Boundaries

- Do NOT touch validation logic, state shape, or the TODO backend wiring comment.
- Do NOT animate the fields themselves (no stagger inside panels — forms should feel instant, not choreographed).
- Do NOT exceed 320ms on any of these.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**:
  - Fill step 1 → Continue: next panel fades up in ~240ms; Back does the same. Rapid Continue/Back never stacks or flashes.
  - Submit on step 3: success card scales in, then the check icon lands a beat later. It should feel like a small "thunk" of completion, not a fireworks show.
  - Reduced-motion emulation: everything appears instantly (1ms), no movement.
- **Done when**: all three checks pass.
