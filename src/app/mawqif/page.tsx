'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle, Car, FileText, Clock, Award, Shield, Smartphone,
  Users, MapPin, TrendingUp, ChevronLeft, Star, BadgeCheck,
  Zap, CreditCard, Sparkles, ShieldCheck, Lock
} from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import FAQSection from '@/components/mawqif/sections/FAQSection';

export default function MawqifHomePage() {
  return (
    <>
      <MawqifNavbar />

      {/* ======================== HERO SECTION ======================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-[#EFF6FF]/60 to-[#F0FDF4]/50 py-10 sm:py-16 lg:py-20">
        {/* Background Radial Glow */}
        <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="mw-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            
            {/* Right: Text Content */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-right mw-animate-fadeIn">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-white/95 border border-slate-200/90 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
                <Image
                  src="/mawqif/logo-icon.png"
                  alt="شعار مواقف"
                  width={22}
                  height={22}
                  className="object-contain shrink-0"
                />
                <span className="text-[#123B5D]">المنصة الرسمية</span>
                <span className="text-slate-300">·</span>
                <span className="text-[#19A974] flex items-center gap-1">
                  <Sparkles size={14} className="shrink-0" />
                  برنامج الاشتراك السنوي المجاني 100%
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#123B5D] leading-tight tracking-tight">
                احصل على اشتراك <br className="hidden sm:inline" />
                <span className="text-[#1677A8]">مواقف مجاني</span> <br />
                لمدة سنة كاملة
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                برنامج اشتراك سنوي تجريبي مجاني 100% لسنتك الأولى بدون أي التزام مالي أو متطلبات دفع. احصل على تصريح رسمي لشبكة المواقف لمدة 12 شهرًا، مع حرية التجديد الرمزي بـ 49 ر.س فقط بعد عام إن رغبت.
              </p>

              {/* Reassurance Trust Box */}
              <div className="p-3.5 rounded-2xl bg-white/95 border border-emerald-200/90 shadow-xs flex items-center gap-3 text-right max-w-lg mx-auto lg:mx-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#19A974] flex items-center justify-center shrink-0 border border-emerald-100">
                  <ShieldCheck size={22} />
                </div>
                <div className="text-xs text-slate-600 leading-snug">
                  <div className="font-bold text-[#123B5D] flex items-center gap-1.5">
                    <span>اطمئنان وشفافية كاملة:</span>
                    <span className="text-[#19A974] font-black">لا نطلب أي بطاقة بنكية</span>
                  </div>
                  <span>التقديم مجاني بالكامل، وبدون أي تجديد تلقائي أو خصومات مالية مفاجئة.</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1 justify-center lg:justify-start">
                <Link
                  href="/mawqif/apply"
                  className="mw-btn mw-btn-primary py-3.5 px-7 font-bold text-sm sm:text-base shadow-md shadow-slate-900/10"
                >
                  قدّم طلبك المجاني الآن
                  <ChevronLeft size={18} />
                </Link>
                <Link
                  href="#trust-transparency"
                  className="mw-btn mw-btn-outline py-3.5 px-6 font-bold text-sm sm:text-base bg-white/80"
                >
                  لماذا هو مجاني؟
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <BadgeCheck size={16} className="text-[#19A974]" />
                  <span>اعتماد فوري</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield size={16} className="text-[#19A974]" />
                  <span>بيانات آمنة ومحمية</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={16} className="text-[#19A974]" />
                  <span>إجراءات إلكترونية 100%</span>
                </div>
              </div>
            </div>

            {/* Left: Image & Responsive Floating Badges */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border-4 border-white aspect-4/3 relative">
                <Image
                  src="/mawqif/hero-parking.jpg"
                  alt="موقف سيارات حديث"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1 - Top Right (Visible on all screens) */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-emerald-100 flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#19A974] animate-pulse" />
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#123B5D]">التقديم متاح الآن</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400">سنة كاملة مجانًا</div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-cyan-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1677A8] flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#123B5D]">+25,000</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400">مستفيد مسجل</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================== STATS STRIP ======================== */}
      <section className="bg-white border-y border-slate-200 py-6 sm:py-8">
        <div className="mw-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: '+25,000', label: 'مستفيد مسجل', icon: <Users size={20} />, color: 'text-[#1677A8]' },
              { value: '+40', label: 'موقفًا مشاركًا', icon: <MapPin size={20} />, color: 'text-[#19A974]' },
              { value: '98%', label: 'نسبة الرضا والقبول', icon: <TrendingUp size={20} />, color: 'text-emerald-600' },
              { value: '12', label: 'شهرًا اشتراك مجاني', icon: <Award size={20} />, color: 'text-amber-500' },
            ].map((stat, i) => (
              <div key={i} className="p-3 sm:p-4 flex flex-col items-center gap-1 sm:gap-2">
                <div className={`${stat.color} p-2 rounded-xl bg-slate-50`}>{stat.icon}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#123B5D]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      <section className="py-12 sm:py-20 bg-[#F7F9FC]" id="how-it-works">
        <div className="mw-container">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold">
              <Zap size={14} />
              خطوات سهلة وبسيطة
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123B5D]">
              التقديم أسهل مما تتوقع
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              أربع خطوات بسيطة تفصلك عن الحصول على بطاقة اشتراك رقمية في المواقف لمدة عام كامل.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: '01',
                title: 'عبّئ بياناتك',
                desc: 'أدخل معلوماتك الشخصية وبيانات سيارتك بدقة وإتقان.',
                icon: <FileText size={22} />,
                color: 'text-[#1677A8]',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
              },
              {
                step: '02',
                title: 'أرفق المستندات',
                desc: 'ارفع الهوية ورخصة القيادة ورخصة السير بصيغ واضحة.',
                icon: <Shield size={22} />,
                color: 'text-[#19A974]',
                bg: 'bg-emerald-50',
                border: 'border-emerald-100',
              },
              {
                step: '03',
                title: 'نراجع طلبك',
                desc: 'يقوم فريق مختص بمراجعة البيانات والمستندات بعناية.',
                icon: <Clock size={22} />,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
                border: 'border-amber-100',
              },
              {
                step: '04',
                title: 'احصل على اشتراكك',
                desc: 'عند الموافقة تحصل على بطاقة اشتراك رقمية بـ QR Code فورًا.',
                icon: <Award size={22} />,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                border: 'border-emerald-100',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-6 sm:p-7 border ${item.border} shadow-sm relative overflow-hidden space-y-3 transition-transform hover:-translate-y-1`}
              >
                <div className="absolute top-3 left-4 text-3xl sm:text-4xl font-black text-slate-100 select-none">
                  {item.step}
                </div>

                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#123B5D]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/mawqif/apply" className="mw-btn mw-btn-primary py-3.5 px-8 font-bold text-sm sm:text-base inline-flex">
              ابدأ التقديم الآن
              <ChevronLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== ELIGIBILITY ======================== */}
      <section className="py-12 sm:py-20 bg-white" id="eligibility">
        <div className="mw-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            
            {/* Left: Image with Safe Badge */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 aspect-4/3 relative">
                <Image
                  src="/mawqif/parking-gate.jpg"
                  alt="بوابة موقف مواقف"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-3 right-3 sm:-bottom-4 sm:-right-4 bg-[#123B5D] text-white rounded-2xl p-3 sm:p-4 shadow-xl border border-white/20">
                <div className="text-xl sm:text-2xl font-black">+25K</div>
                <div className="text-[10px] sm:text-xs text-white/80">مستفيد حتى الآن</div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold">
                <Shield size={14} />
                شروط الاستحقاق
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">
                هل أنت مؤهل للحصول على الاشتراك؟
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                تحقق من استيفائك لشروط البرنامج الأساسية قبل تقديم الطلب لضمان الاعتماد السريع:
              </p>

              <div className="space-y-2.5 pt-1">
                {[
                  'أن تكون البيانات الشخصية صحيحة ومطابقة للوثائق الرسمية',
                  'أن تكون المركبة مسجلة باسم مقدم الطلب أو لديه إثبات استخدام نظامي',
                  'أن تكون رخصة القيادة سارية المفعول',
                  'أن تكون رخصة سير المركبة (الاستمارة) سارية المفعول',
                  'استيفاء شروط وضوابط برنامج المواقف المجاني',
                  'عدم وجود اشتراك سنوي مجاني آخر مفعّل لنفس المركبة',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-[#F7F9FC] border border-slate-200/80 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle size={18} className="text-[#19A974] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link href="/mawqif/apply" className="mw-btn mw-btn-primary py-3.5 px-6 font-bold text-xs sm:text-sm">
                  تحقق من أهليتك وقدّم الآن
                  <ChevronLeft size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================== WHY MAWQIF ======================== */}
      <section className="py-12 sm:py-20 bg-[#F7F9FC]" id="about">
        <div className="mw-container">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold">
              <Star size={14} />
              مزايا البرنامج
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123B5D]">
              لماذا برنامج مواقف؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              خدمة رقمية متكاملة تضمن لك سهولة ركن سيارتك دون عناء في أبرز المواقف المعتمدة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <CreditCard size={24} />,
                title: 'مجاني لمدة 12 شهرًا',
                desc: 'استفد من مواقف مجانية بالكامل دون دفع أي رسوم اشتراك.',
                color: 'text-[#1677A8]',
                bg: 'bg-blue-50',
              },
              {
                icon: <Smartphone size={24} />,
                title: 'تقديم إلكتروني سلس',
                desc: 'لا حاجة لزيارة المكاتب؛ التقديم والتدقيق بالكامل عبر الإنترنت.',
                color: 'text-[#19A974]',
                bg: 'bg-emerald-50',
              },
              {
                icon: <Clock size={24} />,
                title: 'متابعة لحظية وتنبيهات',
                desc: 'تتبع حالة طلبك وإشعارات التحديثات لحظة بلحظة.',
                color: 'text-amber-600',
                bg: 'bg-amber-50',
              },
              {
                icon: <BadgeCheck size={24} />,
                title: 'بطاقة رقمية مشفرة',
                desc: 'بطاقة اشتراك ذكية برمز QR تتيح لك الدخول المباشر عند البوابات.',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-3 transition-transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#123B5D]">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TRANSPARENCY & TRUST GUARANTEE ======================== */}
      <section className="py-14 sm:py-24 bg-white border-t border-slate-200/80 relative overflow-hidden" id="trust-transparency">
        {/* Background Subtle Highlights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="mw-container relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#19A974] border border-emerald-200/70 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
              <ShieldCheck size={16} />
              الشفافية المطلقة وضمان راحة البال
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#123B5D] tracking-tight">
              لماذا الاشتراك مجاني في سنته الأولى؟ <br className="hidden sm:inline" />
              <span className="text-[#1677A8]">وماذا يحدث بعد انتهاء السنة؟</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              نؤمن بالوضوح التام والمصداقية مع جميع المستفيدين. إليك كل ما تحتاج معرفته حول نموذج البرنامج دون أي رسوم خفية أو شروط غامضة.
            </p>
          </div>

          {/* 3 Core Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-[#1677A8] flex items-center justify-center font-black text-xl">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#123B5D]">
                  سنة أولى مجانية 100% (لماذا؟)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  يُقدّم البرنامج هذه السنة الأولى مجاناً بالكامل كمبادرة رقمية لتشجيع قائدي المركبات على تجربة المواقف الذكية، والمساهمة في خفض التكدس المروري والتسهيل على المواطنين والمقيمين.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 text-[11px] font-bold text-[#1677A8] flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#19A974]" />
                <span>اشتراك فعّال لمدة 12 شهرًا بقيمة 0 ريال</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-7 border border-emerald-200 bg-gradient-to-b from-emerald-50/30 to-white hover:border-emerald-300 transition-all duration-300 hover:shadow-lg space-y-4 relative">
              <div className="absolute top-4 left-4 bg-[#19A974] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                ضمان الأمان
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#19A974] flex items-center justify-center font-black text-xl">
                <Lock size={22} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#123B5D]">
                  صفر بيانات بنكية (لا بطاقة ائتمان)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  لا نطلب إطلاقاً إدخال أي رقم بطاقة ائتمانية أو مدى أو حساب بنكي. التقديم يتم فقط بالهوية ورخصة سير المركبة للتأكد من الملكية، وبالتالي لا يمكن لأي جهة خصم أي مبالغ منك.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#19A974]" />
                <span>أمان رقمي كامل بدون أي مخاطرة مالية</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center font-black text-xl">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#123B5D]">
                  بعد انتهاء السنة: الخيار لك بـ 49 ر.س
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  بعد إتمام الـ 12 شهراً المجانية، إذا أعجبتك الخدمة ورغبت في الاستمرار، يمكنك التجديد السنوي بمبلغ رمزي 49 ريال فقط للسنة كاملة (أقل من 4.1 ر.س شهرياً). وإذا لم ترغب، يتوقف الاشتراك تلقائياً.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 text-[11px] font-bold text-amber-700 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#19A974]" />
                <span>بدون تجديد تلقائي وبدون أي التزام إجباري</span>
              </div>
            </div>
          </div>

          {/* Pricing & Comparison Card */}
          <div className="bg-gradient-to-br from-[#123B5D] to-[#0d2a42] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column (Details) */}
              <div className="lg:col-span-7 space-y-4 text-right">
                <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider block">
                  وضوح كامل من اليوم الأول
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                  استفد من سنتك المجانية الآن، <br />
                  وقرّر لاحقاً إذا كنت ترغب بالتجديد الرمزي
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                  لا توجد أي اشتراطات مخفية أو تجديد تلقائي يسحب من رصيدك. نحن نمنحك تجربة حقيقية متكاملة لمدة 365 يوماً دون أن تدفع هللة واحدة.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#19A974] flex items-center justify-center shrink-0 font-bold">
                      ✓
                    </div>
                    <span>تصريح دخول إلكتروني فوري (QR)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#19A974] flex items-center justify-center shrink-0 font-bold">
                      ✓
                    </div>
                    <span>لا يتطلب رقم حساب أو بطاقة مدى</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#19A974] flex items-center justify-center shrink-0 font-bold">
                      ✓
                    </div>
                    <span>إلغاء فوري بدون أي مطالبات مالية</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#19A974] flex items-center justify-center shrink-0 font-bold">
                      ✓
                    </div>
                    <span>تجديد مستقبلي اختياري بـ 49 ر.س فقط</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Price Boxes */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Year 1 Box */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center space-y-2 relative overflow-hidden">
                  <div className="inline-block bg-[#19A974] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    السنة الحالية (الأولى)
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    0 <span className="text-base font-bold text-emerald-300">ريال</span>
                  </div>
                  <span className="text-[11px] text-white/70 block">مجاني بالكامل 100%</span>
                  <div className="pt-2 border-t border-white/10 text-[10px] text-white/80">
                    لمدة 12 شهرًا بدون دفع
                  </div>
                </div>

                {/* Year 2+ Box */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center space-y-2">
                  <div className="inline-block bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    بعد انتهاء السنة (اختياري)
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    49 <span className="text-base font-bold text-cyan-200">ريال</span>
                  </div>
                  <span className="text-[11px] text-white/70 block">لكامل السنة (رمزي جداً)</span>
                  <div className="pt-2 border-t border-white/10 text-[10px] text-white/80">
                    فقط إن رغبت بالاستمرار
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Guarantee Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right text-xs text-white/75">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#19A974] shrink-0" />
                <span>ضمان المصداقية: لا توجد أي التزامات مالية ولا يتم سحب أي مبالغ بدون موافقتك الصريحة.</span>
              </div>
              <Link
                href="/mawqif/apply"
                className="mw-btn bg-[#19A974] hover:bg-[#158f62] text-white font-bold px-6 py-2.5 rounded-xl shadow-md text-xs shrink-0"
              >
                ابدأ سنتك المجانية الآن
                <ChevronLeft size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ======================== FAQ ======================== */}
      <section className="py-12 sm:py-20 bg-white" id="faq">
        <div className="mw-container max-w-3xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold">
              الأسئلة الشائعة
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">
              أجوبة على أكثر الأسئلة شيوعًا
            </h2>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* ======================== CTA BANNER ======================== */}
      <section className="bg-gradient-to-r from-[#123B5D] via-[#165a88] to-[#1677A8] py-12 sm:py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mw-container text-center space-y-4 max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white">
            <Car size={14} />
            ابدأ رحلتك واستفد من الخدمة
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
            قدّم طلبك الآن <br />
            واحصل على اشتراك مجاني لسنة كاملة
          </h2>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg mx-auto pb-2">
            انضم إلى أكثر من 25,000 مستفيد يستمتعون بخدمة مواقف السيارات الرقمية الميسرة.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link
              href="/mawqif/apply"
              className="inline-flex items-center justify-center gap-2 bg-[#19A974] hover:bg-[#14896a] text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-950/20 transition-all"
            >
              قدّم طلبك الآن
              <ChevronLeft size={18} />
            </Link>
            <Link
              href="/mawqif/track"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md px-6 py-3.5 rounded-2xl text-sm font-bold transition-all border border-white/20"
            >
              متابعة طلب سابق
            </Link>
          </div>
        </div>
      </section>

      <MawqifFooter />
    </>
  );
}
