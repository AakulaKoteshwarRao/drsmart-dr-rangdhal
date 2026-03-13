import type { ClinicInfo } from '@/lib/types'

export default function LocationStrip({ clinic }: { clinic: ClinicInfo }) {
  return (
    <section className="location-section">
      <div className="sec-header">
        <div className="sec-label"><span>Location</span></div>
        <h2 className="sec-title">How to reach us.</h2>
        <p className="sec-sub">Conveniently located in the heart of {clinic.city}.</p>
      </div>
      <div className="location-grid">
        <div className="location-map">
          <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Google Map Embed</span>
        </div>
        <div className="location-details">
          <div className="loc-item">
            <div className="loc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h4>Address</h4>
              <p>{clinic.address}</p>
              <a href={clinic.mapUrl} target="_blank" rel="noreferrer">Get Directions &rarr;</a>
            </div>
          </div>
          <div className="loc-item">
            <div className="loc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <h4>Working Hours</h4>
              <p>{clinic.hours}</p>
            </div>
          </div>
          <div className="loc-item">
            <div className="loc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <h4>Contact</h4>
              <p>Phone: <a href={`tel:${clinic.phone}`}>{clinic.phone}</a><br/>
              WhatsApp: <a href={`https://wa.me/${clinic.whatsapp.replace('+','')}`}>{clinic.whatsapp}</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
