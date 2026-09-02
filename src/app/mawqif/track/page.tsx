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
  ChevronLeft,
  Lock,
  UserPlus,
  LogIn,
  AlertTriangle,
  PlusCircle
} from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import StatusBadge, { StatusType } from '@/components/mawqif/ui/StatusBadge';
import { useMawqif, UserApplication } from '@/components/mawqif/MawqifContext';

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

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const { currentUser, isLoggedIn, userApplication } = useMawqif();

  const [query, setQuery] = useState(initialId);
  const [activeRecord, setActiveRecord] = useState<ApplicationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const buildRecordFromApp = (app: UserApplication, applicantName: string, idNumber: string): ApplicationRecord => {
    const isApproved = app.status === 'approved';
    const isRejected = app.status === 'rejected';
    const isNeedsEdit = app.status === 'needs_edit';

    let stages = [];
    if (isApproved) {
      stages = [
        { title: 'تم إرسال الطلب بنجاح', date: app.submissionDate, completed: true },
        { title: 'تم استلام وتوثيق المستندات', date: app.submissionDate, completed: true },
        { title: 'تمت مراجعة الوثائق بنجاح', date: app.submissionDate, completed: true },
        { title: 'صدر قرار الموافقة والاعتماد', date: app.submissionDate, completed: true },
        { title: 'تم إصدار بطاقة الاشتراك الرقمية', date: app.submissionDate, completed: true, current: true },
      ];
    } else if (isRejected) {
      stages = [
        { title: 'تم إرسال الطلب بنجاح', date: app.submissionDate, completed: true },
        { title: 'تم استلام المستندات', date: app.submissionDate, completed: true },
        { title: 'تعذر التحقق أو عدم تطابق البيانات', date: app.submissionDate, completed: false, failed: true },
        { title: 'الطلب مرفوض (يمكنك التعديل وإعادة الإرسال)', completed: false },
        { title: 'إصدار بطاقة الاشتراك', completed: false },
      ];
    } else if (isNeedsEdit) {
      stages = [
        { title: 'تم إرسال الطلب بنجاح', date: app.submissionDate, completed: true },
        { title: 'تم استلام وفحص المستندات', date: app.submissionDate, completed: true },
        { title: 'مطلوب تعديل وتحديث بيانات الطلب', date: app.submissionDate, completed: false, current: true },
        { title: 'إعادة التدقيق والاعتماد', completed: false },
        { title: 'إصدار بطاقة الاشتراك', completed: false },
      ];
    } else {
      // Pending
      stages = [
        { title: 'تم إرسال الطلب بنجاح', date: app.submissionDate, completed: true },
        { title: 'تم استلام وتوثيق المستندات', date: app.submissionDate, completed: true },
        { title: 'جارٍ تدقيق رخصة السير والبيانات من قبل الفريق', completed: false, current: true },
        { title: 'القرار النهائي والاعتماد', completed: false },
        { title: 'إصدار بطاقة الاشتراك الإلكترونية', completed: false },
      ];
    }

    return {
      id: app.id,
      idNumber: idNumber,
      applicantName: applicantName,
      submissionDate: app.submissionDate || 'اليوم',
      vehicle: `${app.vehicleMake || ''} ${app.vehicleModel || ''} ${app.vehicleYear || ''}`.trim() || 'مركبة مسجلة',
      plate: app.plateNumber || '—',
      status: app.status,
      statusText: isApproved
        ? 'تمت الموافقة واعتماد الاشتراك'
        : isRejected
        ? 'لم تتم الموافقة على الطلب'
        : isNeedsEdit
        ? 'الطلب بانتظار تعديل المستندات'
        : 'قيد المراجعة والتدقيق',
      rejectionReason: app.rejectionReason,
      currentStep: isApproved ? 5 : isRejected || isNeedsEdit ? 3 : 2,
      stages: stages,
    };
  };

  // On load or change, auto-load the user's application if logged in
  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      setActiveRecord(null);
      return;
    }

    const idFromParam = searchParams.get('id');
    const targetId = idFromParam || (userApplication ? userApplication.id : '');

    if (targetId) {
      setQuery(targetId);
      searchUserApplication(targetId);
    } else if (userApplication) {
      setQuery(userApplication.id);
      setActiveRecord(buildRecordFromApp(userApplication, currentUser.fullName, currentUser.idNumber));
      setHasSearched(true);
    }
  }, [isLoggedIn, currentUser, userApplication, searchParams]);

  const searchUserApplication = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const clean = searchTerm.trim().toUpperCase();

      // Check against current logged in user's application
      if (
        userApplication &&
        (userApplication.id.toUpperCase() === clean ||
          currentUser?.idNumber === clean ||
          currentUser?.phone === clean)
      ) {
        setActiveRecord(buildRecordFromApp(userApplication, currentUser.fullName, currentUser.idNumber));
        setHasSearched(true);
        setIsLoading(false);
        return;
      }

      // Check localStorage database for this user's account specifically
      try {
        const localStr = localStorage.getItem('mawqif_accounts_db');
        if (localStr && currentUser) {
          const accounts = JSON.parse(localStr);
          // Look inside the current user's record
          const myAccount = accounts[currentUser.id] || accounts[currentUser.idNumber] || accounts[currentUser.phone];
          if (myAccount && myAccount.application) {
            const app = myAccount.application;
            if (
              app.id.toUpperCase() === clean ||
              clean === currentUser.idNumber ||
              clean === currentUser.phone
            ) {
              setActiveRecord(buildRecordFromApp(app, currentUser.fullName, currentUser.idNumber));
              setHasSearched(true);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (e) {
        console.error('Error parsing local DB in track page:', e);
      }

      // Not found for this specific user
      setActiveRecord(null);
      setHasSearched(true);
      setErrorMessage(
        `لم يتم العثور على أي طلب خاص بحسابك بالرقم «${searchTerm}». يرجى التأكد من كتابة رقم طلبك بشكل صحيح.`
      );
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    searchUserApplication(query);
  };

  return (
    <div className="min-h-[75vh] py-8 sm:py-12 bg-[#F7F9FC] font-sans">
      <div className="mw-container">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold">
            <ShieldCheck size={14} />
            البوابة الآمنة لمتابعة الطلبات
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#123B5D]">
            متابعة حالة الطلب
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            تتبع مراحل وتفاصيل طلبك للحصول على اشتراك المواقف السنوي بكل خصوصية وأمان.
          </p>
        </div>

        {/* 1. AUTHENTICATION GATE: IF NOT LOGGED IN */}
        {!isLoggedIn ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-5 mw-animate-scaleIn">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-100 shadow-inner">
              <Lock size={28} />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D]">
                تسجيل الدخول مطلوب لمتابعة الطلب
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                لحماية خصوصية وسرية بيانات المستفيدين ومستنداتهم الرسمية، تقتصر متابعة حالة الطلبات على صاحب الحساب المسجل فقط.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
              <Link
                href="/mawqif/login?redirect=/mawqif/track"
                className="mw-btn mw-btn-primary py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center"
              >
                <LogIn size={16} />
                تسجيل الدخول لمتابعة طلبي
              </Link>
              <Link
                href="/mawqif/register"
                className="mw-btn mw-btn-outline py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center bg-white"
              >
                <UserPlus size={16} />
                إنشاء حساب جديد
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} className="text-[#19A974]" />
              <span>بياناتك ومعلومات مركبتك مشفرة ومحمية بأعلى معايير الأمان</span>
            </div>
          </div>
        ) : !userApplication && !activeRecord ? (
          /* 2. LOGGED IN BUT HAS NO APPLICATION YET */
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md text-center space-y-5 mw-animate-fadeIn">
            <div className="w-14 h-14 rounded-3xl bg-blue-50 text-[#1677A8] flex items-center justify-center mx-auto">
              <FileText size={28} />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#123B5D]">
                مرحباً {currentUser?.fullName} 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                لا يوجد لديك أي طلب اشتراك مقدم حتى الآن في حسابك. يمكنك تقديم طلبك الآن للحصول على اشتراك مجاني في مواقف السيارات لمدة سنة كاملة.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/mawqif/apply"
                className="mw-btn mw-btn-primary py-3 px-6 font-bold text-xs sm:text-sm inline-flex items-center gap-2"
              >
                <PlusCircle size={16} />
                تقديم طلب اشتراك جديد
              </Link>
            </div>
          </div>
        ) : (
          /* 3. LOGGED IN WITH APPLICATION - SEARCH & DETAIL VIEW */
          <>
            {/* Search Input Box */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="أدخل رقم طلبك (مثال: PARK-2026-XXXXX)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-transparent text-xs sm:text-sm md:text-base outline-none text-[#172B3A] placeholder:text-slate-400 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mw-btn mw-btn-primary px-7 py-3 rounded-xl font-bold text-xs sm:text-sm"
                >
                  {isLoading ? <span className="mw-spinner" /> : 'استعلام'}
                </button>
              </form>

              {/* User helper chip */}
              {userApplication && (
                <div className="flex items-center justify-between mt-3 text-xs text-slate-500 px-2">
                  <span>طلبك المسجل: <strong className="text-[#123B5D] font-mono" dir="ltr">{userApplication.id}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery(userApplication.id);
                      searchUserApplication(userApplication.id);
                    }}
                    className="text-[#1677A8] hover:underline font-bold"
                  >
                    عرض تفاصيل طلبي
                  </button>
                </div>
              )}
            </div>

            {/* Error / Not Found Message */}
            {errorMessage && (
              <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1 mw-animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <AlertCircle size={16} />
                  <span>تنبيه</span>
                </div>
                <p className="pr-6">{errorMessage}</p>
              </div>
            )}

            {/* Results Section */}
            {isLoading ? (
              <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-center">
                <span className="mw-spinner inline-block text-[#1677A8] w-8 h-8" />
                <div className="text-slate-500 text-xs sm:text-sm">جارٍ جلب تفاصيل الطلب...</div>
              </div>
            ) : activeRecord ? (
              <div className="max-w-2xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md space-y-6 mw-animate-fadeIn">
                
                {/* Top Status Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-400 font-mono tracking-wider">رقم الطلب</span>
                      <span className="text-base sm:text-lg font-bold text-[#123B5D] font-mono" dir="ltr">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs">المركبة</span>
                    <span className="font-bold text-slate-800 truncate block">{activeRecord.vehicle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">رقم اللوحة</span>
                    <span className="font-bold text-[#123B5D] bg-white px-2 py-0.5 rounded border border-slate-200 inline-block font-mono">
                      {activeRecord.plate}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-xs">مدة البرنامج</span>
                    <span className="font-semibold text-[#19A974]">12 شهرًا مجانًا</span>
                  </div>
                </div>

                {/* Rejection / Needs Edit Banner with Edit & Resubmit Action */}
                {activeRecord.status === 'rejected' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-bold text-red-900">
                          سبب عدم الموافقة على الطلب
                        </div>
                        <p className="text-xs text-red-700 leading-relaxed">
                          {activeRecord.rejectionReason || 'عدم وضوح المستندات المرفقة أو عدم مطابقة البيانات للشروط.'}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-red-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-[11px] text-red-700">
                        يمكنك تعديل بياناتك ومستنداتك وإعادة إرسال الطلب لمراجعته مجدداً:
                      </span>
                      <Link
                        href="/mawqif/apply"
                        className="mw-btn mw-btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 w-full sm:w-auto justify-center bg-red-600 hover:bg-red-700 border-red-600"
                      >
                        <Edit3 size={14} />
                        تعديل وإعادة إرسال الطلب
                      </Link>
                    </div>
                  </div>
                )}

                {activeRecord.status === 'needs_edit' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-bold text-amber-950">
                          مطلوب تعديل وتحديث بيانات الطلب
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          {activeRecord.rejectionReason || 'يرجى مراجعة وتعديل المستندات المطلوبة لإكمال التدقيق.'}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-[11px] text-amber-800">
                        قم بتحديث الحقول أو المستندات المطلوبة ثم أعد إرسال الطلب:
                      </span>
                      <Link
                        href="/mawqif/apply"
                        className="mw-btn mw-btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
                      >
                        <Edit3 size={14} />
                        تحديث الطلب الآن
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tracking Stages Timeline */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-bold text-sm text-[#123B5D] flex items-center gap-2">
                    <Calendar size={16} className="text-[#1677A8]" />
                    <span>مراحل متابعة ومعالجة الطلب</span>
                  </h3>

                  <div className="space-y-4 pr-2">
                    {activeRecord.stages.map((stage, idx) => {
                      const isLast = idx === activeRecord.stages.length - 1;
                      return (
                        <div key={idx} className="relative flex items-start gap-3">
                          {/* Vertical Connector Line */}
                          {!isLast && (
                            <div
                              className={`absolute right-3.5 top-7 bottom-0 w-0.5 -mb-4 ${
                                stage.completed ? 'bg-[#19A974]' : 'bg-slate-200'
                              }`}
                            />
                          )}

                          {/* Stage Icon */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                              stage.failed
                                ? 'bg-red-500 text-white shadow-sm'
                                : stage.completed
                                ? 'bg-[#19A974] text-white shadow-sm'
                                : stage.current
                                ? 'bg-[#1677A8] text-white ring-4 ring-cyan-100 shadow-sm'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}
                          >
                            {stage.failed ? (
                              <XCircle size={15} />
                            ) : stage.completed ? (
                              <CheckCircle2 size={15} />
                            ) : stage.current ? (
                              <Clock size={15} className="animate-spin" style={{ animationDuration: '3s' }} />
                            ) : (
                              <span className="text-[10px] font-bold">{idx + 1}</span>
                            )}
                          </div>

                          {/* Stage Info */}
                          <div className="flex-1 pt-0.5">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span
                                className={`text-xs sm:text-sm font-bold ${
                                  stage.failed
                                    ? 'text-red-700'
                                    : stage.completed
                                    ? 'text-slate-800'
                                    : stage.current
                                    ? 'text-[#1677A8]'
                                    : 'text-slate-400'
                                }`}
                              >
                                {stage.title}
                              </span>
                              {stage.date && (
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {stage.date}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Approved CTA: View Digital Pass */}
                {activeRecord.status === 'approved' && (
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-900">
                        🎉 تم تفعيل بطاقة الاشتراك الرقمية
                      </div>
                      <div className="text-[11px] text-emerald-700">
                        يمكنك استعراض واستخدام بطاقتك برمز QR عند البوابات الآن.
                      </div>
                    </div>
                    <Link
                      href="/mawqif/dashboard/subscription"
                      className="mw-btn mw-btn-accent text-white text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 w-full sm:w-auto justify-center shadow-sm"
                    >
                      <QrCode size={15} />
                      فتح بطاقتي الرقمية
                    </Link>
                  </div>
                )}

              </div>
            ) : null}
          </>
        )}

      </div>
    </div>
  );
}

export default function TrackApplicationPage() {
  return (
    <>
      <MawqifNavbar />
      <Suspense fallback={<div className="p-12 text-center text-slate-400">جارٍ التحميل...</div>}>
        <TrackContent />
      </Suspense>
      <MawqifFooter />
    </>
  );
}
