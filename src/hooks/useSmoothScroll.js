import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

// Module-level handle so route-change code can reset scroll THROUGH Lenis.
// A native window.scrollTo(0,0) gets overridden a frame later by Lenis's
// animation loop when navigation happens mid-momentum — the old scroll target
// re-asserts itself on the new page. lenis.scrollTo(..., { immediate, force })
// kills the momentum and syncs Lenis's internal position in the same call.
let lenisInstance = null;
export const getLenis = () => lenisInstance;

// Buttery momentum scrolling (Lenis) wired into GSAP's ScrollTrigger so scroll
// animations stay in sync with the smoothed scroll position. No-op under reduced motion.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
