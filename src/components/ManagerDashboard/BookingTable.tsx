import { useState } from 'react'
import { Badge, Card, Table } from 'react-bootstrap'
import type { Booking } from '../../types'
import { TablePagination } from '../common'

interface BookingTableProps {
  bookings: Booking[]
}

const BookingTable = ({ bookings }: BookingTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  const paginatedBookings = bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex align-items-center justify-content-between py-3">
        <span className="fw-bold fs-5">Upcoming Bookings</span>
        <Badge bg="primary" pill className="fs-6">{bookings.length}</Badge>
      </Card.Header>
      <Card.Body className="p-0">
        {bookings.length === 0 ? (
          <div className="empty-state">
            <p className="fs-1 mb-2">📅</p>
            No upcoming bookings.
          </div>
        ) : (
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Room #</th>
                <th>Guest Name</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="fw-semibold">{booking.roomNumber}</td>
                  <td>{booking.guestName}</td>
                  <td>📅 {booking.checkIn}</td>
                  <td>📅 {booking.checkOut}</td>
                  <td>
                    <Badge bg={booking.status === 'Confirmed' ? 'success' : 'warning'} text={booking.status === 'Confirmed' ? undefined : 'dark'}>
                      {booking.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </Card.Body>
    </Card>
  )
}

export default BookingTable
