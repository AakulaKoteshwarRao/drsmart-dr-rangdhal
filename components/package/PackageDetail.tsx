'use client'
// ─────────────────────────────────────────────────────────────
// components/package/PackageDetail.tsx
// Locked design: 2026-03-15
// Cross-checked against reference HTML — exact class names used
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'

const stepIcons = [
  <svg key={0} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  <svg key={1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg key={3} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
]

const pillStyles = [
  { background: '#F0FDFA', color: '#3CB8AF' },
  { background: '#EBF5FB', color: '#1B6FA8' },
  { background: '#FEF3C7', color: '#D68910' },
]
const iconGrads = [
  'linear-gradient(135deg,#3CB8AF,#2A9D8F)',
  'linear-gradient(135deg,#1B6FA8,#145A8A)',
  'linear-gradient(135deg,#0D3B5E,#0A2E4A)',
  'linear-gradient(135deg,#D68910,#B7770A)',
]
const sfClasses = ['sf-1','sf-2','sf-3','sf-4']

// Inclusion category icons (chat, search, doc, check)
const inclIcons = [
  <svg key={0} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  <svg key={1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  <svg key={3} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
]

// Payment option icons
const payIcons = [
  <svg key={0} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  <svg key={1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  <svg key={3} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
]

export interface PackageDetailProps {
  name: string
  slug?: string
  description?: string
  pills?: string[]
  heroImage?: string | null
  priceRange?: string
  priceUnit?: string
  inclusions?: { category: string; items: string[] }[]
  howItWorks?: { title: string; description: string }[]
  whoIsItFor?: string[]
  pricingTitle?: string
  pricingSubtitle?: string
  pricingRows?: { label: string; value: string }[]
  pricingTotal?: { label: string; value: string }
  pricingNote?: string
  paymentOptions?: { title: string; items: string[] }[]
  testimonials?: { name: string; detail: string; text: string; rating?: number }[]
  relatedProcedures?: { name: string; slug: string }[]
  faqs?: { question: string; answer: string }[]
  clinicName?: string
  clinicAddress?: string
  clinicHours?: string
  whatsappNumber?: string
  appointmentUrl?: string
}

export default function PackageDetail({
  name = 'Package',
  description = '',
  pills = [],
  heroImage,
  priceRange,
  priceUnit,
  inclusions = [],
  howItWorks = [],
  whoIsItFor = [],
  pricingTitle,
  pricingSubtitle,
  pricingRows = [],
  pricingTotal,
  pricingNote,
  paymentOptions = [],
  testimonials = [],
  relatedProcedures = [],
  faqs = [],
  clinicName = '',
  clinicAddress = '',
  clinicHours = '',
  whatsappNumber = '',
  appointmentUrl = '/appointment',
}: PackageDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/products">Packages</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{name}</span>
      </nav>

      {/* S1 — Hero */}
      <section className="cond-hero">
        <div className="cond-hero-text">
          <div className="sec-label"><span>Package</span></div>
          <h1>{name}</h1>
          <p className="cond-hero-desc">{description}</p>
          <div className="hero-pills">
            {(pills.length > 0 ? pills : ['All-Inclusive','EMI Available','Insurance Accepted']).map((pill, i) => (
              <span key={i} className="hero-pill" style={pillStyles[i % pillStyles.length]}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
                {' '}{pill}
              </span>
            ))}
          </div>
          {priceRange && (
            <div className="pkg-price">
              <span className="pkg-price-val">{priceRange}</span>
              {priceUnit && <span className="pkg-price-note">{priceUnit}</span>}
            </div>
          )}
          <a href={appointmentUrl} className="pkg-enquire">
            Enquire Now{' '}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
        <div className="cond-hero-img" style={{ background: 'linear-gradient(145deg,#0D3B5E,#1B6FA8,#3CB8AF)', position: 'relative', overflow: 'hidden' }}>
          {heroImage ? (
            <Image src={heroImage} alt={`${name} at ${clinicName}`} fill style={{ objectFit: 'cover' }} priority />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" width="48" height="48">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            </svg>
          )}
        </div>
      </section>

      {/* S2 — What's Included */}
      {inclusions.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Inclusions</span></div>
              <h2 className="sec-title">What&apos;s included in this package.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Everything you need — from first consultation to final follow-up — in one transparent package.</p>
            </div>
            <div className="incl-grid">
              {inclusions.map((incl, i) => (
                <div key={i} className="incl-card">
                  <div className="incl-card-head">
                    <div className="incl-icon" style={{ background: iconGrads[i % iconGrads.length] }}>
                      {inclIcons[i % inclIcons.length]}
                    </div>
                    <h3>{incl.category}</h3>
                  </div>
                  <ul>{incl.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S3 — How It Works */}
      {howItWorks.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Your Journey</span></div>
              <h2 className="sec-title">How this package works.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>A clear, structured path from enquiry to full recovery.</p>
            </div>
            <div className="steps-flow">
              {howItWorks.map((step, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div className={`sf-card ${sfClasses[i % sfClasses.length]}`}>
                    <div className="sf-top">
                      <span className="sf-badge">Step {String(i + 1).padStart(2, '0')}</span>
                      <div className="sf-icon">{stepIcons[i % stepIcons.length]}</div>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {i < howItWorks.length - 1 && (
                    <>
                      <div className="sf-arrow-h">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="9 6 15 12 9 18"/>
                        </svg>
                      </div>
                      <div className="sf-arrow-v">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S4 — Who Is This For */}
      {whoIsItFor.length > 0 && (
        <div className="sec-teal">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Suitability</span></div>
              <h2 className="sec-title">Who is this package for?</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Designed for patients who want a complete, hassle-free solution.</p>
            </div>
            <div className="who-grid">
              {whoIsItFor.map((item, i) => (
                <div key={i} className="who-pill">
                  <div className="who-icon" style={{ background: iconGrads[i % iconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S5 — Pricing Breakdown */}
      {pricingRows.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Pricing</span></div>
              <h2 className="sec-title">Pricing breakdown.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Transparent pricing with no hidden charges. Exact cost confirmed after consultation.</p>
            </div>
            <div className="pricing-breakdown">
              <div className="pb-header">
                <h3>{pricingTitle ?? name}</h3>
                {pricingSubtitle && <p>{pricingSubtitle}</p>}
              </div>
              <div className="pb-rows">
                {pricingRows.map((row, i) => (
                  <div key={i} className="pb-row">
                    <span className="pb-row-label">{row.label}</span>
                    <span className="pb-row-val">{row.value}</span>
                  </div>
                ))}
              </div>
              {pricingTotal && (
                <div className="pb-total">
                  <span className="pb-total-label">{pricingTotal.label}</span>
                  <span className="pb-total-val">{pricingTotal.value}</span>
                </div>
              )}
              {pricingNote && <div className="pb-note">{pricingNote}</div>}
            </div>
          </div>
        </div>
      )}

      {/* S6 — Payment Options */}
      {paymentOptions.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Payment</span></div>
              <h2 className="sec-title">Payment options.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Multiple ways to pay — we&apos;ll help you find the most convenient option.</p>
            </div>
            {/* Reuses incl-grid + incl-card styles */}
            <div className="incl-grid">
              {paymentOptions.map((opt, i) => (
                <div key={i} className="incl-card">
                  <div className="incl-card-head">
                    <div className="incl-icon" style={{ background: iconGrads[i % iconGrads.length] }}>
                      {payIcons[i % payIcons.length]}
                    </div>
                    <h3>{opt.title}</h3>
                  </div>
                  <ul>{opt.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S7 — Testimonials */}
      {testimonials.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Testimonials</span></div>
              <h2 className="sec-title">What our patients say.</h2>
            </div>
            <div className="test-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="test-card">
                  <div className="test-stars">{'★'.repeat(t.rating ?? 5)}</div>
                  <p className="test-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="test-author">
                    <div className="test-avatar" style={{ background: i === 0 ? 'linear-gradient(135deg,#3CB8AF,#1B6FA8)' : 'linear-gradient(135deg,#1B6FA8,#0D3B5E)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" width="20" height="20">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <span className="test-name">{t.name}</span>
                      <span className="test-detail">{t.detail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S8 — Related Procedures */}
      {relatedProcedures.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Related</span></div>
              <h2 className="sec-title">Related procedures.</h2>
            </div>
            <div className="rel-card">
              <div className="rel-head">Related Procedures</div>
              {relatedProcedures.map((proc, i) => (
                <a key={i} href={`/procedures/${proc.slug}`} className="rel-row">
                  <span>{proc.name}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S9 — FAQ */}
      {faqs.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
              <h2 className="sec-title">About this package.</h2>
            </div>
            <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((f, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <div className="faq-q">
                    <span itemProp="name">{f.question}</span>
                    <div className="faq-toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="faq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text">{f.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Band */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="cta-band-content">
            <h2>Interested in this package?</h2>
            <p>Get a personalised cost estimate. No commitment required — just a conversation to help you understand your options.</p>
          </div>
          <div className="cta-band-actions">
            <a href={appointmentUrl} className="cta-primary">
              Book Appointment{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/919999999999'}
               className="cta-secondary" target="_blank" rel="noopener noreferrer">
              WhatsApp Us{' '}
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
            </a>
          </div>
          <div className="cta-band-info">
            {clinicAddress && <span>📍 {clinicAddress}</span>}
            {clinicHours && <span>🕐 {clinicHours}</span>}
          </div>
        </div>
      </section>
    </>
  )
}
