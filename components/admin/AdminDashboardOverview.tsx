'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  Layers,
  Image as ImageIcon,
  FolderKanban,
  Inbox,
  Star,
  Wrench,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface DashboardOverviewProps {
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminDashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveTab }) => {
  const statCards = [
    {
      id: 'products' as AdminTab,
      title: 'Total Products',
      count: '520+',
      trend: '+18 this month',
      icon: Sprout,
      color: 'bg-emerald-500 text-white',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'categories' as AdminTab,
      title: 'Categories & Trees',
      count: '8 Groups',
      trend: 'Plants, Pots, Fountains',
      icon: Layers,
      color: 'bg-teal-600 text-white',
      borderColor: 'border-teal-200',
    },
    {
      id: 'hero-slider' as AdminTab,
      title: 'Hero Banners',
      count: '4 Active',
      trend: 'Autoplay Enabled',
      icon: ImageIcon,
      color: 'bg-amber-500 text-white',
      borderColor: 'border-amber-200',
    },
    {
      id: 'gallery' as AdminTab,
      title: 'Gallery Showcase',
      count: '48 Photos',
      trend: 'Masonry Pinterest Grid',
      icon: FolderKanban,
      color: 'bg-sky-600 text-white',
      borderColor: 'border-sky-200',
    },
    {
      id: 'inquiries' as AdminTab,
      title: 'New Enquiries',
      count: '12 Unread',
      trend: 'Requires WhatsApp Followup',
      icon: Inbox,
      color: 'bg-rose-500 text-white',
      borderColor: 'border-rose-200',
    },
    {
      id: 'testimonials' as AdminTab,
      title: 'Customer Reviews',
      count: '1,240+',
      trend: '4.9 ★ Rating Average',
      icon: Star,
      color: 'bg-amber-400 text-amber-950',
      borderColor: 'border-amber-200',
    },
    {
      id: 'services' as AdminTab,
      title: 'Garden Services',
      count: '6 Core',
      trend: 'Balcony & Society Setup',
      icon: Wrench,
      color: 'bg-emerald-700 text-white',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'stores' as AdminTab,
      title: 'Store Locations',
      count: '2 Branches',
      trend: 'Wakad & Hinjawadi',
      icon: MapPin,
      color: 'bg-slate-800 text-white',
      borderColor: 'border-slate-200',
    },
  ];

  const recentActivities = [
    { id: 1, title: 'New Garden Maintenance Enquiry from Wakad Society', time: '12 min ago', type: 'inquiry' },
    { id: 2, title: 'Peace Lily & Chinese Porcelain Pots updated', time: '45 min ago', type: 'product' },
    { id: 3, title: 'Hero Slide #2 banner updated with home-bg photo', time: '2 hours ago', type: 'hero' },
    { id: 4, title: '5-Star Customer Review approved for Sneha Kulkarni', time: 'Yesterday', type: 'review' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner Notice */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#072412] via-[#0B6B2E] to-emerald-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold uppercase tracking-widest border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Shivansh CMS Back-Office
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
            Nursery Content Management System
          </h2>
          <p className="font-body text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            Strictly focused on showcase products, category tree, photo galleries, customer enquiries, store branches, and site settings.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('inquiries')}
          className="px-5 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-100 transition-colors shadow-md shrink-0 flex items-center gap-2"
        >
          <span>View 12 Unread Enquiries</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 8 Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setActiveTab(card.id)}
              className={`bg-white rounded-3xl p-6 border ${card.borderColor} shadow-soft hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {card.title}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                    {card.count}
                  </h3>
                </div>

                <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shadow-sm shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500 font-medium">
                <span>{card.trend}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics & Activity Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Analytics Chart Container (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" /> Monthly Growth &amp; Content Activity
              </h3>
              <p className="text-xs text-slate-500">
                Products added and inquiry volume trend over past months.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Year 2026
            </span>
          </div>

          {/* Visual CSS Bar Chart Simulation */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200">
            {[
              { month: 'Jan', count: 40, height: 'h-24' },
              { month: 'Feb', count: 65, height: 'h-36' },
              { month: 'Mar', count: 85, height: 'h-48' },
              { month: 'Apr', count: 90, height: 'h-52' },
              { month: 'May', count: 110, height: 'h-56' },
              { month: 'Jun', count: 130, height: 'h-60' },
              { month: 'Jul', count: 145, height: 'h-64' },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full max-w-[40px] bg-slate-100 rounded-t-xl overflow-hidden relative group-hover:bg-emerald-100 transition-colors flex items-end">
                  <div className={`w-full ${bar.height} bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-xl group-hover:scale-105 transition-transform duration-300`} />
                </div>
                <span className="text-xs font-semibold text-slate-600">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs font-medium text-slate-600 pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block">Top Category</span>
              <span className="font-bold text-slate-900 text-sm">Indoor Plants</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block">Top Pot Type</span>
              <span className="font-bold text-slate-900 text-sm">Chinese Ceramic</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block">Primary Branch</span>
              <span className="font-bold text-slate-900 text-sm">New Wakad</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" /> Recent Activity
            </h3>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800 leading-snug">{act.title}</p>
                  <span className="text-[10px] text-slate-400 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('inquiries')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
            >
              View All Inquiries
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
