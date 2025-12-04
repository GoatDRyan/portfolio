import { useState, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";
import React from 'react';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import StaticStarField from "./components/StaticStarField.jsx";
import Loader from "./components/Loader.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const element = useOutlet(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <StaticStarField />

      {isLoading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-auto">
          <Loader />
        </div>
      )}

      <div className="z-11">
        <Navbar />
      </div>

      <main className="flex-1 flex flex-col z-10">
        <AnimatePresence mode="wait" initial={false}>
          {element && React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}