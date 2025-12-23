import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginApi, registerApi } from '@/api/auth'
import { getRoleFromToken } from '@/utils/jwt'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    try { return raw ? JSON.parse(raw) : null } catch { return null }
  })
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    async function bootstrap() {
      if (!token) return
      // If backend provides a profile/me endpoint, wire it later.
      // Keep previously stored minimal user meta if available
      try {
        const raw = localStorage.getItem('user')
        const stored = raw ? JSON.parse(raw) : null
        setUser(stored)
        setRole(stored?.role || getRoleFromToken(token))
      } catch {
        setUser(null)
        setRole(getRoleFromToken(token))
      }
      setLoading(false)
    }
    bootstrap()
  }, [token])

  const login = async (email, password) => {
    const data = await loginApi(email, password)
    // Backend returns {id,email,role} (no JWT). Accept and create a synthetic token to mark auth.
    const jwt = data.token || data.accessToken || data.jwt || 'local-auth'
    localStorage.setItem('token', jwt)
    setToken(jwt)
    // Persist minimal user meta if provided by backend (id,email,role)
    const minimal = {
      id: data.id ?? user?.id ?? null,
      email: data.email ?? user?.email ?? null,
      role: data.role ?? getRoleFromToken(jwt),
    }
    localStorage.setItem('user', JSON.stringify(minimal))
    setUser(minimal)
    setRole(minimal.role)
    return { token: jwt }
  }

  const register = async (payload) => {
    const data = await registerApi(payload)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setRole(null)
  }

  const value = useMemo(
    () => ({ token, user, role, loading, login, register, logout, isAuthed: !!token }),
    [token, user, role, loading]
  )

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
