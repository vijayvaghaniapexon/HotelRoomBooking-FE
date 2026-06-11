import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    fetchBookingAction,
    resetBookingAction,
} from '../../redux/booking/actions'
import type { RootState } from '../../redux/rootReducer'
import { EmptyState, Loader } from '../common'
import './Booking.css'

const formatBookedOn = (iso: string): string => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const BookingSuccessContainer = () => {
  const { bookingId = '' } = useParams<{ bookingId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [copied, setCopied] = useState(false)

  const { confirmation, fetching, error } = useSelector(
    (state: RootState) => state.booking,
  )

  useEffect(() => {
    if (!bookingId) return
    if (confirmation?.bookingId !== bookingId) {
      dispatch(fetchBookingAction(bookingId) as never)
    }
  }, [dispatch, bookingId, confirmation])

  const handleDone = () => {
    dispatch(resetBookingAction())
    navigate('/')
  }

  const handleBrowseMore = () => {
    dispatch(resetBookingAction())
    navigate('/hotels')
  }

  const handleCopyId = async () => {
    if (!confirmation) return
    try {
      await navigator.clipboard.writeText(confirmation.bookingId)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const handlePrint = () => {
    globalThis.print()
  }

  if (fetching) {
    return (
      <div className="booking-page">
        <Container>
          <Loader />
        </Container>
      </div>
    )
  }

  if (!confirmation) {
    return (
      <div className="booking-page">
        <Container>
          <EmptyState
            title="Booking not found"
            message={
              error ||
              "We couldn't locate this booking. It may have expired or the link is incorrect."
            }
          />
          <div className="booking-success-actions" style={{ marginTop: '1.4rem' }}>
            <Button className="btn-primary" onClick={() => navigate('/')}>
              Back to home
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <Container>
        <div className="booking-success-card">
          <div className="booking-success-check" aria-hidden="true">
            <svg viewBox="0 0 52 52" width="44" height="44">
              <circle
                className="booking-success-check-circle"
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
              />
              <path
                className="booking-success-check-path"
                fill="none"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27 L23 36 L39 18"
              />
            </svg>
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
            <span className="booking-id-value">{confirmation.bookingId}</span>
            <button
              type="button"
              className="booking-id-copy-btn"
              onClick={handleCopyId}
              aria-label="Copy booking ID"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
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
              <span className="label">Booked on</span>
              <span className="value">{formatBookedOn(confirmation.createdAt)}</span>
            </div>
            <div className="booking-success-row total">
              <span className="label">Total paid</span>
              <span className="value">
                ₹{confirmation.total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="booking-success-actions">
            <Button className="btn-outline" onClick={handlePrint}>
              Print receipt
            </Button>
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
