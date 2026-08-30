'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Car,
  Bell,
  User,
  HelpCircle,
  LogOut,
  QrCode,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

interface Props {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { href: '/mawqif/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/mawqif/dashboard/subscription', label: 'بطاقة اشتراكي', icon: QrCode, badge: 'فعال' },
  { href: '/mawqif/dashboard/applications', label: 'طلباتي', icon: FileText, badge: '1' },
  { href: '/mawqif/dashboard/vehicles', label: 'مركباتي', icon: Car },
  { href: '/mawqif/dashboard/notifications', label: 'الإشعارات', icon: Bell, badgeDot: true },
  { href: '/mawqif/dashboard/profile', label: 'بياناتي الشخصية', icon: User },
];

export default function MawqifSidebar({ mobileOpen, onCloseMobile }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden mw-animate-fadeIn"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-64 bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/mawqif" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#1677A8] text-white flex items-center justify-center">
              <Car size={18} />
            </div>
            <div>
              <span className="font-black text-base text-[#123B5D] block leading-none">مواقف</span>
              <span className="text-[10px] text-slate-400 font-medium">بوابة المستفيدين</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden text-slate-400 hover:text-slate-700 p-1">
              ✕
            </button>
          )}
        </div>

        {/* User Quick Profile Snippet */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#123B5D] text-white font-bold text-sm flex items-center justify-center shrink-0">
            م.ع
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-[#123B5D] truncate">محمد أحمد العتيبي</div>
            <div className="text-[11px] text-[#19A974] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19A974] inline-block" />
              مستفيد معتمد
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#123B5D] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#123B5D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={18} className={isActive ? 'text-cyan-300' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.badgeDot && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/mawqif/admin"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-500 hover:text-[#123B5D] hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ShieldCheck size={16} />
            <span>لوحة الإدارة (Admin)</span>
          </Link>
          <Link
            href="/mawqif"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
