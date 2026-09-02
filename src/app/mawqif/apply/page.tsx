'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import StepIndicator from '@/components/mawqif/ui/StepIndicator';
import PersonalInfoStep from '@/components/mawqif/forms/PersonalInfoStep';
import VehicleInfoStep from '@/components/mawqif/forms/VehicleInfoStep';
import DocumentsStep from '@/components/mawqif/forms/DocumentsStep';
import ReviewStep from '@/components/mawqif/forms/ReviewStep';
import StatusBadge from '@/components/mawqif/ui/StatusBadge';
import {
  Car,
  Lock,
  UserPlus,
  LogIn,
  ShieldCheck,
  Clock,
  QrCode,
  FileSearch,
  LayoutDashboard,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useMawqif } from '@/components/mawqif/MawqifContext';

const STEPS = [
  { number: 1, label: 'المعلومات الشخصية', sublabel: 'Personal Info' },
  { number: 2, label: 'بيانات السيارة', sublabel: 'Vehicle Info' },
  { number: 3, label: 'المستندات', sublabel: 'Documents' },
  { number: 4, label: 'المراجعة والإرسال', sublabel: 'Review' },
];

export type FormData = {
  // Personal
  firstName: string;
  fatherName: string;
  familyName: string;
  idNumber: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  // Vehicle
  carMake: string;
  carModel: string;
  carYear: string;
  carColor: string;
  plateNumber: string;
  vehicleLicenseNumber: string;
  isOwner: string;
  ownerRelation: string;
  // Documents
  idDocument: File | null;
  idDocumentData?: { name: string; type: string; size: number; dataUrl: string } | null;
  drivingLicense: File | null;
  drivingLicenseData?: { name: string; type: string; size: number; dataUrl: string } | null;
  vehicleLicense: File | null;
  vehicleLicenseData?: { name: string; type: string; size: number; dataUrl: string } | null;
  carPhoto: File | null;
  carPhotoData?: { name: string; type: string; size: number; dataUrl: string } | null;
};

