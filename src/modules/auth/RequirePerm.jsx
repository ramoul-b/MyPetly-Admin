// src/modules/auth/RequirePerm.jsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { hasPerm } from './authSlice'

export default function RequirePerm ({ allowed, children }) {
  const ok = useSelector(hasPerm(allowed))        // selector déjà existant
  const loc = useLocation()

  if (!ok) return <Navigate to="/403" state={{ from: loc }} replace />
  return children
}
