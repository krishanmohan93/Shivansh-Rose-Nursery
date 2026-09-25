'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ServiceInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential Society',
    location: '',
    serviceRequired: 'Society & Apartment Gardening',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (!formData.location.trim()) errs.location = 'Property location / locality is required';
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
    const text = `*New Garden Service Inquiry*\n` +
      `👤 *Name:* ${formData.name || 'Not provided'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not provided'}\n` +
      `📧 *Email:* ${formData.email || 'N/A'}\n` +
      `🏠 *Property Type:* ${formData.propertyType}\n` +
      `📍 *Location:* ${formData.location || 'Pune'}\n` +
      `🌿 *Service Required:* ${formData.serviceRequired}\n` +
      `💬 *Message:* ${formData.message || 'I would like to request a site visit and estimate.'}`;

    const url = `https://wa.me/918007634856?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="service-inquiry-form" className="py-16 sm:py-24 bg-background-cream border-t border-surface-default relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Book Site Visit
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Request A Free Site Visit &amp; Quote
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Fill out the form below or chat directly on WhatsApp. Our landscaping expert will contact you within 2 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-surface-low rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-soft-lg">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Inquiry Submitted Successfully!
              </h3>
              <p className="font-body text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our Shivansh Rose Nursery landscaping specialist will call you at <span className="font-bold text-slate-900">{formData.phone}</span> shortly.
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
                  Submit Another Request
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
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Location / Locality in Pune *
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

                {/* Service Required */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Service Required *
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary transition-all"
                  >
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
                  placeholder="Share details such as approximate lawn area, specific plant preferences, or timeline..."
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
    </section>
  );
};
