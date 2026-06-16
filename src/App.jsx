import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Shared chrome (nav, footer, smooth scroll) wraps every page via <Outlet />.
function Layout() {
  useSmoothScroll();
  return (
    <>
      <ScrollToTop />
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
