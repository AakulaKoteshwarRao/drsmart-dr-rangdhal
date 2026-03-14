import type { HeroSection, ClinicInfo } from '@/lib/types'

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

export default function Hero({ hero, clinic }: { hero: HeroSection; clinic: ClinicInfo }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="sec-label"><span>{hero.label}</span></div>
        <h1>
          {hero.heading} <em>{hero.headingEm}</em>
        </h1>
        <p className="hero-sub">{hero.subtext}</p>
        <div className="hero-tags">
          {hero.tags.map((tag, i) => (
            <span key={i} className="hero-tag">{tag}</span>
          ))}
        </div>
        <a href={hero.ctaHref} className="hero-cta">
          {hero.ctaLabel} <ArrowIcon />
        </a>
        <div className="hero-stats">
          {hero.stats.map((stat, i) => (
            <div className="stat" key={i}>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-image">
        <div className="doctor-photo-wrapper">
          {clinic.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={clinic.heroImage} alt={clinic.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
          ) : (
            <div className="doctor-photo-placeholder">
              <PersonIcon />
              Doctor Photo
            </div>
          )}
          <div className="floating-chip chip-rating">
            <StarIcon />
            {hero.chips.find(c => c.type === 'rating')?.text}
          </div>
          <div className="floating-chip chip-experience">
            <ClockIcon />
            {hero.chips.find(c => c.type === 'experience')?.text}
          </div>
          <div className="floating-chip chip-patients">
            <UsersIcon />
            {hero.chips.find(c => c.type === 'patients')?.text}
          </div>
        </div>
      </div>
    </section>
  )
}
