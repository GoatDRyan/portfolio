import React from "react";
import { useLanguage } from "../../context/LanguageContext";

function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={
        language === "fr"
          ? "Switch portfolio language to English"
          : "Passer le portfolio en français"
      }
      className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.05] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-comic-yellow/50 hover:bg-comic-yellow hover:text-background"
    >
      <span className="text-[10px] text-comic-yellow transition-colors duration-300 group-hover:text-background">
        ✦
      </span>
      {language === "fr" ? "EN" : "FR"}
    </button>
  );
}

export default LanguageSwitcher;