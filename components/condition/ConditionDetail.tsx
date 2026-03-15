'use client'
// ─────────────────────────────────────────────────────────────
// components/condition/ConditionDetail.tsx
// FULL REWRITE — was hardcoded, now fully dynamic via props
// Matches ALL existing CSS class names exactly (no style changes)
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'

// ── Icons ────────────────────────────────────────────────────
const checkIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const chevronIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
const warnIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const medIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
const pulseIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>

const typeGrads = [
  'linear-gradient(135deg,var(--primary),var(--primary-dark))',
  'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
  'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
]
const symptomColors = ['var(--primary)', 'var(--secondary)', 'var(--primary-dark)']
const treatGrads = [
  'linear-gradient(135deg,var(--primary),var(--primary-dark))',
  'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
  'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
]

// ── Props ─────────────────────────────────────────────────────
export interface ConditionDetailProps {
  name: string
  slug: string
  description: string
  shortDescription?: string
  pills?: string[]
  heroStats?: { label: string; value: string }[]
  heroImage?: string | null

  // Quick facts
  icd10Code?: string
  prevalence?: string
  progressionType?: string
  diagnosisMethod?: string

  // Types (3 tabs)
  types?: { name: string; description: string }[]

  // Causes
  causes?: string[]

  // Symptoms — 3 stages
  symptoms?: {
    early?: string[]
    moderate?: string[]
    advanced?: string[]
  }

  // Treatments (expandable tabs)
  treatments?: { name: string; description: string; risks?: string[] }[]

  // How we handle (4 steps)
  howWeHandle?: { step: string; title: string; description: string }[]

  // Recovery (3 phases)
  recoveryPhases?: { phase: string; title: string; description: string }[]

  // Outcomes (4 cards)
  outcomes?: { title: string; description: string }[]

  // If not treated
  ifNotTreated?: string

  // When to see doctor
  whenToSeeDoctor?: string

  // Related procedures (cross-linked)
  relatedProcedures?: { name: string; slug: string; shortDescription?: string }[]

  // FAQs
  faqs?: { question: string; answer: string }[]

  // Clinic context
  clinicName?: string
  doctorName?: string
  phone?: string
  city?: string
  mapUrl?: string | null
}

