import { Col, Row } from 'react-bootstrap'

function FeatureHighlights() {
  return (
    <Row className="justify-content-center home-features">
      <Col xs={4} md={3} className="feature-item">
        <div className="feature-icon">💰</div>
        <h6>Best Prices</h6>
        <p>Guaranteed low rates</p>
      </Col>
      <Col xs={4} md={3} className="feature-item">
        <div className="feature-icon">⭐</div>
        <h6>Top Rated</h6>
        <p>Verified guest reviews</p>
      </Col>
      <Col xs={4} md={3} className="feature-item">
        <div className="feature-icon">🔒</div>
        <h6>Secure Booking</h6>
        <p>Safe & easy payments</p>
      </Col>
    </Row>
  )
}

export default FeatureHighlights
