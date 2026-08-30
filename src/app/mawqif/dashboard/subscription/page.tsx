'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Printer,
  Share2,
  CheckCircle,
  Car,
  Calendar,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Sparkles,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';

export default function SubscriptionCardPage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'بطاقة اشتراك مواقف المجانية',
        text: 'بطاقة اشتراك مواقف - رقم الاشتراك PARK-2026-10482',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[85vh] py-8 md:py-12 bg-[#F7F9FC]">
        <div className="mw-container">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
              <Link href="/mawqif/dashboard" className="hover:text-[#1677A8]">لوحة التحكم</Link>
              <span>›</span>
              <span className="text-slate-800 font-bold">بطاقة الاشتراك الرقمية</span>
            </div>
            <Link
              href="/mawqif/verify?id=PARK-2026-10482"
              className="text-xs text-[#1677A8] hover:underline flex items-center gap-1 font-semibold"
            >
              <ExternalLink size={13} />
              صفحة التحقق العامة
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: The Premium Digital Card (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Digital Pass Card */}
              <div
                id="printable-card"
                className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-white shadow-2xl transition-all hover:shadow-cyan-900/20"
                style={{
                  background: 'linear-gradient(135deg, #123B5D 0%, #16537e 45%, #1677A8 85%, #19A974 100%)',
                }}
              >
                {/* Decorative background watermarks */}
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#19A974]/20 blur-3xl pointer-events-none" />

                {/* Header row of Card */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Car size={22} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-lg md:text-xl tracking-tight">مواقف | Mawqif</h2>
                      <span className="text-[11px] text-white/75 block -mt-1 font-medium">بطاقة اشتراك مواقف إلكترونية</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#19A974] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md shadow-emerald-950/20">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    اشتراك فعّال
                  </div>
                </div>

                {/* Card Body: Member Info & QR Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10">
                  
                  {/* Member Data (2 cols) */}
                  <div className="sm:col-span-2 space-y-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-white/70 block">اسم المشترك</span>
                      <span className="text-lg md:text-xl font-bold tracking-wide">محمد أحمد العتيبي</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                      <div>
                        <span className="text-[11px] text-white/70 block">رقم الاشتراك</span>
                        <span className="font-mono font-bold text-white text-sm" dir="ltr">PARK-2026-10482</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/70 block">رقم اللوحة</span>
                        <span className="font-mono font-black text-[#123B5D] bg-white px-2.5 py-0.5 rounded-md inline-block shadow-sm">
                          أ ب ج 1234
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/70 block">المركبة المصرحة</span>
                        <span className="font-semibold text-white/90">Toyota Camry 2024</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/70 block">الفترة المعتمدة</span>
                        <span className="font-semibold text-white/90">سنة كاملة (مجاني)</span>
                      </div>
                    </div>

                    {/* Validity Period */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
                      <div>
                        <span className="block text-[10px] text-white/60">تاريخ البدء:</span>
                        <span className="font-medium">01 سبتمبر 2026</span>
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] text-white/60">تاريخ الانتهاء:</span>
                        <span className="font-medium text-emerald-200">31 أغسطس 2027</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Container (1 col) */}
                  <div className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl shadow-lg border border-white/40 text-center">
                    {/* Visual Crisp SVG QR Code */}
                    <div className="w-28 h-28 relative flex items-center justify-center bg-slate-900 rounded-lg p-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                        {/* 3 Large Corner Position Squares */}
                        <path d="M5,5 h30 v30 h-30 z M10,10 v20 h20 v-20 z M15,15 h10 v10 h-10 z" />
                        <path d="M65,5 h30 v30 h-30 z M70,10 v20 h20 v-20 z M75,15 h10 v10 h-10 z" />
                        <path d="M5,65 h30 v30 h-30 z M10,70 v20 h20 v-20 z M15,75 h10 v10 h-10 z" />
                        {/* Center & Accent Data Blocks */}
                        <rect x="42" y="8" width="8" height="8" />
                        <rect x="52" y="18" width="6" height="6" />
                        <rect x="42" y="28" width="10" height="6" />
                        <rect x="8" y="42" width="6" height="8" />
                        <rect x="18" y="52" width="8" height="6" />
                        <rect x="40" y="40" width="20" height="20" rx="3" fill="#19A974" />
                        <rect x="68" y="45" width="8" height="12" />
                        <rect x="80" y="50" width="12" height="6" />
                        <rect x="45" y="68" width="10" height="8" />
                        <rect x="60" y="68" width="8" height="15" />
                        <rect x="75" y="75" width="16" height="16" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold mt-2">امسح للتحقق</span>
                    <span className="text-[9px] text-slate-400 font-mono">PARK-2026-10482</span>
                  </div>

                </div>

                {/* Footer Bar of Card */}
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#19A974]" />
                    <span>معتمد رقميًا من منصة مواقف</span>
                  </div>
                  <span className="font-mono">VERIFIED SECURE PASS</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handlePrint}
                  className="mw-btn mw-btn-primary flex-1 min-w-[140px] text-sm font-bold"
                >
                  <Printer size={16} />
                  طباعة الاشتراك
                </button>
                <button
                  onClick={() => alert('تم تجهيز ملف PDF للتحميل بنجاح!')}
                  className="mw-btn mw-btn-outline flex-1 min-w-[140px] text-sm font-semibold bg-white"
                >
                  <Download size={16} />
                  تحميل البطاقة (PDF)
                </button>
                <button
                  onClick={handleShare}
                  className="mw-btn mw-btn-outline px-4 text-sm bg-white"
                  title="مشاركة"
                >
                  <Share2 size={16} />
                  {copied ? 'تم النسخ!' : 'مشاركة'}
                </button>
              </div>

            </div>

            {/* Right Column: Instructions & Usage (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Usage Guide */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#123B5D] font-bold pb-2 border-b border-slate-100">
                  <QrCode size={18} className="text-[#1677A8]" />
                  <span>طريقة استخدام البطاقة عند البوابات</span>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1677A8] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>وجّه شاشة الجوال برمز الـ QR نحو الماسح الضوئي عند مدخل الموقف المعتمد.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1677A8] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>ستتعرف كاميرات القراءة التلقائية على رقم اللوحة المسجل (<strong className="text-slate-800">أ ب ج 1234</strong>).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1677A8] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p>تفتح البوابة تلقائيًا دون الحاجة لسحب تذكرة ورقية أو دفع أي رسوم.</p>
                  </div>
                </div>
              </div>

              {/* Status & Validity Widget */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">الأيام المتبقية في الاشتراك</span>
                  <span className="text-xs font-bold text-[#19A974] bg-emerald-50 px-2 py-0.5 rounded-full">365 يومًا</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1677A8] to-[#19A974] h-full rounded-full w-full" />
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>تاريخ البدء: 01-09-2026</span>
                  <span>الانتهاء: 31-08-2027</span>
                </div>
              </div>

              {/* Apple Wallet / Google Wallet integration button */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Smartphone size={22} className="text-slate-200" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">إضافة إلى المحفظة الرقمية</div>
                    <div className="text-[11px] text-slate-400">Apple Wallet & Google Wallet</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('تمت إضافة بطاقة مواقف إلى محفظتك بنجاح!')}
                  className="px-3.5 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shrink-0"
                >
                  إضافة
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
