'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Lock, Mail, Phone, ArrowLeft, Eye, EyeOff, Shield, ShieldCheck, UserCheck } from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('0501234567');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('يرجى إدخال رقم الجوال أو البريد الإلكتروني');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/mawqif/dashboard');
    }, 600);
  };

  const handleAdminDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/mawqif/admin');
    }, 400);
  };

  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[80vh] py-12 md:py-16 bg-[#F7F9FC] flex items-center justify-center">
        <div className="mw-container w-full max-w-md">
          
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
            
            {/* Header / Logo */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#123B5D] to-[#1677A8] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-[#123B5D]/20">
                <Car size={28} />
              </div>
              <h1 className="text-2xl font-extrabold text-[#123B5D]">تسجيل الدخول</h1>
              <p className="text-xs md:text-sm text-slate-500">
                أدخل بيانات حسابك لإدارة اشتراكاتك ومتابعة طلباتك
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200 mw-animate-fadeIn">
                  {error}
                </div>
              )}

              <div className="mw-form-group">
                <label className="mw-label">رقم الجوال أو البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="text"
                    dir="ltr"
                    className="mw-input text-right"
                    placeholder="05XXXXXXXX أو name@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="mw-form-group">
                <div className="flex items-center justify-between">
                  <label className="mw-label">كلمة المرور</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('تم إرسال رمز إعادة التعيين إلى جوالك'); }} className="text-xs text-[#1677A8] hover:underline">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    dir="ltr"
                    className="mw-input text-right pr-4 pl-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mw-btn mw-btn-primary w-full py-3 font-bold rounded-xl shadow-md"
              >
                {isLoading ? <span className="mw-spinner" /> : 'تسجيل الدخول'}
              </button>
            </form>

            {/* Demo Quick Admin Access */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAdminDemoLogin}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
              >
                <ShieldCheck size={16} className="text-[#123B5D]" />
                الدخول السريع كمسؤول للنظام (Admin Dashboard)
              </button>
            </div>

            {/* Don't have an account */}
            <div className="text-center text-xs text-slate-500 pt-1">
              ليس لديك حساب بعد؟{' '}
              <Link href="/mawqif/apply" className="text-[#1677A8] font-bold hover:underline">
                قدّم طلب اشتراك جديد
              </Link>
            </div>

          </div>

        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
