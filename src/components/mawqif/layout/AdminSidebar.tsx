'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck,
  Users,
  Car,
  CreditCard,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface Props {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const adminNavItems = [
  { href: '/mawqif/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/mawqif/admin/applications', label: 'إدارة الطلبات', icon: FileCheck, badge: '4 جديدة' },
  { href: '/mawqif/admin#subscribers', label: 'المستفيدون', icon: Users },
  { href: '/mawqif/admin#vehicles', label: 'المركبات', icon: Car },
  { href: '/mawqif/admin#subscriptions', label: 'الاشتراكات الفعالة', icon: CreditCard },
  { href: '/mawqif/admin#garages', label: 'المواقف المعتمدة', icon: MapPin },
  { href: '/mawqif/admin#reports', label: 'التقارير والإحصائيات', icon: BarChart3 },
  { href: '/mawqif/admin#settings', label: 'الإعدادات', icon: Settings },
];

export default function AdminSidebar({ mobileOpen, onCloseMobile }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-64 bg-[#123B5D] text-white flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/mawqif/admin" className="flex items-center gap-2.5">
            <Image
              src="/mawqif/logo-icon-white.png"
              alt="شعار مواقف"
              width={34}
              height={34}
              className="object-contain shrink-0"
              priority
            />
            <div>
              <span className="font-extrabold text-base tracking-tight block leading-none">مواقف | الإدارة</span>
              <span className="text-[10px] text-cyan-300 font-semibold">بوابة الموظفين والمشرفين</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden text-white/70 hover:text-white p-1">
              ✕
            </button>
          )}
        </div>

        {/* Admin Officer Profile */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#19A974] text-white font-bold text-xs flex items-center justify-center shrink-0">
            أدمن
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">فهد بن ناصر</div>
            <div className="text-[10px] text-cyan-200">مشرف تدقيق الطلبات</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white/20 text-white shadow-inner font-bold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={17} className={isActive ? 'text-cyan-300' : 'text-white/60'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#19A974] text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Switch back to User Portal or Site */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/mawqif/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-cyan-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowRight size={15} />
            <span>العودة لبوابة المستفيدين</span>
          </Link>
          <Link
            href="/mawqif"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut size={15} />
            <span>تسجيل الخروج</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
