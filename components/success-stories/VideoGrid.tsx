'use client'
import { useState } from 'react'
import defaultData from '../../data/default.json'
import type { VideoStory } from '@/lib/types'

const d = defaultData

const playIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
)

// Filters built from conditions in default.json -- specialty agnostic
const conditionFilters = (d.conditions || []).slice(0, 5).map((c: any) => ({
  label: c.title || c.label,
  value: (c.slug || (c.label || '').toLowerCase().replace(/\s+/g, '-')),
}))

const filters = [
  { label: 'All Stories', value: 'all' },
  ...conditionFilters,
]

export default function VideoGrid({ stories }: { stories: VideoStory[] }) {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? stories : stories.filter(s => s.category === active)

  return (
    <section className="videos-section">
      <div className="videos-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Patient Journeys</span></div>
          <h2 className="sec-title">Watch their stories.</h2>
          <p className="sec-sub">Filter by condition or procedure to find stories most relevant to you.</p>
        </div>
        <div className="filter-bar">
          {filters.map(f => (
            <button
              key={f.value}
              className={`filter-tab${active === f.value ? ' active' : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="videos-grid">
          {filtered.map((s, i) => (
            <div key={i} className="video-card">
              <div className="video-thumb">
                <div className="play-btn">{playIcon}</div>
              </div>
              <div className="video-info">
                <h3>{s.title}</h3>
                <p>{s.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
