import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetBookingAction } from '../../redux/booking/actions'
import type { RootState } from '../../redux/rootReducer'
import './Booking.css'

const BookingSuccessContainer = () => {
  const { bookingId = '' } = useParams<{ bookingId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { confirmation } = useSelector((state: RootState) => state.booking)

  useEffect(() => {
    if (!confirmation || confirmation.bookingId !== bookingId) {
      navigate('/', { replace: true })
    }
  }, [confirmation, bookingId, navigate])

  const handleDone = () => {
    dispatch(resetBookingAction())
    navigate('/')
  }

  const handleBrowseMore = () => {
    dispatch(resetBookingAction())
    navigate('/hotels')
  }

  if (!confirmation) return null

  return (
    <div className="booking-page">
      <Container>
        <div className="booking-success-card">
          <div className="booking-success-check" aria-hidden="true">
            ✓
          </div>
          <h2>Booking confirmed!</h2>
          <p className="booking-success-msg">
            Thanks {confirmation.guestName.split(' ')[0] || 'guest'}, your stay
            at <strong>{confirmation.hotelName}</strong> is locked in. A
            confirmation has been sent to{' '}
            <strong>{confirmation.guestEmail}</strong>.
          </p>

          <div className="booking-id-pill">
            <span className="booking-id-label">Booking ID</span>
            {confirmation.bookingId}
          </div>

          <div className="booking-success-details">
            <div className="booking-success-row">
              <span className="label">Hotel</span>
              <span className="value">{confirmation.hotelName}</span>
            </div>
            <div className="booking-success-row">
              <span className="label">Room</span>
              <span className="value">{confirmation.roomType}</span>
            </div>
            <div className="booking-success-row">
              <span className="label">Check-in</span>
              <span className="value">{confirmation.checkIn}</span>
            </div>
            <div className="booking-success-row">
              <span className="label">Check-out</span>
              <span className="value">{confirmation.checkOut}</span>
            </div>
            <div className="booking-success-row">
              <span className="label">Guests</span>
              <span className="value">
                {confirmation.guests} ·{' '}
                {confirmation.nights}{' '}
                {confirmation.nights === 1 ? 'night' : 'nights'}
              </span>
            </div>
            <div className="booking-success-row">
              <span className="label">Total paid</span>
              <span className="value">
                ₹{confirmation.total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="booking-success-actions">
            <Button className="btn-outline" onClick={handleBrowseMore}>
              Browse more hotels
            </Button>
            <Button className="btn-primary" onClick={handleDone}>
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BookingSuccessContainer
