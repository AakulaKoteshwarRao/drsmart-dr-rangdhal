import type { ServiceItem } from '@/lib/types'

const medIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)

export default function ConditionsGrid({ conditions }: { conditions: ServiceItem[] }) {
  return (
    <section id="conditions" className="card-section" style={{ background: "var(--primary-light)" }}>
      <div className="sec-header">
        <div className="sec-label"><span>Conditions We Treat</span></div>
        <h2 className="sec-title">What brings patients to us.</h2>
        <p className="sec-sub">Conditions we diagnose and treat every day.</p>
      </div>
      <div className="card-grid">
        {conditions.map((c, i) => (
          <div key={i} className="service-card">
            <div className="service-card-visual" style={{ background: c.gradient }}>{medIcon}</div>
            <div className="service-card-body" style={{ padding: "1.25rem" }}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <a href={`/conditions/${c.slug}`} className="learn-more">
                Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
