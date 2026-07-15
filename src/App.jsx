import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useSmoothScroll, getLenis } from "./hooks/useSmoothScroll";

// Route-change scroll manager. Resets THROUGH Lenis (immediate + force kills any
// in-flight momentum that would otherwise re-scroll the new page to the old
// position), and handles #hash deep links (e.g. /services#restoration) with an
// offset for the fixed nav. Falls back to native scrolling under reduced motion,
// where Lenis is never created.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      return;
    }
    // Anchor jumps wait two frames: at effect time the swapped-in page hasn't
    // finished layout and Lenis's cached document height is stale, so an
    // immediate scrollTo computes (and clamps to) the wrong position.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (!target) return;
        const l = getLenis();
        // Nav clearance comes from the target's scroll-mt-24 (Lenis honors CSS
        // scroll-margin) — don't add an offset here or the two stack.
        if (l) l.scrollTo(target, { immediate: true, force: true });
        else window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 96);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
  return null;
}

// Shared chrome (nav, footer, smooth scroll) wraps every page via <Outlet />.
function Layout() {
  useSmoothScroll();
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Route table consumed by vite-react-ssg: each path is pre-rendered to static HTML
// at build time, then hydrated on the client.
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

export default routes;
