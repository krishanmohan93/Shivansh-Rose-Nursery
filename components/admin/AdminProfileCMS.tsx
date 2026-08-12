'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, Key, Lock, CheckCircle2, Save, Clock, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminProfileCMS: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setToast('Admin password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
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
            <User className="w-6 h-6 text-emerald-600" /> Admin Profile &amp; Security
          </h2>
          <p className="text-xs text-slate-500">
            Manage your account credentials, password changes, and active session logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Details & Password Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white font-display font-bold text-2xl flex items-center justify-center shadow-md">
              A
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">Shivansh Nursery Owner</h3>
              <p className="text-xs text-slate-500">admin@shivanshrosenursery.com</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                Super Admin Account
              </span>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4 text-xs sm:text-sm">
            <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-emerald-600" /> Change Security Password
            </h4>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                Update Password
              </Button>
            </div>
          </form>
        </div>

        {/* Active Sessions & Security Log (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft space-y-5">
          <h4 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Security Log &amp; Active Sessions
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> Current Web Session
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-600 text-white font-bold">
                  Active Now
                </span>
              </div>
              <p className="text-slate-600 font-mono">Chrome / Windows (Pune, Maharashtra)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Previous Login
                </span>
                <span className="text-[10px] text-slate-500">Yesterday, 10:15 AM</span>
              </div>
              <p className="text-slate-500 font-mono">Safari / iOS (Pune, Maharashtra)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
