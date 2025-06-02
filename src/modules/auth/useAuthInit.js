// src/modules/auth/useAuthInit.js
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

export default function useAuthInit() {
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      try {
        const token = localStorage.getItem('access_token')
        
        if (token) {
          // Injecter d'abord le token dans Redux
          dispatch(setCredentials({ access_token: token }))
          
          // Optionnel: charger les infos utilisateur
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
        setIsInitialized(true)
        setIsLoading(false)
      }
    }
    
    initAuth()
  }, [dispatch])

  return { isInitialized, isLoading }
}