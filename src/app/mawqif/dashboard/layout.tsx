'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMawqif } from '@/components/mawqif/MawqifContext';
import { Lock, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, currentUser } = useMawqif();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If not logged in, perform automatic redirect after quick check
    const activeUserId = typeof window !== 'undefined' ? localStorage.getItem('mawqif_active_user_id') : null;
    if (!activeUserId && !isLoggedIn) {
      const target = pathname ? encodeURIComponent(pathname) : '/mawqif/dashboard';
      router.replace(`/mawqif/login?redirect=${target}`);
    }
  }, [isLoggedIn, router, pathname]);

  // If still hydrating or unauthenticated, show protected lock screen
  if (!mounted || (!isLoggedIn && !currentUser)) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-between font-sans">
        <MawqifNavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Lock size={30} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-[#123B5D]">يلزم تسجيل الدخول أولاً</h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                لوحة التحكم مخصصة للمستفيدين المسجلين فقط. يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول إلى لوحة التحكم والتقديم على المواقف.
              </p>
            </div>
            <div className="space-y-2.5 pt-2">
              <Link
                href={`/mawqif/login?redirect=${encodeURIComponent(pathname || '/mawqif/dashboard')}`}
                className="mw-btn mw-btn-primary w-full justify-center py-2.5 font-bold"
              >
                <LogIn size={16} />
                تسجيل الدخول للحساب
              </Link>
              <Link
                href="/mawqif/register"
                className="mw-btn mw-btn-outline w-full justify-center py-2.5 font-bold"
              >
                <UserPlus size={16} />
                إنشاء حساب مستفيد جديد
              </Link>
            </div>
          </div>
        </div>
        <MawqifFooter />
      </div>
    );
  }

  return <>{children}</>;
}
