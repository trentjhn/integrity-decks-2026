# Integrity Decks — Website Design Doc

**Date:** 2026-06-02
**Status:** Direction locked. Repo scaffolded from Aura Estates base. Ready for build approval.
**Repo:** `/Users/t-rawww/Websites/integrity-decks` (React 18 + Vite + Tailwind 3, from the
Aura Estates export). Add `react-router-dom` for multi-page.
**Content source of truth:** `/Users/t-rawww/Websites/integrity-decks-content.md`

---

## 1. Overview

Website for **Integrity Decks & Restoration General Contracting, Inc.** — Refugio Barba's
family-owned **deck/balcony restoration + waterproofing** contractor in Sausalito / SF Bay Area
(son Daniel runs the office). Residential, commercial, and multi-family. The site's job: present
the company with quiet authority and convert visitors into booked consultations / quote requests.

Same playbook as the PEAK Performance build: take ONE reference's design language, apply it with
discipline, ground it in real content. Here the design language is **Aura Estates** (the
sophisticated serif/editorial Aura template TJ chose). We do NOT derive from the client's named
inspiration (sageconstructionsf.com — considered weak).

## 2. Locked decisions

- **Design language:** Aura Estates — serif editorial, warm/minimal, a single signature accent
  and a recurring gold-line "journey" motif. The point is to look premium and *trustworthy*, not
  templated, and to stay "professionally minimal — not information overload" (client's explicit ask).
- **Structure:** TRUE multi-page via `react-router-dom`. One main Home/hero page + clickable
  About · Project Gallery · Services · Contact. Global nav + footer.
- **Positioning:** lead with **restoration + waterproofing craftsmanship** (the real, most-reviewed
  business), with new deck builds as one service. NOT luxury-home framing.
- **Palette:** keep Aura's warm system — ink/near-black text, bone/parchment background
  (`#F7F5F0`), **amber accent `#E6A756`** (reads as warm wood-tone — ideal for a deck company),
  white cards. Optionally fold in the logo's colors once reviewed.
- **Type:** DM Serif Display (headlines) + DM Sans (body) — inherited from the base. Voice:
  professional but approachable, direct, jargon-free, Title Case headings, no exclamation points
  (per the prior brand voice-tone guide).
- **Stack:** React 18 + Vite + Tailwind 3 + `react-router-dom`. Keep the base's tiny footprint
  (`clsx`, `iconify-icon`). Effects stay CSS + IntersectionObserver — NO GSAP/framer-motion.
  Do NOT reintroduce the failed attempts' shadcn/Radix/recharts bloat.
- **Quote form:** reuse the multi-step schema from the v2 attempt (`contactSchema.js`): service
  type + timeline → name/email/phone → address/referral/notes.
- **Assets:** reuse the ~12 real project photos + Refugio portrait + logo from
  `integrity-decks-v2/src/assets/`. Replace ALL Aura placeholder media (the supabase.co URLs).
- **DEPLOY BLOCKER:** CSLB license #, phone, email, hours ship as visible `[PLACEHOLDER]` markers
  during build; TJ supplies real values before public deploy. The **CSLB license # is legally
  required** on the live site (CA B&P §7030.5 — a website is advertising). Run
  `compliance-stress-test` before deploy.

## 3. Design system (inherited from Aura Estates — reuse, do not reinvent)

**Effect vocabulary (port verbatim from base `App.jsx` / `index.css`):**
- **Masked staggered word reveal** (`RevealText`: `translateY(110%) rotate(2deg)`, 0.05s stagger)
  — the signature headline move.
- **`reveal-up` / `reveal-scale`** on scroll via one IntersectionObserver (threshold 0.15).
- **Gold-line SVG path-draw** (`stroke-dashoffset`, `#E6A756`) — the recurring "journey" motif;
  reuse for the process thread and section seams.
- **Horizontal scroll-snap gallery** (`no-scrollbar`, `snap-x`, hover `scale-110`).
- **Sticky column + offset numbered cards** for any process/steps section.
- **`mix-blend-difference` nav**, autoplay-muted hero video, hover-to-play video cards,
  floating-label form inputs.

**Rule:** one signature move per section; the power comes from the small vocabulary recurring
with discipline (the PEAK lesson).

## 4. Information architecture (pages)

Global: **Nav** (Home · Services · Gallery · About · Contact + "Get a Quote" CTA) and **Footer**
(company blurb, services links, service area, contact, **CSLB # placeholder**, social).

1. **Home** (the hero page) — previews everything:
   Hero (serif positioning headline + project reel + 4.9★/HomeAdvisor badge + Licensed/Insured
   strip) → trust stats band (years, projects, cities, 4.9★) → services preview (3 cards) →
   "Our process" (sticky numbered cards: Consult → Assess/Waterproof plan → Build/Restore →
   Walk-through, with the gold-line thread) → portfolio preview (scroll-snap filmstrip) →
   testimonials → CTA to Contact.
2. **Services** — detailed: Deck Builds · Deck & Porch Repair/Restoration · Waterproofing &
   Traffic Coatings · Residential Construction · Foundation/Structural · Finishing. Testimonials
   woven per service (client asked for "services with testimonials"). **FAQ** at the bottom
   (borrow the accordion pattern from the hi-end-builders comp — Aura lacks an FAQ).
3. **Project Gallery** — the full ~12 real photos in an editorial asymmetric grid, filterable by
   category (New Construction / Restoration / Waterproofing / Structural), each with location chip.
4. **About** — Refugio's real bio (21+ yrs; Van Houten → Stoltz → Pro-Tech Bros), family-owned,
   Daniel/office, community (soccer coach, church/school), credentials. Environmental portrait
   crop (PEAK lesson: don't reuse the hero frame). "Se habla español."
5. **Contact / Schedule Consultation** — multi-step quote form + **business hours [placeholder]**,
   service area, phone/email [placeholder], consultation-includes list.

## 5. What we borrow from the other two comps

- **FAQ accordion** + **detailed services layout** → from `hi-end-builders.html` (site 2).
- **Stat-band styling / trust treatment** → optional cue from `foundry.html` (site 1).
- Everything else stays Aura Estates.

## 6. Build order (proposed — pending approval)

1. Add `react-router-dom`; split base `App.jsx` into a router + shared Nav/Footer + Home page that
   reuses the existing sections. Verify it runs at localhost:5173, 0 console errors.
2. Swap all placeholder media for real assets; apply Integrity Decks copy + positioning.
3. Services page (+ FAQ) · 4. Gallery page · 5. About page · 6. Contact page (multi-step form).
7. Wire `[PLACEHOLDER]` markers for license/phone/email/hours. Mobile pass.
8. Pre-deploy: `compliance-stress-test` + real placeholder values + `/sweep`.

**Open before deploy:** real CSLB #, phone, email, hours; confirm 500+/30-cities stats; decide
form delivery (mailto vs. a form backend); optional booking tool.
