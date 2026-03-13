'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Do I need surgery for my condition?', a: 'Not always. Many conditions can be managed with medication, therapy, or minimally invasive procedures. Surgery is recommended only when conservative treatments are no longer effective.' },
  { q: 'How long does a consultation take?', a: 'A first consultation typically takes 20-30 minutes. The doctor ensures enough time to review your history, examine you, and discuss treatment options clearly.' },
  { q: 'Do you offer non-surgical treatments?', a: 'Yes. We offer a range of non-surgical and conservative treatment options depending on the condition. The doctor will recommend the most appropriate approach for your case.' },
  { q: 'What should I bring to my first visit?', a: 'Bring any previous medical reports, test results, prescriptions, and a list of current medications. If you have insurance, carry your insurance card and a valid ID.' },
  { q: 'Where are procedures performed?', a: 'Surgical procedures are performed at our affiliated hospitals which are fully equipped with advanced operation theatres and post-operative care facilities.' },
]

export default function ServicesFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="faq-section" style={{ background: '#F3F4F6' }}>
      <div className="faq-inner">
        <div className="sec-header faq-header">
          <div className="sec-label"><span>FAQ</span></div>
          <h2 className="sec-title">About our services.</h2>
          <p className="sec-sub">General questions about treatments and procedures.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)} style={{ cursor: 'pointer' }}>
              <div className="faq-q">
                <span>{faq.q}</span>
                <div className="faq-toggle" style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s', borderColor: open === i ? '#F97316' : undefined }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={open === i ? '#F97316' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
              </div>
              {open === i && (
                <div className="faq-a" style={{ padding: '0 1.5rem 1.5rem' }}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
