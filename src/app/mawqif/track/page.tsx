'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Car,
  FileText,
  CreditCard,
  QrCode,
  Edit3,
  Calendar,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import StatusBadge, { StatusType } from '@/components/mawqif/ui/StatusBadge';

interface ApplicationRecord {
  id: string;
  idNumber: string;
  applicantName: string;
  submissionDate: string;
  vehicle: string;
  plate: string;
  status: StatusType;
  statusText: string;
  rejectionReason?: string;
  currentStep: number;
  stages: { title: string; date?: string; completed: boolean; current?: boolean; failed?: boolean }[];
}

const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'PARK-2026-10482',
    idNumber: '1082345678',
    applicantName: 'محمد أحمد العتيبي',
    submissionDate: '28 أغسطس 2026',
    vehicle: 'Toyota Camry 2024',
    plate: 'أ ب ج 1234',
    status: 'pending',
    statusText: 'قيد المراجعة والتدقيق',
    currentStep: 3,
    stages: [
      { title: 'تم إرسال الطلب بنجاح', date: '28 أغسطس 2026', completed: true },
      { title: 'تم استلام وتوثيق المستندات', date: '29 أغسطس 2026', completed: true },
      { title: 'جارٍ تدقيق رخصة السير والبيانات', date: 'اليوم', completed: false, current: true },
      { title: 'القرار النهائي والاعتماد', completed: false },
      { title: 'إصدار بطاقة الاشتراك الإلكترونية', completed: false },
    ],
  },
  {
    id: 'PARK-2026-09311',
    idNumber: '1098765432',
    applicantName: 'خالد سالم الشمري',
    submissionDate: '15 أغسطس 2026',
    vehicle: 'Hyundai Sonata 2023',
    plate: 'س ص ع 5678',
    status: 'approved',
    statusText: 'تمت الموافقة واعتماد الاشتراك',
    currentStep: 5,
    stages: [
      { title: 'تم إرسال الطلب بنجاح', date: '15 أغسطس 2026', completed: true },
      { title: 'تم استلام وتوثيق المستندات', date: '16 أغسطس 2026', completed: true },
      { title: 'تمت مراجعة الوثائق بنجاح', date: '17 أغسطس 2026', completed: true },
      { title: 'صدر قرار الموافقة والاعتماد', date: '18 أغسطس 2026', completed: true },
      { title: 'تم إصدار بطاقة الاشتراك الرقمية', date: '18 أغسطس 2026', completed: true, current: true },
    ],
  },
  {
    id: 'PARK-2026-08119',
    idNumber: '1045678901',
    applicantName: 'أحمد محمود الغامدي',
    submissionDate: '20 أغسطس 2026',
    vehicle: 'Toyota Corolla 2022',
    plate: 'د هـ و 9012',
    status: 'rejected',
    statusText: 'لم تتم الموافقة على الطلب',
    rejectionReason: 'الصورة المرفقة لرخصة السير غير واضحة وتاريخ انتهاء الرخصة غير مقروء.',
    currentStep: 3,
    stages: [
      { title: 'تم إرسال الطلب بنجاح', date: '20 أغسطس 2026', completed: true },
      { title: 'تم استلام المستندات', date: '21 أغسطس 2026', completed: true },
      { title: 'تعذر التحقق من رخصة السير المرفقة', date: '22 أغسطس 2026', completed: false, failed: true },
      { title: 'إلغاء الطلب (مرفوض)', completed: false },
      { title: 'إصدار الاشتراك', completed: false },
    ],
  },
  {
    id: 'PARK-2026-07442',
    idNumber: '1023456789',
    applicantName: 'سارة خالد الدوسري',
    submissionDate: '25 أغسطس 2026',
    vehicle: 'Kia K5 2024',
    plate: 'ر ز ط 4321',
    status: 'needs_edit',
    statusText: 'الطلب بانتظار تعديل المستندات',
    rejectionReason: 'يرجى إعادة رفع صورة واضحة ومحدثة لرخصة القيادة لتطابق الاسم.',
    currentStep: 3,
    stages: [
      { title: 'تم إرسال الطلب', date: '25 أغسطس 2026', completed: true },
      { title: 'تم فحص المستندات', date: '26 أغسطس 2026', completed: true },
      { title: 'مطلوب إعادة رفع رخصة القيادة', date: '27 أغسطس 2026', completed: false, current: true },
      { title: 'إعادة التدقيق', completed: false },
      { title: 'إصدار الاشتراك', completed: false },
    ],
  },
];

function TrackContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('id') || 'PARK-2026-10482');
  const [activeRecord, setActiveRecord] = useState<ApplicationRecord | null>(MOCK_APPLICATIONS[0]);
  const [hasSearched, setHasSearched] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setQuery(id);
      handleSearchWithParam(id);
    }
  }, [searchParams]);

  const handleSearchWithParam = (searchTerm: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const clean = searchTerm.trim().toUpperCase();
      const found = MOCK_APPLICATIONS.find(
        (app) => app.id.toUpperCase() === clean || app.idNumber === clean
      );
      setActiveRecord(found || null);
      setHasSearched(true);
      setIsLoading(false);
    }, 400);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleSearchWithParam(query);
  };

  return (
    <div className="min-h-[75vh] py-8 md:py-12 bg-[#F7F9FC]">
      <div className="mw-container">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#123B5D]">
            متابعة طلب الاشتراك
          </h1>
          <p className="text-sm text-slate-500">
            أدخل رقم الطلب المرجعي أو رقم الهوية الوطنية لمتابعة مراحل مراجعة طلبك بشكل فوري.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="أدخل رقم الطلب (مثال: PARK-2026-10482) أو رقم الهوية..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-transparent text-sm md:text-base outline-none text-[#172B3A] placeholder:text-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mw-btn mw-btn-primary px-8 py-3 rounded-xl font-bold"
            >
              {isLoading ? <span className="mw-spinner" /> : 'بحث واستعلام'}
            </button>
          </form>

          {/* Quick Demo Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-medium">نماذج تجريبية سريعة:</span>
            {MOCK_APPLICATIONS.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  setQuery(app.id);
                  handleSearchWithParam(app.id);
                }}
                className={`px-3 py-1 rounded-full border transition-all ${
                  activeRecord?.id === app.id
                    ? 'bg-[#123B5D] text-white border-[#123B5D] font-bold shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {app.id} ({app.status === 'pending' ? 'قيد المراجعة' : app.status === 'approved' ? 'مقبول' : app.status === 'rejected' ? 'مرفوض' : 'يحتاج تعديل'})
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {isLoading ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-center">
            <span className="mw-spinner inline-block text-[#1677A8] w-8 h-8" />
            <div className="text-slate-500 text-sm">جارٍ البحث عن تفاصيل الطلب...</div>
          </div>
        ) : activeRecord ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6 mw-animate-fadeIn">
            
            {/* Top Status Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-400 font-mono tracking-wider">رقم الطلب</span>
                  <span className="text-base md:text-lg font-bold text-[#123B5D] font-mono" dir="ltr">
                    {activeRecord.id}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  {activeRecord.applicantName}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  تاريخ التقديم: {activeRecord.submissionDate}
                </div>
              </div>

              <div>
                <StatusBadge status={activeRecord.status} size="lg" />
              </div>
            </div>

            {/* Vehicle Card Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs md:text-sm">
              <div>
                <span className="text-slate-400 block text-xs">المركبة</span>
                <span className="font-bold text-slate-800">{activeRecord.vehicle}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">رقم اللوحة</span>
                <span className="font-bold text-[#123B5D] bg-white px-2 py-0.5 rounded border border-slate-200 inline-block font-mono">
                  {activeRecord.plate}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-xs">نوع الاشتراك</span>
                <span className="font-bold text-[#19A974]">مجاني لمدة سنة</span>
              </div>
            </div>

            {/* Rejection / Edit Alert if applicable */}
            {activeRecord.status === 'rejected' && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-red-900">
                  <XCircle size={18} className="text-red-600" />
                  <span>لم يتم قبول الطلب</span>
                </div>
                <p className="text-xs md:text-sm text-red-700 leading-relaxed">
                  سبب الرفض: {activeRecord.rejectionReason}
                </p>
                <div className="pt-2">
                  <Link
                    href="/mawqif/apply"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 bg-white px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors shadow-sm"
                  >
                    <Edit3 size={14} />
                    تقديم طلب جديد مع تصحيح المستند
                  </Link>
                </div>
              </div>
            )}

            {activeRecord.status === 'needs_edit' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                  <AlertCircle size={18} className="text-amber-600" />
                  <span>يتطلب إجراءً من مقدم الطلب</span>
                </div>
                <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
                  {activeRecord.rejectionReason}
                </p>
                <div className="pt-2">
                  <Link
                    href="/mawqif/apply"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#D97706] hover:bg-[#b45309] px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
                  >
                    <Edit3 size={14} />
                    تعديل ورفع المستند المطلوب
                  </Link>
                </div>
              </div>
            )}

            {activeRecord.status === 'approved' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-center sm:text-right">
                  <div className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 size={18} className="text-[#19A974]" />
                    <span>تم تفعيل اشتراكك بنجاح!</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    يمكنك الآن استعراض أو تنزيل بطاقة الاشتراك الإلكترونية واستخدام الـ QR Code عند البوابات.
                  </p>
                </div>
                <Link
                  href="/mawqif/dashboard/subscription"
                  className="mw-btn mw-btn-accent text-xs font-bold px-4 py-2 shrink-0 text-white"
                >
                  <QrCode size={16} />
                  عرض بطاقة الاشتراك
                </Link>
              </div>
            )}

            {/* Status Timeline */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-[#123B5D]">مراحل تقدم الطلب</h3>
              
              <div className="relative pr-4 space-y-6">
                {activeRecord.stages.map((stage, idx) => {
                  const isCompleted = stage.completed;
                  const isCurrent = stage.current;
                  const isFailed = stage.failed;
                  const isLast = idx === activeRecord.stages.length - 1;

                  return (
                    <div key={idx} className="relative flex items-start gap-3">
                      {/* Vertical line */}
                      {!isLast && (
                        <div
                          className={`absolute right-[9px] top-6 bottom-[-24px] w-0.5 ${
                            isCompleted ? 'bg-[#19A974]' : isFailed ? 'bg-red-400' : 'bg-slate-200'
                          }`}
                        />
                      )}

                      {/* Dot icon */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-[#19A974] text-white shadow-sm shadow-emerald-200'
                            : isFailed
                            ? 'bg-red-500 text-white'
                            : isCurrent
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isCompleted ? '✓' : isFailed ? '✕' : idx + 1}
                      </div>

                      {/* Stage info */}
                      <div className="flex-1 -mt-0.5">
                        <div className={`text-xs md:text-sm font-bold ${isCurrent ? 'text-[#123B5D]' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                          {stage.title}
                        </div>
                        {stage.date && (
                          <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                            {stage.date}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <h3 className="font-bold text-slate-800">لم يتم العثور على طلب مطابق</h3>
            <p className="text-xs text-slate-500">
              تأكد من كتابة رقم الطلب بصيغة صحيحة مثل <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">PARK-2026-10482</code> أو رقم الهوية الوطنية.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <>
      <MawqifNavbar />
      <Suspense fallback={<div className="p-8 text-center">جارٍ التحميل...</div>}>
        <TrackContent />
      </Suspense>
      <MawqifFooter />
    </>
  );
}
