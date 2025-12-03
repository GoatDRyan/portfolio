import { useState, useEffect } from "react";
// ATTENTION : il faut bien importer useOutlet ici
import { useLocation, useOutlet } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";
import React from 'react'; // Nécessaire pour React.cloneElement
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import StaticStarField from "./components/StaticStarField.jsx";
import Loader from "./components/Loader.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // On récupère la page active
  const element = useOutlet(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

      {/* Navbar en z-20 */}
      <div className="z-20">
        <Navbar />
      </div>

      {/* Main en z-10 */}
      <main className="flex-1 flex flex-col z-10">
        {/* AnimatePresence gère la sortie de l'ancienne page */}
        <AnimatePresence mode="wait" initial={false}>
          {/* On clone l'élément pour lui forcer une KEY unique */}
          {element && React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}