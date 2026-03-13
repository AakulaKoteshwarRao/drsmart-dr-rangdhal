import defaultData from '../../data/default.json'

const d = defaultData
const specialty = (d.entity as any)?.medicalSpecialty || d.doctor?.experience?.[0]?.role || 'specialist care'

const points = [
  'Early-stage conditions can often be managed without surgery',
  'Damage is more reversible when treated promptly',
  'Non-surgical options are more effective in early stages',
  'Recovery time reduces significantly with early intervention',
]

const medIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)

export default function EarlyTreatment() {
  return (
    <section className="early-section">
      <div className="early-inner">
        <div className="early-grid">
          <div className="early-content">
            <div className="sec-label"><span style={{ color: '#F97316' }}>Why It Matters</span></div>
            <h2>Early treatment leads to better outcomes.</h2>
            <p>Many conditions are progressive. What starts as mild discomfort can escalate into serious, harder-to-treat problems if left unaddressed. Timely diagnosis and intervention often means simpler, less invasive treatment -- and significantly better recovery.</p>
            <ul className="early-points">
              {points.map((pt, i) => (
                <li key={i}>
                  <div className="early-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="early-visual">
            {medIcon}
          </div>
        </div>
      </div>
    </section>
  )
}
