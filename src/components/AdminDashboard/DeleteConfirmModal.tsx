import { Button, Modal } from 'react-bootstrap'

interface DeleteConfirmModalProps {
  show: boolean
  hotelName: string | undefined
  onConfirm: () => void
  onClose: () => void
}

const DeleteConfirmModal = ({ show, hotelName, onConfirm, onClose }: DeleteConfirmModalProps) => {
  return (
    <Modal show={show} onHide={onClose} centered className="delete-modal">
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{hotelName}</strong>? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>🗑️ Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmModal
