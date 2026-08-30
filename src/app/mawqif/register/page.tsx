'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Lock, Mail, Phone, User, MapPin, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import { useMawqif } from '@/components/mawqif/MawqifContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useMawqif();

  const [form, setForm] = useState({
    firstName: '',
    fatherName: '',
    familyName: '',
    idNumber: '',
    phone: '',
    email: '',
    city: 'الرياض',
    password: '',
    confirmPassword: '',
    termsAccepted: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'الاسم الأول مطلوب';
    if (!form.fatherName.trim()) errs.fatherName = 'اسم الأب مطلوب';
    if (!form.familyName.trim()) errs.familyName = 'اسم العائلة مطلوب';

    if (!form.idNumber.trim()) {
      errs.idNumber = 'رقم الهوية الوطنية أو الإقامة مطلوب';
    } else if (!/^[12]\d{9}$/.test(form.idNumber.trim())) {
      errs.idNumber = 'رقم الهوية يجب أن يتكون من 10 أرقام ويبدأ بـ 1 أو 2';
    }

    if (!form.phone.trim()) {
      errs.phone = 'رقم الجوال مطلوب';
    } else if (!/^(05\d{8}|5\d{8})$/.test(form.phone.trim().replace(/\s+/g, ''))) {
      errs.phone = 'يرجى إدخال رقم جوال سعودي صحيح (مثال: 0501234567)';
    }

    if (!form.email.trim()) {
      errs.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }

    if (!form.password || form.password.length < 6) {
      errs.password = 'كلمة المرور يجب أن لا تقل عن 6 خانات';
    }

    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (!form.termsAccepted) {
      errs.terms = 'يجب الموافقة على الشروط والأحكام للمتابعة';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      register({
        firstName: form.firstName,
        fatherName: form.fatherName,
        familyName: form.familyName,
        idNumber: form.idNumber,
        phone: form.phone,
        email: form.email,
        city: form.city,
      });
      setIsLoading(false);
      // Redirect to apply directly
      router.push('/mawqif/apply');
    }, 600);
  };

  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[85vh] py-10 md:py-14 bg-[#F7F9FC] flex items-center justify-center">
        <div className="mw-container w-full max-w-xl">
          
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#123B5D] to-[#19A974] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <User size={28} />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#123B5D]">
                إنشاء حساب مستفيد جديد
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                سجّل حسابك للتقديم على برنامج الاشتراك المجاني في مواقف السيارات وإدارة تصاريحك
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Trio */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">الاسم الأول</label>
                  <input
                    type="text"
                    className={`mw-input text-xs md:text-sm ${errors.firstName ? 'mw-input-error' : ''}`}
                    placeholder="مثال: خالد"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  {errors.firstName && <span className="mw-error-msg">{errors.firstName}</span>}
                </div>

                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">اسم الأب</label>
                  <input
                    type="text"
                    className={`mw-input text-xs md:text-sm ${errors.fatherName ? 'mw-input-error' : ''}`}
                    placeholder="مثال: سالم"
                    value={form.fatherName}
                    onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                  />
                  {errors.fatherName && <span className="mw-error-msg">{errors.fatherName}</span>}
                </div>

                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">اسم العائلة</label>
                  <input
                    type="text"
                    className={`mw-input text-xs md:text-sm ${errors.familyName ? 'mw-input-error' : ''}`}
                    placeholder="مثال: الشمري"
                    value={form.familyName}
                    onChange={(e) => setForm({ ...form, familyName: e.target.value })}
                  />
                  {errors.familyName && <span className="mw-error-msg">{errors.familyName}</span>}
                </div>
              </div>

              {/* ID & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">رقم الهوية الوطنية / الإقامة</label>
                  <input
                    type="text"
                    maxLength={10}
                    className={`mw-input text-xs md:text-sm ${errors.idNumber ? 'mw-input-error' : ''}`}
                    placeholder="10 أرقام (10xxxxxxxx)"
                    value={form.idNumber}
                    onChange={(e) => setForm({ ...form, idNumber: e.target.value.replace(/\D/g, '') })}
                  />
                  {errors.idNumber && <span className="mw-error-msg">{errors.idNumber}</span>}
                </div>

                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">المدينة</label>
                  <select
                    className="mw-select text-xs md:text-sm"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="الخبر">الخبر</option>
                    <option value="أخرى">مدينة أخرى</option>
                  </select>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">رقم الجوال</label>
                  <input
                    type="tel"
                    dir="ltr"
                    className={`mw-input text-right text-xs md:text-sm ${errors.phone ? 'mw-input-error' : ''}`}
                    placeholder="05XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  {errors.phone && <span className="mw-error-msg">{errors.phone}</span>}
                </div>

                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">البريد الإلكتروني</label>
                  <input
                    type="email"
                    dir="ltr"
                    className={`mw-input text-right text-xs md:text-sm ${errors.email ? 'mw-input-error' : ''}`}
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <span className="mw-error-msg">{errors.email}</span>}
                </div>
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      dir="ltr"
                      className={`mw-input text-right pr-4 pl-10 text-xs md:text-sm ${errors.password ? 'mw-input-error' : ''}`}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && <span className="mw-error-msg">{errors.password}</span>}
                </div>

                <div className="mw-form-group">
                  <label className="mw-label mw-label-required text-xs">تأكيد كلمة المرور</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    dir="ltr"
                    className={`mw-input text-right text-xs md:text-sm ${errors.confirmPassword ? 'mw-input-error' : ''}`}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <span className="mw-error-msg">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#1677A8] accent-[#1677A8]"
                />
                <span className="text-xs text-slate-600">
                  أوافق على <Link href="/mawqif/terms" className="text-[#1677A8] underline font-bold">الشروط والأحكام</Link> و <Link href="/mawqif/privacy" className="text-[#1677A8] underline font-bold">سياسة الخصوصية</Link> لبرنامج مواقف.
                </span>
              </label>
              {errors.terms && <span className="mw-error-msg block">{errors.terms}</span>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mw-btn mw-btn-primary w-full py-3 font-bold text-sm shadow-md mt-2"
              >
                {isLoading ? (
                  <span className="mw-spinner" />
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    إنشاء الحساب والمتابعة لطلب الاشتراك
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              لديك حساب بالفعل؟{' '}
              <Link href="/mawqif/login" className="text-[#1677A8] font-bold hover:underline">
                تسجيل الدخول
              </Link>
            </div>

          </div>
        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
