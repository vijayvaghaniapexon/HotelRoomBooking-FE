import type { SyntheticEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { createHotel, deleteHotel, getAllHotels, updateHotel } from '../../api/hotelApi'
import { getAssignableManagers, type AssignableManager } from '../../api/userApi'
import type { Hotel } from '../../types'
import './AdminDashboard.css'
import { emptyHotel } from './data'
import DeleteConfirmModal from './DeleteConfirmModal'
import HotelFormModal from './HotelFormModal'
import HotelTable from './HotelTable'

const AdminDashboardContainer = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [formState, setFormState] = useState<Hotel>(emptyHotel)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [managersLoading, setManagersLoading] = useState(true)
  const [managerOptions, setManagerOptions] = useState<AssignableManager[]>([])
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 5

  const fetchHotels = useCallback(async () => {
    try {
      setError(null)
      const data = await getAllHotels()
      setHotels(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch hotels'
      setError(message)
      console.error('Error fetching hotels:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchAssignableManagers = useCallback(async () => {
    try {
      const users = await getAssignableManagers()
      setManagerOptions(users)
    } catch (err) {
      console.error('Error fetching assignable managers:', err)
    } finally {
      setManagersLoading(false)
    }
  }, [])

  // Fetch hotels and manager options on component mount.
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      fetchHotels()
      fetchAssignableManagers()
    }, 0)

    return () => window.clearTimeout(timerId)
  }, [fetchHotels, fetchAssignableManagers])

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

  const handleSave = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setError(null)
      const managerId = formState.managerId?.trim() ?? ''
      if (!managerId) {
        setError('Please select a manager before saving.')
        return
      }

      const hotelPayload: Hotel = {
        ...formState,
        managerId,
      }

      if (isEditing && formState.id) {
        const updatedHotel = await updateHotel(formState.id, hotelPayload)
        setHotels((current) =>
          current.map((h) => (h.id === updatedHotel.id ? updatedHotel : h))
        )
      } else {
        const newHotel = await createHotel(hotelPayload)
        setHotels((current) => [newHotel, ...current])
      }
      closeModal()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save hotel'
      setError(message)
      console.error('Error saving hotel:', err)
    }
  }

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        setError(null)
        await deleteHotel(deleteId)
        setHotels((current) => current.filter((h) => h.id !== deleteId))
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete hotel'
        setError(message)
        console.error('Error deleting hotel:', err)
      }
    }
    setDeleteId(null)
  }

  if (loading && hotels.length === 0) {
    return (
      <Container fluid className="admin-dashboard">
        <p>Loading hotels...</p>
      </Container>
    )
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

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

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
        managerOptions={managerOptions}
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
        managerOptions={managerOptions}
        managersLoading={managersLoading}
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
