# 005 — Marquee: reduced-motion fallback + non-hover pause

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (src/pages/Home.jsx, Marquee component)

## Problem

Two access gaps in the testimonial marquee (Home.jsx:375-419):

1. **Reduced-motion users lose content.** The GSAP loop is correctly gated behind `prefersReducedMotion` — but the track is `flex w-max` inside an overflow-clipped section with the testimonials rendered TWICE. With the loop off, the user sees the first ~3 cards frozen, the duplicates waste DOM, and the remaining testimonials are unreachable (no scroll mechanism).

```jsx
/* src/pages/Home.jsx:404-406 — current */
return (
  <div ref={track} className="flex gap-6 w-max">
    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
```

2. **Only mouse users can pause.** Pause is wired to `mouseenter`/`mouseleave` only. Touch users get moving text with no pause mechanism (WCAG 2.2.2 requires pause/stop/hide for auto-moving content lasting >5s); keyboard users likewise (currently moot — no focusables inside — but `pointerdown` covers touch).

## Target

1. Reduced-motion branch renders ONE set of testimonials in a native horizontally scrollable row (the repo already ships a `.no-scrollbar` utility). SSG HYDRATION GUARD: this site pre-renders with vite-react-ssg, where `prefersReducedMotion` is always `false` at build time — branching the DOM directly on the module boolean makes reduced-motion clients hydrate against structurally different HTML (React 18 hydration error). Gate the branch behind post-mount state so the first client render matches the SSG output:

```jsx
const [reducedMotion, setReducedMotion] = useState(false);
useEffect(() => { setReducedMotion(prefersReducedMotion); }, []);
const items = reducedMotion ? TESTIMONIALS : [...TESTIMONIALS, ...TESTIMONIALS];
// wrapper div (the one with ref={track}):
<div
  ref={track}
  className={`flex gap-6 ${reducedMotion ? "overflow-x-auto no-scrollbar px-6" : "w-max"}`}
>
  {items.map((t, i) => ( ... unchanged card ... ))}
</div>
```

2. Pause on any pointer, not just hover — replace the two mouse listeners with pointer events, and pause while a pointer is down (touch scrub):

```js
const onEnter = () => loop && loop.pause();
const onLeave = () => loop && loop.play();
track.current.addEventListener("pointerenter", onEnter);
track.current.addEventListener("pointerleave", onLeave);
track.current.addEventListener("pointerdown", onEnter);
track.current.addEventListener("pointerup", onLeave);
```

(Clean up all four in the effect teardown, mirroring the existing removeEventListener pattern.)

## Repo conventions to follow

- `prefersReducedMotion` is imported from `../lib/gsap` as a module-level boolean — fine to READ in effects, but DOM branches must go through the post-mount state above (SSG hydration).
- `.no-scrollbar` exists in `src/index.css:43` — reuse it, don't redefine.

## Steps

1. Compute `items` from `prefersReducedMotion` per Target 1; swap the array in the `.map`.
2. Make the track wrapper class conditional per Target 1.
3. Swap mouse listeners for the four pointer listeners (add + teardown).

## Boundaries

- Do NOT add a visible pause button in this pass (bigger design decision; noted in the audit report as the fully-conformant option).
- Do NOT change card markup, speed (~90px/s), or the measuring logic.
- The edge fade overlays (Home.jsx:362-363) sit over the scroll area; under reduced motion they must have `pointer-events-none` — they already do. Verify, don't change.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**:
  - Normal: marquee scrolls as before; hover pauses; press-and-hold (touch emulation) pauses; release resumes.
  - DevTools → emulate `prefers-reduced-motion: reduce` → reload: testimonials sit still in a row you can swipe/scroll horizontally; all of them reachable; no duplicate cards.
- **Done when**: both branches behave as above.
