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
import { Car, Lock, UserPlus, LogIn, ShieldAlert, CheckCircle, ShieldCheck } from 'lucide-react';
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
  const { currentUser, isLoggedIn, submitApplication } = useMawqif();

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

  // Auto prefill from logged-in user profile
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
      }));
    }
  }, [currentUser]);

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
      <div style={{
        background: 'linear-gradient(135deg, var(--mw-primary) 0%, #1a5276 100%)',
        padding: '3rem 0 2rem',
        color: 'white',
      }}>
        <div className="mw-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>
              <Link href="/mawqif" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>الرئيسية</Link>
              <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>›</span>
              <span>تقديم طلب اشتراك جديد</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Car size={22} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', margin: 0 }}>
                طلب اشتراك مجاني في المواقف
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                برنامج الاشتراك السنوي المجاني لمدة 12 شهرًا للمستفيدين المؤهلين
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ background: 'var(--mw-bg)', minHeight: '70vh', padding: '2.5rem 0' }}>
        <div className="mw-container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* AUTHENTICATION GATE CHECK */}
            {!isLoggedIn ? (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-center space-y-6 mw-animate-scaleIn">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-100 shadow-inner">
                  <Lock size={32} />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#123B5D]">
                    تسجيل الدخول مطلوب للتقديم
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    لحماية بياناتك وإتاحة متابعة حالة الطلب وإصدار بطاقة الاشتراك الرقمية، يلزم تسجيل الدخول بحسابك أو إنشاء حساب مستفيد جديد أولاً.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
                  <Link
                    href="/mawqif/register"
                    className="mw-btn mw-btn-primary py-3 font-bold text-xs md:text-sm flex-1 text-center justify-center"
                  >
                    <UserPlus size={16} />
                    إنشاء حساب جديد
                  </Link>
                  <Link
                    href="/mawqif/login?redirect=/mawqif/apply"
                    className="mw-btn mw-btn-outline py-3 font-bold text-xs md:text-sm flex-1 text-center justify-center bg-white"
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
            ) : (
              <>
                {/* User welcome info bar */}
                <div className="mb-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl p-3.5 px-5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#19A974]" />
                    <span className="font-bold text-[#123B5D]">مقدم الطلب: {currentUser?.fullName}</span>
                    <span className="text-slate-400 font-mono">({currentUser?.idNumber})</span>
                  </div>
                  <span className="text-[#1677A8] font-semibold hidden sm:inline-block">تم استيراد بياناتك تلقائيًا ✓</span>
                </div>

                {/* Step Indicator */}
                <div style={{
                  background: 'var(--mw-white)',
                  borderRadius: '20px',
                  padding: '1.75rem 2rem',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--mw-border)',
                  boxShadow: 'var(--mw-shadow-sm)',
                }}>
                  <StepIndicator steps={STEPS} currentStep={currentStep} />
                </div>

                {/* Form Card */}
                <div style={{
                  background: 'var(--mw-white)',
                  borderRadius: '20px',
                  border: '1px solid var(--mw-border)',
                  boxShadow: 'var(--mw-shadow-sm)',
                  overflow: 'hidden',
                  animation: 'mw-fadeIn 0.3s ease',
                }}>
                  {/* Step Header */}
                  <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid var(--mw-border)',
                    background: 'var(--mw-bg)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        background: 'var(--mw-secondary)',
                        color: 'white',
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        {currentStep}
                      </span>
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--mw-primary)', margin: 0 }}>
                        {STEPS[currentStep - 1].label}
                      </h2>
                      <span style={{ color: 'var(--mw-muted)', fontSize: '0.85rem', marginRight: 'auto' }}>
                        الخطوة {currentStep} من {STEPS.length}
                      </span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div style={{ padding: '2rem' }}>
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
