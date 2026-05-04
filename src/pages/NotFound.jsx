import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function NotFound() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-background px-5 py-32 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 inline-flex rounded-full border-[3px] border-black bg-comic-red px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-foreground shadow-[5px_5px_0_rgba(0,0,0,0.75)]">
          404
        </p>

        <h1 className="font-display text-[clamp(4rem,12vw,8rem)] uppercase leading-[0.8] text-comic-yellow drop-shadow-[7px_7px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)]">
          {language === "fr" ? "Page introuvable" : "Page not found"}
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-foreground/70">
          {language === "fr"
            ? "Cette page n’existe pas ou a été déplacée."
            : "This page does not exist or has been moved."}
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-full border-[4px] border-black bg-comic-yellow px-7 py-3.5 font-black text-background shadow-[8px_8px_0_rgba(0,0,0,0.85)] transition-all duration-200 hover:-translate-y-1"
        >
          {language === "fr" ? "Retour à l’accueil" : "Back home"}
        </Link>
      </div>
    </main>
  );
}

export default NotFound;