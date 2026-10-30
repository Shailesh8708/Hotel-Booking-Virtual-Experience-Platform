// VILLA AURELIA — Full-Screen Photo Gallery Lightbox
// Filter by category, inspect high-resolution architecture photography

import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { GALLERY_PHOTOS } from '../../utils/villaData';
import villaSound from '../../utils/villaAudio';

export default function GalleryModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!isOpen) return null;

  const categories = ['All', 'Terrace', 'Living', 'Kitchen', 'Bedrooms', 'Grounds'];

  const filtered =
    activeCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-[var(--text-main)] font-light">
              Villa Aurelia Gallery
            </h3>
            <span className="font-sans text-xs text-[var(--text-muted)]">
              9 Verified Photographic Perspectives
            </span>
          </div>

          <button
            onClick={() => {
              villaSound.playClick();
              onClose();
            }}
            className="p-2.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 sm:px-8 py-3 border-b border-[var(--border-subtle)] flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                villaSound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-[var(--text-main)] text-[var(--bg-canvas)] border-[var(--text-main)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setZoomedImage(photo)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] bg-neutral-900 shadow-sm"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                <div>
                  <div className="font-display text-base font-light">{photo.title}</div>
                  <div className="font-sans text-xs text-neutral-300">{photo.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single Zoomed Photo Modal */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={zoomedImage.src}
            alt={zoomedImage.title}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
          <div className="text-white text-center mt-4">
            <div className="font-display text-xl">{zoomedImage.title}</div>
            <div className="font-sans text-xs text-neutral-400 mt-1">Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
}

