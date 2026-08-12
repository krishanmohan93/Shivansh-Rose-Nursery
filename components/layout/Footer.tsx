'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { CATEGORY_STRUCTURE } from '@/lib/data/categories';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subError, setSubError] = useState('');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubError('');

    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setSubError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribed(true);
        setNewsletterEmail('');
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      } else {
        setSubError(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setSubError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products Catalogue', href: '/products' },
    { name: 'Garden Services', href: '/services' },
    { name: 'Our Stores', href: '/stores' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900/80 pt-16 pb-10 relative overflow-hidden">
      {/* Subtle Background Foliage Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top Newsletter & Brand Consultation Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-emerald-900/90 border border-emerald-800/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <Leaf className="w-3.5 h-3.5" /> Join Our Green Community
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Get Plant Care Tips &amp; Seasonal Arrival Updates
            </h3>
            <p className="font-body text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Subscribe to receive watering guides, new pot arrival alerts, and exclusive nursery offers directly in your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0 space-y-2">
            {subscribed ? (
              <div className="px-6 py-3.5 rounded-2xl bg-emerald-800 text-emerald-200 border border-emerald-600 text-sm font-semibold flex items-center gap-2 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing to Shivansh Rose Nursery!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  disabled={isSubmitting}
                  className="w-full sm:w-72 px-4 py-3 rounded-xl bg-slate-900/90 border border-emerald-700/80 text-sm text-white placeholder-emerald-300/60 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {subError && (
              <p className="text-xs font-semibold text-rose-300 text-center lg:text-left">
                {subError}
              </p>
            )}
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-4">
          
          {/* Column 1: Brand Story & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-full bg-emerald-800/90 border border-emerald-700 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-white tracking-tight block leading-none">
                  Shivansh Rose Nursery
                </span>
                <span className="font-body text-[11px] tracking-widest uppercase text-emerald-300 font-semibold mt-1 block">
                  Nursery &amp; Garden Care Pune
                </span>
              </div>
            </Link>

            <p className="font-body text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-sm">
              Pune&apos;s trusted nursery brand for 8+ years. Offering 500+ healthy plant varieties, handcrafted ceramic pots, Chinese porcelain planters, and end-to-end society landscaping services across Wakad &amp; Hinjawadi.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/shivanshrosenursery?igsh=dDJ0MDFobnI4cGlk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 border border-emerald-700/80 flex items-center gap-2 text-xs font-semibold text-emerald-200 hover:text-white transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4 text-emerald-400" />
                  <span>@shivanshrosenursery</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-emerald-300 uppercase tracking-wider border-b border-emerald-900 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-emerald-300 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories Tree (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-emerald-300 uppercase tracking-wider border-b border-emerald-900 pb-2">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100">
              {CATEGORY_STRUCTURE.flatMap((group) => group.items).map((item) => (
                <li key={item.slug}>
                  <Link href={item.path} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    <span className="text-emerald-500">•</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Store Locations & Contact Info (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-bold text-sm text-emerald-300 uppercase tracking-wider border-b border-emerald-900 pb-2">
              Store Locations &amp; Contact
            </h4>

            <div className="space-y-3 text-xs text-emerald-100">
              {/* Store 1 */}
              <div className="space-y-1">
                <span className="font-bold text-white block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Main Store — New Wakad
                </span>
                <p className="text-emerald-200/90 leading-relaxed">
                  Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, Pune 411057
                </p>
              </div>

              {/* Store 2 */}
              <div className="space-y-1 pt-1">
                <span className="font-bold text-white block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Second Branch — Hinjewadi Jakatnaka
                </span>
                <p className="text-emerald-200/90 leading-relaxed">
                  Shweta Matka Bhandar &amp; Nursery, Wakad Rd, opp. Madhuban Hotel, Pune 411057
                </p>
              </div>

              {/* Timing & Phone */}
              <div className="pt-2 space-y-1.5 border-t border-emerald-900/80">
                <p className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>8:00 AM – 10:30 PM (All 7 Days)</span>
                </p>
                <p className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>8007634856 / 9175418744 / 7499165488</span>
                </p>
                <p className="flex items-center gap-1.5 text-emerald-300 font-semibold truncate">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">shivanshrosenursery.com@gmail.com</span>
                </p>
              </div>

              <div className="pt-1 flex items-center">
                <Link
                  href="/stores"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
                >
                  <span>Explore Both Store Locations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Secret Hidden Leaf Logo Icon for Nursery Owner Admin Login */}
                <Link
                  href="/admin/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Nursery Owner Portal"
                  className="inline-flex items-center text-emerald-400/60 hover:text-emerald-300 transition-all ml-2.5 p-0.5 rounded"
                >
                  <Leaf className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Terms Bar */}
        <div className="border-t border-emerald-900/90 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400 gap-4">
          <p>© {new Date().getFullYear()} Shivansh Rose Nursery. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-emerald-300">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund &amp; Return Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
