import defaultData from '../data/default.json'
import type { ClinicInfo } from '@/lib/types'

const d = defaultData

const pinIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const phoneIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const mailIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const clockIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Doctor', href: '/doctor' },
  { label: 'Team', href: '/team' },
  { label: 'Packages', href: '/products' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Locations', href: '/locations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Book Appointment', href: '/appointment' },
]

// Service links pulled from default.json -- specialty agnostic
const serviceLinks = [
  ...(d.services?.conditions || []).slice(0, 4).map((s: any) => ({
    label: s.title, href: `/services/${s.slug}`
  })),
  ...(d.services?.procedures || []).slice(0, 2).map((p: any) => ({
    label: p.title, href: `/procedures/${p.slug}`
  })),
  { label: 'View All Services', href: '/services' },
]

export default function Footer({ clinic }: { clinic: ClinicInfo }) {
  const year = new Date().getFullYear()
  const social = clinic.social || {}
  const insurers = clinic.insurers
  return (
    <footer className="footer" style={{ marginBottom: '64px' }}>
      <div className="footer-inner">

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            {quickLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4>Services</h4>
          <div className="footer-links">
            {serviceLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4>Contact</h4>
          <div className="footer-contact">
            <div className="contact-item">{pinIcon}<span>{clinic.address}</span></div>
            <div className="contact-item">{phoneIcon}<a href={`tel:${clinic.phone}`}>{clinic.phone}</a></div>
            <div className="contact-item">{mailIcon}<a href={`mailto:${clinic.email}`}>{clinic.email}</a></div>
            <div className="contact-item">{clockIcon}<span>{clinic.hours}</span></div>
            <div className="contact-divider"></div>
            <div className="social-links">
              {social.google && (
                <a href={social.google} target="_blank" rel="noreferrer" title="Google Business Profile" aria-label="Google Business Profile">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noreferrer" title="Facebook" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noreferrer" title="YouTube" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="footer-map">
          <h4>Directions</h4>
          <a href={clinic.mapsUrl || clinic.mapUrl} target="_blank" rel="noopener" title="Get Directions">
            <div className="map-visual">
              <div className="map-pin">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                <div className="map-pin-shadow"></div>
              </div>
              <div className="map-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Get Directions
              </div>
            </div>
          </a>
        </div>

      </div>

      {/* Disclaimer */}
      <div className="footer-disclaimer">
        <p>The information provided on this website is for general informational purposes only. It is not intended as medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions regarding a medical condition.</p>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {year} {clinic.name}. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/disclaimer">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
