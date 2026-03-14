import type { ClinicInfo } from '@/lib/types'

export default function AboutHero({ clinic }: { clinic: ClinicInfo }) {
  return (
    <section className="about-hero">
      <div className="about-hero-grid">
        <div>
          <div className="sec-label"><span>About Us</span></div>
          <h1>Healthcare built on <em>trust and transparency.</em></h1>
          <div className="about-hero-text">
            <p>Our clinic is dedicated to providing evidence-based specialist care with a focus on honest communication, personalised treatment, and lasting outcomes. Every patient receives the same level of attention -- from the first consultation to full recovery.</p>
            <p>With modern infrastructure, experienced clinical staff, and a commitment to transparency, the practice has built a reputation for reliable, patient-first care across {clinic.city}.</p>
          </div>
        </div>
        <div className="about-hero-image">
          {clinic.aboutImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={clinic.aboutImage} alt={`About ${clinic.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          )}
        </div>
      </div>
    </section>
  )
}
