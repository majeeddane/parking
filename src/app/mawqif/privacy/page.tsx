import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'سياسة الخصوصية | مواقف',
  description: 'سياسة الخصوصية وحماية بيانات المستفيدين في برنامج مواقف.',
};

export default function MawqifPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans">
      <MawqifNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#19A974] px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
            <Lock size={14} />
            حماية البيانات والسرية
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#123B5D]">
            سياسة الخصوصية
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            نحن نلتزم بحماية خصوصية بياناتك الشخصية وبيانات مركبتك وفق أعلى معايير الأمان الرقمي.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
          
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              1. جمع المعلومات
            </h2>
            <p>
              نقوم بجمع البيانات الشخصية الضرورية فقط لمعالجة طلبات الاشتراك والتحقق من الأهلية، وتشمل: الاسم الكامل، رقم الهوية الوطنية/الإقامة، رقم الجوال، عنوان البريد الإلكتروني، وبيانات المركبة (رقم اللوحة، استمارة المركبة).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              2. استخدام المعلومات
            </h2>
            <p>
              تُستخدم المعلومات المجمعة حصرياً للأغراض التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 pr-2">
              <li>التحقق من صحة واستحقاق طلب الاشتراك في مواقف السيارات.</li>
              <li>إصدار بطاقات وتصاريح الدخول الرقمية (QR Code) للمواقف المعتمدة.</li>
              <li>إرسال التنبيهات والإشعارات الخاصة بحالة الطلب وصلاحية الاشتراك.</li>
              <li>تطوير وتحسين جودة خدمات المواقف وسرعة الاستجابة.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              3. أمان وحماية البيانات
            </h2>
            <p>
              نطبق إجراءات أمنية وتشفيرية متقدمة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفصاح. لا نقوم ببيع أو تأجير أو مشاركة أي بيانات شخصية مع أي جهة خارجية لأغراض تجارية إطلاقاً.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              4. حقوق المستفيد
            </h2>
            <p>
              يحق لكل مستفيد مراجعة وتحديث بياناته الشخصية من خلال لوحة التحكم الخاصة به في أي وقت، أو التواصل مع فريق الدعم الفني للاستفسار عن أي إجراء يتعلق ببياناته.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/mawqif"
              className="mw-btn mw-btn-outline text-sm py-2 px-6"
            >
              العودة للرئيسية
            </Link>

            <Link
              href="/mawqif/terms"
              className="text-xs font-bold text-[#1677A8] hover:underline"
            >
              الاطلاع على الشروط والأحكام
            </Link>
          </div>

        </div>
      </main>

      <MawqifFooter />
    </div>
  );
}
