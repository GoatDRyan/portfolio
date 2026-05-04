import React from "react";
import { motion } from "framer-motion";

function ProjectInfoSidebar({ detail }) {
  const info = detail?.info;

  if (!info) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -34 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="lg:sticky lg:top-32 lg:self-start"
    >
      <motion.div
        whileHover={{ y: -6, rotate: -0.8 }}
        className="relative overflow-hidden rounded-[2rem] border-[5px] border-black bg-background/85 p-6 shadow-[12px_12px_0_rgba(0,0,0,0.85)] backdrop-blur-md"
      >
        <motion.div
          aria-hidden="true"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-comic-yellow/25"
        />

        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-6 top-6 h-10 w-10 rounded-full border-[3px] border-black bg-comic-yellow shadow-[5px_5px_0_rgba(0,0,0,0.75)]"
        />

        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-comic-green">
            {info.title}
          </p>

          <div className="mt-6 grid gap-4">
            {info.items?.map(([label, value], index) => (
              <motion.div
                key={`${label}-${value}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1.2rem] border-[3px] border-black bg-foreground p-4 text-background shadow-[5px_5px_0_rgba(0,0,0,0.7)]"
              >
                <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-background/45">
                  {label}
                </p>
                <p className="mt-1 font-bold leading-snug">{value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-comic-yellow">
              {info.stackTitle}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {info.stack?.map((tech, index) => {
                const colors = [
                  "bg-comic-yellow text-background",
                  "bg-comic-green text-background",
                  "bg-comic-blue text-foreground",
                  "bg-comic-red text-foreground",
                ];

                return (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -4, rotate: index % 2 === 0 ? -2 : 2 }}
                    className={[
                      "rounded-full border-[3px] border-black px-3 py-1.5 text-xs font-black shadow-[4px_4px_0_rgba(0,0,0,0.75)]",
                      colors[index % colors.length],
                    ].join(" ")}
                  >
                    {tech}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export default ProjectInfoSidebar;