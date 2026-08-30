'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, FileText, Plus, Search, Eye, ChevronLeft, Calendar, Car } from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';
import StatusBadge, { StatusType } from '@/components/mawqif/ui/StatusBadge';

const USER_APPLICATIONS = [
  {
    id: 'PARK-2026-10482',
    date: '28 أغسطس 2026',
    vehicle: 'Toyota Camry 2024',
    plate: 'أ ب ج 1234',
    type: 'اشتراك مواقف مجاني (سنة)',
    status: 'approved' as StatusType,
  },
];

export default function UserApplicationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
              سجل طلباتي
            </h1>
          </div>

          <Link
            href="/mawqif/apply"
            className="mw-btn mw-btn-primary text-xs py-2 px-3.5 font-bold"
          >
            <Plus size={15} />
            تقديم طلب جديد
          </Link>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-5xl">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#123B5D]">الطلبات المقدمة</h2>
              <span className="text-xs text-slate-400">إجمالي الطلبات: {USER_APPLICATIONS.length}</span>
            </div>

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
                  {USER_APPLICATIONS.map((app) => (
                    <tr key={app.id}>
                      <td className="font-mono font-bold text-[#123B5D]" dir="ltr">
                        {app.id}
                      </td>
                      <td className="font-medium text-slate-700">{app.type}</td>
                      <td>
                        <div className="text-xs font-bold text-slate-800">{app.vehicle}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{app.plate}</div>
                      </td>
                      <td className="text-xs text-slate-500">{app.date}</td>
                      <td>
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td>
                        <Link
                          href={`/mawqif/track?id=${app.id}`}
                          className="mw-btn mw-btn-outline text-xs py-1 px-3"
                        >
                          <Eye size={13} />
                          عرض ومتابعة
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
