import { useRef } from "react";
import { usePageMotion } from "../hooks/usePageMotion";
import PageHeader from "../components/PageHeader";
import Faq from "../components/Faq";
import CtaBand from "../components/CtaBand";
import { SERVICES, ADDITIONAL_SERVICES, WHY_US, FAQ } from "../lib/content";

const TRUST = ["Licensed, bonded & insured", "Free written estimates", "Warrantied work", "21+ years", "Se habla español"];

export default function Services() {
  const root = useRef(null);
  usePageMotion(root);

  return (
    <div ref={root} className="font-sans text-ink">
      <PageHeader
        eyebrow="What we do"
        title="Services"
        intro="From a single board replacement to a full rebuild, we handle the structure, the surface, and the waterproofing that protects the rooms below. Most jobs fall into three areas, and we take on the structural and finish work around them too."
      >
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm text-bone/70" data-reveal data-delay="0.1">
          {TRUST.map((t, i) => (
            <span key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-bronze" />{t}</span>
          ))}
        </div>
      </PageHeader>

      {/* ===== Three core services, expanded (alternating editorial) ===== */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 py-24 md:py-28 space-y-24 md:space-y-32">
        {SERVICES.map((s, i) => (
          <div key={s.n} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="rounded-[1.75rem] overflow-hidden aspect-[4/3] shadow-xl" data-reveal>
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-bronze-text font-semibold mb-3" data-reveal>{s.n}</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-5">
                <span className="line-mask"><span className="mask-inner block">{s.title}</span></span>
              </h2>
              <p className="text-ink/65 text-lg leading-relaxed mb-4 max-w-xl" data-reveal>{s.desc}</p>
              <p className="text-ink/55 leading-relaxed mb-7 max-w-xl" data-reveal data-delay="0.04">{s.long}</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-7" data-reveal data-delay="0.08">
                {s.includes.map((inc, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-ink/80">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-bronze shrink-0 mt-0.5" />
                    {inc}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2.5 text-ink/55 text-sm border-t border-ink/10 pt-5 max-w-xl" data-reveal data-delay="0.1">
                <iconify-icon icon="solar:user-linear" width="18" height="18" className="text-bronze shrink-0 mt-0.5" />
                <span><span className="font-semibold text-ink/70">Good for:</span> {s.forWho}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ===== Additional services ===== */}
      <section className="bg-bone-dim/60">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-20">
          <h2 className="font-display text-3xl md:text-5xl tracking-tightest mb-3">
            <span className="line-mask"><span className="mask-inner block">We also handle</span></span>
          </h2>
          <p className="text-ink/60 mb-10 max-w-xl" data-reveal>The structural and finish work that often comes with a deck or restoration project.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_SERVICES.map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-2xl border border-ink/5 px-6 py-5" data-reveal data-delay={(i % 3) * 0.06}>
                <span className="w-2 h-2 rounded-full bg-bronze shrink-0" />
                <span className="text-ink/80 font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why homeowners choose us (trust band, on cards) ===== */}
      <section className="bg-bone-dim/50">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-bronze-text text-sm uppercase tracking-[0.25em] mb-5" data-reveal>Why homeowners choose us</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tightest leading-[1.05]">
              <span className="line-mask"><span className="mask-inner block">Why people keep calling us back</span></span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {WHY_US.map((w, i) => (
              <div key={i} className="bg-white rounded-xl border border-ink/5 shadow-card hover:shadow-card-hover transition-shadow duration-500 p-8" data-reveal data-delay={(i % 3) * 0.08}>
                <div className="font-display text-4xl text-bronze-text/90 mb-5 tabular-nums">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-[1.4rem] mb-2.5 leading-snug">{w.title}</h3>
                <p className="text-ink/60 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-bronze-text text-sm uppercase tracking-[0.25em] mb-5" data-reveal>Good to know</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tightest leading-[1.05] lg:sticky lg:top-28">
              <span className="line-mask"><span className="mask-inner block">Common questions</span></span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      <CtaBand heading="Have a project in mind?" />
    </div>
  );
}
