import React from "react";
import SectionTitle from "../ui/SectionTitle";

function ProjectGallery({ gallery }) {
  if (!gallery) return null;

  return (
    <section>
      <SectionTitle title={gallery.title} />

      <p className="mb-8 max-w-2xl text-foreground/65">{gallery.text}</p>

      <div className="grid gap-6 md:grid-cols-3">
        {gallery.items.map((item) => (
          <div
            key={item.label}
            className="overflow-hidden rounded-[2rem] border-[5px] border-black bg-foreground p-2 shadow-[10px_10px_0_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border-[4px] border-black bg-background">
              <img
                src={item.image}
                alt={item.label}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="px-3 py-4 font-display text-2xl uppercase text-background">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectGallery;