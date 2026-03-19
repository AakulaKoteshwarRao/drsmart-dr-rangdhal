import type { AreaItem, ClinicInfo } from '@/lib/types'

export default function LocalAreas({ areas, clinic }: { areas: AreaItem[]; clinic: ClinicInfo }) {
  return (
    <section className="areas-section">
      <div className="sec-header">
        <div className="sec-label"><span>Serving {clinic.city}</span></div>
        <h2 className="sec-title">Conveniently located for you.</h2>
        <p className="sec-sub">We serve patients from across {clinic.city} and surrounding areas.</p>
      </div>
      <div className="areas-grid-8">
        {areas.map((area, i) => (
          <a key={i} href={area.href} className="area-tag">{area.label}</a>
        ))}
      </div>
      <p className="areas-sub">
        Located in {clinic.address}. Easily accessible by car and public transport.{' '}
        <a href={clinic.mapUrl} target="_blank" rel="noreferrer"
          style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
          Get directions &rarr;
        </a>
      </p>
    </section>
  )
}
