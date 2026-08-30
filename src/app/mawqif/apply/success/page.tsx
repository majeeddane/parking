'use client';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, ArrowLeft, Home, FileSearch, ShieldCheck, Clock, BellRing } from 'lucide-react';
import { useState } from 'react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';

export default function ApplicationSuccessPage() {
  const [copied, setCopied] = useState(false);
  const applicationNumber = 'PARK-2026-10482';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(applicationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[80vh] py-12 md:py-16 bg-[#F7F9FC] flex items-center justify-center">
        <div className="mw-container w-full">
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center space-y-6 mw-animate-scaleIn">
            
            {/* Animated Success Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 text-[#19A974] rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100/80 shadow-inner">
              <CheckCircle2 size={48} className="animate-bounce" />
            </div>

            {/* Title & Desc */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#123B5D]">
                تم استلام طلبك بنجاح
              </h1>
              <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
                شكرًا لتقديم طلبك في برنامج مواقف. سيقوم فريقنا المختص بمراجعة البيانات والمستندات المرفقة وتدقيقها بأسرع وقت.
              </p>
            </div>

            {/* Application Number Box */}
            <div className="bg-slate-50 border-2 border-dashed border-[#1677A8]/30 rounded-2xl p-5 relative overflow-hidden">
              <span className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
                رقم الطلب المرجعي
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl md:text-3xl font-black text-[#123B5D] tracking-wider font-mono" dir="ltr">
                  {applicationNumber}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors shadow-sm"
                  title="نسخ رقم الطلب"
                >
                  {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                </button>
              </div>
              {copied && (
                <div className="text-xs text-emerald-600 font-bold mt-1.5 mw-animate-fadeIn">
                  تم نسخ رقم الطلب إلى الحافظة!
                </div>
              )}
            </div>

            {/* Information Roadmap */}
            <div className="bg-blue-50/60 rounded-2xl p-4 text-right space-y-3 border border-blue-100">
              <div className="text-xs font-bold text-[#123B5D] flex items-center gap-1.5">
                <Clock size={15} className="text-[#1677A8]" />
                <span>ماذا يحدث بعد ذلك؟</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pr-4 list-disc marker:text-[#1677A8]">
                <li>تستغرق المراجعة المبدئية من 24 إلى 48 ساعة عمل.</li>
                <li>ستصلك رسالة نصية SMS وبريد إلكتروني فور صدور قرار الاعتماد.</li>
                <li>بإمكانك الدخول لصفحة المتابعة بأي وقت باستخدام رقم الهوية أو رقم الطلب.</li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/mawqif/track?id=${applicationNumber}`}
                className="mw-btn mw-btn-primary flex-1 text-center justify-center font-bold"
              >
                <FileSearch size={18} />
                متابعة حالة الطلب
              </Link>
              <Link
                href="/mawqif"
                className="mw-btn mw-btn-outline flex-1 text-center justify-center"
              >
                <Home size={18} />
                العودة للرئيسية
              </Link>
            </div>

          </div>
        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
