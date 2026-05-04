import React from "react";

const majorStars = [
  { left: "5%", top: "12%", size: 7, color: "#fff8e7", opacity: 0.75 },
  { left: "11%", top: "30%", size: 12, color: "#2454d6", opacity: 0.95 },
  { left: "16%", top: "22%", size: 7, color: "#f6c945", opacity: 0.9 },
  { left: "22%", top: "10%", size: 6, color: "#fff8e7", opacity: 0.7 },
  { left: "33%", top: "15%", size: 5, color: "#fff8e7", opacity: 0.6 },
  { left: "46%", top: "30%", size: 16, color: "#f6c945", opacity: 1 },
  { left: "53%", top: "9%", size: 6, color: "#fff8e7", opacity: 0.75 },
  { left: "59%", top: "20%", size: 8, color: "#fff8e7", opacity: 0.8 },
  { left: "68%", top: "13%", size: 6, color: "#fff8e7", opacity: 0.65 },
  { left: "77%", top: "18%", size: 9, color: "#f6c945", opacity: 0.9 },
  { left: "84%", top: "11%", size: 6, color: "#fff8e7", opacity: 0.7 },
  { left: "92%", top: "45%", size: 8, color: "#7fb069", opacity: 0.85 },
  { left: "83%", top: "70%", size: 7, color: "#fff8e7", opacity: 0.7 },
  { left: "66%", top: "84%", size: 6, color: "#2454d6", opacity: 0.85 },
  { left: "49%", top: "78%", size: 5, color: "#fff8e7", opacity: 0.6 },
  { left: "24%", top: "83%", size: 12, color: "#c1121f", opacity: 0.9 },
  { left: "9%", top: "68%", size: 6, color: "#fff8e7", opacity: 0.65 },
  { left: "71%", top: "78%", size: 5, color: "#fff8e7", opacity: 0.6 },
  { left: "88%", top: "20%", size: 6, color: "#fff8e7", opacity: 0.55 },
  { left: "63%", top: "33%", size: 7, color: "#fff8e7", opacity: 0.7 },
];

const tinyStars = [
  { left: "8%", top: "19%" },
  { left: "19%", top: "41%" },
  { left: "29%", top: "8%" },
  { left: "38%", top: "26%" },
  { left: "43%", top: "12%" },
  { left: "56%", top: "17%" },
  { left: "61%", top: "26%" },
  { left: "72%", top: "29%" },
  { left: "79%", top: "8%" },
  { left: "87%", top: "59%" },
  { left: "91%", top: "74%" },
  { left: "57%", top: "71%" },
  { left: "15%", top: "52%" },
  { left: "31%", top: "63%" },
  { left: "74%", top: "58%" },
  { left: "94%", top: "14%" },
  { left: "12%", top: "84%" },
  { left: "44%", top: "67%" },
];

function ComicSpeedLine({
  className = "",
  width = 360,
  height = 28,
  color = "#c1121f",
  accent = "#fff8e7",
  glow = "rgba(255,255,255,0.18)",
  rotate = -24,
  opacity = 1,
  clipPath = "polygon(0 50%, 9% 0, 100% 0, 92% 100%, 0 100%)",
  dreamy = false,
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "#050505",
          clipPath,
          filter: `drop-shadow(0 0 16px ${glow})`,
        }}
      />

      <div
        className="absolute"
        style={{
          inset: "4px 8px",
          background: `linear-gradient(90deg, ${accent} 0%, ${color} 22%, ${color} 72%, ${accent} 100%)`,
          clipPath,
        }}
      />

      <div
        className="absolute"
        style={{
          left: "8%",
          top: "18%",
          width: "42%",
          height: "16%",
          background: "rgba(255,248,231,0.28)",
          clipPath,
        }}
      />

      <div
        className="absolute"
        style={{
          left: "18%",
          top: "56%",
          width: "34%",
          height: "10%",
          background: "rgba(255,255,255,0.18)",
          clipPath: "polygon(0 50%, 12% 0, 100% 0, 88% 100%, 0 100%)",
        }}
      />

      {dreamy && (
        <>
          <span
            className="absolute leading-none animate-comic-twinkle"
            style={{
              left: "4%",
              top: "-10px",
              color: "#fff8e7",
              fontSize: "10px",
              animationDelay: "0.2s",
              textShadow: "0 0 10px rgba(255,248,231,0.8)",
            }}
          >
            ✦
          </span>

          <span
            className="absolute leading-none animate-comic-twinkle"
            style={{
              left: "16%",
              bottom: "-8px",
              color: accent,
              fontSize: "8px",
              animationDelay: "1.1s",
              textShadow: `0 0 8px ${accent}`,
            }}
          >
            ✦
          </span>

          <span
            className="absolute leading-none animate-comic-twinkle"
            style={{
              right: "12%",
              top: "-6px",
              color: "#fff8e7",
              fontSize: "7px",
              animationDelay: "1.8s",
              textShadow: "0 0 8px rgba(255,248,231,0.7)",
            }}
          >
            ✦
          </span>
        </>
      )}
    </div>
  );
}

