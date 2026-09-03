'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  FileCheck,
  Search,
  Download,
  Eye,
  Filter,
  ArrowUpDown,
  Plus
} from 'lucide-react';
import AdminSidebar from '@/components/mawqif/layout/AdminSidebar';
import StatusBadge from '@/components/mawqif/ui/StatusBadge';
import { ADMIN_APPLICATIONS } from '../page';

export default function AdminAllApplicationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = ADMIN_APPLICATIONS.filter((app) => {
    const matchSearch =
      app.applicantName.includes(search) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.plate.includes(search);
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <AdminSidebar
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
            <div className="flex items-center gap-2.5">
              <Image
                src="/mawqif/logo-icon.png"
                alt="شعار مواقف"
                width={30}
                height={30}
                className="object-contain shrink-0"
              />
              <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
                إدارة وتدقيق جميع طلبات الاشتراك
              </h1>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-7xl">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="بحث سريع باسم المتقدم، رقم الطلب، أو اللوحة..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pr-10 pl-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1677A8]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 font-bold"
                >
                  <option value="all">كل الحالات ({ADMIN_APPLICATIONS.length})</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="approved">المقبولة</option>
                  <option value="needs_edit">تتطلب تعديل</option>
                  <option value="rejected">المرفوضة</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="mw-table">
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>اسم المتقدم</th>
                    <th>المركبة</th>
                    <th>اللوحة</th>
                    <th>تاريخ الإرسال</th>
                    <th>الحالة</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app) => (
                    <tr key={app.id}>
                      <td className="font-mono font-bold text-[#123B5D]" dir="ltr">{app.id}</td>
                      <td className="font-bold text-slate-800 text-xs md:text-sm">{app.applicantName}</td>
                      <td className="text-xs text-slate-600">{app.vehicle}</td>
                      <td>
                        <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {app.plate}
                        </span>
                      </td>
                      <td className="text-xs text-slate-500 font-mono">{app.submissionDate}</td>
                      <td>
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td>
                        <Link
                          href={`/mawqif/admin/application/${app.id}`}
                          className="mw-btn mw-btn-primary text-xs py-1 px-3"
                        >
                          <Eye size={13} />
                          تدقيق
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
