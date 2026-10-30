// VILLA AURELIA — Volumetric Nocturnal Coastal Fog & Sea Mist Layer
// Simulates rolling, dreamlike Mediterranean coastal mist across the sea horizon and terrace balustrade.
// Active in Night mode with smooth 1.2s crossfade transitions and 60fps delta-time animation.

import React, { useEffect, useRef } from 'react';

export default function NightFogOverlay({ theme = 'day' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();
    const isNight = theme === 'night';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    // Define 6 organic rolling mist banks with varied depths, sizes, and drift speeds
    const fogBanks = [
      // Deep sea horizon mist (cool nocturnal slate-indigo)
      {
        x: width * 0.1,
        y: height * 0.48,
        radiusX: width * 0.45,
        radiusY: height * 0.28,
        speedX: 7.5,
        sineOffset: 0,
        sineSpeed: 0.35,
        baseAlpha: 0.18,
        colorType: 'cool',
      },
      {
        x: width * 0.65,
        y: height * 0.52,
        radiusX: width * 0.5,
        radiusY: height * 0.3,
        speedX: 9.0,
        sineOffset: 1.8,
        sineSpeed: 0.28,
        baseAlpha: 0.2,
        colorType: 'cool',
      },
      // Mid-terrace ambient mist with warm lantern scatter
      {
        x: width * 0.3,
        y: height * 0.68,
        radiusX: width * 0.42,
        radiusY: height * 0.32,
        speedX: 11.0,
        sineOffset: 3.2,
        sineSpeed: 0.4,
        baseAlpha: 0.16,
        colorType: 'warm',
      },
      {
        x: width * 0.8,
        y: height * 0.72,
        radiusX: width * 0.48,
        radiusY: height * 0.35,
        speedX: 8.5,
        sineOffset: 4.5,
        sineSpeed: 0.32,
        baseAlpha: 0.17,
        colorType: 'warm',
      },
      // Low ground-level balustrade fog
      {
        x: width * 0.5,
        y: height * 0.86,
        radiusX: width * 0.6,
        radiusY: height * 0.3,
        speedX: 13.0,
        sineOffset: 2.1,
        sineSpeed: 0.45,
        baseAlpha: 0.22,
        colorType: 'ground',
      },
    ];

    let elapsed = 0;

    const render = (now) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += dt;

      const r = canvas.getBoundingClientRect();
      const w = r.width;
      const h = r.height;

      ctx.clearRect(0, 0, w, h);

      if (!isNight) return;

      // Render each rolling fog plume
      fogBanks.forEach((bank) => {
        if (!prefersReducedMotion) {
          // Slow horizontal drift across the Tyrrhenian coast
          bank.x += bank.speedX * dt;
          // Wrap around seamlessly
          if (bank.x - bank.radiusX > w) {
            bank.x = -bank.radiusX;
          }

          // Gentle vertical undulating wave
          bank.currentY = bank.y + Math.sin(elapsed * bank.sineSpeed + bank.sineOffset) * (h * 0.04);
        } else {
          bank.currentY = bank.y;
        }

        const currentX = bank.x;
        const currentY = bank.currentY;

        // Create elliptical radial gradient for volumetric mist
        ctx.save();
        ctx.translate(currentX, currentY);
        ctx.scale(1, bank.radiusY / bank.radiusX);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, bank.radiusX);

        if (bank.colorType === 'warm') {
          // Warm amber lantern illumination scattered in the fog
          grad.addColorStop(0, `rgba(224, 122, 72, ${bank.baseAlpha * 0.95})`);
          grad.addColorStop(0.35, `rgba(180, 95, 45, ${bank.baseAlpha * 0.5})`);
          grad.addColorStop(0.7, `rgba(120, 50, 20, ${bank.baseAlpha * 0.2})`);
          grad.addColorStop(1, 'rgba(120, 50, 20, 0)');
        } else if (bank.colorType === 'ground') {
          // Low nocturnal ground haze
          grad.addColorStop(0, `rgba(18, 22, 32, ${bank.baseAlpha * 1.1})`);
          grad.addColorStop(0.4, `rgba(32, 24, 20, ${bank.baseAlpha * 0.6})`);
          grad.addColorStop(0.8, `rgba(32, 24, 20, ${bank.baseAlpha * 0.2})`);
          grad.addColorStop(1, 'rgba(32, 24, 20, 0)');
        } else {
          // Cool deep midnight blue maritime mist
          grad.addColorStop(0, `rgba(35, 52, 78, ${bank.baseAlpha * 0.85})`);
          grad.addColorStop(0.4, `rgba(25, 38, 58, ${bank.baseAlpha * 0.45})`);
          grad.addColorStop(0.75, `rgba(18, 26, 40, ${bank.baseAlpha * 0.15})`);
          grad.addColorStop(1, 'rgba(18, 26, 40, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, bank.radiusX, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2] w-full h-full transition-opacity duration-1000"
      style={{
        mixBlendMode: 'screen',
        opacity: theme === 'night' ? 0.92 : 0,
        filter: 'blur(12px)',
      }}
      aria-hidden="true"
    />
  );
}

