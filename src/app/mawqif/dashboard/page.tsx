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
  ChevronLeft,
  Bell,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  AlertCircle,
  AlertTriangle,
  RotateCcw,
  FileSearch
} from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';
import { useMawqif } from '@/components/mawqif/MawqifContext';
import StatusBadge from '@/components/mawqif/ui/StatusBadge';

export default function UserDashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { currentUser, userApplication, notifications, isLoggedIn } = useMawqif();

  const isApproved = userApplication?.status === 'approved' || userApplication?.status === 'completed';
  const isRejected = userApplication?.status === 'rejected';
  const isNeedsEdit = userApplication?.status === 'needs_edit';
  const isPending = userApplication?.status === 'pending';
  const hasApp = !!userApplication;

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <MawqifSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

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
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
            
            {isApproved ? (
              <Link
                href="/mawqif/dashboard/subscription"
                className="mw-btn mw-btn-primary text-xs py-2 px-3.5 font-bold hidden sm:inline-flex"
              >
                <QrCode size={15} />
                عرض بطاقتي الرقمية
              </Link>
            ) : isRejected || isNeedsEdit ? (
              <Link
                href="/mawqif/apply"
                className="mw-btn mw-btn-accent text-xs py-2 px-3.5 font-bold text-white hidden sm:inline-flex"
              >
                <RotateCcw size={15} />
                تعديل وإعادة إرسال الطلب
              </Link>
            ) : isPending ? (
              <Link
                href={`/mawqif/track?id=${userApplication?.id}`}
                className="mw-btn mw-btn-outline text-xs py-2 px-3.5 font-bold bg-white hidden sm:inline-flex"
              >
                <FileSearch size={15} />
                متابعة حالة الطلب
              </Link>
            ) : (
              <Link
                href="/mawqif/apply"
                className="mw-btn mw-btn-accent text-xs py-2 px-3.5 font-bold text-white hidden sm:inline-flex"
              >
                <PlusCircle size={15} />
                تقديم طلب اشتراك
              </Link>
            )}
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 md:p-8 space-y-6 max-w-6xl">
          
          {/* Welcome Banner Personalized to User */}
          <div className="bg-gradient-to-r from-[#123B5D] via-[#165a88] to-[#1677A8] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-cyan-950/10">
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles size={13} className="text-cyan-200" />
                  برنامج المواقف المجاني
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  مرحبًا، {currentUser?.firstName || 'المستفيد'} 👋
                </h2>
                <p className="text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">
                  {isApproved
                    ? 'اشتراكك في مواقف السيارات مجاني ومفعّل بنجاح لمدة 365 يومًا. يمكنك استخدام بطاقة الـ QR Code عند جميع البوابات المؤهلة.'
                    : isRejected
                    ? 'تم رفض طلبك السابق. يمكنك الآن مراجعة سبب الرفض وتعديل بياناتك ومستنداتك وإعادة إرسال الطلب للمراجعة.'
                    : isNeedsEdit
                    ? 'يتطلب طلبك تعديل بعض المستندات. يرجى مراجعة الملاحظات وإعادة إرسال الطلب.'
                    : isPending
                    ? 'طلبك لاشتراك المواقف المجاني قيد المراجعة والتدقيق من قبل فريق العمل المختص.'
                    : 'أهلاً بك! لم تقدم طلب اشتراك بعد. يمكنك الآن التقديم للحصول على اشتراك مجاني في مواقف السيارات لمدة سنة كاملة.'}
                </p>
              </div>

              {isApproved ? (
                <Link
                  href="/mawqif/dashboard/subscription"
                  className="inline-flex items-center justify-center gap-2 bg-[#19A974] hover:bg-[#14896a] text-white px-5 py-3 rounded-2xl text-xs md:text-sm font-bold shadow-md shadow-emerald-950/20 transition-all shrink-0"
                >
                  <QrCode size={18} />
                  فتح بطاقة الاشتراك
                </Link>
              ) : isRejected || isNeedsEdit ? (
                <Link
                  href="/mawqif/apply"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-2xl text-xs md:text-sm font-bold shadow-md transition-all shrink-0"
                >
                  <RotateCcw size={18} />
                  تعديل وإعادة الإرسال
                </Link>
              ) : isPending ? (
                <Link
                  href={`/mawqif/track?id=${userApplication?.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-5 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all shrink-0"
                >
                  <FileSearch size={18} />
                  تتبع حالة الطلب
                </Link>
              ) : (
                <Link
                  href="/mawqif/apply"
                  className="inline-flex items-center justify-center gap-2 bg-[#19A974] hover:bg-[#14896a] text-white px-6 py-3 rounded-2xl text-xs md:text-sm font-bold shadow-md transition-all shrink-0"
                >
                  <PlusCircle size={18} />
                  قدّم طلبك الآن
                </Link>
              )}
            </div>
          </div>

          {/* Quick 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">حالة الطلب</span>
              <div className="flex items-center gap-2">
                {hasApp ? (
                  <StatusBadge status={userApplication.status} size="sm" />
                ) : (
                  <span className="text-sm font-bold text-slate-400">لا يوجد طلب حالي</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 block">
                {hasApp ? `رقم: ${userApplication.id}` : 'اضغط للتقديم'}
              </span>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">حالة الاشتراك</span>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className={isApproved ? 'text-[#19A974]' : 'text-slate-400'} />
                <span className={`text-base font-bold ${isApproved ? 'text-[#123B5D]' : 'text-slate-500'}`}>
                  {isApproved ? 'اشتراك فعّال' : hasApp ? (isRejected ? 'مرفوض' : isNeedsEdit ? 'بانتظار التعديل' : 'بانتظار الاعتماد') : 'غير مشترك'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block">
                {isApproved ? 'مجانًا لمدة 12 شهرًا' : 'سنة كاملة مجانًا'}
              </span>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">المدة المتبقية</span>
              <div className="flex items-center gap-2">
                <Clock size={18} className={isApproved ? 'text-emerald-500' : 'text-slate-400'} />
                <span className="text-base font-bold text-slate-800">
                  {isApproved ? '365 يومًا' : '—'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block">
                {isApproved ? 'ينتهي في 31 أغسطس 2027' : 'يبدأ فور الموافقة'}
              </span>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">المركبة المسجلة</span>
              <div className="flex items-center gap-2">
                <Car size={18} className="text-[#123B5D]" />
                <span className="text-sm font-bold text-[#123B5D] truncate">
                  {userApplication?.vehicleMake ? `${userApplication.vehicleMake} ${userApplication.vehicleModel}` : 'لم تُسجل بعد'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono font-bold block">
                {userApplication?.plateNumber || '—'}
              </span>
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
                {hasApp && (
                  <Link
                    href={`/mawqif/track?id=${userApplication.id}`}
                    className="text-xs font-bold text-[#1677A8] hover:underline flex items-center gap-1"
                  >
                    صفحة التتبع المفصلة
                    <ChevronLeft size={14} />
                  </Link>
                )}
              </div>

              {hasApp ? (
                <>
                  {/* Application Details Summary */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">رقم الطلب</span>
                      <span className="font-bold text-[#123B5D] font-mono text-sm" dir="ltr">{userApplication.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">النوع</span>
                      <span className="font-bold text-slate-800">اشتراك مواقف سنوي</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">تاريخ الإرسال</span>
                      <span className="font-bold text-slate-800">{userApplication.submissionDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">القرار</span>
                      <StatusBadge status={userApplication.status} size="sm" />
                    </div>
                  </div>

                  {/* Rejection / Needs Edit Alert Banner inside Dashboard */}
                  {(isRejected || isNeedsEdit) && (
                    <div className={`p-4 rounded-2xl border space-y-2.5 ${
                      isRejected ? 'bg-red-50 border-red-200 text-red-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-bold text-xs md:text-sm">
                          {isRejected ? <AlertTriangle size={16} className="text-red-600" /> : <AlertCircle size={16} className="text-amber-600" />}
                          <span>{isRejected ? 'تم رفض الطلب' : 'يتطلب إجراءً وتعديلاً'}</span>
                        </div>
                        <Link
                          href="/mawqif/apply"
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm ${
                            isRejected
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-amber-600 hover:bg-amber-700 text-white'
                          }`}
                        >
                          <RotateCcw size={13} />
                          تعديل وإعادة الإرسال الآن
                        </Link>
                      </div>
                      <p className="text-xs leading-relaxed">
                        {isRejected
                          ? `سبب الرفض: ${userApplication.rejectionReason || 'عدم وضوح المستندات أو عدم مطابقتها للشروط.'}`
                          : `الملاحظات: ${userApplication.rejectionReason || 'يرجى إعادة رفع المستندات المطلوبة.'}`}
                      </p>
                    </div>
                  )}

                  {/* Progress Milestones */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">المراحل المكتملة</h4>
                    <div className="space-y-3">
                      {[
                        { title: 'تم استلام وتوثيق طلبك إلكترونيًا', time: `${userApplication.submissionDate}`, done: true },
                        { title: 'تدقيق الهوية ورخص القيادة والسير', time: 'فريق المراجعة', done: isApproved || isRejected || isNeedsEdit },
                        {
                          title: isRejected ? 'تعذر استيفاء الشروط (مرفوض)' : isNeedsEdit ? 'مطلوب تعديل المستندات' : 'اعتماد الأهلية والموافقة النهائية',
                          time: isApproved ? 'معتمد' : isRejected ? 'مرفوض' : isNeedsEdit ? 'بانتظار التعديل' : 'جارٍ التدقيق',
                          done: isApproved,
                          failed: isRejected,
                          warning: isNeedsEdit
                        },
                        { title: 'توليد بطاقة الاشتراك الرقمية', time: isApproved ? 'جاهزة' : 'لاحقاً', done: isApproved },
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            step.done
                              ? 'bg-[#19A974] text-white'
                              : step.failed
                              ? 'bg-red-500 text-white'
                              : step.warning
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}>
                            {step.done ? '✓' : step.failed ? '✕' : step.warning ? '!' : idx + 1}
                          </div>
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className={`font-semibold ${step.done ? 'text-slate-800' : step.failed ? 'text-red-700' : step.warning ? 'text-amber-800' : 'text-slate-400'}`}>{step.title}</span>
                            <span className="text-[11px] text-slate-400">{step.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1677A8] flex items-center justify-center mx-auto">
                    <PlusCircle size={28} />
                  </div>
                  <h4 className="text-base font-bold text-[#123B5D]">لم تقم بتقديم طلب اشتراك حتى الآن</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    يمكنك الآن تقديم طلبك بسهولة من خلال إدخال بيانات مركبتك ورفع المستندات المطلوبة.
                  </p>
                  <Link href="/mawqif/apply" className="mw-btn mw-btn-primary text-xs py-2 px-5 font-bold inline-flex">
                    ابدأ تقديم طلبك الآن
                  </Link>
                </div>
              )}

            </div>

            {/* 1 Col: User Notification Center Quick View */}
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
                  الكل ({notifications.length})
                </Link>
              </div>

              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                  <Bell size={24} className="text-slate-200 mx-auto mb-2" />
                  <div>لا توجد إشعارات جديدة</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        !n.read ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-100'
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
              )}

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
