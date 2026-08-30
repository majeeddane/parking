'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Car, Plus, ShieldCheck, QrCode, CheckCircle2, Clock, PlusCircle } from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';
import { useMawqif } from '@/components/mawqif/MawqifContext';

export default function UserVehiclesPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { userApplication, currentUser } = useMawqif();

  const hasVehicle = !!userApplication?.vehicleMake;

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <MawqifSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base md:text-lg font-bold text-[#123B5D]">
              مركباتي المسجلة
            </h1>
          </div>

          <Link
            href="/mawqif/apply"
            className="mw-btn mw-btn-primary text-xs py-2 px-3.5 font-bold"
          >
            <Plus size={15} />
            إضافة مركبة جديدة
          </Link>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-5xl">
          {hasVehicle ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Active Vehicle Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1677A8] flex items-center justify-center">
                      <Car size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#123B5D]">
                        {userApplication.vehicleMake} {userApplication.vehicleModel}
                      </h3>
                      <span className="text-xs text-slate-400">
                        سنة الصنع: {userApplication.vehicleYear} · اللون: {userApplication.vehicleColor || 'فضي'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    userApplication.status === 'approved'
                      ? 'bg-emerald-50 text-[#19A974] border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {userApplication.status === 'approved' ? 'اشتراك مفعّل' : 'قيد التدقيق'}
                  </span>
                </div>

                {/* Plate & Specs */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">رقم اللوحة</span>
                    <span className="font-bold text-[#123B5D] bg-white px-2.5 py-1 rounded border border-slate-200 inline-block font-mono">
                      {userApplication.plateNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">رقم الاستمارة</span>
                    <span className="font-mono text-slate-700 font-bold" dir="ltr">
                      {userApplication.vehicleLicenseNumber || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">صلاحية الاشتراك</span>
                    <span className="font-bold text-emerald-700">سنة كاملة (مجاني)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">تاريخ الانتهاء</span>
                    <span className="font-semibold text-slate-700">31 أغسطس 2027</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link
                    href="/mawqif/dashboard/subscription"
                    className="text-xs text-[#1677A8] font-bold hover:underline flex items-center gap-1"
                  >
                    <QrCode size={15} />
                    عرض بطاقة الموقف الرقمية
                  </Link>
                  <span className="text-xs text-slate-400">مركبة مقدم الطلب: {currentUser?.firstName}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Car size={28} />
              </div>
              <h3 className="font-bold text-slate-700">لم تقم بتسجيل أي مركبة بعد</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                عند تقديم طلبك للحصول على اشتراك المواقف السنوي، سيتم إدراج مركبتك ورقم اللوحة تلقائيًا هنا.
              </p>
              <Link href="/mawqif/apply" className="mw-btn mw-btn-primary text-xs py-2 px-5 font-bold inline-flex">
                <PlusCircle size={15} />
                تقديم طلب للمركبة
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
