'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, FileText, Plus, Search, Eye, ChevronLeft, Calendar, Car, PlusCircle } from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';
import StatusBadge from '@/components/mawqif/ui/StatusBadge';
import { useMawqif } from '@/components/mawqif/MawqifContext';

export default function UserApplicationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { userApplication, currentUser } = useMawqif();

  const userApps = userApplication ? [userApplication] : [];

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
              سجل طلباتي الخاصة
            </h1>
          </div>

          {userApplication?.status === 'rejected' || userApplication?.status === 'needs_edit' ? (
            <Link
              href="/mawqif/apply"
              className="mw-btn mw-btn-accent text-xs py-2 px-3.5 font-bold text-white"
            >
              <Plus size={15} />
              تعديل وإعادة إرسال الطلب
            </Link>
          ) : userApplication?.status === 'pending' ? (
            <Link
              href={`/mawqif/track?id=${userApplication.id}`}
              className="mw-btn mw-btn-outline text-xs py-2 px-3.5 font-bold bg-white"
            >
              <Eye size={15} />
              متابعة حالة الطلب
            </Link>
          ) : userApplication?.status === 'approved' || userApplication?.status === 'completed' ? (
            <Link
              href="/mawqif/dashboard/subscription"
              className="mw-btn mw-btn-primary text-xs py-2 px-3.5 font-bold"
            >
              عرض بطاقة الاشتراك
            </Link>
          ) : (
            <Link
              href="/mawqif/apply"
              className="mw-btn mw-btn-primary text-xs py-2 px-3.5 font-bold"
            >
              <Plus size={15} />
              تقديم طلب جديد
            </Link>
          )}
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-5xl">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#123B5D]">طلبات المستفيد: {currentUser?.fullName}</h2>
                <span className="text-xs text-slate-400">إجمالي الطلبات المسجلة بحسابك: {userApps.length}</span>
              </div>
            </div>

            {userApps.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="mw-table">
                  <thead>
                    <tr>
                      <th>رقم الطلب</th>
                      <th>نوع الخدمة</th>
                      <th>المركبة واللوحة</th>
                      <th>تاريخ التقديم</th>
                      <th>الحالة</th>
                      <th>الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userApps.map((app) => (
                      <tr key={app.id}>
                        <td className="font-mono font-bold text-[#123B5D]" dir="ltr">
                          {app.id}
                        </td>
                        <td className="font-medium text-slate-700">اشتراك مواقف مجاني (سنة)</td>
                        <td>
                          <div className="text-xs font-bold text-slate-800">{app.vehicleMake} {app.vehicleModel}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{app.plateNumber}</div>
                        </td>
                        <td className="text-xs text-slate-500">{app.submissionDate}</td>
                        <td>
                          <StatusBadge status={app.status} size="sm" />
                        </td>
                        <td className="space-x-2 space-x-reverse">
                          <Link
                            href={`/mawqif/track?id=${app.id}`}
                            className="mw-btn mw-btn-outline text-xs py-1 px-3 bg-slate-50 inline-flex items-center gap-1"
                          >
                            <Eye size={13} />
                            عرض وتتبع
                          </Link>
                          {(app.status === 'rejected' || app.status === 'needs_edit') && (
                            <Link
                              href="/mawqif/apply"
                              className="mw-btn mw-btn-accent text-xs py-1 px-3 text-white inline-flex items-center gap-1"
                            >
                              تعديل وإعادة الإرسال
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center space-y-3">
                <FileText size={36} className="text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">لا يوجد لديك أي طلبات مقدمة بعد</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  يمكنك البدء في تعبئة طلب اشتراك جديد لمركبتك للحصول على تصريح مواقف مجاني لمدة 12 شهرًا.
                </p>
                <Link href="/mawqif/apply" className="mw-btn mw-btn-primary text-xs py-2 px-4 font-bold inline-flex">
                  <PlusCircle size={14} />
                  تقديم طلبك الآن
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
