// VELOCITY ONE — SECTION F: FINAL CALL TO ACTION
// "THE FUTURE IS YOURS." — Cinematic closing editorial

import React from 'react';
import { ArrowUpRight, Sparkles, Shield, Cpu } from 'lucide-react';
import sound from '../../utils/audioEngine';

export default function FinalCTASection({ onOpenReserve }) {
  const handleCTAClick = () => {
    sound.playClick();
    onOpenReserve();
  };

  return (
    <section className="relative py-36 px-6 md:px-12 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
      {/* Subtle background ambient flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ff5722]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-sm bg-white/[0.04] border border-white/10 text-[#ff5722] font-mono text-xs tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION LIMITED // 100 HAND-ASSEMBLED CHASSIS</span>
        </div>

        <h2 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase leading-[0.95] mb-6">
          THE FUTURE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
            IS YOURS.
          </span>
        </h2>

        <p className="font-display text-base sm:text-lg text-neutral-300 font-light max-w-xl mb-10 leading-relaxed">
          The boundaries of physics, computational design, and electric velocity have converged. The key to the next century of automotive dominance awaits.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleCTAClick}
            onMouseEnter={() => sound.playHover()}
            className="btn-primary w-full sm:w-auto cursor-pointer"
          >
            <span className="flex items-center gap-2 font-bold tracking-widest">
              BEGIN YOUR JOURNEY
              <ArrowUpRight className="w-4 h-4 text-[#ff5722]" />
            </span>
          </button>

          <a
            href="#configurator"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="btn-secondary w-full sm:w-auto cursor-pointer text-decoration-none"
          >
            <span>CUSTOMIZE SPEC</span>
          </a>
        </div>
      </div>
    </section>
  );
}

