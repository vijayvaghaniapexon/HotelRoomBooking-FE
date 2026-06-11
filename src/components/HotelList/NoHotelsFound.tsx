import { Button } from 'react-bootstrap'

interface NoHotelsFoundProps {
  query?: string
  checkIn?: string
  checkOut?: string
  onClearFilters: () => void
  onBackToSearch: () => void
}

const suggestionCities = ['Mumbai', 'Goa', 'Jaipur', 'Bengaluru', 'Udaipur']

const NoHotelsFound = ({
  query,
  checkIn,
  checkOut,
  onClearFilters,
  onBackToSearch,
}: Readonly<NoHotelsFoundProps>) => {
  const hasFilters = Boolean(query || checkIn || checkOut)

  return (
    <div className="no-hotels-found">
      <div className="nhf-illustration" aria-hidden="true">
        <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nhfSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d6577" />
              <stop offset="100%" stopColor="#0d2f37" />
            </linearGradient>
            <linearGradient id="nhfBuilding" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cfe6ed" />
            </linearGradient>
          </defs>

          <circle cx="110" cy="90" r="78" fill="url(#nhfSky)" opacity="0.55" />
          <circle cx="170" cy="46" r="14" fill="#ef8354" opacity="0.85" />

          <g transform="translate(58 58)">
            <rect x="0" y="30" width="44" height="70" rx="4" fill="url(#nhfBuilding)" />
            <rect x="48" y="10" width="56" height="90" rx="4" fill="url(#nhfBuilding)" />

            <g fill="#0f8ea5" opacity="0.85">
              <rect x="6" y="40" width="8" height="8" rx="1" />
              <rect x="20" y="40" width="8" height="8" rx="1" />
              <rect x="6" y="56" width="8" height="8" rx="1" />
              <rect x="20" y="56" width="8" height="8" rx="1" />
              <rect x="6" y="72" width="8" height="8" rx="1" />
              <rect x="20" y="72" width="8" height="8" rx="1" />

              <rect x="54" y="22" width="8" height="8" rx="1" />
              <rect x="68" y="22" width="8" height="8" rx="1" />
              <rect x="82" y="22" width="8" height="8" rx="1" />
              <rect x="54" y="38" width="8" height="8" rx="1" />
              <rect x="82" y="38" width="8" height="8" rx="1" />
              <rect x="54" y="54" width="8" height="8" rx="1" />
              <rect x="68" y="54" width="8" height="8" rx="1" />
              <rect x="82" y="54" width="8" height="8" rx="1" />
              <rect x="54" y="70" width="8" height="8" rx="1" />
              <rect x="82" y="70" width="8" height="8" rx="1" />
            </g>

            <rect x="68" y="84" width="16" height="16" rx="1.5" fill="#ef8354" />
          </g>

          <g transform="translate(126 92)">
            <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.96)" />
            <circle cx="20" cy="20" r="12" fill="none" stroke="#0b6f82" strokeWidth="3.6" />
            <line x1="29" y1="29" x2="40" y2="40" stroke="#0b6f82" strokeWidth="4" strokeLinecap="round" />
            <line x1="15" y1="20" x2="25" y2="20" stroke="#ef8354" strokeWidth="2.4" strokeLinecap="round" />
          </g>

          <ellipse cx="110" cy="160" rx="78" ry="6" fill="rgba(0,0,0,0.25)" />
        </svg>
      </div>

      <h3 className="nhf-title">No hotels match your search</h3>
      <p className="nhf-subtitle">
        {query ? (
          <>
            We couldn’t find any stays in <strong>“{query}”</strong>
            {checkIn && checkOut && (
              <>
                {' '}for <strong>{checkIn}</strong> → <strong>{checkOut}</strong>
              </>
            )}
            .
          </>
        ) : (
          <>Try widening your dates or exploring a different city.</>
        )}
      </p>

      <div className="nhf-tips">
        <span className="nhf-tip">✓ Check the spelling of your city</span>
        <span className="nhf-tip">✓ Try a nearby destination</span>
        <span className="nhf-tip">✓ Adjust your check-in / check-out dates</span>
      </div>

      <div className="nhf-suggestions">
        <span className="nhf-suggestions-label">Popular right now:</span>
        <div className="nhf-chips">
          {suggestionCities.map((city) => (
            <a
              key={city}
              href={`/hotels?q=${encodeURIComponent(city)}`}
              className="nhf-chip"
            >
              {city}
            </a>
          ))}
        </div>
      </div>

      <div className="nhf-actions">
        {hasFilters && (
          <Button variant="light" className="nhf-btn nhf-btn-secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
        <Button className="nhf-btn nhf-btn-primary" onClick={onBackToSearch}>
          Start a new search
        </Button>
      </div>
    </div>
  )
}

export default NoHotelsFound
