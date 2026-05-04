import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";
import { projects } from "../../data/projects";

function Halftone({ className = "", color = "rgba(246,201,69,0.9)" }) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 2px, transparent 2.2px)`,
        backgroundSize: "17px 17px",
        maskImage:
          "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 48%, transparent 76%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 48%, transparent 76%)",
      }}
    />
  );
}

function ComicBurst({
  className = "",
  color = "#f6c945",
  children,
  size = 96,
}) {
  return (
    <div
      className={`absolute flex items-center justify-center text-center font-display uppercase leading-none text-background drop-shadow-[6px_6px_0_rgba(0,0,0,0.8)] ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        clipPath:
          "polygon(50% 0%, 60% 22%, 82% 8%, 76% 32%, 100% 34%, 80% 50%, 100% 66%, 76% 68%, 82% 92%, 60% 78%, 50% 100%, 40% 78%, 18% 92%, 24% 68%, 0% 66%, 20% 50%, 0% 34%, 24% 32%, 18% 8%, 40% 22%)",
      }}
    >
      <span className="px-4 text-xl sm:text-2xl">{children}</span>
    </div>
  );
}

function SpeedLines({ className = "", color = "#c1121f" }) {
  const bars = [
    { width: 220, height: 12, ml: 0 },
    { width: 170, height: 9, ml: 28 },
    { width: 125, height: 7, ml: 56 },
    { width: 82, height: 5, ml: 84 },
  ];

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      {bars.map((bar, index) => (
        <div
          key={index}
          className="mb-3 rounded-full border-2 border-black"
          style={{
            width: bar.width,
            height: bar.height,
            marginLeft: bar.ml,
            backgroundColor: color,
            boxShadow: "4px 4px 0 rgba(0,0,0,0.72)",
          }}
        />
      ))}
    </div>
  );
}

function MiniPlanet({ accent }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
      <div className="absolute h-7 w-24 -rotate-[22deg] rounded-[50%] border-[3px] border-black sm:h-8 sm:w-28" />

      <div
        className="relative h-12 w-12 rounded-full border-[4px] border-black shadow-[6px_6px_0_rgba(0,0,0,0.75)] sm:h-14 sm:w-14"
        style={{ backgroundColor: accent }}
      >
        <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-background/30" />
        <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-background/30" />
      </div>

      <span className="absolute -right-2 top-1 text-xs text-foreground">
        ✦
      </span>
    </div>
  );
}

function getLinkLabel(link, language) {
  if (typeof link.label === "string") return link.label;
  return link.label?.[language] || link.label?.fr || "View";
}

