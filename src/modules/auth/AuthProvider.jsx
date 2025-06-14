// src/modules/auth/AuthProvider.jsx
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const [authState, setAuthState] = useState({
    isInitialized: false,
    isLoading: true,
    hasCheckedStorage: false
  })

  useEffect(() => {
    async function initAuth() {
      try {
        const token = localStorage.getItem('access_token')
        
        if (token) {
          // Injecter d'abord le token dans Redux
          dispatch(setCredentials({ access_token: token }))
          
          // Charger les infos utilisateur
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user-profile`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            
            if (response.ok) {
              const userData = await response.json()
              dispatch(setCredentials({ 
                access_token: token,
                user: userData.user,
                permissions: userData.permissions
              }))
            }
          } catch (error) {
            console.error('Erreur lors du chargement du profil:', error)
          }
        }
      } finally {
        setAuthState({
          isInitialized: true,
          isLoading: false,
          hasCheckedStorage: true
        })
      }
    }
    
    initAuth()
  }, [dispatch])

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}