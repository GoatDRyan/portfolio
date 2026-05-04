import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import ComicCard from "../ui/ComicCard";

const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 46,
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
      staggerChildren: 0.1,
    },
  },
};

const itemReveal = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ProjectSection({ section, variant = "text" }) {
  if (!section) return null;

  if (variant === "overview") {
    const cards = Array.isArray(section.cards) ? section.cards : [];

    return (
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        <SectionTitle title={section.title} eyebrow={section.eyebrow} />

        <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2">
          <motion.div variants={itemReveal} className="md:col-span-2">
            <ComicCard>
              <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
                {section.text}
              </p>
            </ComicCard>
          </motion.div>

          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={itemReveal}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
            >
              <ComicCard>
                <h3 className="font-display text-3xl uppercase leading-none text-comic-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,0.75)] [-webkit-text-stroke:1px_rgba(0,0,0,0.85)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  {card.text}
                </p>
              </ComicCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    );
  }

  if (variant === "role") {
    const items = Array.isArray(section.items) ? section.items : [];

    return (
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        <SectionTitle title={section.title} eyebrow={section.eyebrow} />

        <ComicCard>
          <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
            {section.text}
          </p>

          <motion.ul variants={stagger} className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <motion.li
                key={item}
                variants={itemReveal}
                whileHover={{ x: 6, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
                className="rounded-[1.2rem] border-[3px] border-black bg-foreground p-4 text-sm font-bold leading-relaxed text-background shadow-[5px_5px_0_rgba(0,0,0,0.75)]"
              >
                ✦ {item}
              </motion.li>
            ))}
          </motion.ul>
        </ComicCard>
      </motion.section>
    );
  }

  if (variant === "process") {
    const items = Array.isArray(section.items) ? section.items : [];

    return (
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <SectionTitle title={section.title} eyebrow={section.eyebrow} />

        <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
          {items.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemReveal}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
            >
              <ComicCard>
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block font-display text-4xl text-comic-red"
                >
                  0{index + 1}
                </motion.span>

                <h3 className="mt-3 font-display text-3xl uppercase leading-none text-foreground">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  {step.text}
                </p>
              </ComicCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    );
  }

  if (variant === "features") {
    const items = Array.isArray(section.items) ? section.items : [];

    return (
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle title={section.title} eyebrow={section.eyebrow} />

        <ComicCard>
          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2">
            {items.map((feature, index) => {
              const colors = [
                "bg-comic-yellow text-background",
                "bg-comic-green text-background",
                "bg-comic-blue text-foreground",
                "bg-comic-red text-foreground",
              ];

              return (
                <motion.div
                  key={feature}
                  variants={itemReveal}
                  whileHover={{
                    y: -5,
                    scale: 1.025,
                    rotate: index % 2 === 0 ? -1 : 1,
                  }}
                  className={[
                    "rounded-full border-[3px] border-black px-5 py-3 text-sm font-black shadow-[5px_5px_0_rgba(0,0,0,0.75)]",
                    colors[index % colors.length],
                  ].join(" ")}
                >
                  {feature}
                </motion.div>
              );
            })}
          </motion.div>
        </ComicCard>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      <SectionTitle title={section.title} eyebrow={section.eyebrow} />

      <ComicCard>
        <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
          {section.text}
        </p>
      </ComicCard>
    </motion.section>
  );
}

export default ProjectSection;