'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Car,
  RefreshCw
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
  const [records, setRecords] = useState<AdminAppRecord[]>(ADMIN_APPLICATIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch live from server DB
      const res = await fetch('/api/mawqif/db', { cache: 'no-store' });
      const json = await res.json();
      
      let serverDb = json.data || {};
      let localDb: any = {};
      if (typeof window !== 'undefined') {
        const localDbStr = localStorage.getItem('mawqif_accounts_db');
        if (localDbStr) {
          try {
            localDb = JSON.parse(localDbStr);
          } catch {}
        }
      }

      // Cloud database takes precedence
      const db = { ...localDb, ...serverDb };

      const realApps: AdminAppRecord[] = [];
      Object.values(db).forEach((acc: any) => {
        if (acc?.application) {
          realApps.push({
            id: acc.application.id,
            applicantName: acc.user?.fullName || acc.user?.firstName || 'مستفيد جديد',
            idNumber: acc.user?.idNumber || '—',
            phone: acc.user?.phone || '—',
            vehicle: `${acc.application.vehicleMake || ''} ${acc.application.vehicleModel || ''}`.trim() || 'مركبة مسجلة',
            plate: acc.application.plateNumber || '—',
            submissionDate: acc.application.submissionDate || 'اليوم',
            status: acc.application.status || 'pending',
          });
        } else if (acc?.user && acc.user.id) {
          realApps.push({
            id: acc.user.id,
            applicantName: acc.user.fullName || acc.user.firstName || 'مستخدم مسجل',
            idNumber: acc.user.idNumber || '—',
            phone: acc.user.phone || '—',
            vehicle: 'حساب مسجل (بانتظار إكمال الطلب)',
            plate: '—',
            submissionDate: 'مسجل جديد',
            status: 'pending',
          });
        }
      });

      const existingIds = new Set(realApps.map((a) => a.id));
      const combined = [...realApps, ...ADMIN_APPLICATIONS.filter((a) => !existingIds.has(a.id))];
      setRecords(combined);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 15 seconds to receive applications from any device
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogout = () => {
    sessionStorage.removeItem('mawqif_admin_auth');
    localStorage.removeItem('mawqif_admin_auth');
    window.location.reload();
  };

  // Filter & Search Logic
  const filteredRecords = records.filter((app) => {
    const matchSearch =
      app.applicantName.includes(search) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.plate.includes(search) ||
      app.vehicle.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = records.filter(r => r.status === 'pending').length;
  const approvedCount = records.filter(r => r.status === 'approved' || r.status === 'completed').length;
  const rejectedCount = records.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex font-sans">
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
            <div className="flex items-center gap-2.5">
              <Image
                src="/mawqif/logo-icon.png"
                alt="شعار مواقف"
                width={30}
                height={30}
                className="object-contain shrink-0"
              />
              <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
                لوحة قيادة إدارة المشرف والدعم الفني
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#1677A8]' : ''} />
              تحديث البيانات
            </button>

            <button
              onClick={handleAdminLogout}
              className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-xl font-bold border border-red-200 transition-colors cursor-pointer"
              title="قفل لوحة المشرف وتسجيل الخروج"
            >
              قفل اللوحة والخروج
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-7xl">
          
          {/* Key Performance Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">إجمالي الطلبات</span>
              <span className="text-xl md:text-2xl font-black text-[#123B5D] block">{records.length}</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp size={12} /> محدث تلقائياً
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">قيد المراجعة</span>
              <span className="text-xl md:text-2xl font-black text-amber-500 block">{pendingCount}</span>
              <span className="text-[10px] text-amber-600 font-semibold">بانتظار قرار المشرف</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">الطلبات المعتمدة</span>
              <span className="text-xl md:text-2xl font-black text-[#19A974] block">{approvedCount}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">اشتراكات مفعلة</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">الطلبات المرفوضة</span>
              <span className="text-xl md:text-2xl font-black text-red-500 block">{rejectedCount}</span>
              <span className="text-[10px] text-red-500 font-semibold">غير مستوفية الشروط</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">المواقف المعتمدة</span>
              <span className="text-xl md:text-2xl font-black text-[#123B5D] block">42 موقفاً</span>
              <span className="text-[10px] text-[#1677A8] font-semibold">بوابات إلكترونية</span>
            </div>

          </div>

          {/* Applications Table Card */}
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-4">
            
            {/* Header with Search & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
              <div>
                <h2 className="text-base md:text-lg font-bold text-[#123B5D]">
                  جدول طلبات الاشتراكات (فحص، اعتماد، رفض)
                </h2>
                <p className="text-xs text-slate-400">
                  انقر على زر "مراجعة الطلب" للدخول لفحص مستندات المتقدم والموافقة أو الرفض
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
                  <option value="all">جميع الحالات ({records.length})</option>
                  <option value="pending">قيد المراجعة ({pendingCount})</option>
                  <option value="approved">تمت الموافقة ({approvedCount})</option>
                  <option value="needs_edit">يحتاج تعديل</option>
                  <option value="rejected">مرفوض ({rejectedCount})</option>
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
                          className="mw-btn mw-btn-primary text-xs py-1 px-3 font-bold"
                        >
                          <Eye size={13} />
                          مراجعة الطلب والبت فيه
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Count */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div>
                عرض {filteredRecords.length} من إجمالي {records.length} طلب
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
