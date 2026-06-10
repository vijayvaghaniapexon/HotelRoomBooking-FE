import type { Booking, Room } from '../../types'

export const initialRooms: Room[] = [
  {
    id: 'room-1',
    roomNumber: '101',
    roomType: 'Deluxe',
    pricePerNight: 150,
    maxOccupancy: 2,
    description: 'Spacious deluxe room with king-size bed and city view.',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
    isActive: true,
  },
  {
    id: 'room-2',
    roomNumber: '202',
    roomType: 'Suite',
    pricePerNight: 300,
    maxOccupancy: 4,
    description: 'Premium suite with separate living area and balcony.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    isActive: true,
  },
  {
    id: 'room-3',
    roomNumber: '305',
    roomType: 'Standard',
    pricePerNight: 90,
    maxOccupancy: 2,
    description: 'Comfortable standard room with all essential amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80',
    isActive: false,
  },
]

export const initialBookings: Booking[] = [
  {
    id: 'booking-1',
    roomNumber: '101',
    guestName: 'John Smith',
    checkIn: '2025-02-10',
    checkOut: '2025-02-14',
    status: 'Confirmed',
  },
  {
    id: 'booking-2',
    roomNumber: '202',
    guestName: 'Sarah Johnson',
    checkIn: '2025-02-12',
    checkOut: '2025-02-15',
    status: 'Pending',
  },
  {
    id: 'booking-3',
    roomNumber: '101',
    guestName: 'Michael Lee',
    checkIn: '2025-02-18',
    checkOut: '2025-02-20',
    status: 'Confirmed',
  },
]

export const emptyRoom: Room = {
  id: '',
  roomNumber: '',
  roomType: 'Standard',
  pricePerNight: 0,
  maxOccupancy: 1,
  description: '',
  imageUrl: '',
  isActive: true,
}
