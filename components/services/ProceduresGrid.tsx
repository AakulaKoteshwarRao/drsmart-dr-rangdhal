import type { ServiceItem } from '@/lib/types'

const medIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

export default function ProceduresGrid({ procedures }: { procedures: ServiceItem[] }) {
  return (
    <section id="procedures" className="card-section" style={{ background: "#F3F4F6" }}>
      <div className="sec-header">
        <div className="sec-label"><span>Procedures We Do</span></div>
        <h2 className="sec-title">Surgical &amp; non-surgical treatments.</h2>
        <p className="sec-sub">Advanced procedures performed at our affiliated hospitals by our experienced team.</p>
      </div>
      <div className="card-grid">
        {procedures.map((p, i) => (
          <div key={i} className="service-card">
            <div className="service-card-visual" style={{ background: p.gradient }}>{medIcon}</div>
            <div className="service-card-body" style={{ padding: "1.25rem" }}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <a href={`/procedures/${p.slug}`} className="learn-more">
                Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
