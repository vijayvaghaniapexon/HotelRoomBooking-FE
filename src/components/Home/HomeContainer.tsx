import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import FeatureHighlights from './FeatureHighlights'
import SearchPanel from './SearchPanel'

function HomeContainer() {
  const [query, setQuery] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/hotels?q=${encodeURIComponent(query)}&checkIn=${checkIn}&checkOut=${checkOut}`)
  }

  return (
    <div className="home-page">
      <Link to="/login" className="login-link-top-right text-decoration-none">
        <Button variant="secondary" className="login-btn-subtle">Login</Button>
      </Link>
      <Container>
        <div className="home-hero">
          <h1>🏨 Find Your Perfect Stay</h1>
          <p>Discover and book the best hotels across hundreds of cities</p>
        </div>

        <Row className="justify-content-center search-panel">
          <Col lg={8} xl={7}>
            <SearchPanel
              query={query}
              checkIn={checkIn}
              checkOut={checkOut}
              onQueryChange={setQuery}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
              onSearch={handleSearch}
            />
          </Col>
        </Row>

        <FeatureHighlights />
      </Container>
    </div>
  )
}

export default HomeContainer
