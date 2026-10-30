// VILLA AURELIA — Futuristic Estate Telemetry & Real-Time Audio Oscilloscope
// Displays live environmental sensors, geothermal metrics, and real-time Web Audio frequency visualizer

import React, { useEffect, useRef, useState } from 'react';
import { Activity, Wind, Sun, Compass, Waves, Thermometer, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import villaSound from '../../utils/villaAudio';

export default function EstateTelemetryHUD({ theme = 'day' }) {
  const [expanded, setExpanded] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(!villaSound.isMuted);
  const canvasRef = useRef(null);

  // Subscribe to audio mute/unmute changes
  useEffect(() => {
    const handleAudioChange = (active) => setIsAudioActive(active);
    villaSound.addListener(handleAudioChange);
    return () => villaSound.removeListener(handleAudioChange);
  }, []);

  // Web Audio Waveform / Radar Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.05;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const freqData = villaSound.getFrequencyData();

      if (freqData && freqData.length > 0) {
        // Draw Live Web Audio Frequency Bars
        const barWidth = w / 16;
        for (let i = 0; i < 16; i++) {
          const val = freqData[i * 2] || 0;
          const barHeight = Math.max(2, (val / 255) * h);
          const x = i * barWidth;
          const y = h - barHeight;

          const grad = ctx.createLinearGradient(0, y, 0, h);
          grad.addColorStop(0, theme === 'day' ? '#A85A32' : '#E07A48');
          grad.addColorStop(1, theme === 'day' ? 'rgba(168,90,50,0.2)' : 'rgba(224,122,72,0.2)');

          ctx.fillStyle = grad;
          ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
        }
      } else {
        // Idle ambient gentle wave sine curve
        ctx.beginPath();
        ctx.strokeStyle = theme === 'day' ? 'rgba(168,90,50,0.45)' : 'rgba(224,122,72,0.45)';
        ctx.lineWidth = 1.5;

        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin(x * 0.08 + t) * (h * 0.22) + Math.sin(x * 0.03 - t * 0.7) * (h * 0.15);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [theme, isAudioActive]);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden sm:block font-mono text-[11px]">
      <div className="villa-glass rounded-2xl shadow-xl transition-all duration-300 overflow-hidden">
        {/* Compact Header Bar */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-3 px-3.5 py-2 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors select-none"
        >
          {/* Live Pulse Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
          </span>

          <span className="text-[var(--text-main)] font-semibold tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>ESTATE TELEMETRY</span>
          </span>

          {/* Mini Soundwave Oscilloscope Canvas */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--border-subtle)]/30 border border-[rgba(255,255,255,0.18)]">
            <canvas
              ref={canvasRef}
              width={56}
              height={14}
              className="w-14 h-3.5 block"
            />
            <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
              {isAudioActive ? 'AUDIO ON' : 'IDLE'}
            </span>
          </div>

          <button
            aria-label="Toggle telemetry details"
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors ml-1 bg-transparent border-none p-0 cursor-pointer"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Telemetry Grid */}
        {expanded && (
          <div className="p-3.5 pt-1 border-t border-[rgba(255,255,255,0.15)] grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-[var(--text-secondary)] animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Compass className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span>40°14'38" N, 15°18'44" E</span>
            </div>
            <div className="flex items-center gap-2">
              <Waves className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span>SWELL: 0.35m (CALM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span>SEA TEMP: 24.2°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span>WIND: 8.8 kts WNW</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span>SOLAR FLUX: 840 W/m²</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>GEOTHERMAL: 19.1°C</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

