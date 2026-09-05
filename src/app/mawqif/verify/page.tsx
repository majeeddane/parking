'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ShieldCheck, CheckCircle2, XCircle, Car, Calendar, User, Info } from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import MawqifLogo from '@/components/mawqif/ui/MawqifLogo';

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

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [query, setQuery] = useState(initialId);
  const [result, setResult] = useState<VerifiedRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setQuery(id);
      performVerify(id);
    }
  }, [searchParams]);

  const performVerify = (searchKey: string) => {
    if (!searchKey.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      const clean = searchKey.trim().toUpperCase();
      let match: VerifiedRecord | null = null;

      // 1. Search in local and synced DB
      try {
        const localStr = typeof window !== 'undefined' ? localStorage.getItem('mawqif_accounts_db') : null;
        if (localStr) {
          const db = JSON.parse(localStr);
          for (const key of Object.keys(db)) {
            const acc = db[key];
            const app = acc.application;
            const user = acc.user;
            if (app) {
              const subNum = (app.subscriptionNumber || app.id || '').toUpperCase();
              const plateClean = (app.plateNumber || '').replace(/\s+/g, '').toUpperCase();
              const searchPlateClean = clean.replace(/\s+/g, '');

              if (subNum === clean || plateClean === searchPlateClean) {
                const isApproved = app.status === 'approved';
                match = {
                  subscriptionNumber: app.subscriptionNumber || app.id,
                  plateNumber: app.plateNumber || '—',
                  subscriberName: user?.fullName ? `${user.fullName.split(' ')[0]} ***` : 'مستفيد معتمد',
                  vehicle: `${app.vehicleMake || ''} ${app.vehicleModel || ''}`.trim() || 'مركبة مسجلة',
                  startDate: app.subscriptionStartDate || app.submissionDate || '01 سبتمبر 2026',
                  expiryDate: app.subscriptionEndDate || '31 أغسطس 2027',
                  isValid: isApproved,
                  statusText: isApproved
                    ? 'اشتراك سنوي مجاني سارٍ وموثق رسميًا'
                    : 'الطلب قيد التدقيق والمراجعة (غير مفعل بعد)',
                };
                break;
              }
            }
          }
        }
      } catch (e) {
        console.error('Error verifying against DB:', e);
      }

      // 2. If not found locally, fetch live from Supabase cloud
      if (!match) {
        try {
          fetch('/api/mawqif/db', { cache: 'no-store' })
            .then(r => r.json())
            .then(json => {
              if (json.success && json.data) {
                const db = json.data;
                for (const key of Object.keys(db)) {
                  const acc = db[key];
                  const app = acc.application;
                  const user = acc.user;
                  if (app) {
                    const subNum = (app.subscriptionNumber || app.id || '').toUpperCase();
                    const plateClean = (app.plateNumber || '').replace(/\s+/g, '').toUpperCase();
                    const searchPlateClean = clean.replace(/\s+/g, '');

                    if (subNum === clean || plateClean === searchPlateClean) {
                      const isApproved = app.status === 'approved';
                      setResult({
                        subscriptionNumber: app.subscriptionNumber || app.id,
                        plateNumber: app.plateNumber || '—',
                        subscriberName: user?.fullName ? `${user.fullName.split(' ')[0]} ***` : 'مستفيد معتمد',
                        vehicle: `${app.vehicleMake || ''} ${app.vehicleModel || ''}`.trim() || 'مركبة مسجلة',
                        startDate: app.subscriptionStartDate || app.submissionDate || '01 سبتمبر 2026',
                        expiryDate: app.subscriptionEndDate || '31 أغسطس 2027',
                        isValid: isApproved,
                        statusText: isApproved
                          ? 'اشتراك سنوي مجاني سارٍ وموثق رسميًا'
                          : 'الطلب قيد التدقيق والمراجعة (غير مفعل بعد)',
                      });
                      return;
                    }
                  }
                }
              }
            }).catch(() => {});
        } catch {}
      }

      setResult(match);
      setHasSearched(true);
      setIsLoading(false);
    }, 350);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    performVerify(query);
  };

  return (
    <div className="min-h-[75vh] py-8 sm:py-14 bg-[#F7F9FC] font-sans">
      <div className="mw-container">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-3">
          <div className="flex justify-center mb-1">
            <MawqifLogo variant="icon" size="lg" href="/mawqif" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold">
            <ShieldCheck size={14} />
            خدمة التحقق الرسمية
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#123B5D]">
            التحقق من صلاحية الاشتراك
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
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
                placeholder="أدخل رقم الاشتراك أو رقم اللوحة للتحقق..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-transparent text-xs sm:text-sm md:text-base outline-none text-[#172B3A] placeholder:text-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mw-btn mw-btn-primary px-6 py-3 font-bold rounded-xl text-xs sm:text-sm"
            >
              {isLoading ? <span className="mw-spinner" /> : 'تحقق الآن'}
            </button>
          </form>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-sm">
            <span className="mw-spinner inline-block text-[#1677A8] w-8 h-8" />
            <div className="text-slate-500 text-xs sm:text-sm">جارٍ فحص قاعدة البيانات...</div>
          </div>
        ) : hasSearched && result ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5 mw-animate-scaleIn">
            
            {/* Status Icon & Title */}
            <div className="text-center space-y-2">
              <div className={`w-14 h-14 rounded-3xl mx-auto flex items-center justify-center ${
                result.isValid ? 'bg-emerald-50 text-[#19A974] border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}>
                {result.isValid ? <CheckCircle2 size={32} /> : <Info size={32} />}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#123B5D]">
                {result.isValid ? 'اشتراك موثق ومعتمد' : 'حالة الاشتراك'}
              </h2>
              <p className={`text-xs font-semibold ${result.isValid ? 'text-[#19A974]' : 'text-amber-700'}`}>
                {result.statusText}
              </p>
            </div>

            {/* Verified Details Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-slate-400">رقم الاشتراك</span>
                <span className="font-mono font-bold text-[#123B5D]" dir="ltr">{result.subscriptionNumber}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-slate-400">اسم المشترك</span>
                <span className="font-bold text-slate-800">{result.subscriberName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-slate-400">المركبة</span>
                <span className="font-bold text-slate-800">{result.vehicle}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-slate-400">رقم اللوحة</span>
                <span className="font-bold text-[#123B5D] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                  {result.plateNumber}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">تاريخ الانتهاء</span>
                <span className={`font-bold ${result.isValid ? 'text-[#19A974]' : 'text-slate-700'}`}>{result.expiryDate}</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400">
                تم التحقق في {new Date().toLocaleTimeString('ar-SA')} عبر منصة مواقف
              </span>
            </div>

          </div>
        ) : hasSearched && !result ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-4 mw-animate-scaleIn">
            <div className="w-14 h-14 rounded-3xl mx-auto flex items-center justify-center bg-red-50 text-red-500 border border-red-200">
              <XCircle size={32} />
            </div>
            <h2 className="text-lg font-bold text-red-800">
              لم يتم العثور على اشتراك معتمد
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              لم نتمكن من العثور على اشتراك مسجل برقم «{query}». يرجى التأكد من صحة رقم الاشتراك أو رقم اللوحة المدخل.
            </p>
          </div>
        ) : null}

      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <>
      <MawqifNavbar />
      <Suspense fallback={<div className="p-12 text-center text-slate-400">جارٍ التحميل...</div>}>
        <VerifyContent />
      </Suspense>
      <MawqifFooter />
    </>
  );
}
