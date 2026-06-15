import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { forgotPassword, resetPassword } from '../../api/authApi'
import { AuthLayout } from './AuthLayout'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetSubmitting, setIsResetSubmitting] = useState(false)
  const [showResetSuccessModal, setShowResetSuccessModal] = useState(false)
  const [isOtpStage, setIsOtpStage] = useState(false)

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailError('')
    setStatusMessage('')

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setEmailError('Email is required')
      return
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await forgotPassword({ email: trimmedEmail })

      if (res?.message === 'Invalid email') {
        setEmailError(res.message)
        return
      }

      setStatusMessage(res?.message || 'If this email exists, OTP has been sent.')
      setIsOtpStage(true)
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : ''

      if (message.toLowerCase().includes('invalid email')) {
        setEmailError(message)
      } else {
        setStatusMessage('Unable to send OTP right now. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOtpError('')
    setNewPasswordError('')
    setStatusMessage('')

    const trimmedOtp = otp.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = newPassword.trim()

    if (!trimmedOtp) {
      setOtpError('OTP is required')
      return
    }

    if (!trimmedPassword) {
      setNewPasswordError('New password is required')
      return
    }

    try {
      setIsResetSubmitting(true)
      const res = await resetPassword({
        email: trimmedEmail,
        otp: trimmedOtp,
        newPassword: trimmedPassword,
      })

      if (res?.message?.toLowerCase().includes('invalid otp')) {
        setOtpError(res.message)
        return
      }

      if (res?.message?.toLowerCase().includes('invalid password')) {
        setNewPasswordError(res.message)
        return
      }

      setShowResetSuccessModal(true)
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : ''

      if (message.toLowerCase().includes('invalid otp')) {
        setOtpError(message)
        return
      }

      if (message.toLowerCase().includes('invalid password')) {
        setNewPasswordError(message)
        return
      }

      setStatusMessage('Unable to reset password right now. Please try again.')
    } finally {
      setIsResetSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email to reset your password">
      {!isOtpStage ? (
        <Form onSubmit={handleEmailSubmit}>
          <Form.Group className="mb-3" controlId="forgotPasswordEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              isInvalid={Boolean(emailError)}
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3" disabled={isSubmitting}>
            {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
          </Button>

          {statusMessage && (
            <div className="auth-resend-toast visible is-success" role="status" aria-live="polite">
              {statusMessage}
            </div>
          )}

          <div className="text-center auth-links">
            <span className="me-2">Remembered your password?</span>
            <Link to="/login">Login</Link>
          </div>
        </Form>
      ) : (
        <Form onSubmit={handleResetSubmit}>
          <p className="text-muted mb-3">
            Enter OTP sent to <strong>{email}</strong> and set your new password.
          </p>

          <Form.Group className="mb-3" controlId="forgotPasswordOtp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value)
                if (otpError) setOtpError('')
              }}
              isInvalid={Boolean(otpError)}
            />
            <Form.Control.Feedback type="invalid">{otpError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="forgotPasswordNewPassword">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
                if (newPasswordError) setNewPasswordError('')
              }}
              isInvalid={Boolean(newPasswordError)}
            />
            <Form.Control.Feedback type="invalid">{newPasswordError}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3" disabled={isResetSubmitting}>
            {isResetSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>

          {statusMessage && (
            <div className="auth-resend-toast visible is-error" role="status" aria-live="polite">
              {statusMessage}
            </div>
          )}

          <div className="text-center auth-links">
            <span className="me-2">Remembered your password?</span>
            <Link to="/login">Login</Link>
          </div>
        </Form>
      )}

      <Modal show={showResetSuccessModal} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center py-4 px-4">
          <h4 className="mb-2">You have successfully reset your password</h4>
          <p className="text-muted mb-3">Now you can login.</p>
          <Link to="/login" className="btn btn-primary w-100">
            Login
          </Link>
        </Modal.Body>
      </Modal>
    </AuthLayout>
  )
}
