import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import StaticStarField from "./components/StaticStarField.jsx";

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
 return (
  <div className="min-h-screen flex flex-col">
   <ScrollToTop />
   
   <StaticStarField />

   <Navbar />

   <main className="flex-1 flex flex-col z-10">
    <Outlet />
   </main>

   <Footer />
   
  </div>
 );
}