function ComicSpeedGroup({
  className = "",
  rotate = -24,
  opacity = 1,
  lines = [],
  dreamy = false,
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        "--comic-rotate": `${rotate}deg`,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: line.x || 0,
            top: line.y || 0,
          }}
        >
          <ComicSpeedLine
            width={line.width}
            height={line.height}
            color={line.color}
            accent={line.accent || "#fff8e7"}
            glow={line.glow || "rgba(255,255,255,0.18)"}
            rotate={0}
            opacity={line.opacity ?? 1}
            dreamy={line.dreamy ?? dreamy}
          />
        </div>
      ))}

      {dreamy && (
        <>
          <span
            className="absolute leading-none animate-comic-twinkle"
            style={{
              left: "8%",
              top: "6%",
              color: "#fff8e7",
              fontSize: "8px",
              animationDelay: "0.4s",
              textShadow: "0 0 8px rgba(255,248,231,0.65)",
            }}
          >
            ✦
          </span>

          <span
            className="absolute leading-none animate-comic-twinkle"
            style={{
              right: "18%",
              top: "52%",
              color: "#f6c945",
              fontSize: "10px",
              animationDelay: "1.6s",
              textShadow: "0 0 8px rgba(246,201,69,0.7)",
            }}
          >
            ✦
          </span>

          <span
            className="absolute leading-none animate-comic-twinkle"
            style={{
              left: "42%",
              bottom: "4%",
              color: "#7fb069",
              fontSize: "8px",
              animationDelay: "2.2s",
              textShadow: "0 0 8px rgba(127,176,105,0.65)",
            }}
          >
            ✦
          </span>
        </>
      )}
    </div>
  );
}

function StarBurst({
  className = "",
  size = 80,
  color = "#f6c945",
  opacity = 1,
  outline = true,
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
      }}
    >
      {outline && (
        <div
          className="absolute inset-0"
          style={{
            background: "#020202",
            clipPath:
              "polygon(50% 0%, 59% 32%, 100% 12%, 72% 50%, 100% 88%, 59% 68%, 50% 100%, 41% 68%, 0% 88%, 28% 50%, 0% 12%, 41% 32%)",
          }}
        />
      )}

      <div
        className="absolute animate-comic-pulse"
        style={{
          inset: outline ? 5 : 0,
          background: color,
          clipPath:
            "polygon(50% 0%, 59% 32%, 100% 12%, 72% 50%, 100% 88%, 59% 68%, 50% 100%, 41% 68%, 0% 88%, 28% 50%, 0% 12%, 41% 32%)",
        }}
      />
    </div>
  );
}

function Planet({
  className = "",
  size = 120,
  gradient = "radial-gradient(circle at 35% 35%, #ffe27d 0%, #f6c945 45%, #c59616 76%, #7d5b0b 100%)",
  glow = "rgba(246,201,69,0.20)",
  withRing = false,
  ringColor = "rgba(255,248,231,0.65)",
  ringWidth = 180,
  ringHeight = 60,
  ringRotate = "-18deg",
}) {
  return (
    <div className={`absolute ${className}`}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "999px",
          background: gradient,
          boxShadow: `0 0 40px ${glow}, inset -14px -14px 28px rgba(0,0,0,0.24)`,
        }}
      />

      {withRing && (
        <div
          className="absolute left-1/2 top-1/2 rounded-[50%] border"
          style={{
            width: ringWidth,
            height: ringHeight,
            borderColor: ringColor,
            transform: `translate(-50%, -50%) rotate(${ringRotate})`,
            boxShadow: `0 0 12px ${ringColor}`,
          }}
        />
      )}
    </div>
  );
}

