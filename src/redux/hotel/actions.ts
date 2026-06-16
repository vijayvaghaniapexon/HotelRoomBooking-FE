import type { Dispatch } from 'redux'
import { searchHotels } from '../../api/hotelApi'
import { HOTEL_SEARCH_FAILURE, HOTEL_SEARCH_REQUEST, HOTEL_SEARCH_SUCCESS } from './actionTypes'

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
