'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export const FloatingCTAs: React.FC = () => {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918007634856';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Shivansh Rose Nursery! I am visiting your website and would like to inquire about plants and store visiting hours.'
  )}`;

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3.5 items-end pointer-events-auto pb-safe">
      
      {/* Back-to-Top Button (Appears after 300px scroll) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 text-white backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-slate-900 transition-colors border border-slate-700"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phone Call Floating Button */}
      <motion.a
        href="tel:8007634856"
        aria-label="Call Nursery"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-700"
        title="Call Nursery (8007634856)"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </motion.a>

      {/* WhatsApp Floating Button with Micro-Interaction Pulse Ring */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:bg-emerald-500 transition-all duration-300 group relative"
        title="Chat on WhatsApp (8007634856)"
      >
        {/* Pulsing Outer Glow Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping pointer-events-none" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10" />
      </motion.a>

    </div>
  );
};
