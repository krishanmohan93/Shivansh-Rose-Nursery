'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface StoreData {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  image: string;
  address: string;
  landmark: string;
  hours: string;
  phones: string[];
  primaryPhone: string;
  whatsappPhone: string;
  googleMapsUrl: string;
  features: string[];
}

export const StoreCard: React.FC<{ store: StoreData }> = ({ store }) => {
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  // Compute live open/closed status against 8:00 AM (8.0) – 10:30 PM (22.5) IST
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDecimalTime = hours + minutes / 60;

      // Open from 08:00 (8:00 AM) to 22.50 (10:30 PM)
      if (currentDecimalTime >= 8.0 && currentDecimalTime <= 22.5) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-soft-lg hover:shadow-soft-xl transition-all duration-500 flex flex-col justify-between">
      <div>
        {/* Top Store Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <Image
            src={store.image}
            alt={store.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          {/* Top Branch Type Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-xs ${store.badgeBg}`}>
              {store.badge}
            </span>
          </div>

          {/* Live Open / Closed Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border shadow-xs ${
                isOpenNow
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-950/90 text-amber-300 border-amber-500/40'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpenNow ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                }`}
              />
              <span>{isOpenNow ? 'Open Now (8:00 AM – 10:30 PM)' : 'Closed Now (Opens 8:00 AM)'}</span>
            </div>
          </div>

          {/* Image Bottom Headline */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
              {store.name}
            </h3>
          </div>
        </div>

        {/* Store Information Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Full Store Address
                </h4>
                <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed font-medium mt-0.5">
                  {store.address}
                </p>
              </div>
            </div>
          </div>

          {/* Landmark */}
          <div className="p-3.5 rounded-2xl bg-surface-low border border-emerald-100/80 space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest block">
              📍 Landmark &amp; Directions
            </span>
            <p className="font-body text-xs sm:text-sm text-slate-700">
              {store.landmark}
            </p>
          </div>

          {/* Hours & Contact Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" /> Opening Hours
              </span>
              <p className="text-slate-900 font-bold">{store.hours}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" /> Contact Numbers
              </span>
              <p className="text-slate-900 font-bold">
                {store.phones.join(' / ')}
              </p>
            </div>
          </div>

          {/* Store Key Highlights */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Available Facilities &amp; Services
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {store.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 3 Interactive Buttons Footer */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 space-y-3 border-t border-slate-100/80 bg-slate-50/50">
        <a
          href={store.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            size="md"
            variant="primary"
            className="w-full justify-center py-3 text-sm shadow-md"
            icon={<Navigation className="w-4 h-4" />}
          >
            Open in Google Maps
          </Button>
        </a>

        <div className="grid grid-cols-2 gap-3">
          <a href={`tel:${store.primaryPhone}`} className="block">
            <Button
              size="md"
              variant="outline"
              className="w-full justify-center text-xs sm:text-sm font-semibold border-slate-300 text-slate-800 hover:bg-white"
              icon={<Phone className="w-4 h-4 text-emerald-600" />}
            >
              Call Store
            </Button>
          </a>

          <a
            href={`https://wa.me/91${store.whatsappPhone}?text=Hi%20${encodeURIComponent(store.name)},%20I%20want%20to%20enquire%20about%20plant%20stock!`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="md"
              variant="outline"
              className="w-full justify-center text-xs sm:text-sm font-semibold border-emerald-600 text-emerald-900 hover:bg-emerald-50"
              icon={<MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />}
            >
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
