import type { Dispatch } from 'redux'
import { createBooking, getBookingById } from '../../api/hotelApi'
import {
    BOOKING_CREATE_FAILURE,
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_FETCH_FAILURE,
    BOOKING_FETCH_REQUEST,
    BOOKING_FETCH_SUCCESS,
    BOOKING_RESET,
} from './actionTypes'

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

export const createBookingAction = (params: CreateBookingParams) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: BOOKING_CREATE_REQUEST })
    try {
      const data = await createBooking(params)
      dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to confirm booking'
      dispatch({ type: BOOKING_CREATE_FAILURE, payload: message })
    }
  }
}

export const fetchBookingAction = (bookingId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: BOOKING_FETCH_REQUEST })
    try {
      const data = await getBookingById(bookingId)
      dispatch({ type: BOOKING_FETCH_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to load booking'
      dispatch({ type: BOOKING_FETCH_FAILURE, payload: message })
    }
  }
}

export const resetBookingAction = () => ({ type: BOOKING_RESET })
