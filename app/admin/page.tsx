'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { AdminTopNavbar } from '@/components/admin/AdminTopNavbar';
import { AdminDashboardOverview } from '@/components/admin/AdminDashboardOverview';
import { ProductManager } from '@/components/admin/ProductManager';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { HeroSliderCMS } from '@/components/admin/HeroSliderCMS';
import { GalleryCMS } from '@/components/admin/GalleryCMS';
import { ServicesCMS } from '@/components/admin/ServicesCMS';
import { StoreManager } from '@/components/admin/StoreManager';
import { BlogsCMS } from '@/components/admin/BlogsCMS';
import { InquiryManager } from '@/components/admin/InquiryManager';
import { ReviewManager } from '@/components/admin/ReviewManager';
import { AdminUsersCMS } from '@/components/admin/AdminUsersCMS';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { AdminProfileCMS } from '@/components/admin/AdminProfileCMS';

/**
 * Main Admin Dashboard Portal Page.
 * Securely manages website CMS tabs with responsive desktop sidebar & mobile slide-over menu.
 *
 * @returns {React.ReactElement} The rendered admin dashboard layout.
 */
export default function AdminDashboardPage(): React.ReactElement {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session or local authentication safely
    if (typeof window !== 'undefined') {
      const sessAuth = sessionStorage.getItem('shivansh_admin_auth');
      const localAuth = localStorage.getItem('shivansh_admin_auth');

      if (sessAuth === 'true' || localAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('shivansh_admin_auth');
      sessionStorage.removeItem('shivansh_admin_user');
      localStorage.removeItem('shivansh_admin_auth');
      localStorage.removeItem('shivansh_admin_user');
    }
    router.push('/admin/login');
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#072412] flex items-center justify-center text-white font-body px-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 flex flex-col font-body antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Responsive Sidebar & Mobile Drawer */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onLogout={handleLogout}
        unreadInquiriesCount={3}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        
        {/* Top Navbar */}
        <AdminTopNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Dynamic Body Content */}
        <main
          className={`flex-1 p-3 sm:p-6 lg:p-8 transition-all duration-300 overflow-x-hidden ${
            isCollapsed ? 'lg:pl-24' : 'lg:pl-80'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'dashboard' && <AdminDashboardOverview setActiveTab={setActiveTab} />}
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'categories' && <CategoryManager />}
            {activeTab === 'hero-slider' && <HeroSliderCMS />}
            {activeTab === 'gallery' && <GalleryCMS />}
            {activeTab === 'services' && <ServicesCMS />}
            {activeTab === 'stores' && <StoreManager />}
            {activeTab === 'blogs' && <BlogsCMS />}
            {activeTab === 'inquiries' && <InquiryManager />}
            {activeTab === 'testimonials' && <ReviewManager />}
            {activeTab === 'users' && <AdminUsersCMS />}
            {activeTab === 'settings' && <SettingsManager />}
            {activeTab === 'profile' && <AdminProfileCMS />}
          </div>
        </main>

        {/* Footer */}
        <footer
          className={`py-4 px-4 sm:px-6 text-center text-xs text-slate-500 border-t border-emerald-100 bg-white transition-all duration-300 ${
            isCollapsed ? 'lg:pl-24' : 'lg:pl-80'
          }`}
        >
          <p>© {new Date().getFullYear()} Shivansh Rose Nursery — Premium CMS SaaS Management System</p>
        </footer>

      </div>
    </div>
  );
}
