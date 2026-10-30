// VILLA AURELIA — Guest Memories & Testimonials
// "What our guests remember." — Interactive quote slider with pause control

import React, { useState, useEffect } from 'react';
import { Pause, Play, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/villaData';
import villaSound from '../../utils/villaAudio';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTogglePause = () => {
    villaSound.playClick();
    setIsPaused(!isPaused);
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2 block">
            03 // GUEST MEMORIES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-light text-[var(--text-main)] tracking-tight">
            What our guests remember.
          </h2>
        </div>

        {/* Pause / Resume Button */}
        <button
          onClick={handleTogglePause}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer self-start md:self-auto"
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <Pause className="w-3.5 h-3.5" />}
          <span>{isPaused ? 'Resume reviews' : 'Pause the reviews'}</span>
        </button>
      </div>

      {/* Main Quote Card */}
      <div className="villa-card p-10 md:p-16 rounded-3xl relative overflow-hidden transition-all duration-700">
        <Quote className="w-12 h-12 text-[var(--color-accent)] opacity-20 absolute top-8 right-8" />

        <div className="max-w-3xl">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-[var(--text-main)] leading-relaxed mb-8 italic">
            "{testimonial.quote}"
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
            <div>
              <div className="font-display text-xl text-[var(--text-main)] font-normal">
                {testimonial.author}
              </div>
              <div className="font-sans text-xs text-[var(--text-muted)] font-light mt-0.5">
                {testimonial.origin} · {testimonial.stay}
              </div>
            </div>

            {/* Indicator dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    villaSound.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-[var(--color-accent)]'
                      : 'w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

