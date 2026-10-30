// VILLA AURELIA — Cinematic Hero Entrance
// Editorial typography with Kinetic 3D text elevation, full-bleed architectural canvas,
// volumetric god-rays, atmospheric particles (jugnu fireflies & dust motes), and liquid sea ripples.

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Images, MapPin, ArrowUpRight } from 'lucide-react';
import { VILLA_INFO } from '../../utils/villaData';
import villaSound from '../../utils/villaAudio';

import AtmosphericParticles from '../effects/AtmosphericParticles';
import GodRaysOverlay from '../effects/GodRaysOverlay';
import NightFogOverlay from '../effects/NightFogOverlay';
import LiquidCursorCanvas from '../effects/LiquidCursorCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function VillaHero({ onOpenBooking, onOpenGallery, theme = 'day' }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  const handleScrollExplore = () => {
    villaSound.playClick();
    const target = document.getElementById('spaces');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  // Feature 2A: Kinetic Typography & 3D Text Elevation on "Villa Aurelia"
  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.hero-char');
    if (!chars.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, rotateX: 0, z: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial 3D Character Elevation & Unfold Entrance Sequence
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          rotateX: 90,
          z: -100,
          transformOrigin: '50% 50% -50px',
        },
        {
          opacity: 1,
          rotateX: 0,
          z: 0,
          duration: 1.15,
          stagger: 0.045,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // 2. Scroll Parallax Elevation Depth tied to ScrollTrigger
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        rotateX: -14,
        z: -70,
        y: 85,
        opacity: 0.35,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src="/media/terrazza-1600.webp"
          alt="Villa Aurelia Sea-View Terrace at Sunset"
          className="w-full h-full object-cover object-center filter brightness-[0.92] dark:brightness-[0.7] contrast-[1.05] transition-all duration-1000 scale-100 hover:scale-[1.01]"
        />
        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)] via-[var(--bg-canvas)]/30 to-transparent opacity-90 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-canvas)]/60 via-transparent to-[var(--bg-canvas)]/80 transition-colors duration-700" />
      </div>

      {/* Feature 1B: Dynamic Volumetric Light Ray & God-Ray Shaders */}
      <GodRaysOverlay theme={theme} />

      {/* Atmospheric Nocturnal Coastal Fog & Sea Mist Layer */}
      <NightFogOverlay theme={theme} />

      {/* Feature 2B: Mediterranean Water Ripple Cursor Trail */}
      <LiquidCursorCanvas theme={theme} />

      {/* Centerpiece Editorial Typography & Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto text-left py-8 md:py-16 pointer-events-auto">
        <div className="max-w-4xl">
          {/* Eyebrow Pill with Feature 1C Refined Glassmorphism */}
          <div className="villa-glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans text-[var(--color-accent)] font-medium mb-6 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span className="tracking-wide">Punta Aurelia · 40.2° N, 15.3° E</span>
          </div>

          {/* Feature 2A: Kinetic Typography & 3D Text Elevation Headline */}
          <h1
            ref={titleRef}
            className="font-display text-6xl sm:text-8xl lg:text-[9.5rem] font-light leading-[0.88] tracking-tight text-[var(--text-main)] mb-6 select-none"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {'Villa Aurelia'.split(' ').map((word, wordIdx) => (
              <React.Fragment key={wordIdx}>
                <span
                  className="inline-block whitespace-nowrap"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {word.split('').map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="hero-char inline-block"
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, opacity',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wordIdx === 0 && <span className="inline-block" aria-hidden="true">&nbsp;</span>}
              </React.Fragment>
            ))}
          </h1>

          <p className="font-display text-xl sm:text-3xl lg:text-4xl font-normal leading-snug text-[var(--text-secondary)] max-w-2xl mb-8">
            Two centuries of stone, restored for long summers by the sea.
          </p>

          {/* Quick Specification Pills with Feature 1C Refined Glassmorphism */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
            {['4 Bedrooms', 'Sleeps 8', 'Sea-view terrace', 'Olive garden', '300m to beach'].map((spec) => (
              <span
                key={spec}
                className="villa-glass px-3.5 py-1 rounded-full font-sans text-xs sm:text-sm text-[var(--text-secondary)] font-medium shadow-sm"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                villaSound.playClick();
                onOpenBooking();
              }}
              className="btn-stone cursor-pointer py-3.5 px-7 text-sm font-medium shadow-md"
            >
              <span>Request to book</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                villaSound.playClick();
                onOpenGallery();
              }}
              className="btn-stone-outline sm:hidden cursor-pointer py-3.5 px-6 text-sm"
            >
              <Images className="w-4 h-4" />
              <span>Show all photos</span>
            </button>

            <button
              onClick={handleScrollExplore}
              className="btn-stone-outline cursor-pointer py-3.5 px-6 text-sm"
            >
              <span>Discover the estate</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[rgba(255,255,255,0.18)] text-xs text-[var(--text-muted)] font-sans">
        <div className="flex items-center gap-6">
          <span>PRIVATE TYRRHENIAN PROMONTORY</span>
          <span className="hidden sm:inline">·</span>
          <span>ESTATE FOUNDED 1824</span>
          <span className="hidden sm:inline">·</span>
          <span>RESTORED 2024</span>
        </div>

        <button
          onClick={handleScrollExplore}
          className="flex items-center gap-2 hover:text-[var(--text-main)] transition-colors cursor-pointer bg-transparent border-none text-[var(--text-muted)] p-0"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>

      {/* Feature 1A: Dynamic Firefly ("Jugnu") & Dust Particle System (Layered on top of hero content) */}
      <AtmosphericParticles theme={theme} />
    </section>
  );
}
