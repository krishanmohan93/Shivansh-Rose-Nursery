'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, MapPin, Phone, Clock, Edit2, CheckCircle2, Save, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface StoreBranch {
  id: string;
  name: string;
  badge: string;
  address: string;
  landmark: string;
  hours: string;
  contactNumbers: string;
  image: string;
  mapLink: string;
}

export const StoreManager: React.FC = () => {
  const [stores, setStores] = useState<StoreBranch[]>([
    {
      id: 'store-1',
      name: 'Shivansh Rose Nursery',
      badge: 'Main Nursery Store',
      address: 'Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, opposite Pune, Hinjawadi, Pimpri-Chinchwad (Pune Area), Maharashtra 411057',
      landmark: 'Opposite Pune, near the Atlanta 2 society cluster',
      hours: '8:00 AM – 10:30 PM (All 7 Days)',
      contactNumbers: '8007634856 / 9175418744 / 7499165488',
      image: '/images/hero-1.jpeg',
      mapLink: 'https://maps.google.com/?q=Shivansh+Rose+Nursery+Wakad+Pune',
    },
    {
      id: 'store-2',
      name: 'Shweta Matka Bhandar and Nursery',
      badge: 'Second Branch',
      address: 'Hinjewadi Jakatnaka, Wakad Rd, opposite Madhuban Hotel, Pune, Maharashtra 411057',
      landmark: 'Opposite Madhuban Family Restaurant And Bar, near Hinjewadi Jakatnaka',
      hours: '8:00 AM – 10:30 PM (All 7 Days)',
      contactNumbers: '8007634856 / 9175418744 / 7499165488',
      image: '/images/plants/shop2.jpeg',
      mapLink: 'https://maps.google.com/?q=Shweta+Matka+Bhandar+Hinjewadi+Pune',
    },
  ]);

  const [editingStore, setEditingStore] = useState<StoreBranch | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;

    setStores((prev) =>
      prev.map((s) => (s.id === editingStore.id ? editingStore : s))
    );
    setEditingStore(null);
    showToast('Store details saved successfully!');
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
            <Store className="w-6 h-6 text-emerald-600" /> Nursery Stores Manager
          </h2>
          <p className="text-xs text-slate-500">
            Edit store addresses, phone numbers, operating hours, and photo displays for Store 1 &amp; Store 2.
          </p>
        </div>
      </div>

      {/* Stores Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-3xl border border-emerald-100 shadow-soft overflow-hidden space-y-4 p-6 sm:p-7 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image src={store.image} alt={store.name} fill className="object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-900/90 text-white text-xs font-semibold backdrop-blur-sm border border-emerald-500/30">
                  {store.badge}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">{store.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-900">{store.contactNumbers}</span>
                </p>
                <p className="text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{store.hours}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={store.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>View Google Map</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Button
                size="sm"
                variant="primary"
                onClick={() => setEditingStore(store)}
                icon={<Edit2 className="w-4 h-4" />}
              >
                Edit Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Store Modal */}
      <AnimatePresence>
        {editingStore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingStore(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Edit {editingStore.name}
                </h3>
                <button
                  onClick={() => setEditingStore(null)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Store Name</label>
                  <input
                    type="text"
                    required
                    value={editingStore.name}
                    onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Badge Text</label>
                  <input
                    type="text"
                    value={editingStore.badge}
                    onChange={(e) => setEditingStore({ ...editingStore, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Complete Address</label>
                  <textarea
                    rows={2}
                    value={editingStore.address}
                    onChange={(e) => setEditingStore({ ...editingStore, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Contact Phone Numbers</label>
                  <input
                    type="text"
                    value={editingStore.contactNumbers}
                    onChange={(e) => setEditingStore({ ...editingStore, contactNumbers: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Operating Hours</label>
                  <input
                    type="text"
                    value={editingStore.hours}
                    onChange={(e) => setEditingStore({ ...editingStore, hours: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Image Path / URL</label>
                  <input
                    type="text"
                    value={editingStore.image}
                    onChange={(e) => setEditingStore({ ...editingStore, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setEditingStore(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
