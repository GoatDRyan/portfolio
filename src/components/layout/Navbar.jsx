import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../../assets/logo/logo.svg";

function LogoMark() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <div className="absolute h-16 w-24 -rotate-[24deg] rounded-[50%] border border-comic-yellow/45" />
      <div className="absolute h-12 w-20 -rotate-[24deg] rounded-[50%] border border-foreground/15" />

      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-comic-yellow/35 bg-background/70 p-1 shadow-[0_0_24px_rgba(246,201,69,0.22)]">
        <img
          src={logo}
          alt="Ryan logo"
          className="h-[92%] w-[92%] object-contain"
        />
      </div>

      <span className="absolute -right-3 top-1 text-[10px] text-foreground/70">
        ✦
      </span>
      <span className="absolute -left-2 bottom-1 text-[8px] text-comic-yellow">
        ✦
      </span>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = {
    fr: [
      { label: "Accueil", href: "#top" },
      { label: "À propos", href: "#about" },
      { label: "Compétences", href: "#skills" },
      { label: "Projets", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    en: [
      { label: "Home", href: "#top" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  };

  const links = navigation[language] || navigation.fr;

  const closeMenu = () => setIsOpen(false);

  const handleAnchorNavigation = (event, href) => {
    event.preventDefault();
    closeMenu();

    const id = href.replace("#", "");

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#top");
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 sm:px-6 lg:px-10">
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-foreground/12 bg-background/55 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-5 lg:px-6"
      >
        <div className="pointer-events-none absolute left-[12%] top-1/2 hidden h-16 w-[76%] -translate-y-1/2 rounded-[50%] border border-comic-yellow/10 lg:block" />
        <div className="pointer-events-none absolute left-[20%] top-1/2 hidden h-10 w-[58%] -translate-y-1/2 rounded-[50%] border border-foreground/5 lg:block" />

        <span className="pointer-events-none absolute left-[28%] top-3 hidden text-[10px] text-comic-yellow/80 lg:block">
          ✦
        </span>
        <span className="pointer-events-none absolute right-[25%] bottom-3 hidden text-[8px] text-foreground/45 lg:block">
          ✦
        </span>
        <span className="pointer-events-none absolute right-[15%] top-4 hidden text-[8px] text-comic-green/70 lg:block">
          ✦
        </span>

        <a
          href="#top"
          onClick={(event) => handleAnchorNavigation(event, "#top")}
          className="group relative flex min-w-0 items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="transition-transform duration-300 group-hover:scale-105"
          >
            <LogoMark />
          </motion.div>

          <div className="min-w-0">
            <p className="truncate font-display text-2xl uppercase leading-none text-foreground">
              Ryan
            </p>
            <p className="truncate text-[0.62rem] uppercase tracking-[0.28em] text-foreground/55">
              Little creative planet
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((item, index) => {
            const dotColors = [
              "bg-comic-yellow",
              "bg-comic-green",
              "bg-comic-blue",
              "bg-comic-red",
            ];

            return (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(event) => handleAnchorNavigation(event, item.href)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-full px-4 py-2 text-sm font-medium tracking-[0.08em] text-foreground/75 transition-all duration-300 hover:text-foreground"
              >
                <span
                  className={[
                    "absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full opacity-60 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100",
                    dotColors[index % dotColors.length],
                  ].join(" ")}
                />
                {item.label}
              </motion.a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.05] text-foreground/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-comic-yellow/40 hover:bg-comic-yellow/15 lg:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col items-center justify-between">
              <span
                className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-7xl rounded-[1.75rem] border border-foreground/12 bg-background/86 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:hidden"
          >
            <div className="relative overflow-hidden rounded-[1.25rem] border border-foreground/8 bg-foreground/[0.03] p-4">
              <div className="pointer-events-none absolute -right-6 -top-6 opacity-60">
                <div className="h-24 w-24 rounded-full border border-comic-yellow/20" />
                <div className="absolute left-8 top-8 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/95 p-1.5">
                  <img
                    src={logo}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="absolute left-4 top-14 text-xs text-foreground/60">
                  ✦
                </span>
              </div>

              <div className="grid gap-2">
                {links.map((item, index) => {
                  const textColors = [
                    "text-comic-yellow",
                    "text-comic-green",
                    "text-comic-blue",
                    "text-comic-red",
                  ];

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(event) =>
                        handleAnchorNavigation(event, item.href)
                      }
                      whileHover={{ x: 4 }}
                      className={[
                        "relative rounded-2xl border border-foreground/10 bg-background/45 px-4 py-4 text-lg font-semibold tracking-[0.08em] shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all duration-300 hover:bg-foreground/[0.05]",
                        textColors[index % textColors.length],
                      ].join(" ")}
                    >
                      <span className="mr-3 text-xs">✦</span>
                      {item.label}
                    </motion.a>
                  );
                })}

                <div className="pt-2 sm:hidden">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;