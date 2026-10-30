// VELOCITY ONE — SECTION A: THE MACHINE
// "BEAUTY IN EVERY LINE." — Interactive design details and aerodynamic highlights

import React, { useState } from 'react';
import { Wind, Shield, Layers, Disc, ChevronRight } from 'lucide-react';
import { DESIGN_HOTSPOTS } from '../../utils/carConfig';
import sound from '../../utils/audioEngine';

export default function MachineSection({ onFocusHotspot }) {
  const [selectedHotspot, setSelectedHotspot] = useState(DESIGN_HOTSPOTS[0]);

  const handleSelect = (hotspot) => {
    sound.playClick();
    setSelectedHotspot(hotspot);
    if (onFocusHotspot) {
      onFocusHotspot(hotspot);
    }
  };

  return (
    <section id="machine" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#ff5722] tracking-tech uppercase">01 // AERODYNAMIC ARCHITECTURE</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            BEAUTY IN<br />
            <span className="text-neutral-400">EVERY LINE.</span>
          </h2>
        </div>
        <p className="font-display text-neutral-300 max-w-md text-sm sm:text-base font-light leading-relaxed">
          Every contour exists for pure physics. Zero non-functional ornamentation. Form and aerodynamic performance fused into a singular carbon-composite sculpture.
        </p>
      </div>

      <div className="tech-divider mb-12" />

      {/* Interactive Design Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Hotspot Selection List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">
            SELECT ENGINEERING FOCUS:
          </div>

          {DESIGN_HOTSPOTS.map((item, idx) => {
            const isSelected = selectedHotspot.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => sound.playHover()}
                className={`text-left p-5 rounded-sm transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white/[0.06] border-[#ff5722] shadow-[0_0_20px_rgba(255,87,34,0.15)]'
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/10 text-neutral-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#ff5722]" />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] tracking-tech text-[#ff5722] uppercase">
                    0{idx + 1} // {item.category}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#ff5722] translate-x-1' : 'text-neutral-400'}`} />
                </div>
                <div className="font-editorial text-lg text-white font-bold uppercase tracking-wide">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Blueprint & Engineering Telemetry */}
        <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-sm relative overflow-hidden">
          {/* Subtle background runway grid */}
          <div className="absolute inset-0 runway-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff5722]" />
                  <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest">
                    SYSTEM: {selectedHotspot.category}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">
                  REF: V1-AERO-{selectedHotspot.id.toUpperCase()}
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4">
                {selectedHotspot.title}
              </h3>

              <p className="font-display text-neutral-300 text-base leading-relaxed mb-8">
                {selectedHotspot.description}
              </p>
            </div>

            {/* Technical Specification Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-3 bg-white/[0.03] border border-white/5 rounded-sm">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">DRAG COEFFICIENT</div>
                <div className="font-mono text-lg font-bold text-white mt-1">0.198 Cd</div>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/5 rounded-sm">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">DOWNFORCE LOAD</div>
                <div className="font-mono text-lg font-bold text-[#ff5722] mt-1">850 KG</div>
              </div>
              <div className="p-3 bg-white/[0.03] border border-white/5 rounded-sm col-span-2 sm:col-span-1">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">MATERIAL GRADE</div>
                <div className="font-mono text-lg font-bold text-white mt-1">T1000G CARBON</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

