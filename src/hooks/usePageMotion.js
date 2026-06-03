import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

// Shared scroll-motion for inner pages: masked line reveals + fade/slide reveals.
// Header elements sit at the top of the viewport, so their triggers fire on load.
export function usePageMotion(scopeRef) {
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.utils.toArray(".mask-inner").forEach((el) => {
        gsap.from(el, { yPercent: 115, duration: 1.05, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 95%" } });
      });
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 34, opacity: 0, duration: 0.85, ease: "power3.out",
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
      // Image "wipe up" reveal for hero-class images (wrapper must be overflow-hidden)
      gsap.utils.toArray("[data-clip]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        const img = el.querySelector("img");
        if (img) gsap.from(img, { scale: 1.12, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = setTimeout(refresh, 600);
      return () => { window.removeEventListener("load", refresh); clearTimeout(t); };
    },
    { scope: scopeRef }
  );
}
