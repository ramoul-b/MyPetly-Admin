import { useEffect } from 'react'
import { useSelector } from 'react-redux' 
import { Navigate, useLocation } from 'react-router-dom'
import { baseQueryWithRefresh } from './authApi'

export default function RequireAuth ({ children }) {
  const token    = useSelector(state => state.auth.token)
  const user     = useSelector(state => state.auth.user)
  const location = useLocation()

  // Rafraîchir le token toutes les 12 min
  useEffect(() => {
    if (!token) return
    const id = setInterval(() => {
      baseQueryWithRefresh('refresh-token', { dispatch:()=>{}, getState:()=>({auth:{token}}) })
    }, 12 * 60 * 1000)
    return () => clearInterval(id)
  }, [token])

  // ⬇️ Ajout clé pour l’UX : attendre que user soit peuplé AVANT de rediriger
  if (token && !user) return <div>Chargement...</div>
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
