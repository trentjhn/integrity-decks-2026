// Site content. [PLACEHOLDER] values must be replaced before public deploy.

import imgLivingRoom from "../assets/c7A4g6KPGGpX.jpeg";
import imgFirepit from "../assets/wUAsOhP4SYXq.jpg";
import imgComposite from "../assets/h5ftQIe6yrjx.jpg";
import imgMultiLevel from "../assets/Nk5QzspfJtdL.jpg";
import imgNaturalWood from "../assets/DKDnLtbnx69z.jpg";
import imgFramework from "../assets/AOo41GhW7dd8.jpeg";
import imgJoist from "../assets/3F2fM2nlk6E6.jpg";
import imgInstall from "../assets/DuPiPdIzDVK7.jpeg";
import imgRestoration from "../assets/ShmpZLiHmtwb.jpg";
import refugioPortrait from "../assets/Refugio.png";

// Real logo pending; nav/footer use a text wordmark until it arrives.

export const COMPANY = {
  name: "Integrity Decks & Restoration",
  legalName: "Integrity Decks & Restoration General Contracting, Inc.",
  location: "Sausalito, CA",
  serviceArea: "San Francisco Bay Area",
  address: "PO Box 1598, 150 Harbor Drive, Sausalito, CA 94966",
  founder: "Refugio Barba",
  founderTitle: "Founder & Lead Contractor",
  rating: "4.9",
  reviewCount: "15",
  spanish: "Se habla español",
  // --- REQUIRED BEFORE PUBLIC DEPLOY (CA B&P §7030.5) ---
  cslbLicense: "[CSLB LICENSE #]",
  phone: "[PHONE]",
  phoneTel: "tel:+10000000000",
  email: "[EMAIL]",
  hours: "[HOURS]",
};

export const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const STATS = [
  { value: 21, suffix: "+", label: "Years in the trade" },
  { value: 4.9, suffix: "★", label: "HomeAdvisor rating", decimals: 1 },
  { value: 30, suffix: "+", label: "Bay Area cities served" },
  { value: 500, suffix: "+", label: "Projects completed" },
];

export const SERVICES = [
  {
    n: "01",
    title: "Deck and Balcony Restoration",
    desc: "We rebuild weathered decks and balconies back to full strength, replacing boards, repairing the structure, and refinishing the surface so it lasts.",
    long: "Before we touch the surface, we check the framing, joists, and ledger for dry rot and movement. A good-looking deck on a weak frame does not last, so we fix what is underneath first, then bring the surface back.",
    img: imgRestoration,
    includes: ["Board replacement and re-decking", "Structural and joist repair", "Railing repair and replacement", "Sanding, refinishing, and sealing"],
    forWho: "Homeowners with an aging, soft, or leaking deck that is worth saving.",
  },
  {
    n: "02",
    title: "Waterproofing and Coatings",
    desc: "We install waterproofing systems and traffic coatings, like the epoxy Deck 70, that keep water out of the rooms below for years.",
    long: "On a lot of Bay Area homes, the deck or balcony is the roof of the room below it. We install coatings and membranes that keep that space dry, and we catch small leaks before they turn into expensive structural repairs.",
    img: imgFirepit,
    includes: ["Deck 70 epoxy traffic coatings", "Balcony and walkway waterproofing", "Dry-space protection for rooms below", "Leak diagnosis and repair"],
    forWho: "Anyone with living space under a deck or balcony, or a surface that needs to keep water out.",
  },
  {
    n: "03",
    title: "Custom Deck Construction",
    desc: "We build new decks from the substructure up, designed around your home and built to code.",
    long: "We pull the permits, engineer the substructure, and build to California code, so your new deck is sound from the ground up and straightforward to insure. You pick the materials; we make sure they are installed right.",
    img: imgLivingRoom,
    includes: ["New deck and balcony construction", "Engineered substructure and framing", "Composite or premium wood decking", "Stairs, railings, and built-ins"],
    forWho: "Homeowners planning a new outdoor space, built to code and made to last.",
  },
];

