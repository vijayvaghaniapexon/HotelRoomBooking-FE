export interface BookingDraft {
  hotelId: string
  hotelName: string
  roomId: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: number
  pricePerNight: number
  nights: number
  subtotal: number
  taxes: number
  total: number
}

export type BookingStatus = 'CONFIRMED' | 'CANCELLED'

export interface BookingConfirmation {
  bookingId: string
  hotelId: string
  hotelName: string
  roomId: string
  roomType: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  pricePerNight: number
  subtotal: number
  taxes: number
  total: number
  status: BookingStatus
  createdAt: string
  cancelledAt?: string
}
