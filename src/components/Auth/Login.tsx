import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../../api/authApi'
import { deriveNameFromEmail, deriveRoleFromEmail, getDefaultRouteForRole, type UserRole } from '../../utils/auth'
import { AuthLayout } from './AuthLayout'

const AUTH_EVENT = 'hrb-auth-change'
const AUTH_KEY = 'hrb_auth_user'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPasswordError('')
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) return;

    try {
      const res = await login({ email: trimmedEmail, password })

      if (res?.token) {
        const redirectTo = searchParams.get('redirectTo')
        const role = String(res?.user?.role ?? deriveRoleFromEmail(trimmedEmail)).toUpperCase() as UserRole
        const name = res?.user?.name ?? deriveNameFromEmail(trimmedEmail)
        const emailValue = res?.user?.email ?? trimmedEmail

        localStorage.setItem('token', res.token)
        localStorage.setItem(
          AUTH_KEY,
          JSON.stringify({
            id: String(res?.user?.id ?? emailValue),
            name,
            email: emailValue,
            role,
          })
        )
        window.dispatchEvent(new Event(AUTH_EVENT))
        navigate(redirectTo || getDefaultRouteForRole(role), { replace: true })
      }

      if (res?.message === 'Invalid email or password') {
        setPasswordError(res.message)
      }
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : ''

      if (message === 'Invalid email or password') {
        setPasswordError(message)
      }
    }
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
            onChange={(e) => {
              setPassword(e.target.value)
              if (passwordError) setPasswordError('')
            }}
            isInvalid={Boolean(passwordError)}
            required
          />
          <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
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
