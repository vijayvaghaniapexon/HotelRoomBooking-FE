import type { HotelResult } from '../types'
import { mockHotels } from '../components/HotelList/data'
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
      const term = params.query.toLowerCase()
      const results = mockHotels.filter((h) => {
        const matchesQuery =
          h.name.toLowerCase().includes(term) ||
          h.city.toLowerCase().includes(term)
        const matchesDates =
          !params.checkIn || !params.checkOut ||
          (params.checkIn >= h.availableFrom && params.checkOut <= h.availableTo)
        return matchesQuery && matchesDates
      })
      resolve(results)
    }, 500)
  })
}
