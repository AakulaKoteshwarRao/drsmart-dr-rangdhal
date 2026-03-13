import Image from 'next/image'
import type { DoctorInfo, ClinicInfo } from '@/lib/types'

export default function DoctorHero({ doctor, clinic }: { doctor: DoctorInfo; clinic: ClinicInfo }) {
  return (
    <section className="doc-hero-section">
      <div className="doc-hero-inner">
        <div className="doc-hero-grid">
          <div className="doc-photo-wrap">
            <div className="doc-photo">
              {doctor.photo ? (
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 64, height: 64, color: 'rgba(255,255,255,0.25)' }}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Doctor Photo</span>
                </>
              )}
            </div>
          </div>
          <div className="doc-info">
            <div className="sec-label"><span style={{ color: '#F97316' }}>Meet the Doctor</span></div>
            <h1 className="doc-name">{doctor.name}</h1>
            <p className="doc-degree">{doctor.qualifications.join(' &middot; ')}</p>
            <div className="doc-specialty-tags">
              {doctor.specialties.map((s, i) => <span key={i} className="doc-spec-tag">{s}</span>)}
            </div>
            <div className="doc-stats-row">
              {doctor.stats.map((stat, i) => (
                <div key={i} className="doc-stat">
                  <span className="doc-stat-num">{stat.number}</span>
                  <span className="doc-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="doc-details">
              <div className="doc-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <a href={clinic.mapUrl} target="_blank" rel="noreferrer" style={{ color: '#F97316', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>{clinic.address}</a>
              </div>
              <div className="doc-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{clinic.hours}</span>
              </div>
              <div className="doc-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0 }}>
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{doctor.languages.join(' &middot; ')}</span>
              </div>
            </div>
            <a href="/appointment" className="doc-cta-btn">
              Book Appointment
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
