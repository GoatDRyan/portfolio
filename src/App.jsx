import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import SEO from "./components/seo/SEO";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";
import ScrollToAnchor from "./components/ui/ScrollToAnchor";
import PageTransition from "./components/layout/PageTransition";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

function ComicPageCurtain() {
  return (
    <React.Fragment>
      {/* Yellow comic wipe */}
      <motion.div
        initial={{ x: "-120%" }}
        animate={{
          x: "120%",
          transition: {
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-[9998]"
      >
        <div className="relative h-full w-full -skew-x-12 bg-comic-yellow shadow-[18px_0_0_rgba(0,0,0,0.9)]">
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.95) 1.6px, transparent 1.7px)",
              backgroundSize: "11px 11px",
            }}
          />
        </div>
      </motion.div>

      {/* Fixed readable text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.55, rotate: -10 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [0.55, 1.12, 1, 1, 0.9],
          rotate: [-10, 4, 0, 0, 6],
        }}
        transition={{
          duration: 1.45,
          times: [0, 0.18, 0.35, 0.78, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <div className="rounded-full border-[5px] border-black bg-comic-red px-8 py-4 font-display text-4xl uppercase leading-none text-foreground shadow-[8px_8px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:1.2px_rgba(0,0,0,0.85)] sm:text-6xl">
          Page Turn!
        </div>
      </motion.div>
    </React.Fragment>
  );
}

function App() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [showPageCurtain, setShowPageCurtain] = useState(false);

  const hasEnteredApp = useRef(false);

  // Loader initial : attend le vrai chargement de la page + un temps minimum
  useEffect(() => {
    let isMounted = true;

    const minimumLoadingTime = new Promise((resolve) => {
      window.setTimeout(resolve, 2200);
    });

    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });

    Promise.all([minimumLoadingTime, pageLoaded]).then(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Bloque le scroll pendant le loader
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Transition de page uniquement après le premier affichage
  useEffect(() => {
    if (isLoading) return;

    if (!hasEnteredApp.current) {
      hasEnteredApp.current = true;
      return;
    }

    setShowPageCurtain(true);

    const timer = window.setTimeout(() => {
      setShowPageCurtain(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [location.pathname, isLoading]);

  return (
    <>
      <SEO />
      <ScrollToAnchor />

      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />

          <AnimatePresence mode="wait">
            {showPageCurtain && <ComicPageCurtain key={location.pathname} />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;