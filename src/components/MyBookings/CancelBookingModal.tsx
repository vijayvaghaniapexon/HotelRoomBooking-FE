import { Button, Modal, Spinner } from 'react-bootstrap'
import type { BookingConfirmation } from '../../types'

interface CancelBookingModalProps {
  show: boolean
  booking: BookingConfirmation | null
  isCancelling: boolean
  error: string | null
  onConfirm: () => void
  onClose: () => void
}

const CancelBookingModal = ({
  show,
  booking,
  isCancelling,
  error,
  onConfirm,
  onClose,
}: CancelBookingModalProps) => {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Cancel booking?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-2">
          You're about to cancel your reservation at{' '}
          <strong>{booking?.hotelName}</strong> ({booking?.roomType}).
        </p>
        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
          Check-in: <strong>{booking?.checkIn}</strong> · Check-out:{' '}
          <strong>{booking?.checkOut}</strong>
        </p>
        {error && (
          <div className="booking-error mt-3" role="alert">
            {error}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose} disabled={isCancelling}>
          Keep booking
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isCancelling}>
          {isCancelling ? (
            <>
              <Spinner size="sm" animation="border" /> Cancelling…
            </>
          ) : (
            'Yes, cancel booking'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CancelBookingModal
