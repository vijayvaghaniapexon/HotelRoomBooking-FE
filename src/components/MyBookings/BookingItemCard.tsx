import { Badge, Button } from 'react-bootstrap'
import type { BookingConfirmation } from '../../types'

interface BookingItemCardProps {
  booking: BookingConfirmation
  canCancel: boolean
  isCancelling: boolean
  onCancel: (booking: BookingConfirmation) => void
}

const formatDate = (iso: string): string => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const formatDateTime = (iso: string): string => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const BookingItemCard = ({
  booking,
  canCancel,
  isCancelling,
  onCancel,
}: BookingItemCardProps) => {
  const statusVariant = booking.status === 'CANCELLED' ? 'danger' : 'success'
  const statusLabel = booking.status === 'CANCELLED' ? 'Cancelled' : 'Confirmed'

  return (
    <article className={`my-booking-card status-${booking.status.toLowerCase()}`}>
      <header className="my-booking-card-head">
        <div>
          <div className="my-booking-hotel">{booking.hotelName}</div>
          <div className="my-booking-room">{booking.roomType}</div>
        </div>
        <Badge bg={statusVariant} className="my-booking-status-badge">
          {statusLabel}
        </Badge>
      </header>

      <div className="my-booking-grid">
        <div>
          <span className="cell-label">Check-in</span>
          <span className="cell-value">{formatDate(booking.checkIn)}</span>
        </div>
        <div>
          <span className="cell-label">Check-out</span>
          <span className="cell-value">{formatDate(booking.checkOut)}</span>
        </div>
        <div>
          <span className="cell-label">Guests</span>
          <span className="cell-value">
            {booking.guests} · {booking.nights}{' '}
            {booking.nights === 1 ? 'night' : 'nights'}
          </span>
        </div>
        <div>
          <span className="cell-label">Total</span>
          <span className="cell-value strong">
            ₹{booking.total.toLocaleString()}
          </span>
        </div>
      </div>

      <footer className="my-booking-card-foot">
        <div className="my-booking-meta">
          <span>
            <strong>ID:</strong> {booking.bookingId}
          </span>
          <span>
            <strong>Booked:</strong> {formatDateTime(booking.createdAt)}
          </span>
          {booking.cancelledAt && (
            <span className="cancelled-line">
              <strong>Cancelled:</strong> {formatDateTime(booking.cancelledAt)}
            </span>
          )}
        </div>
        {canCancel && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onCancel(booking)}
            disabled={isCancelling}
            className="cancel-btn"
          >
            Cancel booking
          </Button>
        )}
      </footer>
    </article>
  )
}

export default BookingItemCard
