import type { ClinicInfo } from '@/lib/types'

export default function ClinicDetails({ clinic }: { clinic: ClinicInfo }) {
  const cards = [
    {
      grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      title: 'Address',
      body: clinic.address,
      link: { label: 'Get Directions &rarr;', href: clinic.mapsUrl },
    },
    {
      grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      title: 'Working Hours',
      body: clinic.hours,
    },
    {
      grad: 'linear-gradient(135deg,#0F2259,#0B1A3E)',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8l4 2.5v6l-4 2.5"/></svg>,
      title: 'Parking',
      body: 'Bike and car parking available on Street No. 1 outside the building.',
    },
    {
      grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      title: 'Appointments',
      body: 'By appointment preferred. Walk-ins accepted subject to availability. Emergency cases seen immediately.',
    },
  ]

  return (
    <section className="clinic-section">
      <div className="sec-header">
        <div className="sec-label"><span>Clinic Details</span></div>
        <h2 className="sec-title">Everything you need to know.</h2>
      </div>
      <div className="clinic-grid">
        {cards.map((c, i) => (
          <div key={i} className="clinic-card" style={{ padding: '1.5rem' }}>
            <div className="clinic-card-icon" style={{ background: c.grad }}>{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            {c.link && <a href={c.link.href} target="_blank" rel="noopener">{c.link.label}</a>}
          </div>
        ))}
      </div>
    </section>
  )
}
