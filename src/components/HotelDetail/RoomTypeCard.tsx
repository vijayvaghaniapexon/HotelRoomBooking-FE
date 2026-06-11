import { Button } from 'react-bootstrap'
import type { AvailableRoom } from '../../types'

interface RoomTypeCardProps {
  room: AvailableRoom
  onBook: (roomId: string) => void
}

const RoomTypeCard = ({ room, onBook }: Readonly<RoomTypeCardProps>) => {
  const isLowAvailability = room.availableCount <= 2

  return (
    <article className="room-type-card">
      <img
        src={room.imageUrl}
        alt={room.roomType}
        className="room-image"
        loading="lazy"
      />

      <div className="room-info">
        <h4>{room.roomType}</h4>
        <p className="room-desc">{room.description}</p>

        <div className="room-meta">
          <span><strong>🛏</strong> {room.bedConfig}</span>
          <span><strong>👤</strong> Up to {room.maxOccupancy} guests</span>
        </div>

        <div className="room-amenities">
          {room.amenities.map((amenity) => (
            <span key={amenity} className="room-amenity-chip">{amenity}</span>
          ))}
        </div>
      </div>

      <div className="room-pricing">
        <div>
          <p className="room-price-amount">₹{room.pricePerNight.toLocaleString()}</p>
          <p className="room-price-suffix">per night</p>
        </div>

        <p className={`room-availability${isLowAvailability ? ' low' : ''}`}>
          {isLowAvailability
            ? `Only ${room.availableCount} left!`
            : `${room.availableCount} rooms available`}
        </p>

        <Button className="room-book-btn" onClick={() => onBook(room.id)}>
          Book Now
        </Button>
      </div>
    </article>
  )
}

export default RoomTypeCard
