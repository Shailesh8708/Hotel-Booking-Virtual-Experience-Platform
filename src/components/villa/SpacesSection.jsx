// VILLA AURELIA — The Spaces & Architecture Showcase
// Interactive room switcher with high-resolution photography, architectural specs, and dual views

import React, { useState } from 'react';
import { Maximize2, Compass, Eye, Sparkles, Check } from 'lucide-react';
import { VILLA_SPACES } from '../../utils/villaData';
import villaSound from '../../utils/villaAudio';
import TiltCard from './TiltCard';

export default function SpacesSection({ onOpenGallery }) {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const [showSecondaryView, setShowSecondaryView] = useState(false);

  const space = VILLA_SPACES[activeSpaceIndex];

  const handleSelectSpace = (idx) => {
    villaSound.playClick();
    setActiveSpaceIndex(idx);
    setShowSecondaryView(false);
  };

  const handleToggleView = () => {
    villaSound.playSwitch();
    setShowSecondaryView(!showSecondaryView);
  };

  return (
    <section id="spaces" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2 block">
            01 // ARCHITECTURAL INTERIORS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[var(--text-main)] tracking-tight">
            The Spaces
          </h2>
        </div>
        <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
          Four distinct living realms carved from historic coastal stone. Floor-to-ceiling iron casements, hand-laid limestone, and sea breezes.
        </p>
      </div>

      {/* Space Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[var(--border-subtle)] pb-4">
        {VILLA_SPACES.map((item, idx) => {
          const isActive = idx === activeSpaceIndex;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectSpace(idx)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                isActive
                  ? 'bg-[var(--text-main)] text-[var(--bg-canvas)] border-[var(--text-main)] shadow-sm'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Main Architectural Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Interactive Image Viewport */}
        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden villa-card group min-h-[420px] sm:min-h-[520px] flex flex-col justify-between p-6">
          <img
            src={showSecondaryView ? space.secondaryImage : space.image}
            alt={space.name}
            key={showSecondaryView ? `${space.id}-sec` : `${space.id}-pri`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 filter brightness-[0.98] group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Floating Controls */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-black/50 text-white font-sans text-xs tracking-wide backdrop-blur-md border border-white/20">
              {space.floor} · {space.size}
            </span>

            <button
              onClick={handleToggleView}
              className="px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-black font-sans text-xs font-medium tracking-wide shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>{showSecondaryView ? 'View Main Angle' : 'View Alternate Angle'}</span>
            </button>
          </div>

          {/* Bottom Floating Caption */}
          <div className="relative z-10 text-white">
            <div className="font-display text-2xl sm:text-3xl font-light mb-1 drop-shadow-md">
              {space.name}
            </div>
            <div className="font-sans text-xs sm:text-sm text-neutral-200 font-light flex items-center gap-2 drop-shadow-sm">
              <Compass className="w-3.5 h-3.5 text-neutral-300" />
              <span>Horizon: {space.view}</span>
            </div>
          </div>
        </div>

        {/* Right: Architectural Narrative & Specifications (with 3D Perspective Tilt) */}
        <TiltCard
          className="lg:col-span-5 villa-card p-8 sm:p-10 rounded-2xl flex flex-col justify-between"
          maxTilt={6}
          scale={1.015}
        >
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3">
              SPACE PROFILE // 0{activeSpaceIndex + 1}
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-light text-[var(--text-main)] mb-3 leading-tight">
              {space.name}
            </h3>

            <p className="font-display text-base italic text-[var(--text-muted)] mb-6">
              "{space.subtitle}"
            </p>

            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light mb-8">
              {space.description}
            </p>

            {/* Highlights List */}
            <div className="space-y-3 mb-8">
              {space.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm text-[var(--text-main)] font-sans">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <div>
              <div className="font-sans text-xs text-[var(--text-muted)] uppercase">Interior Area</div>
              <div className="font-display text-2xl font-light text-[var(--text-main)]">{space.size}</div>
            </div>

            <button
              onClick={() => {
                villaSound.playClick();
                onOpenGallery();
              }}
              className="btn-stone-outline text-xs py-2 px-5 cursor-pointer"
            >
              <span>View in gallery</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

