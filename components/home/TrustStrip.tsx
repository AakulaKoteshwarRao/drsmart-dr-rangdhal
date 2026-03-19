import type { TrustItem } from '@/lib/types'

const ICONS: Record<string, JSX.Element> = {
  NMC: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  award: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  education: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  hospital: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  '*****': <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  default: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
}

export default function TrustStrip({ items }: { items: TrustItem[] }) {
  const doubled = [...items, ...items]
  return (
    <section className="trust-strip">
      <div className="trust-marquee">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <div className="trust-item">
              <div className="trust-icon">
                {ICONS[item.icon] ?? ICONS['default']}
              </div>
              {item.text}
            </div>
            <div className="trust-divider"></div>
          </span>
        ))}
      </div>
    </section>
  )
}
