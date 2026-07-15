# Design & Motion Pass — Plans

Written 2026-07-14 against commit `17e70c3`, from a three-input audit: `improve-animations` full audit + `frontend-taste` mechanical pre-flight + `dogfood` runtime probe (5 routes, desktop).

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Bronze-as-text contrast → WCAG AA](001-contrast-tokens.md) | HIGH | DONE |
| 002 | [Nav transition scoping + mobile menu animation](002-nav-motion.md) | HIGH | DONE |
| 003 | [Kill `transition-all`, press feedback, touch-hover gate](003-transition-scoping-press-feedback.md) | MEDIUM | DONE |
| 004 | [Hero `h-screen` → `svh`](004-hero-viewport-units.md) | MEDIUM | DONE |
| 005 | [Marquee reduced-motion + pointer pause](005-marquee-accessibility.md) | MEDIUM | DONE |
| 006 | [Contact form step/success motion](006-contact-form-motion.md) | MEDIUM | DONE |
| 007 | [Reveal consolidation + proc-dot + clickable cards](007-reveal-consolidation.md) | MEDIUM | DONE |

## Execution order & dependencies

Recommended: **002 → 003 → 001 → 004 → 005 → 006 → 007.**

- 002 before 003: both touch Nav.jsx; 002 removes the header `transition-all` so 003's "grep returns nothing" verification is meaningful.
- 003 before 006: 006 reuses the `cubic-bezier(0.23, 1, 0.32, 1)` curve 003 introduces in `index.css` (006 is self-contained if run alone, but the file placement assumes 003's `.pressable` block exists).
- 001, 004, 005, 007 are independent.

## Explicitly NOT in these plans (advisory — need client/TJ decisions)

- **Launch blockers, not design**: `[PHONE]`/`[EMAIL]`/`[HOURS]`/`[CSLB LICENSE #]` placeholders render literally (content.js:28-32); "Call us" links to `tel:+10000000000`; form submit shows success without sending anything (Contact.jsx:37 TODO).
- **CTA copy**: three labels for one intent — "Get a Quote" (nav), "Get a free estimate" (hero), "Schedule a free consultation" (CtaBand). Pick one.
- **Services layout**: three consecutive image/text zigzags; consider varying the third.
- **Gallery lightbox**: images zoom on hover but don't open; a lightbox is the natural elevate.
- **Marquee visible pause button**: the fully WCAG-2.2.2-conformant option beyond plan 005's pointer pause.
