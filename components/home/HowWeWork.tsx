import type { StepItem } from '@/lib/types'

const icons: Record<string, JSX.Element> = {
  message: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  'check-circle': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
}

const stepIconClass = ['sf-1', 'sf-2', 'sf-3', 'sf-4']

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="9 6 15 12 9 18"/>
  </svg>
)
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

export default function HowWeWork({ steps }: { steps: StepItem[] }) {
  return (
    <section className="process-section section-cool-grey">
      <div className="process-inner">
        <div className="sec-header">
          <div className="sec-label"><span>How We Work</span></div>
          <h2 className="sec-title">Four steps that put you in control.</h2>
          <p className="sec-sub">No surprises. No unexplained decisions. You know what&apos;s happening and why -- at every stage.</p>
        </div>
        <div className="steps-flow">
          {steps.map((step, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <div className={`sf-card ${stepIconClass[i]}`}>
                <div className="sf-top">
                  <span className="sf-badge">{step.badge}</span>
                  <div className="sf-icon">
                    {icons[step.iconType] || icons.file}
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <>
                  <div className="sf-arrow-h"><ChevronRight /></div>
                  <div className="sf-arrow-v"><ChevronDown /></div>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
