'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Clock, MapPin } from 'lucide-react';

const footerLinks = {
  main: [
    { href: '/mawqif', label: 'الرئيسية' },
    { href: '/mawqif#about', label: 'عن البرنامج' },
    { href: '/mawqif#eligibility', label: 'شروط الاستحقاق' },
    { href: '/mawqif/faq', label: 'الأسئلة الشائعة' },
    { href: '/mawqif/contact', label: 'تواصل معنا' },
  ],
  legal: [
    { href: '/mawqif/privacy', label: 'سياسة الخصوصية' },
    { href: '/mawqif/terms', label: 'الشروط والأحكام' },
  ],
};

export default function MawqifFooter() {
  return (
    <footer className="bg-[#123B5D] text-white mt-12 sm:mt-16">
      {/* Main Footer */}
      <div className="mw-container py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Brand & Contacts */}
          <div className="space-y-4">
            {/* Official Logo on dark background */}
            <Link href="/mawqif" className="inline-flex items-center gap-3 group">
              <Image
                src="/mawqif/logo-icon-white.png"
                alt="مواقف Mawaqif"
                width={46}
                height={46}
                className="object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div>
                <div className="text-xl font-black text-white leading-tight tracking-tight">مواقف</div>
                <div className="text-[10px] text-[#19A974] font-bold tracking-widest uppercase">MAWAQIF</div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              اشتراكك المجاني يبدأ من هنا. برنامج متكامل لتيسير الوصول إلى مواقف السيارات بشكل مجاني لمدة سنة كاملة.
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#19A974] shrink-0" />
                <span>info@mawqif.sa</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-[#19A974] shrink-0" />
                <span>الأحد – الخميس | 8:00 ص – 5:00 م</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#19A974] shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white/90 mb-4 uppercase tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white/90 mb-4 uppercase tracking-wider">
              الخدمات الرقمية
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { href: '/mawqif/apply', label: 'تقديم طلب اشتراك' },
                { href: '/mawqif/track', label: 'متابعة وتتبع الطلب' },
                { href: '/mawqif/verify', label: 'التحقق من الاشتراك' },
                { href: '/mawqif/dashboard', label: 'لوحة التحكم' },
                { href: '/mawqif/login', label: 'تسجيل الدخول' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Box */}
          <div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
              <div className="text-sm font-bold text-white">
                جاهز للتقديم؟
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                قدّم طلبك الآن إلكترونيًا واحصل على اشتراك مجاني لمدة 12 شهرًا.
              </p>
              <Link
                href="/mawqif/apply"
                className="inline-flex items-center gap-1.5 bg-[#19A974] hover:bg-[#14896a] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-emerald-950/30"
              >
                قدّم الآن
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-xs text-white/60">
        <div className="mw-container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <Image
              src="/mawqif/logo-horizontal-white.png"
              alt="مواقف"
              width={80}
              height={18}
              className="object-contain opacity-60"
            />
            <span>© 2026 جميع الحقوق محفوظة.</span>
          </div>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
