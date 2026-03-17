import defaultData from '../../data/default.json'

const d = defaultData
const colors = ['var(--primary)','var(--secondary)','var(--primary-dark)','var(--secondary-dark)','#D68910','#6C3483','#1E8449','#2E86C1']

const services = [
  ...(d.services?.conditions || []).map((s: any, i: number) => ({ label: s.title, color: colors[i % colors.length], slug: s.slug })),
  ...(d.services?.procedures || []).map((p: any, i: number) => ({ label: p.title, color: colors[(i + 4) % colors.length], slug: p.slug })),
]

export default function ServicesAtLocation() {
  return (
    <section className="services-loc-section">
      <div className="services-loc-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Services Available</span></div>
          <h2 className="sec-title">What we offer at this location.</h2>
        </div>
        <div className="services-loc-grid">
          {services.map((s, i) => (
            <a key={i} href={`/conditions/${s.slug}`} className="svc-chip">
              <span className="svc-dot" style={{ background: s.color }}></span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
