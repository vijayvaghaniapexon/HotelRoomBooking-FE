import type { ReactNode } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import './Auth.css'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} md={8} lg={5}>
            <Card className="auth-card shadow-sm">
              <Card.Body>
                <div className="auth-header mb-4 text-center">
                  <h2>{title}</h2>
                  {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
                </div>
                {children}
              </Card.Body>
              {footer && <Card.Footer className="bg-white text-center">{footer}</Card.Footer>}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
