import React from "react";

function ComicCard({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-[2rem] border-[5px] border-black bg-background/85 p-6 shadow-[12px_12px_0_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default ComicCard;