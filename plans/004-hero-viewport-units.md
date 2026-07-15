# 004 — Hero: `h-screen` → small-viewport units (iOS jump fix)

- **Status**: DONE (2026-07-14)
- **Commit**: 17e70c3
- **Severity**: MEDIUM
- **Category**: Performance (mobile layout stability)
- **Estimated scope**: 1 line, src/pages/Home.jsx

## Problem

The hero uses `h-screen` (`100vh`). On iOS Safari and Android Chrome, `100vh` includes the space behind the collapsible URL bar — so on load the hero overflows, and when the user scrolls and the URL bar collapses, the layout reflows and everything below the hero jumps. This hero also drives a parallax (`heroMedia` scrub), which magnifies the visible jump.

```jsx
/* src/pages/Home.jsx:151 — current */
<section ref={heroSection} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden grain text-center bg-navy-deep">
```

## Target

`svh` (small viewport height) — sized to the viewport with browser chrome VISIBLE, so it never reflows when the URL bar collapses:

```jsx
<section ref={heroSection} className="relative h-screen supports-[height:100svh]:h-svh min-h-[640px] flex items-center justify-center overflow-hidden grain text-center bg-navy-deep">
```

Why `svh` and not `dvh`: `dvh` tracks the URL bar live and re-triggers the same reflow `h-screen` has. `svh` is stable. The tradeoff — a strip of navy visible below the hero fold while the URL bar is up — is invisible here because the section below (trust strip) is also navy.

## Repo conventions to follow

- Arbitrary-value Tailwind classes are already used throughout (`h-[132%]`, `max-w-[1320px]`).

## Steps

1. Home.jsx:151: `h-screen` → `h-screen supports-[height:100svh]:h-svh` (keeps the `100vh` fallback for iOS <15.4; `h-svh` is built into Tailwind 3.4). Keep `min-h-[640px]`.

## Boundaries

- Do NOT touch the parallax refs or the `-top-[16%] h-[132%]` media wrapper.
- Do NOT change PageHeader (inner pages don't use viewport-height heroes).

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: DevTools device emulation (iPhone): load `/`, scroll down slowly — content below the hero must not jump when the URL bar would collapse (emulation approximates this; real-device check is the gold standard and can ride the next physical QA pass).
- **Done when**: Home.jsx:151 carries the `supports-[height:100svh]:h-svh` override alongside the `h-screen` fallback.
