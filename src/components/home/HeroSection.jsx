import React from "react";
import { motion } from "framer-motion";
import moi from "../../assets/hero/moi.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";

function HeroSection() {
  const { language } = useLanguage();
  const t = content[language].hero;

  const words = t.title.split(" ");

  const h1Label =
    t.h1Label ||
    (language === "fr"
      ? "Ryan Mumbata, développeur web junior et UI designer à Rouen"
      : "Ryan Mumbata, junior web developer and UI designer");

  const portraitAlt =
    t.portraitAlt ||
    (language === "fr"
      ? "Portrait de Ryan Mumbata, développeur web junior et UI designer à Rouen"
      : "Portrait of Ryan Mumbata, junior web developer and UI designer");

  const colors = [
    "text-foreground",
    "text-comic-yellow",
    "text-comic-blue",
  ];

  const offsets = [
    "-translate-x-3 sm:-translate-x-8 lg:-translate-x-12",
    "-translate-x-1 sm:-translate-x-4",
    "translate-x-4 sm:translate-x-8 lg:translate-x-12",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 24,
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

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 70,
      rotate: -4,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const chipVariants = {
    hidden: {
      opacity: 0,
      y: 14,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.92,
      rotate: -4,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.9,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-dvh overflow-hidden px-5 pb-24 pt-36 text-foreground sm:px-8 sm:pt-40 lg:px-12 lg:pt-36">
      <motion.div
        className="mx-auto grid min-h-[calc(100dvh-8rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            variants={fadeUp}
            className=" -top-15 relative mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-foreground/25 bg-background/35 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-comic-green backdrop-blur-md sm:text-xs"
          >
            {t.badge}
            <span className="hidden h-1.5 w-1.5 rounded-full bg-comic-yellow sm:block" />
            <span className="text-foreground/80">{t.role}</span>
          </motion.span>

          <h1
            aria-label={h1Label}
            className="font-display uppercase leading-[0.72] tracking-wide scale-x-[1.18] sm:scale-x-125 lg:origin-left lg:scale-x-150 lg:-rotate-10"
          >
            {words.map((word, index) => (
              <span
                key={word}
                className={[
                  offsets[index % offsets.length],
                  "block overflow-visible",
                ].join(" ")}
              >
                <motion.span
                  variants={wordVariants}
                  className={[
                    colors[index % colors.length],
                    "inline-block text-[clamp(5.6rem,24vw,10.5rem)] drop-shadow-[6px_6px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)]",
                  ].join(" ")}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg md:text-xl"
          >
            {t.subtitleLine1}
            <br />
            {t.subtitleLine2}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <motion.a
              href="#projects"
              role="button"
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="group inline-flex items-center justify-center gap-3 rounded-full border-[3px] border-black bg-comic-yellow px-7 py-3.5 font-bold text-background shadow-[7px_7px_0_rgba(0,0,0,0.85)] transition-all duration-200 hover:border-comic-yellow hover:bg-transparent hover:text-foreground hover:shadow-[10px_10px_0_rgba(0,0,0,0.85)]"
            >
              {t.primaryButton}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                ➝
              </span>
            </motion.a>

            <motion.a
              href="#about"
              role="button"
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="group inline-flex items-center justify-center gap-3 rounded-full border-[3px] border-comic-green bg-background/35 px-7 py-3.5 font-bold text-comic-green shadow-[7px_7px_0_rgba(0,0,0,0.55)] backdrop-blur-md transition-colors duration-200 hover:bg-comic-green hover:text-background hover:shadow-[10px_10px_0_rgba(0,0,0,0.75)]"
            >
              {t.secondaryButton}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                ➝
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {t.chips.map((item, index) => {
              const chipColors = [
                "text-comic-yellow",
                "text-comic-green",
                "text-comic-blue",
                "text-comic-red",
                "text-foreground",
              ];

              return (
                <motion.span
                  key={item}
                  variants={chipVariants}
                  whileHover={{
                    y: -4,
                    rotate: index % 2 === 0 ? -2 : 2,
                    scale: 1.05,
                  }}
                  className={[
                    "rounded-full border border-foreground/15 bg-background/40 px-4 py-2 text-sm font-semibold shadow-[4px_4px_0_rgba(0,0,0,0.45)] backdrop-blur-md",
                    chipColors[index % chipColors.length],
                  ].join(" ")}
                >
                  {item}
                </motion.span>
              );
            })}
          </motion.div>
        </div>

        {/* RIGHT IMAGE / COMIC COVER */}
        <motion.div
          variants={imageVariants}
          className="relative z-10 flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[420px] rotate-3 sm:max-w-[500px] lg:max-w-[520px]">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Decorative sticker */}
              <div className="absolute -right-4 -top-5 z-20 hidden rotate-12 sm:block">
                <motion.div
                  animate={{
                    scale: [1, 1.06, 1],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-24 w-24 items-center justify-center p-3 text-center text-xs font-black uppercase leading-tight text-background shadow-[6px_6px_0_rgba(0,0,0,0.75)]"
                  style={{
                    backgroundColor: "#f6c945",
                    clipPath:
                      "polygon(50% 0%, 61% 18%, 82% 8%, 76% 30%, 100% 34%, 82% 50%, 100% 66%, 76% 70%, 82% 92%, 61% 82%, 50% 100%, 39% 82%, 18% 92%, 24% 70%, 0% 66%, 18% 50%, 0% 34%, 24% 30%, 18% 8%, 39% 18%)",
                  }}
                >
                  {t.stickerLine1}
                  <br />
                  {t.stickerLine2}
                </motion.div>
              </div>

              {/* Comic cover card */}
              <motion.div
                whileHover={{
                  rotate: -1,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="group relative rounded-[2rem] border-[5px] border-black bg-comic-yellow p-3 shadow-[14px_14px_0_rgba(0,0,0,0.85)] sm:p-4"
              >
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-4 top-4 z-20 rounded-full border-2 border-black bg-comic-red px-4 py-1 text-xs font-black uppercase tracking-widest text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.7)]"
                >
                  Vol. 01
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -3, 0],
                    y: [0, 2, 0],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-5 right-5 z-20 rounded-full border-2 border-black bg-comic-blue px-4 py-1 text-xs font-black uppercase tracking-widest text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.7)]"
                >
                  {t.coverLabel}
                </motion.div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] border-[4px] border-black bg-background">
                  <img
                    src={moi}
                    alt={portraitAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(0,0,0,0.85) 1.2px, transparent 1.2px)",
                      backgroundSize: "10px 10px",
                    }}
                  />

                  <motion.div
                    className="absolute top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    initial={{
                      x: "-140%",
                    }}
                    animate={{
                      x: ["-140%", "360%"],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 max-w-[75%]">
                    <motion.p
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="font-display text-4xl uppercase leading-none text-comic-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:1.5px_rgba(0,0,0,0.9)] sm:text-5xl"
                    >
                      {t.coverTitleLine1}
                      <br />
                      {t.coverTitleLine2}
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <div className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-[2rem] border-[5px] border-black bg-comic-blue" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;