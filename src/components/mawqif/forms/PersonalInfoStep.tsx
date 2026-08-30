'use client';
import React, { useState } from 'react';
import { FormData } from '@/app/mawqif/apply/page';
import { User, Phone, Mail, MapPin, Calendar, CreditCard, ChevronLeft, AlertCircle } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export default function PersonalInfoStep({ data, onChange, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.firstName.trim()) newErrors.firstName = 'يرجى إدخال الاسم الأول';
    if (!data.fatherName.trim()) newErrors.fatherName = 'يرجى إدخال اسم الأب';
    if (!data.familyName.trim()) newErrors.familyName = 'يرجى إدخال اسم العائلة';
    
    // Saudi ID / Iqama validation (10 digits starting with 1 or 2)
    if (!data.idNumber.trim()) {
      newErrors.idNumber = 'يرجى إدخال رقم الهوية الوطنية / الإقامة';
    } else if (!/^[12]\d{9}$/.test(data.idNumber.trim())) {
      newErrors.idNumber = 'رقم الهوية/الإقامة يجب أن يتكون من 10 أرقام ويبدأ بـ 1 أو 2';
    }

    if (!data.dateOfBirth) newErrors.dateOfBirth = 'يرجى تحديد تاريخ الميلاد';
    
    // Saudi Phone validation
    if (!data.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الجوال';
    } else if (!/^(05\d{8}|5\d{8}|\+9665\d{8})$/.test(data.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'يرجى إدخال رقم جوال سعودي صحيح (مثال: 0501234567)';
    }

    // Email validation
    if (!data.email.trim()) {
      newErrors.email = 'يرجى إدخال البريد الإلكتروني';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صالح';
    }

    if (!data.city.trim()) newErrors.city = 'يرجى اختيار أو كتابة المدينة';
    if (!data.address.trim()) newErrors.address = 'يرجى إدخال العنوان الوطني أو الحي';

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
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">الاسم الأول</label>
          <div className="relative">
            <input
              type="text"
              className={`mw-input ${errors.firstName ? 'mw-input-error' : ''}`}
              placeholder="مثال: محمد"
              value={data.firstName}
              onChange={(e) => {
                onChange({ firstName: e.target.value });
                if (errors.firstName) setErrors({ ...errors, firstName: '' });
              }}
            />
          </div>
          {errors.firstName && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.firstName}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">اسم الأب</label>
          <input
            type="text"
            className={`mw-input ${errors.fatherName ? 'mw-input-error' : ''}`}
            placeholder="مثال: أحمد"
            value={data.fatherName}
            onChange={(e) => {
              onChange({ fatherName: e.target.value });
              if (errors.fatherName) setErrors({ ...errors, fatherName: '' });
            }}
          />
          {errors.fatherName && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.fatherName}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">اسم العائلة</label>
          <input
            type="text"
            className={`mw-input ${errors.familyName ? 'mw-input-error' : ''}`}
            placeholder="مثال: العتيبي"
            value={data.familyName}
            onChange={(e) => {
              onChange({ familyName: e.target.value });
              if (errors.familyName) setErrors({ ...errors, familyName: '' });
            }}
          />
          {errors.familyName && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.familyName}</span>
          )}
        </div>
      </div>

      {/* ID & Date of Birth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">رقم الهوية الوطنية / الإقامة</label>
          <div className="relative">
            <input
              type="text"
              maxLength={10}
              className={`mw-input ${errors.idNumber ? 'mw-input-error' : ''}`}
              placeholder="10 أرقام (مثال: 1082345678)"
              value={data.idNumber}
              onChange={(e) => {
                onChange({ idNumber: e.target.value.replace(/\D/g, '') });
                if (errors.idNumber) setErrors({ ...errors, idNumber: '' });
              }}
            />
          </div>
          {errors.idNumber && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.idNumber}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">تاريخ الميلاد</label>
          <input
            type="date"
            className={`mw-input ${errors.dateOfBirth ? 'mw-input-error' : ''}`}
            value={data.dateOfBirth}
            onChange={(e) => {
              onChange({ dateOfBirth: e.target.value });
              if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
            }}
          />
          {errors.dateOfBirth && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.dateOfBirth}</span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">رقم الجوال</label>
          <input
            type="tel"
            dir="ltr"
            className={`mw-input text-right ${errors.phone ? 'mw-input-error' : ''}`}
            placeholder="05XXXXXXXX"
            value={data.phone}
            onChange={(e) => {
              onChange({ phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
          />
          {errors.phone && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.phone}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">البريد الإلكتروني</label>
          <input
            type="email"
            dir="ltr"
            className={`mw-input text-right ${errors.email ? 'mw-input-error' : ''}`}
            placeholder="name@example.com"
            value={data.email}
            onChange={(e) => {
              onChange({ email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
          />
          {errors.email && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.email}</span>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mw-form-group">
          <label className="mw-label mw-label-required">المدينة</label>
          <select
            className={`mw-select ${errors.city ? 'mw-input-error' : ''}`}
            value={data.city}
            onChange={(e) => {
              onChange({ city: e.target.value });
              if (errors.city) setErrors({ ...errors, city: '' });
            }}
          >
            <option value="">اختر المدينة</option>
            <option value="الرياض">الرياض</option>
            <option value="جدة">جدة</option>
            <option value="الدمام">الدمام</option>
            <option value="مكة المكرمة">مكة المكرمة</option>
            <option value="المدينة المنورة">المدينة المنورة</option>
            <option value="الخبر">الخبر</option>
            <option value="الأحساء">الأحساء</option>
            <option value="أبها">أبها</option>
            <option value="تبوك">تبوك</option>
            <option value="أخرى">مدينة أخرى</option>
          </select>
          {errors.city && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.city}</span>
          )}
        </div>

        <div className="mw-form-group">
          <label className="mw-label mw-label-required">العنوان الوطني / الحي والشارع</label>
          <input
            type="text"
            className={`mw-input ${errors.address ? 'mw-input-error' : ''}`}
            placeholder="مثال: حي النرجس، شارع أنس بن مالك"
            value={data.address}
            onChange={(e) => {
              onChange({ address: e.target.value });
              if (errors.address) setErrors({ ...errors, address: '' });
            }}
          />
          {errors.address && (
            <span className="mw-error-msg"><AlertCircle size={13} /> {errors.address}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-4 flex justify-end">
        <button type="submit" className="mw-btn mw-btn-primary mw-btn-lg w-full md:w-auto">
          المتابعة إلى بيانات السيارة
          <ChevronLeft size={18} />
        </button>
      </div>
    </form>
  );
}
