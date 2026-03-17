'use client'
import { useState, useEffect } from 'react'

const reasons = ['Consultation', 'Follow-up', 'Second Opinion']
const times = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 5:00 PM']

const waIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
)

export default function AppointmentModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', age: '', reason: '', date: '', time: '', notes: '' })

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openAppointmentModal', handler)
    return () => window.removeEventListener('openAppointmentModal', handler)
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const sendWhatsApp = () => {
    const msg = [
      `*New Appointment Request*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.age ? `Age: ${form.age}` : '',
      `Reason: ${form.reason}`,
      form.date ? `Preferred Date: ${form.date}` : '',
      form.time ? `Preferred Time: ${form.time}` : '',
      form.notes ? `Notes: ${form.notes}` : '',
    ].filter(Boolean).join('\n')
    const w = (window as any).__CLINIC__?.whatsapp || ''
    const num = w.replace(/\D/g, '')
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }} onClick={() => setOpen(false)}>
      <div style={{
        background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '480px',
        padding: '2rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button onClick={() => setOpen(false)} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: '#F3F4F6', border: 'none', borderRadius: '50%',
          width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151'
        }} aria-label="Close">✕</button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Booking</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111111', margin: 0 }}>Book an Appointment</h2>
          <p style={{ fontSize: '0.88rem', color: '#6B7280', marginTop: '0.35rem' }}>Fill in your details and send via WhatsApp instantly.</p>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <input type="text" placeholder="Your Name *" value={form.name} onChange={e => set('name', e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }} />
          <input type="tel" placeholder="Your Phone *" value={form.phone} onChange={e => set('phone', e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }} />
          <input type="number" placeholder="Your Age" value={form.age} onChange={e => set('age', e.target.value)} min="1" max="120"
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }} />
          <select value={form.reason} onChange={e => set('reason', e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}>
            <option value="" disabled>Appointment for *</option>
            {reasons.map((r, i) => <option key={i}>{r}</option>)}
          </select>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }} />
            <select value={form.time} onChange={e => set('time', e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box' }}>
              <option value="" disabled>Preferred Time</option>
              {times.map((t, i) => <option key={i}>{t}</option>)}
            </select>
          </div>
          <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '0.92rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Submit */}
        <button onClick={sendWhatsApp} style={{
          width: '100%', marginTop: '1.25rem', padding: '0.9rem',
          background: 'var(--primary)', color: '#FFFFFF', border: 'none', borderRadius: '12px',
          fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
        }}>
          {waIcon} Send via WhatsApp
        </button>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#9CA3AF', marginTop: '0.75rem' }}>
          Your details will be sent to us via WhatsApp for quick confirmation.
        </p>
      </div>
    </div>
  )
}
