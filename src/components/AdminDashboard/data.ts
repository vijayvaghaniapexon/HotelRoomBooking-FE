import type { Hotel } from '../../types'

export const initialHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Azure Garden Hotel',
    city: 'San Francisco',
    starRating: 4,
    description: 'A calm downtown hotel with modern rooms and rooftop dining.',
    coverImageUrl: 'https://images.unsplash.com/photo-1568495248636-6432d2e5d0d1?auto=format&fit=crop&w=900&q=80',
    managerId: 'MGR-001',
  },
  {
    id: 'hotel-2',
    name: 'Skyline Suite Resort',
    city: 'Chicago',
    starRating: 5,
    description: 'Luxury suites near the lake with premium service and views.',
    coverImageUrl: 'https://images.unsplash.com/photo-1501117716987-c8e2fad5e5f7?auto=format&fit=crop&w=900&q=80',
    managerId: 'MGR-002',
  },
]

export const emptyHotel: Hotel = {
  id: '',
  name: '',
  city: '',
  starRating: 3,
  description: '',
  coverImageUrl: '',
  managerId: '',
}
