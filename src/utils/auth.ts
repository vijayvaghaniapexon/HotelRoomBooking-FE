const AUTH_KEY = 'hrb_auth_user'
const TOKEN_KEY = 'token'

export type UserRole = 'GUEST' | 'ADMIN' | 'MANAGER'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export function deriveRoleFromEmail(email: string): UserRole {
  const local = email.split('@')[0]?.toLowerCase() ?? ''
  if (local.includes('admin')) return 'ADMIN'
  if (local.includes('manager')) return 'MANAGER'
  return 'GUEST'
}

export function deriveNameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? 'Guest'
  return local
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

export function logoutMock(): void {
  localStorage.removeItem('token')
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function isLoggedIn(): boolean {
  return hasAuthToken()
}

export function hasAuthToken(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function getDefaultRouteForRole(role: UserRole): string {
  if (role === 'ADMIN') return '/admin'
  if (role === 'MANAGER') return '/manager'
  return '/'
}
