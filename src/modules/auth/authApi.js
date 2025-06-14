// src/modules/auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from './authSlice'
import { showAlert } from '../../app/uiSlice'
import i18n from '../../i18n'

const API_URL = (import.meta.env.VITE_API_URL ?? 'https://api.mypetly.co/api/v1').replace(/\/?$/, '/')
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token')
    if (import.meta.env.DEV) {
      console.debug(
        '→ prepareHeaders ▶ En‐tête Authorization ajouté :',
        token ? `Bearer ${token}` : 'aucun token'
      )
    }
    if (token) headers.set('authorization', `Bearer ${token}`)
    headers.set('Accept', 'application/json')
    return headers
  }
})

const baseQueryWithRefresh = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra)
  if (result.error?.status === 401 && !args.url?.includes('login')) {
    if (import.meta.env.DEV) console.debug('→ 401 reçue, tentative de refresh-token …')
    const refresh = await baseQuery(
      { url: 'refresh-token', method: 'POST' },
      api,
      extra
    )
    if (refresh.data?.access_token) {
      if (import.meta.env.DEV) console.debug('→ Refresh‐token réussi, nouveau token :', refresh.data.access_token)
      localStorage.setItem('access_token', refresh.data.access_token)
      api.dispatch(setCredentials(refresh.data))
      result = await baseQuery(args, api, extra)
    } else {
      console.error('→ Échec du refresh, déconnexion.')
      api.dispatch(logout())
    }
  }
  if (result.error?.status === 403) {
    const msg =
      result.error.data?.errors?.message ||
      i18n.t('errors.unauthorized_action', 'You are not authorized to perform this action.')
    api.dispatch(showAlert({ message: msg, type: 'error' }))
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: 'login', method: 'POST', body }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('access_token', data.access_token)
          // Optionnel : api.dispatch(setCredentials(data))
        } catch (e) {
          console.error(e)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({ url: 'refresh-token', method: 'POST' })
    }),
    userProfile: builder.query({
      query: () => ({ url: 'user-profile', method: 'GET' })
    })
  })
})

export const {
  useLoginMutation,
  useRefreshMutation,
  useUserProfileQuery
} = authApi
export { baseQueryWithRefresh }
