'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const expandIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
const closeIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const prevIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
const nextIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
const imgIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
const docIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

function buildItems(photos: Record<string, string>) {
  const p = (key: string) => photos[key] || ''
  return [
    { cat: 'clinic',      tag: 'Clinic',         grad: 'linear-gradient(145deg,var(--secondary),var(--secondary))',            title: 'Clinic -- Reception Area',           src: p('clinic_1') },
    { cat: 'clinic',      tag: 'Clinic',         grad: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary))',       title: 'Consultation Room',                  src: p('clinic_2') },
    { cat: 'clinic',      tag: 'Clinic',         grad: 'linear-gradient(145deg,var(--secondary),var(--secondary-dark))',       title: 'Clinic Interior',                    src: p('clinic_3') },
    { cat: 'equipment',   tag: 'Equipment',      grad: 'linear-gradient(145deg,var(--primary),var(--primary-dark))',           title: 'Diagnostic Equipment',               src: p('equipment_1') },
    { cat: 'equipment',   tag: 'Equipment',      grad: 'linear-gradient(145deg,var(--secondary),#3CB8AF)',                     title: 'Examination Unit',                   src: p('equipment_2') },
    { cat: 'equipment',   tag: 'Equipment',      grad: 'linear-gradient(145deg,var(--secondary-deep),#3CB8AF)',                title: 'Advanced Scanning Equipment',        src: p('equipment_3') },
    { cat: 'doctor',      tag: 'Doctor',         grad: 'linear-gradient(145deg,var(--secondary),var(--primary))',              title: 'Doctor -- Consultation',             src: p('doctor_1') },
    { cat: 'doctor',      tag: 'Doctor',         grad: 'linear-gradient(145deg,var(--secondary),var(--secondary-dark))',       title: 'Doctor -- Procedure Prep',           src: p('doctor_2') },
    { cat: 'awards',      tag: 'Awards',         grad: 'linear-gradient(145deg,var(--primary-dark),var(--secondary-deep))',    title: 'Healthcare Excellence Recognition',  src: p('awards_1') },
    { cat: 'awards',      tag: 'Awards',         grad: 'linear-gradient(145deg,var(--secondary-deep),var(--primary-dark))',    title: 'Award Recognition',                  src: p('awards_2') },
    { cat: 'conferences', tag: 'Conferences',    grad: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary-dark))', title: 'National Medical Conference',         src: p('conference_1') },
    { cat: 'conferences', tag: 'Conferences',    grad: 'linear-gradient(145deg,var(--secondary-deep),var(--secondary-dark))', title: 'Annual Conference -- Presentation',   src: p('conference_2') },
    { cat: 'results',     tag: 'Before & After', grad: 'linear-gradient(145deg,var(--primary),var(--primary-dark))',           title: 'Treatment Outcome -- Case Study',    src: p('result_1') },
    { cat: 'results',     tag: 'Before & After', grad: 'linear-gradient(145deg,var(--secondary-deep),#3CB8AF)',                title: 'Patient Recovery -- Post Treatment', src: p('result_2') },
  ].filter(item => item.src !== '' || true) // show all, gradient fallback for empty
}

const tabs = [
  { label: 'All',            cat: 'all' },
  { label: 'Clinic',         cat: 'clinic' },
  { label: 'Equipment',      cat: 'equipment' },
  { label: 'Doctor',         cat: 'doctor' },
  { label: 'Awards',         cat: 'awards' },
  { label: 'Conferences',    cat: 'conferences' },
  { label: 'Before & After', cat: 'results' },
]

export default function GalleryGrid({ photos = {} }: { photos?: Record<string, string> }) {
  const items = buildItems(photos)
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = active === 'all' ? items : items.filter(i => i.cat === active)

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % filtered.length : null)
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, filtered.length])

  // lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <section className="gallery-section">
      <div className="gallery-inner">

        {/* Filter tabs */}
        <div className="filter-bar">
          {tabs.map(t => (
            <button
              key={t.cat}
              className={`filter-tab${active === t.cat ? ' active' : ''}`}
              onClick={() => { setActive(t.cat); setLightbox(null) }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="photo-grid">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightbox(i)}
            >
              <div className="gallery-thumb" style={{ background: item.grad }}>
                {item.src ? (
                  <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 50vw, 300px" style={{ objectFit: 'cover' }} loading="lazy" />
                ) : (
                  item.cat === 'doctor' ? docIcon : imgIcon
                )}
              </div>
              <div className="gallery-overlay">
                <span className="gallery-overlay-tag">{item.tag}</span>
                <span className="gallery-overlay-title">{item.title}</span>
              </div>
              <div className="gallery-expand">{expandIcon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && current && (
        <div
          className="lightbox open"
          onClick={() => setLightbox(null)}
        >
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <span className="lightbox-counter">{lightbox + 1} / {filtered.length}</span>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>{closeIcon}</button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => setLightbox((lightbox - 1 + filtered.length) % filtered.length)}
            >{prevIcon}</button>
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => setLightbox((lightbox + 1) % filtered.length)}
            >{nextIcon}</button>
            <div className="lightbox-img" style={{ background: current.grad }}>
              {current.src ? (
                <Image src={current.src} alt={current.title} fill sizes="90vw" style={{ objectFit: 'contain' }} />
              ) : (
                current.cat === 'doctor' ? docIcon : imgIcon
              )}
            </div>
            <div className="lightbox-caption">
              <h3>{current.title}</h3>
              <span>{current.tag}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
