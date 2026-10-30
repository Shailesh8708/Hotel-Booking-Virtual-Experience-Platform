// VILLA AURELIA — Master Application Orchestrator
// Cinematic Luxury Mediterranean Villa Website Template

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import VillaNav from './components/villa/VillaNav';
import VillaHero from './components/villa/VillaHero';
import SpacesSection from './components/villa/SpacesSection';
import AmenitiesSection from './components/villa/AmenitiesSection';
import SunsetExperience from './components/villa/SunsetExperience';
import TestimonialsSection from './components/villa/TestimonialsSection';
import FAQSection from './components/villa/FAQSection';
import BookingSection from './components/villa/BookingSection';
import VillaFooter from './components/villa/VillaFooter';
import GalleryModal from './components/villa/GalleryModal';
import EstateTelemetryHUD from './components/villa/EstateTelemetryHUD';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('villa-theme') || 'day';
    }
    return 'day';
  });

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('villa-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  const handleOpenBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Smooth Section Reveals
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const sections = ['#spaces', '#amenities', '#sunset', '#faq', '#booking'];
    const triggers = [];

    sections.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        const anim = gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-700">
      {/* Top Subtle Amber Telemetry Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[var(--color-accent)] z-[60] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Glass Navigation */}
      <VillaNav
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenBooking={handleOpenBooking}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Real-Time Live Estate Telemetry & Soundwave Oscilloscope */}
      <EstateTelemetryHUD theme={theme} />

      {/* Main Experience */}
      <main>
        {/* Cinematic Hero with Editorial Typography & Terrace Canvas */}
        <VillaHero
          theme={theme}
          onOpenBooking={handleOpenBooking}
          onOpenGallery={() => setIsGalleryOpen(true)}
        />

        {/* The Spaces & Rooms Showcase */}
        <SpacesSection onOpenGallery={() => setIsGalleryOpen(true)} />

        {/* Amenities & Essentials Bento Grid */}
        <AmenitiesSection />

        {/* Sunset Atmospheric Light Scrubber */}
        <SunsetExperience onOpenBooking={handleOpenBooking} />

        {/* Guest Memories Slider */}
        <TestimonialsSection />

        {/* Frequently Asked Questions Accordion */}
        <FAQSection />

        {/* Booking & Stay Reservation Engine */}
        <BookingSection />
      </main>

      {/* Luxury Estate Footer */}
      <VillaFooter theme={theme} onToggleTheme={toggleTheme} />

      {/* Full-Screen All Photos Lightbox Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