function ComicExplosion({
  className = "",
  size = 180,
  color = "#c1121f",
  opacity = 0.9,
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "#020202",
          clipPath:
            "polygon(50% 0%, 57% 24%, 78% 8%, 70% 33%, 100% 28%, 76% 48%, 96% 64%, 68% 64%, 76% 100%, 50% 76%, 24% 100%, 32% 64%, 4% 64%, 24% 48%, 0% 28%, 30% 33%, 22% 8%, 43% 24%)",
        }}
      />

      <div
        className="absolute inset-[6px] animate-comic-pulse"
        style={{
          background: color,
          clipPath:
            "polygon(50% 0%, 57% 24%, 78% 8%, 70% 33%, 100% 28%, 76% 48%, 96% 64%, 68% 64%, 76% 100%, 50% 76%, 24% 100%, 32% 64%, 4% 64%, 24% 48%, 0% 28%, 30% 33%, 22% 8%, 43% 24%)",
        }}
      />
    </div>
  );
}

function Lightning({
  className = "",
  color = "#f6c945",
  width = 90,
  height = 140,
  opacity = 0.9,
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width,
        height,
        opacity,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "#020202",
          clipPath:
            "polygon(50% 0%, 72% 0%, 50% 36%, 76% 36%, 24% 100%, 38% 58%, 14% 58%)",
        }}
      />

      <div
        className="absolute inset-[4px] animate-comic-pulse"
        style={{
          background: color,
          clipPath:
            "polygon(50% 0%, 72% 0%, 50% 36%, 76% 36%, 24% 100%, 38% 58%, 14% 58%)",
        }}
      />
    </div>
  );
}

