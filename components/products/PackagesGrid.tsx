import type { PackageItem } from '@/lib/types'

const pkgIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
  </svg>
)

const starIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

export default function PackagesGrid({ packages }: { packages: any[] }) {
  return (
    <section className="packages-section" style={{ background: 'var(--primary-light)' }}>
      <div className="sec-header">
        <div className="sec-label"><span>Packages</span></div>
        <h2 className="sec-title">Choose the right package.</h2>
        <p className="sec-sub">Comprehensive treatment packages tailored for patient needs.</p>
      </div>
      <div className="pkg-grid">
        {packages.map((pkg, i) => (
          <div key={i} className="pkg-card">
            <div className="pkg-visual" style={{ background: pkg.gradient }}>{pkgIcon}</div>
            <div className="pkg-body" style={{ padding: '1.5rem' }}>
              <h3 className="pkg-name">{pkg.name}</h3>
              <p className="pkg-desc">{pkg.description}</p>
              <div className="pkg-price" style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{pkg.price}</div>
              <ul className="pkg-includes">
                {pkg.includes.map((item: any, j: number) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <a href={`/packages/${pkg.slug}`} className="pkg-cta">
                Enquire Now <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
