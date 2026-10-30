// VILLA AURELIA — Booking & Reservation Engine
// "Request to book" — Interactive stay calculator and reservation inquiry

import React, { useState } from 'react';
import { Calendar, Users, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import villaSound from '../../utils/villaAudio';

export default function BookingSection({ isOpenDirectModal, onCloseDirectModal }) {
  const [guests, setGuests] = useState(6);
  const [nights, setNights] = useState(7);
  const [season, setSeason] = useState('peak'); // 'peak' | 'early' | 'shoulder'
  const [chefAddon, setChefAddon] = useState(true);
  const [rivaAddon, setRivaAddon] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef] = useState(() => 'VA-' + Math.floor(1000 + Math.random() * 9000));

  // Dynamic Rate Calculation
  const nightlyRates = {
    peak: 1650,
    early: 1450,
    shoulder: 1250,
  };

  const nightlyRate = nightlyRates[season];
  const accommodationTotal = nightlyRate * nights;
  const chefTotal = chefAddon ? 280 * nights : 0;
  const rivaTotal = rivaAddon ? 1800 : 0;
  const touristTax = 2.5 * guests * nights;
  const grandTotal = accommodationTotal + chefTotal + rivaTotal + touristTax;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email) return;
    villaSound.playChime(640, 0.25, 0.08);
    setConfirmed(true);
  };

  return (
    <section id="booking" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="villa-card rounded-3xl p-8 md:p-14 border border-[var(--border-subtle)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form & Addons */}
          <div className="lg:col-span-7">
            <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2 block">
              05 // PRIVATE RESERVATION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[var(--text-main)] tracking-tight mb-4">
              Your summer at Villa Aurelia.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-8">
              Select your travel window and tailored experiences. Our private concierge team will verify availability within 12 hours.
            </p>

            {!confirmed ? (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Season Selector */}
                  <div>
                    <label className="block font-sans text-xs text-[var(--text-muted)] uppercase mb-2 font-medium">
                      Travel Period
                    </label>
                    <select
                      value={season}
                      onChange={(e) => {
                        villaSound.playClick();
                        setSeason(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] text-sm font-sans outline-none cursor-pointer"
                    >
                      <option value="peak">Peak Summer (Jul - Aug)</option>
                      <option value="early">Early Summer (Jun - Sep)</option>
                      <option value="shoulder">Spring &amp; Autumn (Apr - May)</option>
                    </select>
                  </div>

                  {/* Stay Length */}
                  <div>
                    <label className="block font-sans text-xs text-[var(--text-muted)] uppercase mb-2 font-medium">
                      Duration
                    </label>
                    <select
                      value={nights}
                      onChange={(e) => {
                        villaSound.playClick();
                        setNights(Number(e.target.value));
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] text-sm font-sans outline-none cursor-pointer"
                    >
                      <option value="4">4 Nights</option>
                      <option value="7">7 Nights (Full Week)</option>
                      <option value="14">14 Nights (Two Weeks)</option>
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block font-sans text-xs text-[var(--text-muted)] uppercase mb-2 font-medium">
                      Guests (Max 8)
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => {
                        villaSound.playClick();
                        setGuests(Number(e.target.value));
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] text-sm font-sans outline-none cursor-pointer"
                    >
                      {[2, 4, 6, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} Guests
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Add-on Experiences */}
                <div className="pt-2">
                  <span className="block font-sans text-xs text-[var(--text-muted)] uppercase mb-3 font-medium">
                    Bespoke Concierge Additions
                  </span>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--text-main)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={chefAddon}
                          onChange={(e) => {
                            villaSound.playClick();
                            setChefAddon(e.target.checked);
                          }}
                          className="w-4 h-4 accent-[#A85A32]"
                        />
                        <div>
                          <div className="font-sans text-sm font-medium text-[var(--text-main)]">
                            Private Estate Chef
                          </div>
                          <div className="font-sans text-xs text-[var(--text-muted)]">
                            Daily fresh breakfast &amp; 4-course seafood dinners
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-medium text-[var(--color-accent)]">
                        +€280 / day
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--text-main)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={rivaAddon}
                          onChange={(e) => {
                            villaSound.playClick();
                            setRivaAddon(e.target.checked);
                          }}
                          className="w-4 h-4 accent-[#A85A32]"
                        />
                        <div>
                          <div className="font-sans text-sm font-medium text-[var(--text-main)]">
                            Riva Dolceriva 38ft Day Charter
                          </div>
                          <div className="font-sans text-xs text-[var(--text-muted)]">
                            Skippered excursion to Capri &amp; Positano with prosecco
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-medium text-[var(--color-accent)]">
                        +€1,800
                      </span>
                    </label>
                  </div>
                </div>

                {/* Guest Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-sans text-xs text-[var(--text-muted)] uppercase mb-1.5 font-medium">
                      Primary Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Clara Ravenscroft"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--color-accent)] text-[var(--text-main)] text-sm font-sans outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-[var(--text-muted)] uppercase mb-1.5 font-medium">
                      Private Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="clara@ravenscroft-holdings.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--color-accent)] text-[var(--text-main)] text-sm font-sans outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-stone w-full py-4 text-base font-medium justify-center cursor-pointer shadow-lg mt-4"
                >
                  <span>Request to book your dates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Booking Confirmation State */
              <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-accent)] text-center animate-in fade-in duration-500">
                <div className="w-14 h-14 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl text-[var(--text-main)] mb-2 font-normal">
                  Inquiry Dispatched, {fullName}
                </h3>
                <p className="font-sans text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 font-light">
                  Reference <span className="font-mono font-bold text-[var(--color-accent)]">{bookingRef}</span>. Our private concierge will confirm your stay dates and arrange airport chauffeur transfers.
                </p>
                <button
                  onClick={() => setConfirmed(false)}
                  className="btn-stone-outline text-xs py-2 px-5 cursor-pointer"
                >
                  Modify reservation request
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Price Summary */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <div className="font-sans text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 font-semibold">
              STAY CALCULATION
            </div>

            <div className="space-y-3 font-sans text-sm border-b border-[var(--border-subtle)] pb-6 mb-6">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>
                  €{nightlyRate.toLocaleString()} × {nights} nights ({season.toUpperCase()})
                </span>
                <span className="font-mono text-[var(--text-main)]">
                  €{accommodationTotal.toLocaleString()}
                </span>
              </div>

              {chefAddon && (
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Estate Chef Service ({nights} days)</span>
                  <span className="font-mono text-[var(--text-main)]">
                    €{chefTotal.toLocaleString()}
                  </span>
                </div>
              )}

              {rivaAddon && (
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Riva Dolceriva 38ft Charter</span>
                  <span className="font-mono text-[var(--text-main)]">
                    €{rivaTotal.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Regional Tourist Tax ({guests} guests)</span>
                <span className="font-mono text-[var(--text-main)]">
                  €{touristTax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-6">
              <div>
                <span className="block font-sans text-xs text-[var(--text-muted)] uppercase">
                  Estimated Total Stay
                </span>
                <span className="font-display text-3xl sm:text-4xl text-[var(--text-main)] font-light">
                  €{grandTotal.toLocaleString()}
                </span>
              </div>
              <span className="font-sans text-xs text-[var(--text-muted)]">Includes all taxes</span>
            </div>

            <div className="space-y-2 text-xs text-[var(--text-muted)] font-sans border-t border-[var(--border-subtle)] pt-4">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Complimentary chilled estate wine on arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Daily morning housekeeping &amp; terrace preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Private beach path access with chairs &amp; towels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

