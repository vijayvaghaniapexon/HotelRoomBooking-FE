import type { SyntheticEvent } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import type { Room } from './types'

interface RoomFormModalProps {
  show: boolean
  isEditing: boolean
  formState: Room
  onChange: (field: keyof Room, value: string | number | boolean) => void
  onSave: (event: SyntheticEvent<HTMLFormElement>) => void
  onClose: () => void
}

function RoomFormModal({ show, isEditing, formState, onChange, onSave, onClose }: RoomFormModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? '✏️ Edit Room' : '✚ Add New Room'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSave}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="roomNumber">
                <Form.Label>Room Number <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 101"
                  value={formState.roomNumber}
                  onChange={(e) => onChange('roomNumber', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="roomType">
                <Form.Label>Room Type</Form.Label>
                <Form.Select
                  value={formState.roomType}
                  onChange={(e) => onChange('roomType', e.target.value)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="Penthouse">Penthouse</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="pricePerNight">
                <Form.Label>Price / Night ($) <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  placeholder="0"
                  value={formState.pricePerNight}
                  onChange={(e) => onChange('pricePerNight', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="maxOccupancy">
                <Form.Label>Max Occupancy <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  placeholder="1"
                  value={formState.maxOccupancy}
                  onChange={(e) => onChange('maxOccupancy', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="imageUrl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://..."
                  value={formState.imageUrl}
                  onChange={(e) => onChange('imageUrl', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="isActive">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formState.isActive ? 'true' : 'false'}
                  onChange={(e) => onChange('isActive', e.target.value)}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="roomDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the room features and amenities"
                  value={formState.description}
                  onChange={(e) => onChange('description', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="success">
            {isEditing ? 'Save Changes' : 'Add Room'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RoomFormModal
