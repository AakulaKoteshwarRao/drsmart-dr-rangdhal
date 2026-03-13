import defaultData from '../../data/default.json'

const d = defaultData
const specialty = (d.entity as any)?.medicalSpecialty || d.doctor?.experience?.[0]?.role || 'health'

export default function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="sec-label"><span>{d.clinic.name} Resources</span></div>
      <h1>Expert insights on <em>{specialty.toLowerCase()}.</em></h1>
      <p className="blog-hero-text">
        Articles, guides, and patient resources written by {d.doctor?.name || 'our specialist'} -- covering {specialty.toLowerCase()}, treatment options, and everything in between.
      </p>
    </section>
  )
}
