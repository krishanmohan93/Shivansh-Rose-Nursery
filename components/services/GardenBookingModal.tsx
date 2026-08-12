'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Building,
  Home,
  MessageCircle,
  Sparkles,
  Send,
  Loader2,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PlanDetails {
  id: string;
  nameEn: string;
  nameHi: string;
  priceEn: string;
  priceHi: string;
  plantsCountEn: string;
  plantsCountHi: string;
}

interface GardenBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanDetails | null;
  language: 'en' | 'hi';
}

export const GardenBookingModal: React.FC<GardenBookingModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  language,
}) => {
  // Form Fields State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [society, setSociety] = useState('');
  const [building, setBuilding] = useState('');
  const [flat, setFlat] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [plantsCount, setPlantsCount] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM - 12:00 PM');
  const [notes, setNotes] = useState('');

  // Status & Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingRefId, setBookingRefId] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setPreferredDate(dateStr);
  }, []);

  // Update default plants count when plan changes
  useEffect(() => {
    if (selectedPlan) {
      setPlantsCount(selectedPlan.plantsCountEn);
    }
  }, [selectedPlan]);

  const t = {
    modalTitle: language === 'hi' ? 'गार्डन मेंटेनेंस सेवा बुक करें' : 'Book Your Garden Maintenance Service',
    modalSubtitle: language === 'hi'
      ? 'अपनी जानकारी भरें। हमारी टीम अपॉइंटमेंट की पुष्टि के लिए आपसे संपर्क करेगी।'
      : 'Fill out your details below. Our team will contact you shortly to confirm your visit.',
    customerSection: language === 'hi' ? '१. ग्राहक जानकारी' : '1. Customer Information',
    addressSection: language === 'hi' ? '२. सेवा स्थान का पता' : '2. Service Location Address',
    serviceSection: language === 'hi' ? '३. अपॉइंटमेंट समय और प्लान' : '3. Appointment Date & Plan',
    nameLabel: language === 'hi' ? 'पूरा नाम *' : 'Full Name *',
    phoneLabel: language === 'hi' ? 'मोबाइल नंबर (१० अंक) *' : 'Mobile Number (10 Digits) *',
    emailLabel: language === 'hi' ? 'ईमेल आईडी (ऐच्छिक)' : 'Email Address (Optional)',
    societyLabel: language === 'hi' ? 'सोसायटी का नाम *' : 'Society Name *',
    buildingLabel: language === 'hi' ? 'विंग / बिल्डिंग नंबर *' : 'Wing / Building *',
    flatLabel: language === 'hi' ? 'फ्लैट / घर का नंबर *' : 'Flat / House Number *',
    addressLabel: language === 'hi' ? 'पूरा पता *' : 'Complete Address *',
    locationLabel: language === 'hi' ? 'क्षेत्र / इलाका *' : 'Location / Area *',
    useMyLocation: language === 'hi' ? 'मेरा स्थान उपयोग करें' : 'Use My Location',
    planLabel: language === 'hi' ? 'चयनित मेंटेनेंस प्लान' : 'Selected Maintenance Plan',
    plantsCountLabel: language === 'hi' ? 'पौधों की अनुमानित संख्या' : 'Est. Number of Plants',
    dateLabel: language === 'hi' ? 'पसंदीदा सेवा तिथि *' : 'Preferred Service Date *',
    timeLabel: language === 'hi' ? 'पसंदीदा समय स्लॉट *' : 'Preferred Time Slot *',
    notesLabel: language === 'hi' ? 'अतिरिक्त आवश्यकताएं / नोट' : 'Additional Requirements / Notes',
    submitBtn: language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Submit Booking Request',
    distanceNotice: language === 'hi'
      ? '५ किमी के भीतर शुल्क शामिल है। ५ किमी से अधिक दूरी पर ₹३५/किमी का अतिरिक्त चार्ज लागू होता है।'
      : 'Standard prices apply within 5 km. For locations beyond 5 km, an additional ₹35/km distance charge applies.',
  };

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsGettingLocation(false);
          setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)} (Pune)`);
        },
        (err) => {
          setIsGettingLocation(false);
          setLocation('Wakad / Hinjawadi, Pune');
        }
      );
    } else {
      setLocation('Wakad / Hinjawadi, Pune');
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    
    if (!name.trim()) errs.name = language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Full Name is required';

    const cleanP = phone.trim().replace(/[^0-9]/g, '');
    if (!cleanP || cleanP.length < 10) {
      errs.phone = language === 'hi' ? 'कृपया मान्य १०-अंकों का मोबाइल नंबर दर्ज करें' : 'Enter a valid 10-digit Indian mobile number';
    }

    if (!society.trim()) errs.society = language === 'hi' ? 'सोसायटी का नाम आवश्यक है' : 'Society Name is required';
    if (!building.trim()) errs.building = language === 'hi' ? 'विंग/बिल्डिंग आवश्यक है' : 'Building/Wing is required';
    if (!flat.trim()) errs.flat = language === 'hi' ? 'फ्लैट नंबर आवश्यक है' : 'Flat Number is required';
    if (!address.trim()) errs.address = language === 'hi' ? 'पूरा पता दर्ज करें' : 'Complete Address is required';
    if (!location.trim()) errs.location = language === 'hi' ? 'इलाका/स्थान आवश्यक है' : 'Location/Area is required';
    if (!preferredDate) errs.preferredDate = language === 'hi' ? 'कृपया तारीख चुनें' : 'Preferred Date is required';
    if (!preferredTime) errs.preferredTime = language === 'hi' ? 'कृपया समय स्लॉट चुनें' : 'Preferred Time is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/garden-maintenance/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          society: society.trim(),
          building: building.trim(),
          flat: flat.trim(),
          address: address.trim(),
          location: location.trim(),
          plan: selectedPlan ? `${selectedPlan.nameEn} — ${selectedPlan.priceEn}` : 'Moderate Plan — ₹1,499 / Visit',
          planPrice: selectedPlan ? selectedPlan.priceEn : '₹1,499 / Visit',
          plantsCount: plantsCount || (selectedPlan ? selectedPlan.plantsCountEn : '10-15 Plants'),
          preferredDate,
          preferredTime,
          notes: notes.trim(),
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setBookingRefId(resData.bookingId || `GMB-${Date.now().toString().slice(-6)}`);
        setSubmitSuccess(true);
      } else {
        setSubmitError(
          resData.error ||
            (language === 'hi'
              ? 'हम आपका अनुरोध अभी सबमिट नहीं कर सके। कृपया पुनः प्रयास करें।'
              : 'Failed to process request. Please check details and try again.')
        );
      }
    } catch (err: any) {
      setSubmitError(
        language === 'hi'
          ? 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें या व्हाट्सएप पर संपर्क करें।'
          : 'Network error. Please try again or contact us via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '08:00 AM - 11:00 AM',
    '11:00 AM - 02:00 PM',
    '02:00 PM - 05:00 PM',
    '05:00 PM - 07:30 PM',
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl z-10 border border-emerald-100 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Top Bar Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0b6b2e] via-emerald-800 to-[#072412] text-white flex items-center justify-between shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shivansh Rose Nursery Pune</span>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl leading-snug">
                {t.modalTitle}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-grow custom-scrollbar">
            
            {submitSuccess ? (
              /* Success Confirmation Screen */
              <div className="py-8 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                    Booking Ref: {bookingRefId}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    {language === 'hi'
                      ? 'बुकिंग अनुरोध सफलतापूर्वक सबमिट किया गया!'
                      : 'Booking Request Submitted Successfully!'}
                  </h3>
                  <p className="font-body text-slate-600 text-sm leading-relaxed">
                    {language === 'hi'
                      ? 'गार्डन मेंटेनेंस सेवा चुनने के लिए धन्यवाद। आपका अनुरोध प्राप्त हो गया है और हमारी टीम जल्द ही आपसे संपर्क करेगी।'
                      : 'Thank you for choosing Shivansh Rose Nursery. We have received your request and sent a notification email to our team. We will call you shortly to confirm your slot.'}
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-5 rounded-2xl bg-surface-low border border-emerald-100 text-left max-w-md mx-auto space-y-2 text-xs sm:text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Plan Selected:</span>
                    <span className="font-bold text-emerald-900">{selectedPlan ? selectedPlan.nameEn : 'Moderate Plan'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Rate:</span>
                    <span className="font-bold text-slate-900">{selectedPlan ? selectedPlan.priceEn : '₹1,499 / Visit'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Preferred Date:</span>
                    <span className="font-semibold text-slate-800">{preferredDate} ({preferredTime})</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      setSubmitSuccess(false);
                      onClose();
                    }}
                  >
                    {language === 'hi' ? 'गार्डन मेंटेनेंस पर वापस जाएं' : 'Back to Garden Maintenance'}
                  </Button>

                  <a
                    href={`https://wa.me/918007634856?text=${encodeURIComponent(
                      `Hello Shivansh Nursery! I just submitted Garden Maintenance Booking Ref: ${bookingRefId} for ${name} (${phone}) on ${preferredDate}. Please confirm my visit slot.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="secondary" size="lg" className="w-full" icon={<MessageCircle className="w-4 h-4 text-emerald-800" />}>
                      {language === 'hi' ? 'व्हाट्सएप पर कन्फर्म करें' : 'Confirm on WhatsApp'}
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Pre-Filled Selected Plan Card Header */}
                {selectedPlan && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-surface-low to-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block">
                        {t.planLabel}
                      </span>
                      <h4 className="font-display font-bold text-lg text-slate-900">
                        {language === 'hi' ? selectedPlan.nameHi : selectedPlan.nameEn}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        {language === 'hi' ? selectedPlan.plantsCountHi : selectedPlan.plantsCountEn}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-display font-extrabold text-xl text-[#0b6b2e] block">
                        {language === 'hi' ? selectedPlan.priceHi : selectedPlan.priceEn}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">Pre-Selected</span>
                    </div>
                  </div>
                )}

                {/* Submit Error Warning */}
                {submitError && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* 1. Customer Information Section */}
                <div className="space-y-4 pt-1">
                  <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <User className="w-4 h-4 text-emerald-600" /> {t.customerSection}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Patil / राजेश पाटिल"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.name && <span className="text-[11px] font-semibold text-rose-600">{errors.name}</span>}
                    </div>

                    {/* Mobile Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 8007634856"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.phone && <span className="text-[11px] font-semibold text-rose-600">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. customer@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                {/* 2. Address Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" /> {t.addressSection}
                    </h3>

                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={isGettingLocation}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
                    >
                      <Compass className={`w-3.5 h-3.5 ${isGettingLocation ? 'animate-spin' : ''}`} />
                      <span>{isGettingLocation ? 'Locating...' : t.useMyLocation}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Society Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.societyLabel}
                      </label>
                      <input
                        type="text"
                        value={society}
                        onChange={(e) => setSociety(e.target.value)}
                        placeholder="e.g. Atlanta 2 Society"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.society ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.society && <span className="text-[11px] font-semibold text-rose-600">{errors.society}</span>}
                    </div>

                    {/* Wing / Building */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.buildingLabel}
                      </label>
                      <input
                        type="text"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        placeholder="e.g. Wing B / Tower 3"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.building ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.building && <span className="text-[11px] font-semibold text-rose-600">{errors.building}</span>}
                    </div>

                    {/* Flat Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.flatLabel}
                      </label>
                      <input
                        type="text"
                        value={flat}
                        onChange={(e) => setFlat(e.target.value)}
                        placeholder="e.g. Flat 402"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.flat ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.flat && <span className="text-[11px] font-semibold text-rose-600">{errors.flat}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Location / Area */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.locationLabel}
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Wakad / Hinjawadi Phase 1 / Baner"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.location ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.location && <span className="text-[11px] font-semibold text-rose-600">{errors.location}</span>}
                    </div>

                    {/* Complete Street Address */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.addressLabel}
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Hinjawadi Link Rd, near Atlanta Cluster"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                          errors.address ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.address && <span className="text-[11px] font-semibold text-rose-600">{errors.address}</span>}
                    </div>
                  </div>
                </div>

                {/* 3. Appointment Date & Time Section */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Calendar className="w-4 h-4 text-emerald-600" /> {t.serviceSection}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.dateLabel}
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-white ${
                          errors.preferredDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.preferredDate && <span className="text-[11px] font-semibold text-rose-600">{errors.preferredDate}</span>}
                    </div>

                    {/* Preferred Time Slot */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {t.timeLabel}
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-white"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes / Special Instructions */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {t.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'hi' ? 'विशेष आवश्यकताएं, पौधों के प्रकार या कोई निर्देश...' : 'e.g. Specify high balcony plants, repotting needs, or specific pest issues...'}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none"
                    />
                  </div>
                </div>

                {/* Distance Charge Policy Notice */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-body space-y-0.5">
                  <span className="font-bold block flex items-center gap-1 text-amber-950">
                    <ShieldCheck className="w-4 h-4 text-amber-700" /> Distance Policy / दूरी नीति:
                  </span>
                  <p className="leading-relaxed text-amber-800">{t.distanceNotice}</p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    className="shadow-md min-w-[200px]"
                  >
                    {t.submitBtn}
                  </Button>
                </div>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
