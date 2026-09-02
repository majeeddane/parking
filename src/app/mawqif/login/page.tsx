'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, Phone, Eye, EyeOff, ShieldCheck, UserPlus, LogIn } from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import { useMawqif } from '@/components/mawqif/MawqifContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/mawqif/dashboard';

  const { login } = useMawqif();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('يرجى إدخال رقم الجوال أو البريد الإلكتروني أو رقم الهوية');
      return;
    }
    if (!password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const result = login(identifier, password);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error || 'خطأ في تسجيل الدخول. تأكد من صحة البيانات.');
      } else {
        router.push(redirectTarget);
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] py-12 md:py-16 bg-[#F7F9FC] flex items-center justify-center font-sans">
      <div className="mw-container w-full max-w-md">
        
        {redirectTarget.includes('apply') && (
          <div className="mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold leading-relaxed mw-animate-fadeIn">
            ⚠️ يلزم تسجيل الدخول أو إنشاء حساب أولاً للتقديم على برنامج الاشتراك المجاني في المواقف.
          </div>
        )}

        {redirectTarget.includes('dashboard') && (
          <div className="mb-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[#123B5D] text-xs font-semibold leading-relaxed mw-animate-fadeIn">
            🔒 يرجى تسجيل الدخول بحسابك للوصول إلى لوحة التحكم وإدارة اشتراكاتك.
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
          
          {/* Header / Logo */}
          <div className="text-center space-y-3">
            <Link href="/mawqif" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/mawqif/logo-app.png"
                alt="مواقف Mawaqif"
                width={64}
                height={64}
                className="mx-auto drop-shadow-md rounded-2xl"
                priority
              />
            </Link>
            <h1 className="text-2xl font-extrabold text-[#123B5D]">تسجيل الدخول</h1>
            <p className="text-xs md:text-sm text-slate-500">
              أدخل بيانات حسابك لإدارة اشتراكاتك وتقديم الطلبات
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200 mw-animate-fadeIn">
                {error}
              </div>
            )}

            <div className="mw-form-group">
              <label className="mw-label">رقم الجوال أو البريد الإلكتروني أو رقم الهوية</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  className="mw-input text-right"
                  placeholder="05XXXXXXXX أو name@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="mw-form-group">
              <div className="flex items-center justify-between">
                <label className="mw-label">كلمة المرور</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('تم إرسال تعليمات استعادة كلمة المرور إلى هاتفك المسجل.'); }} className="text-xs text-[#1677A8] hover:underline font-semibold">
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
                  autoComplete="current-password"
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
              {isLoading ? <span className="mw-spinner" /> : (
                <>
                  <LogIn size={18} />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          {/* Quick Register link */}
          <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 text-center space-y-1">
            <span className="text-xs text-slate-600 block">ليس لديك حساب بعد؟</span>
            <Link
              href="/mawqif/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677A8] hover:underline"
            >
              <UserPlus size={14} />
              إنشاء حساب مستفيد جديد
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <MawqifNavbar />
      <Suspense fallback={<div className="p-8 text-center">جارٍ التحميل...</div>}>
        <LoginContent />
      </Suspense>
      <MawqifFooter />
    </>
  );
}
