'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { ClinicInfo } from '@/lib/types'

const ALL_LINKS: Record<string, { href: string; label: string }> = {
  home:         { href: '/',            label: 'Home' },
  about:        { href: '/about',       label: 'About' },
  doctor:       { href: '/doctor',      label: 'Doctor' },
  team:         { href: '/team',        label: 'Team' },
  services:     { href: '/services',    label: 'Services' },
  products:     { href: '/products',    label: 'Products' },
  testimonials: { href: '/testimonials',label: 'Testimonials' },
  locations:    { href: '/locations',   label: 'Locations' },
  blog:         { href: '/blog',        label: 'Blog' },
  contact:      { href: '/contact',     label: 'Contact' },
  reviews:      { href: '/reviews',     label: 'Reviews' },
  conditions:   { href: '/services#conditions',  label: 'Conditions' },
  procedures:   { href: '/services#procedures',  label: 'Procedures' },
}

const MENU_BY_ENTITY: Record<string, string[]> = {
  'Physician':          ['home', 'about', 'doctor', 'conditions', 'procedures', 'reviews', 'contact'],
  'Solo Clinic':        ['home', 'about', 'doctor', 'services', 'products', 'blog', 'reviews', 'contact'],
  'Multi-Doctor Clinic':['home', 'about', 'team', 'services', 'products', 'blog', 'reviews', 'contact'],
  'Group Practice':     ['home', 'locations', 'services', 'about', 'blog', 'reviews', 'contact'],
}

const DEFAULT_MENU = ['home', 'about', 'doctor', 'services', 'blog', 'contact']

export default function Header({ clinic }: { clinic: ClinicInfo }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuKeys = (clinic.type && MENU_BY_ENTITY[clinic.type]) || DEFAULT_MENU
  const navLinks = menuKeys.map(k => ALL_LINKS[k]).filter(Boolean)

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          {clinic.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={clinic.logo} alt={clinic.name} width={200} height={56} style={{ height: 56, width: 'auto', maxWidth: 200, objectFit: 'contain', display: 'block' }} loading="eager" />
          ) : (
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--secondary, #1E3A8A), var(--primary, #F97316))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" style={{ width: 24, height: 24 }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="mobile-nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
