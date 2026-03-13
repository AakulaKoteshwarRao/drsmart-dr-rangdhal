import defaultData from '../../data/default.json'

const d = defaultData

export default function GalleryHero() {
  return (
    <section className="gallery-hero">
      <div className="sec-label"><span>Photo Gallery</span></div>
      <h1>Inside <em>{d.clinic?.name || 'Our Clinic'}.</em></h1>
      <p className="gallery-hero-text">
        A glimpse into our clinic, equipment, team, and patient milestones -- so you know exactly what to expect when you visit us.
      </p>
    </section>
  )
}
