import { Badge, Button, Card, Table } from 'react-bootstrap'
import type { Hotel } from '../../types'
import type { AssignableManager } from '../../api/userApi'
import { TablePagination } from '../common'

const renderStars = (count: number) => '★'.repeat(count) + '☆'.repeat(5 - count)

interface HotelTableProps {
  hotels: Hotel[]
  managerOptions: AssignableManager[]
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onEdit: (hotel: Hotel) => void
  onDelete: (hotelId: string) => void
}

const HotelTable = ({ hotels, managerOptions, currentPage, itemsPerPage, onPageChange, onEdit, onDelete }: HotelTableProps) => {
  const totalPages = Math.ceil(hotels.length / itemsPerPage)
  const paginatedHotels = hotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const managerNameById = new Map(managerOptions.map((manager) => [manager.id, manager.name]))

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex align-items-center justify-content-between py-3">
        <span className="fw-bold fs-5">Hotel Listings</span>
        <Badge bg="primary" pill className="fs-6">{hotels.length}</Badge>
      </Card.Header>
      <Card.Body className="p-0">
        {hotels.length === 0 ? (
          <div className="empty-state">
            <p className="fs-1 mb-2">🏗️</p>
            No hotels found. Click "+ New Hotel" to get started.
          </div>
        ) : (
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Name</th>
                <th>City</th>
                <th>Rating</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>
                    {hotel.coverImageUrl ? (
                      <img className="hotel-cover" src={hotel.coverImageUrl} alt={hotel.name} />
                    ) : (
                      <span className="text-muted fst-italic">No image</span>
                    )}
                  </td>
                  <td className="fw-semibold">{hotel.name}</td>
                  <td>📍 {hotel.city}</td>
                  <td><span className="star-badge">{renderStars(hotel.starRating)}</span></td>
                  <td>
                    {hotel.managerId ? (
                      <Badge bg="info" text="dark">
                        {managerNameById.get(hotel.managerId) ?? 'Unknown manager'}
                      </Badge>
                    ) : (
                      <span className="text-muted fst-italic">Unassigned</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <Button size="sm" variant="outline-primary" onClick={() => onEdit(hotel)}>Edit</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => onDelete(hotel.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </Card.Body>
    </Card>
  )
}

export default HotelTable
