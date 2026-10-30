// VELOCITY ONE — Bespoke Commission & Allocation Modal

import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';
import sound from '../../utils/audioEngine';

export default function ReservationModal({
  isOpen,
  onClose,
  selectedPaint,
  selectedWheel,
  selectedCaliper,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('Europe / UK');
  const [confirmed, setConfirmed] = useState(false);
  const [allocationNumber] = useState(() => Math.floor(10 + Math.random() * 89));

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    sound.playReveal();
    setConfirmed(true);
  };

  const handleClose = () => {
    sound.playClick();
    onClose();
    setTimeout(() => {
      setConfirmed(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
      <div className="relative w-full max-w-2xl bg-[#090b10] border border-white/20 p-8 md:p-12 rounded-sm shadow-2xl overflow-hidden">
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors bg-white/[0.05] rounded-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#ff5722] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STRICTLY LIMITED TO 100 CHASSIS WORLDWIDE</span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
              COMMISSION YOUR VELOCITY ONE
            </h3>

            <p className="font-display text-sm text-neutral-300 font-light mb-8">
              Submit your bespoke allocation request. Our Chief Concierge will coordinate with your private representative within 24 hours.
            </p>

            {/* Current Spec Capsule */}
            <div className="p-4 rounded-sm bg-white/[0.03] border border-white/10 mb-8 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">EXTERIOR</div>
                <div className="font-editorial text-xs font-bold text-white mt-1 uppercase">
                  {selectedPaint.name}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">WHEELS</div>
                <div className="font-editorial text-xs font-bold text-white mt-1 uppercase">
                  {selectedWheel.name}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">CALIPERS</div>
                <div className="font-editorial text-xs font-bold text-[#ff5722] mt-1 uppercase">
                  {selectedCaliper.name}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5">
                  FULL NAME / REPRESENTATIVE
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Julian Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 focus:border-[#ff5722] text-white rounded-sm outline-none font-display text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5">
                  CONFIDENTIAL EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="concierge@vance-holdings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 focus:border-[#ff5722] text-white rounded-sm outline-none font-display text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider mb-1.5">
                  PRIMARY DELIVERY REGION
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0c0e14] border border-white/10 focus:border-[#ff5722] text-white rounded-sm outline-none font-display text-sm transition-colors cursor-pointer"
                >
                  <option value="Europe / UK">Europe &amp; United Kingdom</option>
                  <option value="North America">North America (USA &amp; Canada)</option>
                  <option value="Middle East">Middle East (UAE, Saudi Arabia, Qatar)</option>
                  <option value="Asia-Pacific">Asia-Pacific (Japan, Singapore, Australia)</option>
                </select>
              </div>

              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="btn-orange w-full mt-4 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REQUEST ALLOCATION V1-{allocationNumber}/100</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* CONFIRMED COMMISSION CERTIFICATE */
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#ff5722]/20 border border-[#ff5722] flex items-center justify-center mb-6 shadow-xl shadow-[#ff5722]/30">
              <ShieldCheck className="w-8 h-8 text-[#ff5722]" />
            </div>

            <div className="font-mono text-xs text-[#ff5722] tracking-widest uppercase mb-2">
              ALLOCATION CERTIFICATE RESERVED
            </div>

            <h3 className="font-editorial text-3xl font-extrabold text-white uppercase mb-2">
              CONGRATULATIONS, {name.toUpperCase()}
            </h3>

            <p className="font-display text-sm text-neutral-300 max-w-md font-light mb-8">
              Chassis <span className="text-[#ff5722] font-mono font-bold">V1-{allocationNumber}/100</span> has been provisionally reserved under your name for delivery in {region}.
            </p>

            <div className="w-full p-6 rounded-sm bg-white/[0.04] border border-white/15 text-left font-mono text-xs text-neutral-300 mb-8 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>SERIAL NUMBER:</span>
                <span className="text-white font-bold">V1-PROTOTYPE-{allocationNumber}-2026</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>FINISH:</span>
                <span className="text-white">{selectedPaint.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>WHEELS:</span>
                <span className="text-white">{selectedWheel.name}</span>
              </div>
              <div className="flex justify-between">
                <span>CLIENT CONTACT:</span>
                <span className="text-white">{email}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary w-full cursor-pointer"
            >
              <span>RETURN TO EXPLORATION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

