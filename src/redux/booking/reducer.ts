import type { BookingConfirmation } from '../../types'
import {
    BOOKING_CANCEL_FAILURE,
    BOOKING_CANCEL_REQUEST,
    BOOKING_CANCEL_SUCCESS,
    BOOKING_CREATE_FAILURE,
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_FETCH_FAILURE,
    BOOKING_FETCH_REQUEST,
    BOOKING_FETCH_SUCCESS,
    BOOKING_LIST_FAILURE,
    BOOKING_LIST_REQUEST,
    BOOKING_LIST_SUCCESS,
    BOOKING_RESET,
} from './actionTypes'

export interface BookingState {
  creating: boolean
  fetching: boolean
  confirmation: BookingConfirmation | null
  error: string | null
  list: BookingConfirmation[]
  listLoading: boolean
  listError: string | null
  cancellingId: string | null
  cancelError: string | null
}

const initialState: BookingState = {
  creating: false,
  fetching: false,
  confirmation: null,
  error: null,
  list: [],
  listLoading: false,
  listError: null,
  cancellingId: null,
  cancelError: null,
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
    case BOOKING_LIST_REQUEST:
      return { ...state, listLoading: true, listError: null }
    case BOOKING_LIST_SUCCESS:
      return {
        ...state,
        listLoading: false,
        list: action.payload as BookingConfirmation[],
      }
    case BOOKING_LIST_FAILURE:
      return {
        ...state,
        listLoading: false,
        list: [],
        listError: action.payload as string,
      }
    case BOOKING_CANCEL_REQUEST:
      return {
        ...state,
        cancellingId: action.payload as string,
        cancelError: null,
      }
    case BOOKING_CANCEL_SUCCESS: {
      const updated = action.payload as BookingConfirmation
      return {
        ...state,
        cancellingId: null,
        list: state.list.map((b) =>
          b.bookingId === updated.bookingId ? updated : b,
        ),
      }
    }
    case BOOKING_CANCEL_FAILURE:
      return {
        ...state,
        cancellingId: null,
        cancelError: action.payload as string,
      }
    case BOOKING_RESET:
      return initialState
    default:
      return state
  }
}

export default bookingReducer
