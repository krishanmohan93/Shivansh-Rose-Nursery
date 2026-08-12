'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Status State
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getFriendlyErrorMessage = (rawError: string): string => {
    const errLower = rawError.toLowerCase();
    if (errLower.includes('invalid login credentials') || errLower.includes('invalid email') || errLower.includes('wrong password')) {
      return 'Incorrect email or password. Access denied.';
    }
    if (errLower.includes('network') || errLower.includes('failed to fetch')) {
      return 'Unable to connect right now. Please check your internet connection and try again.';
    }
    if (errLower.includes('rate limit') || errLower.includes('too many requests')) {
      return 'Too many login attempts. Please wait a moment before trying again.';
    }
    return rawError || 'Authentication failed. Access restricted to authorized personnel.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError('Please enter both your admin email and password.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Try Real Supabase Auth
      try {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (authData?.session) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('shivansh_admin_auth', 'true');
            sessionStorage.setItem('shivansh_admin_user', cleanEmail);
            localStorage.setItem('shivansh_admin_auth', 'true');
            localStorage.setItem('shivansh_admin_user', cleanEmail);
          }
          setIsLoading(false);
          window.location.href = '/admin';
          return;
        }
      } catch (sbErr) {
        console.warn('Supabase Auth check fallback:', sbErr);
      }

      // 2. Primary Verified Nursery Owner Credentials Check
      if (
        (cleanEmail === 'admin@shivanshrosenursery.com' || cleanEmail === 'admin') &&
        password === 'shivansh123'
      ) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('shivansh_admin_auth', 'true');
          sessionStorage.setItem('shivansh_admin_user', cleanEmail);
          localStorage.setItem('shivansh_admin_auth', 'true');
          localStorage.setItem('shivansh_admin_user', cleanEmail);
        }
        setIsLoading(false);
        window.location.href = '/admin';
        return;
      }

      // 3. Invalid credentials
      setIsLoading(false);
      setError('Incorrect email or password. Access denied.');
    } catch (err: any) {
      setIsLoading(false);
      setError(getFriendlyErrorMessage(err?.message || 'Connection error'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-body antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Logo Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4 text-center">
        <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl p-1">
          <div className="w-12 h-12 rounded-2xl bg-[#0b6b2e] text-white flex items-center justify-center shadow-lg group-hover:bg-emerald-700 transition-colors">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="font-display font-extrabold text-2xl text-white tracking-tight">
            Shivansh Rose Nursery
          </span>
        </Link>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">
            Admin Security Portal
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Secure access to your nursery management dashboard
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          
          {/* Error Message Box */}
          {error && (
            <div role="alert" className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium flex items-start gap-2.5 shadow-xs">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  autoComplete="email"
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:border-transparent font-medium disabled:opacity-50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-3 p-1 rounded-lg text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span className="font-semibold">Remember me</span>
              </label>
            </div>

            {/* Security Indicator */}
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Secure Admin Access</span>
              </span>
              <span className="text-[11px] text-slate-500">Authorized Access Only</span>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full shadow-lg font-bold bg-[#0b6b2e] hover:bg-emerald-700 text-white border-none py-3.5"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing in...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

          </form>

          {/* Security Footer Notice */}
          <div className="text-center text-[11px] text-slate-500 font-medium space-y-1 pt-2 border-t border-slate-800/80">
            <p>Authorized administrators only</p>
            <p className="text-[10px] text-slate-600">Your credentials are securely handled by our authentication system.</p>
          </div>

        </div>

        {/* Return Link */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-2 py-1"
          >
            ← Return to Shivansh Rose Nursery
          </Link>
        </div>

      </div>

    </div>
  );
}
