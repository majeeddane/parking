'use client';
import { useState } from 'react';
import { Menu, Bell, CheckCircle2, AlertCircle, Clock, Check, Trash2 } from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'تم إصدار بطاقة اشتراكك الرقمية بنجاح 🟢',
    desc: 'يسرنا إبلاغك بجاهزية بطاقة اشتراكك في مواقف السيارات لمدة سنة كاملة. يمكنك استخدام رمز QR للدخول المباشر.',
    time: 'قبل ساعتين',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'تمت الموافقة على طلب الاشتراك الخاص بك 🎉',
    desc: 'تم الانتهاء من مراجعة بياناتك ومستنداتك للطلب رقم PARK-2026-10482 واعتماد الأهلية.',
    time: 'أمس - 09:00 ص',
    type: 'info',
    read: true,
  },
  {
    id: 3,
    title: 'تم استلام وتوثيق مستندات الطلب 📄',
    desc: 'تم استلام الهوية الوطنية ورخص القيادة والسير وجارٍ تحويلها لفريق التدقيق.',
    time: '28 أغسطس 2026',
    type: 'pending',
    read: true,
  },
  {
    id: 4,
    title: 'تنبيه أمان وتسجيل الدخول 🔒',
    desc: 'تم تسجيل الدخول إلى حسابك من متصفح جديد في مدينة الرياض.',
    time: '28 أغسطس 2026',
    type: 'warning',
    read: true,
  },
];

export default function UserNotificationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <MawqifSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
              مركز الإشعارات
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={markAllRead}
              className="text-xs text-[#1677A8] font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              تحديد الكل كمقروء
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-4 max-w-3xl">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Bell size={36} className="text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">لا توجد إشعارات حالية</h3>
              <p className="text-xs text-slate-400">ستصلك الإشعارات والتنبيهات فور حدوث أي تحديث على طلباتك أو اشتراكك.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl p-5 border transition-all space-y-2 ${
                  !notif.read ? 'border-blue-300 bg-blue-50/30 shadow-sm' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-[#1677A8] shrink-0" />}
                    <h3 className="text-sm font-bold text-[#123B5D]">{notif.title}</h3>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pr-4">{notif.desc}</p>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
