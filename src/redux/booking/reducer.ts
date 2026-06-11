import type { BookingConfirmation } from '../../types'
import {
    BOOKING_CREATE_FAILURE,
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_FETCH_FAILURE,
    BOOKING_FETCH_REQUEST,
    BOOKING_FETCH_SUCCESS,
    BOOKING_RESET,
} from './actionTypes'

export interface BookingState {
  creating: boolean
  fetching: boolean
  confirmation: BookingConfirmation | null
  error: string | null
}

const initialState: BookingState = {
  creating: false,
  fetching: false,
  confirmation: null,
  error: null,
}

interface Action {
  type: string
  payload?: unknown
}

const bookingReducer = (state = initialState, action: Action): BookingState => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { ...state, creating: true, error: null }
    case BOOKING_CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        confirmation: action.payload as BookingConfirmation,
      }
    case BOOKING_CREATE_FAILURE:
      return { ...state, creating: false, error: action.payload as string }
    case BOOKING_FETCH_REQUEST:
      return { ...state, fetching: true, error: null }
    case BOOKING_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        confirmation: action.payload as BookingConfirmation,
      }
    case BOOKING_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        confirmation: null,
        error: action.payload as string,
      }
    case BOOKING_RESET:
      return initialState
    default:
      return state
  }
}

export default bookingReducer
