import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import StaticStarField from "./components/StaticStarField.jsx";
import Loader from "./components/Loader.jsx";
import AppReadyContext from './context/AppReadyContext.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.scrollY !== 0 && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const appReady = !isLoading;

  return (
    <AppReadyContext.Provider value={appReady}>
    <div className="min-h-screen flex flex-col relative">
      {/* Background starfield always rendered under everything */}
      <StaticStarField />

      {/* Loader overlay (AnimatePresence handles exit animation) */}
      <AnimatePresence mode="wait" initial={false}>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-auto"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page chrome - Navbar sits above content but below loader */}
      <div className="z-20">
        <Navbar />
      </div>

      {/* Main content area: kept mounted so it can render while loader exits.
          We animate its appearance based on isLoading to create a smooth reveal. */}
      <motion.main
        className="flex-1 flex flex-col z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={isLoading ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {/* Animate route changes (optional): the Outlet is wrapped so each route can animate */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45 }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.main>

      <Footer />

      <ScrollToTop />
    </div>
    </AppReadyContext.Provider>
  );
}
