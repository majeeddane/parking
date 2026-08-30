import Link from 'next/link';
import { Car, Phone, Mail, Clock, MapPin, Shield, FileText } from 'lucide-react';

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
    <footer style={{
      background: 'var(--mw-primary)',
      color: 'white',
      marginTop: '4rem',
    }}>
      {/* Main Footer */}
      <div className="mw-container" style={{ padding: '4rem 1.5rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Car size={20} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.1 }}>مواقف</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>Mawqif</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: '240px' }}>
              اشتراكك المجاني يبدأ من هنا. برنامج متكامل لتيسير الوصول إلى مواقف السيارات بشكل مجاني لمدة سنة كاملة.
            </p>

            {/* Contact Icons */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { icon: <Phone size={14} />, text: '920 000 000' },
                { icon: <Mail size={14} />, text: 'info@mawqif.sa' },
                { icon: <Clock size={14} />, text: 'الأحد – الخميس | 8ص – 5م' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--mw-accent)' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              روابط سريعة
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {footerLinks.main.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              الخدمات
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { href: '/mawqif/apply', label: 'تقديم طلب' },
                { href: '/mawqif/track', label: 'متابعة الطلب' },
                { href: '/mawqif/verify', label: 'التحقق من الاشتراك' },
                { href: '/mawqif/dashboard', label: 'لوحة التحكم' },
                { href: '/mawqif/login', label: 'تسجيل الدخول' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Box */}
          <div>
            <div style={{
              background: 'rgba(25,169,116,0.15)',
              border: '1px solid rgba(25,169,116,0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                جاهز للتقديم؟
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                قدّم طلبك الآن واحصل على اشتراك مجاني لمدة 12 شهرًا.
              </p>
              <Link href="/mawqif/apply" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--mw-accent)',
                color: 'white',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>
                قدّم الآن
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.25rem 0' }}>
        <div className="mw-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
            © 2026 مواقف. جميع الحقوق محفوظة.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
