import { useState } from "react";

// Accessible accordion. One open at a time; clear chevron affordance + smooth open.
export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} data-reveal>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
              <span className="font-display text-xl md:text-2xl text-ink">{item.q}</span>
              <iconify-icon
                icon="solar:alt-arrow-down-linear"
                width="22" height="22"
                className={`shrink-0 text-bronze transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="text-ink/65 leading-relaxed max-w-2xl text-[1.05rem]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
