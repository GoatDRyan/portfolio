import React from "react";
import { Link } from "react-router-dom";

function NextProject({ project, language }) {
  if (!project) return null;

  const card = project.card?.[language] || project.card?.fr;

  return (
    <section className="pt-8 text-center">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-foreground/45">
        Next Chapter
      </p>

      <Link to={`/projects/${project.slug}`} className="group inline-block">
        <h2 className="font-display text-[clamp(4rem,12vw,8rem)] uppercase leading-[0.78] text-comic-yellow drop-shadow-[7px_7px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:-translate-y-2">
          {project.title}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-foreground/65">
          {card?.type}
        </p>
      </Link>
    </section>
  );
}

export default NextProject;