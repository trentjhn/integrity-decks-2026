# Integrity Decks — Information Hierarchy

**Date:** 2026-06-03
**Purpose:** What information lives where across the site, before building the inner pages.
**Inputs:** Sage Construction IA (competitor reference, content only — not design), the client's
requirement notes, the real content in `integrity-decks-content.md`, and this session's design
vision (navy + DM Serif Display + Hanken Grotesk, GSAP motion, human-voice copy, restoration +
waterproofing positioning, family-owned trust, "professionally minimal, not info overload").

## What Sage's IA tells us (content layer only)
- **Pages:** Home · Projects · Services · About · Contact (+ Blog). Clean, conventional, works.
- **Projects are named case studies tagged by SF neighborhood** (Glen Park, Noe Valley, Haight
  Ashbury...). Local place names do double duty: trust + local SEO. We have the same lever with
  Bay Area cities (San Mateo, Palo Alto, Atherton, Sausalito...).
- **Services = a few clear categories**, each briefly explained, ending in one CTA
  ("Can we help with your project?").
- **About leads with values** ("Sage Values"). The human/credibility layer matters on these sites.
- **Contact is a real intake form** (Sage uses ~13 fields). Don't make it a mailto afterthought.
- **Local positioning up front** ("general contractors in the San Francisco Bay Area").

Decision: **skip Blog for v1.** Not in the client's requirements, adds ongoing upkeep, and an
empty/stale blog hurts more than it helps. Revisit later if they want content marketing.

## Global (every page)
- **Nav:** Home (wordmark) · Services · Gallery · About · Contact · "Get a Quote". Wordmark fades
  in on scroll over the hero.
- **Footer:** one-line company blurb · Explore links · Contact (service area, Sausalito address,
  phone/email/hours `[PLACEHOLDER]`) · CSLB license line (legal) · 4.9 HomeAdvisor.
- **Primary conversion everywhere:** "Get a free estimate / Schedule a free consultation" → /contact.

## Page-by-page hierarchy

### 1. Home  (built)
Brand hero → trust strip → restoration/waterproofing statement → stats → services preview (3 + All
services) → process (consultation-includes + 4 steps) → recent work slideshow → testimonials
marquee → CTA. Job: orient + route to the deeper pages. Done.

### 2. Services  `/services`  (the deepest page)
1. **Header** — "What we do," one-line intro leading with restoration + waterproofing.
2. **Three core services, expanded** — Deck & Balcony Restoration · Waterproofing & Coatings ·
   Custom Deck Construction. Each: what it is, a "what's included" bullet list, who it's for, image.
3. **Additional services** — structural repair, foundation repair, siding, windows & doors, finish
   carpentry, painting (strip/grid).
4. **Materials / standards** (short) — e.g. Deck 70 traffic coating, composite vs wood, code-built.
5. **Testimonials** — 2–3 relevant reviews woven in (client asked for "services with testimonials").
6. **FAQ** — accordion (the pattern Aura lacked; borrow from the hi-end-builders comp). Seeds:
   free estimates? licensed/bonded/insured? areas served? repair vs replace? warranties? timeline?
   Se habla español?
7. **CTA** → contact.

### 3. Project Gallery  `/gallery`
1. **Header** — "Our work," intro; the 4.9 HomeAdvisor trust line.
2. **Filterable project grid** — categories: All / New Construction / Restoration / Waterproofing /
   Structural. Each card: image, title, location, category (the real projects we have).
3. **Service-area line** — the Bay Area cities served (local trust + SEO), Sage-style.
4. **CTA** → contact.
   *(Future option: per-project case-study detail pages like Sage. v1 = rich filterable grid.)*

### 4. About  `/about`
1. **Header** — "About Integrity Decks."
2. **Founder story** — Refugio Barba: 21+ yrs (Van Houten, Stoltz, Pro-Tech Bros), family-owned,
   son Daniel runs the office. Environmental portrait (not the hero crop). Real bio copy.
3. **Values** — integrity/honesty, craftsmanship, family-run care, community (soccer coach, school
   & church volunteer), Se habla español. (Sage-style values block, in our voice.)
4. **Credentials / trust** — licensed, bonded & insured · CSLB # · 4.9 HomeAdvisor · 21+ yrs · 500+
   projects · 30+ cities.
5. **CTA** → contact.

### 5. Contact / Schedule  `/contact`
1. **Header** — "Get a free estimate," reassurance (free, no pressure, licensed & insured).
2. **Multi-step quote form** — reuse the v2 schema: service type + timeline → name/email/phone →
   address + how-did-you-hear + notes. (Submits to a backend or mailto — TBD before deploy.)
3. **Contact rail** — phone · email · **business hours** (client flagged) · service area · Sausalito
   address · Se habla español.
4. **"Your free consultation includes"** — reuse the checklist.
5. *(Optional)* — embedded map of the Sausalito service area.

## Build order
Services (sets the inner-page header/section/FAQ patterns) → Gallery → About → Contact. Then swap
`[PLACEHOLDER]` values + real logo + real photos, run compliance-stress-test + /sweep before deploy.
