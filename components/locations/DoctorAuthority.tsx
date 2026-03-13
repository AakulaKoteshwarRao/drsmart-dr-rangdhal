import defaultData from '../../data/default.json'
import type { DoctorInfo } from '@/lib/types'

const d = defaultData

export default function DoctorAuthority({ doctor }: { doctor: DoctorInfo }) {
  return (
    <section className="doc-authority">
      <div className="doc-authority-inner">
        <div className="doc-auth-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div className="doc-auth-text">
          <h3>{doctor.name}</h3>
          <p>{doctor.name} -- {doctor.degrees}. {doctor.stats[0]?.number} years of experience specialising in {(d.doctor.specialties || []).slice(0, 3).join(', ')}.</p>
          <a href="/doctor" className="doc-auth-link">
            View Full Profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
