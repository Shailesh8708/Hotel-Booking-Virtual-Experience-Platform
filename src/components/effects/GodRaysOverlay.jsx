// VILLA AURELIA — Volumetric God-Rays & Light Stream Shader Pass
// Lightweight 60fps canvas volumetric ray tracer simulating sunbeams streaming through the terrace archway.
// Responds dynamically to mouse coordinates (X, Y) and scroll elevation.

import React, { useEffect, useRef } from 'react';

export default function GodRaysOverlay({ theme = 'day' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let scrollY = window.scrollY || 0;
    let mouse = { x: 0.72, y: 0.18 }; // Normalized sun origin matching the terrace photograph
    let targetMouse = { x: 0.72, y: 0.18 };

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
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      targetMouse.x = 0.72 + (nx - 0.5) * 0.08;
      targetMouse.y = 0.18 + (ny - 0.5) * 0.06;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Procedural ray definition (angles and widths)
    const rayBeams = [
      { angleOffset: -0.32, width: 0.18, speed: 0.6, intensity: 0.22 },
      { angleOffset: -0.15, width: 0.26, speed: 0.9, intensity: 0.35 },
      { angleOffset: 0.02, width: 0.22, speed: 0.5, intensity: 0.28 },
      { angleOffset: 0.18, width: 0.32, speed: 0.8, intensity: 0.4 },
      { angleOffset: 0.34, width: 0.2, speed: 0.7, intensity: 0.25 },
    ];

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;

      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // In Night mode, smoothly fade out rays entirely
      const isNight = theme === 'night';
      const baseAlpha = isNight ? 0.0 : 0.85;
      if (baseAlpha <= 0.001) return;

      // Scroll fade factor
      const scrollFade = Math.max(0, 1 - scrollY / 600);
      const totalAlpha = baseAlpha * scrollFade;
      if (totalAlpha <= 0.005) return;

      // Sun origin coordinates
      const sunX = w * mouse.x;
      const sunY = h * mouse.y;

      // Main atmospheric sun flare core
      const flareGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, w * 0.65);
      flareGrad.addColorStop(0, `rgba(255, 248, 220, ${0.45 * totalAlpha})`);
      flareGrad.addColorStop(0.2, `rgba(255, 230, 180, ${0.25 * totalAlpha})`);
      flareGrad.addColorStop(0.55, `rgba(240, 200, 150, ${0.08 * totalAlpha})`);
      flareGrad.addColorStop(1, 'rgba(240, 200, 150, 0)');

      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, 0, w, h);

      // Render volumetric streaming ray cones
      rayBeams.forEach((ray, i) => {
        const sweep = Math.sin(time * ray.speed + i * 1.5) * 0.06;
        const currentAngle = Math.PI * 0.68 + ray.angleOffset + sweep;
        const beamLength = Math.max(w, h) * 1.6;

        const leftAngle = currentAngle - ray.width * 0.5;
        const rightAngle = currentAngle + ray.width * 0.5;

        const p1x = sunX + Math.cos(leftAngle) * beamLength;
        const p1y = sunY + Math.sin(leftAngle) * beamLength;
        const p2x = sunX + Math.cos(rightAngle) * beamLength;
        const p2y = sunY + Math.sin(rightAngle) * beamLength;

        // Linear gradient along the light beam direction
        const midAngle = currentAngle;
        const endX = sunX + Math.cos(midAngle) * beamLength * 0.8;
        const endY = sunY + Math.sin(midAngle) * beamLength * 0.8;

        const rayGrad = ctx.createLinearGradient(sunX, sunY, endX, endY);
        const rayAlpha = ray.intensity * totalAlpha * (0.8 + 0.2 * Math.sin(time * 2 + i));

        rayGrad.addColorStop(0, `rgba(255, 250, 230, ${rayAlpha * 0.8})`);
        rayGrad.addColorStop(0.25, `rgba(255, 235, 195, ${rayAlpha * 0.55})`);
        rayGrad.addColorStop(0.65, `rgba(245, 215, 170, ${rayAlpha * 0.2})`);
        rayGrad.addColorStop(1, 'rgba(245, 215, 170, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.closePath();
        ctx.fill();
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[5] w-full h-full transition-opacity duration-1000"
      style={{
        mixBlendMode: 'screen',
        opacity: theme === 'night' ? 0 : 0.85,
      }}
      aria-hidden="true"
    />
  );
}

