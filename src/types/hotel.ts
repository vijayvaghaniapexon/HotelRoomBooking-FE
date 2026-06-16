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
