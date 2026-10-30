// VILLA AURELIA — Sunset Atmospheric Experience
// "Stay for the sunset." — Interactive golden hour lighting scrubber

import React, { useState } from 'react';
import { Sun, Moon, Clock, Compass, Sparkles } from 'lucide-react';
import villaSound from '../../utils/villaAudio';

export default function SunsetExperience({ onOpenBooking }) {
  const [hourProgress, setHourProgress] = useState(50); // 0 (17:30) to 100 (22:00)

  // Map progress to time and lighting
  const times = [
    { label: '18:00', tone: 'Golden Ochre', temp: '26°C', desc: 'Direct honey sunlight illuminates the west stone facade and warming terrace flags.' },
    { label: '19:15', tone: 'Deep Amber Gold', temp: '24°C', desc: 'The sun drops behind the sea horizon, casting long olive tree shadows over the cove.' },
    { label: '20:30', tone: 'Coral & Violet Twilight', temp: '22°C', desc: 'The sky turns to burnt orange and soft violet. Lanterns flicker on along the stone balustrades.' },
    { label: '21:45', tone: 'Nocturnal Starlit Indigo', temp: '20°C', desc: 'Absolute coastal calm. The distant lighthouses of Capri sweep across the Tyrrhenian waters.' },
  ];

  const currentStage =
    hourProgress < 25
      ? times[0]
      : hourProgress < 50
      ? times[1]
      : hourProgress < 75
      ? times[2]
      : times[3];

  // Dynamic filter values based on scrubber
  const brightness = 1.05 - (hourProgress / 100) * 0.45;
  const sepia = Math.sin((hourProgress / 100) * Math.PI) * 0.4;
  const hueRotate = -(hourProgress / 100) * 20;

  return (
    <section id="sunset" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Card */}
      <div className="relative rounded-3xl overflow-hidden villa-card p-8 md:p-16 flex flex-col justify-between min-h-[560px]">
        {/* Dynamic Sunset Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/tramonto-1600.webp"
            alt="Villa Aurelia Sunset Horizon"
            style={{
              filter: `brightness(${brightness}) sepia(${sepia}) hue-rotate(${hueRotate}deg)`,
            }}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md font-sans text-xs">
            <Sun className="w-3.5 h-3.5 text-[#E07A48]" />
            <span>MEDITERRANEAN HORIZON SCRUBBER</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-white/80">
            <span>TEMP: {currentStage.temp}</span>
            <span>TONE: {currentStage.tone}</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-2xl my-12 text-white">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-4">
            Stay for the sunset.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-200 font-light leading-relaxed mb-6">
            {currentStage.desc}
          </p>

          <button
            onClick={() => {
              villaSound.playClick();
              onOpenBooking();
            }}
            className="btn-stone cursor-pointer shadow-lg"
          >
            <span>Reserve your stay</span>
          </button>
        </div>

        {/* Bottom Interactive Scrubber Bar */}
        <div className="relative z-10 w-full pt-6 border-t border-white/20 text-white flex flex-col gap-3">
          <div className="flex items-center justify-between font-sans text-xs text-neutral-300">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Drag to scrub coastal light (18:00 - 22:00)</span>
            </span>
            <span className="font-mono font-medium text-white text-sm">{currentStage.label}</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={hourProgress}
            onChange={(e) => {
              setHourProgress(Number(e.target.value));
            }}
            className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#E07A48]"
          />
        </div>
      </div>
    </section>
  );
}

