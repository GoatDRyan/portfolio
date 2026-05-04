import React from "react";

function ProjectPageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, rgba(36,84,214,0.20), transparent 26%),
            radial-gradient(circle at 88% 22%, rgba(246,201,69,0.16), transparent 24%),
            radial-gradient(circle at 80% 70%, rgba(193,18,31,0.16), transparent 28%),
            radial-gradient(circle at 18% 78%, rgba(127,176,105,0.14), transparent 25%),
            linear-gradient(180deg, #020307 0%, #050912 44%, #020307 100%)
          `,
        }}
      />

      {/* Halftone left */}
      <div
        className="absolute -left-28 top-20 h-[420px] w-[420px] opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(36,84,214,0.9) 2px, transparent 2.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 76%)",
        }}
      />

      {/* Halftone right */}
      <div
        className="absolute -right-20 top-[38%] h-[380px] w-[380px] opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(246,201,69,0.95) 2px, transparent 2.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.72) 45%, transparent 76%)",
        }}
      />

      {/* Orbits */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1440 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 260 C 220 80, 570 110, 870 290 C 1080 420, 1260 420, 1510 250"
          stroke="#fff8e7"
          strokeWidth="1.2"
          strokeOpacity="0.16"
        />
        <path
          d="M-100 860 C 240 680, 570 740, 820 900 C 1050 1040, 1240 1010, 1540 800"
          stroke="#7fb069"
          strokeWidth="1.4"
          strokeOpacity="0.30"
        />
        <path
          d="M920 70 C 1120 180, 1260 360, 1450 620"
          stroke="#f6c945"
          strokeWidth="1.2"
          strokeOpacity="0.25"
          strokeDasharray="6 10"
        />
      </svg>

      {/* Small planets */}
      <div className="absolute right-[12%] top-[18%] hidden h-16 w-16 rounded-full border-[4px] border-black bg-comic-yellow shadow-[8px_8px_0_rgba(0,0,0,0.75)] md:block">
        <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-background/25" />
        <div className="absolute -left-7 top-6 h-5 w-28 -rotate-[22deg] rounded-[50%] border border-comic-yellow/45" />
      </div>

      <div className="absolute left-[8%] bottom-[18%] hidden h-12 w-12 rounded-full border-[4px] border-black bg-comic-green shadow-[7px_7px_0_rgba(0,0,0,0.75)] md:block">
        <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-background/25" />
        <div className="absolute -left-6 top-4 h-4 w-24 rotate-[18deg] rounded-[50%] border border-comic-green/45" />
      </div>

      {/* Stars */}
      {[
        ["8%", "14%", "#fff8e7", 0.65],
        ["18%", "36%", "#f6c945", 0.8],
        ["42%", "16%", "#fff8e7", 0.45],
        ["62%", "24%", "#2454d6", 0.8],
        ["82%", "12%", "#fff8e7", 0.55],
        ["90%", "50%", "#c1121f", 0.65],
        ["72%", "84%", "#fff8e7", 0.5],
        ["28%", "88%", "#7fb069", 0.7],
      ].map(([left, top, color, opacity], index) => (
        <span
          key={index}
          className="absolute leading-none"
          style={{
            left,
            top,
            color,
            opacity,
            fontSize: index % 2 === 0 ? "10px" : "14px",
            textShadow: `0 0 14px ${color}`,
          }}
        >
          ✦
        </span>
      ))}

      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 4px 4px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 52%, rgba(0,0,0,0.68) 100%)",
        }}
      />
    </div>
  );
}

export default ProjectPageBackground;