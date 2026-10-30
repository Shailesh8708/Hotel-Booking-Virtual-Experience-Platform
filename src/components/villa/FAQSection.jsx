// VILLA AURELIA — Frequently Asked Questions
// "Before you ask." — Accordion with smooth expanding answers and plus/minus door mechanics

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../utils/villaData';
import villaSound from '../../utils/villaAudio';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    villaSound.playClick();
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2 block">
          04 // PRACTICAL DETAILS
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-light text-[var(--text-main)] tracking-tight">
          Before you ask.
        </h2>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.q} className="py-6">
              <button
                type="button"
                onClick={() => handleToggle(idx)}
                className="flex w-full items-center justify-between gap-6 text-left text-lg sm:text-xl font-display font-normal text-[var(--text-main)] transition-colors hover:text-[var(--color-accent)] cursor-pointer bg-transparent border-none p-0"
              >
                <span>{faq.q}</span>
                <span className="w-6 h-6 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-main)] shrink-0 transition-transform">
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>

              {isOpen && (
                <div className="pt-4 pb-2 text-sm sm:text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed animate-in fade-in duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

