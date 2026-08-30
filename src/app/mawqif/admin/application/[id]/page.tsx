'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  ChevronRight,
  User,
  Car,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Check,
  X,
  Send,
  ZoomIn,
  ShieldCheck
} from 'lucide-react';
import AdminSidebar from '@/components/mawqif/layout/AdminSidebar';
import StatusBadge, { StatusType } from '@/components/mawqif/ui/StatusBadge';

export default function AdminReviewApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const appId = (params?.id as string) || 'PARK-2026-10482';

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusType>('pending');
  const [docStatuses, setDocStatuses] = useState<Record<string, 'approved' | 'rejected' | 'pending'>>({
    id: 'pending',
    driving: 'pending',
    vehicle: 'pending',
    carPhoto: 'pending',
  });

  // Modal states
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [modModalOpen, setModModalOpen] = useState(false);
  const [modNote, setModNote] = useState('');
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = () => {
    setCurrentStatus('approved');
    showToast('تمت الموافقة على الطلب وإصدار بطاقة الاشتراك بنجاح!');
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) return;
    setCurrentStatus('rejected');
    setRejectionModalOpen(false);
    showToast('تم رفض الطلب وإرسال سبب الرفض إلى المتقدم.');
  };

  const handleModConfirm = () => {
    if (!modNote.trim()) return;
    setCurrentStatus('needs_edit');
    setModModalOpen(false);
    showToast('تم إرسال طلب التعديل إلى المتقدم.');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
              <Link href="/mawqif/admin" className="hover:text-[#1677A8]">لوحة الإدارة</Link>
              <span>›</span>
              <span className="font-mono font-bold text-[#123B5D]" dir="ltr">{appId}</span>
            </div>
          </div>

          <div>
            <StatusBadge status={currentStatus} size="md" />
          </div>
        </header>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#123B5D] text-white text-xs md:text-sm font-bold py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 mw-animate-scaleIn">
            <CheckCircle2 size={18} className="text-[#19A974]" />
            {toastMessage}
          </div>
        )}

        {/* Content */}
        <main className="p-4 md:p-8 space-y-6 max-w-6xl">
          
          {/* Top Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-[#123B5D]">
                تدقيق طلب الاشتراك #{appId}
              </h1>
              <p className="text-xs text-slate-400">
                تاريخ التقديم: 28 أغسطس 2026 · مقدم الطلب: محمد أحمد العتيبي
              </p>
            </div>

            <Link
              href="/mawqif/admin"
              className="mw-btn mw-btn-outline text-xs py-2 px-4 bg-white"
            >
              <ChevronRight size={16} />
              العودة لقائمة الطلبات
            </Link>
          </div>

          {/* Grid: Applicant & Vehicle Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Applicant Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#123B5D] font-bold border-b border-slate-100 pb-3">
                <User size={18} className="text-[#1677A8]" />
                <span>البيانات الشخصية للمتقدم</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">الاسم الثلاثي</span>
                  <span className="font-bold text-slate-800">محمد أحمد العتيبي</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم الهوية الوطنية</span>
                  <span className="font-bold font-mono text-slate-800" dir="ltr">1082345678</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم الجوال</span>
                  <span className="font-bold font-mono text-slate-800" dir="ltr">0501234567</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">البريد الإلكتروني</span>
                  <span className="font-semibold text-slate-800">m.otaibi@example.com</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">المدينة والعنوان</span>
                  <span className="font-semibold text-slate-800">الرياض - حي النرجس، شارع أنس بن مالك</span>
                </div>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#123B5D] font-bold border-b border-slate-100 pb-3">
                <Car size={18} className="text-[#1677A8]" />
                <span>بيانات المركبة المطلوبة</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">الشركة والموديل</span>
                  <span className="font-bold text-slate-800">Toyota Camry</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">سنة الصنع / اللون</span>
                  <span className="font-semibold text-slate-800">2024 (أبيض لؤلؤي)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم اللوحة</span>
                  <span className="font-bold text-[#123B5D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block font-mono">
                    أ ب ج 1234
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم الاستمارة</span>
                  <span className="font-bold font-mono text-slate-800" dir="ltr">2049182390</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">حالة الملكية</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                    مملوكة للمتقدم مباشرة
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Document Inspection */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#1677A8]" />
                <h3 className="font-bold text-base text-[#123B5D]">تدقيق وفحص المستندات المرفقة</h3>
              </div>
              <span className="text-xs text-slate-400">4 مستندات مرفوعة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              
              {/* Doc 1: National ID */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">1. الهوية الوطنية</span>
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إلزامي</span>
                </div>

                <div
                  onClick={() => setZoomModalImage('/mawqif/hero-parking.jpg')}
                  className="h-28 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300"
                >
                  <FileText size={32} className="text-slate-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-slate-500 font-semibold mt-1">اضغط للتكبير والفحص</span>
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={20} />
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, id: 'approved' });
                      showToast('تم قبول وتوثيق مستند الهوية');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.id === 'approved' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <Check size={13} /> قبول
                  </button>
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, id: 'rejected' });
                      showToast('تم رفض مستند الهوية');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.id === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <X size={13} /> رفض
                  </button>
                </div>
              </div>

              {/* Doc 2: Driving License */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">2. رخصة القيادة</span>
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إلزامي</span>
                </div>

                <div
                  onClick={() => setZoomModalImage('/mawqif/hero-parking.jpg')}
                  className="h-28 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300"
                >
                  <FileText size={32} className="text-slate-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-slate-500 font-semibold mt-1">اضغط للتكبير والفحص</span>
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={20} />
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, driving: 'approved' });
                      showToast('تم قبول وتوثيق رخصة القيادة');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.driving === 'approved' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <Check size={13} /> قبول
                  </button>
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, driving: 'rejected' });
                      showToast('تم رفض رخصة القيادة');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.driving === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <X size={13} /> رفض
                  </button>
                </div>
              </div>

              {/* Doc 3: Vehicle Registration */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">3. رخصة السير (الاستمارة)</span>
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إلزامي</span>
                </div>

                <div
                  onClick={() => setZoomModalImage('/mawqif/parking-gate.jpg')}
                  className="h-28 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300"
                >
                  <FileText size={32} className="text-slate-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-slate-500 font-semibold mt-1">اضغط للتكبير والفحص</span>
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={20} />
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, vehicle: 'approved' });
                      showToast('تم قبول وتوثيق رخصة السير');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.vehicle === 'approved' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <Check size={13} /> قبول
                  </button>
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, vehicle: 'rejected' });
                      showToast('تم رفض رخصة السير');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.vehicle === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <X size={13} /> رفض
                  </button>
                </div>
              </div>

              {/* Doc 4: Vehicle Photo */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">4. صورة المركبة</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">اختياري</span>
                </div>

                <div
                  onClick={() => setZoomModalImage('/mawqif/hero-parking.jpg')}
                  className="h-28 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300"
                >
                  <FileText size={32} className="text-slate-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-slate-500 font-semibold mt-1">اضغط للتكبير والفحص</span>
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={20} />
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, carPhoto: 'approved' });
                      showToast('تم قبول صورة المركبة');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.carPhoto === 'approved' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <Check size={13} /> قبول
                  </button>
                  <button
                    onClick={() => {
                      setDocStatuses({ ...docStatuses, carPhoto: 'rejected' });
                      showToast('تم رفض صورة المركبة');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                      docStatuses.carPhoto === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <X size={13} /> رفض
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Section: Final Decision Panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
            <h3 className="font-bold text-base text-[#123B5D]">القرار النهائي للمشرف</h3>
            <p className="text-xs text-slate-500">
              اتخاذ القرار النهائي سيحدث حالة الطلب مباشرة ويرسل إشعارًا للمستفيد.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleApprove}
                className="mw-btn mw-btn-success text-xs md:text-sm font-bold flex-1 min-w-[160px] py-3"
              >
                <CheckCircle2 size={18} />
                الموافقة على الطلب وإصدار الاشتراك
              </button>

              <button
                onClick={() => setModModalOpen(true)}
                className="mw-btn mw-btn-warning text-xs md:text-sm font-bold flex-1 min-w-[160px] py-3"
              >
                <AlertCircle size={18} />
                طلب تعديل مستندات
              </button>

              <button
                onClick={() => setRejectionModalOpen(true)}
                className="mw-btn mw-btn-danger text-xs md:text-sm font-bold flex-1 min-w-[160px] py-3"
              >
                <XCircle size={18} />
                رفض الطلب
              </button>
            </div>
          </div>

        </main>
      </div>

      {/* Modal 1: Rejection Reason */}
      {rejectionModalOpen && (
        <div className="mw-modal-overlay">
          <div className="mw-modal">
            <div className="mw-modal-header">
              <h3 className="font-bold text-base text-red-900 flex items-center gap-2">
                <XCircle size={18} className="text-red-600" />
                تأكيد رفض طلب الاشتراك #{appId}
              </h3>
              <button onClick={() => setRejectionModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="mw-modal-body space-y-3">
              <p className="text-xs text-slate-600">
                يرجى كتابة سبب واضح ومفصل للرفض ليتم إرساله للمستفيد في رسالة الإشعار:
              </p>
              <textarea
                className="mw-textarea"
                placeholder="مثال: الصورة المرفقة لرخصة السير غير واضحة وتاريخ الانتهاء غير مقروء..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="mw-modal-footer">
              <button onClick={() => setRejectionModalOpen(false)} className="mw-btn mw-btn-outline text-xs">إلغاء</button>
              <button onClick={handleRejectConfirm} className="mw-btn mw-btn-danger text-xs font-bold">تأكيد الرفض والإرسال</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Request Modification */}
      {modModalOpen && (
        <div className="mw-modal-overlay">
          <div className="mw-modal">
            <div className="mw-modal-header">
              <h3 className="font-bold text-base text-amber-900 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" />
                طلب تعديل وإعادة رفع مستندات
              </h3>
              <button onClick={() => setModModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="mw-modal-body space-y-3">
              <p className="text-xs text-slate-600">
                حدد التعديل المطلوب من المستفيد ليقوم بإعادة رفعه:
              </p>
              <textarea
                className="mw-textarea"
                placeholder="مثال: نرجو إعادة تصوير رخصة القيادة بدقة أوضح..."
                value={modNote}
                onChange={(e) => setModNote(e.target.value)}
              />
            </div>
            <div className="mw-modal-footer">
              <button onClick={() => setModModalOpen(false)} className="mw-btn mw-btn-outline text-xs">إلغاء</button>
              <button onClick={handleModConfirm} className="mw-btn mw-btn-warning text-xs font-bold text-white">إرسال طلب التعديل</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Zoom / Preview Image */}
      {zoomModalImage && (
        <div className="mw-modal-overlay" onClick={() => setZoomModalImage(null)}>
          <div className="bg-white rounded-3xl p-4 max-w-2xl w-full shadow-2xl space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700">معاينة المستند عالي الدقة</span>
              <button onClick={() => setZoomModalImage(null)} className="text-slate-400 hover:text-slate-600 p-1">✕</button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
              <img src={zoomModalImage} alt="Document Preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setZoomModalImage(null)} className="mw-btn mw-btn-primary text-xs py-1.5 px-4">إغلاق المعاينة</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
