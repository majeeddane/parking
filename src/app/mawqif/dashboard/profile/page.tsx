'use client';
import { useState } from 'react';
import { Menu, User, Phone, Mail, MapPin, Shield, Check, Save } from 'lucide-react';
import MawqifSidebar from '@/components/mawqif/layout/MawqifSidebar';

export default function UserProfilePage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    fullName: 'محمد أحمد العتيبي',
    idNumber: '1082345678',
    phone: '0501234567',
    email: 'm.otaibi@example.com',
    city: 'الرياض',
    address: 'حي النرجس، شارع أنس بن مالك',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
              بياناتي الشخصية
            </h1>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-6 max-w-3xl">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Top avatar info */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#123B5D] text-white text-xl font-bold flex items-center justify-center shadow-md">
                م.ع
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#123B5D]">{form.fullName}</h2>
                <span className="text-xs text-slate-400">مستفيد معتمد في برنامج مواقف</span>
              </div>
            </div>

            {saved && (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2 mw-animate-fadeIn">
                <Check size={16} />
                تم حفظ وتحديث بياناتك بنجاح!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mw-form-group">
                  <label className="mw-label">الاسم بالكامل</label>
                  <input
                    type="text"
                    disabled
                    className="mw-input bg-slate-50 text-slate-500 cursor-not-allowed"
                    value={form.fullName}
                  />
                  <span className="text-[11px] text-slate-400">الاسم موثق بالهوية الوطنية</span>
                </div>

                <div className="mw-form-group">
                  <label className="mw-label">رقم الهوية الوطنية</label>
                  <input
                    type="text"
                    disabled
                    dir="ltr"
                    className="mw-input bg-slate-50 text-slate-500 cursor-not-allowed text-right"
                    value="******5678"
                  />
                  <span className="text-[11px] text-slate-400">محمي بنظام التشفير</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mw-form-group">
                  <label className="mw-label">رقم الجوال</label>
                  <input
                    type="tel"
                    dir="ltr"
                    className="mw-input text-right"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="mw-form-group">
                  <label className="mw-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    dir="ltr"
                    className="mw-input text-right"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mw-form-group">
                  <label className="mw-label">المدينة</label>
                  <input
                    type="text"
                    className="mw-input"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>

                <div className="mw-form-group">
                  <label className="mw-label">العنوان الوطني</label>
                  <input
                    type="text"
                    className="mw-input"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="mw-btn mw-btn-primary px-6 font-bold text-xs md:text-sm">
                  <Save size={16} />
                  حفظ التعديلات
                </button>
              </div>
            </form>

          </div>
        </main>
      </div>
    </div>
  );
}
