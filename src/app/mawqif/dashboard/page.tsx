'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Car,
  QrCode,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronLeft,
  Bell,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';

export default function UserDashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Sidebar */}
      <MawqifSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
              لوحة تحكم المستفيد
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/mawqif/dashboard/notifications"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 relative transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </Link>
            <Link
              href="/mawqif/dashboard/subscription"
              className="mw-btn mw-btn-primary text-xs py-2 px-3.5 font-bold hidden sm:inline-flex"
            >
              <QrCode size={15} />
              عرض بطاقتي الرقمية
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 md:p-8 space-y-6 max-w-6xl">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#123B5D] via-[#165a88] to-[#1677A8] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-cyan-950/10">
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles size={13} className="text-cyan-200" />
                  برنامج المواقف المجاني
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold">مرحبًا، محمد العتيبي 👋</h2>
                <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">
                  اشتراكك في مواقف السيارات مجاني ومفعّل بنجاح لمدة 365 يومًا. يمكنك استخدام بطاقة الـ QR Code عند جميع البوابات المؤهلة.
                </p>
              </div>

              <Link
                href="/mawqif/dashboard/subscription"
                className="inline-flex items-center justify-center gap-2 bg-[#19A974] hover:bg-[#14896a] text-white px-5 py-3 rounded-2xl text-xs md:text-sm font-bold shadow-md shadow-emerald-950/20 transition-all shrink-0"
              >
                <QrCode size={18} />
                فتح بطاقة الاشتراك
              </Link>
            </div>
          </div>

          {/* Quick 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">حالة الطلب</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#19A974]" />
                <span className="text-base font-bold text-[#19A974]">تمت الموافقة</span>
              </div>
              <span className="text-[11px] text-slate-400 block">معتمد برقم PARK-2026-10482</span>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">حالة الاشتراك</span>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#1677A8]" />
                <span className="text-base font-bold text-[#123B5D]">اشتراك فعّال</span>
              </div>
              <span className="text-[11px] text-slate-400 block">مجانًا لمدة 12 شهرًا</span>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">المدة المتبقية</span>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-amber-500" />
                <span className="text-base font-bold text-slate-800">365 يومًا</span>
              </div>
              <span className="text-[11px] text-slate-400 block">ينتهي في 31 أغسطس 2027</span>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">المركبة المعتمدة</span>
              <div className="flex items-center gap-2">
                <Car size={18} className="text-[#123B5D]" />
                <span className="text-sm font-bold text-[#123B5D] truncate">Toyota Camry</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono font-bold block">أ ب ج 1234</span>
            </div>

          </div>

          {/* Main Grid: Application Status & Recent Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 2 Cols: Detailed Application Progression */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#1677A8]" />
                  <h3 className="font-bold text-[#123B5D] text-base">سجل الطلب الحالي</h3>
                </div>
                <Link
                  href="/mawqif/track?id=PARK-2026-10482"
                  className="text-xs font-bold text-[#1677A8] hover:underline flex items-center gap-1"
                >
                  صفحة التتبع المفصلة
                  <ChevronLeft size={14} />
                </Link>
              </div>

              {/* Application Details Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">رقم الطلب</span>
                  <span className="font-bold text-[#123B5D] font-mono text-sm" dir="ltr">PARK-2026-10482</span>
                </div>
                <div>
                  <span className="text-slate-400 block">النوع</span>
                  <span className="font-bold text-slate-800">اشتراك مواقف سنوي</span>
                </div>
                <div>
                  <span className="text-slate-400 block">تاريخ الإرسال</span>
                  <span className="font-bold text-slate-800">28 أغسطس 2026</span>
                </div>
                <div>
                  <span className="text-slate-400 block">القرار</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">معتمد ومقبول</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">المراحل المكتملة</h4>
                <div className="space-y-3">
                  {[
                    { title: 'تم استلام وتوثيق طلبك إلكترونيًا', time: '28 أغسطس 2026 - 10:30 ص', done: true },
                    { title: 'تم تدقيق الهوية ورخص القيادة والسير', time: '29 أغسطس 2026 - 02:15 م', done: true },
                    { title: 'اعتماد الأهلية والموافقة النهائية', time: '30 أغسطس 2026 - 09:00 ص', done: true },
                    { title: 'توليد بطاقة الاشتراك الرقمية وتفعيل الدخول التلقائي', time: '30 أغسطس 2026 - 09:05 ص', done: true },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#19A974] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        ✓
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-semibold text-slate-800">{step.title}</span>
                        <span className="text-[11px] text-slate-400">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 1 Col: Notification Center Quick View */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-[#1677A8]" />
                  <h3 className="font-bold text-[#123B5D] text-base">مركز الإشعارات</h3>
                </div>
                <Link
                  href="/mawqif/dashboard/notifications"
                  className="text-xs text-[#1677A8] hover:underline font-bold"
                >
                  الكل (3)
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'تم إصدار بطاقة اشتراكك',
                    desc: 'بطاقتك الرقمية جاهزة للاستخدام عبر QR Code.',
                    time: 'قبل ساعتين',
                    isNew: true,
                  },
                  {
                    title: 'تمت الموافقة على طلبك',
                    desc: 'تم اعتماد طلب الاشتراك PARK-2026-10482 بنجاح.',
                    time: 'اليوم',
                    isNew: false,
                  },
                  {
                    title: 'تم استلام المستندات',
                    desc: 'فريق التدقيق باشر مراجعة الوثائق المرفقة.',
                    time: 'أمس',
                    isNew: false,
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      n.isNew ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#123B5D]">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/mawqif/faq"
                  className="block text-center py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  هل لديك استفسار؟ اقرأ الأسئلة الشائعة
                </Link>
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
