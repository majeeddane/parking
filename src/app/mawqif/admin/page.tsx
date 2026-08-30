'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Download,
  Users,
  Car
} from 'lucide-react';
import AdminSidebar from '@/components/mawqif/layout/AdminSidebar';
import StatusBadge, { StatusType } from '@/components/mawqif/ui/StatusBadge';

export interface AdminAppRecord {
  id: string;
  applicantName: string;
  idNumber: string;
  phone: string;
  vehicle: string;
  plate: string;
  submissionDate: string;
  status: StatusType;
}

export const ADMIN_APPLICATIONS: AdminAppRecord[] = [
  {
    id: 'PARK-2026-10482',
    applicantName: 'محمد أحمد العتيبي',
    idNumber: '1082345678',
    phone: '0501234567',
    vehicle: 'Toyota Camry 2024',
    plate: 'أ ب ج 1234',
    submissionDate: '28-08-2026',
    status: 'pending',
  },
  {
    id: 'PARK-2026-09311',
    applicantName: 'خالد سالم الشمري',
    idNumber: '1098765432',
    phone: '0555554321',
    vehicle: 'Hyundai Sonata 2023',
    plate: 'س ص ع 5678',
    submissionDate: '15-08-2026',
    status: 'approved',
  },
  {
    id: 'PARK-2026-08119',
    applicantName: 'أحمد محمود الغامدي',
    idNumber: '1045678901',
    phone: '0543219876',
    vehicle: 'Toyota Corolla 2022',
    plate: 'د هـ و 9012',
    submissionDate: '20-08-2026',
    status: 'rejected',
  },
  {
    id: 'PARK-2026-07442',
    applicantName: 'سارة خالد الدوسري',
    idNumber: '1023456789',
    phone: '0567890123',
    vehicle: 'Kia K5 2024',
    plate: 'ر ز ط 4321',
    submissionDate: '25-08-2026',
    status: 'needs_edit',
  },
  {
    id: 'PARK-2026-06890',
    applicantName: 'عبدالله إبراهيم القحطاني',
    idNumber: '1076543210',
    phone: '0509876543',
    vehicle: 'Ford Taurus 2023',
    plate: 'ن هـ ي 7788',
    submissionDate: '26-08-2026',
    status: 'pending',
  },
  {
    id: 'PARK-2026-05120',
    applicantName: 'ريم سلطان الحربي',
    idNumber: '1034567890',
    phone: '0533344556',
    vehicle: 'Mazda 6 2024',
    plate: 'ح ط ي 1122',
    submissionDate: '10-08-2026',
    status: 'completed',
  },
];

export default function AdminDashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Filter & Search Logic
  const filteredRecords = ADMIN_APPLICATIONS.filter((app) => {
    const matchSearch =
      app.applicantName.includes(search) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.plate.includes(search) ||
      app.vehicle.toLowerCase().includes(search.toLowerCase());

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
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
              لوحة القيادة والمتابعة التشغيلية
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold border border-emerald-200 hidden sm:inline-block">
              ● النظام متصل ويعمل بكفاءة
            </span>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-7xl">
          
          {/* 6 Key Performance Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">إجمالي الطلبات</span>
              <span className="text-xl md:text-2xl font-black text-[#123B5D] block">1,482</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp size={12} /> +12% هذا الأسبوع
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">الطلبات الجديدة</span>
              <span className="text-xl md:text-2xl font-black text-[#1677A8] block">38</span>
              <span className="text-[10px] text-cyan-600 font-semibold">بانتظار الفرز</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">قيد التدقيق</span>
              <span className="text-xl md:text-2xl font-black text-amber-500 block">42</span>
              <span className="text-[10px] text-amber-600 font-semibold">جارٍ المراجعة</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">الطلبات المقبولة</span>
              <span className="text-xl md:text-2xl font-black text-[#19A974] block">1,290</span>
              <span className="text-[10px] text-emerald-600 font-semibold">نسبة قبول 94%</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">الطلبات المرفوضة</span>
              <span className="text-xl md:text-2xl font-black text-red-500 block">112</span>
              <span className="text-[10px] text-red-500 font-semibold">عدم استيفاء الشروط</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">الاشتراكات الفعالة</span>
              <span className="text-xl md:text-2xl font-black text-[#123B5D] block">1,215</span>
              <span className="text-[10px] text-[#19A974] font-semibold">بطاقات نشطة</span>
            </div>

          </div>

          {/* Applications Table Card */}
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-4">
            
            {/* Header with Search & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
              <div>
                <h2 className="text-base md:text-lg font-bold text-[#123B5D]">
                  جدول طلبات الاشتراك
                </h2>
                <p className="text-xs text-slate-400">
                  عرض وتدقيق والبت في طلبات الاشتراكات المجانية الواردة
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative min-w-[200px]">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="text"
                    placeholder="بحث باسم المتقدم أو اللوحة..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pr-9 pl-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1677A8]"
                  />
                </div>

                {/* Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 font-semibold cursor-pointer"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="approved">تمت الموافقة</option>
                  <option value="needs_edit">يحتاج تعديل</option>
                  <option value="rejected">مرفوض</option>
                </select>

                <button
                  onClick={() => alert('تم تصدير سجل الطلبات إلى ملف Excel بنجاح!')}
                  className="mw-btn mw-btn-outline text-xs py-1.5 px-3 bg-slate-50"
                  title="تصدير Excel"
                >
                  <Download size={14} />
                  تصدير
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="mw-table">
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>اسم المتقدم</th>
                    <th>نوع المركبة</th>
                    <th>رقم اللوحة</th>
                    <th>تاريخ التقديم</th>
                    <th>حالة الطلب</th>
                    <th>إجراء التدقيق</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50/40">
                      <td className="font-mono font-bold text-[#123B5D]" dir="ltr">
                        {app.id}
                      </td>
                      <td>
                        <div className="font-bold text-slate-800 text-xs md:text-sm">{app.applicantName}</div>
                        <div className="text-[11px] text-slate-400 font-mono" dir="ltr">{app.phone}</div>
                      </td>
                      <td className="text-xs font-semibold text-slate-700">{app.vehicle}</td>
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
                          مراجعة الطلب
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div>
                عرض 1 إلى {filteredRecords.length} من أصل {ADMIN_APPLICATIONS.length} طلب
              </div>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40" disabled>
                  <ChevronRight size={14} />
                </button>
                <button className="px-3 py-1 rounded bg-[#123B5D] text-white font-bold">1</button>
                <button className="px-3 py-1 rounded hover:bg-slate-100">2</button>
                <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">
                  <ChevronLeft size={14} />
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
