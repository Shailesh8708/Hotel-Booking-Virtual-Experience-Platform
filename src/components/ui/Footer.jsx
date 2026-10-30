// VELOCITY ONE — Luxury Automotive Footer

import React from 'react';
import { ArrowUp, Volume2, VolumeX, Shield, Globe } from 'lucide-react';
import sound from '../../utils/audioEngine';

export default function Footer({ onScrollTop }) {
  const [isMuted, setIsMuted] = React.useState(sound.isMuted);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#040507] pt-20 pb-12 px-6 md:px-12 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Top Tier: Brand Manifesto & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#ff5722] to-[#b91c1c] flex items-center justify-center">
                <span className="font-editorial font-bold text-white text-sm">V1</span>
              </div>
              <span className="font-editorial text-xl font-bold tracking-widest text-white">
                VELOCITY<span className="text-[#ff5722] ml-1.5 font-light">ONE</span>
              </span>
            </div>

            <p className="font-display text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
              VELOCITY ONE is a concept study in electric hypercar architecture, active ground-effect aerodynamics, and retinal digital cockpit ergonomics.
            </p>

            <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>MILAN // STUTTGART // TOKYO</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3 font-display text-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white mb-2 font-semibold">
              EXPERIENCE
            </span>
            <a href="#hero" className="hover:text-white transition-colors text-decoration-none text-neutral-400">The Unveil</a>
            <a href="#machine" className="hover:text-white transition-colors text-decoration-none text-neutral-400">Aerodynamics</a>
            <a href="#performance" className="hover:text-white transition-colors text-decoration-none text-neutral-400">Concept Telemetry</a>
            <a href="#engineering" className="hover:text-white transition-colors text-decoration-none text-neutral-400">Neural Cockpit</a>
            <a href="#lighting" className="hover:text-white transition-colors text-decoration-none text-neutral-400">Photonic Signature</a>
            <a href="#configurator" className="hover:text-white transition-colors text-decoration-none text-neutral-400">Bespoke Studio</a>
          </div>

          {/* Technical Telemetry */}
          <div className="flex flex-col gap-3 font-display text-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white mb-2 font-semibold">
              SPECIFICATIONS
            </span>
            <span className="text-neutral-400 font-mono">POWER: 1,950 BHP</span>
            <span className="text-neutral-400 font-mono">0-60 MPH: 1.74 SEC</span>
            <span className="text-neutral-400 font-mono">VOLTAGE: 800V DC</span>
            <span className="text-neutral-400 font-mono">CURB WEIGHT: 1,480 KG</span>
            <span className="text-neutral-400 font-mono">CHASSIS: T1000G CARBON</span>
          </div>

          {/* Legal / Studio Details */}
          <div className="flex flex-col gap-3 font-display text-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white mb-2 font-semibold">
              ATELIER ACCESS
            </span>
            <button
              onClick={handleToggleSound}
              className="flex items-center gap-2 text-left hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 text-neutral-400 font-display text-xs"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#ff5722]" />}
              <span>{isMuted ? 'ENABLE AUDIO' : 'MUTE AUDIO'}</span>
            </button>
            <span className="text-neutral-400">PRESS ATELIER: PRESS@VELOCITYONE.AUTOMOTIVE</span>
            <span className="text-neutral-400">PRIVATE COMMISSIONS: CLIENTS@VELOCITYONE.AUTOMOTIVE</span>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Back to Top & Disclaimer */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} VELOCITY ONE AUTOMOTIVE. ALL RIGHTS RESERVED.
          </div>

          <div className="text-center sm:text-right">
            <span>FICTIONAL LUXURY AUTOMOTIVE CONCEPT EXPERIENCE</span>
          </div>

          <button
            onClick={onScrollTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-all cursor-pointer border border-white/5"
          >
            <span>TOP OF EXPERIENCE</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff5722]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

