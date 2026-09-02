'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Check,
  Trash2,
  FileText,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';
import { useMawqif } from '@/components/mawqif/MawqifContext';

export default function UserNotificationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { notifications, markNotificationsRead, clearNotifications, deleteNotification, currentUser } = useMawqif();

  const getNotifIcon = (title: string, desc: string) => {
    if (title.includes('اعتماد') || title.includes('الموافقة') || title.includes('جاهزية') || title.includes('تفعيل') || title.includes('🎉') || title.includes('🟢')) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#19A974] flex items-center justify-center shrink-0 border border-emerald-100">
          <CheckCircle2 size={20} />
        </div>
      );
    }
    if (title.includes('رفض') || title.includes('لم يتم') || title.includes('❌')) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
          <AlertCircle size={20} />
        </div>
      );
    }
    if (title.includes('تعديل') || title.includes('مطلوب') || title.includes('⚠️')) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
          <AlertTriangle size={20} />
        </div>
      );
    }
    if (title.includes('إعادة إرسال') || title.includes('🔄')) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#1677A8] flex items-center justify-center shrink-0 border border-cyan-100">
          <RotateCcw size={20} />
        </div>
      );
    }
    if (title.includes('أهلاً') || title.includes('مرحبًا') || title.includes('👋')) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1677A8] flex items-center justify-center shrink-0 border border-blue-100">
          <Sparkles size={20} />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
        <FileText size={20} />
      </div>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
                مركز الإشعارات
              </h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} غير مقروء
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markNotificationsRead}
                  className="text-xs text-[#1677A8] font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <Check size={14} />
                  تحديد الكل كمقروء
                </button>
                <button
                  onClick={clearNotifications}
                  className="text-xs text-red-600 hover:text-red-700 font-bold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  title="مسح جميع الإشعارات"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-4 max-w-3xl">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 mw-animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto">
                <Bell size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-700 text-base">لا توجد إشعارات حالية</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  ستصلك الإشعارات والتنبيهات الفورية فور حدوث أي تحديث على طلبك أو تفعيل اشتراكك في مواقف السيارات.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/mawqif/dashboard"
                  className="mw-btn mw-btn-outline text-xs py-2 px-4 font-bold bg-white"
                >
                  <ChevronLeft size={14} />
                  العودة للوحة التحكم
                </Link>
              </div>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl p-5 border transition-all space-y-3 mw-animate-fadeIn ${
                  !notif.read ? 'border-blue-300 bg-blue-50/40 shadow-sm' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {getNotifIcon(notif.title, notif.desc)}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#123B5D]">{notif.title}</h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {notif.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {notif.time}
                    </span>
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="text-slate-300 hover:text-red-500 p-1 rounded-lg transition-colors"
                      title="حذف الإشعار"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Direct Action Link if notif is rejected / needs_edit or approved */}
                {(notif.title.includes('رفض') || notif.title.includes('تعديل')) && (
                  <div className="pt-1 pr-13 flex gap-2">
                    <Link
                      href="/mawqif/apply"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1677A8] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                    >
                      <RotateCcw size={13} />
                      تعديل وإعادة إرسال الطلب
                    </Link>
                  </div>
                )}

                {(notif.title.includes('اعتماد') || notif.title.includes('جاهزية') || notif.title.includes('تفعيل')) && (
                  <div className="pt-1 pr-13 flex gap-2">
                    <Link
                      href="/mawqif/dashboard/subscription"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                    >
                      <CheckCircle2 size={13} />
                      استعراض بطاقة الاشتراك
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
