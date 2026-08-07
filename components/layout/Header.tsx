'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  Search,
  ChevronDown,
  Leaf,
  Sparkles,
  Box,
  Droplets,
  Flame,
  Smile,
  Crown,
  Shield,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CATEGORY_STRUCTURE } from '@/lib/data/categories';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMegaOpen, setProductsMegaOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);

    const el = document.getElementById('products-search-input');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (el as HTMLInputElement).focus();
    } else {
      router.push('/products?focusSearch=true');
    }
  };

  // Global keyboard shortcut (Ctrl+K or /) to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  const iconMap: Record<string, React.ReactNode> = {
    indoor: <Leaf className="w-4 h-4 text-emerald-600" />,
    outdoor: <Sparkles className="w-4 h-4 text-amber-600" />,
    ceramic: <Sparkles className="w-4 h-4 text-sky-600" />,
    'chinese-premium': <Crown className="w-4 h-4 text-amber-500" />,
    plastic: <Box className="w-4 h-4 text-indigo-600" />,
    fiber: <Shield className="w-4 h-4 text-teal-600" />,
    'soil-mitti': <Globe className="w-4 h-4 text-orange-700" />,
    'diwali-decoration': <Flame className="w-4 h-4 text-orange-500" />,
    'water-fountains': <Droplets className="w-4 h-4 text-cyan-600" />,
    'ganpati-murti': <Smile className="w-4 h-4 text-rose-600" />,
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products', isMega: true },
    { name: 'Garden Services', href: '/services' },
    { name: 'Our Stores', href: '/stores' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white border-b border-gray-200 h-20 sm:h-22 md:h-24 flex items-center ${
        isScrolled ? 'shadow-md bg-white/98 backdrop-blur-md' : 'shadow-xs bg-white'
      }`}
    >
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 flex items-center justify-between">
        
        {/* LEFT SECTION: Logo & Company Name (Fixed Left, Never Shrinks) */}
        <Link href="/" className="flex items-center gap-3.5 sm:gap-4 shrink-0 group">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
            <Leaf className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="shrink-0">
            <span className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight block leading-none">
              Shivansh Rose Nursery
            </span>
            <span className="font-body text-[11px] sm:text-xs tracking-widest uppercase text-slate-500 font-semibold mt-1 block">
              Nursery &amp; Garden Care
            </span>
          </div>
        </Link>

        {/* CENTER SECTION: Perfectly Centered Menu Links with 32-40px Spacing */}
        <nav className="hidden lg:flex items-center justify-center gap-8 lg:gap-10 mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/products' && pathname.startsWith('/products'));

            if (link.isMega) {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setProductsMegaOpen(true)}
                  onMouseLeave={() => setProductsMegaOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-primary font-bold' : 'text-slate-700 hover:text-primary'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-primary transition-transform duration-300 group-hover:rotate-180" />

                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Desktop Multi-Column Mega Menu */}
                  <AnimatePresence>
                    {productsMegaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full -left-48 w-[820px] mt-2 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 z-50 grid grid-cols-3 gap-6"
                      >
                        {CATEGORY_STRUCTURE.map((group) => (
                          <div key={group.groupSlug} className="space-y-3">
                            <div className="border-b border-gray-100 pb-2">
                              <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wider">
                                {group.groupName}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                {group.description}
                              </p>
                            </div>

                            <div className="space-y-1">
                              {group.items.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={item.path}
                                  onClick={() => setProductsMegaOpen(false)}
                                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-primary transition-colors duration-200 group/item"
                                >
                                  <div className="mt-0.5 p-1 rounded-md bg-slate-100 group-hover/item:bg-white shrink-0">
                                    {iconMap[item.slug] || <Leaf className="w-4 h-4 text-emerald-600" />}
                                  </div>
                                  <div>
                                    <span className="text-xs font-semibold block leading-tight">
                                      {item.name}
                                    </span>
                                    <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                      {item.description}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-body text-sm font-semibold py-2 transition-colors duration-300 ${
                  isActive ? 'text-primary font-bold' : 'text-slate-700 hover:text-primary'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SECTION: Search Icon + WhatsApp Button with 20-24px Spacing */}
        <div className="hidden sm:flex items-center gap-5 lg:gap-6 shrink-0">
          <button
            onClick={handleSearchClick}
            aria-label="Search catalogue"
            className="p-2.5 text-slate-700 hover:text-primary hover:bg-slate-100 rounded-full transition-colors duration-300 flex items-center group"
            title="Focus search bar (Ctrl+K)"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
          <a
            href="https://wa.me/918007634856"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="primary" className="shadow-md px-5 py-2.5 text-sm" icon={<Phone className="w-4 h-4" />}>
              WhatsApp Enquiry
            </Button>
          </a>
        </div>

        {/* MOBILE & TABLET ACTION CONTROLS */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={handleSearchClick}
            aria-label="Search catalogue"
            className="p-2 text-slate-700 hover:text-primary hover:bg-slate-100 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-primary hover:bg-emerald-50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl max-h-[85vh] overflow-y-auto z-40"
          >
            <div className="px-6 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-body text-base font-semibold text-slate-800 hover:text-primary py-2 border-b border-gray-100"
              >
                Home
              </Link>

              {/* Mobile Products Accordion */}
              <div className="border-b border-gray-100 py-2">
                <button
                  onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                  className="w-full flex items-center justify-between font-body text-base font-semibold text-slate-800 hover:text-primary"
                >
                  <span>Products Catalogue</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      mobileAccordionOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileAccordionOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-3 pt-3 space-y-4 overflow-hidden"
                    >
                      {CATEGORY_STRUCTURE.map((group) => (
                        <div key={group.groupSlug} className="space-y-1.5">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                            {group.groupName}
                          </span>
                          <div className="pl-2 space-y-1 border-l-2 border-primary/20">
                            {group.items.map((item) => (
                              <Link
                                key={item.slug}
                                href={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-xs font-medium text-slate-700 hover:text-primary py-1"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-body text-base font-semibold text-slate-800 hover:text-primary py-2 border-b border-gray-100"
              >
                Garden Services
              </Link>
              <Link
                href="/stores"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-body text-base font-semibold text-slate-800 hover:text-primary py-2 border-b border-gray-100"
              >
                Our Stores
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-body text-base font-semibold text-slate-800 hover:text-primary py-2 border-b border-gray-100"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-body text-base font-semibold text-slate-800 hover:text-primary py-2 border-b border-gray-100"
              >
                Contact
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="https://wa.me/918007634856"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full py-3" variant="primary" icon={<Phone className="w-4 h-4" />}>
                    WhatsApp Enquiry (8007634856)
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
