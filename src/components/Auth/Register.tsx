import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from './AuthLayout'

export const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/verify-otp', { state: { email } })
  }

  return (
    <AuthLayout title="Create your account" subtitle="Register to manage your bookings and hotels">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Create a password" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm your password" required />
        </Form.Group>

        <div className="text-center mb-4">
          <small className="text-muted">Already have an account? <Link to="/login">Login</Link></small>
        </div>

        <Button type="submit" variant="primary" className="w-100">
          Register
        </Button>
      </Form>
    </AuthLayout>
  )
}
