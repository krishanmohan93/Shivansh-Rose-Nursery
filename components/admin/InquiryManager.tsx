'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  Search,
  CheckCircle2,
  Trash2,
  MessageCircle,
  Phone,
  Clock,
  Filter,
  User,
  MapPin,
  Calendar,
  Send,
  Sparkles,
  X,
  MailCheck,
  AlertCircle,
  Megaphone,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyType: string;
  serviceRequired: string;
  location: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Resolved';
}

export const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-101',
    name: 'Siddharth Varma',
    phone: '9822012345',
    email: 'siddharth.v@gmail.com',
    propertyType: 'Society / Commercial',
    serviceRequired: 'Garden Maintenance Service (Moderate Plan)',
    location: 'Atlanta 2 Society, Wakad',
    message: 'We want complete lawn maintenance and potted plants setup for our society entrance and terrace garden area.',
    date: 'Today, 2:15 PM',
    status: 'New',
  },
  {
    id: 'inq-102',
    name: 'Ananya Roy',
    phone: '9175418744',
    email: 'ananya.roy@yahoo.in',
    propertyType: 'Apartment',
    serviceRequired: 'Chinese Porcelain Pots Order',
    location: 'Hinjawadi Phase 1, Pune',
    message: 'Looking for 6 large Chinese porcelain ceramic planters for my indoor living room setup.',
    date: 'Yesterday, 5:40 PM',
    status: 'Contacted',
  },
  {
    id: 'inq-103',
    name: 'Vikram Shinde',
    phone: '7499165488',
    email: 'vikram.shinde@techmail.com',
    propertyType: 'Villa / Independent House',
    serviceRequired: 'Vertical Garden Installation',
    location: 'Baner, Pune',
    message: 'Need vertical garden wall installation estimate for a 12x8 ft exterior wall.',
    date: '3 days ago',
    status: 'Resolved',
  },
];

export const InquiryManager: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'New' | 'Contacted' | 'Resolved'>('all');
  const [toast, setToast] = useState('');

  // 1-Click Broadcast State
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState('🌿 New Monsoon Plants & Ceramic Pots Stock Arrived!');
  const [broadcastTitle, setBroadcastTitle] = useState('Fresh Exotic Rose & Indoor Plant Arrival');
  const [broadcastMessage, setBroadcastMessage] = useState(
    'Hello Plant Lover!\n\nShivansh Rose Nursery Pune me nayi Rose varieties, Chinese porcelain pots, aur organic fertilizers ki fresh stock aa gayi hai.\n\nAaj hi apni nearest Wakad ya Hinjawadi branch me visit karein!'
  );
  const [broadcastImage, setBroadcastImage] = useState('/images/plants/home-bg.png');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleStatusChange = (id: string, newStatus: 'New' | 'Contacted' | 'Resolved') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    showToast('Inquiry status updated!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this inquiry record?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      showToast('Inquiry deleted!');
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);

    try {
      const res = await fetch('/api/newsletter/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: broadcastSubject.trim(),
          title: broadcastTitle.trim(),
          message: broadcastMessage.trim(),
          imageUrl: broadcastImage.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsBroadcastModalOpen(false);
        showToast(`🎉 ${data.message || 'Broadcast email sent to all subscribers!'}`);
      } else {
        alert(data.error || 'Failed to send broadcast email.');
      }
    } catch (err) {
      alert('Network error. Failed to send broadcast email.');
    } finally {
      setIsBroadcasting(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-900 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg z-50"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-emerald-600" /> Inquiries &amp; Newsletter Subscriptions
          </h2>
          <p className="text-xs text-slate-500">
            Manage incoming customer contact messages, garden service requests, and newsletter subscribers.
          </p>
        </div>

        {/* 1-Click Broadcast Button */}
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsBroadcastModalOpen(true)}
          icon={<Megaphone className="w-4 h-4" />}
          className="shadow-md"
        >
          📢 1-Click Broadcast Newsletter
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['all', 'New', 'Contacted', 'Resolved'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedStatus === st
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? 'All Inquiries' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards / Table Grid */}
      <div className="space-y-4">
        {filteredInquiries.map((inq) => (
          <div
            key={inq.id}
            className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft space-y-4 hover:border-emerald-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                  {inq.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 leading-tight">
                    {inq.name}
                  </h3>
                  <span className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{inq.phone}</span>
                    {inq.email && <span>• {inq.email}</span>}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {inq.serviceRequired}
                </span>

                <select
                  value={inq.status}
                  onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    inq.status === 'New'
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : inq.status === 'Contacted'
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  }`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Message Box */}
            <p className="text-xs sm:text-sm text-slate-700 font-body bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
              &quot;{inq.message}&quot;
            </p>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {inq.location}
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/91${inq.phone}?text=Hello%20${encodeURIComponent(
                    inq.name
                  )}!%20Thank%20you%20for%20contacting%20Shivansh%20Rose%20Nursery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Reply
                </a>

                <button
                  onClick={() => handleDelete(inq.id)}
                  className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📢 1-Click Broadcast Newsletter Modal */}
      <AnimatePresence>
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBroadcastModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-emerald-600" /> 1-Click Broadcast Newsletter
                  </h3>
                  <p className="text-xs text-slate-500">
                    Send instant announcement email to all website subscribers saved in Supabase database.
                  </p>
                </div>
                <button
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs sm:text-sm">
                
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MailCheck className="w-4 h-4 text-emerald-600" /> Target Recipients:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[11px]">
                    All Active Website Subscribers
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Subject Line *</label>
                  <input
                    type="text"
                    required
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    placeholder="e.g. 🌿 New Rose Varieties & Ceramic Pots Stock Arrived!"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Announcement Banner Title *</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="e.g. Fresh Exotic Plants Arrival at Wakad Branch"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Message Body *</label>
                  <textarea
                    rows={4}
                    required
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Write your email update for customers..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none font-body"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Optional Image URL</label>
                  <input
                    type="text"
                    value={broadcastImage}
                    onChange={(e) => setBroadcastImage(e.target.value)}
                    placeholder="/images/plants/home-bg.png"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setIsBroadcastModalOpen(false)}
                    disabled={isBroadcasting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isBroadcasting}
                    icon={<Send className="w-4 h-4" />}
                    className="shadow-md min-w-[180px]"
                  >
                    Send Broadcast Now
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
