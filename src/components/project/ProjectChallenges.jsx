import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

function ProjectChallenges({ section }) {
  if (!section) return null;

  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <section>
      <SectionTitle title={section.title} eyebrow={section.eyebrow} />

      <div className="grid gap-6">
        {items.map((item, index) => (
          <motion.article
            key={`${item.problem}-${index}`}
            whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
            className="relative overflow-hidden rounded-[2rem] border-[5px] border-black bg-background/85 p-6 shadow-[12px_12px_0_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-8"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(193,18,31,0.95) 2px, transparent 2.2px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 75%)",
              }}
            />

            <div className="relative z-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border-[3px] border-black bg-comic-red px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-foreground shadow-[5px_5px_0_rgba(0,0,0,0.75)]">
                  Boss #{index + 1}
                </span>

                <h3 className="mt-5 font-display text-4xl uppercase leading-none text-comic-red drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)] [-webkit-text-stroke:1.4px_rgba(0,0,0,0.9)]">
                  Problem
                </h3>

                <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground/75 sm:text-base">
                  {item.problem}
                </p>
              </div>

              <div className="rounded-[1.5rem] border-[4px] border-black bg-foreground p-5 text-background shadow-[8px_8px_0_rgba(0,0,0,0.75)]">
                <h4 className="font-display text-3xl uppercase leading-none text-comic-yellow">
                  Solution move
                </h4>

                <p className="mt-4 text-sm font-semibold leading-relaxed text-background/75 sm:text-base">
                  {item.solution}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ProjectChallenges;