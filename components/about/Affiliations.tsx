import type { ClinicInfo } from '@/lib/types'

export default function Affiliations({ clinic }: { clinic: ClinicInfo }) {
  const affiliations = [
    { bg: 'var(--secondary-deep)', initials: 'CH', name: (clinic.name || 'Clinic') + ' -- Consulting Hospital', type: 'Consulting Hospital' },
    { bg: '#1E8449', initials: 'IAN', name: 'Indian Academy of Neurology', type: 'Academic Affiliation' },
    { bg: '#D68910', initials: 'IMA', name: 'Indian Medical Association', type: 'Professional Body' },
    { bg: 'var(--secondary)', initials: 'NMC', name: 'National Medical Commission', type: 'Regulatory Body' },
  ]
  return (
    <section className="affil-section section-cool-grey">
      <div className="affil-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Affiliations</span></div>
          <h2 className="sec-title">Associated institutions.</h2>
          <p className="sec-sub">Hospital ties and institutional associations that support our clinical practice.</p>
        </div>
        <div className="affil-grid">
          {affiliations.map((a, i) => (
            <div key={i} className="affil-card">
              <div className="affil-logo-box" style={{ background: a.bg }}>
                <span className="affil-logo-text">{a.initials}</span>
              </div>
              <div style={{ padding: "0 0.5rem" }}>
                <h4>{a.name}</h4>
                <span className="affil-type">{a.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