function ComicWord({
  className = "",
  text = "ZAP!",
  color = "#f6c945",
  rotate = -8,
  opacity = 0.65,
}) {
  return (
    <div
      className={`absolute hidden md:block animate-comic-pop ${className}`}
      style={{
        "--comic-word-rotate": `${rotate}deg`,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
    >
      <span
        className="font-display text-5xl font-black uppercase tracking-wide"
        style={{
          color,
          WebkitTextStroke: "3px #020202",
          textShadow: "6px 6px 0 rgba(0,0,0,0.55)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function ComicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 18%, rgba(36, 84, 214, 0.22), transparent 25%),
            radial-gradient(circle at 88% 36%, rgba(193, 18, 31, 0.25), transparent 28%),
            radial-gradient(circle at 58% 76%, rgba(246, 201, 69, 0.14), transparent 28%),
            radial-gradient(circle at 70% 18%, rgba(127, 176, 105, 0.18), transparent 22%),
            linear-gradient(180deg, #020307 0%, #050912 42%, #020307 100%)
          `,
        }}
      />

      {/* Halftone desktop */}
      <div
        className="absolute -top-24 -left-24 hidden h-[620px] w-[620px] opacity-55 md:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(36,84,214,0.95) 2.4px, transparent 2.6px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at center, black 20%, rgba(0,0,0,0.78) 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, rgba(0,0,0,0.78) 42%, transparent 78%)",
        }}
      />

      <div
        className="absolute -right-14 top-0 hidden h-full w-[600px] opacity-40 md:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,248,231,0.42) 2.2px, transparent 2.4px)",
          backgroundSize: "20px 20px",
          maskImage:
            "linear-gradient(to left, black 0%, rgba(0,0,0,0.78) 42%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, rgba(0,0,0,0.78) 42%, transparent 100%)",
        }}
      />

      <div
        className="absolute right-[1%] top-[37%] hidden h-[440px] w-[440px] rotate-[-12deg] opacity-75 md:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(193,18,31,1) 2.4px, transparent 2.6px)",
          backgroundSize: "17px 17px",
          maskImage:
            "radial-gradient(circle at center, black 16%, rgba(0,0,0,0.74) 48%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 16%, rgba(0,0,0,0.74) 48%, transparent 80%)",
        }}
      />

      {/* Halftone mobile */}
      <div
        className="absolute -top-20 -left-32 block h-[420px] w-[420px] opacity-42 md:hidden"
        style={{
          backgroundImage:
            "radial-gradient(rgba(36,84,214,0.9) 2px, transparent 2.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.75) 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.75) 42%, transparent 78%)",
        }}
      />

      <div
        className="absolute -right-36 top-[24%] block h-[360px] w-[360px] opacity-42 md:hidden"
        style={{
          backgroundImage:
            "radial-gradient(rgba(193,18,31,0.95) 2px, transparent 2.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at center, black 16%, rgba(0,0,0,0.72) 48%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 16%, rgba(0,0,0,0.72) 48%, transparent 78%)",
        }}
      />

      {/* Yellow / green halftone */}
      <div
        className="absolute left-[35%] top-[56%] h-[280px] w-[280px] opacity-24"
        style={{
          backgroundImage:
            "radial-gradient(rgba(246,201,69,1) 2px, transparent 2.2px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.75) 46%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 18%, rgba(0,0,0,0.75) 46%, transparent 76%)",
        }}
      />

      <div
        className="absolute left-[8%] bottom-[14%] h-[220px] w-[220px] opacity-18"
        style={{
          backgroundImage:
            "radial-gradient(rgba(127,176,105,0.95) 1.8px, transparent 2px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(circle at center, black 20%, rgba(0,0,0,0.7) 48%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, rgba(0,0,0,0.7) 48%, transparent 78%)",
        }}
      />

      {/* Aura */}
      <div
        className="absolute left-[-10%] top-[30%] h-[460px] w-[660px] opacity-22 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 34% 48%, rgba(36,84,214,0.9), transparent 54%), radial-gradient(circle at 70% 68%, rgba(8,13,24,0.96), transparent 62%)",
        }}
      />

      <div
        className="absolute right-[-8%] bottom-[4%] h-[340px] w-[620px] opacity-22 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 40% 50%, rgba(193,18,31,0.75), transparent 56%), radial-gradient(circle at 70% 45%, rgba(36,84,214,0.64), transparent 56%)",
        }}
      />

      {/* Orbits */}
      <svg
        className="absolute inset-0 h-full w-full opacity-85"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M470 35 C 650 0, 870 55, 1050 170" stroke="#fff8e7" strokeWidth="1.2" strokeOpacity="0.24" />
        <path d="M360 110 C 560 -40, 1000 20, 1310 250" stroke="#fff8e7" strokeWidth="1" strokeOpacity="0.17" />
        <path d="M705 710 C 875 560, 1120 560, 1390 755" stroke="#7fb069" strokeWidth="1.8" strokeOpacity="0.6" />
        <path d="M990 45 C 1190 105, 1320 260, 1455 445" stroke="#2454d6" strokeWidth="1.4" strokeOpacity="0.62" />
        <path d="M120 500 C 220 430, 280 440, 360 520" stroke="#fff8e7" strokeWidth="1.2" strokeOpacity="0.30" strokeDasharray="5 8" />
        <path d="M980 720 C 1100 660, 1180 650, 1300 720" stroke="#fff8e7" strokeWidth="1.2" strokeOpacity="0.26" strokeDasharray="4 9" />
        <path d="M530 190 C 600 160, 655 162, 735 205" stroke="#f6c945" strokeWidth="1.2" strokeOpacity="0.28" strokeDasharray="3 7" />
        <path d="M150 240 L 190 215 L 220 245 L 265 225" stroke="#fff8e7" strokeWidth="1" strokeOpacity="0.22" />
        <path d="M1120 170 L 1160 145 L 1200 176" stroke="#fff8e7" strokeWidth="1" strokeOpacity="0.20" />
      </svg>

      {/* Desktop speed lines */}
      <ComicSpeedGroup
        className="right-[-18%] top-[43%] hidden h-[260px] w-[780px] animate-comic-drift md:block"
        rotate={-24}
        opacity={1}
        dreamy
        lines={[
          { x: 0, y: 0, width: 690, height: 42, color: "#c1121f", accent: "#f6c945", glow: "rgba(193,18,31,0.35)", dreamy: true },
          { x: 70, y: 62, width: 610, height: 34, color: "#2454d6", accent: "#fff8e7", glow: "rgba(36,84,214,0.35)", dreamy: true },
          { x: 135, y: 112, width: 540, height: 30, color: "#7fb069", accent: "#fff8e7", glow: "rgba(127,176,105,0.35)", dreamy: true },
          { x: 190, y: 160, width: 420, height: 24, color: "#f6c945", accent: "#fff8e7", glow: "rgba(246,201,69,0.35)", dreamy: true },
          { x: 270, y: 200, width: 300, height: 18, color: "#2454d6", accent: "#fff8e7", glow: "rgba(36,84,214,0.28)", dreamy: true },
        ]}
      />

      <ComicSpeedGroup
        className="right-[-6%] top-[14%] hidden h-[150px] w-[430px] animate-comic-drift-reverse md:block"
        rotate={-27}
        opacity={0.95}
        dreamy
        lines={[
          { x: 0, y: 0, width: 380, height: 34, color: "#2454d6", accent: "#f6c945", glow: "rgba(36,84,214,0.35)", dreamy: true },
          { x: 52, y: 52, width: 280, height: 24, color: "#7fb069", accent: "#fff8e7", glow: "rgba(127,176,105,0.30)", dreamy: true },
          { x: 120, y: 92, width: 170, height: 18, color: "#f6c945", accent: "#fff8e7", glow: "rgba(246,201,69,0.28)", dreamy: true },
        ]}
      />

      <ComicSpeedGroup
        className="left-[39%] top-[20%] hidden h-[120px] w-[260px] md:block"
        rotate={-28}
        opacity={0.95}
        dreamy
        lines={[
          { x: 0, y: 0, width: 210, height: 24, color: "#2454d6", accent: "#fff8e7", glow: "rgba(36,84,214,0.30)", dreamy: true },
          { x: 42, y: 38, width: 150, height: 18, color: "#f6c945", accent: "#fff8e7", glow: "rgba(246,201,69,0.28)", dreamy: true },
          { x: 82, y: 68, width: 95, height: 13, color: "#7fb069", accent: "#fff8e7", glow: "rgba(127,176,105,0.28)", dreamy: true },
        ]}
      />

      <ComicSpeedGroup
        className="left-[-4%] top-[21%] hidden h-[110px] w-[300px] md:block"
        rotate={20}
        opacity={0.9}
        dreamy
        lines={[
          { x: 0, y: 0, width: 260, height: 24, color: "#c1121f", accent: "#f6c945", glow: "rgba(193,18,31,0.30)", dreamy: true },
          { x: 35, y: 40, width: 180, height: 18, color: "#f6c945", accent: "#fff8e7", glow: "rgba(246,201,69,0.30)", dreamy: true },
          { x: 80, y: 70, width: 120, height: 14, color: "#7fb069", accent: "#fff8e7", glow: "rgba(127,176,105,0.30)", dreamy: true },
        ]}
      />

      {/* Mobile speed lines */}
      <ComicSpeedGroup
        className="right-[-54%] top-[12%] block h-[170px] w-[520px] animate-comic-drift md:hidden"
        rotate={-26}
        opacity={0.9}
        dreamy
        lines={[
          { x: 0, y: 0, width: 420, height: 30, color: "#c1121f", accent: "#f6c945", glow: "rgba(193,18,31,0.32)", dreamy: true },
          { x: 42, y: 46, width: 360, height: 24, color: "#2454d6", accent: "#fff8e7", glow: "rgba(36,84,214,0.32)", dreamy: true },
          { x: 84, y: 84, width: 300, height: 20, color: "#7fb069", accent: "#fff8e7", glow: "rgba(127,176,105,0.28)", dreamy: true },
          { x: 126, y: 118, width: 220, height: 16, color: "#f6c945", accent: "#fff8e7", glow: "rgba(246,201,69,0.28)", dreamy: true },
        ]}
      />

      <ComicSpeedGroup
        className="left-[-42%] bottom-[18%] block h-[130px] w-[420px] animate-comic-drift-reverse md:hidden"
        rotate={22}
        opacity={0.75}
        dreamy
        lines={[
          { x: 0, y: 0, width: 310, height: 24, color: "#2454d6", accent: "#fff8e7", glow: "rgba(36,84,214,0.28)", dreamy: true },
          { x: 36, y: 40, width: 250, height: 18, color: "#f6c945", accent: "#fff8e7", glow: "rgba(246,201,69,0.26)", dreamy: true },
          { x: 84, y: 72, width: 170, height: 14, color: "#7fb069", accent: "#fff8e7", glow: "rgba(127,176,105,0.26)", dreamy: true },
        ]}
      />

      {/* Shapes */}
      <div className="absolute bottom-[62px] left-[-44px] hidden rotate-[-18deg] opacity-95 md:block">
        <div
          className="h-40 w-64 border-[6px] border-[#2454d6]"
          style={{
            clipPath: "polygon(0 100%, 0 36%, 78% 0, 100% 26%, 42% 100%)",
            filter: "drop-shadow(0 0 14px rgba(36,84,214,0.28))",
          }}
        />
      </div>

      {/* Planets desktop */}
      <Planet
        className="left-[10%] top-[58%] hidden opacity-85 animate-comic-float md:block"
        size={48}
        gradient="radial-gradient(circle at 35% 35%, #a7d98b 0%, #7fb069 55%, #4d6e41 100%)"
        glow="rgba(127,176,105,0.22)"
        withRing
        ringColor="rgba(255,248,231,0.34)"
        ringWidth={88}
        ringHeight={26}
        ringRotate="-20deg"
      />

      <Planet
        className="right-[15%] top-[22%] hidden opacity-80 animate-comic-float-soft md:block"
        size={30}
        gradient="radial-gradient(circle at 35% 35%, #ffe27d 0%, #f6c945 50%, #b68715 100%)"
        glow="rgba(246,201,69,0.18)"
        withRing
        ringColor="rgba(246,201,69,0.28)"
        ringWidth={68}
        ringHeight={20}
        ringRotate="18deg"
      />

      <Planet
        className="left-[62%] top-[8%] hidden opacity-40 animate-comic-float-soft md:block"
        size={22}
        gradient="radial-gradient(circle at 35% 35%, #fff8e7 0%, #d8d0bf 58%, #8e877a 100%)"
        glow="rgba(255,248,231,0.10)"
      />

      {/* Planets mobile */}
      <Planet
        className="left-[7%] top-[68%] block opacity-80 animate-comic-float md:hidden"
        size={38}
        gradient="radial-gradient(circle at 35% 35%, #a7d98b 0%, #7fb069 55%, #4d6e41 100%)"
        glow="rgba(127,176,105,0.22)"
        withRing
        ringColor="rgba(255,248,231,0.34)"
        ringWidth={72}
        ringHeight={22}
        ringRotate="-20deg"
      />

      <Planet
        className="right-[12%] top-[42%] block opacity-78 animate-comic-float-soft md:hidden"
        size={28}
        gradient="radial-gradient(circle at 35% 35%, #ffe27d 0%, #f6c945 50%, #b68715 100%)"
        glow="rgba(246,201,69,0.18)"
        withRing
        ringColor="rgba(246,201,69,0.28)"
        ringWidth={60}
        ringHeight={18}
        ringRotate="18deg"
      />

      {/* Comic words desktop */}
      <ComicWord className="right-[8%] top-[35%]" text="ZAP!" color="#f6c945" rotate={-14} opacity={0.55} />
      <ComicWord className="left-[8%] bottom-[26%]" text="WOW!" color="#2454d6" rotate={10} opacity={0.42} />
      <ComicWord className="right-[26%] bottom-[18%]" text="GO!" color="#c1121f" rotate={-8} opacity={0.42} />

      {/* Bursts */}
      <StarBurst className="left-[47%] top-[33%] hidden md:block" size={96} color="#f6c945" opacity={0.98} />
      <StarBurst className="left-[51%] top-[27%] hidden md:block" size={34} color="#f6c945" opacity={0.94} />
      <StarBurst className="left-[73%] top-[15%] hidden md:block" size={34} color="#fff8e7" opacity={0.45} />
      <StarBurst className="left-[28%] top-[63%] hidden md:block" size={28} color="#7fb069" opacity={0.35} />

      <ComicExplosion className="left-[20%] bottom-[-46px] hidden md:block" size={190} color="#c1121f" opacity={0.92} />
      <ComicExplosion className="right-[24%] top-[62%] hidden md:block" size={86} color="#2454d6" opacity={0.48} />

      <Lightning className="right-[28%] top-[18%] hidden rotate-[12deg] md:block" color="#f6c945" width={60} height={100} opacity={0.88} />
      <Lightning className="left-[30%] top-[18%] hidden rotate-[-18deg] md:block" color="#c1121f" width={46} height={76} opacity={0.58} />

      {/* Stars */}
      {majorStars.map((star, index) => (
        <span
          key={index}
          className="absolute leading-none animate-comic-twinkle"
          style={{
            left: star.left,
            top: star.top,
            fontSize: `${star.size}px`,
            color: star.color,
            animationDelay: `${index * 0.18}s`,
            animationDuration: `${3.4 + (index % 4) * 0.4}s`,
            textShadow: `0 0 16px ${star.color}`,
          }}
        >
          ✦
        </span>
      ))}

      {tinyStars.map((star, index) => (
        <span
          key={`tiny-${index}`}
          className="absolute h-[2px] w-[2px] rounded-full bg-white animate-comic-twinkle"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${index * 0.22}s`,
            animationDuration: `${4 + (index % 5) * 0.3}s`,
            boxShadow: "0 0 8px rgba(255,255,255,0.45)",
          }}
        />
      ))}

      {/* Print texture */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 4px 4px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 54%, rgba(0,0,0,0.60) 100%)",
        }}
      />
    </div>
  );
}

export default ComicBackground;