'use client'
// ─────────────────────────────────────────────────────────────
// components/condition/ConditionDetail.tsx
// Locked design: 2026-03-15
// Cross-checked against reference HTML — exact class names used
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'

// ── Step icons (reference order: chat, search, doc, check) ────
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
const stageBadgeColors = ['#3CB8AF', '#D68910', '#EF4444']
const stageLabels = ['Early Stage', 'Moderate', 'Advanced']
const stageSubLabels = ['Mild discomfort', 'Increasing impact', 'Significant limitation']
const recBadgeColors = ['#3CB8AF', '#1B6FA8', '#0D3B5E']
const typeIconGrads = [
  'linear-gradient(135deg,#3CB8AF,#2A9D8F)',
  'linear-gradient(135deg,#1B6FA8,#145A8A)',
  'linear-gradient(135deg,#0D3B5E,#0A2E4A)',
]
const outcomeIconGrads = [
  'linear-gradient(135deg,#3CB8AF,#2A9D8F)',
  'linear-gradient(135deg,#1B6FA8,#145A8A)',
  'linear-gradient(135deg,#0D3B5E,#0A2E4A)',
  'linear-gradient(135deg,#D68910,#B7770A)',
]
// sf-1..sf-4 classes set badge + icon colors via CSS
const sfClasses = ['sf-1','sf-2','sf-3','sf-4']

export interface ConditionDetailProps {
  name: string
  slug: string
  description: string
  pills?: string[]
  heroStats?: { label: string; value: string }[]
  heroImage?: string | null
  icd10Code?: string
  prevalence?: string
  progressionType?: string
  diagnosisMethod?: string
  types?: { name: string; description: string }[]
  causes?: string[]
  symptoms?: { early?: string[]; moderate?: string[]; advanced?: string[] }
  treatments?: {
    name: string; shortDescription?: string; description: string
    invasiveness?: string
    invasivenessStyle?: { background: string; color: string }
    items?: string[]
  }[]
  howWeHandle?: { title: string; description: string }[]
  recoveryPhases?: {
    label: string; title: string; description: string
    timeline?: { badge: string; text: string }[]
    warnings?: string[]
  }[]
  outcomes?: { title: string; description: string }[]
  ifNotTreated?: string
  whenToSeeDoctor?: { intro?: string; items?: string[] }
  relatedProcedures?: { name: string; slug: string }[]
  faqs?: { question: string; answer: string }[]
  clinicName?: string
  clinicAddress?: string
  clinicHours?: string
  whatsappNumber?: string
  appointmentUrl?: string
}

