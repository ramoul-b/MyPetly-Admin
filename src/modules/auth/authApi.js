// src/modules/auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? 'https://api.mypetly.co/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token')
    console.log('→ prepareHeaders ▶ En‐tête Authorization ajouté :', token ? `Bearer ${token}` : 'aucun token')
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

const baseQueryWithRefresh = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra)
  if (result.error?.status === 401 && !args.url?.includes('login')) {
    console.log('→ 401 reçue, tentative de refresh-token …')
    const refresh = await baseQuery(
      { url: 'refresh-token', method: 'POST' },
      api,
      extra
    )
    if (refresh.data?.access_token) {
      console.log('→ Refresh‐token réussi, nouveau token :', refresh.data.access_token)
      localStorage.setItem('access_token', refresh.data.access_token)
      api.dispatch(setCredentials(refresh.data))
      result = await baseQuery(args, api, extra)
    } else {
      console.warn('→ Échec du refresh, déconnexion.')
      api.dispatch(logout())
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: 'login', method: 'POST', body })
    }),
    refresh: builder.mutation({
      query: () => ({ url: 'refresh-token', method: 'POST' })
    })
  })
})

export const { useLoginMutation } = authApi
export { baseQueryWithRefresh } 