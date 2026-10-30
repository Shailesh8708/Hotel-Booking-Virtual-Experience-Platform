// VILLA AURELIA — 3D Interactive Perspective Tilt Card
// Adds physics-based 3D rotation, depth elevation, and dynamic radial light sheen on hover

import React, { useRef, useState } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = x / rect.width;
    const yPct = y / rect.height;

    // Calculate rotation angles
    const rotateX = ((0.5 - yPct) * (maxTilt * 2)).toFixed(2);
    const rotateY = ((xPct - 0.5) * (maxTilt * 2)).toFixed(2);

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glare) {
      setGlareStyle({
        opacity: 0.18,
        x: (xPct * 100).toFixed(1),
        y: (yPct * 100).toFixed(1),
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden interactive-target ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic Specular Light Glare Layer */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle 300px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.75), transparent 80%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
}

