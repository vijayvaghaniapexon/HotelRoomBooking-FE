import { Button, Card } from 'react-bootstrap'
import type { HotelResult } from '../../types'

interface HotelCardProps {
  hotel: HotelResult
  onViewRooms: (hotelId: string) => void
}

const renderStars = (count: number) => '★'.repeat(count) + '☆'.repeat(5 - count)

const HotelCard = ({ hotel, onViewRooms }: Readonly<HotelCardProps>) => {
  const handleCardClick = () => onViewRooms(hotel.id)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onViewRooms(hotel.id)
    }
  }

  return (
    <Card
      className="hotel-card h-100"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <div className="hotel-cover-wrapper">
        <Card.Img variant="top" src={hotel.coverImage} className="hotel-cover" />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="hotel-name">{hotel.name}</Card.Title>
        <div className="hotel-stars">{renderStars(hotel.starRating)}</div>
        <p className="hotel-city">📍 {hotel.city}</p>
        <p className="hotel-price mt-auto">
          From <strong>₹{hotel.pricePerNight.toLocaleString()}</strong>/night
        </p>
        <Button
          className="view-rooms-btn"
          onClick={(event) => {
            event.stopPropagation()
            onViewRooms(hotel.id)
          }}
        >
          View Rooms
        </Button>
      </Card.Body>
    </Card>
  )
}

export default HotelCard
