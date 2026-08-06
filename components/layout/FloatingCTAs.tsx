'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

export const FloatingCTAs: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918007634856';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Shivansh Rose Nursery! I am visiting your website and would like to inquire about plants and store visiting hours.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-auto">
      {/* Phone Call Floating Button */}
      <motion.a
        href="tel:8007634856"
        aria-label="Call Nursery"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Phone className="w-5 h-5 text-white" />
      </motion.a>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-13 h-13 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group relative"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </motion.a>
    </div>
  );
};
