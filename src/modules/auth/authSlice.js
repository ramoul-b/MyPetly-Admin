import { createSlice } from '@reduxjs/toolkit'
import { authApi } from './authApi'

const initialToken = localStorage.getItem('access_token') || null
const initialUser  = initialToken ? JSON.parse(localStorage.getItem('user') || 'null') : null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user : initialUser
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.user  = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    // quand /login réussi
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.access_token
        state.user  = payload.user          // <-- on utilise l’objet renvoyé
        localStorage.setItem('access_token', payload.access_token)
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
    )
    // quand /refresh-token réussi
    builder.addMatcher(
      authApi.endpoints.refresh?.matchFulfilled ?? (() => false),
      (state, { payload }) => {
        state.token = payload.access_token
        localStorage.setItem('access_token', payload.access_token)
      }
    )
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
