// Navy header band for inner pages: eyebrow + masked serif title + intro (+ optional children).
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <section className="relative bg-navy text-bone grain pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10">
        {eyebrow && <div className="text-bronze-soft text-sm uppercase tracking-[0.25em] mb-5">{eyebrow}</div>}
        <h1 className="font-display text-5xl md:text-7xl tracking-tightest leading-[1.02] max-w-3xl">
          <span className="line-mask"><span className="mask-inner block">{title}</span></span>
        </h1>
        {intro && <p className="mt-7 text-bone/70 text-lg leading-relaxed max-w-2xl" data-reveal>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
