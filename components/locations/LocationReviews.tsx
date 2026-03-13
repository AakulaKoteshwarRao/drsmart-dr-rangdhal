const reviews = [
  { quote: 'Very convenient location. Easy to reach. The clinic is well-maintained and the staff is very helpful.', author: 'Suresh R.' },
  { quote: 'I travel some distance for my appointments. It is always worth it. Excellent doctor and clinic.', author: 'Priya D.' },
  { quote: 'Easy to find the clinic. My elderly father had no trouble reaching it. The doctor was very thorough and patient.', author: 'Anil K.' },
]

const starPath = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"

export default function LocationReviews() {
  return (
    <section className="loc-reviews">
      <div className="sec-header" style={{ textAlign: 'center' }}>
        <div className="sec-label" style={{ justifyContent: 'center' }}><span>Patient Reviews</span></div>
        <h2 className="sec-title">What patients from this area say.</h2>
      </div>
      <div className="loc-reviews-grid">
        {reviews.map((r, i) => (
          <div key={i} className="loc-review-card" style={{ padding: '1.5rem' }}>
            <div className="loc-review-stars">
              {[0,1,2,3,4].map(j => <svg key={j} viewBox="0 0 24 24"><path d={starPath}/></svg>)}
            </div>
            <p className="loc-review-text">"{r.quote}"</p>
            <span className="loc-review-name">-- {r.author}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
