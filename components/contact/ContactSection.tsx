'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential Society',
    location: '',
    serviceRequired: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill service requirement if passed via query parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: serviceParam,
      }));

      // Scroll smoothly to form if query exists
      const el = document.getElementById('contact-inquiry-form');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [searchParams]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.location.trim()) errs.location = 'Location / Address is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  const handleWhatsAppNow = () => {
    const text = `*New Website Inquiry*\n` +
      `👤 *Name:* ${formData.name || 'Not provided'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not provided'}\n` +
      `📧 *Email:* ${formData.email || 'N/A'}\n` +
      `🏠 *Property Type:* ${formData.propertyType}\n` +
      `📍 *Location:* ${formData.location || 'Pune'}\n` +
      `🌿 *Subject / Service:* ${formData.serviceRequired}\n` +
      `💬 *Message:* ${formData.message || 'Hi, I would like to enquire about plants / garden services.'}`;

    const url = `https://wa.me/918007634856?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-16 py-10 sm:py-14">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Get In Touch With Us
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-tight">
          Contact Shivansh Rose Nursery
        </h1>
        <p className="font-body text-slate-700 text-base sm:text-lg">
          Have questions about plants, pots, or garden services? Call us, chat on WhatsApp, or send an inquiry below.
        </p>
      </div>

      {/* Store Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Store 1 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-display font-bold text-xl text-slate-900">
              Store 1 — Shivansh Rose Nursery
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Main Nursery
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, opposite Pune, Hinjawadi, Pimpri-Chinchwad, Maharashtra 411057</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-900">8007634856 / 9175418744 / 7499165488</span>
            </p>
            <p className="flex items-center gap-2 text-emerald-800 font-semibold pt-1">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Open 8:00 AM – 10:30 PM (All 7 Days)</span>
            </p>
          </div>
        </div>

        {/* Store 2 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-display font-bold text-xl text-slate-900">
              Store 2 — Shweta Matka Bhandar & Nursery
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
              Matka & Planters Branch
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Hinjewadi Jakatnaka, Wakad Rd, opposite Madhuban Hotel, Pune, Maharashtra 411057</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-900">8007634856 / 9175418744 / 7499165488</span>
            </p>
            <p className="flex items-center gap-2 text-emerald-800 font-semibold pt-1">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Open 8:00 AM – 10:30 PM (All 7 Days)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Contact & Service Inquiry Form */}
      <div id="contact-inquiry-form" className="max-w-4xl mx-auto">
        <div className="bg-surface-low rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-soft-lg space-y-6">
          <div className="text-center space-y-2 border-b border-slate-200/80 pb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Send Us A Message or Service Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Fill out the details below. Our team will get back to you promptly with stock availability or site visit estimates.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Message Sent Successfully!
              </h3>
              <p className="font-body text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. We have received your inquiry for <span className="font-bold text-primary">{formData.serviceRequired}</span> and will contact you at <span className="font-bold text-slate-900">{formData.phone}</span>.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button
                  size="md"
                  variant="primary"
                  onClick={handleWhatsAppNow}
                  icon={<MessageCircle className="w-4 h-4 fill-current" />}
                >
                  Send Details on WhatsApp
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" /> Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all ${
                      errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 8007634856"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all ${
                      errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" /> Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Property Type Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-primary" /> Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all"
                  >
                    <option value="Residential Society">Residential Society / Housing Complex</option>
                    <option value="Individual Flat / Apartment">Individual Flat / Apartment Balcony</option>
                    <option value="Villa / Bungalow">Villa / Independent Bungalow</option>
                    <option value="Office / Corporate">Office / Corporate Building</option>
                    <option value="Commercial / Retail">Commercial / Retail Shop</option>
                    <option value="School / Institution">School / Educational Institution</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Location / Locality */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Location / Address in Pune *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Wakad, Hinjawadi Phase 1, Baner"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all ${
                      errors.location ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.location && (
                    <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.location}
                    </span>
                  )}
                </div>

                {/* Service / Subject Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Service / Inquiry Subject *
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all"
                  >
                    <option value="General Inquiry">General Nursery Inquiry</option>
                    <option value="Garden Design & Planning">Garden Design &amp; Planning</option>
                    <option value="Society & Apartment Gardening">Society &amp; Apartment Gardening</option>
                    <option value="Bulk Plant Supply & Wholesale">Bulk Plant Supply &amp; Wholesale</option>
                    <option value="Pot & Designer Planter Setup">Pot &amp; Designer Planter Setup</option>
                    <option value="Garden Maintenance & AMC">Garden Maintenance &amp; AMC</option>
                    <option value="Water Fountains & Features">Water Fountains &amp; Features</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" /> Additional Details / Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details such as plant choices, pot quantity, lawn area, or site visit timing..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-1/2 py-3.5 justify-center shadow-md text-sm"
                  icon={<Send className="w-4 h-4" />}
                >
                  Submit Inquiry
                </Button>

                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={handleWhatsAppNow}
                  className="w-full sm:w-1/2 py-3.5 justify-center border-emerald-700 text-emerald-900 hover:bg-emerald-50 text-sm"
                  icon={<MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />}
                >
                  WhatsApp Directly Now
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
