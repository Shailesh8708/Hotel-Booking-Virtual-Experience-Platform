// VILLA AURELIA — Atmospheric Particles (Dynamic Fireflies & Sunlit Dust Motes)
// Frame-rate independent HTML5 Canvas engine with Brownian motion, wind vector drift,
// organic sine-wave alpha pulsing, and interactive cursor velocity & proximity response.

import React, { useEffect, useRef } from 'react';

export default function AtmosphericParticles({ theme = 'day' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive Canvas Resizing
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse velocity & position tracking
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (mouse.lastX > -500) {
        mouse.vx = (currentX - mouse.lastX) * 0.15;
        mouse.vy = (currentY - mouse.lastY) * 0.15;
      }
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.lastX = currentX;
      mouse.lastY = currentY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particle pool
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    const isNight = theme === 'night';

    // Particle count: 68 fireflies in night view, 85 sunlit motes in day view
    const particleCount = isNight ? 68 : 85;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slower, graceful floating velocities in night mode
        vx: (Math.random() - 0.5) * (isNight ? 0.18 : 0.25),
        vy: (Math.random() - 0.5) * (isNight ? 0.15 : 0.2) - (isNight ? 0.04 : 0.05),
        size: isNight ? Math.random() * 2.0 + 1.2 : Math.random() * 1.8 + 0.8,
        glowRadius: isNight ? Math.random() * 18 + 14 : Math.random() * 8 + 4,
        phase: Math.random() * Math.PI * 2,
        // Substantially reduced lighting speed in night mode (0.35 - 0.75 rad/s -> 8-18s breathing periods)
        pulseSpeed: isNight ? Math.random() * 0.4 + 0.35 : Math.random() * 0.8 + 0.6,
        baseAlpha: isNight ? Math.random() * 0.35 + 0.5 : Math.random() * 0.18 + 0.12,
        brownianTheta: Math.random() * Math.PI * 2,
        proximityBoost: 0,
        // Delicate natural blinking / micro-twinkle attributes for night jugnu fireflies
        blinkPhase: Math.random() * Math.PI * 2,
        blinkSpeed: Math.random() * 2.6 + 2.2,
        blinkDepth: Math.random() * 0.24 + 0.14,
      });
    }

    let elapsed = 0;

    const render = (now) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += dt;

      // Damp mouse velocity
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Horizontal Mediterranean sea-breeze wind vector
      const windX = Math.sin(elapsed * 0.25) * (isNight ? 0.08 : 0.15) + (isNight ? 0.06 : 0.16);

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          // Brownian motion drift (softer in night mode for peaceful hovering)
          p.brownianTheta += (Math.random() - 0.5) * (isNight ? 0.25 : 0.4);
          const brownianStrength = isNight ? 0.025 : 0.04;
          p.vx += Math.cos(p.brownianTheta) * brownianStrength;
          p.vy += Math.sin(p.brownianTheta) * brownianStrength;

          // Air resistance damping
          p.vx *= isNight ? 0.985 : 0.98;
          p.vy *= isNight ? 0.985 : 0.98;

          if (isNight) {
            // NIGHT MODE: Curious gentle hovering & attraction (NEVER disappears, NEVER flung away)
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distSq = dx * dx + dy * dy;
            const interactiveRadius = 180;

            if (distSq < interactiveRadius * interactiveRadius && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const proximity = (interactiveRadius - dist) / interactiveRadius;

              // Gentle standoff: firefly comfortably floats 40-55px from cursor tip
              const targetDist = 45;
              const distOffset = dist - targetDist;
              const spring = distOffset * 0.0025;

              const nx = dx / dist;
              const ny = dy / dist;

              // Gentle buoyant tangential flutter around cursor
              const tangentX = -ny * 0.35;
              const tangentY = nx * 0.35;

              p.vx += (nx * spring + tangentX * 0.12) * proximity * 0.45 + mouse.vx * 0.04;
              p.vy += (ny * spring + tangentY * 0.12) * proximity * 0.45 + mouse.vy * 0.04;

              // Firefly lights up warmly with curiosity when pointer is near (GUARANTEED VISIBLE)
              p.proximityBoost = Math.max(p.proximityBoost, proximity * 0.75);
            }

            // Strictly clamp maximum velocity in night mode so fireflies NEVER dart, fling away, or wrap
            const maxSpeed = 0.55;
            const currentSpeed = Math.hypot(p.vx, p.vy);
            if (currentSpeed > maxSpeed) {
              p.vx = (p.vx / currentSpeed) * maxSpeed;
              p.vy = (p.vy / currentSpeed) * maxSpeed;
            }
          } else {
            // DAY MODE: Subtle atmospheric air current reaction for dust motes
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const pushRadius = 130;

            if (distSq < pushRadius * pushRadius && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (pushRadius - dist) / pushRadius;
              p.vx += (dx / dist) * force * 1.2 + mouse.vx * 0.2;
              p.vy += (dy / dist) * force * 1.2 + mouse.vy * 0.2;
            }

            const maxSpeed = 1.8;
            const currentSpeed = Math.hypot(p.vx, p.vy);
            if (currentSpeed > maxSpeed) {
              p.vx = (p.vx / currentSpeed) * maxSpeed;
              p.vy = (p.vy / currentSpeed) * maxSpeed;
            }
          }

          // Position integration with delta-time
          p.x += (p.vx + windX) * 60 * dt;
          p.y += p.vy * 60 * dt;

          // Seamless boundary wrapping
          if (p.x < -25) p.x = w + 25;
          if (p.x > w + 25) p.x = -25;
          if (p.y < -25) p.y = h + 25;
          if (p.y > h + 25) p.y = -25;
        }

        // Decay interactive proximity boost
        p.proximityBoost *= 0.95;

        // Smooth sinusoidal breathing curve (cubic Hermite smoothstep for natural organic glow)
        const rawSine = 0.5 + 0.5 * Math.sin(elapsed * p.pulseSpeed + p.phase);
        const smoothPulse = rawSine * rawSine * (3 - 2 * rawSine);

        if (isNight) {
          // Night mode: Warm gold glow bioluminescent fireflies ("Jugnu")
          // Delicate organic blinking / twinkle micro-oscillation
          const microTwinkle = Math.sin(elapsed * p.blinkSpeed + p.blinkPhase);
          const blinkMultiplier = 1.0 + (microTwinkle > 0.35
            ? Math.pow((microTwinkle - 0.35) / 0.65, 2) * p.blinkDepth
            : -p.blinkDepth * 0.35 * Math.max(0, -microTwinkle));

          // Gentle ambient ember floor (0.25) so light never cuts out abruptly, modulated by delicate blink
          let alpha = (p.baseAlpha * (0.25 + 0.75 * smoothPulse)) * blinkMultiplier + p.proximityBoost * 0.45;
          alpha = Math.min(1.0, Math.max(0.04, alpha));

          // Luminous golden halo with smooth radial diffusion and subtle blink expansion
          const glowR = p.glowRadius * (0.85 + 0.35 * smoothPulse + p.proximityBoost * 0.45) * (1 + 0.08 * Math.max(0, microTwinkle));
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, `rgba(255, 255, 235, ${Math.min(1, alpha * 1.4)})`);
          grad.addColorStop(0.22, `rgba(248, 202, 70, ${alpha * 0.85})`);
          grad.addColorStop(0.55, `rgba(224, 122, 72, ${alpha * 0.35})`);
          grad.addColorStop(1, 'rgba(224, 122, 72, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fill();

          // Brilliant luminous firefly core with delicate twinkle spark
          const coreSize = p.size * (0.85 + 0.25 * smoothPulse + p.proximityBoost * 0.3) * (1 + 0.15 * Math.max(0, microTwinkle));
          ctx.fillStyle = `rgba(255, 255, 245, ${Math.min(1, alpha * 1.7)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, coreSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Day mode: Subtle floating atmospheric dust motes
          let alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(elapsed * p.pulseSpeed + p.phase));
          if (alpha < 0.02) return;

          const glowR = p.glowRadius * 1.2;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
          grad.addColorStop(0.35, `rgba(245, 230, 205, ${alpha * 0.45})`);
          grad.addColorStop(1, 'rgba(245, 230, 205, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fill();

          // Subtle sunlit particle core
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.45, alpha * 1.2)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 w-full h-full"
      style={{ mixBlendMode: theme === 'night' ? 'screen' : 'plus-lighter' }}
      aria-hidden="true"
    />
  );
}
