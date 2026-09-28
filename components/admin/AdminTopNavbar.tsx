'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Plus,
  ExternalLink,
  Sparkles,
  X,
  Sprout,
  Image as ImageIcon,
  FileText,
  Menu,
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminTopNavbarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isCollapsed: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

/**
 * Responsive Admin Top Navbar component.
 * Includes mobile hamburger drawer trigger, search input, quick add dropdown, notifications popup, and view site button.
 *
 * @param {AdminTopNavbarProps} props - Component properties.
 * @returns {React.ReactElement} Rendered top navbar component.
 */
export const AdminTopNavbar: React.FC<AdminTopNavbarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsMobileOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const notifications = [
    { id: 1, title: 'New Garden Inquiry Received', time: '10 min ago', unread: true },
    { id: 2, title: 'New Customer Review Pending Approval', time: '1 hour ago', unread: true },
    { id: 3, title: 'Hero Slide Banner Updated Successfully', time: 'Yesterday', unread: false },
  ];

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header
      className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all duration-300 ${
        isCollapsed ? 'lg:pl-20' : 'lg:pl-72'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Mobile Left: Menu Toggle Button & Brand Icon */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 transition-colors"
            title="Open Menu"
          >
            <Menu className="w-5 h-5 text-emerald-800" />
          </button>

          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0 sm:hidden">
            <Sprout className="w-4 h-4" />
          </div>
        </div>

        {/* Desktop Left: Welcome Greeting & Date */}
        <div className="hidden lg:flex flex-col">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currentDateFormatted}</span>
          </div>
          <h1 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight">
            Welcome Back, Admin 👋
          </h1>
        </div>

        {/* Center: Global Search Input */}
        <div className="relative flex-1 max-w-xs sm:max-w-md min-w-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search products, enquiries..."
            className="w-full pl-9 pr-3 sm:pr-12 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
          />
          <kbd className="hidden md:inline-block absolute right-3 top-2.5 px-2 py-0.5 rounded bg-slate-200 text-[10px] font-mono text-slate-600">
            ⌘K
          </kbd>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Quick Add Button */}
          <div className="relative">
            <button
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="Quick Add"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </button>

            {/* Quick Add Dropdown */}
            <AnimatePresence>
              {showQuickAdd && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 sm:w-52 bg-white rounded-2xl border border-emerald-100 shadow-xl p-2 z-50 space-y-1"
                >
                  <button
                    onClick={() => {
                      setActiveTab('products');
                      setShowQuickAdd(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 text-left text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <Sprout className="w-4 h-4 text-emerald-600" /> + Add Product
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('hero-slider');
                      setShowQuickAdd(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 text-left text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600" /> + Hero Banner Slide
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('blogs');
                      setShowQuickAdd(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl hover:bg-emerald-50 text-left text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" /> + Blog / Care Guide
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* Notifications Popup Drawer */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl border border-emerald-100 shadow-2xl p-4 z-50 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-display font-bold text-xs sm:text-sm text-slate-900">
                      Notifications ({notifications.filter((n) => n.unread).length} Unread)
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 sm:p-3 rounded-2xl text-xs space-y-1 ${
                          n.unread ? 'bg-emerald-50/70 border border-emerald-100' : 'bg-slate-50'
                        }`}
                      >
                        <p className="font-bold text-slate-900 leading-snug">{n.title}</p>
                        <span className="text-[10px] text-slate-500 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Website Button */}
          <Link
            href="/"
            target="_blank"
            className="p-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="View Live Website"
          >
            <span className="hidden sm:inline">View Website</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

        </div>
      </div>
    </header>
  );
};
