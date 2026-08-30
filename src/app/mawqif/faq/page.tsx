'use client';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import FAQSection from '@/components/mawqif/sections/FAQSection';
import Link from 'next/link';
import { HelpCircle, ChevronLeft } from 'lucide-react';

export default function FAQPage() {
  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[75vh] py-12 md:py-16 bg-[#F7F9FC]">
        <div className="mw-container max-w-4xl">
          
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold">
              <HelpCircle size={15} />
              مركز المساعدة والمعلومات
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#123B5D]">
              الأسئلة الشائعة حول برنامج مواقف
            </h1>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              إليك إجابات شاملة وتفصيلية حول آلية التقديم، شروط الاستحقاق، الوثائق المطلوبة، واستخدام بطاقة الاشتراك الرقمية.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <FAQSection />
          </div>

          <div className="text-center pt-8">
            <p className="text-xs text-slate-500 mb-3">لم تجد إجابة لاستفسارك؟ نحن هنا لمساعدتك.</p>
            <Link href="/mawqif/contact" className="mw-btn mw-btn-outline font-bold text-xs py-2 px-5 bg-white">
              تواصل مع فريق الدعم
              <ChevronLeft size={16} />
            </Link>
          </div>

        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
