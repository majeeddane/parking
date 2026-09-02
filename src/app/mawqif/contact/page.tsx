'use client';
import { useState } from 'react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'استفسار عام عن البرنامج',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <>
      <MawqifNavbar />

      <div className="min-h-[80vh] py-12 md:py-16 bg-[#F7F9FC]">
        <div className="mw-container">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1677A8] px-3.5 py-1 rounded-full text-xs font-bold mb-1">
              <MessageSquare size={14} />
              فريق الدعم وخدمة المستفيدين
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#123B5D]">
              تواصل معنا
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              يسعدنا استقبال استفساراتكم وملاحظاتكم حول برنامج الاشتراك المجاني لمواقف السيارات.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
            
            {/* Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-[#123B5D] text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />
                
                <h3 className="text-lg font-bold text-white">معلومات الاتصال المباشر</h3>
                
                <div className="space-y-4 text-xs md:text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <MessageSquare size={17} className="text-cyan-300" />
                    </div>
                    <div>
                      <span className="text-white/60 block text-[11px]">الدعم والمساعدة الرقمية</span>
                      <span className="font-bold text-white">الرد المباشر خلال 24 ساعة عمل</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Mail size={17} className="text-cyan-300" />
                    </div>
                    <div>
                      <span className="text-white/60 block text-[11px]">البريد الإلكتروني</span>
                      <span className="font-semibold text-white">info@mawqif.sa</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Clock size={17} className="text-cyan-300" />
                    </div>
                    <div>
                      <span className="text-white/60 block text-[11px]">ساعات العمل الرسمية</span>
                      <span className="font-semibold text-white">الأحد – الخميس | 8:00 ص – 5:00 م</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <MapPin size={17} className="text-cyan-300" />
                    </div>
                    <div>
                      <span className="text-white/60 block text-[11px]">الموقع الجغرافي</span>
                      <span className="font-semibold text-white">المملكة العربية السعودية — الرياض</span>
                    </div>
                  </div>
                </div>

                {/* Simulated mini map card */}
                <div className="bg-white/10 rounded-2xl p-3 border border-white/15 text-center text-xs text-white/80">
                  📍 تغطية شاملة لأكثر من 40 موقفًا معتمدًا في المملكة
                </div>
              </div>

            </div>

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
              
              {submitted ? (
                <div className="p-8 text-center space-y-4 mw-animate-scaleIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#19A974] flex items-center justify-center mx-auto border-2 border-emerald-100">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-lg font-bold text-[#123B5D]">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    شكرًا لتواصلك معنا. سيقوم فريق خدمة العملاء بالرد على استفسارك خلال 24 ساعة عمل عبر البريد الإلكتروني أو الجوال.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mw-btn mw-btn-outline text-xs px-5 py-2"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-[#123B5D] border-b border-slate-100 pb-3">
                    نموذج إرسال استفسار
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mw-form-group">
                      <label className="mw-label mw-label-required">الاسم</label>
                      <input
                        type="text"
                        required
                        className="mw-input"
                        placeholder="الاسم الكامل"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="mw-form-group">
                      <label className="mw-label mw-label-required">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        dir="ltr"
                        className="mw-input text-right"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mw-form-group">
                      <label className="mw-label">رقم الجوال</label>
                      <input
                        type="tel"
                        dir="ltr"
                        className="mw-input text-right"
                        placeholder="05XXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    <div className="mw-form-group">
                      <label className="mw-label">نوع الاستفسار</label>
                      <select
                        className="mw-select"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      >
                        <option value="استفسار عام عن البرنامج">استفسار عام عن البرنامج</option>
                        <option value="متابعة حالة طلب">متابعة حالة طلب</option>
                        <option value="مشكلة في رفع المستندات">مشكلة في رفع المستندات</option>
                        <option value="استفسار عن صلاحية الاشتراك">استفسار عن صلاحية الاشتراك</option>
                        <option value="اقتراح أو ملاحظة">اقتراح أو ملاحظة</option>
                      </select>
                    </div>
                  </div>

                  <div className="mw-form-group">
                    <label className="mw-label mw-label-required">الرسالة أو تفاصيل الاستفسار</label>
                    <textarea
                      required
                      className="mw-textarea"
                      placeholder="اكتب استفسارك بالتفصيل هنا..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mw-btn mw-btn-primary w-full py-3 font-bold text-xs md:text-sm shadow-md"
                  >
                    {loading ? (
                      <span className="mw-spinner" />
                    ) : (
                      <>
                        <Send size={16} />
                        إرسال الرسالة الآن
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </div>

      <MawqifFooter />
    </>
  );
}
