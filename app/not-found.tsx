import Link from 'next/link'
import { getConfig } from '@/lib/config'

export const metadata = {
  title:  '404 — Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  const cfg    = getConfig()
  const clinic = cfg.clinic as any

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
      <p style={{ fontSize: '5rem', fontWeight: '700', color: 'var(--primary, #0d7a5f)', lineHeight: 1, margin: '0 0 1rem' }}>404</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.75rem' }}>Page not found</h1>
      <p style={{ color: '#6B7280', maxWidth: '360px', margin: '0 0 2rem', lineHeight: 1.6 }}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved or no longer exists.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{ padding: '0.6rem 1.5rem', background: 'var(--primary, #0d7a5f)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
          Go Home
        </Link>
        <Link href="/contact" style={{ padding: '0.6rem 1.5rem', border: '1.5px solid var(--primary, #0d7a5f)', color: 'var(--primary, #0d7a5f)', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
          Contact Us
        </Link>
        <Link href="/appointment" style={{ padding: '0.6rem 1.5rem', border: '1.5px solid #D1D5DB', color: '#374151', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
          Book Appointment
        </Link>
      </div>
      {clinic?.name && (
        <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: '#9CA3AF' }}>{clinic.name}</p>
      )}
    </main>
  )
}
