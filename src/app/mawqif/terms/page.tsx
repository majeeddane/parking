import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'الشروط والأحكام | مواقف',
  description: 'الشروط والأحكام الخاصة ببرنامج الاشتراك المجاني في مواقف السيارات.',
};

export default function MawqifTermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans">
      <MawqifNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#123B5D] px-4 py-1.5 rounded-full text-xs font-bold border border-blue-100">
            <FileText size={14} className="text-[#1677A8]" />
            وثيقة الشروط والضوابط
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#123B5D]">
            الشروط والأحكام
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            يرجى قراءة الشروط والأحكام الخاصة بالتقديم والاستفادة من برنامج الاشتراك المجاني لمواقف السيارات بعناية.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
          
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              1. مقدمة وتعريف بالبرنامج
            </h2>
            <p>
              يُعد برنامج "مواقف" مبادرة رقمية تهدف إلى تسهيل حصول المستفيدين المؤهلين على تصريح اشتراك مجاني في مواقف السيارات المعتمدة لمدة سنة كاملة وفقاً للضوابط والاشتراطات المحددة.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              2. شروط وضوابط الاستحقاق
            </h2>
            <ul className="list-disc list-inside space-y-2 pr-2">
              <li>أن يكون المتقدم مواطناً أو مقيماً يحمل إقامة نظامية سارية المفعول.</li>
              <li>أن تكون رخصة السير (الاستمارة) ورخصة القيادة ساريتي المفعول.</li>
              <li>أن تكون المركبة مسجلة باسم المتقدم أو يملك تفويضاً رسمياً موثقاً لقيادتها.</li>
              <li>الالتزام بتقديم مستندات صحيحة ومطابقة للبيانات الرسمية.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              3. استخدام تصريح الاشتراك وبطاقة الـ QR
            </h2>
            <p>
              يُمنح تصريح الاشتراك وبطاقة الدخول الرقمية لمركبة محددة وشخص محدد، ولا يجوز نقل التصريح أو مشاركته أو استخدامه لأي مركبة أخرى غير مسجلة بالنظام. يحق لإدارة البرنامج إلغاء الاشتراك في حال مخالفة ذلك.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              4. الالتزام بقواعد المواقف والأنظمة المرورية
            </h2>
            <p>
              يجب على المستفيد الالتزام بكافة التعليمات والإرشادات المعمول بها داخل منشآت ومواقف السيارات، والوقوف في الأماكن المخصصة دون التسبب في عرقلة حركة السير أو التعدي على المواقف المخصصة لذوي الاحتياجات الخاصة إلا بتصريح معتمد.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-[#123B5D] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#19A974]" />
              5. تعديل الشروط والأحكام
            </h2>
            <p>
              تحتفظ إدارة منصة مواقف بالحق في تحديث أو تعديل هذه الشروط والأحكام متى دعت الحاجة إلى ذلك، ويتم إشعار المستفيدين بأي تحديثات جوهرية عبر المنصة أو البريد الإلكتروني.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/mawqif/register"
              className="mw-btn mw-btn-primary text-sm py-2 px-6"
            >
              الموافقة والمتابعة لإنشاء الحساب
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/mawqif/privacy"
              className="text-xs font-bold text-[#1677A8] hover:underline"
            >
              الاطلاع على سياسة الخصوصية
            </Link>
          </div>

        </div>
      </main>

      <MawqifFooter />
    </div>
  );
}
