export type Hotel = {
  id: string
  name: string
  city: string
  starRating: number
  description: string
  coverImageUrl: string
  managerId: string
}

export interface HotelResult {
  id: string
  name: string
  city: string
  starRating: number
  pricePerNight: number
  coverImage: string
  availableFrom: string
  availableTo: string
}

export interface AvailableRoom {
  id: string
  roomType: string
  description: string
  pricePerNight: number
  maxOccupancy: number
  bedConfig: string
  imageUrl: string
  amenities: string[]
  availableCount: number
}

export interface HotelDetail {
  id: string
  name: string
  city: string
  address: string
  starRating: number
  description: string
  amenities: string[]
  gallery: string[]
  availableFrom: string
  availableTo: string
  rooms: AvailableRoom[]
}
