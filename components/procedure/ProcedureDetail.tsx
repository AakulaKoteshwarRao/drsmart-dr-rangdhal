'use client'
import { useState } from 'react'

const checkIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
const warnIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const shieldIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const clockIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const medIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>

const candidacy = [
  { color: 'var(--primary)', text: 'Condition confirmed after thorough clinical assessment' },
  { color: 'var(--secondary)', text: 'Conservative management has been attempted or is not suitable' },
  { color: '#0F2259', text: 'Patient is in good general health and medically fit for the procedure' },
  { color: 'var(--primary-dark)', text: 'Realistic expectations discussed and understood' },
  { color: 'var(--primary)', text: 'No contraindications identified at pre-procedure evaluation' },
  { color: 'var(--secondary)', text: 'Consent obtained after full disclosure of risks and alternatives' },
]

const procSteps = [
  { num: '1', grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', title: 'Pre-procedure Assessment', desc: 'Comprehensive evaluation to confirm suitability and plan the approach' },
  { num: '2', grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', title: 'Preparation', desc: 'Patient positioned and prepared; anaesthesia administered as required' },
  { num: '3', grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)', title: 'The Procedure', desc: 'Procedure performed using appropriate technique and equipment' },
  { num: '4', grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', title: 'Immediate Review', desc: 'Post-procedure check before patient is cleared for discharge' },
  { num: '5', grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', title: 'Follow-Up', desc: 'Scheduled review to monitor recovery and confirm outcome' },
]

const transparency = [
  { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: 'Expected Outcomes', items: ['Majority of suitable patients achieve the desired result', 'Outcomes depend on the specific condition and its severity', 'Your doctor will give you a realistic success estimate'] },
  { grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', icon: warnIcon, title: 'Possible Risks', items: ['Temporary discomfort or swelling at the treatment site', 'Small risk of infection managed with standard precautions', 'Rarely: insufficient result requiring additional treatment'] },
  { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: shieldIcon, title: 'Side Effects', items: ['Mild soreness or sensitivity in the first 24-48 hours', 'Temporary restrictions on activity during recovery', 'Most side effects resolve within a short period'] },
]

const durations = [
  { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>, title: 'Consultation', val: '30-45 min', desc: 'Full assessment and planning' },
  { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: clockIcon, title: 'Procedure', val: 'Varies', desc: 'Depends on technique and complexity' },
  { grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>, title: 'Initial Recovery', val: '24-48 hrs', desc: 'Rest and restricted activity' },
  { grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title: 'Full Recovery', val: 'Days-Weeks', desc: 'Timeline discussed at consultation' },
  { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: 'Follow-ups', val: '2-4 visits', desc: 'Monitoring and outcome review' },
]

const recoveryTabs = [
  { label: 'Day 1', title: 'Immediately After the Procedure', intro: 'What to expect on the day and how to care for yourself in the first hours.', timeline: [{ badge: '#3CB8AF', period: 'Hour 1-2', text: 'Post-procedure review completed before discharge' }, { badge: '#1E3A8A', period: 'Day 1', text: 'Rest advised; follow all aftercare instructions given by the team' }, { badge: '#0F2259', period: 'Evening', text: 'Take prescribed medications as directed; avoid strenuous activity' }], warn: ['Severe or worsening pain beyond expected discomfort', 'Any unusual symptoms -- contact the clinic immediately'] },
  { label: 'Week 1-4', title: 'Early Recovery Period', intro: 'Most patients see steady improvement during the first few weeks.', timeline: [{ badge: '#3CB8AF', period: 'Week 1', text: 'Gradual return to daily activities as comfort allows' }, { badge: '#1E3A8A', period: 'Week 2-3', text: 'Initial signs of improvement become apparent' }, { badge: '#0F2259', period: 'Week 4', text: 'First follow-up review to assess early outcomes' }], warn: ['Persistent or increasing discomfort at follow-up', 'No sign of expected improvement -- discuss with your doctor'] },
  { label: 'Ongoing', title: 'Long-Term Recovery & Maintenance', intro: 'Full recovery and sustainable results require monitoring and adherence to the care plan.', timeline: [{ badge: '#3CB8AF', period: 'Month 1-3', text: 'Continued improvement; second review appointment' }, { badge: '#1E3A8A', period: 'Month 3-6', text: 'Long-term outcome assessed; maintenance plan established' }, { badge: '#D68910', period: 'Ongoing', text: 'Annual or periodic reviews as recommended by your doctor' }], warn: [] },
]

const outcomes = [
  { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: 'High Success Rate', body: 'The majority of appropriately selected patients achieve satisfactory outcomes following this procedure.' },
  { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: clockIcon, title: 'Durable Results', body: 'Outcomes are designed to be long-lasting. The duration and maintenance requirements are discussed during your consultation.' },
  { grad: 'linear-gradient(135deg,var(--secondary-deep),#0A1A3E)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, title: 'Individual Factors', body: 'Age, overall health, condition severity, and adherence to aftercare all influence the final outcome.' },
  { grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, title: 'Quality of Life', body: 'Successful treatment leads to measurable improvement in comfort, function, and daily quality of life.' },
]

const myths = [
  { myth: '"The procedure is painful."', fact: 'Modern techniques and appropriate anaesthesia ensure patient comfort throughout. Most patients report minimal discomfort during the procedure itself.' },
  { myth: '"Recovery takes months."', fact: 'Recovery timelines vary by procedure. Many patients resume normal activities within days to weeks. Your doctor will give you a realistic expectation specific to your case.' },
  { myth: '"Surgery always has high risk."', fact: 'All procedures carry some risk, but modern techniques have made most procedures very safe. Risks are minimised through thorough pre-assessment and experienced surgical technique.' },
  { myth: '"One procedure fixes everything permanently."', fact: 'Results vary. Some procedures offer permanent relief; others require periodic maintenance. Your doctor will explain the expected longevity of your specific treatment plan.' },
]

const faqs = [
  { q: 'How do I know if I am suitable for this procedure?', a: 'Suitability is assessed during a dedicated consultation. The doctor will review your history, perform a clinical examination, and order any required tests before making a recommendation.' },
  { q: 'Is this procedure done under general anaesthesia?', a: 'This depends on the specific procedure. Some are performed under local anaesthesia, others under sedation or general anaesthesia. The appropriate approach will be discussed during your consultation.' },
  { q: 'How long will the results last?', a: 'Durability depends on the procedure and individual factors. The doctor will give you a realistic expectation based on your specific condition and current evidence.' },
  { q: 'What if the procedure does not work for me?', a: 'If the primary procedure does not achieve the desired outcome, further treatment options will be reviewed and discussed. A personalised plan will always be in place.' },
  { q: 'Is this covered by insurance?', a: 'Coverage varies by plan and insurer. Our team will assist with pre-authorisation paperwork and advise on cashless processing where applicable.' },
]

export default function ProcedureDetail() {
  const [activeRec, setActiveRec] = useState(0)
  const [openMyth, setOpenMyth] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>[Procedure Name]</span>
      </nav>

      {/* S1 Hero */}
      <section className="cond-hero">
        <div className="cond-hero-text">
          <div className="sec-label"><span>Procedure</span></div>
          <h1>[Procedure Name]</h1>
          <p className="cond-hero-desc">[A brief description of this procedure, what it treats, how it works, and what the patient can expect as an outcome.]</p>
          <div className="hero-pills">
            <span className="hero-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{checkIcon} [Key Benefit 1]</span>
            <span className="hero-pill" style={{ background: '#EFF6FF', color: 'var(--secondary)' }}>{checkIcon} [Key Benefit 2]</span>
            <span className="hero-pill" style={{ background: 'var(--primary-pale)', color: 'var(--primary-dark)' }}>{checkIcon} [Key Benefit 3]</span>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-num">[X%]</div><div className="hero-stat-label">Success Rate</div></div>
            <div><div className="hero-stat-num">[Duration]</div><div className="hero-stat-label">Procedure Time</div></div>
            <div><div className="hero-stat-num">[X Days]</div><div className="hero-stat-label">Recovery</div></div>
          </div>
        </div>
        <div className="cond-hero-img" style={{ background: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary),var(--primary))' }}>{medIcon}</div>
      </section>

      {/* S2 Candidacy */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Candidacy</span></div>
            <h2 className="sec-title">Who is this procedure recommended for?</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>This procedure is suitable for patients who meet the clinical criteria established during assessment.</p>
          </div>
          <div className="cand-grid">
            {candidacy.map((c, i) => (
              <div key={i} className="cand-card">
                <div className="cand-dot" style={{ background: c.color }}>{checkIcon}</div>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S3 Transparency */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Transparency</span></div>
            <h2 className="sec-title">What you should know before treatment.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>We believe in honest, upfront disclosure so you can make an informed decision.</p>
          </div>
          <div className="transparency-cards">
            {transparency.map((t, i) => (
              <div key={i} className="transp-card">
                <div className="transp-icon" style={{ background: t.grad }}>{t.icon}</div>
                <h3>{t.title}</h3>
                <ul>{t.items.map((li, j) => <li key={j}>{li}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="risk-note">{shieldIcon}<span>All risks and benefits are discussed in detail during your consultation. Our team takes every precaution to ensure your safety.</span></div>
        </div>
      </div>

      {/* S4 Procedure Steps */}
      <div className="sec-teal">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Procedure</span></div>
            <h2 className="sec-title">How this procedure works.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>A step-by-step look at what happens during your treatment.</p>
          </div>
          <div className="proc-steps">
            {procSteps.map((s, i) => (
              <div key={i} className="proc-step">
                {i > 0 && <div className="proc-step-line" />}
                <div className="proc-num" style={{ background: s.grad }}>{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S5 Our Approach */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Our Approach</span></div>
            <h2 className="sec-title">How we handle this procedure.</h2>
          </div>
          <div className="steps-flow">
            {[
              { step: '01', title: 'Full Assessment', desc: 'Complete clinical evaluation to confirm suitability and plan the procedure appropriately.' },
              { step: '02', title: 'Treatment Planning', desc: 'Procedure parameters set based on individual findings; patient informed of the full plan.' },
              { step: '03', title: 'The Procedure', desc: 'Performed with precision and care using appropriate equipment and technique.' },
              { step: '04', title: 'Review & Follow-Up', desc: 'Post-procedure review scheduled; outcomes monitored and long-term plan established.' },
            ].map((s, i) => (
              <div key={i} className="sf-card">
                <div className="sf-top"><span className="sf-badge">{s.step}</span></div>
                <h3 className="sf-title">{s.title}</h3>
                <p className="sf-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S6 Duration */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Timelines</span></div>
            <h2 className="sec-title">Duration & timelines.</h2>
          </div>
          <div className="duration-grid">
            {durations.map((d, i) => (
              <div key={i} className="dur-card">
                <div className="dur-icon" style={{ background: d.grad }}>{d.icon}</div>
                <h3>{d.title}</h3>
                <div className="dur-val">{d.val}</div>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S7 Recovery */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header">
            <div className="sec-label"><span>Recovery</span></div>
            <h2 className="sec-title">Recovery & aftercare.</h2>
            <p className="sec-sub">What to expect at each stage after your treatment.</p>
          </div>
          <div className="recovery-tabs">
            {recoveryTabs.map((r, i) => (
              <button key={i} className={`rec-tab${activeRec === i ? ' active' : ''}`} onClick={() => setActiveRec(i)}>{r.label}</button>
            ))}
          </div>
          <div className="rec-panel-inner">
            <h3>{recoveryTabs[activeRec].title}</h3>
            <p>{recoveryTabs[activeRec].intro}</p>
            <div className="rec-timeline">
              {recoveryTabs[activeRec].timeline.map((t, i) => (
                <div key={i} className="rec-tl-row">
                  <span className="rec-tl-badge" style={{ background: t.badge }}>{t.period}</span>
                  <span className="rec-tl-text">{t.text}</span>
                </div>
              ))}
            </div>
            {recoveryTabs[activeRec].warn.length > 0 && (
              <div className="rec-warning">
                <h4>{warnIcon} Watch for</h4>
                <ul>{recoveryTabs[activeRec].warn.map((w, i) => <li key={i}>{w}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* S8 Outcomes */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Outcomes</span></div>
            <h2 className="sec-title">Success & outcomes.</h2>
          </div>
          <div className="outcome-grid">
            {outcomes.map((o, i) => (
              <div key={i} className="outcome-card">
                <div className="outcome-icon" style={{ background: o.grad }}>{o.icon}</div>
                <h3>{o.title}</h3><p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S9 Myths */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Myths vs Facts</span></div>
            <h2 className="sec-title">Common misconceptions.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>Let's clear up common myths about this type of treatment.</p>
          </div>
          <div className="myth-list">
            {myths.map((m, i) => (
              <div key={i} className={`myth-item${openMyth === i ? ' open' : ''}`} onClick={() => setOpenMyth(openMyth === i ? null : i)}>
                <div className="myth-q">
                  <span className="myth-badge">{openMyth === i ? 'Fact' : 'Myth'}</span>
                  <span>{m.myth}</span>
                  <div className="myth-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
                </div>
                {openMyth === i && (
                  <div className="myth-a" style={{ padding: '0 1.5rem 1.25rem' }}>
                    <div className="myth-a-inner"><span className="fact-badge">Fact</span><p>{m.fact}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S10 If Delayed */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="centered">
            <div className="warning-box">
              <div className="warning-icon">{warnIcon}</div>
              <div>
                <h3>What happens if treatment is delayed?</h3>
                <p>Delaying appropriate treatment can lead to:</p>
                <ul>
                  <li>Progression of the underlying condition to a more advanced stage</li>
                  <li>Reduced effectiveness of treatment when eventually undertaken</li>
                  <li>More complex and potentially more expensive intervention required later</li>
                  <li>Longer recovery period and reduced likelihood of full resolution</li>
                  <li>Impact on quality of life and ability to perform daily activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* S11 FAQ */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
            <h2 className="sec-title">About this procedure.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <div className="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
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
