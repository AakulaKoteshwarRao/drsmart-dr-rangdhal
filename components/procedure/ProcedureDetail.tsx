'use client'
// ─────────────────────────────────────────────────────────────
// components/procedure/ProcedureDetail.tsx
// FULL REWRITE — was hardcoded, now fully dynamic via props
// Matches ALL existing CSS class names exactly
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'

// ── Icons ─────────────────────────────────────────────────────
const checkIcon  = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
const warnIcon   = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const shieldIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const clockIcon  = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const medIcon    = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
const arrowIcon  = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

const grads = [
  'linear-gradient(135deg,var(--primary),var(--primary-dark))',
  'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
  'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
  'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))',
]

// ── Props ──────────────────────────────────────────────────────
export interface ProcedureDetailProps {
  name: string
  slug?: string
  description?: string
  shortDescription?: string
  pills?: string[]
  heroImage?: string | null

  // Quick facts
  anaesthesia?: string
  duration?: string
  hospitalStay?: string
  recoveryTime?: string
  costRange?: string
  insuranceCoverage?: string
  icd10Code?: string

  // Candidacy
  whoNeedsIt?: string
  successRate?: string
  risks?: string[]
  sideEffects?: string[]
  preparation?: string[]

  // Steps
  howItWorks?: { step: string; title: string; description: string }[]
  howWeHandle?: { step: string; title: string; description: string }[]

  // Timeline
  durationMilestones?: { label: string; duration: string }[]
  estimatedTimeline?: string

  // Recovery
  recoveryPhases?: { phase: string; title: string; description: string }[]

  // Outcomes + misconceptions
  outcomes?: { title: string; description: string }[]
  misconceptions?: { myth: string; reality: string }[]

  // Warnings
  ifNotTreated?: string
  whenToSeeDoctor?: string

  // Cross-links
  relatedConditions?: { name: string; slug: string; shortDescription?: string }[]

  // FAQs
  faqs?: { question: string; answer: string }[]

  // Clinic context
  clinicName?: string
  doctorName?: string
  phone?: string
  city?: string
  mapUrl?: string | null
}

