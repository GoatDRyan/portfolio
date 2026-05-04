import React from "react";

function SectionTitle({ eyebrow, title, className = "" }) {
  return (
    <div className={["mb-8", className].join(" ")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-comic-green">
          {eyebrow}
        </p>
      )}

      <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] uppercase leading-[0.78] text-comic-yellow drop-shadow-[6px_6px_0_rgba(0,0,0,0.85)] [-webkit-text-stroke:2px_rgba(0,0,0,0.9)]">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;