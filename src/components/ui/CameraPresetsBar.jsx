// VELOCITY ONE — Camera Viewport HUD & Preset Selector

import React from 'react';
import { Camera, Compass, Eye, Sparkles } from 'lucide-react';
import { CAMERA_PRESETS } from '../../utils/carConfig';
import sound from '../../utils/audioEngine';

export default function CameraPresetsBar({
  activePreset,
  onSelectPreset,
  onResetView,
  isRevealed,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-md bg-[#0a0c10]/80 backdrop-blur-xl border border-white/[0.1] shadow-2xl">
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-neutral-400 font-mono text-[10px] tracking-widest uppercase border-r border-white/10">
        <Camera className="w-3.5 h-3.5 text-[#ff5722]" />
        <span>ANGLES</span>
      </div>

      {CAMERA_PRESETS.map((preset) => {
        const isActive = activePreset?.id === preset.id;
        return (
          <button
            key={preset.id}
            onClick={() => {
              sound.playClick();
              onSelectPreset(preset);
            }}
            onMouseEnter={() => sound.playHover()}
            title={preset.description}
            className={`px-3 py-1.5 rounded-sm font-mono text-[11px] tracking-widest uppercase transition-all duration-200 cursor-pointer border ${
              isActive
                ? 'bg-[#ff5722]/20 border-[#ff5722] text-white shadow-[0_0_12px_rgba(255,87,34,0.35)]'
                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        );
      })}

      <button
        onClick={() => {
          sound.playClick();
          onResetView();
        }}
        onMouseEnter={() => sound.playHover()}
        title="Reset camera to default view"
        className="px-3 py-1.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 font-mono text-[11px] tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5"
      >
        <Compass className="w-3 h-3 text-[#ff5722]" />
        <span>RESET</span>
      </button>
    </div>
  );
}

