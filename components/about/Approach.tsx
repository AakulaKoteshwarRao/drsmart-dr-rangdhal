const approaches = [
  {
    grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    title: 'Evidence-Based Treatment',
    desc: 'Every diagnosis and treatment plan is grounded in current clinical evidence and proven medical protocols.',
  },
  {
    grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    title: 'Patient-First Communication',
    desc: 'Patients are informed at every step -- from diagnosis to risks to costs. No decisions are made without clear explanation.',
  },
  {
    grad: 'linear-gradient(135deg,#0F2259,#0B1A3E)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Outcome-Focused Care',
    desc: 'Success is measured by real recovery -- functional improvement, reduced symptoms, and return to daily life.',
  },
]

export default function Approach() {
  return (
    <section className="approach-section section-cool-grey">
      <div className="approach-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Our Approach</span></div>
          <h2 className="sec-title">How we practise.</h2>
          <p className="sec-sub">The principles that guide every decision, treatment, and interaction at the clinic.</p>
        </div>
        <div className="approach-grid">
          {approaches.map((a, i) => (
            <div key={i} className="approach-card">
              <div className="approach-icon" style={{ background: a.grad }}>{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
