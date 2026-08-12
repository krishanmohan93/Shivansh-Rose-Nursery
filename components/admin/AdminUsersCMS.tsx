'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, ShieldCheck, Mail, CheckCircle2, User, Key, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'Active' | 'Inactive';
}

export const AdminUsersCMS: React.FC = () => {
  const [users, setUsers] = useState<AdminUserItem[]>([
    {
      id: 'usr-1',
      name: 'Nursery Store Owner',
      email: 'admin@shivanshrosenursery.com',
      role: 'Super Admin',
      lastLogin: 'Just now (Active Session)',
      status: 'Active',
    },
    {
      id: 'usr-2',
      name: 'Wakad Store Manager',
      email: 'manager.wakad@shivanshrosenursery.com',
      role: 'Store Manager',
      lastLogin: 'Yesterday, 4:20 PM',
      status: 'Active',
    },
  ]);

  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
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
            <Users className="w-6 h-6 text-emerald-600" /> Admin Users &amp; Roles
          </h2>
          <p className="text-xs text-slate-500">
            Manage administrative access for store managers and staff members.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Admin User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-body">
              {users.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {usr.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">{usr.name}</span>
                      <span className="text-xs text-slate-500">{usr.email}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {usr.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {usr.lastLogin}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {usr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
