import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle, Car, FileText, Clock, Award, Shield, Smartphone,
  Users, MapPin, TrendingUp, ChevronLeft, Star, BadgeCheck,
  Zap, CreditCard
} from 'lucide-react';
import MawqifNavbar from '@/components/mawqif/layout/MawqifNavbar';
import MawqifFooter from '@/components/mawqif/layout/MawqifFooter';
import FAQSection from '@/components/mawqif/sections/FAQSection';

export default function MawqifHomePage() {
  return (
    <>
      <MawqifNavbar />

      {/* ======================== HERO SECTION ======================== */}
      <section style={{
        background: 'linear-gradient(160deg, #F7F9FC 0%, #EFF6FF 50%, #F0FDF4 100%)',
        padding: '4rem 0 5rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Background Decoration */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '40%',
          height: '120%',
          background: 'radial-gradient(ellipse, rgba(22,119,168,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '50%',
          height: '80%',
          background: 'radial-gradient(ellipse, rgba(25,169,116,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="mw-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Right: Text Content */}
            <div style={{ animation: 'mw-fadeInUp 0.6s ease' }}>
              {/* Tag */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(25,169,116,0.1)',
                color: 'var(--mw-accent)',
                padding: '0.4rem 1rem',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                border: '1px solid rgba(25,169,116,0.2)',
              }}>
                <Star size={14} fill="currentColor" />
                برنامج الاشتراك المجاني لمدة 12 شهرًا
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 900,
                color: 'var(--mw-primary)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em',
              }}>
                احصل على اشتراك<br />
                <span style={{ color: 'var(--mw-secondary)' }}>مواقف مجاني</span><br />
                لمدة سنة كاملة
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--mw-muted)',
                lineHeight: 1.8,
                marginBottom: '2rem',
                maxWidth: '460px',
              }}>
                إذا كنت مؤهلًا، يمكنك التقديم للحصول على اشتراك مجاني في مواقف السيارات لمدة عام كامل، من خلال خطوات إلكترونية سهلة وسريعة.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/mawqif/apply" className="mw-btn mw-btn-primary mw-btn-lg">
                  قدّم طلبك الآن
                  <ChevronLeft size={18} />
                </Link>
                <Link href="#eligibility" className="mw-btn mw-btn-outline mw-btn-lg">
                  تعرف على الشروط
                </Link>
              </div>

              {/* Trust Indicators */}
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <BadgeCheck size={16} />, text: 'خدمة موثوقة' },
                  { icon: <Shield size={16} />, text: 'بيانات آمنة' },
                  { icon: <Zap size={16} />, text: 'مراجعة سريعة' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--mw-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
                    <span style={{ color: 'var(--mw-accent)' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Left: Image + Floating Cards */}
            <div style={{ position: 'relative', animation: 'mw-fadeInUp 0.8s ease 0.1s both' }}>
              {/* Main Image */}
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(18,59,93,0.2)',
                position: 'relative',
                aspectRatio: '4/3',
              }}>
                <Image
                  src="/mawqif/hero-parking.jpg"
                  alt="موقف سيارات حديث"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(18,59,93,0.15) 0%, transparent 100%)',
                }} />
              </div>

              {/* Floating Card 1 — Top Right */}
              <div style={{
                position: 'absolute',
                top: '-1rem',
                right: '-1.5rem',
                background: 'var(--mw-white)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                boxShadow: '0 16px 48px rgba(18,59,93,0.15)',
                animation: 'mw-fadeInUp 0.8s ease 0.3s both',
                border: '1px solid rgba(25,169,116,0.2)',
                minWidth: '160px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: 'var(--mw-accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--mw-success)', fontWeight: 700 }}>فعّال الآن</span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--mw-primary)' }}>اشتراك مجاني</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--mw-muted)' }}>✓ لمدة 12 شهرًا</div>
              </div>

              {/* Floating Card 2 — Bottom Left */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '-2rem',
                background: 'var(--mw-white)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                boxShadow: '0 16px 48px rgba(18,59,93,0.15)',
                animation: 'mw-fadeInUp 0.8s ease 0.5s both',
                border: '1px solid rgba(22,163,74,0.15)',
                minWidth: '180px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    background: 'var(--mw-success-bg)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--mw-success)',
                    flexShrink: 0,
                  }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--mw-muted)', fontWeight: 500 }}>طلبك</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--mw-success)' }}>تمت الموافقة</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3 — Bottom Right */}
              <div style={{
                position: 'absolute',
                bottom: '-1rem',
                right: '1.5rem',
                background: 'var(--mw-white)',
                borderRadius: '16px',
                padding: '0.875rem 1.25rem',
                boxShadow: '0 16px 48px rgba(18,59,93,0.15)',
                animation: 'mw-fadeInUp 0.8s ease 0.7s both',
                border: '1px solid rgba(22,119,168,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                <div style={{ background: 'var(--mw-info-bg)', borderRadius: '8px', padding: '0.4rem', color: 'var(--mw-secondary)' }}>
                  <Users size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--mw-primary)' }}>+25,000</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--mw-muted)' }}>مستفيد مسجل</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Layout Fix */}
        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-image-col { display: none !important; }
          }
        `}</style>
      </section>

      {/* ======================== STATS STRIP ======================== */}
      <section style={{ background: 'var(--mw-white)', borderBottom: '1px solid var(--mw-border)', borderTop: '1px solid var(--mw-border)' }}>
        <div className="mw-container" style={{ padding: '2.5rem 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            textAlign: 'center',
          }}>
            {[
              { value: '+25,000', label: 'مستفيد مسجل', icon: <Users size={22} />, color: 'var(--mw-secondary)' },
              { value: '+40', label: 'موقفًا مشاركًا', icon: <MapPin size={22} />, color: 'var(--mw-accent)' },
              { value: '98%', label: 'طلبات مكتملة', icon: <TrendingUp size={22} />, color: 'var(--mw-success)' },
              { value: '12', label: 'شهرًا اشتراك مجاني', icon: <Award size={22} />, color: 'var(--mw-warning)' },
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
              }}>
                <div style={{ color: stat.color, opacity: 0.8 }}>{stat.icon}</div>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: 'var(--mw-primary)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--mw-muted)', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      <section className="mw-section" id="how-it-works" style={{ background: 'var(--mw-bg)' }}>
        <div className="mw-container">
          <div className="mw-section-header">
            <div className="mw-section-tag">
              <Zap size={14} />
              خطوات سهلة وبسيطة
            </div>
            <h2 className="mw-heading-lg">التقديم أسهل مما تتوقع</h2>
            <p className="mw-body-lg" style={{ maxWidth: '520px', margin: '0.75rem auto 0' }}>
              أربع خطوات بسيطة تفصلك عن الحصول على اشتراك مجاني في مواقف السيارات لمدة عام كامل.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            position: 'relative',
          }}>
            {/* Connecting Line */}
            <div style={{
              position: 'absolute',
              top: '3.5rem',
              right: '12.5%',
              left: '12.5%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--mw-secondary), var(--mw-accent))',
              opacity: 0.2,
              pointerEvents: 'none',
              display: 'none', // hidden on mobile
            }} />

            {[
              {
                step: '01',
                title: 'عبّئ بياناتك',
                desc: 'أدخل معلوماتك الشخصية وبيانات سيارتك بدقة وإتقان.',
                icon: <FileText size={24} />,
                color: 'var(--mw-secondary)',
                bg: 'rgba(22,119,168,0.08)',
              },
              {
                step: '02',
                title: 'أرفق المستندات',
                desc: 'ارفع الهوية ورخصة القيادة ورخصة السير بصيغ واضحة.',
                icon: <Shield size={24} />,
                color: 'var(--mw-accent)',
                bg: 'rgba(25,169,116,0.08)',
              },
              {
                step: '03',
                title: 'نراجع طلبك',
                desc: 'يقوم فريق مختص بمراجعة البيانات والمستندات بعناية.',
                icon: <Clock size={24} />,
                color: 'var(--mw-warning)',
                bg: 'rgba(217,119,6,0.08)',
              },
              {
                step: '04',
                title: 'احصل على اشتراكك',
                desc: 'عند الموافقة تحصل على بطاقة اشتراك رقمية مجانية لمدة سنة.',
                icon: <Award size={24} />,
                color: 'var(--mw-success)',
                bg: 'rgba(22,163,74,0.08)',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--mw-white)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  border: '1px solid var(--mw-border)',
                  boxShadow: 'var(--mw-shadow-sm)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--mw-shadow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--mw-shadow-sm)';
                }}
              >
                {/* Step Number */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: item.bg,
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {item.step}
                </div>

                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  background: item.bg,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  marginBottom: '1.25rem',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {item.icon}
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--mw-primary)', marginBottom: '0.6rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mw-muted)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/mawqif/apply" className="mw-btn mw-btn-primary mw-btn-lg">
              ابدأ التقديم الآن
              <ChevronLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== ELIGIBILITY ======================== */}
      <section className="mw-section" id="eligibility" style={{ background: 'var(--mw-white)' }}>
        <div className="mw-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left: Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--mw-shadow-lg)', position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src="/mawqif/parking-gate.jpg"
                  alt="بوابة موقف مواقف"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* Stats overlay */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                background: 'var(--mw-primary)',
                color: 'white',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                boxShadow: 'var(--mw-shadow-lg)',
              }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>+25K</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>مستفيد حتى الآن</div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="mw-section-tag" style={{ marginBottom: '1rem' }}>
                <Shield size={14} />
                شروط الاستحقاق
              </div>
              <h2 className="mw-heading-md" style={{ marginBottom: '0.75rem' }}>هل أنت مؤهل؟</h2>
              <p className="mw-body" style={{ marginBottom: '2rem' }}>
                تحقق من استيفائك لشروط البرنامج قبل تقديم الطلب لضمان المعالجة السريعة.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  'أن تكون البيانات الشخصية صحيحة ومطابقة للوثائق',
                  'أن تكون المركبة مسجلة باسم مقدم الطلب أو لديه إثبات استخدام نظامي',
                  'أن تكون رخصة القيادة سارية المفعول',
                  'أن تكون رخصة سير المركبة سارية المفعول',
                  'استيفاء شروط وضوابط البرنامج',
                  'عدم وجود اشتراك مجاني آخر فعال لنفس المركبة',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem 1.25rem',
                    background: 'var(--mw-bg)',
                    borderRadius: '12px',
                    border: '1px solid var(--mw-border)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--mw-accent)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(25,169,116,0.04)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--mw-border)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--mw-bg)';
                  }}>
                    <CheckCircle size={18} color="var(--mw-accent)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--mw-text)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Warning Note */}
              <div style={{
                background: 'var(--mw-warning-bg)',
                border: '1px solid rgba(217,119,6,0.25)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                display: 'flex',
                gap: '0.75rem',
                marginTop: '1.25rem',
              }}>
                <span style={{ color: 'var(--mw-warning)', flexShrink: 0 }}>⚠️</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--mw-warning)', lineHeight: 1.65, margin: 0 }}>
                  تختلف شروط الاستحقاق حسب البرنامج والموقف. يرجى التأكد من الشروط قبل إرسال الطلب.
                </p>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <Link href="/mawqif/apply" className="mw-btn mw-btn-primary">
                  تحقق من أهليتك وقدّم الآن
                  <ChevronLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== WHY MAWQIF ======================== */}
      <section className="mw-section" id="about" style={{ background: 'var(--mw-bg)' }}>
        <div className="mw-container">
          <div className="mw-section-header">
            <div className="mw-section-tag">
              <Star size={14} />
              مزايا البرنامج
            </div>
            <h2 className="mw-heading-lg">لماذا مواقف؟</h2>
            <p className="mw-body-lg" style={{ maxWidth: '500px', margin: '0.75rem auto 0' }}>
              برنامج متكامل يوفر لك تجربة حديثة وسهلة للحصول على اشتراك مجاني في مواقف السيارات.
            </p>
          </div>

          <div className="mw-grid-4">
            {[
              {
                icon: <CreditCard size={26} />,
                title: 'مجاني لمدة سنة',
                desc: 'استفد من الاشتراك دون أي رسوم خلال فترة البرنامج الكاملة.',
                color: 'var(--mw-secondary)',
                bg: 'rgba(22,119,168,0.08)',
              },
              {
                icon: <Smartphone size={26} />,
                title: 'تقديم إلكتروني',
                desc: 'لا تحتاج إلى زيارة أي مكتب لتقديم الطلب، كل شيء عبر الإنترنت.',
                color: 'var(--mw-accent)',
                bg: 'rgba(25,169,116,0.08)',
              },
              {
                icon: <Clock size={26} />,
                title: 'متابعة فورية',
                desc: 'تابع حالة طلبك في أي وقت وفي أي مكان بكل سهولة ويسر.',
                color: 'var(--mw-warning)',
                bg: 'rgba(217,119,6,0.08)',
              },
              {
                icon: <BadgeCheck size={26} />,
                title: 'اشتراك رقمي',
                desc: 'احصل على بطاقة اشتراك إلكترونية بـ QR Code يمكن التحقق منها فورًا.',
                color: 'var(--mw-success)',
                bg: 'rgba(22,163,74,0.08)',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--mw-white)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  border: '1px solid var(--mw-border)',
                  boxShadow: 'var(--mw-shadow-sm)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--mw-shadow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--mw-shadow-sm)';
                }}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: item.bg,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  margin: '0 auto 1.25rem',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--mw-primary)', marginBottom: '0.6rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--mw-muted)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FAQ ======================== */}
      <section className="mw-section" id="faq" style={{ background: 'var(--mw-white)' }}>
        <div className="mw-container">
          <div className="mw-section-header">
            <div className="mw-section-tag">الأسئلة الشائعة</div>
            <h2 className="mw-heading-lg">أجوبة على أكثر الأسئلة شيوعًا</h2>
          </div>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <FAQSection />
          </div>
        </div>
      </section>

      {/* ======================== CTA BANNER ======================== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--mw-primary) 0%, #1a5276 50%, var(--mw-secondary) 100%)',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '60%',
          height: '200%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="mw-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.9)',
            padding: '0.4rem 1rem',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            <Car size={14} />
            ابدأ رحلتك اليوم
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            قدّم طلبك الآن<br />واحصل على اشتراك مجاني لمدة سنة
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            انضم إلى أكثر من 25,000 مستفيد يستمتعون بخدمة مواقف السيارات المجانية من خلال برنامجنا.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/mawqif/apply" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--mw-accent)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 8px 24px rgba(25,169,116,0.3)',
            }}>
              قدّم طلبك الآن
              <ChevronLeft size={18} />
            </Link>
            <Link href="/mawqif/track" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.12)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'all 0.2s',
            }}>
              تابع طلبك
            </Link>
          </div>
        </div>
      </section>

      <MawqifFooter />
    </>
  );
}
