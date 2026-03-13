'use client'
import { useState } from 'react'

/* ── icons ── */
const checkIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const chevronIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
const warnIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const pulseIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
const medIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>

/* ── data ── */
const types = [
  {
    label: 'Type A',
    grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    icon: medIcon,
    title: 'Primary Form',
    desc: 'The most common presentation. Develops gradually and may have few noticeable symptoms in the early stages -- making regular screening and early detection especially important.',
  },
  {
    label: 'Type B',
    grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
    icon: warnIcon,
    title: 'Acute or Rapid-Onset Form',
    desc: 'Symptoms appear more suddenly and may require prompt attention. This presentation is typically easier to diagnose early because of its more noticeable clinical features.',
  },
  {
    label: 'Type C',
    grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
    icon: pulseIcon,
    title: 'Secondary Form',
    desc: 'Develops as a consequence of another underlying condition, injury, or medication. Management requires addressing both the primary cause and the condition itself.',
  },
]

const symptoms = [
  { color: 'var(--primary)', icon: pulseIcon, title: 'Early Symptoms', items: ['[Symptom 1] -- often subtle and easily overlooked', '[Symptom 2] -- may come and go initially', '[Symptom 3] -- typically the first sign patients report'] },
  { color: 'var(--secondary)', icon: warnIcon, title: 'Advanced Symptoms', items: ['[Symptom 4] -- indicates progression', '[Symptom 5] -- more persistent and noticeable', '[Symptom 6] -- affecting daily function'] },
  { color: 'var(--primary-dark)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>, title: 'Seek Urgent Review If', items: ['Sudden or severe worsening of symptoms', 'New symptoms developing rapidly', 'Pain, significant discomfort, or functional impairment'] },
]

const treatments = [
  {
    grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    title: 'Conservative Management',
    subtitle: 'First-Line Approach',
    body: 'Medication and lifestyle modification are the most common starting points. The aim is to control the condition and slow progression without more invasive intervention.',
    items: ['[Medication type] -- to manage the primary mechanism', '[Lifestyle change] -- reduces contributing factors', 'Regular monitoring -- to track response to treatment'],
    warn: ['[Warning sign 1]', '[Warning sign 2]'],
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
    title: 'Procedural Treatment',
    subtitle: 'When Conservative Management Is Insufficient',
    body: 'When medications or lifestyle changes do not achieve adequate control, procedural or surgical intervention may be recommended.',
    items: ['[Procedure type A] -- minimally invasive option', '[Procedure type B] -- more definitive intervention', 'Hospital or clinic-based depending on the approach'],
    warn: ['[Contraindication or risk to watch for]'],
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)',
    title: 'Ongoing Management',
    subtitle: 'Long-Term Care',
    body: 'Many conditions require long-term monitoring and periodic treatment adjustment. The goal is sustained control and prevention of progression.',
    items: ['Regular review appointments', 'Periodic reassessment and treatment optimisation', 'Patient education and self-monitoring guidance'],
    warn: [],
  },
]

const tests = [
  { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: 'Clinical Examination', desc: '[Description of primary clinical assessment performed at the first visit]' },
  { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>, title: 'Imaging / Diagnostic Test', desc: '[Description of imaging or diagnostic investigation used to assess the condition]' },
  { grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)', icon: pulseIcon, title: 'Functional Assessment', desc: '[Assessment of how the condition is affecting function -- e.g. field tests, mobility, pain scores]' },
  { grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>, title: 'Lab Tests / Blood Work', desc: '[Relevant blood tests, biomarkers, or pathology investigations where applicable]' },
]

const faqs = [
  { q: 'Is this condition curable?', a: 'Some forms of this condition can be fully resolved with treatment; others are managed long-term. Your doctor will explain the expected trajectory for your specific presentation.' },
  { q: 'How quickly does the condition progress?', a: 'Progression varies widely based on the type, severity, and individual factors. Early detection and consistent treatment significantly improve the likelihood of a stable outcome.' },
  { q: 'Will I need surgery?', a: 'Not necessarily. Most patients are first managed with conservative treatments. Surgery is considered when these do not achieve adequate control or when the condition is already at an advanced stage.' },
  { q: 'Can this condition affect my daily life?', a: 'Untreated, many conditions can affect daily function. With appropriate treatment and monitoring, most patients maintain a good quality of life. Your doctor will assess the impact and create a plan accordingly.' },
  { q: 'Is it hereditary?', a: 'Some conditions have a genetic component; others do not. If family history is relevant, your doctor will discuss whether screening for family members is advisable.' },
]

