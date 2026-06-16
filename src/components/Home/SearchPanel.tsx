import type { SyntheticEvent } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface SearchPanelProps {
  query: string
  checkIn: string
  checkOut: string
  onQueryChange: (value: string) => void
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
  onSearch: (e: SyntheticEvent<HTMLFormElement>) => void
}

function SearchPanel({
  query, checkIn, checkOut,
  onQueryChange, onCheckInChange, onCheckOutChange, onSearch,
}: SearchPanelProps) {
  return (
    <Card className="search-card">
      <Card.Body>
        <Form onSubmit={onSearch}>
          <Form.Group className="mb-3">
            <Form.Label>Hotel Name / City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter hotel name or city"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Check-in Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkIn}
                  onChange={(e) => onCheckInChange(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Check-out Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkOut}
                  onChange={(e) => onCheckOutChange(e.target.value)}
                  min={checkIn}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="w-100 search-btn">
            Search Hotels
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SearchPanel
