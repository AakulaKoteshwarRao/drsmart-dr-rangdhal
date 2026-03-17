'use client'
import { useState } from 'react'
import defaultData from '../../data/default.json'

const d = defaultData

const pinIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const checkIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
const clockIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const serviceGrads = [
  'linear-gradient(135deg,var(--primary),var(--primary-dark))',
  'linear-gradient(135deg,var(--secondary),var(--secondary-dark))',
  'linear-gradient(135deg,var(--secondary-dark),var(--secondary-deep))',
]

const services = (d.services?.conditions || []).slice(0, 3).map((s: any, i: number) => ({
  grad: serviceGrads[i % serviceGrads.length],
  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  title: s.title,
  desc: s.description || s.title,
  href: `/conditions/${s.slug}`,
}))

const intLinks = [
  { label: '&larr; All Locations', href: '/locations' },
  { label: 'Doctor Profile', href: '/doctor' },
  { label: 'All Services', href: '/services' },
  ...(d.services?.conditions || []).slice(0, 3).map((s: any) => ({ label: s.title, href: `/conditions/${s.slug}` })),
  { label: 'Packages', href: '/products' },
  { label: 'Book Appointment', href: '/appointment' },
  { label: 'Blog', href: '/blog' },
]

export default function LocationSpoke(props?: any) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const clinicAddress = props?.clinic?.address || d.clinic.address
  const clinicHours   = props?.clinic?.hours   || d.clinic.hours
  const doctorName    = props?.doctor?.name    || d.doctor.name
  const areaName      = props?.area?.name      || 'Local Area'
  const specialty     = (d.entity as any)?.medicalSpecialty || d.doctor?.experience?.[0]?.role || 'specialist'

  const qfCards = [
    { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: pinIcon, label: 'Location', val: props?.clinic?.hospital || clinicAddress },
    { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: clockIcon, label: 'Travel Time', val: '10-15 min' },
    { grad: 'linear-gradient(135deg,var(--secondary-dark),var(--secondary-deep))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, label: 'Distance', val: '3-5 km' },
    { grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>, label: 'Parking', val: 'Available' },
  ]

  const reasons = [
    { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: pinIcon, text: `Located at ${clinicAddress} -- easily accessible from the local area` },
    { grad: 'linear-gradient(135deg,var(--secondary),var(--secondary-dark))', icon: clockIcon, text: `Clinic hours ${clinicHours} -- convenient for patients in the area` },
    { grad: 'linear-gradient(135deg,var(--secondary-dark),var(--secondary-deep))', icon: checkIcon, text: `${doctorName} has extensive experience in ${specialty} and complex case management` },
    { grad: 'linear-gradient(135deg,var(--primary-dark),var(--secondary-deep))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Modern diagnostic equipment -- all under one roof' },
    { grad: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, text: `Hundreds of successful outcomes for patients from ${areaName} and surrounding neighbourhoods` },
  ]

  const nearbyAreas = (d.localAreas || []).slice(0, 5).map((a: any) => ({
    label: a.name, href: `/locations/${a.slug}`
  }))

  const faqs = [
    { q: `How do I reach the clinic?`, a: `${clinicAddress} -- easily accessible from most parts of the area.` },
    { q: 'What are the clinic hours?', a: `${doctorName} consults ${clinicHours}. Please call ahead to confirm your slot.` },
    { q: 'Is parking available at the clinic?', a: 'Yes, parking is available near the clinic. Public transport options are also within walking distance.' },
    { q: `What conditions are treated at this location?`, a: `All major conditions are treated -- ${(d.conditions || []).slice(0, 4).map((c: any) => c.title || c.label).join(', ')}, and more. Full diagnostic workups are available on-site.` },
    { q: 'Can I book an appointment online?', a: 'Yes. You can book via our appointment page or WhatsApp us directly. Same-week appointments are typically available for new patients.' },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/locations">Locations</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{areaName}</span>
      </nav>

      {/* S1 Spoke Hero */}
      <section className="spoke-hero">
        <div className="sec-label"><span>Location</span></div>
        <h1>{specialty} Near <em>{areaName}</em></h1>
        <p className="spoke-hero-desc">Looking for a trusted {specialty.toLowerCase()} near {areaName}? {doctorName} consults at {clinicAddress} -- easily reachable from the surrounding area.</p>
        <a href="/appointment" className="spoke-hero-cta">
          Book Appointment {arrowIcon}
        </a>

        {/* Quick-facts */}
        <div className="qf-grid">
          {qfCards.map((c, i) => (
            <div key={i} className="qf-card">
              <div className="qf-icon" style={{ background: c.grad }}>{c.icon}</div>
              <div className="qf-text">
                <span className="qf-label">{c.label}</span>
                <span className="qf-val">{c.val}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S2 Services */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Services</span></div>
            <h2 className="sec-title">Services for {areaName} patients.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>The most relevant services for patients from this area.</p>
          </div>
          <div className="spoke-services">
            {services.map((s, i) => (
              <a key={i} href={s.href} className="spoke-svc-card">
                <div className="spoke-svc-icon" style={{ background: s.grad }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="spoke-svc-link">Learn more {arrowIcon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* S3 Why Us */}
      <div className="sec-teal">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Why Us</span></div>
            <h2 className="sec-title">Why patients from {areaName} choose us.</h2>
          </div>
          <div className="reasons-list">
            {reasons.map((r, i) => (
              <div key={i} className="reason-row">
                <div className="reason-icon" style={{ background: r.grad }}>{r.icon}</div>
                <span>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S4 Doctor Mini Card */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Your Doctor</span></div>
            <h2 className="sec-title">Meet your specialist.</h2>
          </div>
          <div className="doc-mini">
            <div className="doc-mini-photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '32px', height: '32px', color: 'rgba(255,255,255,0.3)' }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="doc-mini-info">
              <h3>{doctorName}</h3>
              <div className="doc-spec">{d.doctor.degrees}</div>
              <p>{doctorName} brings extensive expertise in {specialty}, consulting at {clinicAddress} -- {clinicHours}.</p>
              <a href="/doctor" className="doc-mini-link">View full profile {arrowIcon}</a>
            </div>
          </div>
        </div>
      </div>

      {/* S5 Nearby Areas */}
      <div className="sec-grey">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Nearby</span></div>
            <h2 className="sec-title">Also serving nearby areas.</h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>We see patients from across {d.clinic.city}. Here are some nearby areas we serve.</p>
          </div>
          <div className="nearby-pills">
            {nearbyAreas.map((a: any, i: number) => (
              <a key={i} href={a.href} className="nearby-pill">
                {pinIcon} {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* S6 FAQ */}
      <div className="sec-white">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>FAQ</span></div>
            <h2 className="sec-title">Questions from {areaName} patients.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <div className="faq-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </div>
                </div>
                {openFaq === i && (
                  <div className="faq-a" style={{ padding: '0 1.5rem 1.5rem' }}>
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S7 Internal Links */}
      <div className="sec-teal">
        <div className="sec-pad">
          <div className="sec-header" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>Explore</span></div>
            <h2 className="sec-title">Learn more about our services.</h2>
          </div>
          <div className="int-links">
            {intLinks.map((l, i) => (
              <a key={i} href={l.href} className="int-link">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
