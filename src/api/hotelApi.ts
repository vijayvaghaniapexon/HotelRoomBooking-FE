import { mockHotelDetails } from '../components/HotelDetail/data'
import { mockHotels } from '../components/HotelList/data'
import type { BookingConfirmation, HotelDetail, HotelResult } from '../types'
// import axiosInstance from './axiosConfig'
// import { API_ENDPOINTS } from './endpoints'

interface SearchParams {
  query: string
  checkIn: string
  checkOut: string
}

export const searchHotels = async (params: SearchParams): Promise<HotelResult[]> => {
  // TODO: Replace with real API call
  // const response = await axiosInstance.get(API_ENDPOINTS.HOTELS.SEARCH, { params })
  // return response.data

  // Mock API response
  return new Promise((resolve) => {
    setTimeout(() => {
      const term = params.query.toLowerCase();
      const results = mockHotels.filter((h) => {
        const matchesQuery = h.city.toLowerCase().includes(term)
        const matchesDates =
          !params.checkIn || !params.checkOut ||
          (params.checkIn >= h.availableFrom && params.checkOut <= h.availableTo)
        return matchesQuery && matchesDates
      })
      resolve(results)
    }, 500)
  })
}

interface DetailParams {
  hotelId: string
  checkIn: string
  checkOut: string
}

export const getHotelDetail = async (params: DetailParams): Promise<HotelDetail> => {
  // TODO: Replace with real API call
  // const response = await axiosInstance.get(API_ENDPOINTS.HOTELS.DETAIL(params.hotelId), { params })
  // return response.data

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hotel = mockHotelDetails[params.hotelId]
      if (!hotel) {
        reject(new Error('Hotel not found'))
        return
      }

      const datesValid =
        !params.checkIn ||
        !params.checkOut ||
        (params.checkIn >= hotel.availableFrom && params.checkOut <= hotel.availableTo)

      const rooms = datesValid
        ? hotel.rooms.filter((room) => room.availableCount > 0)
        : []

      resolve({ ...hotel, rooms })
    }, 400)
  })
}

interface CreateBookingParams {
  hotelId: string
  hotelName: string
  roomId: string
  roomType: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  pricePerNight: number
  nights: number
  subtotal: number
  taxes: number
  total: number
}

const generateBookingId = (): string => {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `BKG-${ts}-${rand}`
}

export const createBooking = async (
  params: CreateBookingParams,
): Promise<BookingConfirmation> => {
  // TODO: Replace with real API call
  // const response = await axiosInstance.post(API_ENDPOINTS.BOOKINGS.CREATE, params)
  // return response.data

  return new Promise((resolve) => {
    setTimeout(() => {
      const confirmation: BookingConfirmation = {
        bookingId: generateBookingId(),
        ...params,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      }
      try {
        const key = 'hrb_bookings'
        const existing = localStorage.getItem(key)
        const list: BookingConfirmation[] = existing ? JSON.parse(existing) : []
        list.push(confirmation)
        localStorage.setItem(key, JSON.stringify(list))
      } catch {
        // ignore storage failures in mock layer
      }
      resolve(confirmation)
    }, 700)
  })
}

export const getBookingById = async (
  bookingId: string,
): Promise<BookingConfirmation> => {
  // TODO: Replace with real API call
  // const response = await axiosInstance.get(API_ENDPOINTS.BOOKINGS.DETAIL(bookingId))
  // return response.data

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const raw = localStorage.getItem('hrb_bookings')
        const list: BookingConfirmation[] = raw ? JSON.parse(raw) : []
        const match = list.find((b) => b.bookingId === bookingId)
        if (match) {
          resolve(match)
          return
        }
      } catch {
        // fall through to not-found
      }
      reject(new Error('Booking not found'))
    }, 350)
  })
}

export const getUserBookings = async (
  email: string,
): Promise<BookingConfirmation[]> => {
  // TODO: Replace with real API call
  // const response = await axiosInstance.get(API_ENDPOINTS.BOOKINGS.BY_USER(email))
  // return response.data

  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const raw = localStorage.getItem('hrb_bookings')
        const list: BookingConfirmation[] = raw ? JSON.parse(raw) : []
        const target = email.trim().toLowerCase()
        const filtered = list
          .filter((b) => b.guestEmail.toLowerCase() === target)
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        resolve(filtered)
      } catch {
        resolve([])
      }
    }, 400)
  })
}

export const cancelBooking = async (
  bookingId: string,
): Promise<BookingConfirmation> => {
  // TODO: Replace with real API call
  // const response = await axiosInstance.post(API_ENDPOINTS.BOOKINGS.CANCEL(bookingId))
  // return response.data

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const raw = localStorage.getItem('hrb_bookings')
        const list: BookingConfirmation[] = raw ? JSON.parse(raw) : []
        const idx = list.findIndex((b) => b.bookingId === bookingId)
        if (idx === -1) {
          reject(new Error('Booking not found'))
          return
        }
        const updated: BookingConfirmation = {
          ...list[idx],
          status: 'CANCELLED',
          cancelledAt: new Date().toISOString(),
        }
        list[idx] = updated
        localStorage.setItem('hrb_bookings', JSON.stringify(list))
        resolve(updated)
      } catch {
        reject(new Error('Unable to cancel booking'))
      }
    }, 500)
  })
}
