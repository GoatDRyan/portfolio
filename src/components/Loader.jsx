import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

function CanvasStarfield() {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resizeCanvas = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });

    const numStars = 100;
    const newStars = [];

    for (let i = 0; i < numStars; i++) {
      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.001 + Math.random() * 0.08,
        size: 1 + Math.random() * 2,
      });
    }

    setStars(newStars);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resizeCanvas, handleMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let currentStars = [...stars];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentStars = currentStars.map((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.fill();

        s.y += s.speed;

        if (s.y > canvas.height) {
          s.y = -s.size;
          s.x = Math.random() * canvas.width;
        }
        return s;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (stars.length > 0) animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [stars, dimensions]);

  return (
    <>
      <style jsx="true">{`
        .starfield-container {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: -10;
          background: radial-gradient(ellipse at center, #6366f1, #000000);
          overflow: hidden;
        }

        #bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <div className="starfield-container">
        <canvas ref={canvasRef} id="bg-canvas" />
      </div>
    </>
  );
}

export default function Loader({
  size = 96,
  message = "Chargement",
  logoSrc = "./logo.svg",
}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Prevent wheel and touchmove to stop scrolling on all devices
    const prevent = (e) => {
      e.preventDefault();
    };
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });

    return () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <CanvasStarfield />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.42 }}
        className="border-white border-2 relative z-20 flex flex-col items-center gap-5 p-5 rounded-2xl bg-gradient-to-b from-white/4 to-transparent shadow-xl ring-1 ring-white/6"
        style={{ minWidth: 300, backdropFilter: "blur(6px)" }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full p-2"
          animate={prefersReducedMotion ? {} : { rotate: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="relative rounded-full overflow-hidden flex items-center justify-center"
            style={{ width: size, height: size, padding: Math.round(size * 0.14) }}
          >
            <img
              src={logoSrc}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/90 font-medium">{message}</span>

            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block w-2 h-2 rounded-full bg-white/85"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { y: [0, -6, 0], opacity: [0.6, 1, 0.6] }
                  }
                  transition={{
                    delay: i * 0.14,
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-[12px] text-white/45">Alignement des étoiles en cours…</div>
        </div>
      </motion.div>
    </div>
  );
}
