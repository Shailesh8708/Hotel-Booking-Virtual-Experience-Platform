// VELOCITY ONE — SECTION D: THE LIGHT SIGNATURE
// Interactive lighting demonstration with real-time 3D model synchronization

import React from 'react';
import { Sun, Moon, Zap, Sparkles, Sliders } from 'lucide-react';
import { LIGHT_MODES } from '../../utils/carConfig';
import sound from '../../utils/audioEngine';

export default function LightSignatureSection({ activeLightMode, onSelectLightMode }) {
  const handleSelect = (mode) => {
    sound.playLightSwitch();
    onSelectLightMode(mode);
  };

  return (
    <section id="lighting" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#ff5722] tracking-tech uppercase">04 // PHOTONIC AERODYNAMICS</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            THE LIGHT<br />
            <span className="text-neutral-400">SIGNATURE.</span>
          </h2>
        </div>
        <p className="font-display text-neutral-300 max-w-md text-sm sm:text-base font-light leading-relaxed">
          Integrated into the composite bodywork. Razor-thin crystalline light ribbons and ground-effect underglow that sculpt the night.
        </p>
      </div>

      <div className="tech-divider mb-12" />

      {/* Main Interactive Matrix Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Light Mode Selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
            SELECT LIGHTING PROFILE:
          </div>

          {LIGHT_MODES.map((mode) => {
            const isActive = activeLightMode.id === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleSelect(mode)}
                onMouseEnter={() => sound.playHover()}
                className={`text-left p-5 rounded-sm transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.08] border-[#ff5722] shadow-[0_0_25px_rgba(255,87,34,0.2)]'
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/10 text-neutral-400'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#ff5722]" />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-editorial text-base font-bold text-white uppercase tracking-wider">
                    {mode.name}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#ff5722] shadow-[0_0_8px_#ff5722]' : 'bg-neutral-600'}`} />
                </div>
                <p className="font-display text-xs text-neutral-300 line-clamp-2 mt-1">
                  {mode.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Visual Photometric Telemetry Panel */}
        <div className="lg:col-span-7 glass-panel-glow p-8 md:p-10 rounded-sm relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff5722]" />
              <span className="font-mono text-xs text-white uppercase tracking-widest">
                ACTIVE STATE: {activeLightMode.name.toUpperCase()}
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400">
              REAL-TIME 3D LIGHT LINKED
            </span>
          </div>

          {/* Visual Beam Simulation Preview */}
          <div className="relative h-48 bg-black/60 rounded-sm border border-white/10 flex items-center justify-center overflow-hidden mb-6">
            {/* Dark Studio Floor Graphic */}
            <div className="absolute inset-0 runway-grid opacity-20" />

            {/* Simulated Headlight Cones */}
            {activeLightMode.headlights && (
              <>
                <div className="absolute w-40 h-64 bg-gradient-to-b from-white/30 via-white/5 to-transparent -rotate-12 blur-md transform -translate-x-12 translate-y-4" />
                <div className="absolute w-40 h-64 bg-gradient-to-b from-white/30 via-white/5 to-transparent rotate-12 blur-md transform translate-x-12 translate-y-4" />
              </>
            )}

            {/* Simulated DRL Glow */}
            {activeLightMode.drl && (
              <div className="absolute flex items-center gap-16 z-10">
                <div className="w-16 h-1 bg-[#ff5722] shadow-[0_0_15px_#ff5722] rounded-full" />
                <div className="w-16 h-1 bg-[#ff5722] shadow-[0_0_15px_#ff5722] rounded-full" />
              </div>
            )}

            {/* Simulated Underglow */}
            {activeLightMode.underglow && (
              <div className="absolute bottom-4 w-64 h-8 bg-[#ff5722]/40 filter blur-xl rounded-full" />
            )}

            {/* Center Status Badge */}
            <div className="relative z-20 text-center">
              <div className="font-mono text-xs text-white uppercase tracking-widest">
                PHOTOMETRIC LUMENS: {activeLightMode.headlights ? '18,500 LM' : activeLightMode.drl ? '4,200 LM' : '0 LM'}
              </div>
              <div className="font-mono text-[10px] text-neutral-400 mt-1">
                COLOR TEMP: {activeLightMode.headlights ? '6,500K CRYSTAL' : activeLightMode.drl ? '3,200K AMBER' : 'OFF'}
              </div>
            </div>
          </div>

          {/* Photometric Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="font-mono text-[10px] text-neutral-400 uppercase">MATRIX BEAM</div>
              <div className="font-mono text-base font-bold text-white mt-1">
                {activeLightMode.headlights ? 'ACTIVE' : 'STANDBY'}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-neutral-400 uppercase">DRL PROFILE</div>
              <div className="font-mono text-base font-bold text-[#ff5722] mt-1">
                {activeLightMode.drl ? 'BLADE ON' : 'STANDBY'}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-neutral-400 uppercase">AERO UNDERGLOW</div>
              <div className="font-mono text-base font-bold text-white mt-1">
                {activeLightMode.underglow ? 'ENGAGED' : 'OFF'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

