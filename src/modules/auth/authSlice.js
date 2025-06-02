import { createSlice } from '@reduxjs/toolkit'
import { authApi } from './authApi'

const initialState = {
  token : null,
  user  : null,           // { id, name, roles:[], permissions:[] }
  roles : [],             // raccourci
  perms : [],
  activeRole:null
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout (state) {
      localStorage.removeItem('access_token')
      Object.assign(state, initialState)
    },
    setCredentials (state, { payload }) {
      state.token = payload.access_token || null
      state.user  = payload.user || null
      state.roles = payload.user?.roles ?? []
      state.perms = payload.permissions ?? payload.user?.permissions ?? []
      state.activeRole = payload.user?.roles?.[0] ?? null
    },
   setActiveRole(state,{payload}){ state.activeRole = payload }
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {

      console.log('Roles reçus  →', payload.user.roles)
      console.log('Permissions →', payload.user.permissions)

      state.token = payload.access_token     
      state.user  = payload.user
      state.roles = payload.user.roles ?? []
      state.perms = payload.user.permissions ?? []
    })
  }
})

export const { logout, setCredentials, setActiveRole } = slice.actions



/* ---------- Selecteurs ---------- */
export const selectUser   = s => s.auth.user
export const selectRoles  = s => s.auth.roles
export const selectPerms  = s => s.auth.perms
export const hasRole      = r => s => s.auth.roles.includes(r)
export const hasAnyRole   = arr => s => arr.some(r => s.auth.roles.includes(r))
export const hasPerm      = p => s => s.auth.perms.includes(p)
export const selectActiveRole = s => s.auth.activeRole

export default slice.reducer


