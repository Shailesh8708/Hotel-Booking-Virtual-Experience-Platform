// VELOCITY ONE — SECTION E: YOUR VELOCITY
// Interactive vehicle configurator (Paint, Wheels, Calipers, Aero, MSRP Calculation)

import React, { useState } from 'react';
import { Palette, Disc, Shield, ArrowRight, Check, Sparkles } from 'lucide-react';
import { PAINT_FINISHES, WHEEL_OPTIONS, CALIPER_OPTIONS } from '../../utils/carConfig';
import Configurator3DViewer from '../3d/Configurator3DViewer';
import sound from '../../utils/audioEngine';

export default function ConfiguratorSection({
  selectedPaint,
  onSelectPaint,
  selectedWheel,
  onSelectWheel,
  selectedCaliper,
  onSelectCaliper,
  onProceedToCommission,
}) {
  const [activeTab, setActiveTab] = useState('paint'); // 'paint' | 'wheels' | 'calipers'

  // Calculate Bespoke MSRP
  const basePrice = 2450000;
  const paintPrice = selectedPaint.id === 'velocity-orange' ? 35000 : selectedPaint.id === 'cyber-graphite' ? 45000 : 0;
  const wheelPrice = selectedWheel.id === 'carbon-v-spoke' ? 42000 : selectedWheel.id === 'liquid-gold' ? 28000 : 0;
  const caliperPrice = selectedCaliper.id === 'lime' ? 12000 : 8000;
  const totalPrice = basePrice + paintPrice + wheelPrice + caliperPrice;

  const formatPrice = (num) => {
    return '$' + num.toLocaleString('en-US');
  };

  return (
    <section id="configurator" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[#ff5722] tracking-tech uppercase">05 // BESPOKE STUDIO</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            YOUR<br />
            <span className="text-neutral-400">VELOCITY.</span>
          </h2>
        </div>
        <p className="font-display text-neutral-300 max-w-md text-sm sm:text-base font-light leading-relaxed">
          Curate every material. From triple-layer pearl lacquers to high-modulus forged carbon wheels. Changes reflect instantly on the 3D hypercar.
        </p>
      </div>

      <div className="tech-divider mb-10" />

      {/* Embedded Live 3D Turntable Viewer */}
      <div className="mb-10">
        <Configurator3DViewer
          paintColor={selectedPaint.hex}
          wheelColor={selectedWheel.hex}
          caliperColor={selectedCaliper.hex}
          lightMode={{ headlights: true, drl: true, underglow: false }}
        />
      </div>

      {/* Configurator Navigation Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
        {[
          { id: 'paint', label: 'EXTERIOR PAINT', icon: Palette },
          { id: 'wheels', label: 'WHEEL DESIGNS', icon: Disc },
          { id: 'calipers', label: 'BRAKE CALIPERS', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-display text-xs font-semibold tracking-tech uppercase transition-all cursor-pointer border ${
                isActive
                  ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Options Grid & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Swatches */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* TAB 1: PAINTS */}
          {activeTab === 'paint' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PAINT_FINISHES.map((paint) => {
                const isSelected = selectedPaint.id === paint.id;
                return (
                  <button
                    key={paint.id}
                    onClick={() => {
                      sound.playColorSwitch();
                      onSelectPaint(paint);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-5 rounded-sm border text-left transition-all duration-300 relative cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#ff5722] shadow-[0_0_20px_rgba(255,87,34,0.2)]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10'
                    }`}
                  >
                    {/* Color Swatch Circle */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-full border border-white/30 shadow-md"
                        style={{
                          backgroundColor: paint.hex,
                          boxShadow: isSelected ? `0 0 16px ${paint.hex}` : 'none',
                        }}
                      />
                      {isSelected && (
                        <span className="p-1 rounded-full bg-[#ff5722] text-white">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="font-editorial text-base font-bold text-white uppercase mb-1">
                      {paint.name}
                    </div>
                    <div className="font-mono text-[10px] text-[#ff5722] uppercase tracking-wider mb-2">
                      {paint.category}
                    </div>
                    <p className="font-display text-xs text-neutral-400 line-clamp-2">
                      {paint.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 2: WHEELS */}
          {activeTab === 'wheels' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WHEEL_OPTIONS.map((wheel) => {
                const isSelected = selectedWheel.id === wheel.id;
                return (
                  <button
                    key={wheel.id}
                    onClick={() => {
                      sound.playColorSwitch();
                      onSelectWheel(wheel);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-5 rounded-sm border text-left transition-all duration-300 relative cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#ff5722] shadow-[0_0_20px_rgba(255,87,34,0.2)]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center font-mono text-[10px] text-white font-bold"
                        style={{ backgroundColor: wheel.hex }}
                      >
                        21"
                      </div>
                      {isSelected && (
                        <span className="p-1 rounded-full bg-[#ff5722] text-white">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="font-editorial text-base font-bold text-white uppercase mb-1">
                      {wheel.name}
                    </div>
                    <div className="font-mono text-[10px] text-[#ff5722] uppercase tracking-wider mb-2">
                      {wheel.weight}
                    </div>
                    <p className="font-display text-xs text-neutral-400">
                      {wheel.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 3: CALIPERS */}
          {activeTab === 'calipers' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CALIPER_OPTIONS.map((caliper) => {
                const isSelected = selectedCaliper.id === caliper.id;
                return (
                  <button
                    key={caliper.id}
                    onClick={() => {
                      sound.playColorSwitch();
                      onSelectCaliper(caliper);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-5 rounded-sm border text-left transition-all duration-300 relative cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#ff5722] shadow-[0_0_20px_rgba(255,87,34,0.2)]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-8 h-8 rounded-sm border border-white/20 shadow-md"
                        style={{ backgroundColor: caliper.hex }}
                      />
                      {isSelected && (
                        <span className="p-1 rounded-full bg-[#ff5722] text-white">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div className="font-editorial text-sm font-bold text-white uppercase">
                      {caliper.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Build Summary & MSRP Calculator */}
        <div className="lg:col-span-4 glass-panel p-8 rounded-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff5722]">
                BUILD SPECIFICATION
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                SERIES 01 // 100 ALLOCATIONS
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs mb-8">
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">BASE HYPERCAR:</span>
                <span>{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">PAINT ({selectedPaint.name}):</span>
                <span>{paintPrice > 0 ? formatPrice(paintPrice) : 'INCLUDED'}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">WHEELS ({selectedWheel.name}):</span>
                <span>{wheelPrice > 0 ? formatPrice(wheelPrice) : 'INCLUDED'}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">CALIPERS ({selectedCaliper.name}):</span>
                <span>{formatPrice(caliperPrice)}</span>
              </div>
            </div>

            <div className="tech-divider mb-6" />

            <div className="mb-8">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                ESTIMATED BESPOKE MSRP
              </div>
              <div className="font-editorial text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {formatPrice(totalPrice)}
              </div>
              <div className="font-mono text-[10px] text-neutral-400 mt-1">
                * Excludes bespoke delivery and local luxury vehicle registration
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onProceedToCommission();
            }}
            onMouseEnter={() => sound.playHover()}
            className="btn-orange w-full flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>PROCEED TO COMMISSION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
