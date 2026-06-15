import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { resendOtp, verifyOtp } from '../../api/authApi'
import { AuthLayout } from './AuthLayout'
import { RegistrationSuccessModal } from './RegistrationSuccessModal'

type VerifyOtpLocationState = {
  email?: string
  redirectTo?: string | null
  from?: 'register' | 'login'
}

const RESEND_TOAST_MS = 4000

export const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [resendVariant, setResendVariant] = useState<'success' | 'error'>('success')
  const resendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as VerifyOtpLocationState | null) ?? {}
  const email = state.email ?? ''
  const redirectTo = state.redirectTo ?? null
  const isRegisterFlow = state.from === 'register'

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) {
        clearTimeout(resendTimerRef.current)
      }
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedOtp = otp.trim()
    if (!email || !trimmedOtp) return

    const res = await verifyOtp({ email, otp: trimmedOtp })

    if (res?.message === 'OTP verified successfully') {
      setShowRegisterSuccess(true)
    }
  }

  const showResendToast = (message: string, variant: 'success' | 'error') => {
    if (resendTimerRef.current) {
      clearTimeout(resendTimerRef.current)
    }
    setResendMessage(message)
    setResendVariant(variant)
    resendTimerRef.current = setTimeout(() => {
      setResendMessage(null)
      resendTimerRef.current = null
    }, RESEND_TOAST_MS)
  }

  const handleResendOtp = async () => {
    if (!email || isResending) return
    setIsResending(true)
    setResendMessage(null)
    try {
      await resendOtp({ email })
      showResendToast('A new OTP has been sent to your email.', 'success')
    } catch {
      showResendToast(
        'Failed to resend OTP. Please try again in a moment.',
        'error',
      )
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthLayout title="Verify your account" subtitle="Enter the OTP sent to your email address">
      <Form onSubmit={handleSubmit}>
        {email && (
          <p className="text-muted mb-3">
            Code sent to <strong>{email}</strong>
          </p>
        )}
        <Form.Group className="mb-3" controlId="verifyOtpCode">
          <Form.Label>Verification code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter verification code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Form.Text className="text-muted">Check your inbox for the 6-digit code.</Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mb-3">
          Verify OTP
        </Button>

        <div className="text-center auth-links">
          <span className="me-2">Didn’t receive a code?</span>
          <Button
            variant="link"
            type="button"
            onClick={handleResendOtp}
            disabled={isResending || !email}
            className="auth-resend-btn p-0 align-baseline"
          >
            {isResending ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-1"
                />
                Sending…
              </>
            ) : (
              'Resend code'
            )}
          </Button>
        </div>

        <div
          className={`auth-resend-toast ${resendMessage ? 'visible' : ''} ${
            resendVariant === 'error' ? 'is-error' : 'is-success'
          }`}
          role="status"
          aria-live="polite"
        >
          {resendMessage}
        </div>
      </Form>

      <RegistrationSuccessModal
        show={showRegisterSuccess}
        email={email}
        onGoHome={() => navigate('/', { replace: true })}
        onGoLogin={() => navigate('/login', { replace: true })}
      />
    </AuthLayout>
  )
}
