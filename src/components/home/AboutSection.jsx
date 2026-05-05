import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";

function AboutSection() {
  const { language } = useLanguage();
  const t = content[language].about;

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 36,
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

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-28 text-foreground sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger}
          className="mb-16 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex rounded-full border border-foreground/20 bg-background/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-comic-green backdrop-blur-md"
          >
            {t.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(8rem,13vw,9rem)] uppercase leading-[0.8] text-comic-green drop-shadow-[7px_7px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)]"
          >
            {t.titleLine1}
            <br />
            <span className="text-comic-yellow">{t.titleLine2}</span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-full rounded-[2rem] border-[5px] border-black bg-comic-blue p-5 shadow-[14px_14px_0_rgba(0,0,0,0.85)]">
              <div className="relative overflow-hidden rounded-[1.5rem] border-[4px] border-black bg-background/85 p-7 backdrop-blur-md sm:p-9">
                {/* Décor Petit Prince / planète */}
                <div className="pointer-events-none absolute -right-10 -top-10 opacity-20">
                  <div className="h-32 w-32 rounded-full border border-comic-yellow/40" />
                  <div className="absolute left-10 top-10 h-12 w-12 rounded-full bg-comic-yellow" />
                  <span className="absolute left-4 top-20 text-xs text-foreground">
                    ✦
                  </span>
                </div>

                <div className="mb-6 inline-flex rounded-full border-2 border-black bg-comic-red px-4 py-1 text-xs font-black uppercase tracking-[0.22em] text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.8)]">
                  {t.mainLabel}
                </div>

                <h3 className="font-display text-5xl uppercase leading-none text-foreground drop-shadow-[4px_4px_0_rgba(0,0,0,0.9)] [-webkit-text-stroke:1.5px_rgba(0,0,0,0.9)] sm:text-6xl">
                  {t.name}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-foreground/85 sm:text-lg">
                  {t.intro}
                </p>

                <p className="mt-5 text-base leading-relaxed text-foreground/65 sm:text-lg">
                  {t.goal}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {t.tags.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-foreground/15 bg-background/60 px-4 py-2 text-sm font-semibold text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.45)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sticker */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [12, 15, 12] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-5 hidden sm:block"
              >
                <div
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
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="flex flex-col gap-8"
          >
            {/* BULLE */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-visible rounded-[2rem] border-[5px] border-black bg-foreground p-7 text-background shadow-[12px_12px_0_rgba(0,0,0,0.8)] sm:p-8"
            >
              <p className="max-w-[90%] font-display text-4xl uppercase leading-none text-comic-red [-webkit-text-stroke:1.2px_rgba(0,0,0,0.9)] sm:text-5xl">
                “{t.quote}”
              </p>

              <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-background/75 sm:text-lg">
                {t.quoteText}
              </p>

              <div
                className="absolute -bottom-8 left-12 h-10 w-10 bg-foreground"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 20% 100%)",
                }}
              />
            </motion.div>

            {/* CARDS */}
            <div className="grid gap-5 md:grid-cols-3">
              {t.cards.map((card) => (
                <motion.div
                  key={card.number}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    rotate: -1,
                    scale: 1.02,
                  }}
                  className="relative overflow-hidden rounded-[1.5rem] border-[4px] border-black bg-background/65 p-6 shadow-[8px_8px_0_rgba(0,0,0,0.75)] backdrop-blur-md"
                >
                  <span className="pointer-events-none absolute right-4 top-4 text-xs text-foreground/25">
                    ✦
                  </span>

                  <span
                    className={`font-display text-4xl leading-none ${card.color}`}
                  >
                    {card.number}
                  </span>

                  <h4 className="mt-4 font-display text-3xl uppercase leading-none text-foreground">
                    {card.title}
                  </h4>

                  <p className="mt-4 text-sm leading-relaxed text-foreground/65">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CURRENT FOCUS */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[2rem] border-[4px] border-black bg-comic-green p-6 text-background shadow-[10px_10px_0_rgba(0,0,0,0.8)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-background/20" />
              <div className="pointer-events-none absolute -right-2 top-8 h-8 w-8 rounded-full bg-comic-yellow/80" />

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em]">
                    {t.missionLabel}
                  </p>

                  <h4 className="mt-3 font-display text-4xl uppercase leading-none [-webkit-text-stroke:1.2px_rgba(0,0,0,0.75)] sm:text-5xl">
                    {t.mission}
                  </h4>
                </div>

                <div className="shrink-0 rounded-full border-[3px] border-black bg-comic-yellow px-5 py-3 text-sm font-black uppercase shadow-[5px_5px_0_rgba(0,0,0,0.75)]">
                  {t.missionTag}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;