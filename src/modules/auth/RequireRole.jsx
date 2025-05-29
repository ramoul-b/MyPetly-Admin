import { useSelector } from 'react-redux'
import { selectRoles, selectActiveRole } from './authSlice'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireRole ({ allowed = [], children }) {
  const activeRole = useSelector(selectActiveRole)   // rôle sélectionné
  const roles      = useSelector(selectRoles)        // tous les rôles
  const loc        = useLocation()

  /* si activeRole existe → on ne vérifie QUE lui, sinon on prend la liste */
  const ok = activeRole
    ? allowed.includes(activeRole)
    : allowed.some(r => roles.includes(r))

  if (!ok) return <Navigate to="/403" state={{ from: loc }} replace />
  return children
}
