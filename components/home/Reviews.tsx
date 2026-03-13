import type { ReviewItem, ReviewSummary } from '@/lib/types'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const WriteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

export default function Reviews({
  reviews, summary
}: { reviews: ReviewItem[]; summary: ReviewSummary }) {
  return (
    <section className="reviews-section">
      <div className="reviews-inner">
        <div className="sec-header">
          <div className="sec-label"><span>Patient Reviews</span></div>
          <h2 className="sec-title">What our patients say.</h2>
          <div className="reviews-rating">
            <span className="reviews-score">{summary.score}</span>
            <div>
              <span className="reviews-stars">*****</span>
              <span className="reviews-count">{summary.count}</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-top">
                <div className="review-avatar">{review.initials}</div>
                <div className="review-meta">
                  <span className="review-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <span className="review-stars">*****</span>
              </div>
              <p>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="reviews-actions">
          <a href={summary.googleUrl} target="_blank" rel="noreferrer" className="rev-btn rev-more">
            Read More Reviews <ArrowIcon />
          </a>
          <a href={summary.googleUrl} target="_blank" rel="noreferrer" className="rev-btn rev-write">
            Write a Review <WriteIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
