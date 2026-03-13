import type { ClinicInfo } from '@/lib/types'

export default function PageDisabled({ title, clinic }: { title: string; clinic: ClinicInfo }) {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg,var(--secondary),var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="28" height="28">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', marginBottom: '0.75rem' }}>{title} -- Coming Soon</h1>
        <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '2rem' }}>This page is not yet enabled. To activate it, set <code style={{ background: '#F3F4F6', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.85rem' }}>optionalPages.{title.toLowerCase()}</code> to <code style={{ background: '#F3F4F6', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.85rem' }}>true</code> in your config.</p>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg,var(--secondary),var(--primary))', color: '#fff', fontWeight: 700, padding: '0.8rem 1.5rem', borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem' }}>
          Back to Home
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </main>
  )
}
