import type { HotelResult } from '../../types'
import { HOTEL_SEARCH_FAILURE, HOTEL_SEARCH_REQUEST, HOTEL_SEARCH_SUCCESS } from './actionTypes'

export interface HotelState {
  loading: boolean
  hotels: HotelResult[]
  error: string | null
}

const initialState: HotelState = {
  loading: false,
  hotels: [],
  error: null,
}

interface Action {
  type: string
  payload?: unknown
}

const hotelReducer = (state = initialState, action: Action): HotelState => {
  switch (action.type) {
    case HOTEL_SEARCH_REQUEST:
      return { ...state, loading: true, error: null }
    case HOTEL_SEARCH_SUCCESS:
      return { ...state, loading: false, hotels: action.payload as HotelResult[] }
    case HOTEL_SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload as string }
    default:
      return state
  }
}

export default hotelReducer
