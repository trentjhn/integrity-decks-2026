import { useRef } from "react";
import { usePageMotion } from "../hooks/usePageMotion";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import { FOUNDER, VALUES, STATS, COMPANY } from "../lib/content";

export default function About() {
  const root = useRef(null);
  usePageMotion(root);

  return (
    <div ref={root} className="font-sans text-ink">
      <PageHeader
        eyebrow="About"
        title="The family behind the work"
        intro="Integrity Decks is a family-run deck and waterproofing company in Sausalito. The name is not an accident. It is the standard we hold ourselves to on every project."
      />

      {/* ===== Founder ===== */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 py-24 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden aspect-[4/5] shadow-card bg-navy" data-clip>
              <img src={FOUNDER.portrait} alt={`${FOUNDER.name}, ${FOUNDER.title}`} className="w-full h-full object-cover" />
            </div>
            {/* name plate overlaps up onto the portrait's lower edge */}
            <div className="relative z-10 -mt-14 mx-5 bg-bone border border-ink/5 rounded-xl shadow-card px-7 py-5" data-reveal data-delay="0.05">
              <div className="font-display text-2xl">{FOUNDER.name}</div>
              <div className="text-bronze-text text-sm uppercase tracking-wide mt-1">{FOUNDER.title}</div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <h2 className="font-display text-3xl md:text-5xl tracking-tightest leading-[1.08] mb-7">
              <span className="line-mask"><span className="mask-inner block">Two decades in the</span></span>
              <span className="line-mask"><span className="mask-inner block">trade, and counting.</span></span>
            </h2>
            {FOUNDER.story.map((p, i) => (
              <p key={i} className="text-ink/65 text-lg leading-relaxed mb-5 max-w-xl" data-reveal data-delay={i * 0.05}>{p}</p>
            ))}
            <div className="mt-8 border-l-2 border-bronze pl-6 max-w-xl" data-reveal data-delay="0.1">
              <p className="text-ink/70 leading-relaxed italic">{FOUNDER.community}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="bg-bone-dim/50">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-bronze-text text-sm uppercase tracking-[0.25em] mb-5" data-reveal>What we stand on</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tightest leading-[1.05]">
              <span className="line-mask"><span className="mask-inner block">Our values</span></span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-white rounded-xl border border-ink/5 shadow-card hover:shadow-card-hover transition-shadow duration-500 p-8" data-reveal data-delay={(i % 4) * 0.07}>
                <iconify-icon icon={v.icon} width="28" height="28" className="text-bronze mb-5" />
                <h3 className="font-display text-2xl mb-2.5">{v.title}</h3>
                <p className="text-ink/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Credentials band ===== */}
      <section className="bg-navy text-bone grain relative">
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {STATS.map((s, i) => (
              <div key={i} data-reveal data-delay={i * 0.07}>
                <div className="font-display text-5xl md:text-6xl tracking-tightest">
                  {s.value}<span className="text-bronze-soft">{s.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-bone/55 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-bone/70 border-t border-bone/10 pt-8" data-reveal>
            {["Licensed, bonded & insured", "CSLB licensed contractor", "Warrantied work", COMPANY.spanish].map((t, i) => (
              <span key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-bronze" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Work with the family" />
    </div>
  );
}
