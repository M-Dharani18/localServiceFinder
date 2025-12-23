import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function RoleRoute({ allow }) {
  const { role } = useAuth()
  if (!role) return <Navigate to="/login" replace />
  const allowed = Array.isArray(allow) ? allow : [allow]
  if (!allowed.includes(role)) {
    // redirect based on current role
    if (role === 'CUSTOMER') return <Navigate to="/customer" replace />
    if (role === 'PROVIDER') return <Navigate to="/provider" replace />
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
