import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth ({ children }) {
  const token = useSelector(state => state.auth.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
