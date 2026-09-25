'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ShieldCheck, PhoneCall, MessageCircle, Compass, ExternalLink, X, CheckCircle2, AlertTriangle, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ServiceAreaNoticeProps {
  language: 'en' | 'hi';
}

// Shivansh Rose Nursery Store Coordinates in Pune
const NURSERY_STORES = [
  {
    name: 'Shivansh Rose Nursery (Wakad Main Branch)',
    nameHi: 'शिवंश रोज़ नर्सरी (वाकड मुख्य शाखा)',
    address: 'Atlanta 2 Society, New Wakad Link Rd, Pune 411057',
    lat: 18.5987,
    lng: 73.7628,
    mapQuery: 'Shivansh+Rose+Nursery+Wakad+Pune',
  },
  {
    name: 'Shweta Matka Bhandar & Nursery (Hinjewadi Branch)',
    nameHi: 'श्वेता मटका भंडार एवं नर्सरी (हिंजेवाडी शाखा)',
    address: 'Hinjewadi Jakatnaka, Wakad Rd, Pune 411057',
    lat: 18.5912,
    lng: 73.7485,
    mapQuery: 'Hinjewadi+Jakatnaka+Wakad+Rd+Pune',
  },
];

// Haversine Distance Formula in KM
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const ServiceAreaNotice: React.FC<ServiceAreaNoticeProps> = ({ language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingGps, setIsLoadingGps] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [manualArea, setManualArea] = useState('');
  const [calculatedResult, setCalculatedResult] = useState<{
    distanceKm: number;
    extraKm: number;
    extraCharge: number;
    closestStore: typeof NURSERY_STORES[0];
    isWithinRadius: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Auto trigger GPS detection on modal open
    detectUserGpsLocation();
  };

  const detectUserGpsLocation = () => {
    setErrorMsg('');
    if ('geolocation' in navigator) {
      setIsLoadingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLoadingGps(false);
          const uLat = pos.coords.latitude;
          const uLng = pos.coords.longitude;
          setUserCoords({ lat: uLat, lng: uLng });
          calculateNearestStoreDistance(uLat, uLng);
        },
        (err) => {
          setIsLoadingGps(false);
          // Fallback default coordinates (Wakad area)
          setUserCoords({ lat: 18.598, lng: 73.763 });
          calculateNearestStoreDistance(18.598, 73.763);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setUserCoords({ lat: 18.598, lng: 73.763 });
      calculateNearestStoreDistance(18.598, 73.763);
    }
  };

  const calculateNearestStoreDistance = (uLat: number, uLng: number) => {
    let minDistance = Infinity;
    let nearestStore = NURSERY_STORES[0];

    NURSERY_STORES.forEach((store) => {
      const dist = calculateDistanceKm(uLat, uLng, store.lat, store.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestStore = store;
      }
    });

    const isWithin = minDistance <= 5;
    const extraKm = isWithin ? 0 : Math.round((minDistance - 5) * 10) / 10;
    const extraCharge = Math.round(extraKm * 35);

    setCalculatedResult({
      distanceKm: minDistance,
      extraKm,
      extraCharge,
      closestStore: nearestStore,
      isWithinRadius: isWithin,
    });
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualArea.trim()) return;

    // Simulated area distance lookup for Pune locations
    const areaLower = manualArea.toLowerCase();
    let estDist = 3.5; // Default Wakad/Hinjawadi radius

    if (areaLower.includes('baner') || areaLower.includes('ravet')) estDist = 6.2;
    else if (areaLower.includes('aundh') || areaLower.includes('pimple')) estDist = 7.5;
    else if (areaLower.includes('kothrud') || areaLower.includes('viman') || areaLower.includes('kharadi')) estDist = 18.0;
    else if (areaLower.includes('wakad') || areaLower.includes('hinjawadi') || areaLower.includes('hinjewadi')) estDist = 2.8;

    const isWithin = estDist <= 5;
    const extraKm = isWithin ? 0 : Math.round((estDist - 5) * 10) / 10;
    const extraCharge = Math.round(extraKm * 35);

    setCalculatedResult({
      distanceKm: estDist,
      extraKm,
      extraCharge,
      closestStore: NURSERY_STORES[0],
      isWithinRadius: isWithin,
    });
  };

  const openGoogleMapsRoute = () => {
    if (userCoords) {
      const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${calculatedResult?.closestStore.mapQuery || 'Shivansh+Rose+Nursery+Wakad+Pune'}&travelmode=driving`;
      window.open(mapUrl, '_blank');
    } else {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${calculatedResult?.closestStore.mapQuery || 'Shivansh+Rose+Nursery+Wakad+Pune'}`;
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <section className="py-12 bg-background-cream relative overflow-hidden border-t border-surface-default">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0b6b2e] to-emerald-900 text-white shadow-soft-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-800">
          
          {/* Left Text */}
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-400/30">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'hi' ? 'सेवा क्षेत्र जानकारी' : 'Service Area Information'}</span>
            </span>

            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
              {language === 'hi'
                ? '५ किमी के भीतर कोई अतिरिक्त दूरी शुल्क नहीं'
                : 'Service Available Across Wakad, Hinjewadi & Pune'}
            </h3>

            <p className="font-body text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {language === 'hi'
                ? 'हमारे मानक मेंटेनेंस प्लान की कीमतों में ५ किमी के भीतर सेवा शामिल है। ५ किमी से अधिक दूरी वाले स्थानों के लिए, ₹३५/किमी का अतिरिक्त दूरी शुल्क लागू होता है।'
                : 'Our standard maintenance plan prices include service within 5 km. For locations beyond 5 km, an additional ₹35/km distance charge applies.'}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-emerald-300 pt-1">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Wakad &amp; Hinjawadi Base
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ₹35/km Extra Beyond 5 km
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="secondary"
              size="md"
              onClick={handleOpenModal}
              className="w-full sm:w-auto shadow-md font-bold"
              icon={<Compass className="w-4 h-4 text-emerald-950" />}
            >
              {language === 'hi' ? 'दूरी व गूगल मैप देखें' : 'Check Location Distance'}
            </Button>
          </div>

        </div>

      </div>

      {/* 🗺️ Interactive Distance & Google Maps Route Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-body">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-[#0b6b2e] flex items-center justify-center font-bold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                      {language === 'hi' ? 'दूरी व सेवा क्षेत्र कैलकुलेटर' : 'Location Distance & Route Calculator'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Shivansh Rose Nursery Wakad &amp; Hinjawadi Pune
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* GPS Loading State */}
              {isLoadingGps ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">
                    {language === 'hi' ? 'आपका जीपीएस लोकेशन लिया जा रहा है...' : 'Detecting your GPS location & calculating distance...'}
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  
                  {/* Results Box */}
                  {calculatedResult && (
                    <div className="p-5 rounded-2xl bg-surface-low border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {language === 'hi' ? 'निकटतम नर्सरी शाखा:' : 'Closest Nursery Store:'}
                        </span>
                        <span className="text-xs font-bold text-[#0b6b2e]">
                          {calculatedResult.closestStore.name.split('(')[0]}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between pt-1 border-t border-slate-200">
                        <span className="font-body text-xs font-semibold text-slate-700">
                          {language === 'hi' ? 'अनुमानित मार्ग दूरी:' : 'Estimated Route Distance:'}
                        </span>
                        <span className="font-display font-extrabold text-2xl text-slate-900">
                          {calculatedResult.distanceKm} km
                        </span>
                      </div>

                      {/* Radius Status */}
                      {calculatedResult.isWithinRadius ? (
                        <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            {language === 'hi'
                              ? '५ किमी नि:शुल्क सेवा दायरे के भीतर! (₹० अतिरिक्त दूरी शुल्क)'
                              : 'Within 5 km Free Service Radius! (₹0 Extra Distance Charge)'}
                          </span>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-bold space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-900">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>
                              {language === 'hi'
                                ? `५ किमी के दायरे से ${calculatedResult.extraKm} किमी अधिक`
                                : `${calculatedResult.extraKm} km beyond 5 km radius`}
                            </span>
                          </div>
                          <p className="text-[11px] text-amber-800 font-medium">
                            Est. Distance Charge: <strong>+₹{calculatedResult.extraCharge} extra</strong> (at ₹35/km)
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Manual Area Search Input */}
                  <form onSubmit={handleManualSearch} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {language === 'hi' ? 'या अपना इलाका/सोसायटी टाइप करें:' : 'Or Search by Area / Society Name:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={manualArea}
                          onChange={(e) => setManualArea(e.target.value)}
                          placeholder="e.g. Wakad, Hinjawadi, Baner, Ravet, Aundh..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                      <Button type="submit" variant="secondary" size="sm">
                        Calculate
                      </Button>
                    </div>
                  </form>

                  {/* Action Buttons: Open Google Maps Route */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={openGoogleMapsRoute}
                      icon={<ExternalLink className="w-4 h-4" />}
                      className="w-full shadow-md font-bold"
                    >
                      {language === 'hi' ? 'गूगल मैप पर लाइव दिशाएं देखें' : 'Open Route Map in Google Maps'}
                    </Button>

                    <button
                      type="button"
                      onClick={detectUserGpsLocation}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors w-full sm:w-auto shrink-0"
                    >
                      <Compass className="w-3.5 h-3.5" /> Re-detect GPS
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