export default function ApplyPage() {
  const router = useRouter();
  const { currentUser, userApplication, isLoggedIn, submitApplication } = useMawqif();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    fatherName: '',
    familyName: '',
    idNumber: '',
    dateOfBirth: '1996-05-20',
    phone: '',
    email: '',
    city: 'الرياض',
    address: 'حي النرجس، شارع أنس بن مالك',
    carMake: '',
    carModel: '',
    carYear: '2024',
    carColor: '',
    plateNumber: '',
    vehicleLicenseNumber: '',
    isOwner: 'yes',
    ownerRelation: '',
    idDocument: null,
    idDocumentData: null,
    drivingLicense: null,
    drivingLicenseData: null,
    vehicleLicense: null,
    vehicleLicenseData: null,
    carPhoto: null,
    carPhotoData: null,
  });

  // Check application status
  const hasExistingApp = !!userApplication;
  const isPending = userApplication?.status === 'pending';
  const isApproved = userApplication?.status === 'approved' || userApplication?.status === 'completed';
  const isRejected = userApplication?.status === 'rejected';
  const isNeedsEdit = userApplication?.status === 'needs_edit';
  const canEditAndResubmit = isRejected || isNeedsEdit;

  // Auto prefill from user profile & existing application (for editing)
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        firstName: currentUser.firstName || prev.firstName,
        fatherName: currentUser.fatherName || prev.fatherName,
        familyName: currentUser.familyName || prev.familyName,
        idNumber: currentUser.idNumber || prev.idNumber,
        phone: currentUser.phone || prev.phone,
        email: currentUser.email || prev.email,
        city: currentUser.city || prev.city,
        address: currentUser.address || prev.address,
        dateOfBirth: currentUser.dateOfBirth || prev.dateOfBirth,
        ...(userApplication ? {
          carMake: userApplication.vehicleMake || prev.carMake,
          carModel: userApplication.vehicleModel || prev.carModel,
          carYear: userApplication.vehicleYear || prev.carYear,
          carColor: userApplication.vehicleColor || prev.carColor,
          plateNumber: userApplication.plateNumber || prev.plateNumber,
          vehicleLicenseNumber: userApplication.vehicleLicenseNumber || prev.vehicleLicenseNumber,
          isOwner: userApplication.isOwner || prev.isOwner,
          ownerRelation: userApplication.ownerRelation || prev.ownerRelation,
          idDocumentData: userApplication.documents?.idDocument || prev.idDocumentData,
          drivingLicenseData: userApplication.documents?.drivingLicense || prev.drivingLicenseData,
          vehicleLicenseData: userApplication.documents?.vehicleLicense || prev.vehicleLicenseData,
          carPhotoData: userApplication.documents?.carPhoto || prev.carPhotoData,
        } : {}),
      }));
    }
  }, [currentUser, userApplication]);

  const updateForm = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Submit via Context
    setTimeout(() => {
      const generatedId = submitApplication(formData);
      setIsSubmitting(false);
      router.push(`/mawqif/apply/success?id=${generatedId}`);
    }, 1200);
  };

  return (
    <>
      <MawqifNavbar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#123B5D] via-[#165a88] to-[#1a5276] py-6 sm:py-10 text-white">
        <div className="mw-container">
          <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-white/70">
            <Link href="/mawqif" className="text-white/80 hover:text-white transition-colors">الرئيسية</Link>
            <span className="opacity-50">›</span>
            <span>{canEditAndResubmit ? 'تعديل وإعادة إرسال الطلب' : 'تقديم طلب اشتراك جديد'}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Car size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                {canEditAndResubmit ? 'تعديل وإعادة إرسال طلب الاشتراك' : 'طلب اشتراك مجاني في المواقف'}
              </h1>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                برنامج الاشتراك السنوي المجاني لمدة 12 شهرًا للمستفيدين المؤهلين
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#F7F9FC] min-h-[70vh] py-6 sm:py-10">
        <div className="mw-container">
          <div className="max-w-3xl mx-auto">
            
            {/* 1. AUTHENTICATION GATE CHECK */}
            {!isLoggedIn ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200 shadow-xl text-center space-y-5 mw-animate-scaleIn">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-100 shadow-inner">
                  <Lock size={28} />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D]">
                    تسجيل الدخول مطلوب للتقديم
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    لحماية بياناتك وإتاحة متابعة حالة الطلب وإصدار بطاقة الاشتراك الرقمية، يلزم تسجيل الدخول بحسابك أو إنشاء حساب مستفيد جديد أولاً.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
                  <Link
                    href="/mawqif/register"
                    className="mw-btn mw-btn-primary py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center"
                  >
                    <UserPlus size={16} />
                    إنشاء حساب جديد
                  </Link>
                  <Link
                    href="/mawqif/login?redirect=/mawqif/apply"
                    className="mw-btn mw-btn-outline py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center bg-white"
                  >
                    <LogIn size={16} />
                    تسجيل الدخول
                  </Link>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} className="text-[#19A974]" />
                  <span>عملية التقديم مجانية 100% ولا تتطلب أي رسوم دفع</span>
                </div>
              </div>
            ) : isPending ? (
              /* 2. ALREADY HAS PENDING APPLICATION - PREVENT DUPLICATE SUBMISSION */
              <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200 shadow-xl text-center space-y-5 mw-animate-scaleIn">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-50 text-[#1677A8] flex items-center justify-center mx-auto border-2 border-blue-100 shadow-inner">
                  <Clock size={28} />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold mb-1">
                    <StatusBadge status="pending" size="sm" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D]">
                    لديك طلب اشتراك قيد المراجعة بالفعل
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    لقد قمت بتقديم طلب اشتراك مسبقًا برقم مرجعي <span className="font-mono font-bold text-[#123B5D]" dir="ltr">({userApplication.id})</span> وهو الآن قيد التدقيق والمراجعة من قبل الفريق المختص. لا يمكنك تقديم طلب جديد مكرر حتى صدور القرار النهائي.
                  </p>
                </div>

                {/* Application Snapshot Card */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 max-w-md mx-auto text-right text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <span className="text-slate-400">رقم الطلب</span>
                    <span className="font-bold text-[#123B5D] font-mono text-sm" dir="ltr">{userApplication.id}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <span className="text-slate-400">المركبة المسجلة</span>
                    <span className="font-bold text-slate-800 truncate max-w-[200px]">{userApplication.vehicleMake} {userApplication.vehicleModel} ({userApplication.plateNumber})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">تاريخ التقديم</span>
                    <span className="font-bold text-slate-800">{userApplication.submissionDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                  <Link
                    href={`/mawqif/track?id=${userApplication.id}`}
                    className="mw-btn mw-btn-primary py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center"
                  >
                    <FileSearch size={16} />
                    متابعة وتتبع حالة الطلب
                  </Link>
                  <Link
                    href="/mawqif/dashboard"
                    className="mw-btn mw-btn-outline py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center bg-white"
                  >
                    <LayoutDashboard size={16} />
                    لوحة تحكم المستفيد
                  </Link>
                </div>
              </div>
            ) : isApproved ? (
              /* 3. ALREADY HAS APPROVED SUBSCRIPTION */
              <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200 shadow-xl text-center space-y-5 mw-animate-scaleIn">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-50 text-[#19A974] flex items-center justify-center mx-auto border-2 border-emerald-100 shadow-inner">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D]">
                    لديك اشتراك سنوي مفعّل ومعتمد بالفعل 🎉
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    تمت الموافقة على طلبك مسبقًا واشتراكك السنوي المجاني مفعّل وجاهز للاستخدام. يمكنك فتح بطاقتك الرقمية واستخدام الـ QR Code عند جميع بوابات المواقف.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                  <Link
                    href="/mawqif/dashboard/subscription"
                    className="mw-btn mw-btn-accent text-white py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center shadow-md"
                  >
                    <QrCode size={16} />
                    استعراض بطاقتي الرقمية
                  </Link>
                  <Link
                    href="/mawqif/dashboard"
                    className="mw-btn mw-btn-outline py-3 font-bold text-xs sm:text-sm flex-1 text-center justify-center bg-white"
                  >
                    <LayoutDashboard size={16} />
                    لوحة التحكم
                  </Link>
                </div>
              </div>
            ) : (
              /* 4. FRESH SUBMISSION OR EDITING REJECTED / NEEDS_EDIT APPLICATION */
              <>
                {/* User welcome info bar */}
                <div className="mb-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl p-3 sm:p-3.5 px-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#19A974] shrink-0" />
                    <span className="font-bold text-[#123B5D]">مقدم الطلب: {currentUser?.fullName}</span>
                    <span className="text-slate-400 font-mono">({currentUser?.idNumber})</span>
                  </div>
                  <span className="text-[#1677A8] font-semibold text-[11px] sm:text-xs">
                    {canEditAndResubmit ? 'تم استرجاع بياناتك السابقة للتعديل' : 'تم استيراد بياناتك تلقائيًا ✓'}
                  </span>
                </div>

                {/* Banner if application was rejected or needs edit */}
                {isRejected && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-900 space-y-2 shadow-sm mw-animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-red-800">
                      <AlertTriangle size={17} className="text-red-600 shrink-0" />
                      <span>تنبيه: يمكنك الآن تعديل بياناتك ومستنداتك وإعادة إرسال الطلب</span>
                    </div>
                    <p className="text-xs sm:text-sm text-red-700 leading-relaxed pr-6">
                      سبب رفض الطلب السابق: <span className="font-semibold">{userApplication?.rejectionReason || 'عدم وضوح المستندات المرفقة أو عدم مطابقة البيانات.'}</span>
                    </p>
                    <div className="text-[11px] text-red-600/90 pr-6">
                      قم بمراجعة البيانات وتصحيح المستندات في الخطوات التالية، ثم اضغط على «إعادة إرسال الطلب بعد التعديل» لإعادة مراجعته واعتماده.
                    </div>
                  </div>
                )}

                {isNeedsEdit && (
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 space-y-2 shadow-sm mw-animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
                      <AlertCircle size={17} className="text-amber-600 shrink-0" />
                      <span>مطلوب تعديل وتحديث بيانات الطلب</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-800 leading-relaxed pr-6">
                      ملاحظات فريق المراجعة: <span className="font-semibold">{userApplication?.rejectionReason || 'يرجى إعادة رفع المستندات المطلوبة.'}</span>
                    </p>
                    <div className="text-[11px] text-amber-700 pr-6">
                      يرجى تحديث المستند أو الحقل المطلوب والمتابعة لإعادة الإرسال.
                    </div>
                  </div>
                )}

                {/* Step Indicator */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border border-slate-200 shadow-xs">
                  <StepIndicator steps={STEPS} currentStep={currentStep} />
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden mw-animate-fadeIn">
                  {/* Step Header */}
                  <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#1677A8] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {currentStep}
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-[#123B5D]">
                        {STEPS[currentStep - 1].label}
                      </h2>
                    </div>
                    <span className="text-slate-400 text-xs font-medium">
                      الخطوة {currentStep} من {STEPS.length}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="p-4 sm:p-6 md:p-8">
                    {currentStep === 1 && (
                      <PersonalInfoStep
                        data={formData}
                        onChange={updateForm}
                        onNext={nextStep}
                      />
                    )}
                    {currentStep === 2 && (
                      <VehicleInfoStep
                        data={formData}
                        onChange={updateForm}
                        onNext={nextStep}
                        onBack={prevStep}
                      />
                    )}
                    {currentStep === 3 && (
                      <DocumentsStep
                        data={formData}
                        onChange={updateForm}
                        onNext={nextStep}
                        onBack={prevStep}
                      />
                    )}
                    {currentStep === 4 && (
                      <ReviewStep
                        data={formData}
                        onBack={prevStep}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                      />
                    )}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
