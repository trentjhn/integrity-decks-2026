# 002 — Scope the nav transition and animate the mobile menu

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: HIGH
- **Category**: Easing & duration / Interruptibility
- **Estimated scope**: 1 file (src/components/Nav.jsx)

## Problem

The fixed header is the highest-frequency animated element on the site (fires every time the user crosses the 40px scroll threshold, both directions) and it uses `transition-all duration-500` — unscoped (animates every property that changes, off-GPU) and slow (500ms for a chrome condensation; budget for this class of UI is ≤300ms).

```jsx
/* src/components/Nav.jsx:22 — current */
<header
  className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
    scrolled ? "bg-navy/90 backdrop-blur-md border-b border-bone/10 py-3" : "bg-transparent py-6"
  }`}
>
```

The mobile menu mounts/unmounts with **no animation at all** — a hard pop in both directions:

```jsx
/* src/components/Nav.jsx:75 — current */
{open && (
  <div className="md:hidden mt-3 mx-4 rounded-2xl bg-navy-soft/95 backdrop-blur-md border border-bone/10 px-6 py-6 flex flex-col gap-4">
```

## Target

Header: scoped properties, 300ms. The `py` change is a deliberate one-off layout animation (the condense effect) — keep it, but name it:

```jsx
<header
  className={`fixed top-0 inset-x-0 z-50 transition-[background-color,padding,border-color,backdrop-filter] duration-300 ease-out ${ ... }`}
>
```

Mobile menu: always rendered, class-toggled CSS transition (interruptible mid-motion in both directions, unlike a keyframe or a mount/unmount):

```jsx
<div
  className={`md:hidden absolute inset-x-0 top-full mt-0 mx-4 rounded-2xl bg-navy-soft/95 backdrop-blur-md border border-bone/10 px-6 py-6 flex flex-col gap-4 transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
    open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
  }`}
  aria-hidden={!open}
>
```

Notes on the target:
- `invisible` + `pointer-events-none` when closed keeps it out of the tab order visually; ALSO add `tabIndex={open ? 0 : -1}` is not valid on a div with links — instead keep the conditional-render links focus-safe by adding `aria-hidden={!open}` and `inert={open ? undefined : ""}` (React 18 supports the `inert` attribute as a string). If `inert` proves awkward, conditionally render the *children* but keep the wrapper mounted — the wrapper's transition still runs on open (children mount instantly inside the fading wrapper, acceptable).
- Positioning: the current menu is in normal flow inside the fixed header (pushes nothing since header is fixed). Making it `absolute inset-x-0 top-full` detaches it from the header's height so the py condensation doesn't shift it. Verify visually; if the absolute positioning changes the look, keep it in-flow (drop `absolute inset-x-0 top-full`) — the transition classes are the point of this plan, not the repositioning.

## Repo conventions to follow

- Tailwind inline classes, template-literal conditional pattern already used at Nav.jsx:22 and :33 — imitate it.
- The repo's existing scoped-transition exemplar: `transition-opacity duration-300` at Nav.jsx:33.

## Steps

1. Nav.jsx:22 — replace `transition-all duration-500` with `transition-[background-color,padding,border-color,backdrop-filter] duration-300 ease-out`.
2. Nav.jsx:75-86 — remove the `{open && (...)}` conditional; render the menu div always, with the class toggle from Target. Add `aria-hidden={!open}` and `inert={open ? undefined : ""}`.
3. Keep `onClick={() => setOpen(false)}` on the links and the CTA unchanged.

## Boundaries

- Do NOT touch the desktop nav links, wordmark logic, or the scroll listener.
- Do NOT add a dependency (no headlessui/radix).
- If `inert` triggers a React warning in the console, fall back to the conditional-children variant described in Target notes.

## Verification

- **Mechanical**: `npm run build` passes; no console warnings about unknown props on `/` in dev.
- **Feel check** (mobile viewport ≤ 768px):
  - Tapping the hamburger fades/slides the menu in over ~300ms; tapping close mid-open reverses smoothly from wherever it was (interruptibility).
  - Scroll past 40px: header condenses in 300ms and no longer feels laggy; scroll back up, it expands symmetrically.
  - Keyboard: with the menu closed, Tab never lands on hidden menu links.
  - DevTools Rendering panel → emulate `prefers-reduced-motion: reduce`: menu snaps open/closed with no movement (transition-none), which is correct.
- **Done when**: all four feel checks pass and `grep -n "transition-all" src/components/Nav.jsx` is empty.
