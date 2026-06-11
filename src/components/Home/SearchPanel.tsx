import type { SyntheticEvent } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import DateRangeField from './DateRangeField'

interface SearchPanelProps {
  query: string
  checkIn: string
  checkOut: string
  onQueryChange: (value: string) => void
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
  onSearch: (e: SyntheticEvent<HTMLFormElement>) => void
}

const SearchPanel = ({
  query, checkIn, checkOut,
  onQueryChange, onCheckInChange, onCheckOutChange, onSearch,
}: Readonly<SearchPanelProps>) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    if (!checkIn || !checkOut) {
      e.preventDefault()
      return
    }
    onSearch(e)
  }

  return (
    <Card className="search-card">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Where you want to go, To start your trip ?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-4">
            <DateRangeField
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={onCheckInChange}
              onCheckOutChange={onCheckOutChange}
            />
          </div>

          <Button type="submit" className="w-100 search-btn">
            Search Hotels
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SearchPanel
