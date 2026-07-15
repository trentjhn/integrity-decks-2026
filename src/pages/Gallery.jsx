import { useRef, useState, useMemo } from "react";
import { usePageMotion } from "../hooks/usePageMotion";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import { PORTFOLIO, SERVICE_AREAS, COMPANY } from "../lib/content";

export default function Gallery() {
  const root = useRef(null);
  usePageMotion(root);

  const categories = useMemo(() => ["All", ...new Set(PORTFOLIO.map((p) => p.category))], []);
  const [active, setActive] = useState("All");
  const shown = active === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active);

  return (
    <div ref={root} className="font-sans text-ink">
      <PageHeader
        eyebrow="Our work"
        title="Project gallery"
        intro="A look at recent deck, balcony, and waterproofing projects across the San Francisco Bay Area. Rated 4.9 on HomeAdvisor by the homeowners we built them for."
      />

      {/* ===== Filter + grid ===== */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 py-20">
        <div className="flex flex-wrap gap-2.5 mb-12" data-reveal>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`pressable rounded-full px-5 py-2.5 text-sm font-medium ${
                active === c ? "bg-navy text-bone" : "bg-white border border-ink/15 text-ink/70 hover:border-ink/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {shown.map((proj, i) => (
            <figure
              key={proj.title}
              className="group relative rounded-xl overflow-hidden shadow-card mb-6 break-inside-avoid"
              data-reveal
              data-delay={(i % 3) * 0.06}
            >
              <img src={proj.img} alt={proj.title} className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 w-full p-6 text-bone">
                <div className="inline-block bg-bronze-text text-bone text-xs font-semibold rounded-full px-3 py-1 mb-3">{proj.category}</div>
                <h3 className="font-display text-2xl mb-1 leading-snug">{proj.title}</h3>
                <div className="text-sm text-bone/75 flex items-center gap-1.5">
                  <iconify-icon icon="solar:map-point-linear" width="14" height="14" className="text-bronze-soft" />
                  {proj.location}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-ink/45 text-sm mt-8" data-reveal>
          Photos shown are representative of our work. Real project photography is being added.
        </p>
      </section>

      {/* ===== Service area ===== */}
      <section className="bg-navy text-bone grain relative">
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-bronze-soft text-sm uppercase tracking-[0.25em] mb-5" data-reveal>Where we work</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                <span className="line-mask"><span className="mask-inner block">Across the Bay Area</span></span>
              </h2>
              <p className="mt-5 text-bone/60 leading-relaxed max-w-sm" data-reveal>
                Based in {COMPANY.location}, serving homeowners from Marin down the Peninsula. Not sure
                if you are in our area? Just ask.
              </p>
            </div>
            <div className="lg:col-span-8 flex flex-wrap content-start gap-2.5" data-reveal data-delay="0.1">
              {SERVICE_AREAS.map((city) => (
                <span key={city} className="inline-flex items-center gap-2 border border-bone/15 rounded-full px-4 py-2 text-sm text-bone/80">
                  <span className="w-1 h-1 rounded-full bg-bronze" />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand heading="See something like your project?" />
    </div>
  );
}
