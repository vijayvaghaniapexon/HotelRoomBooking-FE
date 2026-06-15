import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/authApi'
import { AuthLayout } from './AuthLayout'

export const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touchedConfirm, setTouchedConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const passwordMismatch = useMemo(
    () =>
      confirmPassword.length > 0 && password !== confirmPassword,
    [password, confirmPassword],
  )

  const isFormValid =
    name.trim().length > 1 &&
    /.+@.+\..+/.test(email) &&
    password.length >= 6 &&
    password === confirmPassword

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouchedConfirm(true)
    setServerError(null)

    if (!isFormValid) return

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    try {
      setSubmitting(true)
      const res = await register({
        name: trimmedName,
        email: trimmedEmail,
        password,
      })

      if (res?.success === false) {
        setServerError(res?.message || 'Unable to register. Please try again.')
        return
      }

      navigate('/verify-otp', {
        state: { email: trimmedEmail, from: 'register' },
      })
    } catch (err) {
      const message =
        typeof err === 'string'
          ? err
          : err instanceof Error
            ? err.message
            : 'Unable to register. Please try again.'
      setServerError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Register to manage your bookings and hotels">
      <Form onSubmit={handleSubmit} noValidate>
        {serverError && (
          <Alert variant="danger" className="py-2 mb-3">
            {serverError}
          </Alert>
        )}

        <Form.Group className="mb-3" controlId="registerName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

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
          <Form.Control
            type="password"
            placeholder="Create a password (min 6 characters)"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={() => setTouchedConfirm(true)}
            isInvalid={(touchedConfirm || confirmPassword.length > 0) && passwordMismatch}
            required
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mb-4">
          <small className="text-muted">Already have an account? <Link to="/login">Login</Link></small>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-100"
          disabled={!isFormValid || submitting}
        >
          {submitting ? 'Registering…' : 'Register'}
        </Button>
      </Form>
    </AuthLayout>
  )
}
