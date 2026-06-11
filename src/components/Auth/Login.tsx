import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { loginMock } from '../../utils/auth'
import { AuthLayout } from './AuthLayout'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) return

    const localPart = trimmedEmail.split('@')[0] || 'Guest'
    const friendlyName = localPart
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())

    loginMock({
      id: `u-${Date.now().toString(36)}`,
      name: friendlyName,
      email: trimmedEmail,
    })

    const redirectTo = searchParams.get('redirectTo')
    navigate(redirectTo || '/', { replace: true })
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue to your booking dashboard">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-4 auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>

        <Button type="submit" variant="primary" className="w-100">
          Login
        </Button>
      </Form>
    </AuthLayout>
  )
}
