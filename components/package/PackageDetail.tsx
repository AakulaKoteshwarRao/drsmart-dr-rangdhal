'use client'
// ─────────────────────────────────────────────────────────────
// components/package/PackageDetail.tsx
// FULL REWRITE — was hardcoded, now fully dynamic via props
// Matches ALL existing CSS class names exactly
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'

// ── Icons ──────────────────────────────────────────────────────
const checkIcon  = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
const warnIcon   = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const shieldIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const pkgIcon    = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
const arrowIcon  = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

const grads = [
  'linear-gradient(135deg,var(--primary),var(--primary-dark))',
  'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
  'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
  'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))',
]

// ── Props ──────────────────────────────────────────────────────
export interface PackageDetailProps {
  name: string
  slug?: string
  description?: string
  shortDescription?: string
  price?: string
  heroImage?: string | null

  whatsIncluded?: { category: string; items: string[] }[]
  howItWorks?: { step: string; title: string; description: string }[]
  whoIsItFor?: string
  pricingBreakdown?: { item: string; price: string }[]
  exclusions?: string[]
  insuranceCoverage?: string
  estimatedTimeline?: string
  paymentOptions?: string[]
  testimonials?: { name: string; text: string; rating: number }[]
  faqs?: { question: string; answer: string }[]

  clinicName?: string
  doctorName?: string
  phone?: string
  city?: string
  mapUrl?: string | null
}

// ── Component ──────────────────────────────────────────────────
export default function PackageDetail({
  name = 'Package',
  description = '',
  shortDescription = '',
  price,
  heroImage,
  whatsIncluded = [],
  howItWorks = [],
  whoIsItFor,
  pricingBreakdown = [],
  exclusions = [],
  insuranceCoverage,
  estimatedTimeline,
  paymentOptions = [],
  testimonials = [],
  faqs = [],
  clinicName = '',
  phone = '',
  city = '',
}: PackageDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/products">Packages</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{name}</span>
      </nav>

      {/* S1 — Hero */}
      <section className="pkg-detail-hero">
        <div className="pkg-detail-hero-inner">
          <div className="sec-label"><span>Treatment Package</span></div>
          <h1>{name}</h1>
          <p className="pkg-hero-desc">{description || shortDescription}</p>
          {price && (
            <>
              <div className="pkg-hero-price">{price}</div>
              <p className="pkg-hero-note">Estimate only — final cost confirmed after consultation and assessment.</p>
            </>
          )}
          <div className="pkg-hero-actions">
            <a href="/appointment" className="pkg-cta-primary">
              Book Consultation {arrowIcon}
            </a>
            <a href="/products" className="pkg-cta-secondary">View All Packages</a>
          </div>
        </div>
        <div className="pkg-detail-hero-img" style={{ background: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary),var(--primary))', position: 'relative', overflow: 'hidden' }}>
          {heroImage ? (
            <Image src={heroImage} alt={`${name} at ${clinicName}`} fill style={{ objectFit: 'cover', borderRadius: '16px' }} priority />
          ) : pkgIcon}
        </div>
      </section>

      {/* S2 — What's Included */}
      {whatsIncluded.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>What&apos;s Included</span></div>
              <h2 className="sec-title">Everything in this package.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>A complete breakdown of every component covered under the package price.</p>
            </div>
            <div className="inclusion-grid">
              {whatsIncluded.map((inc, i) => (
                <div key={i} className="incl-card">
                  <div className="incl-icon" style={{ background: grads[i % grads.length] }}>{pkgIcon}</div>
                  <h3>{inc.category}</h3>
                  <ul>{inc.items.map((item, j) => <li key={j}>{checkIcon}{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S3 — Exclusions */}
      {exclusions.length > 0 && (
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
      )}

      {/* S4 — How It Works / Steps */}
      {howItWorks.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Process</span></div>
              <h2 className="sec-title">How the package works.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>A straightforward process designed to keep you informed at every stage.</p>
            </div>
            <div className="pkg-steps">
              {howItWorks.map((s, i) => (
                <div key={i} className="pkg-step">
                  <div className="pkg-step-num" style={{ background: grads[i % grads.length] }}>{s.step}</div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S4b — Who Is It For */}
      {whoIsItFor && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Ideal For</span></div>
              <h2 className="sec-title">Who should choose this package?</h2>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-secondary, #4b5563)' }}>{whoIsItFor}</p>
          </div>
        </div>
      )}

      {/* S5 — Pricing */}
      {(pricingBreakdown.length > 0 || paymentOptions.length > 0 || insuranceCoverage) && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="pricing-note-inner">
              <h2>Transparent pricing. No surprises.</h2>

              {pricingBreakdown.length > 0 && (
                <div style={{ border: '1px solid var(--border, #e5e7eb)', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  {pricingBreakdown.map((row, i) => (
                    <div key={i} className="pricing-point" style={{ justifyContent: 'space-between', background: i % 2 === 0 ? 'white' : 'var(--bg-subtle,#f9fafb)', padding: '0.875rem 1.25rem', borderBottom: i < pricingBreakdown.length - 1 ? '1px solid var(--border,#e5e7eb)' : 'none' }}>
                      <span>{row.item}</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{row.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pricing-points">
                {['Price range is an estimate based on standard presentations',
                  'Final cost confirmed after assessment — before treatment begins',
                  insuranceCoverage || 'Insurance and cashless options are supported',
                  paymentOptions.length > 0 ? paymentOptions[0] : 'EMI available on request',
                ].map((pt, i) => (
                  <div key={i} className="pricing-point">{checkIcon}{pt}</div>
                ))}
              </div>

              <p className="pricing-disclaimer">Full cost breakdown provided in writing before any procedure commences.</p>
            </div>
          </div>
        </div>
      )}

      {/* S6 — Timeline */}
      {estimatedTimeline && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Duration</span></div>
              <h2 className="sec-title">Estimated timeline.</h2>
            </div>
            <p style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', padding: '1.5rem', background: 'var(--primary-light,#eff6ff)', borderRadius: '0.75rem' }}>
              {estimatedTimeline}
            </p>
          </div>
        </div>
      )}

      {/* S7 — Payment Options */}
      {paymentOptions.length > 1 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Flexibility</span></div>
              <h2 className="sec-title">Payment options.</h2>
            </div>
            <div className="inclusion-grid">
              {paymentOptions.map((opt, i) => (
                <div key={i} className="incl-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>💳</span>
                  <span style={{ fontWeight: 500 }}>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S8 — Testimonials */}
      {testimonials.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Patient Stories</span></div>
              <h2 className="sec-title">What our patients say.</h2>
            </div>
            <div className="test-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="test-card" style={{ background: grads[i % grads.length], color: 'white', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} style={{ color: s < t.rating ? '#fbbf24' : 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1rem', fontStyle: 'italic', opacity: 0.9 }}>&ldquo;{t.text}&rdquo;</p>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.75 }}>— {t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S9 — FAQ */}
      {faqs.length > 0 && (
        <div className="sec-grey">
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="faq-a" style={{ padding: '0 1.5rem 1.5rem' }}
                      itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text">{f.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      {phone && (
        <div className="sec-white">
          <div className="sec-pad" style={{ textAlign: 'center' }}>
            <h2>Book the {name} Package</h2>
            <p style={{ color: 'var(--text-secondary,#4b5563)', marginBottom: '1.5rem' }}>
              Available at {clinicName}{city ? ` in ${city}` : ''}. Call us to check availability.
            </p>
            <a href={`tel:${phone}`} className="pkg-cta-primary">
              Call Now — {phone} {arrowIcon}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
