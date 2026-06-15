import { useEffect, useMemo, useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    cancelBookingAction,
    fetchUserBookingsAction,
} from '../../redux/booking/actions'
import type { RootState } from '../../redux/rootReducer'
import type { BookingConfirmation } from '../../types'
import { getCurrentUser } from '../../utils/auth'
import { EmptyState, Loader } from '../common'
import BookingItemCard from './BookingItemCard'
import CancelBookingModal from './CancelBookingModal'
import './MyBookings.css'

type TabKey = 'upcoming' | 'past' | 'cancelled'

const startOfToday = (): number => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now.getTime()
}

const partitionBookings = (bookings: BookingConfirmation[]) => {
  const today = startOfToday()
  const upcoming: BookingConfirmation[] = []
  const past: BookingConfirmation[] = []
  const cancelled: BookingConfirmation[] = []

  bookings.forEach((b) => {
    if (b.status === 'CANCELLED') {
      cancelled.push(b)
      return
    }
    const checkOutMs = new Date(b.checkOut).getTime()
    if (Number.isNaN(checkOutMs) || checkOutMs >= today) {
      upcoming.push(b)
    } else {
      past.push(b)
    }
  })

  return { upcoming, past, cancelled }
}

const MyBookingsContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = getCurrentUser()

  const { list, listLoading, listError, cancellingId, cancelError } =
    useSelector((state: RootState) => state.booking)

  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const [pendingCancel, setPendingCancel] =
    useState<BookingConfirmation | null>(null)
  const [lastCancelledId, setLastCancelledId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login?redirectTo=/my-bookings', { replace: true })
      return
    }
    dispatch(fetchUserBookingsAction(user.email) as never)
  }, [dispatch, navigate, user])

  // Close cancel modal once cancellation completes successfully.
  useEffect(() => {
    if (
      pendingCancel &&
      lastCancelledId === pendingCancel.bookingId &&
      cancellingId === null &&
      !cancelError
    ) {
      setPendingCancel(null)
      setLastCancelledId(null)
    }
  }, [cancellingId, cancelError, pendingCancel, lastCancelledId])

  const { upcoming, past, cancelled } = useMemo(
    () => partitionBookings(list),
    [list],
  )

  const visibleBookings: BookingConfirmation[] =
    activeTab === 'upcoming'
      ? upcoming
      : activeTab === 'past'
        ? past
        : cancelled

  const handleRequestCancel = (booking: BookingConfirmation) => {
    setPendingCancel(booking)
  }

  const handleConfirmCancel = () => {
    if (!pendingCancel) return
    setLastCancelledId(pendingCancel.bookingId)
    dispatch(cancelBookingAction(pendingCancel.bookingId) as never)
  }

  const handleCloseCancelModal = () => {
    if (cancellingId) return
    setPendingCancel(null)
    setLastCancelledId(null)
  }

  if (!user) return null

  return (
    <div className="my-bookings-page">
      <Container>
        <header className="my-bookings-header">
          <h1>My Bookings</h1>
          <p>
            Review your upcoming stays, revisit past trips, and cancel
            reservations you no longer need.
          </p>
        </header>

        <div className="my-bookings-tabs-wrap">
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(key) => key && setActiveTab(key as TabKey)}
            className="my-bookings-tabs"
          >
            <Nav.Item>
              <Nav.Link eventKey="upcoming">
                Upcoming
                <span className="tab-count">{upcoming.length}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="past">
                Past
                <span className="tab-count">{past.length}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cancelled">
                Cancelled
                <span className="tab-count">{cancelled.length}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {listLoading && <Loader />}

        {!listLoading && listError && (
          <EmptyState title="Unable to load bookings" message={listError} />
        )}

        {!listLoading && !listError && visibleBookings.length === 0 && (
          <EmptyState
            title={
              activeTab === 'upcoming'
                ? 'No upcoming stays'
                : activeTab === 'past'
                  ? 'No past stays yet'
                  : 'No cancelled bookings'
            }
            message={
              activeTab === 'upcoming'
                ? "You don't have any upcoming reservations. Browse hotels to plan your next stay."
                : activeTab === 'past'
                  ? 'Completed stays will appear here once your trips are done.'
                  : 'Cancelled bookings will show up here for your records.'
            }
          />
        )}

        {!listLoading && !listError && visibleBookings.length > 0 && (
          <div className="my-bookings-list">
            {visibleBookings.map((booking) => (
              <BookingItemCard
                key={booking.bookingId}
                booking={booking}
                canCancel={activeTab === 'upcoming'}
                isCancelling={cancellingId === booking.bookingId}
                onCancel={handleRequestCancel}
              />
            ))}
          </div>
        )}
      </Container>

      <CancelBookingModal
        show={!!pendingCancel}
        booking={pendingCancel}
        isCancelling={
          pendingCancel ? cancellingId === pendingCancel.bookingId : false
        }
        error={cancelError}
        onConfirm={handleConfirmCancel}
        onClose={handleCloseCancelModal}
      />
    </div>
  )
}

export default MyBookingsContainer
