interface EmptyStateProps {
  title: string
  message?: string
}

function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h4>{title}</h4>
      {message && <p>{message}</p>}
    </div>
  )
}

export default EmptyState
