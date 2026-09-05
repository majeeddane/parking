'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  FileCheck,
  Search,
  Download,
  Eye,
  Filter,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Car
} from 'lucide-react';
import AdminSidebar from '@/components/mawqif/layout/AdminSidebar';
import StatusBadge from '@/components/mawqif/ui/StatusBadge';
import { ADMIN_APPLICATIONS, AdminAppRecord } from '../page';

interface ExtendedAppRecord extends AdminAppRecord {
  isLive?: boolean;
}

export default function AdminAllApplicationsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [records, setRecords] = useState<ExtendedAppRecord[]>(ADMIN_APPLICATIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [cloudConnected, setCloudConnected] = useState(true);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch live from Supabase Server API (no cache)
      const res = await fetch('/api/mawqif/db', { cache: 'no-store' });
      const json = await res.json();
      setCloudConnected(true);

      let serverDb = json.data || {};
      let localDb: any = {};

      // 2. Also merge local storage if available on this machine
      if (typeof window !== 'undefined') {
        try {
          const localDbStr = localStorage.getItem('mawqif_accounts_db');
          if (localDbStr) {
            localDb = JSON.parse(localDbStr);
          }
        } catch {}
      }

      // Server database takes precedence as ground truth across all devices
      const db = { ...localDb, ...serverDb };

      const realApps: ExtendedAppRecord[] = [];
      Object.values(db).forEach((acc: any) => {
        if (acc?.application) {
          const a = acc.application;
          const u = acc.user || {};
          realApps.push({
            id: a.id,
            applicantName: u.fullName || `${u.firstName || ''} ${u.familyName || ''}`.trim() || 'مستفيد جديد',
            idNumber: u.idNumber || '—',
            phone: u.phone || '—',
            vehicle: `${a.vehicleMake || ''} ${a.vehicleModel || ''} ${a.vehicleYear || ''}`.trim() || 'مركبة مسجلة',
            plate: a.plateNumber || '—',
            submissionDate: a.submissionDate || 'اليوم',
            status: a.status || 'pending',
            isLive: true,
          });
        } else if (acc?.user && acc.user.id) {
          // Account registered, awaiting vehicle application submission
          const u = acc.user;
          realApps.push({
            id: u.id,
            applicantName: u.fullName || `${u.firstName || ''} ${u.familyName || ''}`.trim() || 'مستخدم مسجل',
            idNumber: u.idNumber || '—',
            phone: u.phone || '—',
            vehicle: 'حساب مسجل (بانتظار إكمال الطلب)',
            plate: '—',
            submissionDate: 'مسجل جديد',
            status: 'pending',
            isLive: true,
          });
        }
      });

      // Deduplicate against static demo records
      const existingIds = new Set(realApps.map((a) => a.id));
      const demoRecords: ExtendedAppRecord[] = ADMIN_APPLICATIONS
        .filter((a) => !existingIds.has(a.id))
        .map((a) => ({ ...a, isLive: false }));

      // Real live submitted applications placed on top!
      const combined = [...realApps, ...demoRecords];
      setRecords(combined);
      setLastUpdated(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error('Failed to load applications in admin:', e);
      setCloudConnected(false);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Auto-refresh every 8 seconds to catch applications from any device/browser worldwide
    const interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Filter Logic
  const filtered = records.filter((app) => {
    const matchSearch =
      app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.plate.includes(search) ||
      (app.phone && app.phone.includes(search)) ||
      (app.idNumber && app.idNumber.includes(search)) ||
      app.vehicle.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = records.filter((r) => r.status === 'pending').length;
  const approvedCount = records.filter((r) => r.status === 'approved' || r.status === 'completed').length;
  const needsEditCount = records.filter((r) => r.status === 'needs_edit').length;
  const rejectedCount = records.filter((r) => r.status === 'rejected').length;
  const liveCount = records.filter((r) => r.isLive).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex font-sans">
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
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
              <div>
                <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
                  إدارة وتدقيق جميع طلبات الاشتراك
                </h1>
                <p className="text-[10px] text-slate-400 hidden sm:block">
                  مزامنة سحابية مركزية ومباشرة من أي مكان في العالم
                </p>
              </div>
            </div>
          </div>

          {/* Cloud Sync Status & Instant Refresh */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#19A974] animate-pulse" />
              <span>مباشر: {liveCount} طلب سحابي</span>
            </div>

            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="mw-btn mw-btn-outline bg-white py-1.5 px-3 text-xs flex items-center gap-1.5 hover:bg-slate-50 border-slate-300"
              title="تحديث البيانات من السحابة"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-[#1677A8]' : 'text-slate-600'} />
              <span className="hidden sm:inline">{isRefreshing ? 'جارٍ التحديث...' : 'تحديث فوري'}</span>
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-7xl">
          {/* Status Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setStatusFilter('pending')}
              className={`p-3 sm:p-4 rounded-2xl border text-right transition-all ${
                statusFilter === 'pending'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                  : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="text-[11px] opacity-80 flex items-center gap-1">
                <Clock size={13} />
                <span>قيد المراجعة</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-1">{pendingCount}</div>
            </button>

            <button
              onClick={() => setStatusFilter('approved')}
              className={`p-3 sm:p-4 rounded-2xl border text-right transition-all ${
                statusFilter === 'approved'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                  : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-700'
              }`}
            >
              <div className="text-[11px] opacity-80 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>المقبولة</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-1">{approvedCount}</div>
            </button>

            <button
              onClick={() => setStatusFilter('needs_edit')}
              className={`p-3 sm:p-4 rounded-2xl border text-right transition-all ${
                statusFilter === 'needs_edit'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                  : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
              }`}
            >
              <div className="text-[11px] opacity-80 flex items-center gap-1">
                <AlertCircle size={13} />
                <span>تتطلب تعديل</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-1">{needsEditCount}</div>
            </button>

            <button
              onClick={() => setStatusFilter('rejected')}
              className={`p-3 sm:p-4 rounded-2xl border text-right transition-all ${
                statusFilter === 'rejected'
                  ? 'bg-red-600 text-white border-red-700 shadow-md'
                  : 'bg-white border-slate-200 hover:border-red-300 text-slate-700'
              }`}
            >
              <div className="text-[11px] opacity-80 flex items-center gap-1">
                <XCircle size={13} />
                <span>المرفوضة</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-1">{rejectedCount}</div>
            </button>
          </div>

          {/* Main Table Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="بحث باسم المتقدم، رقم الطلب، الجوال، أو اللوحة..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1677A8] focus:bg-white transition-colors"
                />
              </div>

              {/* Status Filter Dropdown & Clear */}
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 font-bold focus:border-[#1677A8]"
                >
                  <option value="all">كل الحالات ({records.length})</option>
                  <option value="pending">قيد المراجعة ({pendingCount})</option>
                  <option value="approved">المقبولة ({approvedCount})</option>
                  <option value="needs_edit">تتطلب تعديل ({needsEditCount})</option>
                  <option value="rejected">المرفوضة ({rejectedCount})</option>
                </select>

                {statusFilter !== 'all' && (
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="text-xs text-slate-500 hover:text-slate-800 underline px-1"
                  >
                    إعادة ضبط
                  </button>
                )}
              </div>
            </div>

            {/* Application List Table */}
            <div className="overflow-x-auto">
              <table className="mw-table">
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>المستفيد</th>
                    <th>رقم الجوال / الهوية</th>
                    <th>المركبة</th>
                    <th>اللوحة</th>
                    <th>تاريخ الإرسال</th>
                    <th>الحالة</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-slate-400">
                        <FileCheck size={36} className="mx-auto mb-2 opacity-40" />
                        <div className="text-sm font-bold text-slate-600">لا توجد طلبات مطابقة للبحث أو الفلتر</div>
                        <div className="text-xs text-slate-400 mt-1">تأكد من كتابة الكلمات بشكل صحيح أو قم بإلغاء الفلتر</div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((app) => (
                      <tr key={app.id} className={app.isLive ? 'bg-blue-50/20 hover:bg-blue-50/40' : ''}>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[#123B5D]" dir="ltr">{app.id}</span>
                            {app.isLive && (
                              <span className="inline-flex items-center gap-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                <Sparkles size={10} />
                                مباشر
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-slate-800 text-xs md:text-sm">
                            {app.applicantName}
                          </div>
                        </td>
                        <td>
                          <div className="text-xs text-slate-600 font-mono" dir="ltr">
                            {app.phone || '—'}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono" dir="ltr">
                            {app.idNumber ? `ID: ${app.idNumber}` : ''}
                          </div>
                        </td>
                        <td className="text-xs text-slate-600">{app.vehicle}</td>
                        <td>
                          <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
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
                            className="mw-btn mw-btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1 font-bold shadow-xs"
                          >
                            <Eye size={13} />
                            تدقيق
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with sync time */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 border-t border-slate-100">
              <div>
                إجمالي الطلبات المعروضة: <strong className="text-slate-700">{filtered.length}</strong> من أصل {records.length}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${cloudConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span>{cloudConnected ? 'متصل بالسحابة' : 'جاري إعادة الاتصال'}</span>
                {lastUpdated && <span>· آخر مزامنة: {lastUpdated}</span>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
