// VELOCITY ONE — Luxury Automotive Navigation Bar

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Menu, X, ArrowUpRight } from 'lucide-react';
import sound from '../../utils/audioEngine';

export default function Navigation({ isRevealed, onReplayReveal, onOpenReserve }) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'THE MACHINE', href: '#machine' },
    { label: 'PERFORMANCE', href: '#performance' },
    { label: 'ENGINEERING', href: '#engineering' },
    { label: 'LIGHT SIGNATURE', href: '#lighting' },
    { label: 'CONFIGURATOR', href: '#configurator' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    sound.playClick();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Identity */}
        <a
          href="#hero"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group text-decoration-none"
        >
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#ff5722] to-[#b91c1c] flex items-center justify-center shadow-lg shadow-[#ff5722]/30 transition-transform duration-300 group-hover:scale-105">
            <span className="font-editorial font-bold text-white text-base tracking-tighter">V1</span>
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg md:text-xl font-bold tracking-widest text-white">
              VELOCITY<span className="text-[#ff5722] ml-1.5 font-light">ONE</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase hidden sm:block">
              ELECTRIC HYPERCAR
            </span>
          </div>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={() => sound.playHover()}
              className="font-display text-xs tracking-tech text-neutral-300 hover:text-white transition-colors py-1 relative group cursor-pointer bg-transparent border-none"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff5722] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => sound.playHover()}
            title={isMuted ? 'Unmute Audio Experience' : 'Mute Audio'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] text-xs font-mono text-neutral-300 transition-all cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline text-[10px] tracking-widest uppercase">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#ff5722] animate-pulse" />
                <span className="hidden sm:inline text-[10px] tracking-widest text-[#ff5722] uppercase">AUDIO ACTIVE</span>
              </>
            )}
          </button>

          {/* Replay Reveal (Visible when car is unveiled) */}
          {isRevealed && (
            <button
              onClick={() => {
                sound.playClick();
                onReplayReveal();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] text-xs font-mono text-neutral-200 transition-all cursor-pointer"
              title="Replay Cinematic Unveil Sequence"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#ff5722]" />
              <span className="hidden sm:inline text-[10px] tracking-widest uppercase">REPLAY REVEAL</span>
            </button>
          )}

          {/* Reserve / Commission Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenReserve();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff5722] to-[#ea580c] hover:from-[#ff6b3d] hover:to-[#f97316] text-white font-display text-xs font-semibold tracking-tech uppercase rounded-sm shadow-md shadow-[#ff5722]/25 transition-all cursor-pointer border-none"
          >
            <span>RESERVE V1</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white bg-white/[0.05] border border-white/10 rounded-sm cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#07080c]/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-left font-display text-sm tracking-widest text-neutral-200 hover:text-[#ff5722] py-2 border-b border-white/5 bg-transparent"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReserve();
            }}
            className="w-full mt-2 py-3 bg-[#ff5722] text-white font-display text-xs font-semibold tracking-widest uppercase rounded-sm text-center"
          >
            RESERVE VELOCITY ONE
          </button>
        </div>
      )}
    </header>
  );
}

