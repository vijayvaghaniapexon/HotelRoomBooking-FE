import type { HotelDetail, HotelResult } from '../../types'
import {
    HOTEL_DETAIL_FAILURE,
    HOTEL_DETAIL_REQUEST,
    HOTEL_DETAIL_RESET,
    HOTEL_DETAIL_SUCCESS,
    HOTEL_SEARCH_FAILURE,
    HOTEL_SEARCH_REQUEST,
    HOTEL_SEARCH_SUCCESS,
} from './actionTypes'

export interface HotelState {
  loading: boolean
  hotels: HotelResult[]
  error: string | null
  detailLoading: boolean
  detail: HotelDetail | null
  detailError: string | null
}

const initialState: HotelState = {
  loading: false,
  hotels: [],
  error: null,
  detailLoading: false,
  detail: null,
  detailError: null,
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
    case HOTEL_DETAIL_REQUEST:
      return { ...state, detailLoading: true, detailError: null }
    case HOTEL_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detail: action.payload as HotelDetail,
      }
    case HOTEL_DETAIL_FAILURE:
      return {
        ...state,
        detailLoading: false,
        detailError: action.payload as string,
      }
    case HOTEL_DETAIL_RESET:
      return { ...state, detail: null, detailError: null, detailLoading: false }
    default:
      return state
  }
}

export default hotelReducer
