import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'yr_admin_session'
const THEME_KEY = 'yr_admin_theme_v2'

const AdminAuthContext = createContext(null)

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readStoredTheme() {
  try {
    const raw = window.localStorage.getItem(THEME_KEY)
    // Default to light mode when nothing has been saved yet.
    return raw ? JSON.parse(raw).darkMode : false
  } catch {
    return false
  }
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession())

  // Dark/light mode lives here too, so every admin page (Profile,
  // AdminMainPage, etc.) reads and toggles the exact same value instead
  // of each page having its own disconnected copy.
  const [darkMode, setDarkMode] = useState(() => readStoredTheme())

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_KEY, JSON.stringify({ darkMode }))
    } catch {
      // Ignore storage failures (e.g. private browsing) — theme just
      // won't persist across reloads.
    }
  }, [darkMode])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

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
    darkMode,
    toggleDarkMode,
    themeClass: darkMode ? 'dark-theme' : 'light-theme',
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