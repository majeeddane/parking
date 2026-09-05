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
  Car,
  Trash2,
  AlertTriangle
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
  const [records, setRecords] = useState<ExtendedAppRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [cloudConnected, setCloudConnected] = useState(true);

  // Selection and deletion states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    type: 'single' | 'selected' | 'all';
    targetId?: string;
    targetName?: string;
  }>({ open: false, type: 'all' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Fetch EXCLUSIVELY from Supabase — admin NEVER reads localStorage
      // This ensures deleted records stay deleted regardless of which device the admin uses
      const res = await fetch('/api/mawqif/db', { cache: 'no-store' });
      const json = await res.json();
      setCloudConnected(true);

      // Server is the ONLY source of truth — no localStorage merge
      const db = json.data || {};

      const realApps: ExtendedAppRecord[] = [];
      Object.values(db).forEach((acc: any) => {
        if (acc?.application) {
          const a = acc.application;
          const u = acc.user || {};
          const hasUploadedDocs = !!(a.documents?.idDocument?.dataUrl || a.documents?.drivingLicense?.dataUrl || a.documents?.vehicleLicense?.dataUrl);
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
            hasDocs: hasUploadedDocs,
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
            hasDocs: false,
          });
        }
      });

      // Pure live applications only - no hardcoded mock applicants
      setRecords(realApps);
      setLastUpdated(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error('Failed to load applications in admin:', e);
      setCloudConnected(false);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }, []);

  // After any deletion, also wipe the local machine's localStorage
  // so this admin device doesn't accidentally re-sync deleted records

  useEffect(() => {
    loadData();
    // Auto-refresh every 8 seconds to catch applications from any device/browser worldwide
    const interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, [loadData]);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((a) => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cleanLocalStorage = (deletedIds: string[] | 'ALL') => {
    try {
      if (typeof window === 'undefined') return;
      if (deletedIds === 'ALL') {
        localStorage.removeItem('mawqif_accounts_db');
      } else {
        const localDbStr = localStorage.getItem('mawqif_accounts_db');
        if (localDbStr) {
          const db = JSON.parse(localDbStr);
          for (const key of Object.keys(db)) {
            const acc = db[key];
            if (
              deletedIds.includes(key) ||
              (acc?.user?.id && deletedIds.includes(acc.user.id)) ||
              (acc?.application?.id && deletedIds.includes(acc.application.id))
            ) {
              delete db[key];
            }
          }
          localStorage.setItem('mawqif_accounts_db', JSON.stringify(db));
        }
      }
    } catch (e) {
      console.error('LocalStorage clean error:', e);
    }
  };

  const executeDelete = async () => {
    if (!deleteModal.open) return;
    setIsDeleting(true);

    try {
      if (deleteModal.type === 'all') {
        const res = await fetch('/api/mawqif/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_all' }),
        });
        const json = await res.json();
        if (json.success) {
          cleanLocalStorage('ALL');
          setRecords([]);
          setSelectedIds([]);
          triggerToast('تم مسح وحذف كافة المستخدمين والطلبات بنجاح نهائياً من قاعدة البيانات.');
        } else {
          throw new Error(json.error || 'فشل الحذف');
        }
      } else if (deleteModal.type === 'selected') {
        const res = await fetch('/api/mawqif/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_selected', ids: selectedIds }),
        });
        const json = await res.json();
        if (json.success) {
          cleanLocalStorage(selectedIds);
          setRecords((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
          setSelectedIds([]);
          triggerToast('تم حذف المتقدمين المحددين نهائياً من قاعدة البيانات.');
        } else {
          throw new Error(json.error || 'فشل الحذف');
        }
      } else if (deleteModal.type === 'single' && deleteModal.targetId) {
        const idToDelete = deleteModal.targetId;
        const res = await fetch('/api/mawqif/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_record', id: idToDelete }),
        });
        const json = await res.json();
        if (json.success) {
          cleanLocalStorage([idToDelete]);
          setRecords((prev) => prev.filter((r) => r.id !== idToDelete));
          setSelectedIds((prev) => prev.filter((i) => i !== idToDelete));
          triggerToast('تم حذف الحساب والطلب نهائياً من قاعدة البيانات.');
        } else {
          throw new Error(json.error || 'فشل الحذف');
        }
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      triggerToast(err.message || 'حدث خطأ أثناء محاولة الحذف', 'error');
    } finally {
      setIsDeleting(false);
      setDeleteModal({ open: false, type: 'all' });
    }
  };

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

          {/* Cloud Sync Status, Delete All & Instant Refresh */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#19A974] animate-pulse" />
              <span>مباشر: {liveCount} طلب سحابي</span>
            </div>

            <button
              onClick={() => setDeleteModal({ open: true, type: 'all' })}
              disabled={records.length === 0 || isDeleting}
              className="mw-btn bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-1.5 px-3 text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-bold rounded-xl shadow-xs"
              title="مسح وحذف جميع المستخدمين والطلبات المسجلة نهائياً من قاعدة البيانات"
            >
              <Trash2 size={14} className="text-red-600" />
              <span className="hidden md:inline">حذف جميع المستخدمين والطلبات</span>
              <span className="md:hidden">حذف الكل</span>
            </button>

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

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white text-xs md:text-sm font-bold py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-2.5 mw-animate-scaleIn border ${
            toast.type === 'error' ? 'bg-red-600 border-red-400' : 'bg-[#123B5D] border-white/20'
          }`}>
            {toast.type === 'error' ? <AlertCircle size={20} className="text-white" /> : <CheckCircle2 size={20} className="text-[#19A974]" />}
            {toast.message}
          </div>
        )}

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

            {/* Bulk Action Toolbar */}
            {selectedIds.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2 text-red-900 font-bold">
                  <AlertTriangle size={17} className="text-red-600 shrink-0" />
                  <span>تم تحديد {selectedIds.length} من أصل {filtered.length} مستخدم / طلب</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedIds([])}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                  >
                    إلغاء التحديد
                  </button>
                  <button
                    onClick={() => setDeleteModal({ open: true, type: 'selected' })}
                    disabled={isDeleting}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    <span>حذف المحددين نهائياً ({selectedIds.length})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Application List Table */}
            <div className="overflow-x-auto">
              <table className="mw-table">
                <thead>
                  <tr>
                    <th className="w-10 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-[#1677A8] cursor-pointer accent-[#1677A8]"
                        checked={filtered.length > 0 && selectedIds.length === filtered.length}
                        onChange={toggleSelectAll}
                        title="تحديد الكل"
                      />
                    </th>
                    <th>رقم الطلب</th>
                    <th>المستفيد</th>
                    <th>رقم الجوال / الهوية</th>
                    <th>المركبة</th>
                    <th>اللوحة</th>
                    <th>تاريخ الإرسال</th>
                    <th>الحالة</th>
                    <th className="text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-slate-400">
                        <RefreshCw size={32} className="mx-auto mb-2 animate-spin text-[#1677A8]" />
                        <div className="text-sm font-bold text-slate-600">جاري تحميل الطلبات من السحابة...</div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-slate-400">
                        <FileCheck size={36} className="mx-auto mb-2 opacity-40 text-slate-400" />
                        <div className="text-sm font-bold text-slate-700">
                          {records.length === 0 ? 'لا توجد طلبات مسجلة في قاعدة البيانات حالياً' : 'لا توجد طلبات مطابقة للبحث أو الفلتر'}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {records.length === 0
                            ? 'بمجرد تسجيل أي مستخدم أو إرسال طلبه من أي جهاز، ستظهر بياناته هنا فوراً.'
                            : 'تأكد من كتابة الكلمات بشكل صحيح أو قم بإلغاء الفلتر.'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((app) => (
                      <tr key={app.id} className={selectedIds.includes(app.id) ? 'bg-red-50/40' : app.isLive ? 'bg-blue-50/20 hover:bg-blue-50/40' : ''}>
                        <td className="text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-[#1677A8] cursor-pointer accent-[#1677A8]"
                            checked={selectedIds.includes(app.id)}
                            onChange={() => toggleSelect(app.id)}
                          />
                        </td>
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
                          <div className="flex flex-col gap-1 items-start">
                            <StatusBadge status={app.status} size="sm" />
                            {app.isLive && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                app.hasDocs
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {app.hasDocs ? '✓ مستندات مرفوعة' : '⏳ بانتظار رفع المستندات'}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1.5">
                            <Link
                              href={`/mawqif/admin/application/${app.id}`}
                              className="mw-btn mw-btn-primary text-xs py-1.5 px-3 inline-flex items-center gap-1 font-bold shadow-xs"
                            >
                              <Eye size={13} />
                              تدقيق
                            </Link>
                            <button
                              onClick={() => setDeleteModal({
                                open: true,
                                type: 'single',
                                targetId: app.id,
                                targetName: app.applicantName
                              })}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer"
                              title="حذف هذا الحساب والطلب نهائياً من قاعدة البيانات"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
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

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="mw-modal-overlay">
          <div className="mw-modal max-w-lg border-2 border-red-200 shadow-2xl">
            <div className="mw-modal-header bg-red-50/80 border-b border-red-100">
              <h3 className="font-bold text-base text-red-900 flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-600 shrink-0" />
                {deleteModal.type === 'all'
                  ? 'تأكيد مسح وحذف جميع المستخدمين والطلبات'
                  : deleteModal.type === 'selected'
                  ? `تأكيد حذف ${selectedIds.length} مستخدم / طلب محدد`
                  : `تأكيد حذف المستخدم: ${deleteModal.targetName}`}
              </h3>
              <button
                onClick={() => !isDeleting && setDeleteModal({ open: false, type: 'all' })}
                className="text-slate-400 hover:text-slate-600 p-1"
                disabled={isDeleting}
              >
                ✕
              </button>
            </div>

            <div className="mw-modal-body space-y-3.5 p-5">
              <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-xl text-red-900 text-xs leading-relaxed space-y-1.5">
                <strong className="block text-red-950 font-bold">تحذير أمني هام (حذف نهائي لا يمكن التراجع عنه):</strong>
                {deleteModal.type === 'all' ? (
                  <p>
                    سيتم مسح كافة حسابات المستخدمين المسجلين، وجميع طلبات الاشتراك، وحذف كافة المستندات والصور المرفوعة نهائياً من قاعدة بيانات Supabase. إذا حاول أي مستخدم الدخول لحسابه فلن يجده مسجلاً وسيضطر لإنشاء حساب جديد تماماً.
                  </p>
                ) : deleteModal.type === 'selected' ? (
                  <p>
                    سيتم حذف حسابات المستخدمين المحددين ({selectedIds.length}) وجميع طلباتهم ومستنداتهم نهائياً من قاعدة البيانات والسيرفر السحابي.
                  </p>
                ) : (
                  <p>
                    سيتم حذف حساب المستفيد ({deleteModal.targetName}) بالمعرف (<span className="font-mono font-bold" dir="ltr">{deleteModal.targetId}</span>) وكافة مستنداته وطلباته نهائياً من قاعدة البيانات.
                  </p>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium">
                هل أنت متأكد من رغبتك في تنفيذ هذا الإجراء وحذف البيانات نهائياً؟
              </p>
            </div>

            <div className="mw-modal-footer bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteModal({ open: false, type: 'all' })}
                disabled={isDeleting}
                className="mw-btn mw-btn-outline text-xs px-4 py-2 font-semibold bg-white cursor-pointer"
              >
                إلغاء التراجع
              </button>
              <button
                type="button"
                onClick={executeDelete}
                disabled={isDeleting}
                className="mw-btn bg-red-600 hover:bg-red-700 text-white text-xs px-5 py-2 font-bold inline-flex items-center gap-1.5 shadow-md shadow-red-950/20 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>جارٍ الحذف من السحابة...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>تأكيد الحذف النهائي الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
