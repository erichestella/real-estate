import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'yr_admin_session'

const AdminAuthContext = createContext(null)

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession())

  const login = useCallback((identifier) => {
    const nextSession = {
      name: identifier && identifier.trim() ? identifier.trim() : 'Admin User',
      loggedInAt: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  const value = {
    isAuthenticated: !!session,
    adminName: session?.name || 'Admin User',
    login,
    logout,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return ctx
}
