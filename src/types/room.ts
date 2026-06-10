export type Room = {
  id: string
  roomNumber: string
  roomType: string
  pricePerNight: number
  maxOccupancy: number
  description: string
  imageUrl: string
  isActive: boolean
}

export type Booking = {
  id: string
  roomNumber: string
  guestName: string
  checkIn: string
  checkOut: string
  status: string
}
