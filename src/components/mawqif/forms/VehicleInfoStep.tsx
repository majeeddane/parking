'use client';
import React, { useState } from 'react';
import { FormData } from '@/app/mawqif/apply/page';
import { Car, ChevronLeft, ChevronRight, AlertCircle, Info } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CAR_MAKES = [
  'تويوتا (Toyota)',
  'هيونداي (Hyundai)',
  'نيسان (Nissan)',
  'كيا (Kia)',
  'فورد (Ford)',
  'شيفروليه (Chevrolet)',
  'مازدا (Mazda)',
  'مرسيدس-بنز (Mercedes-Benz)',
  'بي إم دبليو (BMW)',
  'لكزس (Lexus)',
  'هوندا (Honda)',
  'جيلي (Geely)',
  'هافال (Haval)',
  'أم جي (MG)',
  'شانجان (Changan)',
  'أخرى',
];

const YEARS = Array.from({ length: 25 }, (_, i) => String(2026 - i));

export default function VehicleInfoStep({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.carMake) newErrors.carMake = 'يرجى اختيار الشركة المصنعة';
    if (!data.carModel.trim()) newErrors.carModel = 'يرجى إدخال موديل السيارة';
    if (!data.carYear) newErrors.carYear = 'يرجى تحديد سنة الصنع';
    if (!data.carColor.trim()) newErrors.carColor = 'يرجى تحديد لون السيارة';
    if (!data.plateNumber.trim()) newErrors.plateNumber = 'يرجى إدخال رقم اللوحة (مثال: أ ب ج 1234)';
    if (!data.vehicleLicenseNumber.trim()) newErrors.vehicleLicenseNumber = 'يرجى إدخال رقم رخصة السير (الاستمارة)';
    
    if (data.isOwner === 'no' && !data.ownerRelation.trim()) {
      newErrors.ownerRelation = 'يرجى توضيح صلة مقدم الطلب بالمركبة أو إرفاق صفة التفويض';
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
      {/* Make & Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">الشركة المصنعة / نوع السيارة</label>
          <select
            className={`mw-select ${errors.carMake ? 'mw-input-error' : ''}`}
            value={data.carMake}
            onChange={(e) => {
              onChange({ carMake: e.target.value });
              if (errors.carMake) setErrors({ ...errors, carMake: '' });
            }}
          >
            <option value="">اختر الشركة المصنعة</option>
            {CAR_MAKES.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
          {errors.carMake && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.carMake}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">الموديل / الفئة</label>
          <input
            type="text"
            className={`mw-input ${errors.carModel ? 'mw-input-error' : ''}`}
            placeholder="مثال: كامري / Camry أو سوناتا / Sonata"
            value={data.carModel}
            onChange={(e) => {
              onChange({ carModel: e.target.value });
              if (errors.carModel) setErrors({ ...errors, carModel: '' });
            }}
          />
          {errors.carModel && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.carModel}</span>
          )}
        </div>
      </div>

      {/* Year & Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">سنة الصنع</label>
          <select
            className={`mw-select ${errors.carYear ? 'mw-input-error' : ''}`}
            value={data.carYear}
            onChange={(e) => {
              onChange({ carYear: e.target.value });
              if (errors.carYear) setErrors({ ...errors, carYear: '' });
            }}
          >
            <option value="">اختر سنة الصنع</option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          {errors.carYear && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.carYear}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">لون المركبة</label>
          <input
            type="text"
            className={`mw-input ${errors.carColor ? 'mw-input-error' : ''}`}
            placeholder="مثال: أبيض لؤلؤي، أسود، فضي"
            value={data.carColor}
            onChange={(e) => {
              onChange({ carColor: e.target.value });
              if (errors.carColor) setErrors({ ...errors, carColor: '' });
            }}
          />
          {errors.carColor && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.carColor}</span>
          )}
        </div>
      </div>

      {/* Plate & License Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">رقم اللوحة</label>
          <input
            type="text"
            className={`mw-input ${errors.plateNumber ? 'mw-input-error' : ''}`}
            placeholder="مثال: أ ب ج 1234 أو ABC 1234"
            value={data.plateNumber}
            onChange={(e) => {
              onChange({ plateNumber: e.target.value });
              if (errors.plateNumber) setErrors({ ...errors, plateNumber: '' });
            }}
          />
          {errors.plateNumber && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.plateNumber}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">رقم رخصة السير (الاستمارة)</label>
          <input
            type="text"
            className={`mw-input ${errors.vehicleLicenseNumber ? 'mw-input-error' : ''}`}
            placeholder="الرقم التسلسلي المسجل في استمارة السيارة"
            value={data.vehicleLicenseNumber}
            onChange={(e) => {
              onChange({ vehicleLicenseNumber: e.target.value.replace(/\D/g, '') });
              if (errors.vehicleLicenseNumber) setErrors({ ...errors, vehicleLicenseNumber: '' });
            }}
          />
          {errors.vehicleLicenseNumber && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.vehicleLicenseNumber}</span>
          )}
        </div>
      </div>

      {/* Ownership Radio */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <label className="mw-label font-bold text-slate-800">هل المركبة مملوكة لك باسمك مباشرة؟</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="isOwner"
              value="yes"
              checked={data.isOwner === 'yes'}
              onChange={() => onChange({ isOwner: 'yes' })}
              className="accent-[#1677A8] w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-semibold text-slate-700">نعم، المركبة مسجلة باسمي</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="isOwner"
              value="no"
              checked={data.isOwner === 'no'}
              onChange={() => onChange({ isOwner: 'no' })}
              className="accent-[#1677A8] w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-semibold text-slate-700">لا، لدي تفويض قيادة أو صلة أخرى</span>
          </label>
        </div>

        {/* Dynamic Relation field if not owner */}
        {data.isOwner === 'no' && (
          <div className="pt-3 border-t border-slate-200 mt-3 mw-animate-fadeIn">
            <div className="mw-form-group">
              <label className="mw-label mw-label-required">صلة مقدم الطلب بالمركبة وطبيعة التفويض</label>
              <input
                type="text"
                className={`mw-input ${errors.ownerRelation ? 'mw-input-error' : ''}`}
                placeholder="مثال: تفويض قيادة ساري عبر أبشر / سيارة الوالد / مركبة عمل"
                value={data.ownerRelation}
                onChange={(e) => {
                  onChange({ ownerRelation: e.target.value });
                  if (errors.ownerRelation) setErrors({ ...errors, ownerRelation: '' });
                }}
              />
              {errors.ownerRelation && (
                <span className="mw-error-msg"><AlertCircle size={13} /> {errors.ownerRelation}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex flex-col md:flex-row justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="mw-btn mw-btn-outline w-full md:w-auto"
        >
          <ChevronRight size={18} />
          الرجوع للمعلومات الشخصية
        </button>

        <button
          type="submit"
          className="mw-btn mw-btn-primary mw-btn-lg w-full md:w-auto"
        >
          المتابعة إلى المستندات
          <ChevronLeft size={18} />
        </button>
      </div>
    </form>
  );
}
