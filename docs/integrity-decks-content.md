# Integrity Decks — Canonical Content & Facts

Source of truth for the new website build. Pulls reconciled facts from the two prior
attempts (`integrity-decks-v2`, `integrity-decks-website`) + live HomeAdvisor profile
(fetched 2026-06-02). Placeholders marked **[PLACEHOLDER]** are confirmed-fake by TJ and
must be replaced before public deploy.

## Business identity
- **Legal name:** Integrity Decks & Restoration General Contracting, Inc. (IDR)
- **Short name:** Integrity Decks
- **Base:** Sausalito, CA — PO BOX 1598, 150 Harbor Drive, Sausalito, CA 94966
- **Service area:** San Francisco Bay Area (residential, commercial, multi-family)
- **Founder:** Refugio Barba — Founder & Lead Contractor (heads the work crew)
- **Office:** Daniel Barba (Refugio's son) — runs the office / client comms
- **Family-owned.** "Se habla español."
- **Experience:** company ~10 yrs in operation; Refugio personally 21+ yrs
  (Van Houten Construction 6½ yrs apprentice, Stoltz Builders 1 yr, then Pro-Tech Bros 14+ yrs).
- **Credentials:** CSLB-licensed, bonded, insured. Free estimates. Warranties offered.
- **CSLB license #: [PLACEHOLDER — REQUIRED before public deploy, CA B&P §7030.5]**
- **Phone: [PLACEHOLDER]**  ·  **Email: [PLACEHOLDER]**  ·  **Hours: [PLACEHOLDER]**

## Positioning correction (important)
The prior attempts over-indexed on "luxury custom deck construction + home additions."
The REAL, most-reviewed business is **waterproofing + deck/balcony restoration** for
residential, commercial, and multi-family — with deck *builds* as one service among several.
Lead with waterproofing + restoration craftsmanship, not luxury-home framing.

## Services (real)
- Deck builds (new construction)
- Deck & porch repair / restoration  ← most-reviewed
- Waterproofing systems / traffic coatings / exterior surface protection (e.g. epoxy "Deck 70")
- Residential construction
- Concrete foundation repair
- Structural repair, siding, windows & doors, finish carpentry, painting (from v2 constants)

## Trust stats
- **4.9 / 5 on HomeAdvisor (15 reviews, 93% 5-star, 7% 4-star)**
- Project range seen in reviews: $700 – $75,000
- 500+ projects / 30+ Bay Area cities (from v2 constants — VERIFY before publishing)

## Real testimonials (HomeAdvisor — use with "via HomeAdvisor" attribution; do NOT embed live widget)

1. **Ann B.** — May 2026 — Deck/Porch Repair ($700): "They came out quickly and came up with a
   solution. They were prompt, on time and always wonderful to work with. Their name definitely
   matches their business. Highly recommend them."
2. **George D.** — Apr 2026 — Deck/Porch Repair ($2,300): "We HAD a failing second story deck.
   Now we have a wonderful deck that is better than the original. Integrity Decks was on time,
   very careful of our home and they did an outstanding and complete job. This contractor
   exceeded our expectations!"
3. **Isaac** — Jan 2026 — Deck/Porch Repair: "Refugio and his team do great work. We can always
   rely on them to know their stuff and communicate clearly."
4. **Zuzana G.** — May 2025 — Deck/Porch Repair: "Refugio who heads the work team, and his son
   Daniel, who is in charge of the office, were wonderful to work with — always available, timely,
   and friendly. The work was completed according to spec and on time. We have recommended
   Integrity Decks to several of our neighbors."
5. **Sue B.** — Apr 2025 — Deck/Porch ($75,000): "ID&R definitely has integrity. As problems or
   concerns arose during our deck rebuild, Refugio was quick to respond. A one-stop shop — they
   lined up subcontractors for various aspects of the rebuild."
6. **Krista G.** — Apr 2025: "Multiple jobs for us including deck repair, deck removal and
   residential and commercial waterproofing. They are professional and do what they say they are
   going to do. They clearly have a passion for the work they do."
7. **Felicity K.** — Mar 2025: "All the work was excellent quality, Refugio and his crew were
   very pleasant, quiet and respectful. Work was always completed on time, prices are fair, and
   done with care. I highly recommend them."
8. **Mike H.** — Mar 2025 — ($18,000): "Professional from concept to completion. Their crew was
   top notch. They cleaned up after themselves at the end of each day as if it was their house.
   They communicated with me every step of the way."
9. **Harriett H.** — Mar 2025: "We've used Integrity for several projects over three years. You
   won't find a team more focused on quality and aesthetics. Experienced, skilled, hard-working.
   We won't call anyone else."
10. **Sasha C.** — Mar 2025 — ($20,000): "Integrity waterproofed the roof of my floating house to
    create large deck space... top quality work. Top notch people doing top notch work."
11. **Mark S.** — Mar 2018: "One night before the work was completed they came out in the middle
    of the night from a great distance to help contain a leak during a storm. They went above and
    beyond! Will be using them again."

## Reusable assets (in integrity-decks-v2/src/assets/)
~12 real project photos w/ locations (San Mateo, Palo Alto, Atherton, Los Altos, Redwood City,
San Carlos, Burlingame, Foster City, San Jose), Refugio's profile photo, Integrity logo
(integrity-logo-transparent.png).

## Multi-step quote form (designed in v2 contactSchema.js — reusable)
Step 1: service type + timeline + description · Step 2: name + email + phone · Step 3: address +
referral source + notes. (zod schemas.)
