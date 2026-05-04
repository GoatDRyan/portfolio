import React from "react";
import SectionTitle from "../ui/SectionTitle";
import ComicCard from "../ui/ComicCard";

function ProjectResults({ results, lessons }) {
  return (
    <>
      {results && (
        <section>
          <SectionTitle title={results.title} eyebrow={results.eyebrow} />

          <div className="grid gap-4 md:grid-cols-2">
            {results.items.map((result) => (
              <div
                key={result}
                className="rounded-[1.5rem] border-[4px] border-black bg-comic-green p-5 text-background shadow-[7px_7px_0_rgba(0,0,0,0.8)]"
              >
                <p className="font-black leading-relaxed">✓ {result}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {lessons && (
        <section>
          <SectionTitle title={lessons.title} eyebrow={lessons.eyebrow} />

          <ComicCard className="bg-foreground text-background">
            <p className="text-base font-semibold leading-relaxed sm:text-lg">
              {lessons.text}
            </p>
          </ComicCard>
        </section>
      )}
    </>
  );
}

export default ProjectResults;