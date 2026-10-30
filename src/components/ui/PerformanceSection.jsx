// VELOCITY ONE — SECTION B: PERFORMANCE
// "INSTANT. INTELLIGENT. ELECTRIC." — Animated telemetry and interactive Launch Control simulation

import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Flame, Timer, Activity, BatteryCharging } from 'lucide-react';
import { TECH_SPECS } from '../../utils/carConfig';
import sound from '../../utils/audioEngine';

export default function PerformanceSection() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [launchComplete, setLaunchComplete] = useState(false);

  // Launch Control Simulation
  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setLaunchComplete(false);
    setSpeed(0);

    sound.playReveal();

    const startTime = performance.now();
    const duration = 1740; // 1.74 seconds

    const animateSpeed = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Exponential electric acceleration curve
      const currentSpeed = Math.floor(Math.pow(progress, 1.2) * 60);
      setSpeed(currentSpeed);

      if (progress < 1) {
        requestAnimationFrame(animateSpeed);
      } else {
        setSpeed(60);
        setIsLaunching(false);
        setLaunchComplete(true);
        sound.playChime(880, 0.2, 'sine', 0.08);
      }
    };

    requestAnimationFrame(animateSpeed);
  };

  return (
    <section id="performance" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#ff5722] tracking-tech uppercase">02 // CONCEPT PERFORMANCE BENCHMARKS</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            INSTANT. INTELLIGENT.<br />
            <span className="text-neutral-400">ELECTRIC.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          <p className="font-display text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            Four independent permanent-magnet motors delivering instantaneous torque vectoring. Illustrative concept targets engineered for the limits of physical adhesion.
          </p>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            * Fictional concept figures benchmarked in virtual wind tunnels
          </span>
        </div>
      </div>

      <div className="tech-divider mb-12" />

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {TECH_SPECS.map((spec) => (
          <div
            key={spec.label}
            className="glass-panel p-6 rounded-sm flex flex-col justify-between hover:border-[#ff5722]/50 transition-colors"
          >
            <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-4">
              {spec.label}
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {spec.value}
                </span>
                <span className="font-mono text-xs text-[#ff5722] font-semibold">
                  {spec.unit}
                </span>
              </div>
              <div className="font-display text-[11px] text-neutral-400 mt-2">
                {spec.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Launch Control Telemetry Box */}
      <div className="glass-panel-glow p-8 md:p-10 rounded-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 font-mono text-xs text-[#ff5722] tracking-widest uppercase">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>VIRTUAL ACCELERATION SIMULATOR</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white uppercase mb-2">
              EXPERIENCE 1.74 SECONDS TO 60 MPH
            </h3>
            <p className="font-display text-sm text-neutral-300 font-light">
              Engage Launch Control to experience the acoustic frequency shift and instant electric power delivery of the Velocity One quad-motor powertrain.
            </p>
          </div>

          {/* Speedometer & Launch Trigger */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center justify-center w-36 h-36 rounded-full border-2 border-white/10 bg-black/40 relative shadow-inner">
              <div className="font-editorial text-4xl font-extrabold text-white tracking-tight">
                {speed}
              </div>
              <div className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                MPH
              </div>
              {isLaunching && (
                <div className="absolute inset-0 rounded-full border-2 border-[#ff5722] border-t-transparent animate-spin" />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleLaunch}
                disabled={isLaunching}
                onMouseEnter={() => sound.playHover()}
                className={`px-6 py-3.5 rounded-sm font-display text-xs font-bold tracking-tech uppercase transition-all duration-300 border cursor-pointer ${
                  isLaunching
                    ? 'bg-[#ff5722]/30 border-[#ff5722] text-white animate-pulse'
                    : 'bg-[#ff5722] hover:bg-[#ff6b3d] border-transparent text-white shadow-lg shadow-[#ff5722]/30'
                }`}
              >
                {isLaunching ? 'SPOOLING MOTORS...' : launchComplete ? 'LAUNCH AGAIN' : 'ENGAGE LAUNCH CONTROL'}
              </button>

              <div className="font-mono text-[10px] text-neutral-400 text-center tracking-widest">
                {launchComplete ? 'BENCHMARK: 1.74s ACHIEVED' : 'HOLD FOR FULL TORQUE RELEASE'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

