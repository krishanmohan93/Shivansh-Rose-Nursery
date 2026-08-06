import React from 'react';
import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white border-t border-primary-container pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Shivansh Rose Nursery
              </span>
            </Link>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Pune&apos;s trusted premium nursery & garden care brand. Over 500+ plant varieties, luxury planters, and complete society landscape services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-emerald-200 uppercase tracking-wider">
              Quick Catalogue
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li><Link href="/products/plants/indoor" className="hover:text-white transition-colors">Indoor Air Purifiers</Link></li>
              <li><Link href="/products/plants/outdoor" className="hover:text-white transition-colors">Outdoor Flowering Bushes</Link></li>
              <li><Link href="/products/pots/ceramic" className="hover:text-white transition-colors">Ceramic & Chinese Pots</Link></li>
              <li><Link href="/products/pots/fiber" className="hover:text-white transition-colors">Society Fiber Planters</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Landscape & Society Care</Link></li>
            </ul>
          </div>

          {/* Store 1 Details */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-emerald-200 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-400" /> Store 1 — New Wakad
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, Pune 411057
            </p>
            <div className="text-xs text-emerald-200 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5" /> 8:00 AM – 10:30 PM (All 7 Days)
            </div>
          </div>

          {/* Store 2 Details */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-emerald-200 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-400" /> Store 2 — Hinjewadi Jakatnaka
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Shweta Matka Bhandar & Nursery, Wakad Rd, opp. Madhuban Hotel, Pune 411057
            </p>
            <div className="text-xs text-emerald-200 flex items-center gap-1.5 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> 8007634856 / 9175418744
            </div>
            <div className="text-xs text-emerald-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" /> shivanshrosenursery.com@gmail.com
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300 gap-4">
          <p>© {new Date().getFullYear()} Shivansh Rose Nursery. All rights reserved.</p>
          <p className="text-[11px] text-emerald-400">Informational Catalogue Website — Direct Store Pickup & WhatsApp Inquiries</p>
        </div>
      </div>
    </footer>
  );
};