function ProjectCardContent({
  project,
  index,
  labels,
  language,
  variant = "desktop",
}) {
  const card = project.card?.[language] || project.card?.fr;

  if (!card) return null;

  const tags = Array.isArray(card.tags) ? card.tags : [];
  const isMobile = variant === "mobile";

  const fallbackBackground = `
    radial-gradient(circle at 30% 25%, ${project.accent}77, transparent 34%),
    linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.55))
  `;

  return (
    <article
      className={[
        "relative w-full overflow-visible rounded-[2rem] border-[5px] border-black bg-foreground p-2 text-background shadow-[16px_16px_0_rgba(0,0,0,0.9)]",
        isMobile ? "h-auto max-w-[520px]" : "h-full",
      ].join(" ")}
    >
      <ComicBurst
        className="-right-4 -top-7 z-30 rotate-12 sm:-right-5 sm:-top-8"
        color={project.accent}
        size={isMobile ? 78 : 98}
      >
        {project.number}
      </ComicBurst>

      {!isMobile && (
        <SpeedLines
          className="-left-10 top-10 z-20 hidden -rotate-12 opacity-90 lg:block"
          color={project.accent}
        />
      )}

      <div
        className={[
          "relative overflow-hidden rounded-[1.55rem] border-[5px] border-black bg-background text-foreground",
          isMobile ? "h-auto" : "h-full",
        ].join(" ")}
      >
        <Halftone
          className="-right-20 -top-20 h-72 w-72 opacity-35"
          color={`${project.accent}dd`}
        />

        <Halftone
          className="-bottom-24 -left-24 h-72 w-72 opacity-20"
          color="rgba(255,248,231,0.75)"
        />

        <div
          className={[
            "grid",
            isMobile ? "h-auto" : "h-full lg:grid-cols-[1.04fr_0.96fr]",
          ].join(" ")}
        >
          {/* IMAGE */}
          <div
            className={[
              "group relative overflow-hidden border-b-[5px] border-black",
              isMobile
                ? "aspect-[4/3] min-h-[220px]"
                : "min-h-[240px] lg:min-h-full lg:border-b-0 lg:border-r-[5px]",
            ].join(" ")}
          >
            <div
              className="absolute inset-0"
              style={{ background: fallbackBackground }}
            />

            <img
              src={project.image}
              alt={card.imageAlt || `${project.title} project preview`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="relative z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div
              className="absolute inset-0 z-20 opacity-[0.16] mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.95) 1.35px, transparent 1.45px)",
                backgroundSize: "10px 10px",
              }}
            />

            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute left-4 top-4 z-30 rotate-[-3deg] rounded-2xl border-[4px] border-black bg-comic-yellow px-4 py-2 text-background shadow-[6px_6px_0_rgba(0,0,0,0.8)] sm:left-5 sm:top-5 sm:px-5 sm:py-3">
              <p className="text-[0.55rem] font-black uppercase tracking-[0.25em]">
                Issue
              </p>
              <p className="font-display text-3xl uppercase leading-none sm:text-4xl">
                {project.number}
              </p>
            </div>

            <div
              className="absolute bottom-4 right-4 z-30 max-w-[82%] rotate-2 rounded-full border-[4px] border-black px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.12em] text-background shadow-[6px_6px_0_rgba(0,0,0,0.8)] sm:bottom-5 sm:right-5 sm:px-5 sm:py-3 sm:text-sm"
              style={{ backgroundColor: project.accent }}
            >
              {card.type}
            </div>

            {!isMobile && (
              <div className="absolute bottom-5 left-5 z-30 hidden max-w-[55%] rounded-2xl border-[3px] border-black bg-foreground px-4 py-3 text-background shadow-[5px_5px_0_rgba(0,0,0,0.75)] sm:block">
                <p className="font-display text-2xl uppercase leading-none text-comic-red [-webkit-text-stroke:1px_rgba(0,0,0,0.8)]">
                  {labels.previewLabel}
                </p>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div
            className={[
              "relative overflow-hidden",
              isMobile ? "p-5 sm:p-6" : "p-5 sm:p-7 lg:p-10",
            ].join(" ")}
          >
            {!isMobile && (
              <div className="pointer-events-none absolute right-5 top-5 hidden sm:block">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MiniPlanet accent={project.accent} />
                </motion.div>
              </div>
            )}

            <div
              className={[
                "relative z-10 flex flex-col",
                isMobile ? "justify-start" : "h-full justify-center",
              ].join(" ")}
            >
              <div className="mb-4 inline-flex w-fit rotate-[-2deg] rounded-full border-[3px] border-black bg-foreground px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.22em] text-background shadow-[5px_5px_0_rgba(0,0,0,0.75)] sm:text-xs">
                {labels.projectPlanet}
              </div>

              <h3
                className={[
                  "break-words font-display uppercase leading-[0.78] text-foreground drop-shadow-[6px_6px_0_rgba(0,0,0,0.88)] [-webkit-text-stroke:2px_rgba(0,0,0,0.92)]",
                  isMobile
                    ? "text-[clamp(3rem,17vw,5.5rem)]"
                    : "text-[clamp(3rem,6.5vw,6.4rem)]",
                ].join(" ")}
              >
                {project.title}
              </h3>

              <div className="relative mt-6 rounded-[1.45rem] border-[4px] border-black bg-foreground p-4 text-background shadow-[8px_8px_0_rgba(0,0,0,0.8)] sm:p-5">
                <p
                  className={[
                    "text-sm font-semibold leading-relaxed sm:text-base lg:text-lg",
                    isMobile ? "line-clamp-5" : "line-clamp-4 sm:line-clamp-none",
                  ].join(" ")}
                >
                  {card.description}
                </p>

                <div
                  className="absolute -bottom-7 left-10 h-8 w-8 bg-foreground"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 18% 100%)",
                  }}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
                {tags.map((tag, tagIndex) => {
                  const tagColors = [
                    "bg-comic-yellow text-background",
                    "bg-comic-green text-background",
                    "bg-comic-blue text-foreground",
                    "bg-comic-red text-foreground",
                  ];

                  return (
                    <motion.span
                      key={tag}
                      whileHover={{
                        y: -4,
                        rotate: tagIndex % 2 === 0 ? -2 : 2,
                      }}
                      className={[
                        "rounded-full border-[3px] border-black px-3 py-1.5 text-[0.7rem] font-black uppercase shadow-[4px_4px_0_rgba(0,0,0,0.75)] sm:px-4 sm:py-2 sm:text-sm",
                        tagColors[tagIndex % tagColors.length],
                      ].join(" ")}
                    >
                      {tag}
                    </motion.span>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                {project.page && (
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      to={project.page}
                      className="group inline-flex items-center justify-center gap-3 rounded-full border-[4px] border-black bg-comic-yellow px-5 py-3 text-xs font-black text-background shadow-[8px_8px_0_rgba(0,0,0,0.85)] transition-all duration-200 hover:bg-transparent hover:text-foreground hover:shadow-[11px_11px_0_rgba(0,0,0,0.85)] sm:px-6 sm:text-base"
                    >
                      {labels.detailButton}
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                )}

                {project.links?.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    whileHover={{ y: -5, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="group inline-flex items-center justify-center gap-3 rounded-full border-[4px] border-black px-5 py-3 text-xs font-black text-background shadow-[8px_8px_0_rgba(0,0,0,0.85)] transition-all duration-200 hover:shadow-[11px_11px_0_rgba(0,0,0,0.85)] sm:px-6 sm:text-base"
                    style={{
                      backgroundColor: project.accent,
                    }}
                  >
                    {getLinkLabel(link, language)}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      ↗
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div
            className="relative hidden overflow-hidden border-t-[5px] border-black py-3 lg:block"
            style={{ backgroundColor: project.accent }}
          >
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: [0, -900] }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <span
                  key={item}
                  className="mx-6 font-display text-2xl uppercase text-background"
                >
                  {project.title} · {card.type} · {labels.projectPlanet} ·
                </span>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </article>
  );
}

function MobileProjectCard({ project, index, labels, language }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex justify-center px-5 py-8 sm:px-8"
    >
      <ProjectCardContent
        project={project}
        index={index}
        labels={labels}
        language={language}
        variant="mobile"
      />
    </motion.div>
  );
}

function StackCard({ index, total, project, progress, labels, language }) {
  const targetScale = 1 - (total - index) * 0.045;
  const rangeStart = index * (1 / total);

  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-4vh + ${index * 24}px)`,
        }}
        className="relative h-[76vh] w-[92vw] max-w-7xl origin-top"
      >
        <ProjectCardContent
          project={project}
          index={index}
          labels={labels}
          language={language}
          variant="desktop"
        />
      </motion.div>
    </div>
  );
}

function ProjectsSection() {
  const { language } = useLanguage();
  const t = content[language]?.projects || content.fr.projects;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const labels = {
    projectPlanet: language === "fr" ? "Planète projet" : "Project planet",
    previewLabel: language === "fr" ? "Aperçu" : "Preview",
    detailButton:
      t.detailButton ||
      (language === "fr" ? "Voir la page projet" : "View project page"),
    emptyLinkLabel:
      t.emptyLinkLabel ||
      (language === "fr"
        ? "Étude de cas bientôt disponible"
        : "Case study coming soon"),
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative overflow-visible pb-24 pt-28 text-foreground"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <span className="mb-5 inline-flex rounded-full border border-foreground/20 bg-background/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-comic-red backdrop-blur-md">
            {t.eyebrow}
          </span>

          <h2 className="font-display text-[clamp(8rem,14vw,9.5rem)] uppercase leading-[0.76] text-comic-red drop-shadow-[8px_8px_0_rgba(0,0,0,0.88)] [-webkit-text-stroke:2px_rgba(0,0,0,0.92)]">
            {t.titleLine1}
            <br />
            <span className="text-comic-yellow">{t.titleLine2}</span>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            {t.intro}
          </p>

          <div className="mt-7 rotate-[-2deg] rounded-full border-[4px] border-black bg-comic-green px-6 py-3 font-display text-2xl uppercase text-background shadow-[7px_7px_0_rgba(0,0,0,0.85)]">
            {t.scrollHint} ↓
          </div>
        </motion.div>
      </div>

      {/* Mobile / tablet: normal readable cards */}
      <div className="lg:hidden">
        {projects.map((project, index) => (
          <MobileProjectCard
            key={project.slug}
            project={project}
            index={index}
            labels={labels}
            language={language}
          />
        ))}
      </div>

      {/* Desktop: sticky stack cards */}
      <div className="hidden w-full lg:block">
        {projects.map((project, index) => (
          <StackCard
            key={project.slug}
            index={index}
            total={projects.length}
            project={project}
            progress={scrollYProgress}
            labels={labels}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;