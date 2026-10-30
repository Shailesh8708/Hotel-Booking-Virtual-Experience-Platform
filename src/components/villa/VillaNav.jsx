// VILLA AURELIA — Luxury Floating Navigation Bar
// Features Day/Night theme toggle, Mediterranean soundscape toggle, and rolling text hover

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import villaSound from '../../utils/villaAudio';

export default function VillaNav({ theme, onToggleTheme, onOpenBooking, onOpenGallery }) {
  const [isMuted, setIsMuted] = useState(villaSound.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = villaSound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'The Villa', href: '#villa' },
    { label: 'The Spaces', href: '#spaces' },
    { label: 'Essentials', href: '#amenities' },
    { label: 'Sunset', href: '#sunset' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    villaSound.playClick();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[var(--glass-nav)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.18)] shadow-lg'
          : 'py-6 bg-transparent'
      }`}
      style={{
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand & Location */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            villaSound.playClick();
          }}
          className="flex items-center gap-3.5 text-decoration-none group"
        >
          <div className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.22)] flex items-center justify-center font-display text-sm font-semibold text-[var(--color-accent)] bg-[var(--color-accent-soft)] transition-transform duration-300 group-hover:scale-105 shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl md:text-2xl font-normal tracking-tight text-[var(--text-main)]">
              Villa Aurelia
            </span>
            <span className="font-sans text-[10px] tracking-wider uppercase text-[var(--text-muted)] font-medium">
              Punta Aurelia · Southern Italy
            </span>
          </div>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={() => villaSound.playClick()}
              className="font-sans text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors py-1 relative group cursor-pointer bg-transparent border-none"
            >
              <span className="roll">
                <span className="roll-a">{link.label}</span>
                <span className="roll-b" aria-hidden="true">{link.label}</span>
              </span>
            </button>
          ))}
          <button
            onClick={() => {
              villaSound.playClick();
              onOpenGallery();
            }}
            className="font-sans text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors py-1 cursor-pointer bg-transparent border-none"
          >
            <span className="roll">
              <span className="roll-a">All Photos</span>
              <span className="roll-b" aria-hidden="true">All Photos</span>
            </span>
          </button>
        </nav>

        {/* Action Controls: Day/Night, Sound, Booking */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Day / Night Theme Toggle */}
          <button
            onClick={() => {
              villaSound.playSwitch();
              onToggleTheme();
            }}
            title={theme === 'day' ? 'Switch to Night Atmosphere' : 'Switch to Day Atmosphere'}
            className="villa-glass flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-medium text-[var(--text-main)] transition-all cursor-pointer"
          >
            {theme === 'day' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#A85A32]" />
                <span className="hidden sm:inline text-[11px] tracking-wide">Day</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#E07A48]" />
                <span className="hidden sm:inline text-[11px] tracking-wide">Night</span>
              </>
            )}
          </button>

          {/* Coastal Soundscape Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Listen to Coastal Atmosphere' : 'Mute Soundscape'}
            className="villa-glass flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-medium text-[var(--text-main)] transition-all cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span className="hidden sm:inline text-[11px] tracking-wide text-[var(--text-muted)]">Audio Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[var(--color-accent)] animate-pulse" />
                <span className="hidden sm:inline text-[11px] tracking-wide text-[var(--color-accent)]">Sea Waves</span>
              </>
            )}
          </button>

          {/* Primary CTA: Request to Book */}
          <button
            onClick={() => {
              villaSound.playClick();
              onOpenBooking();
            }}
            className="btn-stone text-xs tracking-wide py-2 px-4.5 cursor-pointer shadow-sm"
          >
            <span>Request to book</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--text-main)] villa-glass rounded-full cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[var(--glass-nav)] backdrop-blur-2xl border-b border-[var(--border-subtle)] p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-left font-display text-lg tracking-tight text-[var(--text-main)] hover:text-[var(--color-accent)] py-2 border-b border-[var(--border-subtle)] bg-transparent"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGallery();
            }}
            className="text-left font-display text-lg tracking-tight text-[var(--text-main)] hover:text-[var(--color-accent)] py-2 border-b border-[var(--border-subtle)] bg-transparent"
          >
            All Photos (9 Views)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-stone w-full mt-3 py-3 text-center justify-center"
          >
            Request to book
          </button>
        </div>
      )}
    </header>
  );
}

