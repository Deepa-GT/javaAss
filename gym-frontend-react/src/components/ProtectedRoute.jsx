import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { isAdmin } from '../api'

export default function ProtectedRoute({ children, admin = false }) {
  const { user, checking } = useAuth()
  if (checking) return null
  if (!user) return <Navigate to="/login" replace />
  if (admin && !isAdmin(user)) return <Navigate to="/login" replace />
  return children
}
