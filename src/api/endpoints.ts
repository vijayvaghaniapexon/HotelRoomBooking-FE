export const BASE_URL = '/api'

export const API_ENDPOINTS = {
  HOTELS: {
    SEARCH: '/hotels/search',
    DETAIL: (hotelId: string) => `/hotels/${hotelId}`,
  },
  BOOKINGS: {
    CREATE: '/bookings',
    DETAIL: (bookingId: string) => `/bookings/${bookingId}`,
    BY_USER: (email: string) => `/bookings/user/${encodeURIComponent(email)}`,
    CANCEL: (bookingId: string) => `/bookings/${bookingId}/cancel`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  }
}
