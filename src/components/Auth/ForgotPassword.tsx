import type { FormEvent } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthLayout } from './AuthLayout'

export function ForgotPassword() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email to reset your password">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="forgotPasswordEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" required />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mb-3">
          Send reset link
        </Button>

        <div className="text-center auth-links">
          <span className="me-2">Remembered your password?</span>
          <Link to="/login">Login</Link>
        </div>
      </Form>
    </AuthLayout>
  )
}
