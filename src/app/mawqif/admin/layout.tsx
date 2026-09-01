'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, KeyRound, AlertCircle, ArrowLeft, Car } from 'lucide-react';
import Link from 'next/link';

const ADMIN_PASSCODE = '773277';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check if previously authenticated in this browser session
    const authStatus = typeof window !== 'undefined' ? sessionStorage.getItem('mawqif_admin_auth') || localStorage.getItem('mawqif_admin_auth') : null;
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setChecked(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('يرجى إدخال رمز المرور السري للدخول.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (password.trim() === ADMIN_PASSCODE) {
        setIsAuthenticated(true);
        sessionStorage.setItem('mawqif_admin_auth', 'true');
        localStorage.setItem('mawqif_admin_auth', 'true');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError('رمز المرور غير صحيح. الوصول مقصور على المشرفين المعتمدين فقط.');
      }
    }, 300);
  };

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#123B5D] flex items-center justify-center text-white">
        <div className="mw-spinner w-8 h-8" />
      </div>
    );
  }

  // If not authenticated with passcode 773277, show secure passcode entry gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0e273f] via-[#123B5D] to-[#164e75] flex items-center justify-center p-4 font-sans" dir="rtl">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl space-y-6 text-center mw-animate-scaleIn">
          
          {/* Header Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#123B5D] to-[#19A974] text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-950/20 border border-white/30">
            <Lock size={30} />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#123B5D] px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
              <ShieldCheck size={14} className="text-[#1677A8]" />
              بوابة المشرفين والدعم الفني
            </div>
            <h1 className="text-2xl font-black text-[#123B5D]">
              تسجيل دخول المشرف
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              هذه المنطقة محمية ومخصصة لإدارة منصة مواقف وتدقيق طلبات المشتركين. يرجى إدخال رمز المرور السري للمتابعة.
            </p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-right">
            
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-50 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-2 mw-animate-fadeIn">
                <AlertCircle size={16} className="shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">رمز المرور السري (Passcode)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 pl-10 text-center font-mono font-black text-lg text-[#123B5D] tracking-widest outline-none focus:border-[#1677A8] focus:bg-white transition-all shadow-inner"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#123B5D] to-[#1677A8] hover:from-[#0d2a42] hover:to-[#125c82] text-white py-3.5 rounded-2xl text-sm font-black shadow-lg shadow-blue-950/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="mw-spinner" />
              ) : (
                <>
                  <KeyRound size={17} />
                  فتح لوحة التحكم
                </>
              )}
            </button>

          </form>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/mawqif" className="text-[#1677A8] hover:underline font-semibold flex items-center gap-1">
              <ArrowLeft size={13} />
              العودة للموقع الرئيسي
            </Link>
            <span className="font-mono text-[11px] text-slate-400">ADMIN-GATE-2026</span>
          </div>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}
