'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Sprout,
  Layers,
  Image as ImageIcon,
  FolderKanban,
  Wrench,
  MapPin,
  FileText,
  Inbox,
  Star,
  Users,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'hero-slider'
  | 'gallery'
  | 'services'
  | 'stores'
  | 'blogs'
  | 'inquiries'
  | 'testimonials'
  | 'users'
  | 'settings'
  | 'profile';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
  unreadInquiriesCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  onLogout,
  unreadInquiriesCount = 3,
}) => {
  const menuItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as AdminTab, label: 'Products Showcase', icon: Sprout },
    { id: 'categories' as AdminTab, label: 'Categories Tree', icon: Layers },
    { id: 'hero-slider' as AdminTab, label: 'Hero Banners', icon: ImageIcon },
    { id: 'gallery' as AdminTab, label: 'Photo Gallery', icon: FolderKanban },
    { id: 'services' as AdminTab, label: 'Garden Services', icon: Wrench },
    { id: 'stores' as AdminTab, label: 'Store Locations', icon: MapPin },
    { id: 'blogs' as AdminTab, label: 'Blogs & Care Guides', icon: FileText },
    {
      id: 'inquiries' as AdminTab,
      label: 'Contact Enquiries',
      icon: Inbox,
      badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : undefined,
    },
    { id: 'testimonials' as AdminTab, label: 'Testimonials', icon: Star },
    { id: 'users' as AdminTab, label: 'Admin Users', icon: Users },
    { id: 'settings' as AdminTab, label: 'Website Settings', icon: Settings },
    { id: 'profile' as AdminTab, label: 'Profile & Security', icon: User },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-[#072412] text-white flex flex-col justify-between transition-all duration-300 border-r border-emerald-900/60 shadow-2xl ${
        isCollapsed ? 'w-20' : 'w-64 sm:w-72'
      }`}
    >
      {/* Top Header & Brand */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-emerald-900/50">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-emerald-950 flex items-center justify-center font-bold shadow-md shrink-0">
            <Sprout className="w-5 h-5 text-emerald-950" />
          </div>

          {!isCollapsed && (
            <div className="space-y-0.5 truncate">
              <span className="font-display font-bold text-base text-white tracking-tight block truncate">
                Shivansh Rose
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                Nursery CMS SaaS
              </span>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 transition-colors ${
            isCollapsed ? 'hidden sm:block' : 'block'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Scrollable Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/50'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-emerald-400'}`} />

              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 shadow-xs">
                  {item.badge}
                </span>
              )}

              {isCollapsed && item.badge && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-emerald-900/50 space-y-2">
        {!isCollapsed && (
          <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 font-bold text-xs flex items-center justify-center">
                A
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-tight">Store Owner</span>
                <span className="text-[10px] text-emerald-300 block">admin@shivansh.com</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/40 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Logout"
        >
          <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
          {!isCollapsed && <span>Logout Account</span>}
        </button>
      </div>
    </aside>
  );
};
