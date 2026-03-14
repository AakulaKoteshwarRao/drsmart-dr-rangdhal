import type { CardItem } from '@/lib/types'

const icons: Record<string, JSX.Element> = {
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  droplet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>,
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

interface CardGridProps {
  label: string
  title: string
  subtitle: string
  items: CardItem[]
  viewAllHref: string
  viewAllLabel: string
  bgClass?: string
  wrapInner?: boolean
}

export default function CardGrid({
  label, title, subtitle, items,
  viewAllHref, viewAllLabel, bgClass = '', wrapInner = false
}: CardGridProps) {
  const inner = (
    <>
      <div className="sec-header">
        <div className="sec-label"><span>{label}</span></div>
        <h2 className="sec-title">{title}</h2>
        <p className="sec-sub">{subtitle}</p>
      </div>
      <div className="card-grid">
        {items.map((item, i) => (
          <a key={i} href={item.href} className="img-card">
            <div className={`img-card-visual ${item.gradClass}`} style={{ position: 'relative', overflow: 'hidden' }}>
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="card-visual-icon">
                  {icons[item.iconType] || icons.info}
                </div>
              )}
              <span className="card-visual-label" style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </div>
            <div className="img-card-body" style={{ padding: "1.25rem" }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="learn-more">Learn more <ArrowIcon /></span>
            </div>
          </a>
        ))}
      </div>
      <div className="sec-cta">
        <a href={viewAllHref}>{viewAllLabel} <ArrowIcon /></a>
      </div>
    </>
  )

  if (wrapInner) {
    return (
      <section className={`card-section alt ${bgClass}`}>
        <div className="card-section-inner">{inner}</div>
      </section>
    )
  }
  return (
    <section className={`card-section ${bgClass}`}>{inner}</section>
  )
}