export default function ConditionDetail() {
  const [activeType, setActiveType] = useState(0)
  const [activeTreat, setActiveTreat] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>[Condition Name]</span>
      </nav>

      {/* S1 Hero */}
      <section className="cond-hero">
        <div className="cond-hero-text">
          <div className="sec-label"><span>Condition</span></div>
          <h1>[Condition Name]</h1>
          <p className="cond-hero-desc">[A clear, patient-friendly description of what this condition is, why it matters, how it develops, and what happens if left untreated. Detecting it early is important.]</p>
          <div className="hero-pills">
            <span className="hero-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{checkIcon} Treatable</span>
            <span className="hero-pill" style={{ background: '#EFF6FF', color: 'var(--secondary)' }}>{checkIcon} Early Detection Matters</span>
            <span className="hero-pill" style={{ background: 'var(--primary-pale)', color: 'var(--primary-dark)' }}>{checkIcon} Multiple Treatment Options</span>
          </div>
          <a href="/appointment" className="cond-hero-cta">
            Book a Consultation {arrowIcon}
          </a>
        </div>
        <div className="cond-hero-img" style={{ background: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary),var(--primary))' }}>{medIcon}</div>
      </section>

      {/* S2 Types */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Types</span></div>
            <h2 className="sec-title">Types of [Condition Name].</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>Understanding which type you have helps determine the right treatment approach.</p>
          </div>
          <div className="type-tabs">
            {types.map((t, i) => (
              <button key={i} className={`type-tab${activeType === i ? ' active' : ''}`} onClick={() => setActiveType(i)}>{t.label}</button>
            ))}
          </div>
          <div className="type-panel">
            <div className="type-icon" style={{ background: types[activeType].grad }}>{types[activeType].icon}</div>
            <div>
              <h3>{types[activeType].title}</h3>
              <p>{types[activeType].desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* S3 Symptoms */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Symptoms</span></div>
            <h2 className="sec-title">Signs and symptoms.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>Recognising symptoms early gives you the best chance of effective treatment.</p>
          </div>
          <div className="symptom-grid">
            {symptoms.map((s, i) => (
              <div key={i} className="symptom-card">
                <div className="symp-icon" style={{ color: s.color }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <ul>{s.items.map((item, j) => <li key={j}>{checkIcon}{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S4 Diagnosis */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Diagnosis</span></div>
            <h2 className="sec-title">How we diagnose this condition.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>A structured series of tests to accurately identify the type and severity of the condition.</p>
          </div>
          <div className="test-grid">
            {tests.map((t, i) => (
              <div key={i} className="test-card">
                <div className="test-icon" style={{ background: t.grad }}>{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S5 Treatment */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header">
            <div className="sec-label"><span>Treatment</span></div>
            <h2 className="sec-title">Treatment options.</h2>
            <p className="sec-sub">Treatment is tailored to the type, severity, and individual circumstances of each patient.</p>
          </div>
          <div className="treat-tabs">
            {treatments.map((t, i) => (
              <button key={i} className={`treat-tab${activeTreat === i ? ' active' : ''}`} onClick={() => setActiveTreat(i)}>{t.title}</button>
            ))}
          </div>
          <div className="treat-panel">
            <div className="treat-panel-header" style={{ background: treatments[activeTreat].grad }}>
              <h3>{treatments[activeTreat].title}</h3>
              <span>{treatments[activeTreat].subtitle}</span>
            </div>
            <div className="treat-panel-body" style={{ padding: '1.5rem' }}>
              <p>{treatments[activeTreat].body}</p>
              <ul className="treat-includes">
                {treatments[activeTreat].items.map((item, j) => <li key={j}>{checkIcon}{item}</li>)}
              </ul>
              {treatments[activeTreat].warn.length > 0 && (
                <div className="treat-warn">
                  {warnIcon}
                  <ul>{treatments[activeTreat].warn.map((w, j) => <li key={j}>{w}</li>)}</ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* S6 When to Seek Help */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="centered">
            <div className="warning-box">
              <div className="warning-icon">{warnIcon}</div>
              <div>
                <h3>When should you seek urgent care?</h3>
                <p>Please contact the clinic or visit an emergency facility if you experience:</p>
                <ul>
                  <li>Sudden or rapidly worsening symptoms</li>
                  <li>Severe pain or significant discomfort that is new or unusual</li>
                  <li>Loss of function or ability to perform normal activities</li>
                  <li>Acute angle-closure emergency -- symptoms that appear without warning</li>
                  <li>Any symptom that concerns you -- do not wait for a scheduled appointment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* S7 FAQ */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
            <h2 className="sec-title">About [Condition Name].</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <div className="faq-toggle">{chevronIcon}</div>
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
