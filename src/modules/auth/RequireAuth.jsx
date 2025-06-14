// src/modules/auth/RequireAuth.jsx
import { useSelector } from 'react-redux' 
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './authContext'
import AuthLoader from '../../components/AuthLoader' 



export default function RequireAuth({ children }) {
  const token = useSelector(state => state.auth.token)
  const location = useLocation()
  const { isInitialized, isLoading } = useAuthContext()

  // Afficher un indicateur de chargement pendant l'initialisation
  if (isLoading || !isInitialized) {
    return <AuthLoader />
  }

  // Vérifier si on a un token dans localStorage même si pas encore dans Redux
  const localToken = localStorage.getItem('access_token')
  if (!token && !localToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}