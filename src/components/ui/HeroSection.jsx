// VELOCITY ONE — Cinematic Automotive Hero & Reveal Experience

import React from 'react';
import { Eye, ArrowDown, Sparkles, Shield, Cpu, Zap, RotateCcw } from 'lucide-react';
import CameraPresetsBar from './CameraPresetsBar';
import sound from '../../utils/audioEngine';

export default function HeroSection({
  isRevealed,
  onUnveil,
  onReplay,
  activePreset,
  onSelectPreset,
  onResetView,
}) {
  const handleUnveilClick = () => {
    sound.playReveal();
    onUnveil();
  };

  const handleExploreClick = () => {
    sound.playClick();
    const target = document.getElementById('machine');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-8 px-6 md:px-12 pointer-events-none">
      {/* Top Telemetry HUD (Below Navbar) */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-end pointer-events-auto">
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-neutral-400 bg-black/40 px-4 py-1.5 rounded-sm border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-white/40">POWERTRAIN:</span>
            <span className="text-white font-medium">QUAD-MOTOR 800V</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="text-white/40">OUTPUT:</span>
            <span className="text-[#ff5722] font-medium">1,950 BHP</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="text-white/40">CHASSIS:</span>
            <span className="text-white font-medium">CARBON-TITANIUM</span>
          </div>
        </div>
      </div>

      {/* Hero Headline & Reveal Actions Overlay */}
      <div className="max-w-7xl mx-auto w-full my-auto flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto z-10">
        {!isRevealed ? (
          /* PRE-REVEAL STATE */
          <div className="max-w-2xl flex flex-col items-center md:items-start transition-all duration-700">
            {/* Prominent Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-4 rounded-sm bg-white/[0.05] border border-white/10 text-neutral-300 font-mono text-xs tracking-tech uppercase backdrop-blur-md">
              <div className="pulse-dot" />
              <span className="text-[#ff5722] font-semibold">THE NEXT ERA OF ELECTRIC PERFORMANCE</span>
            </div>

            <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase leading-[0.95] mb-5 drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
              POWER,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                UNCOVERED.
              </span>
            </h1>

            <p className="font-display text-base sm:text-lg text-neutral-300 max-w-lg mb-8 leading-relaxed font-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Engineered for the extraordinary. Designed to move the future. The definitive electric hypercar arrives.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleUnveilClick}
                onMouseEnter={() => sound.playHover()}
                className="btn-primary w-full sm:w-auto group relative cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2.5 font-bold tracking-widest">
                  <Eye className="w-4 h-4 text-[#ff5722]" />
                  UNVEIL THE FUTURE
                </span>
              </button>

              <button
                onClick={handleExploreClick}
                onMouseEnter={() => sound.playHover()}
                className="btn-secondary w-full sm:w-auto cursor-pointer"
              >
                <span>EXPLORE THE MACHINE</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* REVEALED STATE */
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-sm bg-[#ff5722]/15 border border-[#ff5722]/40 text-[#ff5722] font-mono text-xs tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-ping" />
                <span>VEHICLE UNVEILED // 3D EXPLORATION ACTIVE</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-none mb-3">
                VELOCITY ONE
              </h2>

              <p className="font-display text-sm text-neutral-300 max-w-md mb-4 font-light">
                Interact with the full 3D hypercar. Rotate 360°, inspect aerodynamic splitters, and switch lighting signatures.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onReplay();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ff5722]" />
                  <span>REPLAY REVEAL</span>
                </button>

                <button
                  onClick={handleExploreClick}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#ff5722]/15 hover:bg-[#ff5722]/25 border border-[#ff5722]/30 text-[#ff5722] font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
                >
                  <span>DEEP DIVE SPECS</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interaction Cue */}
            <div className="hidden lg:flex flex-col items-end gap-1.5 font-mono text-[11px] text-neutral-400 bg-black/40 px-4 py-2.5 rounded-sm border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                <span>DRAG TO ROTATE 360°</span>
              </div>
              <span className="text-white/40">SCROLL / PINCH TO ZOOM</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Camera Presets Toolbar (Floating HUD) */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-3 pointer-events-auto z-20">
        <CameraPresetsBar
          activePreset={activePreset}
          onSelectPreset={onSelectPreset}
          onResetView={onResetView}
          isRevealed={isRevealed}
        />

        {/* Scroll Down Indicator */}
        <button
          onClick={handleExploreClick}
          className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors pt-2 cursor-pointer bg-transparent border-none"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3 h-3 text-[#ff5722] animate-bounce" />
        </button>
      </div>
    </div>
  );
}
