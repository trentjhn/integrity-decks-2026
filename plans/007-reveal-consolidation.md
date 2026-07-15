# 007 — Consolidate reveal system; fix proc-dot; make service cards clickable

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens / Physicality
- **Estimated scope**: 3 files (src/hooks/usePageMotion.js, src/pages/Home.jsx, minor)

## Problem

**(a) Drifted duplicate reveal system.** `usePageMotion.js` defines the site's three reveal patterns (`.mask-inner`, `[data-reveal]`, `[data-clip]`). Home.jsx re-implements all three inline with silently drifted values:

| Pattern | Hook (`usePageMotion.js`) | Home.jsx inline |
| --- | --- | --- |
| `.mask-inner` | yPercent 115, 1.05s, start `top 95%` | yPercent 115, **1.1s**, start `top 92%` |
| `[data-reveal]` | y **34**, **0.85s**, start `top 90%` | y **38**, **0.9s**, start `top 88%` |
| `[data-clip]` | identical | identical (duplicated verbatim) |

Same motion vocabulary, four hand-typed value sets — the exact "five cubic-beziers that almost match" consolidation finding. Next edit will drift them further.

**(b) `scale(0)` + personality-outlier bounce** on process dots:

```js
/* src/pages/Home.jsx:137 — current */
gsap.from(dot, { scale: 0, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: dot, start: "top 80%" } });
```

`scale(0)` is banned (nothing appears from nothing) and `back.out(2)` is the bounciest curve on an otherwise crisp editorial site.

**(c) False affordance on Home service cards** (Home.jsx:269, :281): hover lift + border tint + 1.07–1.08 image zoom — full "I'm clickable" language — but the `<article>`s are not links. Users will click and nothing happens.

## Target

**(a)** Export one shared registrar from the hook file and call it from both places:

```js
/* src/hooks/usePageMotion.js — add */
// Shared scroll-reveal registrations. Values are THE canonical set — Home and
// the inner pages must not re-declare them.
export function registerSharedReveals(gsap) {
  gsap.utils.toArray(".mask-inner").forEach((el) => {
    gsap.from(el, { yPercent: 115, duration: 1.05, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 92%" } });
  });
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 34, opacity: 0, duration: 0.85, ease: "power3.out",
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });
  gsap.utils.toArray("[data-clip]").forEach((el) => {
    gsap.from(el, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%" } });
    const img = el.querySelector("img");
    if (img) gsap.from(img, { scale: 1.12, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
  });
}
```

`usePageMotion` calls `registerSharedReveals(gsap)` instead of its three inline blocks. Home.jsx deletes its three inline blocks (lines 96-113) and calls `registerSharedReveals(gsap)` in their place (hero timeline, parallax, count-up, process line/dots stay inline — they're Home-specific). Canonical values chosen: mask start `92%` (Home's — slightly earlier trigger reads better on long pages), everything else the hook's.

**(b)**

```js
gsap.from(dot, { scale: 0.6, opacity: 0, duration: 0.45, ease: "back.out(1.4)", scrollTrigger: { trigger: dot, start: "top 80%" } });
```

**(c)** Wrap each Home service card's content in `Link to="/services"` — swap `<article className="group ...">` to `<Link to="/services" className="group ...">`. Add `block` ONLY to the two small cards (Home.jsx:281); the featured card (Home.jsx:269) already has `grid` — do not add a conflicting `block`. `Link` is already imported in Home.jsx. The cards contain no nested interactive elements (verified), so anchor-wrapping is valid HTML.

## Repo conventions to follow

- Hooks live in `src/hooks/`, take no arguments they don't need; `usePageMotion` is the exemplar for GSAP registration structure.
- `data-reveal` / `line-mask` markup conventions stay untouched — this is a JS-side consolidation only.

## Steps

1. `usePageMotion.js`: add the exported `registerSharedReveals`, and replace the hook's three inline blocks with a call to it.
2. `Home.jsx`: import `{ usePageMotion }`? No — import `{ registerSharedReveals } from "../hooks/usePageMotion"`; delete lines 96-113 (the three inline blocks); call `registerSharedReveals(gsap)` at that spot inside the existing `useGSAP` callback.
3. `Home.jsx:137`: apply target (b).
4. `Home.jsx:269-278` and :280-291: apply target (c) — article → Link per the exact class notes above.

## Boundaries

- Do NOT change the hero timeline (`.hero-mask-inner` / `.hero-fade`), parallax, stat count-up, process line, or the ScrollTrigger refresh wiring.
- Do NOT convert Gallery figures to links (no lightbox exists — that's a future elevate item, not this plan).
- Do NOT change any easing/duration other than the two specified (mask start 92%, proc-dot values).

## Verification

- **Mechanical**: `npm run build` passes; `grep -c "mask-inner" src/pages/Home.jsx` shows only markup usages (no `gsap.utils.toArray(".mask-inner")` left in Home).
- **Feel check**:
  - Home and Services reveals look unchanged at normal speed (the value deltas are sub-perceptual — that's the point of consolidating now).
  - Process dots: pop from 60% with a slight overshoot, no birth-from-nothing.
  - Clicking anywhere on a service card navigates to /services.
- **Done when**: one `gsap.from` definition per reveal pattern exists in the codebase.
