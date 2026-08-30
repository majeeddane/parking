'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Menu, X, Bell, User, LogIn, FileText, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { useMawqif } from '@/components/mawqif/MawqifContext';

const navLinks = [
  { href: '/mawqif', label: 'الرئيسية' },
  { href: '/mawqif#about', label: 'عن البرنامج' },
  { href: '/mawqif#eligibility', label: 'شروط الاستحقاق' },
  { href: '/mawqif#how-it-works', label: 'خطوات التقديم' },
  { href: '/mawqif/faq', label: 'الأسئلة الشائعة' },
  { href: '/mawqif/contact', label: 'تواصل معنا' },
];

export default function MawqifNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isLoggedIn, logout } = useMawqif();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--mw-border)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? 'var(--mw-shadow)' : 'none',
      }}>
        <div className="mw-container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}>
            {/* Logo */}
            <Link href="/mawqif" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, var(--mw-primary), var(--mw-secondary))',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Car size={20} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--mw-primary)', lineHeight: 1.1 }}>مواقف</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--mw-muted)', fontWeight: 500, lineHeight: 1 }}>Mawqif</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="mw-hide-mobile">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--mw-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = 'var(--mw-primary)';
                    (e.target as HTMLElement).style.background = 'var(--mw-bg)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'var(--mw-muted)';
                    (e.target as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons - Reactive to Login State */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="mw-hide-mobile">
              {isLoggedIn && currentUser ? (
                <>
                  <Link
                    href="/mawqif/dashboard"
                    className="mw-btn mw-btn-primary mw-btn-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <LayoutDashboard size={15} />
                    لوحة التحكم ({currentUser.firstName})
                  </Link>
                  <button
                    onClick={logout}
                    className="mw-btn mw-btn-ghost mw-btn-sm"
                    style={{ gap: '0.3rem', color: '#DC2626' }}
                    title="تسجيل الخروج"
                  >
                    <LogOut size={15} />
                  </button>
                </>
              ) : (
                <>
                  <Link href="/mawqif/login" className="mw-btn mw-btn-outline mw-btn-sm" style={{ gap: '0.4rem' }}>
                    <LogIn size={15} />
                    تسجيل الدخول
                  </Link>
                  <Link href="/mawqif/register" className="mw-btn mw-btn-primary mw-btn-sm" style={{ gap: '0.4rem' }}>
                    <UserPlus size={15} />
                    إنشاء حساب للتقديم
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mw-show-mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'transparent',
                border: '1px solid var(--mw-border)',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--mw-primary)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(18,59,93,0.4)',
          backdropFilter: 'blur(4px)',
          animation: 'mw-fadeIn 0.2s ease',
        }} onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: mobileOpen ? 0 : '-100%',
        width: '280px',
        height: '100vh',
        background: 'var(--mw-white)',
        zIndex: 200,
        transition: 'right 0.3s ease',
        boxShadow: mobileOpen ? '-8px 0 32px rgba(18,59,93,0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--mw-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/mawqif" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }} onClick={() => setMobileOpen(false)}>
            <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, var(--mw-primary), var(--mw-secondary))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={16} color="white" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--mw-primary)' }}>مواقف</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--mw-muted)', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
          {isLoggedIn && currentUser && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--mw-bg)', borderRadius: '12px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--mw-primary)' }}>مرحبًا، {currentUser.fullName}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--mw-accent)', fontWeight: 600 }}>مستفيد مسجل</div>
            </div>
          )}

          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{ display: 'block', padding: '0.875rem 1rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--mw-text)', textDecoration: 'none', marginBottom: '0.25rem' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid var(--mw-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {isLoggedIn ? (
            <>
              <Link href="/mawqif/dashboard" className="mw-btn mw-btn-primary mw-btn-full" onClick={() => setMobileOpen(false)}>
                لوحة تحكمي
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="mw-btn mw-btn-outline mw-btn-full"
                style={{ color: '#DC2626' }}
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link href="/mawqif/login" className="mw-btn mw-btn-outline mw-btn-full" onClick={() => setMobileOpen(false)}>
                تسجيل الدخول
              </Link>
              <Link href="/mawqif/register" className="mw-btn mw-btn-primary mw-btn-full" onClick={() => setMobileOpen(false)}>
                إنشاء حساب جديد
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: '72px' }} />
    </>
  );
}
