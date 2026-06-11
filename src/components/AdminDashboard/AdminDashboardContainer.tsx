import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import type { Hotel } from '../../types'
import './AdminDashboard.css'
import { emptyHotel, initialHotels } from './data'
import DeleteConfirmModal from './DeleteConfirmModal'
import HotelFormModal from './HotelFormModal'
import HotelTable from './HotelTable'

const AdminDashboardContainer = () => {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels)
  const [formState, setFormState] = useState<Hotel>(emptyHotel)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const openAddModal = () => {
    setFormState(emptyHotel)
    setIsEditing(false)
    setShowModal(true)
  }

  const openEditModal = (hotel: Hotel) => {
    setFormState(hotel)
    setIsEditing(true)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  const handleChange = (field: keyof Hotel, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: field === 'starRating' ? Number(value) : value,
    }))
  }

  const handleSave = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextHotel = {
      ...formState,
      id: isEditing ? formState.id : `hotel-${Date.now()}`,
    }
    setHotels((current) =>
      isEditing
        ? current.map((h) => (h.id === nextHotel.id ? nextHotel : h))
        : [nextHotel, ...current]
    )
    closeModal()
  }

  const confirmDelete = () => {
    if (deleteId) {
      setHotels((current) => current.filter((h) => h.id !== deleteId))
    }
    setDeleteId(null)
  }

  return (
    <Container fluid className="admin-dashboard">
      <Row className="mb-4">
        <Col>
          <h1>🏨 Admin Dashboard</h1>
          <p className="text-muted">
            Manage hotels — create, update, and remove properties from the directory.
          </p>
        </Col>
      </Row>

      <Card className="hero-card shadow">
        <Card.Body className="py-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2">Hotel Directory</h2>
              <p className="mb-0">
                Add new hotels and manage existing listings from one place.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="light" className="fw-semibold" onClick={openAddModal}>
                ✚ New Hotel
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <HotelTable
        hotels={hotels}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onEdit={openEditModal}
        onDelete={setDeleteId}
      />

      <HotelFormModal
        show={showModal}
        isEditing={isEditing}
        formState={formState}
        onChange={handleChange}
        onSave={handleSave}
        onClose={closeModal}
      />

      <DeleteConfirmModal
        show={!!deleteId}
        hotelName={hotels.find((h) => h.id === deleteId)?.name}
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />
    </Container>
  )
}

export default AdminDashboardContainer
