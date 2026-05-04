import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";

function PlanetIcon({ color = "bg-comic-yellow" }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="absolute h-10 w-24 -rotate-[22deg] rounded-[50%] border-[2px] border-foreground/25" />
      <div className="absolute h-14 w-28 -rotate-[22deg] rounded-[50%] border border-foreground/10" />

      <div
        className={[
          "relative h-14 w-14 rounded-full border-[4px] border-black shadow-[7px_7px_0_rgba(0,0,0,0.7)]",
          color,
        ].join(" ")}
      >
        <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-background/25" />
        <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-background/25" />
      </div>

      <span className="absolute -right-2 top-2 text-xs text-comic-yellow">
        ✦
      </span>
    </div>
  );
}

function SkillsSection() {
  const { language } = useLanguage();
  const t = content[language].skills;

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
      id="skills"
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
            className="mb-5 inline-flex rounded-full border border-foreground/20 bg-background/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-comic-blue backdrop-blur-md"
          >
            {t.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(8rem,13vw,9rem)] uppercase leading-[0.8] text-comic-blue drop-shadow-[7px_7px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)]"
          >
            {t.titleLine1}
            <br />
            <span className="text-comic-yellow">{t.titleLine2}</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            {t.intro}
          </motion.p>
        </motion.div>

        {/* MAIN SKILL CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-7 lg:grid-cols-3"
        >
          {t.categories.map((category, index) => (
            <motion.article
              key={category.number}
              variants={fadeUp}
              whileHover={{
                y: -8,
                rotate: index % 2 === 0 ? -1.5 : 1.5,
                scale: 1.015,
              }}
              className="group relative overflow-hidden rounded-[2rem] border-[5px] border-black bg-background/70 p-6 shadow-[12px_12px_0_rgba(0,0,0,0.82)] backdrop-blur-md"
            >
              {/* Decorative halftone */}
              <div
                className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.9) 1.5px, transparent 1.7px)",
                  backgroundSize: "14px 14px",
                  maskImage:
                    "radial-gradient(circle at center, black 20%, transparent 72%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center, black 20%, transparent 72%)",
                }}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <span
                    className={[
                      "font-display text-5xl leading-none",
                      category.color,
                    ].join(" ")}
                  >
                    {category.number}
                  </span>

                  <h3 className="mt-4 font-display text-4xl uppercase leading-none text-foreground drop-shadow-[4px_4px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:1.2px_rgba(0,0,0,0.9)]">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-foreground/45">
                    {category.planet}
                  </p>
                </div>

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <PlanetIcon color={category.bg} />
                </motion.div>
              </div>

              <p className="relative z-10 mt-7 text-sm leading-relaxed text-foreground/65 sm:text-base">
                {category.text}
              </p>

              <div className="relative z-10 mt-7 flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-foreground/15 bg-background/60 px-4 py-2 text-sm font-semibold text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* TOOLBOX */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mt-10 rounded-[2rem] border-[5px] border-black bg-foreground p-6 text-background shadow-[12px_12px_0_rgba(0,0,0,0.8)] sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-background/55">
                Extra tools
              </p>
              <h3 className="mt-2 font-display text-4xl uppercase leading-none text-comic-red [-webkit-text-stroke:1.2px_rgba(0,0,0,0.9)] sm:text-5xl">
                {t.toolboxTitle}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {t.toolbox.map((tool, index) => {
                const colors = [
                  "bg-comic-yellow",
                  "bg-comic-green",
                  "bg-comic-blue text-foreground",
                  "bg-comic-red text-foreground",
                ];

                return (
                  <motion.span
                    key={tool}
                    whileHover={{
                      y: -4,
                      rotate: index % 2 === 0 ? -2 : 2,
                    }}
                    className={[
                      "rounded-full border-[3px] border-black px-4 py-2 text-sm font-black uppercase text-background shadow-[5px_5px_0_rgba(0,0,0,0.75)]",
                      colors[index % colors.length],
                    ].join(" ")}
                  >
                    {tool}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;