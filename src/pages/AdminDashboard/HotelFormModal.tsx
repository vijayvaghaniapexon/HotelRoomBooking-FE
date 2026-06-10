import type { SyntheticEvent } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import type { Hotel } from './types'

interface HotelFormModalProps {
  show: boolean
  isEditing: boolean
  formState: Hotel
  onChange: (field: keyof Hotel, value: string) => void
  onSave: (event: SyntheticEvent<HTMLFormElement>) => void
  onClose: () => void
}

function HotelFormModal({ show, isEditing, formState, onChange, onSave, onClose }: HotelFormModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? '✏️ Edit Hotel' : '✚ Add New Hotel'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSave}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="hotelName">
                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter hotel name"
                  value={formState.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="hotelCity">
                <Form.Label>City <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City or location"
                  value={formState.city}
                  onChange={(e) => onChange('city', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="hotelRating">
                <Form.Label>Star Rating</Form.Label>
                <Form.Select
                  value={formState.starRating}
                  onChange={(e) => onChange('starRating', e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="hotelManager">
                <Form.Label>Manager ID <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. MGR-123"
                  value={formState.managerId}
                  onChange={(e) => onChange('managerId', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="hotelCoverImage">
                <Form.Label>Cover Image URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://..."
                  value={formState.coverImageUrl}
                  onChange={(e) => onChange('coverImageUrl', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="hotelDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the hotel amenities and experience"
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
            {isEditing ? 'Save Changes' : 'Add Hotel'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default HotelFormModal
