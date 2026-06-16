import { Spinner } from 'react-bootstrap'

interface LoaderProps {
  variant?: string
}

function Loader({ variant = 'light' }: LoaderProps) {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant={variant} />
    </div>
  )
}

export default Loader
