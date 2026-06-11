import type { Dispatch } from 'redux'
import { getHotelDetail, searchHotels } from '../../api/hotelApi'
import {
    HOTEL_DETAIL_FAILURE,
    HOTEL_DETAIL_REQUEST,
    HOTEL_DETAIL_RESET,
    HOTEL_DETAIL_SUCCESS,
    HOTEL_SEARCH_FAILURE,
    HOTEL_SEARCH_REQUEST,
    HOTEL_SEARCH_SUCCESS,
} from './actionTypes'

export const searchHotelsAction = (query: string, checkIn: string, checkOut: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: HOTEL_SEARCH_REQUEST })
    try {
      const data = await searchHotels({ query, checkIn, checkOut })
      dispatch({ type: HOTEL_SEARCH_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: HOTEL_SEARCH_FAILURE, payload: error })
    }
  }
}

export const fetchHotelDetailAction = (
  hotelId: string,
  checkIn: string,
  checkOut: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: HOTEL_DETAIL_REQUEST })
    try {
      const data = await getHotelDetail({ hotelId, checkIn, checkOut })
      dispatch({ type: HOTEL_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load hotel'
      dispatch({ type: HOTEL_DETAIL_FAILURE, payload: message })
    }
  }
}

export const resetHotelDetailAction = () => ({ type: HOTEL_DETAIL_RESET })