// ── Component ─────────────────────────────────────────────────
export default function ConditionDetail({
  name = 'Condition',
  slug = '',
  description = '',
  shortDescription = '',
  pills = [],
  heroStats = [],
  heroImage,
  icd10Code,
  prevalence,
  progressionType,
  diagnosisMethod,
  types = [],
  causes = [],
  symptoms,
  treatments = [],
  howWeHandle = [],
  recoveryPhases = [],
  outcomes = [],
  ifNotTreated,
  whenToSeeDoctor,
  relatedProcedures = [],
  faqs = [],
  clinicName = '',
  doctorName = '',
  phone = '',
  city = '',
  mapUrl,
}: ConditionDetailProps) {
  const [activeType,  setActiveType]  = useState(0)
  const [activeTreat, setActiveTreat] = useState(0)
  const [openFaq,     setOpenFaq]     = useState<number | null>(null)

  // Normalise symptoms into 3-column display
  const symptomGroups = [
    { title: 'Early Symptoms',    items: symptoms?.early    ?? [] },
    { title: 'Moderate Symptoms', items: symptoms?.moderate ?? [] },
    { title: 'Advanced Symptoms', items: symptoms?.advanced ?? [] },
  ].filter(g => g.items.length > 0)

  // Quick facts rows — only show if value exists
  const quickFacts = [
    { label: 'ICD-10 Code',       value: icd10Code },
    { label: 'Prevalence',        value: prevalence },
    { label: 'Progression Type',  value: progressionType },
    { label: 'Diagnosis Method',  value: diagnosisMethod },
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
          <div className="sec-label"><span>Condition</span></div>
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
              <span className="hero-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{checkIcon} Treatable</span>
              <span className="hero-pill" style={{ background: '#EFF6FF', color: 'var(--secondary)' }}>{checkIcon} Early Detection Matters</span>
              <span className="hero-pill" style={{ background: 'var(--primary-pale)', color: 'var(--primary-dark)' }}>{checkIcon} Multiple Treatment Options</span>
            </div>
          )}

          {heroStats.length > 0 && (
            <div className="hero-stats">
              {heroStats.map((stat, i) => (
                <div key={i}>
                  <div className="hero-stat-num">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <a href="/appointment" className="cond-hero-cta">
            Book a Consultation {arrowIcon}
          </a>
        </div>

        <div className="cond-hero-img" style={{ background: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary),var(--primary))', position: 'relative', overflow: 'hidden' }}>
          {heroImage ? (
            <Image
              src={heroImage}
              alt={`${name} treatment at ${clinicName}`}
              fill
              style={{ objectFit: 'cover', borderRadius: '16px' }}
              priority
            />
          ) : medIcon}
        </div>
      </section>

      {/* S2 — Quick Facts (ICD, prevalence, etc.) */}
      {quickFacts.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>At a Glance</span></div>
              <h2 className="sec-title">Quick Facts about {name}.</h2>
            </div>
            <div className="test-grid">
              {quickFacts.map((f, i) => (
                <div key={i} className="test-card">
                  <div className="test-icon" style={{ background: typeGrads[i % typeGrads.length] }}>{pulseIcon}</div>
                  <h3>{f.label}</h3>
                  <p>{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S3 — Types */}
      {types.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Types</span></div>
              <h2 className="sec-title">Types of {name}.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Understanding which type you have helps determine the right treatment approach.</p>
            </div>
            <div className="type-tabs">
              {types.map((t, i) => (
                <button key={i} className={`type-tab${activeType === i ? ' active' : ''}`} onClick={() => setActiveType(i)}>
                  {t.name}
                </button>
              ))}
            </div>
            <div className="type-panel">
              <div className="type-icon" style={{ background: typeGrads[activeType % typeGrads.length] }}>{medIcon}</div>
              <div>
                <h3>{types[activeType]?.name}</h3>
                <p>{types[activeType]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S4 — Causes */}
      {causes.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Root Causes</span></div>
              <h2 className="sec-title">What causes {name}?</h2>
            </div>
            <div className="symptom-grid">
              {causes.map((cause, i) => (
                <div key={i} className="symptom-card">
                  <div className="symp-icon" style={{ color: symptomColors[i % symptomColors.length] }}>{pulseIcon}</div>
                  <p>{cause}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S5 — Symptoms */}
      {symptomGroups.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Symptoms</span></div>
              <h2 className="sec-title">Signs and symptoms.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Recognising symptoms early gives you the best chance of effective treatment.</p>
            </div>
            <div className="symptom-grid">
              {symptomGroups.map((group, i) => (
                <div key={i} className="symptom-card">
                  <div className="symp-icon" style={{ color: symptomColors[i % symptomColors.length] }}>{pulseIcon}</div>
                  <h3>{group.title}</h3>
                  <ul>{group.items.map((item, j) => <li key={j}>{checkIcon}{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S6 — Treatments */}
      {treatments.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Treatment</span></div>
              <h2 className="sec-title">Treatment options.</h2>
              <p className="sec-sub">Treatment is tailored to the type, severity, and individual circumstances of each patient.</p>
            </div>
            <div className="treat-tabs">
              {treatments.map((t, i) => (
                <button key={i} className={`treat-tab${activeTreat === i ? ' active' : ''}`} onClick={() => setActiveTreat(i)}>
                  {t.name}
                </button>
              ))}
            </div>
            <div className="treat-panel">
              <div className="treat-panel-header" style={{ background: treatGrads[activeTreat % treatGrads.length] }}>
                <h3>{treatments[activeTreat]?.name}</h3>
              </div>
              <div className="treat-panel-body" style={{ padding: '1.5rem' }}>
                <p>{treatments[activeTreat]?.description}</p>
                {(treatments[activeTreat]?.risks ?? []).length > 0 && (
                  <div className="treat-warn">
                    {warnIcon}
                    <ul>{treatments[activeTreat].risks!.map((w, j) => <li key={j}>{w}</li>)}</ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S7 — How We Handle */}
      {howWeHandle.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>{clinicName ? `At ${clinicName}` : 'Our Approach'}</span></div>
              <h2 className="sec-title">How we handle it.</h2>
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

      {/* S8 — Recovery */}
      {recoveryPhases.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Recovery</span></div>
              <h2 className="sec-title">What to expect.</h2>
            </div>
            <div className="outcome-grid">
              {recoveryPhases.map((phase, i) => (
                <div key={i} className="outcome-card">
                  <div className="outcome-icon" style={{ background: typeGrads[i % typeGrads.length] }}>{pulseIcon}</div>
                  <h3>{phase.title}</h3>
                  <p className="rec-phase-label" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{phase.phase}</p>
                  <p>{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S9 — Outcomes */}
      {outcomes.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Results</span></div>
              <h2 className="sec-title">Expected outcomes.</h2>
            </div>
            <div className="outcome-grid">
              {outcomes.map((o, i) => (
                <div key={i} className="outcome-card">
                  <div className="outcome-icon" style={{ background: typeGrads[i % typeGrads.length] }}>{checkIcon}</div>
                  <h3>{o.title}</h3>
                  <p>{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S10 — If Not Treated */}
      {ifNotTreated && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="centered">
              <div className="warning-box">
                <div className="warning-icon">{warnIcon}</div>
                <div>
                  <h3>What happens if {name} is left untreated?</h3>
                  <p>{ifNotTreated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S11 — When to See a Doctor */}
      {whenToSeeDoctor && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="centered">
              <div className="warning-box" style={{ borderColor: 'var(--primary)', background: 'var(--primary-pale)' }}>
                <div className="warning-icon" style={{ color: 'var(--primary)' }}>{warnIcon}</div>
                <div>
                  <h3 style={{ color: 'var(--primary)' }}>When should you see a doctor?</h3>
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

      {/* S12 — Related Procedures */}
      {relatedProcedures.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Related Care</span></div>
              <h2 className="sec-title">Procedures we offer.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>These procedures are commonly used to treat or diagnose {name}.</p>
            </div>
            <div className="test-grid">
              {relatedProcedures.map((proc, i) => (
                <a key={i} href={`/procedures/${proc.slug}`} className="test-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <div className="test-icon" style={{ background: typeGrads[i % typeGrads.length] }}>{medIcon}</div>
                  <h3>{proc.name}</h3>
                  {proc.shortDescription && <p>{proc.shortDescription}</p>}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S13 — FAQ */}
      {faqs.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
              <h2 className="sec-title">About {name}.</h2>
            </div>
            <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className={`faq-item${openFaq === i ? ' open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                >
                  <div className="faq-q">
                    <span itemProp="name">{f.question}</span>
                    <div className="faq-toggle">{chevronIcon}</div>
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
