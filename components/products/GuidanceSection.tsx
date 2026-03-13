import type { ClinicInfo } from '@/lib/types'

export default function GuidanceSection({ clinic }: { clinic: ClinicInfo }) {
  return (
    <section className="guidance-section">
      <div className="guidance-inner">
        <h2>Not sure which package is right for you?</h2>
        <p>Talk to us. We will review your history, assess your condition, and recommend the most appropriate package for your situation. There is no obligation -- just honest guidance.</p>
        <div className="guidance-actions">
          <a href="/appointment" className="guidance-primary">
            Book a Consultation <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href={`https://wa.me/${clinic.whatsapp.replace('+', '')}`} className="guidance-secondary">WhatsApp Us</a>
        </div>
      </div>
    </section>
  )
}