export default function ConditionDetail({
  name = 'Condition',
  description = '',
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
  clinicAddress = '',
  clinicHours = '',
  whatsappNumber = '',
  appointmentUrl = '/appointment',
}: ConditionDetailProps) {
  const [activeType,   setActiveType]   = useState(0)
  const [activeTreat,  setActiveTreat]  = useState<number | null>(0)
  const [activeRecTab, setActiveRecTab] = useState(0)
  const [openFaq,      setOpenFaq]      = useState<number | null>(null)

  const symptomGroups = [
    { items: symptoms?.early    ?? [], idx: 0 },
    { items: symptoms?.moderate ?? [], idx: 1 },
    { items: symptoms?.advanced ?? [], idx: 2 },
  ].filter(g => g.items.length > 0)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/conditions">Conditions</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{name}</span>
      </nav>

      {/* S1 — Hero */}
      <section className="cond-hero">
        <div className="cond-hero-text">
          <div className="sec-label"><span>Condition</span></div>
          <h1>{name}</h1>
          <p className="cond-hero-desc">{description}</p>
          <div className="hero-pills">
            {(pills.length > 0 ? pills : ['Treatable','Early Detection Matters','Multiple Options']).map((pill, i) => (
              <span key={i} className="hero-pill" style={pillStyles[i % pillStyles.length]}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
                {' '}{pill}
              </span>
            ))}
          </div>
          {heroStats.length > 0 && (
            <div className="hero-stats">
              {heroStats.map((s, i) => (
                <div key={i}>
                  <div className="hero-stat-num">{s.value}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <a href={appointmentUrl} className="cond-hero-cta">
            Book a Consultation
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
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </div>
      </section>

      {/* S2 — Quick Facts */}
      {(icd10Code || prevalence || progressionType || diagnosisMethod) && (
        <div className="sec-white">
          <div className="sec-pad" style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label"><span>Quick Facts</span></div>
              <h2 className="sec-title">At a glance.</h2>
            </div>
            <div className="qf-card">
              <div className="qf-head">Clinical Overview</div>
              {icd10Code && <div className="qf-row"><span className="qf-label">ICD-10 Code</span><span className="qf-val">{icd10Code}</span></div>}
              {prevalence && <div className="qf-row"><span className="qf-label">Prevalence</span><span className="qf-val">{prevalence}</span></div>}
              {progressionType && <div className="qf-row"><span className="qf-label">Progression Type</span><span className="qf-val">{progressionType}</span></div>}
              {diagnosisMethod && <div className="qf-row"><span className="qf-label">Diagnosis Method</span><span className="qf-val">{diagnosisMethod}</span></div>}
            </div>
          </div>
        </div>
      )}

      {/* S3 — Types (was S2) */}
      {types.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Types</span></div>
              <h2 className="sec-title">Types of {name.toLowerCase()}.</h2>
            </div>
            {/* NOTE: class is "types-tabs" (with 's') — from reference */}
            <div className="types-tabs">
              {types.map((t, i) => (
                <span key={i} className={`type-tab${activeType === i ? ' active' : ''}`} onClick={() => setActiveType(i)}>
                  {t.name}
                </span>
              ))}
            </div>
            {/* type-panel > type-panel-inner > type-icon + type-info — exact reference */}
            {types.map((t, i) => (
              <div key={i} className={`type-panel${activeType === i ? ' active' : ''}`}>
                <div className="type-panel-inner">
                  <div className="type-icon" style={{ background: typeIconGrads[i % typeIconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    </svg>
                  </div>
                  <div className="type-info">
                    <h3>{t.name}</h3>
                    <p>{t.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* S3 — Causes */}
      {causes.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Causes</span></div>
              <h2 className="sec-title">What causes {name.toLowerCase()}?</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>Multiple factors can contribute to the development and progression of this condition.</p>
            </div>
            <div className="cause-grid">
              {causes.map((cause, i) => (
                <div key={i} className="cause-pill">
                  <div className="cause-icon" style={{ background: typeIconGrads[i % typeIconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  {cause}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S4 — Symptoms */}
      {symptomGroups.length > 0 && (
        <div className="sec-teal">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Symptoms</span></div>
              <h2 className="sec-title">Signs to look out for.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>
                {name} develops gradually. Recognising symptoms early gives you more treatment options.
              </p>
            </div>
            <div className="symptom-timeline">
              {symptomGroups.map((group, gi) => (
                <div key={gi}>
                  {gi > 0 && <div className="stage-divider" />}
                  <div className="symptom-stage">
                    <div className="stage-header">
                      <span className="stage-badge" style={{ background: stageBadgeColors[group.idx] }}>
                        {stageLabels[group.idx]}
                      </span>
                      <span className="stage-label">{stageSubLabels[group.idx]}</span>
                    </div>
                    <div className="symptom-items">
                      {group.items.map((item, ii) => (
                        <div key={ii} className="symptom-row">
                          <span className="sym-dot" style={{ background: stageBadgeColors[group.idx] }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12" height="12">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S5 — Treatment */}
      {treatments.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Treatment</span></div>
              <h2 className="sec-title">Treatment options available.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>
                From conservative to surgical — we always start with the least invasive option first.
              </p>
            </div>
            <div className="treat-grid">
              {treatments.map((t, i) => {
                const isActive = activeTreat === i
                return (
                  <div key={i} className="treat-item">
                    <div className={`treat-card${isActive ? ' active' : ''}`} onClick={() => setActiveTreat(isActive ? null : i)}>
                      <div className="ts-node" style={{ background: typeIconGrads[i % typeIconGrads.length] }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                      </div>
                      <div className="ts-label">{t.name}</div>
                      <div className="ts-desc">{t.shortDescription ?? t.description}</div>
                      {/* NOTE: class is "ts-invasive" not "ts-inv" */}
                      {t.invasiveness && (
                        <span className="ts-invasive" style={t.invasivenessStyle ?? { background: '#F0FDFA', color: '#3CB8AF' }}>
                          {t.invasiveness}
                        </span>
                      )}
                      <div className="ts-hint">
                        View details
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                    {isActive && t.items && t.items.length > 0 && (
                      <div className="ts-expand open">
                        <h3>{t.name}</h3>
                        <ul>{t.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* S6 — How We Handle */}
      {howWeHandle.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Our Approach</span></div>
              <h2 className="sec-title">How we handle this condition.</h2>
              <p className="sec-sub" style={{ margin: '0 auto' }}>A structured, patient-first approach from first visit to full recovery.</p>
            </div>
            {/* steps-flow: sf-card sf-N + sf-arrow-h + sf-arrow-v alternating — exact reference */}
            <div className="steps-flow">
              {howWeHandle.map((step, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div className={`sf-card ${sfClasses[i % sfClasses.length]}`}>
                    <div className="sf-top">
                      <span className="sf-badge">Step {String(i + 1).padStart(2, '0')}</span>
                      <div className="sf-icon">{stepIcons[i % stepIcons.length]}</div>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {i < howWeHandle.length - 1 && (
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

      {/* S7 — Recovery */}
      {recoveryPhases.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header">
              <div className="sec-label"><span>Recovery</span></div>
              <h2 className="sec-title">Recovery & aftercare.</h2>
              <p className="sec-sub">What to expect at each phase of recovery.</p>
            </div>
            <div className="recovery-tabs">
              {recoveryPhases.map((phase, i) => (
                <span key={i} className={`rec-tab${activeRecTab === i ? ' active' : ''}`} onClick={() => setActiveRecTab(i)}>
                  {phase.label}
                </span>
              ))}
            </div>
            {/* rec-panel > rec-panel-inner — exact reference structure */}
            {recoveryPhases.map((phase, i) => (
              <div key={i} className={`rec-panel${activeRecTab === i ? ' active' : ''}`}>
                <div className="rec-panel-inner">
                  <h3>{phase.title}</h3>
                  {phase.description && <p>{phase.description}</p>}
                  {(phase.timeline ?? []).length > 0 && (
                    <div className="rec-timeline">
                      {phase.timeline!.map((row, j) => (
                        <div key={j} className="rec-tl-row">
                          <span className="rec-tl-badge" style={{ background: recBadgeColors[j % recBadgeColors.length] }}>
                            {row.badge}
                          </span>
                          <span className="rec-tl-text">{row.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {(phase.warnings ?? []).length > 0 && (
                    <div className="rec-warning">
                      <h4>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        {' '}Watch for
                      </h4>
                      <ul>{phase.warnings!.map((w, j) => <li key={j}>{w}</li>)}</ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* S8 — Outcomes */}
      {outcomes.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Outcomes</span></div>
              <h2 className="sec-title">Success & outcomes.</h2>
            </div>
            <div className="outcome-grid">
              {outcomes.map((o, i) => (
                <div key={i} className="outcome-card">
                  <div className="outcome-icon" style={{ background: outcomeIconGrads[i % outcomeIconGrads.length] }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>{o.title}</h3>
                  <p>{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* S9 — If Not Treated */}
      {ifNotTreated && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="centered">
              <div className="warning-box">
                <div className="warning-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h3>What happens if {name} is left untreated?</h3>
                  <p>{ifNotTreated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S10 — When to See Doctor */}
      {whenToSeeDoctor && (whenToSeeDoctor.intro || (whenToSeeDoctor.items ?? []).length > 0) && (
        <div className="sec-teal">
          <div className="sec-pad">
            <div className="centered">
              <div className="see-doctor-box">
                <div className="see-doc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div>
                  <h3>When should you see a doctor?</h3>
                  {whenToSeeDoctor.intro && <p>{whenToSeeDoctor.intro}</p>}
                  {(whenToSeeDoctor.items ?? []).length > 0 && (
                    <ul>{whenToSeeDoctor.items!.map((item, i) => <li key={i}>{item}</li>)}</ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S11 — FAQ */}
      {faqs.length > 0 && (
        <div className="sec-white">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
              <h2 className="sec-title">About {name.toLowerCase()}.</h2>
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

      {/* S12 — Related Procedures (optional) */}
      {relatedProcedures.length > 0 && (
        <div className="sec-grey">
          <div className="sec-pad">
            <div className="sec-header" style={{ textAlign: 'center' }}>
              <div className="sec-label" style={{ justifyContent: 'center' }}><span>Related Care</span></div>
              <h2 className="sec-title">Procedures we offer.</h2>
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

      {/* CTA Band */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="cta-band-content">
            <h2>Don&apos;t let {name.toLowerCase()} hold you back.</h2>
            <p>Early treatment means more options and better outcomes. Book a consultation to understand your condition and explore the right path forward.</p>
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
