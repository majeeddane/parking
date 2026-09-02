'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ExternalLink,
  PlusCircle,
  Clock,
  AlertCircle,
  Info,
  CheckCircle2
} from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import { useMawqif } from '@/components/mawqif/MawqifContext';

export default function SubscriptionCardPage() {
  const [copied, setCopied] = useState(false);
  const { currentUser, userApplication } = useMawqif();

  const isApproved = userApplication?.status === 'approved' || userApplication?.status === 'completed';
  const isPending = userApplication?.status === 'pending' || userApplication?.status === 'needs_edit';
  const hasApp = !!userApplication;

  const handlePrint = () => {
    if (!isApproved) {
      alert('هذا نموذج توضيحي فقط. ستتاح طباعة البطاقة الرسمية فور اعتماد طلبك من قبل فريق الدعم.');
      return;
    }
    window.print();
  };

  const handleDownload = () => {
    if (!isApproved) {
      alert('هذا نموذج تجريبي للمعاينة. سيتم إتاحة تحميل البطاقة الرسمية بصيغة PDF فور الموافقة على اشتراكك.');
      return;
    }
    alert('تم تجهيز ملف PDF للتحميل بنجاح!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'بطاقة اشتراك مواقف المجانية',
        text: `بطاقة اشتراك مواقف - رقم الاشتراك ${userApplication?.id || 'PARK-SAMPLE'}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Card details based on status
  const subNumber = isApproved
    ? (userApplication?.subscriptionNumber || userApplication?.id || 'PARK-2026-10482')
    : hasApp
    ? `${userApplication.id} (قيد الاعتماد)`
    : 'PARK-SAMPLE-PREVIEW';

  const memberName = currentUser?.fullName || 'اسم المستفيد (نموذج)';
  
  const vehicleName = hasApp
    ? `${userApplication.vehicleMake} ${userApplication.vehicleModel} ${userApplication.vehicleYear}`
    : 'تويوتا كامري 2024 (نموذج)';
  
  const plateNumber = hasApp ? userApplication.plateNumber : 'أ ب ج 1234';
  const startDate = userApplication?.subscriptionStartDate || (isApproved ? '01 سبتمبر 2026' : 'يبدأ فور الموافقة');
  const endDate = userApplication?.subscriptionEndDate || (isApproved ? '31 أغسطس 2027' : 'سنة كاملة من تاريخ الاعتماد');

  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[85vh] py-8 md:py-12 bg-[#F7F9FC] font-sans">
        <div className="mw-container">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
              <Link href="/mawqif/dashboard" className="hover:text-[#1677A8]">لوحة التحكم</Link>
              <span>›</span>
              <span className="text-slate-800 font-bold">بطاقة الاشتراك الرقمية</span>
            </div>
            {isApproved && (
              <Link
                href={`/mawqif/verify?id=${subNumber}`}
                className="text-xs text-[#1677A8] hover:underline flex items-center gap-1 font-semibold"
              >
                <ExternalLink size={13} />
                صفحة التحقق العامة
              </Link>
            )}
          </div>

          {/* Status Explanation Banner */}
          {!isApproved && (
            <div className={`mb-8 p-5 md:p-6 rounded-3xl border shadow-sm space-y-3 ${
              hasApp ? 'bg-amber-50/80 border-amber-200/80 text-amber-950' : 'bg-blue-50/80 border-blue-200/80 text-[#123B5D]'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  hasApp ? 'bg-amber-500 text-white' : 'bg-[#1677A8] text-white'
                }`}>
                  {hasApp ? <Clock size={20} /> : <Info size={20} />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-base md:text-lg">
                      {hasApp ? '📌 طلبك قيد المراجعة والتدقيق (نموذج توضيحي للبطاقة)' : '✨ نموذج توضيحي لبطاقة الاشتراك الرقمية'}
                    </h3>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                      hasApp ? 'bg-amber-200 text-amber-900' : 'bg-blue-200 text-blue-900'
                    }`}>
                      {hasApp ? 'بانتظار موافقة فريق الدعم' : 'معاينة تجريبية'}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                    {hasApp ? (
                      <>
                        تم استلام طلبك برقم (<strong className="font-mono">{userApplication.id}</strong>) بنجاح وهو حالياً قيد المراجعة والتدقيق من قبل فريق الدعم المختص. البطاقة المعروضة أدناه هي <strong>نموذج توضيحي تجريبي</strong> يوضح لك شكل بطاقتك الرقمية. <strong>ستتحول هذه البطاقة تلقائياً إلى بطاقة رسمية معتمدة</strong> برمز QR فعال وتفاصيل مركبتك بمجرد مراجعة طلبك والموافقة عليه من قبل فريق الدعم.
                      </>
                    ) : (
                      <>
                        البطاقة المعروضة أدناه هي <strong>نموذج توضيحي استرشادي</strong> يوضح شكل وميزات بطاقة الاشتراك الرقمية التي ستحصل عليها مجاناً لمدة عام كامل (365 يوماً) بعد تقديمك للطلب واعتماده من فريق الدعم.
                      </>
                    )}
                  </p>

                  {!hasApp && (
                    <div className="pt-2">
                      <Link
                        href="/mawqif/apply"
                        className="mw-btn mw-btn-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                      >
                        <PlusCircle size={15} />
                        قدّم طلبك الآن للحصول على اشتراك مجاني
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isApproved && (
            <div className="mb-8 p-4 md:p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#19A974] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base text-emerald-900">
                  🎉 تهانينا! اشتراكك السنوي معتمد وفعّال رسمياً
                </h3>
                <p className="text-xs text-emerald-800">
                  تم إصدار وتفعيل بطاقتك الرقمية بنجاح. يمكنك استخدامها الآن مباشرة عند جميع بوابات المواقف المعتمدة.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: The Digital Card (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Digital Pass Card */}
              <div
                id="printable-card"
                className="relative overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl transition-all hover:shadow-cyan-900/20 border border-white/20"
                style={{
                  background: isApproved
                    ? 'linear-gradient(135deg, #123B5D 0%, #16537e 45%, #1677A8 85%, #19A974 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #334155 45%, #475569 85%, #64748b 100%)',
                }}
              >
                {/* Watermark badge for Preview Sample */}
                {!isApproved && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="rotate-[-20deg] border-4 border-dashed border-amber-300/40 bg-amber-950/50 backdrop-blur-sm px-6 py-3 rounded-2xl text-amber-200 font-black text-lg md:text-xl tracking-widest uppercase shadow-2xl">
                      {hasApp ? 'نموذج تجريبي - قيد المراجعة' : 'نموذج توضيحي للمعاينة'}
                    </div>
                  </div>
                )}

                {/* Decorative background watermarks */}
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#19A974]/20 blur-3xl pointer-events-none" />

                {/* Header row of Card */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/mawqif/logo-icon-white.png"
                      alt="مواقف"
                      width={38}
                      height={38}
                      className="object-contain drop-shadow"
                    />
                    <div>
                      <h2 className="font-extrabold text-lg md:text-xl tracking-tight">مواقف | MAWAQIF</h2>
                      <span className="text-[11px] text-white/75 block -mt-1 font-medium">
                        {isApproved ? 'بطاقة اشتراك مواقف إلكترونية رسمية' : 'نموذج بطاقة اشتراك إلكترونية'}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                    isApproved ? 'bg-[#19A974] text-white shadow-emerald-950/20' : 'bg-amber-500 text-white shadow-amber-950/20'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {isApproved ? 'اشتراك فعّال ومعتمد' : hasApp ? 'قيد المراجعة والتدقيق' : 'نموذج معاينة'}
                  </div>
                </div>

                {/* Card Body: Member Info & QR Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10">
                  
                  {/* Member Data (2 cols) */}
                  <div className="sm:col-span-2 space-y-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-white/70 block">اسم المشترك</span>
                      <span className="text-lg md:text-xl font-bold tracking-wide">{memberName}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                      <div>
                        <span className="text-[11px] text-white/70 block">رقم الاشتراك</span>
                        <span className="font-mono font-bold text-white text-sm" dir="ltr">{subNumber}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/70 block">رقم اللوحة</span>
                        <span className="font-mono font-black text-[#123B5D] bg-white px-2.5 py-0.5 rounded-md inline-block shadow-sm">
                          {plateNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/70 block">المركبة المصرحة</span>
                        <span className="font-semibold text-white/90 truncate block">{vehicleName}</span>
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
                        <span className="font-medium">{startDate}</span>
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] text-white/60">تاريخ الانتهاء:</span>
                        <span className={`font-medium ${isApproved ? 'text-emerald-200' : 'text-slate-300'}`}>{endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Container (1 col) */}
                  <div className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl shadow-lg border border-white/40 text-center">
                    <div className="w-28 h-28 relative flex items-center justify-center bg-slate-900 rounded-lg p-1.5">
                      <svg viewBox="0 0 100 100" className={`w-full h-full text-white fill-current ${!isApproved ? 'opacity-80' : ''}`}>
                        <path d="M5,5 h30 v30 h-30 z M10,10 v20 h20 v-20 z M15,15 h10 v10 h-10 z" />
                        <path d="M65,5 h30 v30 h-30 z M70,10 v20 h20 v-20 z M75,15 h10 v10 h-10 z" />
                        <path d="M5,65 h30 v30 h-30 z M10,70 v20 h20 v-20 z M15,75 h10 v10 h-10 z" />
                        <rect x="42" y="8" width="8" height="8" />
                        <rect x="52" y="18" width="6" height="6" />
                        <rect x="42" y="28" width="10" height="6" />
                        <rect x="8" y="42" width="6" height="8" />
                        <rect x="18" y="52" width="8" height="6" />
                        <rect x="40" y="40" width="20" height="20" rx="3" fill={isApproved ? '#19A974' : '#F59E0B'} />
                        <rect x="68" y="45" width="8" height="12" />
                        <rect x="80" y="50" width="12" height="6" />
                        <rect x="45" y="68" width="10" height="8" />
                        <rect x="60" y="68" width="8" height="15" />
                        <rect x="75" y="75" width="16" height="16" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold mt-2">
                      {isApproved ? 'امسح للتحقق والدخول' : 'رمز QR توضيحي تجريبي'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono" dir="ltr">
                      {isApproved ? subNumber : 'SAMPLE-ONLY'}
                    </span>
                  </div>

                </div>

                {/* Footer Bar of Card */}
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className={isApproved ? 'text-[#19A974]' : 'text-amber-400'} />
                    <span>
                      {isApproved ? 'معتمد رقميًا من منصة مواقف' : 'نموذج توضيحي - يصدر رسمياً بعد التدقيق'}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] opacity-75">
                    {isApproved ? 'OFFICIAL SECURE PASS' : 'SAMPLE PREVIEW PASS'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handlePrint}
                  className={`mw-btn flex-1 min-w-[140px] text-sm font-bold ${
                    isApproved ? 'mw-btn-primary' : 'mw-btn-outline bg-white text-slate-600'
                  }`}
                  title={!isApproved ? 'يتاح فور اعتماد الطلب' : 'طباعة البطاقة'}
                >
                  <Printer size={16} />
                  {isApproved ? 'طباعة الاشتراك' : 'معاينة الطباعة'}
                </button>
                <button
                  onClick={handleDownload}
                  className="mw-btn mw-btn-outline flex-1 min-w-[140px] text-sm font-semibold bg-white"
                  title={!isApproved ? 'يتاح فور اعتماد الطلب' : 'تحميل PDF'}
                >
                  <Download size={16} />
                  {isApproved ? 'تحميل البطاقة (PDF)' : 'تحميل PDF (بعد الاعتماد)'}
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
              
              {/* How it works after approval */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#123B5D] font-bold pb-2 border-b border-slate-100">
                  <QrCode size={18} className="text-[#1677A8]" />
                  <span>آلية عمل البطاقة الحقيقية عند البوابات</span>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1677A8] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <p>بعد مراجعة وتدقيق المستندات من قبل فريق الدعم، يتم اعتماد حسابك وتفعيل بطاقتك الرسمية تلقائياً.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1677A8] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <p>عند وصولك لأي موقف معتمد، وجّه رمز الـ QR نحو الماسح الضوئي أو ستتعرف كاميرا البوابة على لوحة مركبتك المسجلة.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-[#1677A8] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <p>تفتح البوابة تلقائياً للاستمتاع بخدمة المواقف المجانية لمدة 12 شهراً متواصلة.</p>
                  </div>
                </div>
              </div>

              {/* Status & Validity Widget */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">حالة الصلاحية</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isApproved ? 'text-[#19A974] bg-emerald-50' : 'text-amber-700 bg-amber-50'
                  }`}>
                    {isApproved ? '365 يوماً متبقية' : hasApp ? 'بانتظار قرار الاعتماد' : 'لم يتم التقديم'}
                  </span>
                </div>
                
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isApproved ? 'bg-gradient-to-r from-[#1677A8] to-[#19A974] w-full' : hasApp ? 'bg-amber-400 w-1/2' : 'bg-slate-300 w-0'
                    }`}
                  />
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>تاريخ البدء: {startDate}</span>
                  <span>الانتهاء: {endDate}</span>
                </div>
              </div>

              {/* Digital Wallet Integration */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Smartphone size={22} className="text-slate-200" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">إضافة إلى المحفظة الرقمية</div>
                    <div className="text-[11px] text-slate-400">Apple Wallet & Google Wallet</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!isApproved) {
                      alert('ستتمكن من إضافة البطاقة إلى محفظة Apple و Google Wallet فور اعتماد طلبك رسمياً من فريق الدعم.');
                    } else {
                      alert('تمت إضافة بطاقة مواقف إلى محفظتك بنجاح!');
                    }
                  }}
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
