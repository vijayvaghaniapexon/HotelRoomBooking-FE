const AUTH_KEY = 'hrb_auth_user'

export interface AuthUser {
  id: string
  name: string
  email: string
}

export function loginMock(user: AuthUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function logoutMock(): void {
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
  return getCurrentUser() !== null
}
