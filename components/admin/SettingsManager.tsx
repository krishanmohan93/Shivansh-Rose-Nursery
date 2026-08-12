'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Phone, Mail, Clock, CheckCircle2, Save, Globe, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const SettingsManager: React.FC = () => {
  const [phones, setPhones] = useState('8007634856, 9175418744, 7499165488');
  const [email, setEmail] = useState('shivanshrosenursery.com@gmail.com');
  const [hours, setHours] = useState('8:00 AM – 10:30 PM (All 7 Days)');
  const [instagram, setInstagram] = useState('https://instagram.com');
  const [facebook, setFacebook] = useState('https://facebook.com');
  const [youtube, setYoutube] = useState('https://youtube.com');
  const [toast, setToast] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast('General site settings saved successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-900 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-600" /> General Site Settings
          </h2>
          <p className="text-xs text-slate-500">
            Update primary contact phone numbers, support email, store operating hours, and social media handles.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft max-w-3xl">
        <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
          
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" /> Primary Contact Phone Numbers
            </label>
            <input
              type="text"
              required
              value={phones}
              onChange={(e) => setPhones(e.target.value)}
              placeholder="e.g. 8007634856, 9175418744, 7499165488"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-600" /> Official Support Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shivanshrosenursery.com@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" /> Store Operating Hours
            </label>
            <input
              type="text"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="8:00 AM – 10:30 PM (All 7 Days)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="font-display font-bold text-base text-slate-900">
              Social Media Profile Links
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 flex items-center gap-1">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" /> Instagram
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 flex items-center gap-1">
                  <Facebook className="w-3.5 h-3.5 text-blue-600" /> Facebook
                </label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-600" /> YouTube
                </label>
                <input
                  type="text"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
              Save All Settings
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
