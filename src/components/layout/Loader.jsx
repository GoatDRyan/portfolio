import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo/logo.svg";

function Loader() {
  const stars = [
    { left: "8%", top: "16%", color: "#fff8e7", size: 10, delay: 0 },
    { left: "18%", top: "72%", color: "#f6c945", size: 14, delay: 0.25 },
    { left: "35%", top: "24%", color: "#7fb069", size: 11, delay: 0.45 },
    { left: "64%", top: "18%", color: "#fff8e7", size: 10, delay: 0.15 },
    { left: "84%", top: "30%", color: "#2454d6", size: 15, delay: 0.35 },
    { left: "78%", top: "78%", color: "#c1121f", size: 13, delay: 0.55 },
    { left: "48%", top: "86%", color: "#fff8e7", size: 10, delay: 0.75 },
    { left: "92%", top: "62%", color: "#f6c945", size: 11, delay: 0.65 },
    { left: "12%", top: "42%", color: "#2454d6", size: 12, delay: 0.5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: {
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-background text-foreground"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 16% 18%, rgba(36,84,214,0.35), transparent 26%),
            radial-gradient(circle at 84% 18%, rgba(246,201,69,0.28), transparent 24%),
            radial-gradient(circle at 78% 78%, rgba(193,18,31,0.24), transparent 28%),
            radial-gradient(circle at 20% 82%, rgba(127,176,105,0.22), transparent 28%),
            linear-gradient(180deg, #020307 0%, #050912 50%, #020307 100%)
          `,
        }}
      />

      {/* Color blobs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-comic-blue/20 blur-3xl"
      />

      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-comic-red/20 blur-3xl"
      />

      {/* Soft orbit lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M-120 500 C 240 240, 570 220, 880 420 C 1110 570, 1250 540, 1560 300"
          stroke="#f6c945"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          strokeDasharray="7 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.path
          d="M-80 250 C 260 110, 620 160, 900 320 C 1120 450, 1290 430, 1520 210"
          stroke="#7fb069"
          strokeWidth="1.4"
          strokeOpacity="0.32"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.path
          d="M140 780 C 420 620, 760 650, 1120 780 C 1260 830, 1390 800, 1520 700"
          stroke="#2454d6"
          strokeWidth="1.3"
          strokeOpacity="0.28"
          strokeDasharray="4 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Stars */}
      {stars.map((star, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.25, 1, 0.35],
            scale: [0.8, 1.35, 0.9],
          }}
          transition={{
            duration: 2.2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute leading-none"
          style={{
            left: star.left,
            top: star.top,
            color: star.color,
            fontSize: star.size,
            textShadow: `0 0 16px ${star.color}`,
          }}
        >
          ✦
        </motion.span>
      ))}

      {/* Main book / cover */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 42, rotate: -5, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            rotate: [-2, 1, -2],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="relative w-[min(84vw,380px)]"
          style={{ perspective: "1000px" }}
        >
          {/* Blue back cover */}
          <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2rem] border-[5px] border-black bg-comic-blue shadow-[0_0_40px_rgba(36,84,214,0.25)]" />

          {/* Green back layer */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-[5px] border-black bg-comic-green" />

          {/* Cover */}
          <motion.div
            animate={{
              rotateY: [0, -6, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden rounded-[2rem] border-[5px] border-black bg-comic-yellow p-5 shadow-[14px_14px_0_rgba(0,0,0,0.85)]"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
            }}
          >
            {/* Red sticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{
                delay: 0.35,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute -right-4 -top-5 z-20 hidden sm:block"
            >
              <div
                className="flex h-24 w-24 items-center justify-center p-3 text-center font-display text-xl uppercase leading-none text-foreground shadow-[7px_7px_0_rgba(0,0,0,0.8)]"
                style={{
                  backgroundColor: "#c1121f",
                  clipPath:
                    "polygon(50% 0%, 61% 18%, 82% 8%, 76% 30%, 100% 34%, 82% 50%, 100% 66%, 76% 70%, 82% 92%, 61% 82%, 50% 100%, 39% 82%, 18% 92%, 24% 70%, 0% 66%, 18% 50%, 0% 34%, 24% 30%, 18% 8%, 39% 18%)",
                }}
              >
                Start
              </div>
            </motion.div>

            {/* Halftone */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.85) 2px, transparent 2.2px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 76%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 76%)",
              }}
            />

            <div className="relative z-10 rounded-[1.5rem] border-[4px] border-black bg-background/90 p-5 backdrop-blur-md">
              {/* Logo planet */}
              <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-12 w-40 -rotate-[22deg] rounded-[50%] border border-comic-yellow/60"
                />

                <motion.div
                  animate={{ rotate: [0, 4, 0], y: [0, -4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-black bg-foreground p-3 shadow-[8px_8px_0_rgba(0,0,0,0.8)]"
                >
                  <img
                    src={logo}
                    alt="Ryan logo"
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <span className="absolute -right-2 top-2 text-xs text-comic-yellow">
                  ✦
                </span>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.28em] text-comic-green">
                Opening chapter
              </p>

              <h1 className="mt-4 font-display text-[clamp(3.8rem,13vw,6.5rem)] uppercase leading-[0.78] text-comic-yellow drop-shadow-[6px_6px_0_rgba(0,0,0,0.9)] [-webkit-text-stroke:2px_rgba(0,0,0,0.95)]">
                Ryan’s
                <br />
                Comic
              </h1>

              <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-comic-blue">
                Web · Design · Story
              </p>

              {/* Minimal loading dots */}
              <div className="mt-7 flex items-center justify-center gap-2">
                {[0, 1, 2].map((dot) => {
                  const dotColors = [
                    "bg-comic-yellow",
                    "bg-comic-green",
                    "bg-comic-red",
                  ];

                  return (
                    <motion.span
                      key={dot}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.35, 1, 0.35],
                      }}
                      transition={{
                        duration: 0.9,
                        delay: dot * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={[
                        "h-3 w-3 rounded-full border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,0.75)]",
                        dotColors[dot],
                      ].join(" ")}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0.45, 1, 0.45], y: 0 }}
          transition={{
            opacity: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 0.5, delay: 0.45 },
          }}
          className="mt-10 text-xs font-black uppercase tracking-[0.26em] text-foreground/55"
        >
          Loading portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Loader;