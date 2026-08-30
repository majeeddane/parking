'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import StepIndicator from '@/components/mawqif/ui/StepIndicator';
import PersonalInfoStep from '@/components/mawqif/forms/PersonalInfoStep';
import VehicleInfoStep from '@/components/mawqif/forms/VehicleInfoStep';
import DocumentsStep from '@/components/mawqif/forms/DocumentsStep';
import ReviewStep from '@/components/mawqif/forms/ReviewStep';
import { Car, ArrowRight } from 'lucide-react';

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
  drivingLicense: File | null;
  vehicleLicense: File | null;
  carPhoto: File | null;
};

const initialData: FormData = {
  firstName: '', fatherName: '', familyName: '', idNumber: '',
  dateOfBirth: '', phone: '', email: '', city: '', address: '',
  carMake: '', carModel: '', carYear: '', carColor: '', plateNumber: '',
  vehicleLicenseNumber: '', isOwner: 'yes', ownerRelation: '',
  idDocument: null, drivingLicense: null, vehicleLicense: null, carPhoto: null,
};

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const updateForm = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    router.push('/mawqif/apply/success');
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
              <a href="/mawqif" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>الرئيسية</a>
              <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>›</span>
              <span>تقديم طلب</span>
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
                أكمل الخطوات التالية للتقديم على اشتراك مجاني لمدة 12 شهرًا
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ background: 'var(--mw-bg)', minHeight: '70vh', padding: '2.5rem 0' }}>
        <div className="mw-container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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

            {/* Help Note */}
            <div style={{
              background: 'var(--mw-info-bg)',
              border: '1px solid rgba(22,119,168,0.2)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginTop: '1.25rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
            }}>
              <span style={{ color: 'var(--mw-secondary)', flexShrink: 0 }}>ℹ️</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--mw-secondary)', margin: 0, lineHeight: 1.65 }}>
                جميع البيانات التي تُدخلها محمية وتُستخدم فقط لأغراض معالجة طلبك وفق سياسة الخصوصية المعتمدة.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
