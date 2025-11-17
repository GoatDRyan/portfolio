import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
Combined Space Loader that uses your CanvasStarfield as the animated background.
- CanvasStarfield: your original canvas-based starfield (improved for DPR & perf)
- SpaceLoader: centered loading card (planet/logo + message) layered on top
Props: size, message, logoSrc, starCount
*/

function CanvasStarfield({ starCount = 100 }) {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resizeCanvas = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });

    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.15 + Math.random() * 0.6,
        size: 0.6 + Math.random() * 2.2,
        twinkle: Math.random() * 1.0
      });
    }
    setStars(newStars);
  }, [starCount]);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [resizeCanvas, handleMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(dimensions.width * dpr);
    canvas.height = Math.floor(dimensions.height * dpr);
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    let animationFrameId;
    let localStars = stars.map(s => ({ ...s }));

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // subtle radial gradient background to blend with your portfolio colors
      const g = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      g.addColorStop(0, '#6366f1');
      g.addColorStop(1, '#000000');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // draw stars
      localStars.forEach((s) => {
        const tw = Math.abs(Math.sin((Date.now() / 1000) * (0.5 + s.twinkle)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.6 * tw})`;
        ctx.fill();

        s.y += s.speed;
        if (s.y > dimensions.height + 4) {
          s.y = -4;
          s.x = Math.random() * dimensions.width;
          s.speed = 0.15 + Math.random() * 0.6;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (localStars.length) animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [stars, dimensions]);

  return (
    <div className="starfield-container fixed inset-0 -z-10 overflow-hidden">
      <canvas id="bg-canvas" ref={canvasRef} />
      <style jsx>{`
        .starfield-container {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: -10;
          background: radial-gradient(ellipse at center, #6366f1, #000000);
          overflow: hidden;
          transition: transform 0.12s ease-out;
        }
        #bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default function SpaceLoader({ size = 96, message = 'Chargement', logoSrc = '/logo.svg', starCount = 120 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Canvas background (your starfield) */}
      <CanvasStarfield starCount={starCount} />

      {/* Nebula overlays (subtle) */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 w-[55%] h-[55%] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle at 20% 20%, #7c3aed44, transparent 30%)' }} />
        <div className="absolute right-0 bottom-0 w-[42%] h-[45%] rounded-full blur-2xl opacity-22" style={{ background: 'radial-gradient(circle at 70% 30%, #06b6d444, transparent 30%)' }} />
      </div>

      {/* Centered loading card */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.42 }}
        className="border-white border-2 relative z-20 flex flex-col items-center gap-5 p-5 rounded-2xl bg-gradient-to-b from-white/4 to-transparent shadow-xl ring-1 ring-white/6"
        style={{ minWidth: 300, backdropFilter: 'blur(6px)' }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full p-2"
          animate={prefersReducedMotion ? {} : { rotate: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <div className="relative rounded-full overflow-hidden flex items-center justify-center" style={{ width: size, height: size, padding: Math.round(size * 0.14) }}>
            <img
              src='./logo.svg'
              alt="Logo planet"
              onError={(e) => (e.currentTarget.style.display = 'none')}
              className="w-full h-full object-contain"
              style={{ objectFit: 'contain' }}
            />

            {/* atmospheric glow */}
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: '0 14px 48px rgba(96,165,250,0.22), inset 0 8px 22px rgba(0,0,0,0.36)' }} />

            {/* rings */}
            <svg className="absolute inset-0 m-auto" viewBox="0 0 120 120" aria-hidden>
              <ellipse cx="60" cy="70" rx="44" ry="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <ellipse cx="60" cy="70" rx="52" ry="20" fill="none" stroke="rgba(96,165,250,0.06)" strokeWidth="1" />
            </svg>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/90 font-medium">{message}</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  aria-hidden
                  key={i}
                  className="inline-block w-2 h-2 rounded-full bg-white/85"
                  animate={prefersReducedMotion ? {} : { y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ delay: i * 0.14, duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
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

/*
-----------------------------------------
ADDED: App transition example
-----------------------------------------
This section shows how to use the SpaceLoader in an app and perform a smooth transition
from the loader into the homepage using Framer Motion's AnimatePresence.

Key points implemented in the example:
- A top-level `isLoading` state controls visibility of the loader.
- The loader exits with a fade + scale animation (`exit={{ opacity: 0, scale: 0.98 }}`)
  while the homepage enters with a subtle upward motion + fade.
- `onLoaded` callback demonstrates how to wait for assets (or a timeout) before
  flipping `isLoading` to false.
- Also includes a React Router example (commented) showing route transitions using
  `AnimatePresence` with `location` and `key={location.pathname}`.

Notes & integration tips:
- If your homepage needs to preload images/fonts, call `setIsLoading(false)` only
  after those resources are ready.
- For a native feel, prefer a short overlap: let the loader start its exit animation
  while the homepage is already rendering underneath (use z-index layering).
- Tweak transition timings to taste; 450–600ms feels natural.

*/

// Example (add to your project):
// import React, { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import SpaceLoader from './SpaceLoader';
// import HomePage from './HomePage';
//
// export default function AppWithLoader() {
//   const [isLoading, setIsLoading] = useState(true);
//
//   useEffect(() => {
//     // simulate loading / preload assets
//     const t = setTimeout(() =>
