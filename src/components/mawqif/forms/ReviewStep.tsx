'use client';
import React, { useState } from 'react';
import { FormData } from '@/app/mawqif/apply/page';
import { User, Car, FileCheck, CheckCircle2, ChevronRight, Send, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  data: FormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ReviewStep({ data, onBack, onSubmit, isSubmitting }: Props) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [showAckError, setShowAckError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledged) {
      setShowAckError(true);
      return;
    }
    onSubmit();
  };

  const maskId = (id: string) => {
    if (!id || id.length < 4) return id;
    return '******' + id.slice(-4);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center md:text-right pb-2">
        <h3 className="text-lg font-bold text-[#123B5D]">مراجعة تفاصيل الطلب</h3>
        <p className="text-sm text-slate-500">يرجى مراجعة وتدقيق جميع المعلومات والمستندات قبل التأكيد والإرسال النهائي.</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Applicant Details */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#123B5D] font-bold border-b border-slate-200 pb-3">
            <User size={18} className="text-[#1677A8]" />
            <span>بيانات مقدم الطلب</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400 text-xs block">الاسم بالكامل</span>
              <span className="font-semibold text-slate-800">{data.firstName} {data.fatherName} {data.familyName || '—'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">رقم الهوية / الإقامة</span>
              <span className="font-semibold text-slate-800" dir="ltr">{maskId(data.idNumber)}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">رقم الجوال</span>
              <span className="font-semibold text-slate-800" dir="ltr">{data.phone || '—'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">البريد الإلكتروني</span>
              <span className="font-semibold text-slate-800 truncate block">{data.email || '—'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 text-xs block">المدينة والعنوان</span>
              <span className="font-semibold text-slate-800">{data.city} - {data.address}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Vehicle Details */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#123B5D] font-bold border-b border-slate-200 pb-3">
            <Car size={18} className="text-[#1677A8]" />
            <span>بيانات المركبة</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400 text-xs block">المركبة والموديل</span>
              <span className="font-semibold text-slate-800">{data.carMake} {data.carModel}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">سنة الصنع / اللون</span>
              <span className="font-semibold text-slate-800">{data.carYear} ({data.carColor})</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">رقم اللوحة</span>
              <span className="font-bold text-[#123B5D] bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block">{data.plateNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">رقم رخصة السير</span>
              <span className="font-semibold text-slate-800" dir="ltr">{data.vehicleLicenseNumber || '—'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 text-xs block">الملكية / التفويض</span>
              <span className="font-semibold text-slate-800">
                {data.isOwner === 'yes' ? 'مملوكة لمقدم الطلب مباشرة' : `غير مملوكة مباشرة (${data.ownerRelation || 'تفويض قيادة'})`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Documents Checklist */}
      <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-[#123B5D] font-bold border-b border-slate-200 pb-3">
          <FileCheck size={18} className="text-[#19A974]" />
          <span>المستندات المرفقة</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
            <CheckCircle2 size={16} className="text-[#19A974] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800">الهوية / الإقامة</div>
              <div className="text-[11px] text-slate-400 truncate">{data.idDocument?.name || 'تم الإرفاق'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
            <CheckCircle2 size={16} className="text-[#19A974] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800">رخصة القيادة</div>
              <div className="text-[11px] text-slate-400 truncate">{data.drivingLicense?.name || 'تم الإرفاق'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
            <CheckCircle2 size={16} className="text-[#19A974] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800">رخصة السير</div>
              <div className="text-[11px] text-slate-400 truncate">{data.vehicleLicense?.name || 'تم الإرفاق'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
            {data.carPhoto ? (
              <CheckCircle2 size={16} className="text-[#19A974] shrink-0" />
            ) : (
              <span className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0" />
            )}
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800">صورة المركبة</div>
              <div className="text-[11px] text-slate-400 truncate">{data.carPhoto?.name || 'لم ترفق (اختياري)'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Acknowledgment */}
      <div className={`p-4 rounded-2xl border transition-all ${showAckError ? 'border-red-400 bg-red-50/70' : 'border-emerald-200 bg-emerald-50/40'}`}>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => {
              setAcknowledged(e.target.checked);
              if (e.target.checked) setShowAckError(false);
            }}
            className="mt-1 w-5 h-5 rounded border-slate-300 text-[#19A974] focus:ring-[#19A974] cursor-pointer accent-[#19A974]"
          />
          <div className="text-sm font-medium text-slate-800 leading-relaxed">
            أقر وأتعهد بأن جميع البيانات والمستندات المرفقة في هذا الطلب صحيحة ودقيقة وسارية المفعول نظاميًا، وأتحمل كامل المسؤولية النظامية عن أي بيانات غير مطابقة للواقع.
          </div>
        </label>
        {showAckError && (
          <div className="text-xs text-red-600 font-bold flex items-center gap-1 mt-2 mr-8">
            <AlertTriangle size={14} />
            يرجى الموافقة على الإقرار والتعهد لإتمام عملية الإرسال
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex flex-col md:flex-row justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="mw-btn mw-btn-outline w-full md:w-auto"
        >
          <ChevronRight size={18} />
          الرجوع للمستندات
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mw-btn mw-btn-accent mw-btn-lg w-full md:w-auto text-white font-bold"
        >
          {isSubmitting ? (
            <>
              <span className="mw-spinner" />
              جارٍ إرسال الطلب وحفظ البيانات...
            </>
          ) : (
            <>
              <Send size={18} />
              إرسال الطلب النهائي
            </>
          )}
        </button>
      </div>
    </form>
  );
}
