'use client';
import React, { useState } from 'react';
import { FormData } from '@/app/mawqif/apply/page';
import FileUpload from '@/components/mawqif/ui/FileUpload';
import { ChevronLeft, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DocumentsStep({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.idDocument) {
      newErrors.idDocument = 'يرجى إرفاق صورة الهوية الوطنية أو الإقامة';
    }
    if (!data.drivingLicense) {
      newErrors.drivingLicense = 'يرجى إرفاق صورة رخصة القيادة السارية';
    }
    if (!data.vehicleLicense) {
      newErrors.vehicleLicense = 'يرجى إرفاق صورة رخصة سير المركبة (الاستمارة)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="text-[#1677A8] shrink-0 mt-0.5" size={20} />
        <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
          يرجى التأكد من وضوح جميع المستندات المصورة وخلوها من أي انعكاسات ضوئية لحجب البيانات، وذلك لضمان سرعة تدقيق وقبول طلبك خلال أوقات العمل الرسمية.
        </div>
      </div>

      {/* Grid of File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. National ID */}
        <div className="space-y-1">
          <FileUpload
            label="الهوية الوطنية / الإقامة"
            required={true}
            hint="صورة واضحة للوجهين أو ملف PDF"
            onFileChange={(file) => {
              onChange({ idDocument: file });
              if (errors.idDocument) setErrors({ ...errors, idDocument: '' });
            }}
          />
          {errors.idDocument && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.idDocument}</span>
          )}
        </div>

        {/* 2. Driving License */}
        <div className="space-y-1">
          <FileUpload
            label="رخصة القيادة"
            required={true}
            hint="يجب أن تكون الرخصة سارية المفعول"
            onFileChange={(file) => {
              onChange({ drivingLicense: file });
              if (errors.drivingLicense) setErrors({ ...errors, drivingLicense: '' });
            }}
          />
          {errors.drivingLicense && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.drivingLicense}</span>
          )}
        </div>

        {/* 3. Vehicle License / Istimara */}
        <div className="space-y-1">
          <FileUpload
            label="رخصة السير (استمارة المركبة)"
            required={true}
            hint="إثبات تسجيل المركبة وسريان الفحص والتأمين"
            onFileChange={(file) => {
              onChange({ vehicleLicense: file });
              if (errors.vehicleLicense) setErrors({ ...errors, vehicleLicense: '' });
            }}
          />
          {errors.vehicleLicense && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.vehicleLicense}</span>
          )}
        </div>

        {/* 4. Car Photo (Optional) */}
        <div className="space-y-1">
          <FileUpload
            label="صورة للمركبة من الأمام"
            required={false}
            hint="صورة تظهر لوحة المركبة ومظهرها الخارجي"
            onFileChange={(file) => {
              onChange({ carPhoto: file });
            }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex flex-col md:flex-row justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="mw-btn mw-btn-outline w-full md:w-auto"
        >
          <ChevronRight size={18} />
          الرجوع لبيانات السيارة
        </button>

        <button
          type="submit"
          className="mw-btn mw-btn-primary mw-btn-lg w-full md:w-auto"
        >
          المتابعة إلى المراجعة والإقرار
          <ChevronLeft size={18} />
        </button>
      </div>
    </form>
  );
}
