import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser, type UserRole } from '../../utils/auth'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole | UserRole[]
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!roles.includes(currentUser.role)) {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}
