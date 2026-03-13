'use client'
import { useState } from 'react'

const checkIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
const pkgIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
const warnIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const shieldIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>

const inclusions = [
  {
    grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Consultations',
    items: ['Initial assessment with the doctor', 'Pre-treatment planning consultation', 'Post-treatment follow-up visits'],
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    title: 'Diagnostics',
    items: ['Initial assessment and clinical investigation', 'Relevant imaging or diagnostic tests', 'Pre-procedure evaluation and planning'],
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
    icon: pkgIcon,
    title: 'Procedure / Treatment',
    items: ['[Primary treatment as appropriate for condition]', '[Post-procedure care and medications]', 'Same-day review before discharge'],
  },
  {
    grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Aftercare',
    items: ['Prescribed medications for recovery period', 'Recovery monitoring and response assessment', 'Ongoing management plan and guidance'],
  },
]

const exclusions = [
  'Additional diagnostics not covered in package scope',
  'Hospital admission or inpatient stay if required',
  'Treatment of unrelated or newly identified conditions',
  'Travel or accommodation costs',
]

const steps = [
  { num: '1', grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', title: 'Book Consultation', desc: 'Start with a consultation to confirm suitability and discuss the package in detail.' },
  { num: '2', grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', title: 'Diagnostic Assessment', desc: 'Structured tests confirm the diagnosis and form the basis of your treatment plan.' },
  { num: '3', grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)', title: 'Treatment', desc: 'Treatment is carried out in a planned, controlled environment with full monitoring.' },
  { num: '4', grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', title: 'Recovery & Follow-Up', desc: 'Follow-up appointments ensure you recover well and outcomes are on track.' },
]

const faqs = [
  { q: 'What does this package include exactly?', a: 'The package covers all components listed above. Exact inclusions are confirmed in writing before treatment begins. Any out-of-scope items are discussed and priced separately.' },
  { q: 'Is the price fixed or can it change?', a: 'The package price is an estimate based on standard cases. After your initial consultation and assessment, a final fixed cost is confirmed before any treatment commences.' },
  { q: 'Is insurance accepted for this package?', a: 'Yes. We work with all major insurance providers. Cashless facility and pre-authorisation support are available. Our team will assist with the insurance process from start to finish.' },
  { q: 'Is EMI available?', a: 'EMI options are available on request. Please raise this during your consultation and our team will help you with available financing options.' },
  { q: 'Can the package be customised for my condition?', a: 'Every treatment plan is personalised. The listed package is a starting point -- the doctor will tailor the approach based on your specific condition, health status, and clinical findings.' },
]

export default function PackageDetail() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/products">Packages</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>[Package Name]</span>
      </nav>

      {/* S1 Hero */}
      <section className="pkg-detail-hero">
        <div className="pkg-detail-hero-inner">
          <div className="sec-label"><span>Treatment Package</span></div>
          <h1>[Package Name]</h1>
          <p className="pkg-hero-desc">[A clear description of what this package covers, who it is designed for, and the intended outcome. Written in plain language for patients.]</p>
          <div className="pkg-hero-price">[Rs.XX,XXX - Rs.XX,XXX]</div>
          <p className="pkg-hero-note">Estimate only -- final cost confirmed after consultation and assessment.</p>
          <div className="pkg-hero-actions">
            <a href="/appointment" className="pkg-cta-primary">
              Book Consultation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="/products" className="pkg-cta-secondary">View All Packages</a>
          </div>
        </div>
        <div className="pkg-detail-hero-img" style={{ background: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary),var(--primary))' }}>
          {pkgIcon}
        </div>
      </section>

      {/* S2 Inclusions */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>What's Included</span></div>
            <h2 className="sec-title">Everything in this package.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>A complete breakdown of every component covered under the package price.</p>
          </div>
          <div className="inclusion-grid">
            {inclusions.map((inc, i) => (
              <div key={i} className="incl-card">
                <div className="incl-icon" style={{ background: inc.grad }}>{inc.icon}</div>
                <h3>{inc.title}</h3>
                <ul>{inc.items.map((item, j) => <li key={j}>{checkIcon}{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S3 Exclusions */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header">
            <div className="sec-label"><span>Exclusions</span></div>
            <h2 className="sec-title">What is not included.</h2>
            <p className="sec-sub">To ensure complete transparency, here is what falls outside of the package.</p>
          </div>
          <div className="excl-list">
            {exclusions.map((ex, i) => (
              <div key={i} className="excl-item">
                {warnIcon}<span>{ex}</span>
              </div>
            ))}
          </div>
          <p className="excl-note">{shieldIcon} All exclusions are explained before treatment begins. There are no hidden charges.</p>
        </div>
      </div>

      {/* S4 Steps */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Process</span></div>
            <h2 className="sec-title">How the package works.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>A straightforward process designed to keep you informed at every stage.</p>
          </div>
          <div className="pkg-steps">
            {steps.map((s, i) => (
              <div key={i} className="pkg-step">
                <div className="pkg-step-num" style={{ background: s.grad }}>{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S5 Pricing Note */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="pricing-note-inner">
            <h2>Transparent pricing. No surprises.</h2>
            <div className="pricing-points">
              {['Price range is an estimate based on standard presentations', 'Final cost confirmed after assessment -- before treatment begins', 'Insurance and cashless options are supported', 'EMI available on request'].map((pt, i) => (
                <div key={i} className="pricing-point">{checkIcon}{pt}</div>
              ))}
            </div>
            <p className="pricing-disclaimer">Full cost breakdown provided in writing before any procedure commences.</p>
          </div>
        </div>
      </div>

      {/* S6 FAQ */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
            <h2 className="sec-title">About this package.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <div className="faq-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </div>
                {openFaq === i && (
                  <div className="faq-a" style={{ padding: '0 1.5rem 1.5rem' }}><p>{f.a}</p></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
