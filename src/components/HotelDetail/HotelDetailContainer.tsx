import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
    fetchHotelDetailAction,
    resetHotelDetailAction,
} from '../../redux/hotel/actions'
import type { RootState } from '../../redux/rootReducer'
import { EmptyState, Loader } from '../common'
import './HotelDetail.css'
import RoomTypeCard from './RoomTypeCard'

const renderStars = (count: number) => '★'.repeat(count) + '☆'.repeat(5 - count)

const HotelDetailContainer = () => {
  const { hotelId = '' } = useParams<{ hotelId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''

  const { detail, detailLoading, detailError } = useSelector(
    (state: RootState) => state.hotel,
  )

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchHotelDetailAction(hotelId, checkIn, checkOut) as never)
    }
    return () => {
      dispatch(resetHotelDetailAction())
    }
  }, [dispatch, hotelId, checkIn, checkOut])

  const handleBack = () => {
    navigate(-1)
  }

  const handleBookRoom = (roomId: string) => {
    navigate(
      `/hotels/${hotelId}/rooms/${roomId}/book?checkIn=${checkIn}&checkOut=${checkOut}`,
    )
  }

  return (
    <div className="hotel-detail-page">
      <Container>
        <Button className="detail-back-btn" onClick={handleBack}>
          ← Back to Results
        </Button>

        {detailLoading && <Loader />}

        {detailError && !detailLoading && (
          <EmptyState title="Hotel not available" message={detailError} />
        )}

        {!detailLoading && !detailError && detail && (
          <>
            <section className="hotel-hero-card">
              <img
                src={detail.gallery[0]}
                alt={detail.name}
                className="hotel-hero-cover"
              />
              <div className="hotel-hero-info">
                <div className="hotel-hero-meta">
                  <h1>{detail.name}</h1>
                  <div className="hotel-stars">{renderStars(detail.starRating)}</div>
                  <div className="hotel-address">📍 {detail.address}</div>
                </div>

                <div className="hotel-hero-stay">
                  <span>Your stay</span>
                  <strong>
                    {checkIn && checkOut ? `${checkIn} → ${checkOut}` : 'Select dates'}
                  </strong>
                </div>
              </div>
            </section>

            <section className="hotel-detail-section">
              <h3>About this hotel</h3>
              <p className="hotel-description">{detail.description}</p>
            </section>

            <section className="hotel-detail-section">
              <h3>Amenities</h3>
              <ul className="hotel-amenities">
                {detail.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </section>

            <section className="hotel-detail-section">
              <h3>
                Available rooms
                {checkIn && checkOut && (
                  <span style={{ fontWeight: 500, color: '#4a626a', fontSize: '0.9rem', marginLeft: 8 }}>
                    for {checkIn} → {checkOut}
                  </span>
                )}
              </h3>

              {detail.rooms.length === 0 ? (
                <div className="no-rooms-state">
                  <strong>No rooms available for selected dates</strong>
                  Try different check-in / check-out dates to see availability.
                </div>
              ) : (
                <div className="room-grid">
                  {detail.rooms.map((room) => (
                    <RoomTypeCard key={room.id} room={room} onBook={handleBookRoom} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </Container>
    </div>
  )
}

export default HotelDetailContainer
