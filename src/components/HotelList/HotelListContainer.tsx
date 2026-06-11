import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchHotelsAction } from '../../redux/hotel/actions'
import type { RootState } from '../../redux/rootReducer'
import { EmptyState, Loader } from '../common'
import HotelCard from './HotelCard'
import './HotelList.css'
import NoHotelsFound from './NoHotelsFound'

const HotelListContainer = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const query = searchParams.get('q') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''

  const { loading, hotels, error } = useSelector((state: RootState) => state.hotel)

  useEffect(() => {
    dispatch(searchHotelsAction(query, checkIn, checkOut) as never)
  }, [dispatch, query, checkIn, checkOut])

  const handleViewRooms = (hotelId: string) => {
    navigate(`/hotels/${hotelId}?checkIn=${checkIn}&checkOut=${checkOut}`)
  }

  return (
    <div className="hotel-list-page">
      <Container>
        <div className="list-header mb-4">
          <Button variant="outline-light" size="sm" onClick={() => navigate('/')}>
            ← Back to Search
          </Button>
          <h2>
            Hotels {query && <>matching "<strong>{query}</strong>"</>}
          </h2>
          {checkIn && checkOut && (
            <p className="text-light-muted">{checkIn} → {checkOut}</p>
          )}
        </div>

        {loading && <Loader />}

        {error && <EmptyState title="Something went wrong" message={error} />}

        {!loading && !error && hotels.length === 0 && (
          <NoHotelsFound
            query={query}
            checkIn={checkIn}
            checkOut={checkOut}
            onClearFilters={() => navigate('/hotels')}
            onBackToSearch={() => navigate('/')}
          />
        )}

        {!loading && hotels.length > 0 && (
          <Row className="g-4">
            {hotels.map((hotel) => (
              <Col key={hotel.id} sm={6} lg={4}>
                <HotelCard hotel={hotel} onViewRooms={handleViewRooms} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default HotelListContainer
