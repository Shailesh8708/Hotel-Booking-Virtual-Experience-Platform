// VILLA AURELIA — Mediterranean Water Ripple Cursor Trail
// Simulates calm sea ripples expanding and refracting under cursor movement.
// Automatically disables on touch screens (pointer: coarse).

import React, { useEffect, useRef } from 'react';

export default function LiquidCursorCanvas({ theme = 'day' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const ripples = [];
    let lastMouse = { x: -100, y: -100 };
    let lastTime = performance.now();

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastMouse.x;
      const dy = y - lastMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn ripple if cursor moved enough (prevents spamming static ripples)
      if (dist > 18) {
        ripples.push({
          x,
          y,
          radius: 2,
          maxRadius: Math.min(75, 30 + dist * 0.8),
          alpha: Math.min(0.35, 0.15 + dist * 0.005),
          speed: 1.2 + dist * 0.02,
        });

        lastMouse = { x, y };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const isNight = theme === 'night';

    const render = (now) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed * 60 * dt;
        r.alpha *= 0.95;

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw double ripple crest (concentric refraction ring)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isNight
          ? `rgba(224, 122, 72, ${r.alpha * 0.5})`
          : `rgba(255, 255, 255, ${r.alpha * 0.75})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Inner refracted caustic ring
        if (r.radius > 8) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 6, 0, Math.PI * 2);
          ctx.strokeStyle = isNight
            ? `rgba(255, 200, 140, ${r.alpha * 0.25})`
            : `rgba(220, 240, 255, ${r.alpha * 0.4})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}

