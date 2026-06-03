import { Link } from "react-router-dom";
import { COMPANY, NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer className="relative bg-navy-deep text-bone pt-20 pb-10 grain overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/40 to-transparent" />
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-bone/10">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl tracking-tightest">Integrity Decks</span>
              <span className="w-1.5 h-1.5 rounded-full bg-bronze translate-y-[-3px]" />
            </div>
            <p className="text-bone/55 text-sm leading-relaxed max-w-sm">
              A family-run team building, restoring, and waterproofing decks across the {COMPANY.serviceArea}.
              {" "}{COMPANY.spanish}.
            </p>
            <div className="flex items-center gap-2 text-sm text-bone/70">
              <iconify-icon icon="solar:star-bold" className="text-bronze-soft" width="15" height="15" />
              Rated {COMPANY.rating} on HomeAdvisor
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-bronze-soft font-semibold">Explore</h4>
            <ul className="space-y-2.5 text-sm text-bone/65">
              {NAV_LINKS.map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-bone transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-bronze-soft font-semibold">Contact</h4>
            <ul className="space-y-2.5 text-sm text-bone/65">
              <li>{COMPANY.serviceArea}</li>
              <li>{COMPANY.address}</li>
              <li>Phone: {COMPANY.phone}</li>
              <li>Email: {COMPANY.email}</li>
              <li>Hours: {COMPANY.hours}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-bone/45">
          <div>© 2026 {COMPANY.legalName}</div>
          {/* CA law (B&P §7030.5): license number must appear in advertising */}
          <div>CSLB License {COMPANY.cslbLicense} · Licensed, Bonded &amp; Insured</div>
        </div>
      </div>
    </footer>
  );
}
