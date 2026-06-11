export const BASE_URL = 'http://localhost:8080/api'

export const API_ENDPOINTS = {
  HOTELS: {
    SEARCH: '/hotels/search',
    DETAIL: (hotelId: string) => `/hotels/${hotelId}`,
  },
  BOOKINGS: {
    CREATE: '/bookings',
    DETAIL: (bookingId: string) => `/bookings/${bookingId}`,
  },
}
