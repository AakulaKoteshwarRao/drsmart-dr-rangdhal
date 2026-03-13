'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Are the prices fixed or can they change?', a: 'The prices shown are estimated ranges. The exact cost is confirmed after your consultation and assessment. Final costs depend on your specific condition and treatment requirements.' },
  { q: 'Is insurance accepted for packages?', a: 'Yes, we work with all major insurance providers. Cashless facility and pre-authorisation support are available. Our team will assist with the insurance process.' },
  { q: 'Is EMI available?', a: 'Yes, EMI options are available on request. Please discuss this during your consultation and our team will help you with available financing options.' },
  { q: 'What is included in the package?', a: 'Packages typically include consultation, diagnostic tests, procedure, medications, and follow-up visits. Exact inclusions are detailed in the final cost breakdown.' },
  { q: 'Can I customise a package?', a: 'Every package is personalised based on your condition and needs. The listed packages are starting points -- the doctor will tailor the treatment plan specifically for you.' },
]

export default function ProductsFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="faq-section" style={{ background: '#F3F4F6' }}>
      <div className="faq-inner">
        <div className="sec-header faq-header">
          <div className="sec-label"><span>FAQ</span></div>
          <h2 className="sec-title">About our packages.</h2>
          <p className="sec-sub">Common questions about pricing, inclusions, and the treatment process.</p>
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
