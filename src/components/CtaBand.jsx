import { Link } from "react-router-dom";

// Reusable closing CTA for inner pages.
export default function CtaBand({ heading = "Ready to build or restore?", body = "Tell us about your deck or waterproofing project. We will walk your space and send a clear written estimate, free and with no pressure." }) {
  return (
    <section className="px-6 md:px-10 max-w-[1320px] mx-auto py-24">
      <div className="relative rounded-[2rem] overflow-hidden bg-navy text-bone grain px-8 md:px-16 py-20 md:py-24 text-center" data-reveal>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />
        <h2 className="font-display text-4xl md:text-6xl tracking-tightest mb-5">{heading}</h2>
        <p className="text-bone/65 text-lg max-w-xl mx-auto mb-9">{body}</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-bronze text-navy rounded-full px-8 py-4 text-base font-semibold hover:bg-bone transition-colors">
          Schedule a free consultation
          <iconify-icon icon="solar:arrow-right-up-linear" width="20" height="20" />
        </Link>
      </div>
    </section>
  );
}
