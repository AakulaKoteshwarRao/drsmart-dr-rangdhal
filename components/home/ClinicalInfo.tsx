import type { ClinicalCard } from '@/lib/types'

const icons: Record<string, JSX.Element> = {
  pulse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>,
}

export default function ClinicalInfo({ cards }: { cards: ClinicalCard[] }) {
  return (
    <section className="clinical-section">
      <div className="clinical-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Clinical Transparency</span></div>
          <h2 className="sec-title">What you should know before any procedure.</h2>
          <p className="sec-sub">We believe informed patients make better decisions. Here are the facts -- clearly.</p>
        </div>
        <div className="clinical-grid">
          {cards.map((card, i) => (
            <div key={i} className={`clinical-card ${card.colorClass}`}>
              <div className="cl-icon">
                {icons[card.iconType] || icons.info}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="cl-note">{card.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
