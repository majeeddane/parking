'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileCheck,
  FileDown
} from 'lucide-react';
import AdminSidebar from '@/components/mawqif/layout/AdminSidebar';
import StatusBadge, { StatusType } from '@/components/mawqif/ui/StatusBadge';

export default function AdminReviewApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const appId = (params?.id as string) || 'PARK-2026-10482';

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusType>('pending');
  const [applicantData, setApplicantData] = useState<any>({
    fullName: 'محمد أحمد العتيبي',
    idNumber: '1082345678',
    phone: '0501234567',
    email: 'm.otaibi@example.com',
    city: 'الرياض',
    address: 'حي النرجس، شارع أنس بن مالك',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: '2024',
    vehicleColor: 'أبيض لؤلؤي',
    plateNumber: 'أ ب ج 1234',
    vehicleLicenseNumber: '2049182390',
    submissionDate: '28 أغسطس 2026',
    documents: null,
  });

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
  const [zoomModalImage, setZoomModalImage] = useState<{ src: string; title: string; name?: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load actual user application data - first from localStorage, then sync from server
  const loadAppData = async (db: Record<string, any>) => {
    for (const userId in db) {
      const acc = db[userId];
      if (acc?.application && (acc.application.id === appId || acc.application.subscriptionNumber === appId)) {
        setCurrentStatus(acc.application.status || 'pending');
        setApplicantData({
          fullName: acc.user?.fullName || `${acc.user?.firstName || ''} ${acc.user?.familyName || ''}`.trim(),
          idNumber: acc.user?.idNumber || '—',
          phone: acc.user?.phone || '—',
          email: acc.user?.email || '—',
          city: acc.user?.city || 'الرياض',
          address: acc.user?.address || 'العنوان المسجل',
          vehicleMake: acc.application.vehicleMake || 'Toyota',
          vehicleModel: acc.application.vehicleModel || 'Camry',
          vehicleYear: acc.application.vehicleYear || '2024',
          vehicleColor: acc.application.vehicleColor || 'فضي',
          plateNumber: acc.application.plateNumber || 'أ ب ج 1234',
          vehicleLicenseNumber: acc.application.vehicleLicenseNumber || '2049182390',
          submissionDate: acc.application.submissionDate || 'اليوم',
          documents: acc.application.documents || null,
        });
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // Load from localStorage first (instant)
    try {
      const dbStr = typeof window !== 'undefined' ? localStorage.getItem('mawqif_accounts_db') : null;
      if (dbStr) {
        loadAppData(JSON.parse(dbStr));
      }
    } catch (e) {
      console.error(e);
    }

    // Then fetch from server for cross-device data
    fetch('/api/mawqif/db', { cache: 'no-store' })
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const serverDB = json.data;
          // Merge with local
          let localDB: Record<string, any> = {};
          try {
            const ls = typeof window !== 'undefined' ? localStorage.getItem('mawqif_accounts_db') : null;
            if (ls) localDB = JSON.parse(ls);
          } catch {}
          const merged = { ...serverDB, ...localDB };
          localStorage.setItem('mawqif_accounts_db', JSON.stringify(merged));
          loadAppData(merged);
        }
      })
      .catch(() => {});
  }, [appId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateApplicationInDB = (
    newStatus: StatusType,
    notificationTitle: string,
    notificationDesc: string,
    extraFields?: Record<string, any>
  ) => {
    const notification = {
      id: Date.now(),
      title: notificationTitle,
      desc: notificationDesc,
      time: 'الآن',
      read: false,
    };

    // 1. Update localStorage if available
    try {
      const dbStr = typeof window !== 'undefined' ? localStorage.getItem('mawqif_accounts_db') : null;
      if (dbStr) {
        const db = JSON.parse(dbStr);
        for (const userId in db) {
          const acc = db[userId];
          if (acc?.application && (acc.application.id === appId || acc.application.subscriptionNumber === appId)) {
            acc.application.status = newStatus;
            if (extraFields) {
              Object.assign(acc.application, extraFields);
            }
            acc.notifications = [notification, ...(acc.notifications || [])];
            break;
          }
        }
        localStorage.setItem('mawqif_accounts_db', JSON.stringify(db));
      }
    } catch (e) {
      console.error('Error updating status in local DB:', e);
    }

    // 2. Always sync status update directly to server API (cross-device across the world)
    fetch('/api/mawqif/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        action: 'update_status',
        appId,
        newStatus,
        extraFields,
        notification,
      }),
    }).catch(err => console.error('Failed to sync status to server:', err));
  };

  const handleApprove = () => {
    setCurrentStatus('approved');
    updateApplicationInDB(
      'approved',
      `🎉 تم اعتماد طلب اشتراكك (${appId}) وتفعيل البطاقة الرسمية!`,
      `يسرنا إبلاغك بجاهزية بطاقة اشتراكك في مواقف السيارات لمدة سنة كاملة مجاناً. يمكنك الآن فتح بطاقتك الرقمية برمز QR واستخدامها للدخول المباشر.`,
      {
        subscriptionNumber: appId,
        subscriptionStartDate: '01 سبتمبر 2026',
        subscriptionEndDate: '31 أغسطس 2027',
      }
    );
    showToast('تمت الموافقة على الطلب بنجاح وتفعيل البطاقة الرقمية في حساب المستفيد!');
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) return;
    setCurrentStatus('rejected');
    setRejectionModalOpen(false);
    updateApplicationInDB(
      'rejected',
      `❌ تم رفض طلب الاشتراك (${appId})`,
      `نعتذر منك، لم تتم الموافقة على طلب الاشتراك للأسباب التالية: ${rejectionReason}`,
      {
        rejectionReason,
      }
    );
    showToast('تم رفض الطلب وإرسال سبب الرفض إلى حساب المستفيد.');
  };

  const handleModConfirm = () => {
    if (!modNote.trim()) return;
    setCurrentStatus('needs_edit');
    setModModalOpen(false);
    updateApplicationInDB(
      'needs_edit',
      `⚠️ مطلوب تعديل مستندات لطلبك (${appId})`,
      `يرجى تعديل وإعادة رفع المستند المطلوب: ${modNote}`,
      {
        rejectionReason: modNote,
      }
    );
    showToast('تم إرسال طلب التعديل إلى حساب المستفيد بنجاح.');
  };

  const docs = applicantData.documents || {};
  const idDoc = docs.idDocument;
  const drivingDoc = docs.drivingLicense;
  const vehicleDoc = docs.vehicleLicense;
  const carPhotoDoc = docs.carPhoto;

  const triggerDownload = (dataUrl: string, fileName: string) => {
    if (!dataUrl) {
      alert('لم يتم العثور على ملف قابل للتحميل لهذا المستند.');
      return;
    }
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName || `document-${appId}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex font-sans">
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
              <Link href="/mawqif/admin" className="hover:text-[#1677A8] flex items-center gap-1.5 font-semibold">
                <Image
                  src="/mawqif/logo-icon.png"
                  alt="شعار مواقف"
                  width={22}
                  height={22}
                  className="object-contain"
                />
                <span>لوحة الإدارة</span>
              </Link>
              <span>›</span>
              <span className="font-mono font-bold text-[#123B5D]" dir="ltr">{appId}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline-block">حالة الطلب الحالية:</span>
            <StatusBadge status={currentStatus} size="md" />
          </div>
        </header>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#123B5D] text-white text-xs md:text-sm font-bold py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-2.5 mw-animate-scaleIn border border-white/20">
            <CheckCircle2 size={20} className="text-[#19A974]" />
            {toastMessage}
          </div>
        )}

        {/* Content */}
        <main className="p-4 md:p-8 space-y-6 max-w-6xl">
          
          {/* Top Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-[#123B5D]">
                تدقيق وفحص طلب الاشتراك #{appId}
              </h1>
              <p className="text-xs text-slate-400">
                تاريخ التقديم: {applicantData.submissionDate} · مقدم الطلب: {applicantData.fullName}
              </p>
            </div>

            <Link
              href="/mawqif/admin"
              className="mw-btn mw-btn-outline text-xs py-2 px-4 bg-white font-bold"
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
                  <span className="font-bold text-slate-800">{applicantData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم الهوية الوطنية</span>
                  <span className="font-bold font-mono text-slate-800" dir="ltr">{applicantData.idNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم الجوال</span>
                  <span className="font-bold font-mono text-slate-800" dir="ltr">{applicantData.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">البريد الإلكتروني</span>
                  <span className="font-semibold text-slate-800">{applicantData.email}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">المدينة والعنوان</span>
                  <span className="font-semibold text-slate-800">{applicantData.city} - {applicantData.address}</span>
                </div>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#123B5D] font-bold border-b border-slate-100 pb-3">
                <Car size={18} className="text-[#1677A8]" />
                <span>بيانات المركبة المطلوبة للترخيص</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">الشركة والموديل</span>
                  <span className="font-bold text-slate-800">{applicantData.vehicleMake} {applicantData.vehicleModel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">سنة الصنع / اللون</span>
                  <span className="font-semibold text-slate-800">{applicantData.vehicleYear} ({applicantData.vehicleColor})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم اللوحة</span>
                  <span className="font-bold text-[#123B5D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block font-mono">
                    {applicantData.plateNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">رقم الاستمارة</span>
                  <span className="font-bold font-mono text-slate-800" dir="ltr">{applicantData.vehicleLicenseNumber}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">نوع الاشتراك</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                    اشتراك مجاني سنوي (365 يوماً)
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Document Inspection with REAL Uploaded Files & Download Capability */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#1677A8]" />
                <h3 className="font-bold text-base text-[#123B5D]">تدقيق وفحص المستندات المرفوعة من قبل المتقدم</h3>
              </div>
              <span className="text-xs bg-blue-50 text-[#1677A8] font-bold px-3 py-1 rounded-full border border-blue-100">
                {docs ? 'المستندات الحقيقية المرفوعة متاحة للمعاينة والتحميل' : 'مستندات نموذج تجريبي'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              
              {/* Doc 1: National ID */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">1. الهوية الوطنية</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إلزامي</span>
                  </div>
                  {idDoc?.name && (
                    <div className="text-[11px] text-slate-500 truncate font-mono" title={idDoc.name}>
                      📄 {idDoc.name}
                    </div>
                  )}
                </div>

                {/* Preview Box */}
                <div
                  onClick={() => setZoomModalImage({
                    src: idDoc?.dataUrl || '/mawqif/hero-parking.jpg',
                    title: 'الهوية الوطنية / الإقامة',
                    name: idDoc?.name || 'national-id.jpg'
                  })}
                  className="h-32 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300 shadow-inner"
                >
                  {idDoc?.dataUrl && idDoc.dataUrl.startsWith('data:image') ? (
                    <img src={idDoc.dataUrl} alt="الهوية" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <FileText size={32} className="text-[#1677A8] group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] text-slate-600 font-semibold mt-1">
                        {idDoc?.name || 'مستند الهوية الوطنية'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1.5 font-bold text-xs">
                    <ZoomIn size={16} /> تكبير وفحص
                  </div>
                </div>

                {/* Download Button for ID */}
                <button
                  type="button"
                  onClick={() => triggerDownload(idDoc?.dataUrl || '/mawqif/hero-parking.jpg', idDoc?.name || `id-${appId}.jpg`)}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="حفظ المستند في جهازك"
                >
                  <Download size={13} className="text-[#1677A8]" />
                  حفظ المستند بالجهاز
                </button>

                {/* Status toggles */}
                <div className="flex gap-1.5 pt-1">
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
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">2. رخصة القيادة</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إلزامي</span>
                  </div>
                  {drivingDoc?.name && (
                    <div className="text-[11px] text-slate-500 truncate font-mono" title={drivingDoc.name}>
                      📄 {drivingDoc.name}
                    </div>
                  )}
                </div>

                {/* Preview Box */}
                <div
                  onClick={() => setZoomModalImage({
                    src: drivingDoc?.dataUrl || '/mawqif/hero-parking.jpg',
                    title: 'رخصة القيادة السارية',
                    name: drivingDoc?.name || 'driving-license.jpg'
                  })}
                  className="h-32 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300 shadow-inner"
                >
                  {drivingDoc?.dataUrl && drivingDoc.dataUrl.startsWith('data:image') ? (
                    <img src={drivingDoc.dataUrl} alt="رخصة القيادة" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <FileText size={32} className="text-[#1677A8] group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] text-slate-600 font-semibold mt-1">
                        {drivingDoc?.name || 'مستند رخصة القيادة'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1.5 font-bold text-xs">
                    <ZoomIn size={16} /> تكبير وفحص
                  </div>
                </div>

                {/* Download Button for Driving License */}
                <button
                  type="button"
                  onClick={() => triggerDownload(drivingDoc?.dataUrl || '/mawqif/hero-parking.jpg', drivingDoc?.name || `driving-license-${appId}.jpg`)}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="حفظ المستند في جهازك"
                >
                  <Download size={13} className="text-[#1677A8]" />
                  حفظ المستند بالجهاز
                </button>

                {/* Status toggles */}
                <div className="flex gap-1.5 pt-1">
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
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">3. رخصة السير (الاستمارة)</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إلزامي</span>
                  </div>
                  {vehicleDoc?.name && (
                    <div className="text-[11px] text-slate-500 truncate font-mono" title={vehicleDoc.name}>
                      📄 {vehicleDoc.name}
                    </div>
                  )}
                </div>

                {/* Preview Box */}
                <div
                  onClick={() => setZoomModalImage({
                    src: vehicleDoc?.dataUrl || '/mawqif/parking-gate.jpg',
                    title: 'رخصة سير المركبة (الاستمارة)',
                    name: vehicleDoc?.name || 'vehicle-license.jpg'
                  })}
                  className="h-32 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300 shadow-inner"
                >
                  {vehicleDoc?.dataUrl && vehicleDoc.dataUrl.startsWith('data:image') ? (
                    <img src={vehicleDoc.dataUrl} alt="الاستمارة" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <FileText size={32} className="text-[#1677A8] group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] text-slate-600 font-semibold mt-1">
                        {vehicleDoc?.name || 'مستند الاستمارة'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1.5 font-bold text-xs">
                    <ZoomIn size={16} /> تكبير وفحص
                  </div>
                </div>

                {/* Download Button for Vehicle License */}
                <button
                  type="button"
                  onClick={() => triggerDownload(vehicleDoc?.dataUrl || '/mawqif/parking-gate.jpg', vehicleDoc?.name || `vehicle-license-${appId}.jpg`)}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="حفظ المستند في جهازك"
                >
                  <Download size={13} className="text-[#1677A8]" />
                  حفظ المستند بالجهاز
                </button>

                {/* Status toggles */}
                <div className="flex gap-1.5 pt-1">
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
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">4. صورة المركبة</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">اختياري</span>
                  </div>
                  {carPhotoDoc?.name && (
                    <div className="text-[11px] text-slate-500 truncate font-mono" title={carPhotoDoc.name}>
                      📄 {carPhotoDoc.name}
                    </div>
                  )}
                </div>

                {/* Preview Box */}
                <div
                  onClick={() => setZoomModalImage({
                    src: carPhotoDoc?.dataUrl || '/mawqif/hero-parking.jpg',
                    title: 'صورة المركبة',
                    name: carPhotoDoc?.name || 'car-photo.jpg'
                  })}
                  className="h-32 bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group border border-slate-300 shadow-inner"
                >
                  {carPhotoDoc?.dataUrl && carPhotoDoc.dataUrl.startsWith('data:image') ? (
                    <img src={carPhotoDoc.dataUrl} alt="المركبة" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <FileText size={32} className="text-[#1677A8] group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] text-slate-600 font-semibold mt-1">
                        {carPhotoDoc?.name || 'صورة المركبة'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1.5 font-bold text-xs">
                    <ZoomIn size={16} /> تكبير وفحص
                  </div>
                </div>

                {/* Download Button for Car Photo */}
                <button
                  type="button"
                  onClick={() => triggerDownload(carPhotoDoc?.dataUrl || '/mawqif/hero-parking.jpg', carPhotoDoc?.name || `car-photo-${appId}.jpg`)}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="حفظ المستند في جهازك"
                >
                  <Download size={13} className="text-[#1677A8]" />
                  حفظ المستند بالجهاز
                </button>

                {/* Status toggles */}
                <div className="flex gap-1.5 pt-1">
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
            <h3 className="font-bold text-base text-[#123B5D]">القرار النهائي للمشرف والدعم الفني</h3>
            <p className="text-xs text-slate-500">
              اتخاذ القرار هنا سيحدث حالة الطلب مباشرة في حساب المستفيد ويرسل إشعاراً فورياً له بالنتيجة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleApprove}
                className="mw-btn mw-btn-success text-xs md:text-sm font-bold flex-1 min-w-[160px] py-3.5 shadow-md shadow-emerald-950/10"
              >
                <CheckCircle2 size={18} />
                الموافقة على الطلب وتفعيل بطاقة الاشتراك
              </button>

              <button
                onClick={() => setModModalOpen(true)}
                className="mw-btn mw-btn-warning text-xs md:text-sm font-bold flex-1 min-w-[160px] py-3.5 shadow-md shadow-amber-950/10 text-white"
              >
                <AlertCircle size={18} />
                طلب تعديل مستندات
              </button>

              <button
                onClick={() => setRejectionModalOpen(true)}
                className="mw-btn mw-btn-danger text-xs md:text-sm font-bold flex-1 min-w-[160px] py-3.5 shadow-md shadow-red-950/10 text-white"
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

      {/* Modal 3: Zoom / Preview Image High-Res */}
      {zoomModalImage && (
        <div className="mw-modal-overlay" onClick={() => setZoomModalImage(null)}>
          <div className="bg-white rounded-3xl p-5 max-w-3xl w-full shadow-2xl space-y-4 mw-animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#1677A8]" />
                <span className="text-sm font-bold text-[#123B5D]">{zoomModalImage.title}</span>
                {zoomModalImage.name && (
                  <span className="text-xs text-slate-400 font-mono">({zoomModalImage.name})</span>
                )}
              </div>
              <button onClick={() => setZoomModalImage(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">✕</button>
            </div>

            <div className="relative max-h-[65vh] overflow-auto rounded-2xl bg-slate-950 flex items-center justify-center p-2 border border-slate-200">
              {zoomModalImage.src.startsWith('data:image') || zoomModalImage.src.endsWith('.jpg') || zoomModalImage.src.endsWith('.png') ? (
                <img src={zoomModalImage.src} alt={zoomModalImage.title} className="max-h-[60vh] w-auto object-contain rounded-lg shadow-md" />
              ) : (
                <div className="p-8 text-center text-white space-y-2">
                  <FileText size={48} className="text-white/70 mx-auto" />
                  <div className="font-bold text-sm">مستند بصيغة رقمية ({zoomModalImage.name})</div>
                  <p className="text-xs text-slate-300">يمكنك الضغط على زر التحميل أدناه لفتح وتنزيل الملف كاملاً.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => triggerDownload(zoomModalImage.src, zoomModalImage.name || 'document.jpg')}
                className="mw-btn mw-btn-primary text-xs py-2 px-4 font-bold flex items-center gap-1.5"
              >
                <Download size={14} />
                حفظ وتحميل الملف في جهازك
              </button>

              <button
                type="button"
                onClick={() => setZoomModalImage(null)}
                className="mw-btn mw-btn-outline text-xs py-2 px-4 bg-white"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
