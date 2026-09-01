import Link from 'next/link';
import { Car, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center font-sans px-4 text-center" dir="rtl">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-[#123B5D] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <Car size={36} className="text-[#1677A8]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-[#123B5D]">404</h1>
          <h2 className="text-xl font-bold text-slate-800">الصفحة غير موجودة</h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يمكنك العودة لصفحة مواقف الرئيسية.
          </p>
        </div>

        <Link
          href="/mawqif"
          className="mw-btn mw-btn-primary w-full justify-center py-2.5"
        >
          <Home size={16} />
          العودة لمنصة مواقف
        </Link>
      </div>
    </div>
  );
}