// Why-us points, grounded in the real HomeAdvisor reviews.
export const WHY_US = [
  { icon: "solar:users-group-rounded-linear", title: "You deal with the people doing the work", desc: "Refugio leads the crew and his son Daniel runs the office. You are not handed off to a call center." },
  { icon: "solar:shield-check-linear", title: "Licensed, bonded, and insured", desc: "A licensed California contractor, fully bonded and insured. The CSLB license number is on every estimate." },
  { icon: "solar:home-2-linear", title: "We respect your home", desc: "Our crew cleans up at the end of every day and treats your property like their own." },
  { icon: "solar:document-text-linear", title: "Honest estimates, no upsell", desc: "A clear written estimate up front, and a straight answer on whether to repair or rebuild." },
  { icon: "solar:clock-circle-linear", title: "We show up and finish", desc: "On time, and you hear from us at every step until the work meets our standard." },
  { icon: "solar:star-linear", title: "21+ years, rated 4.9", desc: "Two decades in the trade and a 4.9 rating on HomeAdvisor from Bay Area homeowners." },
];

// Additional services — shown on the Services page (not Home).
export const ADDITIONAL_SERVICES = [
  "Structural repair",
  "Concrete foundation repair",
  "Siding",
  "Windows and doors",
  "Finish carpentry",
  "Painting and finishing",
];

export const FAQ = [
  { q: "Do you offer free estimates?", a: "Yes. Every project starts with a free on-site visit and a clear written estimate, with no pressure." },
  { q: "Are you licensed, bonded, and insured?", a: "Yes. Integrity Decks is a licensed California contractor, bonded and insured. Our CSLB license number is on every estimate." },
  { q: "What areas do you serve?", a: "We work across the San Francisco Bay Area, from Sausalito and Marin down the Peninsula." },
  { q: "Should I repair my deck or replace it?", a: "We will tell you straight. Sometimes a repair and a fresh coat is all you need. Sometimes a rebuild is the better value. You get the honest call once we see it." },
  { q: "Do you offer warranties?", a: "Yes. We stand behind our work and warranty our craftsmanship." },
  { q: "How long does a project take?", a: "It depends on the scope. We give you a realistic timeline in your estimate and keep you updated at every step." },
  { q: "¿Hablan español?", a: "Sí. Se habla español." },
];

// Intro paragraph for the "What we do" section so it reads fuller without extra cards.
export const SERVICES_INTRO =
  "From a single board replacement to a full rebuild, we handle the structure, the surface, and everything that keeps water where it belongs. Most jobs fall into three areas, and we take on the structural and finish work around them too.";

// Multi-step quote form options (Contact page).
export const QUOTE_SERVICE_TYPES = ["New deck construction", "Deck or balcony restoration", "Waterproofing and coatings", "Structural repair", "Not sure yet / other"];
export const QUOTE_TIMELINES = ["Within 1 month", "1 to 3 months", "3 to 6 months", "Just exploring options"];
export const QUOTE_REFERRALS = ["Google search", "Friend or referral", "Yelp", "HomeAdvisor", "Social media", "Drove by a project", "Other"];

// Substantive content for the process section's left panel (replaces the photo).
export const CONSULTATION_INCLUDES = [
  "An on-site look at your deck or balcony",
  "Honest guidance on repair versus rebuild",
  "Material options that fit your home and budget",
  "A clear written estimate, with no pressure",
];

export const PROCESS = [
  { n: "01", title: "Free consultation", desc: "We start by listening. You tell us about the space and the problem, and we tell you straight whether we can help.", img: imgLivingRoom },
  { n: "02", title: "On-site assessment", desc: "We walk the site, check the structure, and send a clear written estimate. No surprises later.", img: imgJoist },
  { n: "03", title: "Build and restore", desc: "Refugio's crew does the work and treats your home like their own. You hear from us at every step.", img: imgInstall },
  { n: "04", title: "Final walk-through", desc: "We are not finished until the work meets the standard our name is built on.", img: imgFirepit },
];

