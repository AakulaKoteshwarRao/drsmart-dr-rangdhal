'use client'
import { useRef } from 'react'
import type { TeamMember } from '@/lib/types'

const personIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const clockIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const calIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function TeamCarousel({ members }: { members: TeamMember[] }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
    }
  }

  return (
    <section className="team-grid-section">
      <div className="team-grid-inner">
        <div className="team-carousel-wrap">
          <button className="carousel-btn carousel-prev" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="team-carousel" ref={ref}>
            {members.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-card-photo" style={{ background: m.gradient }}>
                  {personIcon}
                  <span>Photo</span>
                </div>
                <div className="team-card-body" style={{ padding: '1.5rem' }}>
                  {m.isLead && <div className="team-card-badge">* Lead Doctor</div>}
                  <h3 className="team-card-name">{m.name}</h3>
                  <p className="team-card-desg">{m.designation}</p>
                  <div className="team-card-quals">
                    {m.qualifications.map((q, j) => (
                      <span key={j} className="team-qual">{q}</span>
                    ))}
                  </div>
                  <div className="team-card-meta">
                    <div className="team-meta-item">{clockIcon}<span>{m.experience} experience</span></div>
                    <div className="team-meta-item">{calIcon}<span>{m.schedule}</span></div>
                  </div>
                  <a href="/appointment" className="team-card-cta">
                    Book Appointment {arrowIcon}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-btn carousel-next" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
