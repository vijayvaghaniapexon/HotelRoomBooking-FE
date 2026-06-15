import { Button, Modal } from 'react-bootstrap'
import './RegistrationSuccessModal.css'

interface RegistrationSuccessModalProps {
  show: boolean
  email?: string
  onGoHome: () => void
  onGoLogin: () => void
}

export const RegistrationSuccessModal = ({
  show,
  email,
  onGoHome,
  onGoLogin,
}: RegistrationSuccessModalProps) => {
  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="registration-success-modal"
    >
      <Modal.Body className="text-center py-4 px-4">
        <div className="registration-success-badge" aria-hidden="true">
          <span className="registration-success-badge-symbol">✨</span>
        </div>

        <h4 className="registration-success-title">Thank you for registering!</h4>
        <p className="registration-success-msg">
          Your account
          {email ? (
            <> for <strong>{email}</strong></>
          ) : null}{' '}
          has been verified successfully. You can now log in to start booking
          your perfect stay.
        </p>

        <div className="registration-success-actions">
          <Button
            variant="outline-secondary"
            className="registration-success-btn"
            onClick={onGoHome}
          >
            Go to Home
          </Button>
          <Button
            variant="primary"
            className="registration-success-btn registration-success-btn-primary"
            onClick={onGoLogin}
          >
            Login now
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RegistrationSuccessModal
