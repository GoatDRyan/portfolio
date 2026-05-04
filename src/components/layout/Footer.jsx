import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";

function Footer() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const t = content[language]?.footer || content.fr.footer;
  const navigation = content[language]?.navigation || content.fr.navigation;

  const handleBackToTop = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (location.pathname === "/") {
      window.history.replaceState(null, "", "#top");
    }
  };

  const handleAnchorNavigation = (event, href) => {
    event.preventDefault();

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

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-5 pb-8 pt-28 text-foreground sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[2.25rem] border-[5px] border-black bg-background/80 p-6 shadow-[14px_14px_0_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-8 lg:p-10"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(rgba(246,201,69,0.95) 2px, transparent 2.2px)",
              backgroundSize: "18px 18px",
              maskImage:
                "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 75%)",
            }}
          />

          <div className="pointer-events-none absolute bottom-8 right-8 hidden opacity-60 lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-28 w-28 items-center justify-center"
            >
              <div className="absolute h-12 w-36 -rotate-[22deg] rounded-[50%] border border-comic-yellow/35" />
              <div className="absolute h-20 w-20 rounded-full border-[4px] border-black bg-comic-yellow shadow-[8px_8px_0_rgba(0,0,0,0.75)]" />
              <div className="absolute left-10 top-9 h-3 w-3 rounded-full bg-background/25" />
              <div className="absolute bottom-8 right-9 h-2 w-2 rounded-full bg-background/25" />
              <span className="absolute -right-3 top-4 text-sm text-foreground/80">
                ✦
              </span>
            </motion.div>
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-foreground/20 bg-background/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-comic-green backdrop-blur-md">
                {t.eyebrow}
              </span>

              <h2 className="font-display text-[clamp(3.5rem,10vw,8rem)] uppercase leading-[0.82] text-comic-yellow drop-shadow-[7px_7px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)]">
                {t.titleLine1}
                <br />
                <span className="text-comic-blue">{t.titleLine2}</span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                {t.text}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <motion.a
                  href="mailto:mumbata.ryan2@gmail.com"
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border-[3px] border-black bg-comic-yellow px-7 py-3.5 font-bold text-background shadow-[7px_7px_0_rgba(0,0,0,0.85)] transition-all duration-200 hover:border-comic-yellow hover:bg-transparent hover:text-foreground hover:shadow-[10px_10px_0_rgba(0,0,0,0.85)]"
                >
                  {t.contact}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    ✦
                  </span>
                </motion.a>

                <motion.a
                  href="#top"
                  onClick={handleBackToTop}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border-[3px] border-comic-green bg-background/35 px-7 py-3.5 font-bold text-comic-green shadow-[7px_7px_0_rgba(0,0,0,0.55)] backdrop-blur-md transition-colors duration-200 hover:bg-comic-green hover:text-background hover:shadow-[10px_10px_0_rgba(0,0,0,0.75)]"
                >
                  {t.backTop}
                  <span className="transition-transform duration-200 group-hover:-translate-y-1">
                    ↑
                  </span>
                </motion.a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border-[4px] border-black bg-foreground p-6 text-background shadow-[8px_8px_0_rgba(0,0,0,0.75)]">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-background/55">
                  {t.navigationTitle}
                </p>

                <div className="mt-5 grid gap-3">
                  {navigation.map((link, index) => {
                    const colors = [
                      "text-comic-yellow",
                      "text-comic-green",
                      "text-comic-blue",
                      "text-comic-red",
                    ];

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(event) =>
                          handleAnchorNavigation(event, link.href)
                        }
                        className={[
                          "group flex items-center justify-between rounded-full border border-background/15 bg-background/5 px-4 py-3 font-bold transition-all duration-200 hover:translate-x-1 hover:bg-background/10",
                          colors[index % colors.length],
                        ].join(" ")}
                      >
                        {link.label}
                        <span className="text-background/45 transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.75rem] border-[4px] border-black bg-comic-blue p-6 text-foreground shadow-[8px_8px_0_rgba(0,0,0,0.75)]">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-foreground/65">
                  {t.socialTitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {t.socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      whileHover={{ y: -4, rotate: -2 }}
                      className="rounded-full border-[3px] border-black bg-background px-4 py-2 text-sm font-black uppercase text-foreground shadow-[5px_5px_0_rgba(0,0,0,0.75)]"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-7 rounded-[1.25rem] border border-foreground/15 bg-background/20 p-4">
                  <p className="font-display text-3xl uppercase leading-none text-comic-yellow drop-shadow-[3px_3px_0_rgba(0,0,0,0.65)]">
                    {t.planetText}
                  </p>
                  <p className="mt-2 text-sm text-foreground/70">
                    Web · Design · Story
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center text-xs uppercase tracking-[0.22em] text-foreground/45 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {t.copyrightName}
          </p>
          <p>{t.signature}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;