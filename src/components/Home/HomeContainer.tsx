import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FeatureHighlights from './FeatureHighlights'
import './Home.css'
import SearchPanel from './SearchPanel'

const HomeContainer = () => {
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
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <Container className="home-shell">
        <div className="home-hero">
          <span className="hero-chip">Trusted by 120k+ travelers</span>
          <h1>Stay Anywhere. Book Smarter.</h1>
          <p>Compare verified hotels, lock in great rates, and reserve your ideal room in minutes.</p>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <strong>4.8/5</strong>
              <span>Guest rating</span>
            </div>
            <div className="hero-stat-card">
              <strong>2,500+</strong>
              <span>Cities covered</span>
            </div>
            <div className="hero-stat-card">
              <strong>24/7</strong>
              <span>Support team</span>
            </div>
          </div>
        </div>

        <Row className="justify-content-center search-panel">
          <Col lg={10} xl={9}>
            <div className="search-panel-frame">
              <SearchPanel
                query={query}
                checkIn={checkIn}
                checkOut={checkOut}
                onQueryChange={setQuery}
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
                onSearch={handleSearch}
              />
            </div>
          </Col>
        </Row>

        <FeatureHighlights />
      </Container>
    </div>
  )
}

export default HomeContainer
