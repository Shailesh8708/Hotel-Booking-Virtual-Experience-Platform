// VILLA AURELIA — Amenities & Estate Essentials
// "Everything you need, nothing you don't." — Bento grid architecture

import React, { useState } from 'react';
import { Home, Trees, UtensilsCrossed, Compass, Check, Sparkles } from 'lucide-react';
import { AMENITIES } from '../../utils/villaData';
import villaSound from '../../utils/villaAudio';
import TiltCard from './TiltCard';

export default function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState('inside');

  const categories = [
    { id: 'inside', label: 'Inside', icon: Home, count: AMENITIES.inside.length },
    { id: 'outside', label: 'Outside', icon: Trees, count: AMENITIES.outside.length },
    { id: 'on_request', label: 'On Request', icon: UtensilsCrossed, count: AMENITIES.on_request.length },
    { id: 'around', label: 'Around the House', icon: Compass, count: AMENITIES.around.length },
  ];

  return (
    <section id="amenities" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2 block">
            02 // THE ESSENTIALS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[var(--text-main)] tracking-tight">
            Everything you need,<br />
            <span className="italic text-[var(--text-muted)]">nothing you don't.</span>
          </h2>
        </div>
        <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
          Thoughtfully curated comforts designed to disappear into the background so the sea and stone remain the primary experience.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[var(--border-subtle)] pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                villaSound.playClick();
                setActiveTab(cat.id);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                isActive
                  ? 'bg-[var(--text-main)] text-[var(--bg-canvas)] border-[var(--text-main)] shadow-sm'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[var(--bg-canvas)] text-[var(--text-main)]' : 'bg-[var(--border-subtle)] text-[var(--text-muted)]'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Amenities Cards with 3D Perspective Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AMENITIES[activeTab].map((item, idx) => (
          <TiltCard
            key={item.title}
            className="villa-card p-8 rounded-2xl flex flex-col justify-between"
            maxTilt={9}
            scale={1.025}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-accent)] font-semibold">
                  0{idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-60" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-normal text-[var(--text-main)] mb-2">
                {item.title}
              </h3>
            </div>
            <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed font-light mt-4">
              {item.desc}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

