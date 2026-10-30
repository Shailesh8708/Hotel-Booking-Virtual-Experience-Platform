// VILLA AURELIA — Luxury Estate Footer

import React from 'react';
import { ArrowUp, Sun, Moon, Volume2, VolumeX, Mail, Phone, MapPin } from 'lucide-react';
import villaSound from '../../utils/villaAudio';

export default function VillaFooter({ theme, onToggleTheme }) {
  const [isMuted, setIsMuted] = React.useState(villaSound.isMuted);

  const handleToggleSound = () => {
    const muted = villaSound.toggleMute();
    setIsMuted(muted);
  };

  const handleScrollTop = () => {
    villaSound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] pt-20 pb-12 px-6 md:px-12 text-[var(--text-secondary)] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center font-display text-sm font-semibold text-[var(--color-accent)] bg-[var(--color-accent-soft)]">
                A
              </div>
              <span className="font-display text-2xl font-normal text-[var(--text-main)]">
                Villa Aurelia
              </span>
            </div>

            <p className="font-sans text-sm text-[var(--text-muted)] font-light max-w-sm leading-relaxed">
              A private coastal estate above the sea in Southern Italy. Restored with natural limestone, native olive wood, and panoramic sea terraces.
            </p>

            <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>40.2° N, 15.3° E · Punta Aurelia, Cilento</span>
            </div>
          </div>

          {/* Spaces Column */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="font-sans text-xs uppercase tracking-wider text-[var(--text-main)] mb-2 font-semibold">
              The Estate
            </span>
            <a href="#spaces" className="hover:text-[var(--text-main)] transition-colors text-decoration-none text-[var(--text-muted)]">The Living Room</a>
            <a href="#spaces" className="hover:text-[var(--text-main)] transition-colors text-decoration-none text-[var(--text-muted)]">The Kitchen &amp; Cellar</a>
            <a href="#spaces" className="hover:text-[var(--text-main)] transition-colors text-decoration-none text-[var(--text-muted)]">The Master Suite</a>
            <a href="#spaces" className="hover:text-[var(--text-main)] transition-colors text-decoration-none text-[var(--text-muted)]">The Sea Terrace</a>
            <a href="#sunset" className="hover:text-[var(--text-main)] transition-colors text-decoration-none text-[var(--text-muted)]">Sunset Belvedere</a>
          </div>

          {/* Concierge & Contact */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="font-sans text-xs uppercase tracking-wider text-[var(--text-main)] mb-2 font-semibold">
              Private Concierge
            </span>
            <span className="text-[var(--text-muted)]">reservations@villa-aurelia.com</span>
            <span className="text-[var(--text-muted)]">+39 0974 961 884</span>
            <span className="text-[var(--text-muted)]">Local Host: Signor Matteo Rossi</span>
            <span className="text-[var(--text-muted)]">Check-in: 16:00 · Check-out: 10:30</span>
          </div>

          {/* Atmosphere Options */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-sans text-xs uppercase tracking-wider text-[var(--text-main)] mb-2 font-semibold">
              Experience Mode
            </span>
            <button
              onClick={() => {
                villaSound.playSwitch();
                onToggleTheme();
              }}
              className="flex items-center gap-2 text-left hover:text-[var(--text-main)] transition-colors cursor-pointer bg-transparent border-none p-0 text-[var(--text-muted)]"
            >
              {theme === 'day' ? <Sun className="w-3.5 h-3.5 text-[#A85A32]" /> : <Moon className="w-3.5 h-3.5 text-[#E07A48]" />}
              <span>Theme: {theme === 'day' ? 'Day Atmosphere' : 'Night Atmosphere'}</span>
            </button>

            <button
              onClick={handleToggleSound}
              className="flex items-center gap-2 text-left hover:text-[var(--text-main)] transition-colors cursor-pointer bg-transparent border-none p-0 text-[var(--text-muted)]"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" /> : <Volume2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />}
              <span>Coastal Audio: {isMuted ? 'Muted' : 'Active'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            &copy; {new Date().getFullYear()} Villa Aurelia. All rights reserved.
          </div>

          <div className="text-center sm:text-right">
            <span>Cinematic Villa Architecture &amp; Coastal Residence</span>
          </div>

          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] hover:bg-[var(--border-subtle)] transition-all cursor-pointer"
          >
            <span>Top of page</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

