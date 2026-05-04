import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "../../context/LanguageContext";

function PanelLabel({ index }) {
  return (
    <div className="absolute left-3 top-3 z-30 rotate-[-3deg] rounded-[1rem] border-[3px] border-black bg-comic-yellow px-3 py-2 text-background shadow-[4px_4px_0_rgba(0,0,0,0.78)] sm:left-4 sm:top-4">
      <p className="text-[0.5rem] font-black uppercase tracking-[0.2em]">
        Panel
      </p>
      <p className="font-display text-xl uppercase leading-none sm:text-2xl">
        {String(index + 1).padStart(2, "0")}
      </p>
    </div>
  );
}

function GalleryModal({ item, onClose, language }) {
  const closeLabel = language === "fr" ? "Fermer" : "Close";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-6 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-black/80 backdrop-blur-md"
      />

      {/* Decorative halftone */}
      <div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(246,201,69,0.95) 2px, transparent 2.2px)",
          backgroundSize: "17px 17px",
          maskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 48%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 48%, transparent 78%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92, rotate: -2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 30, scale: 0.94, rotate: 2 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border-[5px] border-black bg-background p-2 shadow-[18px_18px_0_rgba(0,0,0,0.9)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-[4px] border-black bg-foreground px-4 py-3 text-background sm:px-6">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-background/55">
              Full capture
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase leading-none text-comic-yellow sm:text-4xl">
              {item.label}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] border-black bg-comic-red text-xl font-black text-foreground shadow-[5px_5px_0_rgba(0,0,0,0.75)] transition-transform duration-200 hover:-translate-y-1"
            aria-label={closeLabel}
          >
            ×
          </button>
        </div>

        {/* Image */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#050505]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.85) 1.2px, transparent 1.3px)",
              backgroundSize: "10px 10px",
            }}
          />

          <img
            src={item.image}
            alt={item.label}
            className="relative z-10 max-h-[72vh] w-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function GalleryPanel({ item, index, isMain, language, onOpen }) {
  const openLabel = language === "fr" ? "Voir en grand" : "Open full image";

  return (
    <motion.article
      initial={{ opacity: 0, y: 34, rotate: isMain ? -0.5 : 0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, rotate: isMain ? -0.3 : 0.3 }}
      className={[
        "group relative overflow-hidden rounded-[1.8rem] border-[5px] border-black bg-foreground p-2 shadow-[10px_10px_0_rgba(0,0,0,0.86)]",
        isMain ? "md:col-span-12" : "md:col-span-6",
      ].join(" ")}
    >
      <div className="relative overflow-hidden rounded-[1.25rem] border-[4px] border-black bg-background">
        <PanelLabel index={index} />

        {isMain && (
          <div className="absolute right-3 top-3 z-30 hidden rotate-[2deg] rounded-full border-[3px] border-black bg-comic-red px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.78)] sm:block">
            Splash scene
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-label={openLabel}
          className="block w-full cursor-zoom-in text-left"
        >
          <div
            className={[
              "relative flex w-full items-center justify-center overflow-hidden bg-[#050505]",
              isMain
                ? "h-[150px] md:h-[220px] lg:h-[260px]"
                : "h-[130px] md:h-[190px]",
            ].join(" ")}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.8) 1.2px, transparent 1.3px)",
                backgroundSize: "10px 10px",
              }}
            />

            <img
              src={item.image}
              alt={item.label}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="relative z-10 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
            />

            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full border-[3px] border-black bg-comic-yellow px-5 py-2 text-xs font-black uppercase text-background shadow-[5px_5px_0_rgba(0,0,0,0.75)]">
                {openLabel} ↗
              </span>
            </div>
          </div>
        </button>

        <div className="border-t-[4px] border-black bg-background px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-comic-green">
                {isMain ? "Main capture" : "Capture"}
              </p>

              <h3
                className={[
                  "mt-1.5 font-display uppercase leading-none text-foreground",
                  isMain ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                ].join(" ")}
              >
                {item.label}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onOpen(item)}
              className="inline-flex w-fit items-center justify-center rounded-full border-[3px] border-black bg-comic-yellow px-3 py-2 text-[0.65rem] font-black uppercase text-background shadow-[4px_4px_0_rgba(0,0,0,0.75)] transition-transform duration-200 hover:-translate-y-1"
            >
              {openLabel} ↗
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectGallery({ gallery }) {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery || !gallery.items?.length) return null;

  return (
    <section className="relative">
      <SectionTitle title={gallery.title} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 max-w-3xl"
      >
        <div className="relative rounded-[1.6rem] border-[4px] border-black bg-background px-5 py-4 shadow-[7px_7px_0_rgba(0,0,0,0.82)]">
          <p className="text-sm font-semibold leading-relaxed text-foreground/75">
            {gallery.text}
          </p>

          <div
            className="absolute -bottom-5 left-10 h-6 w-6 bg-background"
            style={{
              clipPath: "polygon(0 0, 100% 0, 18% 100%)",
              filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.75))",
            }}
          />
        </div>
      </motion.div>

      <div className="relative rounded-[2.2rem] border-[5px] border-black bg-background/70 p-4 shadow-[12px_12px_0_rgba(0,0,0,0.86)] backdrop-blur-md sm:p-5">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(246,201,69,0.95) 2px, transparent 2.2px)",
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(circle at center, black 20%, rgba(0,0,0,0.72) 48%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 20%, rgba(0,0,0,0.72) 48%, transparent 78%)",
          }}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {gallery.items.map((item, index) => (
            <GalleryPanel
              key={`${item.label}-${index}`}
              item={item}
              index={index}
              isMain={index === 0}
              language={language}
              onOpen={setSelectedImage}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <GalleryModal
            item={selectedImage}
            language={language}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectGallery;