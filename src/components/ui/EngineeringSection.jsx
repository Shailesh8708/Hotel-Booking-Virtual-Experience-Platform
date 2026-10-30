// VELOCITY ONE — SECTION C: ENGINEERED TO INSPIRE
// Three premium editorial feature panels with custom technical diagrams

import React, { useState } from 'react';
import { Wind, Cpu, Battery, Eye, CheckCircle2 } from 'lucide-react';
import sound from '../../utils/audioEngine';

export default function EngineeringSection() {
  const [activeTab, setActiveTab] = useState(0);

  const panels = [
    {
      id: 'aero',
      number: '01',
      title: 'ACTIVE DUAL-STAGE AERODYNAMICS',
      subtitle: 'Zero Parasitic Drag. 850kg Sucking Downforce.',
      description:
        'Velocity One harnesses active underbody venturi tunnels that compress incoming air to generate true ground-effect suction. Under high-speed deceleration, the twin-element rear wing deploys at 45 degrees in 120 milliseconds, functioning as an aerodynamic airbrake that adds 420kg of stabilizing vertical load.',
      specs: [
        { label: 'DRAG COEFFICIENT', val: '0.198 Cd' },
        { label: 'AIRBRAKE DEPLOY', val: '120 ms' },
        { label: 'ACTIVE FLAPS', val: '6 Zones' },
      ],
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          {/* Car Silhouette Silhouette Line */}
          <path d="M40 180 C80 180, 110 160, 150 140 C200 115, 260 115, 300 145 C340 165, 360 180, 380 180" stroke="#ff5722" strokeWidth="2.5" strokeDasharray="6 3" />
          <path d="M20 185 L390 185" stroke="#334155" strokeWidth="1" />
          {/* Airflow streamlines */}
          <path d="M10 130 C70 130, 140 100, 220 90 C300 80, 360 100, 390 110" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M10 150 C80 150, 160 120, 230 110 C300 100, 350 120, 390 130" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.5" />
          <path d="M10 195 C120 195, 200 190, 280 175 C330 165, 360 155, 390 150" stroke="#ff5722" strokeWidth="2" strokeOpacity="0.8" />
          {/* Venturi suction arrow */}
          <circle cx="240" cy="185" r="4" fill="#ff5722" />
          <text x="250" y="190" fill="#ff5722" fontSize="9" fontFamily="JetBrains Mono">VENTURI VACUUM ZONE</text>
        </svg>
      ),
    },
    {
      id: 'cockpit',
      number: '02',
      title: 'INTELLIGENT NEURAL COCKPIT',
      subtitle: 'Retinal HUD Projection & Biometric Telemetry.',
      description:
        'Inside the mono-cell cabin, conventional dials and secondary touchscreens are eliminated. A continuous 120Hz retinal laser projection overlays racing lines, braking vectors, and battery thermal topography directly into the driver’s peripheral horizon. The tactile yoke is milled from single-block forged aerospace carbon.',
      specs: [
        { label: 'DISPLAY LATENCY', val: '< 2.5 ms' },
        { label: 'PROJECTION FIELD', val: '48° FOV' },
        { label: 'HAPTIC PRECISION', val: 'Sub-millimeter' },
      ],
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          {/* Cockpit HUD Crosshair & Vector Arc */}
          <circle cx="200" cy="120" r="75" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="120" r="45" stroke="#ff5722" strokeWidth="1.5" strokeOpacity="0.8" />
          <line x1="120" y1="120" x2="280" y2="120" stroke="#ff5722" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="200" y1="40" x2="200" y2="200" stroke="#ff5722" strokeWidth="1" strokeOpacity="0.5" />
          {/* Horizon Pitch Ladder */}
          <line x1="160" y1="90" x2="240" y2="90" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="170" y1="150" x2="230" y2="150" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" />
          <text x="140" y="70" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">G-VECTOR: 1.82 G LATERAL</text>
          <text x="150" y="215" fill="#ff5722" fontSize="9" fontFamily="JetBrains Mono">APEX TARGET: LOCKED</text>
        </svg>
      ),
    },
    {
      id: 'powertrain',
      number: '03',
      title: 'SOLID-STATE 800V POWERTRAIN',
      subtitle: 'Sub-floor Silicon Carbide Inverters.',
      description:
        'Structural solid-state battery cells form the core floor of the monocoque, lowering the vehicle center of gravity to just 340mm from the tarmac. Silicon-carbide MOSFET inverters switch at 40kHz, ensuring immediate torque response at each wheel with zero loss and unmatched thermal endurance during track laps.',
      specs: [
        { label: 'CHARGE (10-80%)', val: '12 min' },
        { label: 'SYSTEM VOLTAGE', val: '800 V' },
        { label: 'ENERGY DENSITY', val: '450 Wh/kg' },
      ],
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          {/* Chassis outline with 4 motors */}
          <rect x="130" y="40" width="140" height="160" rx="12" stroke="#334155" strokeWidth="1.5" />
          <rect x="150" y="70" width="100" height="100" rx="4" fill="#ff5722" fillOpacity="0.1" stroke="#ff5722" strokeWidth="1" />
          {/* 4 Corner Motors */}
          <rect x="100" y="55" width="26" height="35" rx="3" fill="#60a5fa" />
          <rect x="274" y="55" width="26" height="35" rx="3" fill="#60a5fa" />
          <rect x="100" y="150" width="26" height="35" rx="3" fill="#60a5fa" />
          <rect x="274" y="150" width="26" height="35" rx="3" fill="#60a5fa" />
          {/* Power buses */}
          <line x1="126" y1="72" x2="150" y2="90" stroke="#ff5722" strokeWidth="2" />
          <line x1="274" y1="72" x2="250" y2="90" stroke="#ff5722" strokeWidth="2" />
          <line x1="126" y1="168" x2="150" y2="150" stroke="#ff5722" strokeWidth="2" />
          <line x1="274" y1="168" x2="250" y2="150" stroke="#ff5722" strokeWidth="2" />
          <text x="145" y="125" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono">800V SOLID STATE</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="engineering" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#ff5722] tracking-tech uppercase">03 // TECHNOLOGICAL MASTERY</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            ENGINEERED<br />
            <span className="text-neutral-400">TO INSPIRE.</span>
          </h2>
        </div>
        <p className="font-display text-neutral-300 max-w-md text-sm sm:text-base font-light leading-relaxed">
          Three technological pillars engineered without compromise. From active aerodynamic venturi tunnels to sub-floor solid-state batteries.
        </p>
      </div>

      <div className="tech-divider mb-12" />

      {/* Tabs / Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {panels.map((panel, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={panel.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(idx);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`p-6 text-left rounded-sm transition-all duration-300 border cursor-pointer ${
                isActive
                  ? 'bg-white/[0.08] border-[#ff5722] shadow-[0_0_25px_rgba(255,87,34,0.18)]'
                  : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/10 text-neutral-400'
              }`}
            >
              <div className="font-mono text-xs text-[#ff5722] mb-1">
                MODULE // {panel.number}
              </div>
              <div className="font-editorial text-lg text-white font-bold uppercase tracking-wide">
                {panel.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Selected Editorial Feature Card */}
      <div className="glass-panel p-8 md:p-12 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text & Specs */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#ff5722] tracking-widest uppercase mb-2">
              FEATURE SPECIFICATION // {panels[activeTab].number}
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
              {panels[activeTab].title}
            </h3>
            <div className="font-display text-sm text-[#ff9100] tracking-wide mb-6">
              {panels[activeTab].subtitle}
            </div>
            <p className="font-display text-neutral-300 text-base leading-relaxed mb-8 font-light">
              {panels[activeTab].description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            {panels[activeTab].specs.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="font-editorial text-xl sm:text-2xl font-bold text-white mt-1">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Visual Blueprint Diagram */}
        <div className="lg:col-span-5 bg-black/50 p-6 rounded-sm border border-white/10 relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-3 right-4 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
            CAD BLUEPRINT // SCHEMATIC
          </div>
          <div className="w-full">
            {panels[activeTab].diagram}
          </div>
        </div>
      </div>
    </section>
  );
}

