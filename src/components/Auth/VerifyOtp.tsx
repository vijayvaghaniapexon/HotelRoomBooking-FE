import type { FormEvent } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthLayout } from './AuthLayout'

export const VerifyOtp = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <AuthLayout title="Verify your account" subtitle="Enter the OTP sent to your email address">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="verifyOtpCode">
          <Form.Label>Verification code</Form.Label>
          <Form.Control type="text" placeholder="Enter verification code" maxLength={6} required />
          <Form.Text className="text-muted">Check your inbox for the 6-digit code.</Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mb-3">
          Verify OTP
        </Button>

        <div className="text-center auth-links">
          <span className="me-2">Didn’t receive a code?</span>
          <Link to="/forgot-password">Resend code</Link>
        </div>
      </Form>
    </AuthLayout>
  )
}
