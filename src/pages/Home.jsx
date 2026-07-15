import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import { registerSharedReveals } from "../hooks/usePageMotion";
import { STATS, SERVICES, SERVICES_INTRO, CONSULTATION_INCLUDES, PROCESS, PORTFOLIO, TESTIMONIALS, COMPANY } from "../lib/content";
import CtaBand from "../components/CtaBand";
import heroImg from "../assets/c7A4g6KPGGpX.jpeg";
import statementImg from "../assets/DKDnLtbnx69z.jpg";
import statementImg2 from "../assets/Nk5QzspfJtdL.jpg";

const SLIDES = PORTFOLIO.slice(0, 6);

// Auto-advancing project slideshow (replaces the pinned horizontal scroll).
function GallerySlideshow() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const go = (d) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const id = setTimeout(() => setI((p) => (p + 1) % n), 4500);
    return () => clearTimeout(id);
  }, [i, paused, n]);

  return (
    <div
      className="relative w-full aspect-[16/11] md:aspect-[5/2] rounded-2xl overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((proj, idx) => (
        <div key={idx} className="absolute inset-0 transition-opacity duration-[900ms] ease-out" style={{ opacity: idx === i ? 1 : 0 }}>
          <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/15 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-bone">
            <div className="inline-block bg-bronze-text text-bone text-xs font-semibold rounded-full px-3 py-1 mb-3">{proj.category}</div>
            <h3 className="font-display text-3xl md:text-4xl mb-1">{proj.title}</h3>
            <div className="text-sm text-bone/75 flex items-center gap-1.5">
              <iconify-icon icon="solar:map-point-linear" width="15" height="15" className="text-bronze-soft" />
              {proj.location}
            </div>
          </div>
        </div>
      ))}

      {/* controls */}
      <div className="absolute top-6 right-6 flex gap-2">
        <button onClick={() => go(-1)} aria-label="Previous project" className="pressable w-11 h-11 rounded-full bg-bone/15 backdrop-blur-md text-bone flex items-center justify-center hover:bg-bone hover:text-navy">
          <iconify-icon icon="solar:arrow-left-linear" width="20" height="20" />
        </button>
        <button onClick={() => go(1)} aria-label="Next project" className="pressable w-11 h-11 rounded-full bg-bone/15 backdrop-blur-md text-bone flex items-center justify-center hover:bg-bone hover:text-navy">
          <iconify-icon icon="solar:arrow-right-linear" width="20" height="20" />
        </button>
      </div>
      <div className="absolute bottom-5 right-8 flex items-center gap-1">
        {SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Go to project ${idx + 1}`} className="py-3 px-1 flex items-center" aria-current={idx === i}>
            <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${idx === i ? "w-7 bg-bronze" : "w-1.5 bg-bone/40"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const root = useRef(null);
  const heroMedia = useRef(null);
  const heroSection = useRef(null);
  const stmtBig = useRef(null);
  const stmtSmall = useRef(null);
  const processLine = useRef(null);

  // Hero photo crossfades up from the navy base instead of popping in. Reduced-motion
  // users start with it already shown (no fade). If the image is cached, onLoad may
  // fire before React attaches the handler, so we also check .complete on mount.
  const heroImgRef = useRef(null);
  const [heroImgLoaded, setHeroImgLoaded] = useState(prefersReducedMotion);
  useEffect(() => {
    if (heroImgRef.current?.complete) setHeroImgLoaded(true);
  }, []);

  useGSAP(
    () => {
      // Tell the index.html motion gate GSAP is in charge (stops its un-hide fallback).
      document.documentElement.setAttribute("data-motion-ok", "");
      if (prefersReducedMotion) return;

      // HERO intro — runs immediately on load (NOT scroll-triggered). fromTo, not from:
      // the pre-paint CSS (html.js-anim) already holds these elements at the start state,
      // so from() would read those values as the tween's END and never reveal anything.
      const hero = heroSection.current;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // y: 0 in both keyframes is load-bearing: GSAP parses the gate's CSS translateY(118%)
      // into a PIXEL y offset (measured against the fallback font) that yPercent alone
      // would leave behind, stranding the headline ~107px low after the tween.
      tl.fromTo(hero.querySelectorAll(".hero-mask-inner"), { yPercent: 118, y: 0 }, { yPercent: 0, y: 0, duration: 1.05, stagger: 0.1 })
        .fromTo(hero.querySelectorAll(".hero-fade"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, "-=0.55");

      // Shared reveals for the REST of the page (hero uses its own hero-* classes)
      registerSharedReveals(gsap);

      // Hero parallax
      if (heroMedia.current)
        gsap.to(heroMedia.current, { yPercent: 16, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

      // Statement layered parallax (travel kept inside the frame slack)
      if (stmtBig.current)
        gsap.fromTo(stmtBig.current, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: stmtBig.current, start: "top bottom", end: "bottom top", scrub: true } });
      if (stmtSmall.current)
        gsap.fromTo(stmtSmall.current, { yPercent: 9 }, { yPercent: -9, ease: "none", scrollTrigger: { trigger: stmtSmall.current, start: "top bottom", end: "bottom top", scrub: true } });

      // Stat count-up
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = obj.v.toFixed(dec); } });
      });

      // Process draw-line + dots
      if (processLine.current)
        gsap.fromTo(processLine.current, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: processLine.current, start: "top 75%", end: "bottom 75%", scrub: true } });
      gsap.utils.toArray(".proc-dot").forEach((dot) => {
        gsap.from(dot, { scale: 0.6, opacity: 0, duration: 0.45, ease: "back.out(1.4)", scrollTrigger: { trigger: dot, start: "top 80%" } });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = setTimeout(refresh, 700);
      return () => { window.removeEventListener("load", refresh); clearTimeout(t); };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="font-sans text-ink">
      {/* ================= HERO (brand-forward, centered) ================= */}
      {/* svh keeps the hero stable when mobile URL bars collapse; h-screen is the old-iOS fallback */}
      <section ref={heroSection} className="relative h-screen supports-[height:100svh]:h-svh min-h-[640px] flex items-center justify-center overflow-hidden grain text-center bg-navy-deep">
        <div ref={heroMedia} className="absolute inset-0 -top-[16%] h-[132%] bg-navy-deep">
          <img
            ref={heroImgRef}
            src={heroImg}
            alt="Covered deck with a fire feature at dusk in the Bay Area"
            fetchpriority="high"
            onLoad={() => setHeroImgLoaded(true)}
            // SSG always renders opacity-0 (no window at build time); reduced-motion clients
            // intentionally hydrate straight to opacity-100 — suppress that known mismatch.
            suppressHydrationWarning
            className={`w-full h-full object-cover transition-opacity duration-[1100ms] ease-out ${heroImgLoaded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/60 to-navy/45" />
          <div className="absolute inset-0 bg-navy-deep/25" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
          <div className="hero-fade text-bronze-soft text-xs md:text-sm font-medium uppercase tracking-[0.32em] mb-7">
            Deck building · Restoration · Waterproofing
          </div>
          <h1 className="font-display text-bone text-[3.2rem] leading-[0.95] md:text-[6rem] md:leading-[0.95] tracking-tightest">
            <span className="line-mask"><span className="hero-mask-inner block">Integrity Decks</span></span>
          </h1>
          <div className="hero-fade mx-auto mt-8 mb-7 w-16 h-px bg-bronze/70" />
          <p className="hero-fade text-bone/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Deck building, restoration, and waterproofing, done with care across the {COMPANY.serviceArea}.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="pressable inline-flex items-center gap-2 bg-bronze-text text-bone rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-bone hover:text-navy">
              Get a free estimate
              <iconify-icon icon="solar:arrow-right-up-linear" width="18" height="18" />
            </Link>
            <Link to="/gallery" className="pressable inline-flex items-center gap-2 border border-bone/30 text-bone rounded-full px-6 py-3.5 text-sm font-medium hover:bg-bone hover:text-navy">
              See our work
            </Link>
          </div>
        </div>
        <div className="hero-fade absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-bone/50 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2">
          Scroll
          <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16" />
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <div className="bg-navy text-bone/70">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          {["Licensed, Bonded and Insured", "Rated 4.9 on HomeAdvisor", "21+ years in the trade", COMPANY.spanish].map((t, i) => (
            <span key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-bronze" />{t}</span>
          ))}
        </div>
      </div>

      {/* ================= STATEMENT (layered parallax) ================= */}
      <section className="py-28 md:py-40 px-6 md:px-10 max-w-[1320px] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <h2 className="font-display text-5xl md:text-7xl leading-[1.08] tracking-tightest">
              <span className="line-mask"><span className="mask-inner block">Built right</span></span>
              <span className="line-mask"><span className="mask-inner block">the first time.</span></span>
              <span className="line-mask"><span className="mask-inner block">Restored to last.</span></span>
            </h2>
            <p className="mt-7 text-lg text-ink/65 leading-relaxed max-w-md" data-reveal>
              Most of our work is restoration and waterproofing. We bring tired decks and balconies back
              to full strength and keep water out of the rooms below. When you want something new, we
              build it from the substructure up.
            </p>
            <div className="mt-8 flex items-center gap-6" data-reveal data-delay="0.1">
              <div>
                <div className="font-display text-4xl text-bronze-text">21+</div>
                <div className="text-sm text-ink/50 uppercase tracking-wide">Years in the trade</div>
              </div>
              <div className="w-px h-12 bg-ink/15" />
              <div>
                <div className="font-display text-4xl text-bronze-text">Family</div>
                <div className="text-sm text-ink/50 uppercase tracking-wide">Owned and run</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative h-[460px] md:h-[580px]">
            <div className="absolute right-0 top-0 w-[80%] h-[80%] rounded-[1.5rem] overflow-hidden shadow-2xl">
              <img ref={stmtBig} src={statementImg} alt="Natural wood deck" className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover" />
            </div>
            <div className="absolute left-0 bottom-0 w-[54%] h-[54%] rounded-[1.25rem] overflow-hidden shadow-2xl">
              <img ref={stmtSmall} src={statementImg2} alt="Tiered entertaining deck" className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS (navy) ================= */}
      <section className="bg-navy text-bone grain relative">
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <div key={i} data-reveal data-delay={i * 0.08}>
              <div className="font-sans font-semibold text-5xl md:text-6xl tracking-tight tabular-nums">
                <span data-count={s.value} data-decimals={s.decimals || 0}>0</span>
                <span className={`text-bronze-soft ml-1.5 ${s.suffix === "★" ? "text-[0.55em] align-middle" : ""}`}>{s.suffix}</span>
              </div>
              <div className="mt-2 text-sm text-bone/55 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-28 px-6 md:px-10 max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl tracking-tightest leading-tight mb-5">
              <span className="line-mask"><span className="mask-inner block">What we do</span></span>
            </h2>
            <p className="text-ink/65 text-lg leading-relaxed max-w-2xl" data-reveal>{SERVICES_INTRO}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/services" className="inline-flex items-center gap-2 py-2 text-sm font-medium text-ink/70 hover:text-bronze transition-colors" data-reveal>
              All services
              <iconify-icon icon="solar:arrow-right-up-linear" width="18" height="18" />
            </Link>
          </div>
        </div>
        {/* Feature the lead service (restoration), then the other two — uneven on purpose */}
        <Link to={`/services#${SERVICES[0].slug}`} className="group grid md:grid-cols-2 rounded-xl overflow-hidden bg-white border border-ink/5 shadow-card hover:shadow-card-hover hover:border-bronze/30 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 ease-out mb-6" data-reveal>
          <div className="h-64 md:h-auto overflow-hidden order-1 md:order-none" data-clip>
            <img src={SERVICES[0].img} alt={SERVICES[0].title} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-bronze-text text-sm font-semibold mb-3">{SERVICES[0].n} · Most of what we do</div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tightest mb-4">{SERVICES[0].title}</h3>
            <p className="text-ink/60 leading-relaxed text-lg">{SERVICES[0].desc}</p>
          </div>
        </Link>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.slice(1).map((s) => (
            <Link to={`/services#${s.slug}`} key={s.n} className="group block rounded-xl overflow-hidden bg-white border border-ink/5 shadow-card hover:shadow-card-hover hover:border-bronze/30 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 ease-out" data-reveal>
              <div className="h-56 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]" />
              </div>
              <div className="p-7">
                <div className="text-bronze-text text-sm font-semibold mb-3">{s.n}</div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-ink/60 leading-relaxed">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= PROCESS (navy, content-led, no photo) ================= */}
      <section className="bg-navy-deep text-bone grain relative">
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-28 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="text-bronze-soft text-sm uppercase tracking-[0.25em] mb-5" data-reveal>How we work</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tightest leading-[1.05]">
              <span className="line-mask"><span className="mask-inner block">How we earn</span></span>
              <span className="line-mask"><span className="mask-inner block">the name.</span></span>
            </h2>
            <p className="mt-6 text-bone/60 text-lg leading-relaxed max-w-md" data-reveal>
              Every project gets the same care and the same straight talk, whether it is a board
              replacement or a full rebuild.
            </p>
            <div className="mt-9 border-t border-bone/15 pt-7" data-reveal data-delay="0.1">
              <div className="text-bronze-soft text-xs uppercase tracking-[0.2em] mb-4">Your free consultation includes</div>
              <ul className="space-y-3">
                {CONSULTATION_INCLUDES.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-bone/80">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-bronze shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-bronze/15" />
            <div ref={processLine} className="absolute left-0 top-2 bottom-2 w-px bg-bronze origin-top" />
            <div className="grid gap-12 md:gap-16">
              {PROCESS.map((p) => (
                <div key={p.n} className="relative" data-reveal>
                  <div className="proc-dot absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-bronze ring-4 ring-navy-deep" />
                  <div className="text-bronze-soft font-display text-xl mb-1">{p.n}</div>
                  <h3 className="font-display text-2xl md:text-3xl mb-2">{p.title}</h3>
                  <p className="text-bone/60 leading-relaxed max-w-md">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= RECENT WORK (timed slideshow) ================= */}
      <section className="py-24 px-6 md:px-10 max-w-[1320px] mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <h2 className="font-display text-4xl md:text-6xl tracking-tightest leading-tight">
            <span className="line-mask"><span className="mask-inner block">Recent work</span></span>
          </h2>
          <Link to="/gallery" className="inline-flex items-center gap-2 py-2 text-sm font-medium text-ink/70 hover:text-bronze transition-colors" data-reveal>
            View full gallery
            <iconify-icon icon="solar:arrow-right-up-linear" width="18" height="18" />
          </Link>
        </div>
        <div data-reveal>
          <GallerySlideshow />
        </div>
      </section>

      {/* ================= TESTIMONIALS MARQUEE ================= */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 mb-12">
          <div className="text-bronze-text text-sm uppercase tracking-[0.25em] mb-5" data-reveal>What clients say</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tightest leading-[1.05] max-w-2xl">
            <span className="line-mask"><span className="mask-inner block">They call us back.</span></span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bone to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bone to-transparent z-10 pointer-events-none" />
          <Marquee />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

// Continuous testimonial marquee; any pointer (hover or touch-down) pauses it.
// The cards are rendered twice; we slide by exactly ONE set width (cards + gaps)
// so the loop is seamless. Under reduced motion it becomes a native horizontal
// scroller with ONE card set — switched post-mount so SSG hydration matches.
function Marquee() {
  const track = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { setReducedMotion(prefersReducedMotion); }, []);
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      let loop;
      const onEnter = () => loop && loop.pause();
      const onLeave = () => loop && loop.play();
      // measure after layout/fonts settle so widths are accurate
      const id = setTimeout(() => {
        const kids = [...track.current.children];
        const half = kids.length / 2;
        let dist = 0;
        for (let i = 0; i < half; i++) dist += kids[i].offsetWidth + 24; // card width + gap-6 (24px)
        loop = gsap.to(track.current, { x: -dist, ease: "none", duration: dist / 90, repeat: -1 }); // ~90px/s
        track.current.addEventListener("pointerenter", onEnter);
        track.current.addEventListener("pointerleave", onLeave);
        track.current.addEventListener("pointerdown", onEnter);
        track.current.addEventListener("pointerup", onLeave);
      }, 200);
      return () => {
        clearTimeout(id);
        if (loop) loop.kill();
        if (track.current) {
          track.current.removeEventListener("pointerenter", onEnter);
          track.current.removeEventListener("pointerleave", onLeave);
          track.current.removeEventListener("pointerdown", onEnter);
          track.current.removeEventListener("pointerup", onLeave);
        }
      };
    },
    { scope: track }
  );
  const items = reducedMotion ? TESTIMONIALS : [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div ref={track} className={`flex gap-6 ${reducedMotion ? "overflow-x-auto no-scrollbar px-6" : "w-max"}`}>
      {items.map((t, i) => (
        <figure key={i} className="w-[360px] shrink-0 bg-white rounded-[1.5rem] p-8 border border-ink/5 flex flex-col">
          <div className="flex gap-1 text-bronze mb-5">
            {[0, 1, 2, 3, 4].map((s) => (<iconify-icon key={s} icon="solar:star-bold" width="15" height="15" />))}
          </div>
          <blockquote className="text-ink/75 leading-relaxed flex-1 text-[1.02rem]">{t.text}</blockquote>
          <figcaption className="mt-6 pt-5 border-t border-ink/10">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-ink/50">{t.project}, via HomeAdvisor</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
