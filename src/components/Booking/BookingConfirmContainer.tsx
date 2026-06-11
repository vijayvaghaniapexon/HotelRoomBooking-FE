import { useEffect, useMemo, useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
    createBookingAction,
    resetBookingAction,
} from '../../redux/booking/actions'
import {
    fetchHotelDetailAction,
    resetHotelDetailAction,
} from '../../redux/hotel/actions'
import type { RootState } from '../../redux/rootReducer'
import { getCurrentUser } from '../../utils/auth'
import { EmptyState, Loader } from '../common'
import './Booking.css'

const TAX_RATE = 0.12

const calcNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0
  const start = new Date(checkIn).getTime()
  const end = new Date(checkOut).getTime()
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0
  return Math.round((end - start) / (1000 * 60 * 60 * 24))
}

const BookingConfirmContainer = () => {
  const { hotelId = '', roomId = '' } = useParams<{
    hotelId: string
    roomId: string
  }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''

  const { detail, detailLoading, detailError } = useSelector(
    (state: RootState) => state.hotel,
  )
  const { creating, confirmation, error } = useSelector(
    (state: RootState) => state.booking,
  )

  const currentUser = getCurrentUser()

  const [guestName, setGuestName] = useState(currentUser?.name ?? '')
  const [guestEmail, setGuestEmail] = useState(currentUser?.email ?? '')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    if (!hotelId) return
    if (!detail || detail.id !== hotelId) {
      dispatch(fetchHotelDetailAction(hotelId, checkIn, checkOut) as never)
    }
    return () => {
      dispatch(resetBookingAction())
    }
  }, [dispatch, hotelId, checkIn, checkOut, detail])

  useEffect(() => {
    return () => {
      dispatch(resetHotelDetailAction())
    }
  }, [dispatch])

  const room = useMemo(
    () => detail?.rooms.find((r) => r.id === roomId) ?? null,
    [detail, roomId],
  )

  const nights = calcNights(checkIn, checkOut)
  const pricePerNight = room?.pricePerNight ?? 0
  const subtotal = pricePerNight * nights
  const taxes = Math.round(subtotal * TAX_RATE)
  const total = subtotal + taxes

  useEffect(() => {
    if (confirmation) {
      navigate(`/bookings/${confirmation.bookingId}/success`)
    }
  }, [confirmation, navigate])

  const handleConfirm = () => {
    if (!detail || !room) return
    dispatch(
      createBookingAction({
        hotelId: detail.id,
        hotelName: detail.name,
        roomId: room.id,
        roomType: room.roomType,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        checkIn,
        checkOut,
        guests,
        pricePerNight,
        nights,
        subtotal,
        taxes,
        total,
      }) as never,
    )
  }

  const isFormValid =
    guestName.trim().length > 1 &&
    /.+@.+\..+/.test(guestEmail) &&
    nights > 0 &&
    room !== null

  return (
    <div className="booking-page">
      <Container>
        <Button className="booking-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <h1 className="booking-title">Review &amp; confirm your booking</h1>
        <p className="booking-subtitle">
          Double-check your stay details and total price before confirming.
        </p>

        {detailLoading && <Loader />}

        {detailError && !detailLoading && (
          <EmptyState title="Hotel not available" message={detailError} />
        )}

        {!detailLoading && !detailError && detail && !room && (
          <EmptyState
            title="Room not available"
            message="This room is no longer available for the selected dates."
          />
        )}

        {!detailLoading && detail && room && (
          <div className="booking-grid">
            <div>
              <section className="booking-card">
                <h3>Your selected room</h3>
                <div className="booking-room-block">
                  <img src={room.imageUrl} alt={room.roomType} />
                  <div className="booking-room-info">
                    <h4>{room.roomType}</h4>
                    <div className="hotel-name-line">
                      at <strong>{detail.name}</strong> · {detail.city}
                    </div>
                    <div className="room-meta-line">
                      🛏 {room.bedConfig} · 👤 Up to {room.maxOccupancy} guests
                    </div>
                  </div>
                </div>

                <div className="booking-stay-row">
                  <div className="booking-stay-cell">
                    <span>Check-in</span>
                    <strong>{checkIn || '—'}</strong>
                  </div>
                  <div className="booking-stay-cell">
                    <span>Check-out</span>
                    <strong>{checkOut || '—'}</strong>
                  </div>
                  <div className="booking-stay-cell">
                    <span>Nights</span>
                    <strong>{nights}</strong>
                  </div>
                </div>
              </section>

              <section className="booking-card" style={{ marginTop: '1.2rem' }}>
                <h3>Guest details</h3>
                <Form className="booking-guest-form">
                  <Form.Group controlId="bookingGuestName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="As per ID proof"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="bookingGuestEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="bookingGuestCount">
                    <Form.Label>Number of guests</Form.Label>
                    <Form.Select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    >
                      {Array.from(
                        { length: room.maxOccupancy },
                        (_, i) => i + 1,
                      ).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </section>
            </div>

            <aside className="booking-card booking-summary-card">
              <h3>Price summary</h3>

              <div className="booking-summary-row">
                <span>
                  ₹{pricePerNight.toLocaleString()} × {nights}{' '}
                  {nights === 1 ? 'night' : 'nights'}
                </span>
                <strong>₹{subtotal.toLocaleString()}</strong>
              </div>

              <div className="booking-summary-row">
                <span>Taxes &amp; fees (12%)</span>
                <strong>₹{taxes.toLocaleString()}</strong>
              </div>

              <div className="booking-summary-total">
                <span className="total-label">Total payable</span>
                <span className="total-value">₹{total.toLocaleString()}</span>
              </div>

              {error && <div className="booking-error">{error}</div>}

              <Button
                className="booking-confirm-btn"
                disabled={!isFormValid || creating}
                onClick={handleConfirm}
              >
                {creating ? (
                  <>
                    <Spinner size="sm" animation="border" /> Confirming…
                  </>
                ) : (
                  `Confirm & Pay ₹${total.toLocaleString()}`
                )}
              </Button>

              <p className="booking-secure-note">
                🔒 Mock booking — no real payment is processed.
              </p>
            </aside>
          </div>
        )}
      </Container>
    </div>
  )
}

export default BookingConfirmContainer
