import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

function ProjectHero({ project, detail, language }) {
  const { scrollYProgress } = useScroll();

  const imageY = useTransform(scrollYProgress, [0, 0.35], [0, -45]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.35], [2, -1]);
  const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -22]);

  const linkLabel = (link) => {
    if (typeof link.label === "string") return link.label;
    return link.label?.[language] || link.label?.fr || "View";
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.11,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 34,
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

  const coverVariants = {
    hidden: {
      opacity: 0,
      y: 55,
      rotate: -4,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 2,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-black bg-background/80 p-5 shadow-[18px_18px_0_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8 lg:p-10">
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-25"
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

      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-8 top-8 hidden rounded-full border-[3px] border-black bg-comic-red px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-foreground shadow-[5px_5px_0_rgba(0,0,0,0.75)] sm:block"
      >
        Issue {project.number}
      </motion.div>

      <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex rounded-full border-[3px] border-black bg-comic-yellow px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-background shadow-[5px_5px_0_rgba(0,0,0,0.75)]"
          >
            Chapter Cover · {detail.badge}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            style={{ y: titleY }}
            className="font-display text-[clamp(4.5rem,13vw,10rem)] uppercase leading-[0.72] text-comic-yellow drop-shadow-[8px_8px_0_rgba(0,0,0,0.9)] [-webkit-text-stroke:2.5px_rgba(0,0,0,0.95)]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-foreground/75 sm:text-lg"
          >
            {detail.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            {project.links?.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                whileHover={{ y: -6, scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border-[4px] border-black px-7 py-3.5 font-black text-background shadow-[8px_8px_0_rgba(0,0,0,0.85)] transition-all duration-200 hover:bg-transparent hover:text-foreground"
                style={{ backgroundColor: project.accent }}
              >
                {linkLabel(link)} ↗
              </motion.a>
            ))}

            <motion.div
              whileHover={{ y: -6, scale: 1.04, rotate: 1 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/#projects"
                className="inline-flex rounded-full border-[4px] border-comic-green bg-background/50 px-7 py-3.5 font-black text-comic-green shadow-[8px_8px_0_rgba(0,0,0,0.65)] transition-all duration-200 hover:bg-comic-green hover:text-background"
              >
                {detail.backLabel}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={coverVariants}
          initial="hidden"
          animate="visible"
          style={{ y: imageY, rotate: imageRotate }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -right-5 -top-6 z-20 hidden rotate-12 sm:block">
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-24 w-24 items-center justify-center p-3 text-center font-display text-xl uppercase leading-none text-background shadow-[6px_6px_0_rgba(0,0,0,0.75)]"
                style={{
                  backgroundColor: project.accent,
                  clipPath:
                    "polygon(50% 0%, 61% 18%, 82% 8%, 76% 30%, 100% 34%, 82% 50%, 100% 66%, 76% 70%, 82% 92%, 61% 82%, 50% 100%, 39% 82%, 18% 92%, 24% 70%, 0% 66%, 18% 50%, 0% 34%, 24% 30%, 18% 8%, 39% 18%)",
                }}
              >
                Cover
              </motion.div>
            </div>

            <motion.div
              whileHover={{ rotate: -1, scale: 1.025 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group rounded-[2rem] border-[5px] border-black bg-comic-yellow p-3 shadow-[14px_14px_0_rgba(0,0,0,0.85)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] border-[4px] border-black bg-foreground/5">
                <img
                  src={project.image}
                  alt={detail.fullTitle}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
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
                  initial={{ x: "-140%" }}
                  animate={{ x: ["-140%", "360%"] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <motion.div
                  animate={{ x: [0, 4, 0], y: [0, -3, 0] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-4 left-4 rounded-full border-[3px] border-black bg-comic-blue px-4 py-2 text-xs font-black uppercase text-foreground shadow-[5px_5px_0_rgba(0,0,0,0.75)]"
                >
                  {detail.liveLabel}
                </motion.div>
              </div>
            </motion.div>

            <div
              className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-[2rem] border-[5px] border-black"
              style={{ backgroundColor: project.accent }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectHero;