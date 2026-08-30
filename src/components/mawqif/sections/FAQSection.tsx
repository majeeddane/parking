'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'من يمكنه التقديم على برنامج مواقف؟',
    a: 'يمكن لأي شخص يمتلك مركبة مسجلة بإسمه أو لديه إثبات استخدام نظامي، ويحمل رخصة قيادة ورخصة سير سارية المفعول، أن يتقدم بطلبه للاستفادة من البرنامج.',
  },
  {
    q: 'ما المستندات المطلوبة للتقديم؟',
    a: 'تحتاج إلى: صورة من الهوية الوطنية أو الإقامة، رخصة القيادة السارية، رخصة سير المركبة. كما يمكن إرفاق صورة للمركبة كملف اختياري.',
  },
  {
    q: 'كم تستغرق مراجعة الطلب؟',
    a: 'عادةً تستغرق مراجعة الطلب من 3 إلى 5 أيام عمل. في حالات التحقق من المستندات قد تمتد المدة إلى 7 أيام.',
  },
  {
    q: 'هل صورة السيارة إلزامية؟',
    a: 'لا، صورة السيارة اختيارية وليست إلزامية للتقديم. لكن إرفاقها قد يسرّع عملية المراجعة والموافقة.',
  },
  {
    q: 'ماذا أفعل إذا تم رفض طلبي؟',
    a: 'سيتم إخطارك بسبب الرفض. يمكنك مراجعة المستندات وتصحيح المشكلة ثم إعادة تقديم طلبك عبر زر "تعديل الطلب" في صفحة متابعة الطلب.',
  },
  {
    q: 'كيف أتابع حالة طلبي؟',
    a: 'يمكنك متابعة حالة طلبك عبر صفحة "متابعة الطلب" باستخدام رقم الطلب أو رقم الهوية. كما ستتلقى إشعارات على بريدك الإلكتروني ورقم جوالك.',
  },
  {
    q: 'متى ينتهي الاشتراك؟',
    a: 'الاشتراك صالح لمدة 12 شهرًا من تاريخ الإصدار. ستتلقى تنبيهًا قبل 30 يومًا من انتهاء صلاحية اشتراكك.',
  },
  {
    q: 'هل يمكن استخدام الاشتراك لأكثر من سيارة؟',
    a: 'لا، الاشتراك مرتبط بمركبة واحدة فقط. في حال رغبت في الاشتراك لمركبة أخرى، يجب تقديم طلب منفصل للمركبة الثانية وفق شروط البرنامج.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className="mw-accordion-item">
          <button
            className="mw-accordion-trigger"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span>{faq.q}</span>
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '8px',
              background: openIndex === i ? 'rgba(22,119,168,0.1)' : 'var(--mw-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: openIndex === i ? 'var(--mw-secondary)' : 'var(--mw-muted)',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}>
              {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>
          <div className={`mw-accordion-content ${openIndex === i ? 'open' : ''}`}>
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  );
}
