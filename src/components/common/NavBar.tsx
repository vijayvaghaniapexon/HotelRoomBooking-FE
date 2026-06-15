import { useEffect, useState } from 'react'
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, hasAuthToken, logoutMock, type AuthUser } from '../../utils/auth'
import './NavBar.css'

const AUTH_EVENT = 'hrb-auth-change'

const getInitial = (name: string): string => {
  const firstChar = name.trim().charAt(0)
  return (firstChar || 'G').toUpperCase()
}

const NavBar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthUser | null>(getCurrentUser())
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    const sync = () => {
      setUser(getCurrentUser())
    }
    window.addEventListener(AUTH_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(AUTH_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const handleLogout = () => {
    logoutMock();
    window.dispatchEvent(new Event(AUTH_EVENT))
    setUser(null)
    setShowLogoutConfirm(false)
    navigate('/', { replace: true })
  }

  const openLogoutConfirm = () => setShowLogoutConfirm(true)
  const closeLogoutConfirm = () => setShowLogoutConfirm(false)

  const hasToken = hasAuthToken()
  const displayName = user?.name || 'Guest'
  const isGuest = user?.role === 'GUEST'

  return (
    <Navbar expand="md" className="app-navbar" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="app-navbar-brand">
          <span className="brand-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="brand-text">StayEase</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="app-navbar-nav" />
        <Navbar.Collapse id="app-navbar-nav">

          <Nav className="ms-auto align-items-md-center">
            {hasToken ? (
              <NavDropdown
                align="end"
                className="profile-dropdown"
                title={
                  <span className="profile-toggle" title={displayName}>
                    <span className="profile-avatar profile-avatar-main" aria-hidden="true">
                      {getInitial(displayName)}
                    </span>
                  </span>
                }
                id="profile-nav-dropdown"
              >
                {isGuest && (
                  <>
                    <NavDropdown.Item as={Link} to="/my-bookings">
                      <span className="dd-icon" aria-hidden="true">📅</span>
                      My stays
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}
                <NavDropdown.Item onClick={openLogoutConfirm}>
                  <span className="dd-icon" aria-hidden="true">↩</span>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className="btn btn-light navbar-login-btn">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={showLogoutConfirm} onHide={closeLogoutConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={closeLogoutConfirm}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}

export default NavBar