// ── Component ──────────────────────────────────────────────────
export default function ProcedureDetail({
  name = 'Procedure',
  description = '',
  shortDescription = '',
  pills = [],
  heroImage,
  anaesthesia, duration, hospitalStay, recoveryTime, costRange, insuranceCoverage, icd10Code,
  whoNeedsIt,
  successRate,
  risks = [],
  sideEffects = [],
  preparation = [],
  howItWorks = [],
  howWeHandle = [],
  durationMilestones = [],
  estimatedTimeline,
  recoveryPhases = [],
  outcomes = [],
  misconceptions = [],
  ifNotTreated,
  whenToSeeDoctor,
  relatedConditions = [],
  faqs = [],
  clinicName = '',
  doctorName = '',
  phone = '',
  city = '',
}: ProcedureDetailProps) {
  const [activeRec,  setActiveRec]  = useState(0)
  const [openMyth,   setOpenMyth]   = useState<number | null>(null)
  const [openFaq,    setOpenFaq]    = useState<number | null>(null)

  const quickFacts = [
    { label: 'Anaesthesia',        value: anaesthesia },
    { label: 'Duration',           value: duration },
    { label: 'Hospital Stay',      value: hospitalStay },
    { label: 'Recovery Time',      value: recoveryTime },
    { label: 'Cost Range',         value: costRange },
    { label: 'Insurance Coverage', value: insuranceCoverage },
    { label: 'ICD-10 Code',        value: icd10Code },
  ].filter(f => f.value)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{name}</span>
      </nav>

      {/* S1 — Hero */}
      <section className="cond-hero">
        <div className="cond-hero-text">
          <div className="sec-label"><span>Procedure</span></div>
          <h1>{name}</h1>
          <p className="cond-hero-desc">{description || shortDescription}</p>

          {pills.length > 0 ? (
            <div className="hero-pills">
              {pills.map((pill, i) => (
                <span key={i} className="hero-pill" style={{
                  background: i === 0 ? 'var(--primary-light)' : i === 1 ? '#EFF6FF' : 'var(--primary-pale)',
                  color: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--secondary)' : 'var(--primary-dark)',
                }}>
                  {checkIcon} {pill}
                </span>
              ))}
            </div>
          ) : (
            <div className="hero-pills">
              <span className="hero-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{checkIcon} Minimally Invasive</span>
              <span className="hero-pill" style={{ background: '#EFF6FF', color: 'var(--secondary)' }}>{checkIcon} Expert Care</span>
              <span className="hero-pill" style={{ background: 'var(--primary-pale)', color: 'var(--primary-dark)' }}>{checkIcon} Fast Recovery</span>
            </div>
          )}

          {(successRate || duration || recoveryTime) && (
            <div className="hero-stats">
              {successRate  && <div><div className="hero-stat-num">{successRate}</div><div className="hero-stat-label">Success Rate</div></div>}
              {duration     && <div><div className="hero-stat-num">{duration}</div><div className="hero-stat-label">Procedure Time</div></div>}
              {recoveryTime && <div><div className="hero-stat-num">{recoveryTime}</div><div className="hero-stat-label">Recovery</div></div>}
            </div>
          )}

          <a href="/appointment" className="cond-hero-cta">
            Book a Consultation {arrowIcon}
          </a>
        </div>

        <div className="cond-hero-img" style={{ background: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary),var(--primary))', position: 'relative', overflow: 'hidden' }}>
          {heroImage ? (
            <Image src={heroImage} alt={`${name} at ${clinicName}`} fill style={{ objectFit: 'cover', borderRadius: '16px' }} priority />
          ) : medIcon}
        </div>
      </section>

      {/* S2 — Quick Facts */}
      {quickFacts.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>At a Glance</span></div>
              <h2 className="sec-title">Procedure overview.</h2>
            </div>
            <div className="duration-grid">
              {quickFacts.map((f, i) => (
                <div key={i} className="dur-card">
                  <div className="dur-icon" style={{ background: grads[i % grads.length] }}>{clockIcon}</div>
                  <h3>{f.label}</h3>
                  <div className="dur-val">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S3 — Who Needs It / Candidacy */}
      {(whoNeedsIt || risks.length > 0 || sideEffects.length > 0 || preparation.length > 0) && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Candidacy</span></div>
              <h2 className="sec-title">Who is this procedure recommended for?</h2>
              {whoNeedsIt && <p className="sec-sub" style={{ margin: '0 auto' }}>{whoNeedsIt}</p>}
            </div>
            <div className="transparency-cards">
              {risks.length > 0 && (
                <div className="transp-card">
                  <div className="transp-icon" style={{ background: grads[1] }}>{warnIcon}</div>
                  <h3>Possible Risks</h3>
                  <ul>{risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
                </div>
              )}
              {sideEffects.length > 0 && (
                <div className="transp-card">
                  <div className="transp-icon" style={{ background: grads[2] }}>{shieldIcon}</div>
                  <h3>Side Effects</h3>
                  <ul>{sideEffects.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
              )}
              {preparation.length > 0 && (
                <div className="transp-card">
                  <div className="transp-icon" style={{ background: grads[0] }}>{checkIcon}</div>
                  <h3>Preparation Steps</h3>
                  <ul>{preparation.map((p, i) => <li key={i}>{checkIcon}{p}</li>)}</ul>
                </div>
              )}
            </div>
            {(risks.length > 0 || sideEffects.length > 0) && (
              <div className="risk-note">{shieldIcon}<span>All risks and benefits are discussed in detail during your consultation.</span></div>
            )}
          </div>
        </div>
      )}

      {/* S4 — How It Works */}
      {howItWorks.length > 0 && (
        <div className="sec-teal">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Procedure</span></div>
              <h2 className="sec-title">How this procedure works.</h2>
            </div>
            <div className="proc-steps">
              {howItWorks.map((s, i) => (
                <div key={i} className="proc-step">
                  {i > 0 && <div className="proc-step-line" />}
                  <div className="proc-num" style={{ background: grads[i % grads.length] }}>{s.step}</div>
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S5 — How We Handle */}
      {howWeHandle.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>{clinicName ? `At ${clinicName}` : 'Our Approach'}</span></div>
              <h2 className="sec-title">How we handle this procedure.</h2>
            </div>
            <div className="steps-flow">
              {howWeHandle.map((s, i) => (
                <div key={i} className="sf-card">
                  <div className="sf-top"><span className="sf-badge">{s.step}</span></div>
                  <h3 className="sf-title">{s.title}</h3>
                  <p className="sf-desc">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S6 — Duration & Milestones */}
      {(durationMilestones.length > 0 || estimatedTimeline) && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Timelines</span></div>
              <h2 className="sec-title">Duration & timelines.</h2>
            </div>
            {durationMilestones.length > 0 && (
              <div className="duration-grid">
                {durationMilestones.map((d, i) => (
                  <div key={i} className="dur-card">
                    <div className="dur-icon" style={{ background: grads[i % grads.length] }}>{clockIcon}</div>
                    <h3>{d.label}</h3>
                    <div className="dur-val">{d.duration}</div>
                  </div>
                ))}
              </div>
            )}
            {estimatedTimeline && (
              <p style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)', marginTop: '1.5rem' }}>
                Total: {estimatedTimeline}
              </p>
            )}
          </div>
        </div>
      )}

      {/* S7 — Recovery */}
      {recoveryPhases.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Recovery</span></div>
              <h2 className="sec-title">Recovery & aftercare.</h2>
              <p className="sec-sub">What to expect at each stage after your treatment.</p>
            </div>
            <div className="recovery-tabs">
              {recoveryPhases.map((r, i) => (
                <button key={i} className={`rec-tab${activeRec === i ? ' active' : ''}`} onClick={() => setActiveRec(i)}>
                  {r.title}
                </button>
              ))}
            </div>
            <div className="rec-panel-inner">
              <h3>{recoveryPhases[activeRec]?.title}</h3>
              <p className="rec-phase-badge" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                {recoveryPhases[activeRec]?.phase}
              </p>
              <p>{recoveryPhases[activeRec]?.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* S8 — Outcomes */}
      {outcomes.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Outcomes</span></div>
              <h2 className="sec-title">Success & outcomes.</h2>
            </div>
            <div className="outcome-grid">
              {outcomes.map((o, i) => (
                <div key={i} className="outcome-card">
                  <div className="outcome-icon" style={{ background: grads[i % grads.length] }}>{checkIcon}</div>
                  <h3>{o.title}</h3>
                  <p>{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S9 — Misconceptions */}
      {misconceptions.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Myths vs Facts</span></div>
              <h2 className="sec-title">Common misconceptions.</h2>
            </div>
            <div className="myth-list">
              {misconceptions.map((m, i) => (
                <div key={i} className={`myth-item${openMyth === i ? ' open' : ''}`} onClick={() => setOpenMyth(openMyth === i ? null : i)}>
                  <div className="myth-q">
                    <span className="myth-badge">{openMyth === i ? 'Fact' : 'Myth'}</span>
                    <span>&ldquo;{m.myth}&rdquo;</span>
                    <div className="myth-toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  {openMyth === i && (
                    <div className="myth-a" style={{ padding: '0 1.5rem 1.25rem' }}>
                      <div className="myth-a-inner">
                        <span className="fact-badge">Fact</span>
                        <p>{m.reality}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S10 — If Not Treated */}
      {ifNotTreated && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="centered">
              <div className="warning-box">
                <div className="warning-icon">{warnIcon}</div>
                <div>
                  <h3>What happens if treatment is delayed?</h3>
                  <p>{ifNotTreated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S11 — When to See a Doctor */}
      {whenToSeeDoctor && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="centered">
              <div className="warning-box" style={{ borderColor: 'var(--primary)', background: 'var(--primary-pale)' }}>
                <div className="warning-icon" style={{ color: 'var(--primary)' }}>{warnIcon}</div>
                <div>
                  <h3 style={{ color: 'var(--primary)' }}>When should you act?</h3>
                  <p>{whenToSeeDoctor}</p>
                  {phone && (
                    <a href={`tel:${phone}`} className="cond-hero-cta" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                      Call {clinicName || 'Us'} — {phone} {arrowIcon}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S12 — Related Conditions */}
      {relatedConditions.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Related Care</span></div>
              <h2 className="sec-title">Conditions we treat.</h2>
            </div>
            <div className="test-grid">
              {relatedConditions.map((cond, i) => (
                <a key={i} href={`/conditions/${cond.slug}`} className="test-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <div className="test-icon" style={{ background: grads[i % grads.length] }}>{medIcon}</div>
                  <h3>{cond.name}</h3>
                  {cond.shortDescription && <p>{cond.shortDescription}</p>}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S13 — FAQ */}
      {faqs.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
              <h2 className="sec-title">About this procedure.</h2>
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
    </>
  )
}