export const PORTFOLIO = [
  { img: imgLivingRoom, title: "Covered outdoor living room", location: "Atherton, CA", category: "Custom Design" },
  { img: imgFirepit, title: "Multi-level deck with fire pit", location: "Los Altos, CA", category: "Custom Design" },
  { img: imgNaturalWood, title: "Natural wood deck", location: "Redwood City, CA", category: "New Construction" },
  { img: imgMultiLevel, title: "Tiered entertaining deck", location: "Palo Alto, CA", category: "Custom Design" },
  { img: imgComposite, title: "Modern composite deck", location: "San Mateo, CA", category: "New Construction" },
  { img: imgFramework, title: "Elevated deck framing", location: "San Carlos, CA", category: "Structural" },
  { img: imgInstall, title: "Composite board install", location: "Foster City, CA", category: "New Construction" },
  { img: imgJoist, title: "Foundation and joist system", location: "Burlingame, CA", category: "Structural" },
  { img: imgRestoration, title: "Deck board restoration", location: "San Jose, CA", category: "Restoration" },
];

// Cities we serve — shown on the Gallery page (local trust + SEO).
export const SERVICE_AREAS = [
  "Sausalito", "Mill Valley", "San Rafael", "San Francisco", "San Mateo", "Burlingame",
  "Redwood City", "Palo Alto", "Atherton", "Los Altos", "San Carlos", "Foster City",
];

// About page — founder + values.
export const FOUNDER = {
  name: "Refugio Barba",
  title: "Founder & Lead Contractor",
  portrait: refugioPortrait,
  story: [
    "Refugio Barba has spent more than 21 years in construction. He started as a carpenter apprentice at Van Houten Construction, spent six and a half years learning the trade, worked with Stoltz Builders, and for over fourteen years has run his own firm doing construction and waterproofing.",
    "Today he leads the crew on every Integrity Decks project, and his son Daniel runs the office. When you hire Integrity Decks, you work with the family that does the work.",
  ],
  community: "Off the job, Refugio is a husband and father of two. He coaches local soccer teams and volunteers at school and church events around the Bay Area. He works to leave his family and his community a little better every day.",
};

export const VALUES = [
  { icon: "solar:hand-shake-linear", title: "Integrity", desc: "Our name is the standard. We do what we say, and we do it right." },
  { icon: "solar:ruler-pen-linear", title: "Craftsmanship", desc: "Two decades of hands-on work, from the framing to the final coat." },
  { icon: "solar:users-group-rounded-linear", title: "Family-run", desc: "Refugio leads the crew, Daniel runs the office. You work with the family." },
  { icon: "solar:heart-linear", title: "Community", desc: "Soccer coach, school and church volunteer. The Bay Area is home." },
];

// Real reviews from HomeAdvisor (4.9 stars, 15 reviews). Quoted close to verbatim.
export const TESTIMONIALS = [
  {
    name: "George D.",
    text: "We had a failing second story deck. Now we have one that is better than the original. They were on time, careful with our home, and did an outstanding job. This contractor exceeded our expectations.",
    project: "Deck repair",
  },
  {
    name: "Zuzana G.",
    text: "Refugio heads the work team and his son Daniel runs the office. Both were wonderful to work with, always available and timely. We have recommended Integrity Decks to several of our neighbors.",
    project: "Deck restoration",
  },
  {
    name: "Mike H.",
    text: "Professional from concept to completion. Their crew cleaned up at the end of each day as if it was their own house, and they kept me updated every step of the way.",
    project: "$18,000 deck build",
  },
  {
    name: "Harriett H.",
    text: "We have used Integrity for several projects over three years. You will not find a team more focused on quality. Experienced, skilled, and hard working. We will not call anyone else.",
    project: "Multiple projects",
  },
  {
    name: "Sasha C.",
    text: "They waterproofed the roof of my floating house to create deck space, then the decks around my house. Easy to work with and the quality is excellent. I cannot praise them highly enough.",
    project: "$20,000 waterproofing",
  },
];
