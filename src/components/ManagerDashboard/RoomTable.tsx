import { Badge, Button, Card, Table } from 'react-bootstrap'
import { TablePagination } from '../common'
import type { Room } from '../../types'

interface RoomTableProps {
  rooms: Room[]
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onEdit: (room: Room) => void
  onDelete: (roomId: string) => void
}

function RoomTable({ rooms, currentPage, itemsPerPage, onPageChange, onEdit, onDelete }: RoomTableProps) {
  const totalPages = Math.ceil(rooms.length / itemsPerPage)
  const paginatedRooms = rooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="d-flex align-items-center justify-content-between py-3">
        <span className="fw-bold fs-5">Room Listings</span>
        <Badge bg="primary" pill className="fs-6">{rooms.length}</Badge>
      </Card.Header>
      <Card.Body className="p-0">
        {rooms.length === 0 ? (
          <div className="empty-state">
            <p className="fs-1 mb-2">🛏️</p>
            No rooms found. Click "+ New Room" to get started.
          </div>
        ) : (
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Room #</th>
                <th>Type</th>
                <th>Price/Night</th>
                <th>Max Occupancy</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    {room.imageUrl ? (
                      <img className="room-cover" src={room.imageUrl} alt={`Room ${room.roomNumber}`} />
                    ) : (
                      <span className="text-muted fst-italic">No image</span>
                    )}
                  </td>
                  <td className="fw-semibold">{room.roomNumber}</td>
                  <td><Badge bg="secondary">{room.roomType}</Badge></td>
                  <td>${room.pricePerNight}</td>
                  <td>{room.maxOccupancy} 👤</td>
                  <td>
                    <Badge bg={room.isActive ? 'success' : 'danger'}>
                      {room.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    <div className="table-actions">
                      <Button size="sm" variant="outline-primary" onClick={() => onEdit(room)}>Edit</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => onDelete(room.id)}>Delete</Button>
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

export default RoomTable
