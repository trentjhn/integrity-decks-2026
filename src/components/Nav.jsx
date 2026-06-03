import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = useLocation().pathname === "/";
  // Hide the wordmark only at the top of the HOME hero (where the big centered brand shows).
  // On inner pages there's no centered brand, so always show it.
  const showWordmark = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy/90 backdrop-blur-md border-b border-bone/10 py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Text wordmark (real logo pending from TJ). Hidden at the very top of the
            hero so the centered hero wordmark doesn't read twice; fades in on scroll. */}
        <Link
          to="/"
          aria-hidden={!showWordmark}
          tabIndex={showWordmark ? 0 : -1}
          className={`flex items-baseline gap-1.5 group transition-opacity duration-300 ${
            showWordmark ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="font-display text-2xl tracking-tightest text-bone leading-none">Integrity Decks</span>
          <span className="w-1.5 h-1.5 rounded-full bg-bronze translate-y-[-2px] transition-transform group-hover:scale-150" />
        </Link>

        <nav className={`hidden md:flex items-center gap-10 ${scrolled ? "" : "[&_a]:drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"}`}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[0.95rem] font-semibold tracking-wide transition-colors hover:text-bronze-soft ${
                  isActive ? "text-bronze-soft" : "text-bone/95"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 border border-bone/30 text-bone rounded-full px-5 py-2.5 text-sm font-medium hover:bg-bone hover:text-navy transition-colors"
          >
            Get a Quote
            <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16" />
          </Link>
          <button
            className="md:hidden text-bone p-1.5"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <iconify-icon icon={open ? "solar:close-square-linear" : "solar:hamburger-menu-linear"} width="26" height="26" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-4 rounded-2xl bg-navy-soft/95 backdrop-blur-md border border-bone/10 px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-lg font-display text-bone hover:text-bronze-soft">
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 bg-bronze text-navy rounded-full px-5 py-3 text-sm font-semibold">
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
