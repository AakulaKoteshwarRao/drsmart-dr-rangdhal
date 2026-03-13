'use client'
import { useState } from 'react'
import defaultData from '../../data/default.json'
import type { ClinicInfo } from '@/lib/types'

const d = defaultData

// Reasons pulled from conditions + procedures in default.json -- specialty agnostic
const reasons = [
  ...(d.conditions || []).slice(0, 4).map((c: any) => c.title || c.label),
  ...(d.procedures || []).slice(0, 3).map((p: any) => p.title || p.label),
  'Second Opinion',
  'Follow-up Visit',
  'Other',
]

const times = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 5:00 PM']

const waIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
)

export default function AppointmentForm({ clinic }: { clinic: ClinicInfo }) {
  const [form, setForm] = useState({ name: '', phone: '', age: '', reason: '', date: '', time: '', notes: '' })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const sendWhatsApp = () => {
    const msg = [
      `*New Appointment Request*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Age: ${form.age}`,
      `Reason: ${form.reason}`,
      `Preferred Date: ${form.date}`,
      `Preferred Time: ${form.time}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ].filter(Boolean).join('\n')
    const num = clinic.whatsapp.replace('+', '')
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const inputWrap = 'input-icon-wrap'

  return (
    <section className="form-section">
      <div className="form-inner">
        <div className="form-layout">

          {/* Form card */}
          <div className="form-card">
            <h2>Request an Appointment</h2>
            <p>Fill in your details and we'll get back to you to confirm a convenient time.</p>

            <div className="form-row full">
              <div className="form-group">
                <div className={inputWrap}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input type="text" placeholder="Your Name" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-row full">
              <div className="form-group">
                <div className={inputWrap}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <input type="tel" placeholder="Your Phone" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-row full">
              <div className="form-group">
                <div className={inputWrap}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <input type="number" placeholder="Your Age" value={form.age} onChange={e => set('age', e.target.value)} min="1" max="120" />
                </div>
              </div>
            </div>

            <div className="form-row full">
              <div className="form-group">
                <div className={inputWrap}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  <select value={form.reason} onChange={e => set('reason', e.target.value)}>
                    <option value="" disabled>Appointment for</option>
                    {reasons.map((r, i) => <option key={i}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <div className={inputWrap}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <div className={inputWrap}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <select value={form.time} onChange={e => set('time', e.target.value)}>
                    <option value="" disabled>Preferred Time</option>
                    {times.map((t, i) => <option key={i}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row full">
              <div className="form-group">
                <textarea placeholder="Your comment or concern (optional)" value={form.notes} onChange={e => set('notes', e.target.value)} rows={4} />
              </div>
            </div>

            <button className="form-submit-wa" onClick={sendWhatsApp}>
              {waIcon} Send via WhatsApp
            </button>
            <p className="form-note">Your details will be sent to us via WhatsApp for quick confirmation.</p>
          </div>

          {/* Sidebar */}
          <div className="form-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-card-icon" style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))' }}>{waIcon}</div>
              <h3>Prefer WhatsApp?</h3>
              <p>Send us a message and we'll help you book an appointment instantly.</p>
              <a href={`https://wa.me/${clinic.whatsapp.replace('+', '')}`} style={{ color: '#1A9E52' }}>
                WhatsApp Us <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 14, height: 14, display: 'inline' }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
            <div className="sidebar-card">
              <div className="sidebar-card-icon" style={{ background: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <h3>Call Directly</h3>
              <p>Speak to our front desk to schedule your appointment right away.</p>
              <a href={`tel:${clinic.phone}`} style={{ color: 'var(--secondary)' }}>
                {clinic.phone} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 14, height: 14, display: 'inline' }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
            <div className="sidebar-card">
              <div className="sidebar-card-icon" style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3>Working Hours</h3>
              <p>{clinic.hours}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
