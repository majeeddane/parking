'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ShieldCheck, CheckCircle2, XCircle, Car, Calendar, User, Info } from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';

interface VerifiedRecord {
  subscriptionNumber: string;
  plateNumber: string;
  subscriberName: string;
  vehicle: string;
  startDate: string;
  expiryDate: string;
  isValid: boolean;
  statusText: string;
}

const MOCK_VALID_RECORDS: VerifiedRecord[] = [
  {
    subscriptionNumber: 'PARK-2026-10482',
    plateNumber: 'أ ب ج 1234',
    subscriberName: 'محمد أ. العتيبي',
    vehicle: 'Toyota Camry 2024',
    startDate: '01 سبتمبر 2026',
    expiryDate: '31 أغسطس 2027',
    isValid: true,
    statusText: 'اشتراك سنوي مجاني سارٍ وفعّال',
  },
  {
    subscriptionNumber: 'PARK-2026-09311',
    plateNumber: 'س ص ع 5678',
    subscriberName: 'خالد س. الشمري',
    vehicle: 'Hyundai Sonata 2023',
    startDate: '18 أغسطس 2026',
    expiryDate: '17 أغسطس 2027',
    isValid: true,
    statusText: 'اشتراك سنوي مجاني سارٍ وفعّال',
  },
];

function VerifyContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('id') || 'PARK-2026-10482');
  const [result, setResult] = useState<VerifiedRecord | null>(MOCK_VALID_RECORDS[0]);
  const [hasSearched, setHasSearched] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setQuery(id);
      performVerify(id);
    }
  }, [searchParams]);

  const performVerify = (searchKey: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const clean = searchKey.trim().toUpperCase();
      const match = MOCK_VALID_RECORDS.find(
        (r) => r.subscriptionNumber.toUpperCase() === clean || r.plateNumber.replace(/\s+/g, '') === clean.replace(/\s+/g, '')
      );
      setResult(match || null);
      setHasSearched(true);
      setIsLoading(false);
    }, 400);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    performVerify(query);
  };

  return (
    <div className="min-h-[75vh] py-10 md:py-16 bg-[#F7F9FC]">
      <div className="mw-container">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck size={14} />
            خدمة التحقق العامة
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#123B5D]">
            تحقق من صلاحية الاشتراك
          </h1>
          <p className="text-sm text-slate-500">
            أدخل رقم الاشتراك الرقمي أو رقم لوحة المركبة للتحقق المباشر من سريان وصحة بطاقة مواقف.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="رقم الاشتراك (PARK-2026-10482) أو رقم اللوحة..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-transparent text-sm md:text-base outline-none text-[#172B3A] placeholder:text-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mw-btn mw-btn-primary px-6 py-3 font-bold rounded-xl"
            >
              {isLoading ? <span className="mw-spinner" /> : 'تحقق الآن'}
            </button>
          </form>

          {/* Demo examples tabs */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-400">أمثلة:</span>
            <button
              onClick={() => { setQuery('PARK-2026-10482'); performVerify('PARK-2026-10482'); }}
              className="text-[#1677A8] hover:underline font-mono bg-blue-50 px-2 py-0.5 rounded"
            >
              PARK-2026-10482
            </button>
            <button
              onClick={() => { setQuery('أ ب ج 1234'); performVerify('أ ب ج 1234'); }}
              className="text-[#1677A8] hover:underline bg-blue-50 px-2 py-0.5 rounded"
            >
              أ ب ج 1234
            </button>
          </div>
        </div>

        {/* Result Card */}
        {isLoading ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <span className="mw-spinner inline-block text-[#1677A8] w-8 h-8" />
            <div className="text-sm text-slate-500">جارٍ مطابقة السجلات الرقمية...</div>
          </div>
        ) : result ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-lg space-y-6 mw-animate-scaleIn">
            
            {/* Status Header */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="w-10 h-10 rounded-xl bg-[#19A974] text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-950">اشتراك سارٍ وموثق</h3>
                <p className="text-xs text-emerald-700">{result.statusText}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm divide-y divide-slate-100">
              <div className="flex justify-between py-2">
                <span className="text-slate-400">اسم المشترك</span>
                <span className="font-bold text-slate-800">{result.subscriberName}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">رقم الاشتراك</span>
                <span className="font-bold font-mono text-[#123B5D]" dir="ltr">{result.subscriptionNumber}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">رقم اللوحة المعتمدة</span>
                <span className="font-bold bg-slate-100 px-2 py-0.5 rounded border text-slate-800">{result.plateNumber}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">المركبة</span>
                <span className="font-bold text-slate-800">{result.vehicle}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">تاريخ الانتهاء</span>
                <span className="font-bold text-emerald-700">{result.expiryDate}</span>
              </div>
            </div>

            {/* Privacy Disclaimer */}
            <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-2 text-xs text-slate-500 border border-slate-100">
              <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>لحماية الخصوصية لا يتم عرض بيانات الهوية الوطنية أو البيانات الشخصية التفصيلية.</span>
            </div>

          </div>
        ) : hasSearched && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <XCircle size={28} />
            </div>
            <h3 className="font-bold text-slate-800">لا يوجد اشتراك فعّال بهذه البيانات</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              لم نتمكن من العثور على اشتراك مطابق لرقم الاستعلام المدخل. يرجى التأكد من الرقم والمحاولة مرة أخرى.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <>
      <MawqifNavbar />
      <Suspense fallback={<div className="p-8 text-center">جارٍ التحميل...</div>}>
        <VerifyContent />
      </Suspense>
      <MawqifFooter />
    </>
  );
}
