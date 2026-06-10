import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './ManagerDashboard.css'
import BookingTable from './BookingTable'
import { emptyRoom, initialBookings, initialRooms } from './data'
import DeleteConfirmModal from './DeleteConfirmModal'
import RoomFormModal from './RoomFormModal'
import RoomTable from './RoomTable'
import type { Room } from './types'

function ManagerDashboard() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [formState, setFormState] = useState<Room>(emptyRoom)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const openAddModal = () => {
    setFormState(emptyRoom)
    setIsEditing(false)
    setShowModal(true)
  }

  const openEditModal = (room: Room) => {
    setFormState(room)
    setIsEditing(true)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  const handleChange = (field: keyof Room, value: string | number | boolean) => {
    setFormState((current) => ({
      ...current,
      [field]:
        field === 'pricePerNight' || field === 'maxOccupancy'
          ? Number(value)
          : field === 'isActive'
            ? value === 'true'
            : value,
    }))
  }

  const handleSave = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextRoom = {
      ...formState,
      id: isEditing ? formState.id : `room-${Date.now()}`,
    }
    setRooms((current) =>
      isEditing
        ? current.map((r) => (r.id === nextRoom.id ? nextRoom : r))
        : [nextRoom, ...current]
    )
    closeModal()
  }

  const confirmDelete = () => {
    if (deleteId) {
      setRooms((current) => current.filter((r) => r.id !== deleteId))
    }
    setDeleteId(null)
  }

  return (
    <Container fluid className="manager-dashboard">
      <Row className="mb-4">
        <Col>
          <h1>🏢 Manager Dashboard</h1>
          <p className="text-muted">
            Manage rooms and view upcoming bookings for your hotel.
          </p>
        </Col>
      </Row>

      <Card className="hero-card shadow">
        <Card.Body className="py-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2">Room Management</h2>
              <p className="mb-0">
                Add, edit, or remove rooms and track upcoming reservations.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="light" className="fw-semibold" onClick={openAddModal}>
                ✚ New Room
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <RoomTable
        rooms={rooms}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onEdit={openEditModal}
        onDelete={setDeleteId}
      />

      <BookingTable bookings={initialBookings} />

      <RoomFormModal
        show={showModal}
        isEditing={isEditing}
        formState={formState}
        onChange={handleChange}
        onSave={handleSave}
        onClose={closeModal}
      />

      <DeleteConfirmModal
        show={!!deleteId}
        roomNumber={rooms.find((r) => r.id === deleteId)?.roomNumber}
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />
    </Container>
  )
}

export default ManagerDashboard
