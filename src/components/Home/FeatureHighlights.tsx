const FEATURES = [
  {
    id: 'best-prices',
    accent: 'price',
    title: 'Best Prices',
    description: 'Guaranteed low rates with exclusive member-only deals.',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
        <path
          d="M12 3v18M7 7h6.5a2.5 2.5 0 010 5H9a2.5 2.5 0 000 5h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'top-rated',
    accent: 'rated',
    title: 'Top Rated',
    description: 'Verified guest reviews on every hotel and room.',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
        <path
          d="M12 3l2.62 5.31 5.86.85-4.24 4.13 1 5.84L12 16.9l-5.24 2.76 1-5.84L3.52 9.69l5.86-.85L12 3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'secure-booking',
    accent: 'secure',
    title: 'Secure Booking',
    description: 'Encrypted payments and instant booking confirmations.',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
        <path
          d="M12 2l8 4v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const

const FeatureHighlights = () => {
  return (
    <div className="home-features">
      {FEATURES.map((feature) => (
        <article
          key={feature.id}
          className={`feature-card feature-card--${feature.accent}`}
        >
          <div className="feature-icon-wrap">
            <span className="feature-icon-glow" aria-hidden="true" />
            <span className="feature-icon-svg">{feature.icon}</span>
          </div>
          <h6 className="feature-title">{feature.title}</h6>
          <p className="feature-desc">{feature.description}</p>
        </article>
      ))}
    </div>
  )
}

export default FeatureHighlights
